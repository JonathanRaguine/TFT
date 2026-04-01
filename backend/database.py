from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Check for DATABASE_URL first (set by Docker)
# Fall back to building it manually (local development)
DATABASE_URL = os.getenv('DATABASE_URL',
    f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@127.0.0.1:5432/tft_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()