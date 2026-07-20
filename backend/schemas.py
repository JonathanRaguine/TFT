from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


# These schemas are the API's public contract. They're deliberately separate
# from the SQLAlchemy models so we control exactly which fields go over the wire
# and can validate incoming JSON — the DB shape and the API shape can evolve
# independently.


# Schema for a Trait
class TraitResponse(BaseModel):
    id: int
    name: str
    trait_type: Optional[str] = None
    breakpoints: Optional[str] = None
    description: Optional[str] = None

    # Lets Pydantic read straight off SQLAlchemy row objects (obj.name) instead
    # of requiring a dict, so handlers can just return the ORM object.
    model_config = {"from_attributes": True}


# Schema for a Champion
class ChampionResponse(BaseModel):
    id: int
    name: str
    image_id: Optional[str] = None
    cost: int
    is_unlockable: Optional[bool] = False
    unlock_requirement: Optional[str] = None
    traits: List[TraitResponse] = []

    model_config = {"from_attributes": True}


# Separate Create vs Response because the client doesn't send id/created_at
# (the DB generates those) — only what it actually provides on creation.
class SavedTeamCreate(BaseModel):
    user_id: str
    name: str
    # Dict[str, Any] on purpose: the board is a free-form snapshot of whatever
    # the frontend has for a champion (position -> champion + items). We don't
    # want to redefine/validate the champion shape here and have to keep it in
    # sync every time the frontend adds a field.
    board: Dict[str, Any]


# Schema for returning a saved team
class SavedTeamResponse(BaseModel):
    id: int
    user_id: str
    name: str
    board: Dict[str, Any]
    created_at: datetime

    model_config = {"from_attributes": True}