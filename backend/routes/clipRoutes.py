from fastapi import APIRouter
from models.clip import AudioClip
from whisper import Whisper

whisper = Whisper()
clipRouter = APIRouter()


def process_audio(audio: AudioClip):
    return audio

@clipRouter.post("/clips/upload/")
def transcribe_audio(req: AudioClip):
    
    return ""

    #text = whisper.obtain_transcript(filename)
    #return text