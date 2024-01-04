import { useContext } from "react"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { ClipContext } from "../../context/ClipContext"
import { DisplayContext } from "../../context/DisplayContext"

export default function useStartup() {
	console.log("Running use startup...")
	const { setCurrentUser, isLoggedIn } = useContext(UserContext)
	const URL = "http://localhost:8000"
	const {
		setCurrentTranscriptIds,
		setTranscripts,
		setClips,
		setPastClipIds,
	} = useContext(ClipContext)
	const data = {}
	const { setTotalDuration, setNumTotalClips } = useContext(DisplayContext)

	async function callStartup() {
		console.log("Running call start...")
		if (!isLoggedIn) {
			console.log("You must be logged in")
			return;
		}
		const authToken = localStorage.getItem("authToken")
		await axios.get(URL + "/startup",{
			headers: {
				"x-auth-token": authToken,
			},
		})
		.then(res=>{
			console.log("response received")
			if(res.status === 200){
				console.log("Successful request")
				data = res.data;
			}
			else if(res.status===400){
				alert("There is an issue")
			}
		})
		.catch(e=>{
			alert("Unable to load transcripts")
			console.log(e);
		})
		const {
			user,
			transcripts,
			transcriptIds,
			clips,
			clipIds,
			totalDuration,
			numTotalClips,
		} = data;
		setCurrentUser(user)
		setCurrentTranscriptIds(transcriptIds)
		setTranscripts(transcripts)
		setClips(clips)
		setPastClipIds(clipIds)
		setTotalDuration(totalDuration)
		setNumTotalClips(numTotalClips)
		console.log("Finished loading transcripts")
		console.log("Transcripts:", transcripts)
	}
	return callStartup
}
