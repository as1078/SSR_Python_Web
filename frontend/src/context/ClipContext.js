import { useState, useEffect, useContext, createContext } from "react"

import { range } from "../components/util/range"

const ClipContext = createContext()
function ClipContextProvider({ children }) {
	const [transcripts, setTranscripts] = useState({})
	const [clips, setClips] = useState({})
	const [pastClipIds, setPastClipIds] = useState([])
	const [currentTranscriptIds, setCurrentTranscriptIds] = useState(null)
	const [recordings, setRecordings] = useState(new Blob())
	const [durations, setDurations] = useState(0)
	const clipFormData = new FormData();

	const stateVariables = {
		transcripts,
		clips,
		pastClipIds,
		setClips,
		currentTranscriptIds,
		recordings,
		durations,
		clipFormData,
	}
	const stateFunctions = {
		setTranscripts,
		setClips,
		setPastClipIds,
		setCurrentTranscriptIds,
		setRecordings,
		setDurations,
	}
	return (
		<ClipContext.Provider value={{ ...stateFunctions, ...stateVariables }}>
			{children}
		</ClipContext.Provider>
	)
}

export { ClipContext, ClipContextProvider }
