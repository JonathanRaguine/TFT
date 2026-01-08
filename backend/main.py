from fastapi import FastAPI
from database import engine, Base
import models

#creates table defined in models.py
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get('/')
def read_root():
    return {"message": "TFT Comp Builder API"}