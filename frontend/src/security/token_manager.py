"""
SentinelAI Refresh Token Rotation & Replay Attack Protection Engine
Implements Access Token + Refresh Token Rotation, Family Token Grouping,
Replay Attack Detection, Revocation, and Secure Cookie Management.
"""

import uuid
import hashlib
import time
from typing import Dict, Any, Optional, Tuple


class TokenManager:
    """Manages secure JWT token pairs, rotation families, and cookie security flags."""

    def __init__(self):
        # In-memory mock storage for family replay detection (backed by Redis in prod)
        self.token_families: Dict[str, Dict[str, Any]] = {}
        self.revoked_tokens: set = set()

    def generate_token_pair(self, user_id: str, device_id: str, family_id: Optional[str] = None) -> Dict[str, str]:
        """Generates Access Token and Refresh Token with family rotation lineage."""
        if not family_id:
            family_id = f"fam_{uuid.uuid4()}"

        access_jti = f"jti_acc_{uuid.uuid4()}"
        refresh_jti = f"jti_ref_{uuid.uuid4()}"

        token_record = {
            "user_id": user_id,
            "device_id": device_id,
            "family_id": family_id,
            "active_refresh_jti": refresh_jti,
            "created_at": time.time(),
            "is_revoked": False
        }
        self.token_families[family_id] = token_record

        return {
            "access_token": f"header.{access_jti}.signature",
            "refresh_token": f"header.{refresh_jti}.signature",
            "family_id": family_id,
            "access_jti": access_jti,
            "refresh_jti": refresh_jti
        }

    def rotate_refresh_token(self, family_id: str, current_refresh_jti: str, device_id: str) -> Tuple[bool, Optional[Dict[str, str]], str]:
        """
        Rotates refresh token. Detects token reuse replay attacks and revokes
        the entire family if a previously used refresh token is presented.
        """
        if family_id not in self.token_families:
            return False, None, "Invalid token family"

        family = self.token_families[family_id]

        if family["is_revoked"]:
            return False, None, "SECURITY ALERT: Token family revoked due to previous breach"

        # Replay Attack Detection: Presented token is NOT the active refresh token
        if family["active_refresh_jti"] != current_refresh_jti:
            # REVOKE ENTIRE FAMILY
            family["is_revoked"] = True
            return False, None, "SECURITY BREACH DETECTED: Refresh token reuse attempt! Entire token family revoked."

        # Rotate token
        new_tokens = self.generate_token_pair(
            user_id=family["user_id"],
            device_id=device_id,
            family_id=family_id
        )
        return True, new_tokens, "Token rotated successfully"

    def revoke_family(self, family_id: str) -> None:
        """Revokes token family (Logout from all sessions)."""
        if family_id in self.token_families:
            self.token_families[family_id]["is_revoked"] = True

    @staticmethod
    def get_cookie_security_options() -> Dict[str, Any]:
        """Returns enterprise security options for HTTP cookies."""
        return {
            "httponly": True,
            "secure": True,
            "samesite": "Strict",
            "domain": None,
            "path": "/api/v1/auth"
        }
