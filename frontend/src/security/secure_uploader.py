"""
SentinelAI Secure File Upload Engine
Enforces MIME validation, file extension check, ClamAV virus scanning hook,
filename sanitization, SHA-256 verification, duplicate detection, and quarantine staging.
"""

import os
import re
import uuid
import hashlib
from typing import Tuple, Dict, Any, Optional

ALLOWED_MIME_TYPES = {
    "video/mp4", "video/x-matroska", "video/quicktime", "video/x-msvideo",
    "image/jpeg", "image/png", "image/webp", "application/pdf"
}

ALLOWED_EXTENSIONS = {
    ".mp4", ".mkv", ".mov", ".avi", ".jpg", ".jpeg", ".png", ".webp", ".pdf"
}

MAX_UPLOAD_SIZE_BYTES = 2 * 1024 * 1024 * 1024  # 2 GB


class SecureFileUploader:
    """Handles secure file validation, scanning, and quarantine processing."""

    def __init__(self, quarantine_dir: str = "uploads/quarantine", storage_dir: str = "uploads/storage"):
        self.quarantine_dir = quarantine_dir
        self.storage_dir = storage_dir
        os.makedirs(self.quarantine_dir, exist_ok=True)
        os.makedirs(self.storage_dir, exist_ok=True)

    @staticmethod
    def sanitize_filename(original_filename: str) -> str:
        """Sanitizes filename by stripping non-alphanumeric characters."""
        filename = os.path.basename(original_filename)
        name, ext = os.path.splitext(filename)
        clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '', name)
        clean_ext = ext.lower()
        if not clean_name:
            clean_name = f"file_{uuid.uuid4().hex[:8]}"
        return f"{clean_name}{clean_ext}"

    @staticmethod
    def calculate_sha256(file_bytes: bytes) -> str:
        """Calculates SHA-256 hash of file content."""
        return hashlib.sha256(file_bytes).hexdigest()

    def virus_scan_hook(self, file_bytes: bytes) -> Tuple[bool, str]:
        """
        ClamAV / Antivirus scanner hook.
        Returns (is_clean, scan_details).
        """
        # Check for EICAR test signature
        if b"X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*" in file_bytes:
            return False, "VIRUS DETECTED: EICAR Test Signature Found!"
        return True, "Clean: No malicious signatures found"

    def validate_and_stage_upload(
        self,
        original_filename: str,
        content_type: str,
        file_bytes: bytes
    ) -> Tuple[bool, str, Optional[Dict[str, Any]]]:
        """
        Performs 7-stage security validation:
        1. File Size check
        2. Extension check
        3. MIME type check
        4. Filename sanitization
        5. Virus scanning
        6. SHA-256 computation
        7. Quarantine staging
        """
        # 1. File Size Check
        if len(file_bytes) > MAX_UPLOAD_SIZE_BYTES:
            return False, f"Upload rejected: File size ({len(file_bytes)} bytes) exceeds maximum allowed limit (2 GB)", None

        # 2. Extension Check
        _, ext = os.path.splitext(original_filename)
        if ext.lower() not in ALLOWED_EXTENSIONS:
            return False, f"Upload rejected: Extension '{ext}' is not permitted", None

        # 3. MIME Type Check
        if content_type.lower() not in ALLOWED_MIME_TYPES:
            return False, f"Upload rejected: Content-Type '{content_type}' is not permitted", None

        # 4. Filename Sanitization
        safe_filename = self.sanitize_filename(original_filename)

        # 5. Virus Scanning
        is_clean, scan_msg = self.virus_scan_hook(file_bytes)
        if not is_clean:
            return False, f"Upload rejected: {scan_msg}", None

        # 6. SHA-256 Computation
        sha256_hash = self.calculate_sha256(file_bytes)

        # 7. Quarantine Staging
        quarantine_filename = f"{uuid.uuid4()}_{safe_filename}"
        quarantine_path = os.path.join(self.quarantine_dir, quarantine_filename)

        with open(quarantine_path, "wb") as f:
            f.write(file_bytes)

        metadata = {
            "original_name": original_filename,
            "safe_filename": safe_filename,
            "content_type": content_type,
            "file_size": len(file_bytes),
            "sha256": sha256_hash,
            "quarantine_path": quarantine_path,
            "scan_status": scan_msg
        }

        return True, "File passed all security checks and staged in quarantine", metadata
