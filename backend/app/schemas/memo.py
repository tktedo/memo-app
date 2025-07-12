from pydantic import BaseModel
from datetime import datetime

class MemoCreate(BaseModel):
    content: str

class MemoOut(BaseModel):
    id: int
    content: str
    created_at: datetime

    class Config:
        orm_mode = True

class MemoUpdate(BaseModel):
    content: str