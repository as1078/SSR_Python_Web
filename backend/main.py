from fastapi import FastAPI, File, UploadFile, Form
from config.config_mongo import connect_mongo
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from whisper import Whisper
import os
import subprocess
import time


whisper = Whisper()
connect_mongo()
origins = ["http://localhost:3000"]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/clips/upload/")
def transcribe_audio(
    audio: UploadFile = File(...),
    speech_pattern: str = Form(...),
    durations: float = Form(...),
    ):
    
    #file_extension = audio.filename.split('.')[-1].lower()
    #transcription = whisper.obtain_transcript(audio_path)
    os.makedirs("/tmp", exist_ok=True)

    # Save the uploaded file
    audio_path = f"/tmp/{audio.filename}"
    with open(audio_path, "wb") as f:
        f.write(audio.file.read())

    # Check the file path
    print("Audio Path:", audio_path)

    # Check if the file exists
    if not os.path.isfile(audio_path):
        return JSONResponse(content={"error": "File not found"}, status_code=404)

    # Check the file size
    file_size = os.path.getsize(audio_path)
    print("File Size:", file_size)

    # Check if the file has content
    if file_size == 0:
        return JSONResponse(content={"error": "File is empty"}, status_code=400)
    
    file_path = "/tmp/audiofile.wav"

    result = subprocess.run(["file", file_path], capture_output=True, text=True)
    file_type = result.stdout.strip()  # Remove trailing newline
    print("File type:", file_type)

    timestamp = time.strftime("%Y%m%d_%H%M%S")
    webm_path = audio_path  # Replace with the actual path
    wav_path =  f"/tmp/audiofile_{timestamp}.wav" # Replace with the desired output path

    try:
        subprocess.run(["ffmpeg", "-i", webm_path, wav_path], check=True)
        print("WebM to WAV conversion successful!")
    except subprocess.CalledProcessError as error:
        print("Conversion failed:", error)


    text = whisper.obtain_transcript(wav_path)
    return text
