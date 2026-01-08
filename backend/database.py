from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

"""
The Database connection
This file creates a connection between my python code and PSQL database.

"""

load_dotenv()

DATABASE_URL = f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@127.0.0.1:5432/tft_db"

#creates the connection
engine = create_engine(DATABASE_URL)

#creates session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#helper function 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()