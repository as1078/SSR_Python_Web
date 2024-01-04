import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { DisplayContext } from "../context/DisplayContext"
import { range } from "../components/util/range"
import { ClipContext } from "../context/ClipContext"

export default function SubmitScreen() {
	const history = useNavigate()
	const URL = "http://localhost:8000"
	const {
		currentTranscriptIds,
		transcripts,
		setCurrentTranscriptIds,
		setTranscripts,
		recordings,
		setRecordings,
		durations,
		setDurations,
	} = useContext(ClipContext)
	const { username } = useContext(DisplayContext)

	const { speechPattern } = useContext(DisplayContext)

	async function getTranscript() {
		console.log("Uploading clips...")
		//const recordingURIs = recordings.map((recording) => recording.getURI())
			const clipMetadata = {
				username,
				speechPattern,
				durations,
				//recordingURIs,
			}
		const clipData = { clipMetadata }
		console.log(clipData);
		try {
			await axios.post(URL + "/clips/transcribe", "")
            .then(res=>{
                if(res.status === 200){
					console.log("Clip successfully uploaded")
					console.log(res.data)
					// const { transcriptMap, transcriptIds } = res.data
					// setTranscripts({ ...transcripts, ...transcriptMap })
					// setCurrentTranscriptIds(transcriptIds)
					resetState()
                    history(URL + "/home")
                }
                else if(res.status===400){
                    alert("There was an error uploading")
					console.log(res)
                }
            })
            .catch(e=>{
                alert("")
                console.log(e);
            })
		}
		catch (e) {
			console.log(e);
		}
	}

	function resetState() {
		const NUMBER_OF_CLIPS = 5
		setRecordings(range(NUMBER_OF_CLIPS).map(() => null))
		setDurations(range(NUMBER_OF_CLIPS).map(() => 0))
	}

	return (
		<div>
			<h1>Submit Screen</h1>
			<button onClick={getTranscript}>Get Transcript</button>
		</div>
	)
}
