from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


# Schema for a Trait
class TraitResponse(BaseModel):
    id: int
    name: str
    trait_type: Optional[str] = None
    breakpoints: Optional[str] = None
    description: Optional[str] = None

    # This tells Pydantic to work with SQLAlchemy objects
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


# Schema for creating a saved team
class SavedTeamCreate(BaseModel):
    user_id: str
    name: str
    board: Dict[str, Any]  # position -> champion (with items) snapshot


# Schema for returning a saved team
class SavedTeamResponse(BaseModel):
    id: int
    user_id: str
    name: str
    board: Dict[str, Any]
    created_at: datetime

    model_config = {"from_attributes": True}