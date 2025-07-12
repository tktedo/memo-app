from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.schemas.memo import MemoCreate, MemoOut, MemoUpdate
from app.crud import memo as memo_crud
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from app.models import memo as memo_model
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js設定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoCreate, db: Session = Depends(get_db)):
    return memo_crud.create_memo(db, memo)

@app.get("/memos", response_model=List[MemoOut])
def read_memos(db: Session = Depends(get_db)):
    return memo_crud.get_all_memos(db)

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int, db: Session = Depends(get_db)):
    deleted_memo = memo_crud.delete_memo(db, memo_id)
    if deleted_memo is None:
       raise HTTPException(status_code=404, detail="Memo not found")
    return {"message": "Memo deleted successfully", "memo": deleted_memo}

@app.put("/memos/{memo_id}")
def update_memo(memo_id: int, memo: MemoUpdate, db: Session = Depends(get_db)):
    updated_memo = memo_crud.update_memo(db, memo_id, memo)
    if updated_memo is None:
        raise HTTPException(status_code=404, detail="Memo not found")
    return updated_memo