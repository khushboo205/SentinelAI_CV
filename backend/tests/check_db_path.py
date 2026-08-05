from config.config import DATABASE_PATH
import os

print("DATABASE PATH:", DATABASE_PATH)
print("ABSOLUTE PATH:", os.path.abspath(DATABASE_PATH))
print("EXISTS:", os.path.exists(DATABASE_PATH))