"""
SentinelAI Configuration Loader
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml


class Config:
    """
    Loads SentinelAI configuration from YAML.
    """

    def __init__(self, config_path: str = "config/settings.yaml"):
        self.config_path = Path(config_path)

        if not self.config_path.exists():
            raise FileNotFoundError(
                f"Configuration file not found: {self.config_path}"
            )

        with self.config_path.open("r", encoding="utf-8") as file:
            self.data = yaml.safe_load(file)

    def get(self, *keys: str, default: Any = None) -> Any:
        """
        Access nested configuration values.

        Example:
            config.get("detector", "model")
        """
        value = self.data

        for key in keys:
            if not isinstance(value, dict):
                return default

            value = value.get(key)

            if value is None:
                return default

        return value