"""
SentinelAI Multi-Factor Authentication (MFA) & TOTP Engine
Provides TOTP secret generation, QR code URI generation, backup codes,
and role-based MFA enforcement rules.
"""

import hmac
import hashlib
import time
import base64
import struct
import secrets
from typing import List, Tuple, Optional


class MFAService:
    """TOTP (RFC 6238) Multi-Factor Authentication Engine."""

    @staticmethod
    def generate_totp_secret() -> str:
        """Generates a random 20-byte base32 encoded secret."""
        random_bytes = secrets.token_bytes(20)
        return base64.b32encode(random_bytes).decode('utf-8').replace('=', '')

    @staticmethod
    def get_totp_uri(secret: str, username: str, issuer: str = "SentinelAI") -> str:
        """Generates Google Authenticator compatible OTPAuth URI."""
        return f"otpauth://totp/{issuer}:{username}?secret={secret}&issuer={issuer}&algorithm=SHA1&digits=6&period=30"

    @staticmethod
    def verify_totp(secret: str, token: str, window: int = 1) -> bool:
        """Verifies a 6-digit TOTP token against secret with window drift tolerance."""
        if not token or len(token) != 6 or not token.isdigit():
            return False

        try:
            key = base64.b32decode(secret + '=' * (-len(secret) % 8), casefold=True)
        except Exception:
            return False

        current_time = int(time.time()) // 30
        for i in range(-window, window + 1):
            time_bytes = struct.pack(">Q", current_time + i)
            hmac_hash = hmac.new(key, time_bytes, hashlib.sha1).digest()
            offset = hmac_hash[-1] & 0x0F
            code = (struct.unpack(">I", hmac_hash[offset:offset + 4])[0] & 0x7FFFFFFF) % 1000000
            formatted_code = f"{code:06d}"
            if hmac.compare_digest(formatted_code, token):
                return True
        return False

    @staticmethod
    def generate_backup_codes(count: int = 8) -> Tuple[List[str], List[str]]:
        """Generates plain backup codes and their SHA-256 hashes for DB storage."""
        plain_codes = []
        hashed_codes = []
        for _ in range(count):
            code = f"{secrets.randbelow(10000):04d}-{secrets.randbelow(10000):04d}"
            hashed = hashlib.sha256(code.encode('utf-8')).hexdigest()
            plain_codes.append(code)
            hashed_codes.append(hashed)
        return plain_codes, hashed_codes

    @staticmethod
    def is_mfa_required_for_role(role_code: str) -> bool:
        """Enforces mandatory MFA enrollment for elevated forensic roles."""
        mandatory_roles = {'ADMIN', 'LEAD_INVESTIGATOR', 'SUPERVISOR', 'INVESTIGATOR'}
        return role_code.upper() in mandatory_roles
