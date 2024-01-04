from pydantic import BaseModel
from models.user import User

class AudioClip(BaseModel):
    speechPattern: str
    durations: float
    audio: str
