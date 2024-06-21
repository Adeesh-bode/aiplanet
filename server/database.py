from sqlalchemy import create_engine, MetaData

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Create a connection
conn = engine.connect()
