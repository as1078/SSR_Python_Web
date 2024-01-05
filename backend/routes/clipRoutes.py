from fastapi import APIRouter, File, UploadFile, Form
from models.clip import AudioClip
from whisper import Whisper
import soundfile
import io
import os
from starlette.responses import JSONResponse
import soundfile as sf
import subprocess

whisper = Whisper()
clipRouter = APIRouter()

@clipRouter.post("/clips/upload/")
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
    
    file_path = "/tmp/audiofile.mp3"

    result = subprocess.run(["file", file_path], capture_output=True, text=True)
    file_type = result.stdout.strip()  # Remove trailing newline
    print("File type:", file_type)

    webm_path = audio_path  # Replace with the actual path
    wav_path =  "/tmp/audiofile2.wav" # Replace with the desired output path

    try:
        subprocess.run(["ffmpeg", "-i", webm_path, wav_path], check=True)
        print("WebM to WAV conversion successful!")
    except subprocess.CalledProcessError as error:
        print("Conversion failed:", error)


    # Check the file format
    #array, sampling_rate = sf.read(wav_path)
    

    # Now you can proceed with transcription or further processing
    
    #return f.name

    text = whisper.obtain_transcript(wav_path)
    return text