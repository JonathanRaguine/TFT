from database import engine, Base
from models import Champions, Traits, TeamComp

Base.metadata.create_all(bind=engine)
print("Tables Created!")