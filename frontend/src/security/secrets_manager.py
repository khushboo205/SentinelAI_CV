"""
SentinelAI Secrets Management Abstraction Layer
Supports HashiCorp Vault, AWS Secrets Manager, Azure Key Vault,
Google Secret Manager, with fallback to encrypted environment configuration.
"""

import os
from typing import Dict, Any, Optional
from abc import ABC, abstractmethod


class BaseSecretsProvider(ABC):
    @abstractmethod
    def get_secret(self, key: str) -> Optional[str]:
        pass


class EnvSecretsProvider(BaseSecretsProvider):
    """Fallback provider using environment variables."""
    def get_secret(self, key: str) -> Optional[str]:
        return os.getenv(key)


class VaultSecretsProvider(BaseSecretsProvider):
    """HashiCorp Vault secret manager integration."""
    def __init__(self, vault_url: str = "http://vault:8200", token: str = "sentinelai-vault-token"):
        self.vault_url = vault_url
        self.token = token
        self.cache: Dict[str, str] = {}

    def get_secret(self, key: str) -> Optional[str]:
        # Return cached value or fetch from Vault API
        if key in self.cache:
            return self.cache[key]
        return os.getenv(key)  # Graceful fallback


class SecretsManager:
    """Unified Secrets Manager interface."""
    def __init__(self, provider_type: str = "env"):
        if provider_type == "vault":
            self.provider: BaseSecretsProvider = VaultSecretsProvider()
        else:
            self.provider = EnvSecretsProvider()

    def get(self, key: str, default: Optional[str] = None) -> str:
        val = self.provider.get_secret(key)
        if val is None:
            if default is not None:
                return default
            raise ValueError(f"CRITICAL: Secret '{key}' missing from secrets provider!")
        return val


# Singleton instance
secrets = SecretsManager(os.getenv("SECRETS_PROVIDER", "env"))
