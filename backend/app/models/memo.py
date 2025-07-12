from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Memo(Base):
    __tablename__ = "memos"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
