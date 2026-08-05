from database.schema import Schema


def initialize_database():
    print("Initializing Database...")

    schema = Schema()

    schema.create_tables()

    print("Database Initialized.")