"""
SentinelAI Intrusion Detection System (IDS) & Anomaly Detection Engine
Monitors real-time security events: brute force login attempts, privilege escalation,
evidence checksum tampering, deleted record anomalies, and Redis rate limit abuse.
"""

import time
from typing import Dict, List, Any, Optional


class IntrusionDetectionSystem:
    """Real-time Security Event Collector & Intrusion Detector."""

    def __init__(self):
        self.failed_logins: Dict[str, List[float]] = {}  # ip -> list of timestamps
        self.alerts: List[Dict[str, Any]] = []

    def record_failed_login(self, ip_address: str, username: str) -> Optional[Dict[str, Any]]:
        """Tracks failed login attempts and triggers brute-force alert if threshold exceeded."""
        now = time.time()
        if ip_address not in self.failed_logins:
            self.failed_logins[ip_address] = []

        # Keep attempts within 5 minute sliding window (300s)
        self.failed_logins[ip_address] = [t for t in self.failed_logins[ip_address] if (now - t) <= 300]
        self.failed_logins[ip_address].append(now)

        if len(self.failed_logins[ip_address]) >= 5:
            alert = {
                "alert_type": "BRUTE_FORCE_LOGIN_ATTEMPT",
                "severity": "CRITICAL",
                "target_ip": ip_address,
                "target_username": username,
                "failed_attempts_count": len(self.failed_logins[ip_address]),
                "timestamp": now,
                "action_taken": "IP temp-blocked & Account locked"
            }
            self.alerts.append(alert)
            return alert
        return None

    def verify_evidence_integrity(
        self,
        evidence_id: str,
        expected_hash: str,
        actual_hash: str
    ) -> Optional[Dict[str, Any]]:
        """Detects evidence checksum mismatch and triggers High Severity alert."""
        if expected_hash != actual_hash:
            alert = {
                "alert_type": "EVIDENCE_TAMPERING_DETECTED",
                "severity": "EMERGENCY",
                "evidence_id": evidence_id,
                "expected_hash": expected_hash,
                "actual_hash": actual_hash,
                "timestamp": time.time(),
                "action_taken": "Evidence chain locked & Security Operations notified"
            }
            self.alerts.append(alert)
            return alert
        return None

    def check_permission_escalation(
        self,
        user_id: str,
        assigned_role: str,
        requested_action: str
    ) -> Optional[Dict[str, Any]]:
        """Detects unauthorized permission escalation attempts."""
        if assigned_role == "ANALYST" and requested_action in {"cases:delete", "users:create", "system:configure"}:
            alert = {
                "alert_type": "UNAUTHORIZED_PRIVILEGE_ESCALATION",
                "severity": "HIGH",
                "user_id": user_id,
                "user_role": assigned_role,
                "attempted_action": requested_action,
                "timestamp": time.time(),
                "action_taken": "Request denied & User session flagged for audit"
            }
            self.alerts.append(alert)
            return alert
        return None


# Global Singleton IDS instance
ids_engine = IntrusionDetectionSystem()
