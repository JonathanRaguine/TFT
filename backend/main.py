from fastapi import FastAPI, Depends, HTTPException
from database import engine, Base, SessionLocal
from models import Champions, Traits, Items, SavedTeam
from schemas import ChampionResponse, TraitResponse, SavedTeamCreate, SavedTeamResponse
from sqlalchemy.orm import Session, joinedload
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Auto-create any missing tables on startup. It's why adding a new model (like
# SavedTeam) needs no separate migration step — the table appears on next boot.
# Note: it only *creates* missing tables, it won't alter columns on existing ones.
Base.metadata.create_all(bind=engine)

app = FastAPI()
# The React app runs on a different origin (port 3000) than this API (8000), so
# browsers block its requests unless we explicitly allow that origin here.
# For AWS this list needs the deployed frontend's domain added.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://18.218.49.125:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {"message": "TFT Comp Builder API"}

# One DB session per request: FastAPI injects it via Depends, and the finally
# block guarantees the connection is returned to the pool even if the handler
# raises. Yielding (not returning) is what lets that cleanup run after the response.
def get_db():
    db = SessionLocal()
    try: yield db
    finally:
        db.close()

@app.get('/champions', response_model=List[ChampionResponse])
def get_champions(db: Session = Depends(get_db)):
    # joinedload pulls each champion's traits in the same query. Without it,
    # serializing traits for every champion would fire a separate query per row
    # (the N+1 problem) and make this endpoint slow.
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

# Always filter by user_id so one person only ever sees their own teams — this
# is what makes the feature per-user. order_by(created_at) gives a stable
# oldest-first list instead of relying on insertion order.
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
    # refresh so the returned object has the DB-generated id and created_at; the
    # frontend needs that id to delete the team later.
    db.refresh(team)
    return team

@app.delete('/saved-teams/{team_id}')
def delete_saved_team(team_id: int, user_id: str, db: Session = Depends(get_db)):
    # Match on BOTH id and user_id so a user can't delete someone else's team by
    # guessing an id — ownership is enforced, not just existence. (Once Cognito
    # is added, user_id comes from the verified token instead of the query string.)
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