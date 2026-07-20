from sqlalchemy import Column, Integer, String, Boolean, Table, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

"""
What the data looks like (template)
"""

"""Column(
    Integer,           # Data type: Integer, String, Boolean, etc.
    primary_key=True,  # Is this the unique row identifier?
    nullable=False,    # Can this be empty? False = required
    unique=True,       # Must all values be different?
    default=0,         # Value if none provided
    index=True         # Speed up searches on this column
    )
"""
champion_trait = Table(
    'champion_trait', Base.metadata,
    Column('champions', Integer, ForeignKey('champions.id')),
    Column('traits', Integer, ForeignKey('traits.id')))

teamcomp_champion = Table(
    'teamcomp_champion', Base.metadata,
    Column('teamcomps', Integer, ForeignKey('teamcomps.id')),
    Column('champions', Integer, ForeignKey('champions.id'))
)

image_id = Column(String)
class Champions(Base):                       #Inherits from base, registers as a table
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True)  #unique ID for each row
    image_id = Column(String)
    name = Column(String, nullable=False,unique=True, index=True) 
    cost = Column(Integer, nullable=False, index=True)
    is_unlockable = Column(Boolean, default=False)
    unlock_requirement = Column(String)
    traits = relationship("Traits", secondary=champion_trait, back_populates='champions')
    teamcomps = relationship("TeamComp", secondary=teamcomp_champion, back_populates='champions')

class Traits(Base):
    __tablename__ = 'traits'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    trait_type = Column(String)
    breakpoints = Column(String)
    description = Column(String)
    champions = relationship("Champions", secondary=champion_trait, back_populates='traits')

class TeamComp(Base):
    __tablename__ = 'teamcomps'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String)
    champions = relationship("Champions", secondary=teamcomp_champion, back_populates='teamcomps')

class Items(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    image_id = Column(String)
    is_component = Column(Boolean, default=False)
    description = Column(String)
    component1 = Column(String)
    component2 = Column(String)

# A team a user published from the hexboard. Kept separate from TeamComp (which
# is curated/global with a join table) because these are user-owned snapshots we
# want to store and return whole, not query by individual champion.
class SavedTeam(Base):
    __tablename__ = 'saved_teams'

    id = Column(Integer, primary_key=True)
    # Owner key. Indexed because every read filters by it (list this user's teams).
    # It's an anonymous localStorage id today; becomes the Cognito `sub` once auth
    # exists. Kept as a plain String so that swap needs no schema change.
    user_id = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False)
    # The board is stored as one JSONB blob ({ "A1": {champion + items}, ... })
    # rather than normalized rows: it's an immutable snapshot that's always loaded
    # as a whole, so a document beats join tables here. JSONB (not JSON) so Postgres
    # can index/query inside it later if we ever need to.
    board = Column(JSONB, nullable=False)
    # server_default=func.now() lets the DB stamp the time, so it's consistent
    # regardless of the app server's clock/timezone; used to order the list.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
