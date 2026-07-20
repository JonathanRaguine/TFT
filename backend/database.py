from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Pull secrets from a .env file so passwords never live in the code/repo.
load_dotenv()

# Read the whole connection string from an env var first, and only build a
# localhost one as a fallback. This is what lets the exact same code run in
# every environment (local, Docker, AWS RDS) — you point it at a different
# database by changing the env var, never by editing this file.
DATABASE_URL = os.getenv('DATABASE_URL',
    f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@127.0.0.1:5432/tft_db"
)

engine = create_engine(DATABASE_URL)
# autoflush=False so queries don't trigger surprise writes mid-request; we
# commit explicitly instead, which keeps when-data-hits-the-DB predictable.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Every model inherits from this so SQLAlchemy knows the full set of tables
# (used by create_all() on startup).
Base = declarative_base()