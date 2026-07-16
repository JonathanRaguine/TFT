from fastapi import FastAPI, Depends, HTTPException
from database import engine, Base, SessionLocal
from models import Champions, Traits, Items, SavedTeam
from schemas import ChampionResponse, TraitResponse, SavedTeamCreate, SavedTeamResponse
from sqlalchemy.orm import Session, joinedload
from fastapi.middleware.cors import CORSMiddleware
from typing import List

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

@app.get('/champions', response_model=List[ChampionResponse])
def get_champions(db: Session = Depends(get_db)):
    return db.query(Champions).options(joinedload(Champions.traits)).all()

@app.get('/traits', response_model=List[TraitResponse])
def get_traits(db: Session = Depends(get_db)):
    return db.query(Traits).all()

@app.get('/champions/{champion_id}', response_model=ChampionResponse)
def get_champion(champion_id: int, db: Session = Depends(get_db)):
    champion = db.query(Champions).filter(Champions.id == champion_id).first()
    if not champion:
        raise HTTPException(status_code=404, detail="Champion not found")
    return champion

@app.get('/items')
def get_items(db: Session = Depends(get_db)):
    return db.query(Items).all()

@app.get('/saved-teams', response_model=List[SavedTeamResponse])
def get_saved_teams(user_id: str, db: Session = Depends(get_db)):
    return (
        db.query(SavedTeam)
        .filter(SavedTeam.user_id == user_id)
        .order_by(SavedTeam.created_at)
        .all()
    )

@app.post('/saved-teams', response_model=SavedTeamResponse)
def create_saved_team(payload: SavedTeamCreate, db: Session = Depends(get_db)):
    team = SavedTeam(user_id=payload.user_id, name=payload.name, board=payload.board)
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

@app.delete('/saved-teams/{team_id}')
def delete_saved_team(team_id: int, user_id: str, db: Session = Depends(get_db)):
    team = (
        db.query(SavedTeam)
        .filter(SavedTeam.id == team_id, SavedTeam.user_id == user_id)
        .first()
    )
    if not team:
        raise HTTPException(status_code=404, detail="Saved team not found")
    db.delete(team)
    db.commit()
    return {"ok": True}