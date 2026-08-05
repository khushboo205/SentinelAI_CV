from database.database import Database

db = Database()

tables = db.fetchall("""
SELECT name
FROM sqlite_master
WHERE type='table'
ORDER BY name
""")

print("\n===== TABLES =====")

for table in tables:
    print(table["name"])