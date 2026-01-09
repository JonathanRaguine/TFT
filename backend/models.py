from sqlalchemy import Column, Integer, String, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
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


class Champions(Base):                       #Inherits from base, registers as a table
    __tablename__ = 'champions'

    id = Column(Integer, primary_key=True)  #unique ID for each row
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
