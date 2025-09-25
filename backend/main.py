from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
import os, httpx, asyncio

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class ScanResult(Base):
    __tablename__ = "scan_results"
    id = Column(Integer, primary_key=True, index=True)
    target = Column(String)
    score = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    raw_data = Column(JSON)

Base.metadata.create_all(bind=engine)

class ScanRequest(BaseModel):
    target: str

# Реальные API
async def get_shodan_data(ip):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"https://api.shodan.io/shodan/host/{ip}?key=8bxd564SC8AIagKacX6R164BESikhjRQ")
        return r.json() if r.status_code == 200 else None

async def get_securitytrails_data(domain):
    headers = {"APIKEY": "vhfhvClJMagpOS4Y02VEFnmgqeOmGyu4"}
    async with httpx.AsyncClient() as client:
        r = await client.get(f"https://api.securitytrails.com/v1/domain/{domain}", headers=headers)
        return r.json() if r.status_code == 200 else None

app = FastAPI()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.post("/api/scan")
async def scan(scan_req: ScanRequest, db: Session = Depends(get_db)):
    target = scan_req.target
    raw_data = {}
    score = 70  # демо-оценка

    if "." in target and ":" not in target:
        # Домен → SecurityTrails
        st_data = await get_securitytrails_data(target)
        raw_data["securitytrails"] = st_data
        score = 85 if st_data else 60
    elif target.replace(".", "").replace(":", "").isdigit():
        # IP → Shodan
        ip = target.split(":")[0]
        shodan_data = await get_shodan_data(ip)
        raw_data["shodan"] = shodan_data
        score = 80 if shodan_data else 50

    scan = ScanResult(target=target, score=score, raw_data=raw_data)
    db.add(scan)
    db.commit()
    db.refresh(scan)
    return {"scan_id": scan.id, "score": score, "data": raw_data}