"""
SentinelAI Enterprise Security Headers & FastAPI Middleware
Injects strict OWASP security headers into all API responses.
"""

from typing import Dict


class SecurityHeaders:
    """Provides OWASP compliant security response headers."""

    @staticmethod
    def get_headers() -> Dict[str, str]:
        return {
            # Content Security Policy (CSP)
            "Content-Security-Policy": (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline'; "
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                "font-src 'self' https://fonts.gstatic.com data:; "
                "img-src 'self' data: blob:; "
                "connect-src 'self' wss: https:; "
                "object-src 'none'; "
                "frame-ancestors 'none'; "
                "base-uri 'self'; "
                "form-action 'self';"
            ),
            # HTTP Strict Transport Security (HSTS)
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
            # Anti-Clickjacking
            "X-Frame-Options": "DENY",
            # MIME Sniffing Prevention
            "X-Content-Type-Options": "nosniff",
            # Referrer Policy
            "Referrer-Policy": "strict-origin-when-cross-origin",
            # Permissions Policy (Restrict camera/mic/geolocation hardware access)
            "Permissions-Policy": "camera=(), microphone=(), geolocation=(self), display-capture=()",
            # Cross-Origin Policies
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Cross-Origin-Resource-Policy": "same-origin",
            # XSS Protection for Legacy Browsers
            "X-XSS-Protection": "1; mode=block",
        }


def apply_security_headers_to_response(headers_dict: Dict[str, str]) -> Dict[str, str]:
    """Utility helper to inject security headers into generic response dictionaries."""
    headers_dict.update(SecurityHeaders.get_headers())
    return headers_dict
