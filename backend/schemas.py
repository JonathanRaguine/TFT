from pydantic import BaseModel
from typing import List, Optional


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