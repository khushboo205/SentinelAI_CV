"""
SentinelAI Session Management & Concurrency Guard
Enforces maximum concurrent session limits per user, tracks IP/User-Agent fingerprints,
monitors session history, and handles idle session expiration.
"""

import time
import hashlib
from typing import Dict, List, Any, Optional, Tuple

MAX_CONCURRENT_SESSIONS_PER_USER = 3
IDLE_SESSION_TIMEOUT_SECONDS = 1800  # 30 Minutes


class SessionGuard:
    """Monitors active user sessions, device fingerprints, and enforces session limits."""

    def __init__(self):
        # User session index: user_id -> list of session dicts
        self.user_sessions: Dict[str, List[Dict[str, Any]]] = {}

    @staticmethod
    def generate_device_fingerprint(ip_address: str, user_agent: str) -> str:
        """Generates SHA-256 device fingerprint from IP & User Agent string."""
        raw = f"{ip_address}|{user_agent}"
        return hashlib.sha256(raw.encode('utf-8')).hexdigest()

    def register_session(
        self,
        user_id: str,
        session_id: str,
        ip_address: str,
        user_agent: str
    ) -> Tuple[bool, str, List[str]]:
        """
        Registers user session. If max concurrent limit is reached, terminates oldest session.
        Returns (success, message, terminated_session_ids).
        """
        fingerprint = self.generate_device_fingerprint(ip_address, user_agent)
        now = time.time()

        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = []

        # Cleanup expired sessions first
        self.cleanup_idle_sessions(user_id)

        sessions = self.user_sessions[user_id]
        terminated = []

        # Enforce max concurrent session limits
        while len(sessions) >= MAX_CONCURRENT_SESSIONS_PER_USER:
            oldest = sessions.pop(0)
            terminated.append(oldest["session_id"])

        new_session = {
            "session_id": session_id,
            "user_id": user_id,
            "ip_address": ip_address,
            "user_agent": user_agent,
            "fingerprint": fingerprint,
            "created_at": now,
            "last_activity": now
        }
        sessions.append(new_session)

        msg = "Session registered successfully"
        if terminated:
            msg += f" (Oldest session {terminated[0]} evicted due to concurrency limit)"

        return True, msg, terminated

    def update_activity(self, user_id: str, session_id: str) -> bool:
        """Updates last_activity timestamp for idle timeout calculation."""
        if user_id in self.user_sessions:
            for s in self.user_sessions[user_id]:
                if s["session_id"] == session_id:
                    s["last_activity"] = time.time()
                    return True
        return False

    def cleanup_idle_sessions(self, user_id: str) -> List[str]:
        """Removes sessions that have exceeded idle timeout."""
        if user_id not in self.user_sessions:
            return []

        now = time.time()
        active = []
        expired = []

        for s in self.user_sessions[user_id]:
            if (now - s["last_activity"]) > IDLE_SESSION_TIMEOUT_SECONDS:
                expired.append(s["session_id"])
            else:
                active.append(s)

        self.user_sessions[user_id] = active
        return expired

    def terminate_session(self, user_id: str, session_id: str) -> bool:
        """Terminates specific session."""
        if user_id in self.user_sessions:
            initial = len(self.user_sessions[user_id])
            self.user_sessions[user_id] = [s for s in self.user_sessions[user_id] if s["session_id"] != session_id]
            return len(self.user_sessions[user_id]) < initial
        return False

    def terminate_all_user_sessions(self, user_id: str) -> int:
        """Terminates all sessions for user (e.g. security breach reset)."""
        count = len(self.user_sessions.get(user_id, []))
        self.user_sessions[user_id] = []
        return count
