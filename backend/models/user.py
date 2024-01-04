from pydantic import BaseModel

class User(BaseModel):
    username: str
    stutterPattern: str
    age: int
    gender: str
    pitch: str
    numRecordedClips: int
    accent: str
    otherCharacteristics: str