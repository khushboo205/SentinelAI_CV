from database.schema import Schema

print("Creating database...")

schema = Schema()
schema.create_tables()

print("Done.")