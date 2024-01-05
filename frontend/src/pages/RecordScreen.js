import React, { useState, useContext, useRef, useEffect } from "react";
import { ClipContext } from "../context/ClipContext"
import { DisplayContext } from "../context/DisplayContext"
import axios from "axios"

export default function RecordScreen() {
  const {
	setRecordings,
	durations,
	setDurations,
} = useContext(ClipContext)
const { speechPattern } = useContext(DisplayContext);
const [transcript, setTranscript] = useState("");
const [permission, setPermission] = useState(false);
const mediaRecorder = useRef(null);
const [recordingStatus, setRecordingStatus] = useState("inactive");
const [stream, setStream] = useState(null);
const [audio, setAudio] = useState(null);
const [audioFile, setAudioFile] = useState(null);
const [clipDuration, setClipDuration] = useState(durations)
const [audioChunks, setAudioChunks] = useState([]);
const [globalBlob, setGlobalBlob] = useState(null);
const mimeType = "audio/wav";
const intervalRef = useRef(null);
const host = "http://localhost:8000"


const getMicrophonePermission = async () => {
  if ("MediaRecorder" in window) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(mediaStream);
    } catch (err) {
      alert(err.message);
    }
  } else {
    alert("The MediaRecorder API is not supported in your browser.");
  }
};
  useEffect(() => {
      return () => {
        // Clear the interval when the component unmounts
        clearInterval(intervalRef.current);
      };
    }, []);

  const startRecording = async () => {
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { type: mimeType });

		mediaRecorder.current = media;

		mediaRecorder.current.start();

		let localAudioChunks = [];
    const startTime = Date.now()
    const interval = setInterval(() => {
      const value = (Date.now() - startTime) / 1000
      setClipDuration(value)
    }, 51)
		mediaRecorder.current.ondataavailable = (event) => {

      if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
    intervalRef.current = interval;
	};

  const stopRecording = () => {
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
      const file = new File([audioBlob], "audiofile.wav", {
        type: "audio/wav",
      });
			const audioUrl = URL.createObjectURL(audioBlob);
      //clipFormData.append('audioFile', audioBlob, 'audio.wav');
			setAudio(audioUrl);
      setAudioFile(file);
      setGlobalBlob(audioBlob);
      clearInterval(intervalRef.current);
      setAudioChunks([]);
      setDurations(clipDuration);
      // recordings[index] = audioBlob;
      // durations[index] = clipDuration;
		};
	};

  async function getTranscript() {
    if (!audio) return alert("Has not recorded yet")
		console.log("Uploading clips...")
			const clipData = {
				speechPattern,
				durations,
        audio,
			}
		console.log(clipData);
		try {
      const clipFormData = new FormData();
      clipFormData.append("audio", audioFile);
      clipFormData.append("speech_pattern", speechPattern);
      clipFormData.append("durations", durations);
			await axios.post(host + "/clips/upload", clipFormData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
            .then(res=>{
                if(res.status === 200){
                  console.log("Clip successfully uploaded")
                  console.log(res)
                  setTranscript(res.data);
              }
                else if(res.status===400){
                    alert("There was an error uploading")
					          console.log(res)
                }
            })
            .catch(e=>{
                alert("There was an issue with transcription")
                console.log(e);
            })
		}
		catch (e) {
			console.log(e);
		}
	}

	function resetState() {
		setRecordings(null)
		setDurations(0)
	}

  return (
    <div className="record-clip">
      <h1>Record Clip</h1>
      <div className="transcript">
        {/* Display transcript */}
      </div>
      <div className="audio-controls">
					{!permission ? (
						<button onClick={getMicrophonePermission} type="button">
							Get Microphone
						</button>
					) : null}
					{permission && recordingStatus === "inactive" ? (
						<button onClick={startRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopRecording} type="button">
							Stop Recording
						</button>
					) : null}
			</div>
      <div className="recording-info">
        {recordingStatus === "recording" ?
        ( <p>Recording: {clipDuration} seconds</p>)
      :  (
        <p>Recording: {clipDuration} seconds</p>
      )}
      </div>
      {audio ? (
    <div className="audio-container">
      <audio src={audio} controls></audio>
      <a download href={audio}>
          Download Recording
      </a>
    </div>
    ) : null}
    <button onClick={getTranscript}>Get Transcript</button>
    {transcript ? (
      <button onClick={resetState}>Record Again</button>
    ): null}
    {transcript ? (
      <p>Transcript: {transcript}</p>
    ): null}
  </div>
    
  );
}