from sqlalchemy.orm import Session
from app.models.memo import Memo
from app.schemas.memo import MemoCreate, MemoUpdate

def create_memo(db: Session, memo: MemoCreate):
    db_memo = Memo(content=memo.content)
    db.add(db_memo)
    db.commit()
    db.refresh(db_memo)
    return db_memo

def get_all_memos(db: Session):
    return db.query(Memo).order_by(Memo.created_at.desc()).all()

def delete_memo(db: Session, memo_id: int):
    db_memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if db_memo is None:
        return None
    db.delete(db_memo)
    db.commit()
    return db_memo

def update_memo(db: Session, memo_id: int, memo: MemoUpdate):
    db_memo = db.query(Memo).filter(Memo.id == memo_id).first()
    if db_memo is None:
        return None
    db_memo.content = memo.content
    db.commit()
    db.refresh(db_memo)
    return db_memo