from fastapi import FastAPI, Depends
from database import engine, Base, SessionLocal
from models import Champions, Traits
from sqlalchemy.orm import Session, joinedload
from fastapi.middleware.cors import CORSMiddleware

#creates table defined in models.py
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {"message": "TFT Comp Builder API"}

def get_db():
    db = SessionLocal()
    try: yield db
    finally:
        db.close()

@app.get('/champions')
def get_champions(db: Session = Depends(get_db)):
    return db.query(Champions).options(joinedload(Champions.traits)).all()

@app.get('/traits')
def get_traits(db: Session = Depends(get_db)):
    return db.query(Traits).all()

@app.get('/champions/{champion_id}')
def get_champion(champion_id: int, db: Session = Depends(get_db)):
    return db.query(Champions).filter(Champions.id == champion_id).first()