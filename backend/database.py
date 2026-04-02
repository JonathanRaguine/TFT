from sqlalchemy import create_engine
<<<<<<< HEAD
from sqlalchemy.orm import declarative_base
=======
from sqlalchemy.ext.declarative import declarative_base
>>>>>>> cc000b02f178f3440c0de6240ccda5d8d80a6949
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

<<<<<<< HEAD
load_dotenv()

# Check for DATABASE_URL first (set by Docker)
# Fall back to building it manually (local development)
DATABASE_URL = os.getenv('DATABASE_URL',
    f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@127.0.0.1:5432/tft_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
=======
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
>>>>>>> cc000b02f178f3440c0de6240ccda5d8d80a6949
