"""
SentinelAI Logger

Centralized logging for all SentinelAI agents.
"""

import logging
from pathlib import Path


LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)


class LoggerFactory:

    _loggers = {}

    @classmethod
    def get_logger(cls, name: str):

        if name in cls._loggers:
            return cls._loggers[name]

        logger = logging.getLogger(name)

        logger.setLevel(logging.INFO)

        if not logger.handlers:

            formatter = logging.Formatter(
                "%(asctime)s | %(levelname)-8s | %(name)-15s | %(message)s"
            )

            console = logging.StreamHandler()
            console.setFormatter(formatter)

            file = logging.FileHandler(LOG_DIR / f"{name.lower()}.log")
            file.setFormatter(formatter)

            logger.addHandler(console)
            logger.addHandler(file)

        cls._loggers[name] = logger

        return logger