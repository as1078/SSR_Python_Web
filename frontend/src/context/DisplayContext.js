import { useState, useEffect, useContext, createContext } from "react"

const DisplayContext = createContext()
function DisplayContextProvider({ children }) {
	const [age, setAge] = useState(null)
	const [gender, setGender] = useState("")
	const [otherGender, setOtherGender] = useState("")
	const [stutterPattern, setStutterPattern] = useState("")
	const [accent, setAccent] = useState("")
	const [otherAccent, setOtherAccent] = useState("")
	const [pitch, setPitch] = useState("")
	const [otherCharacteristics, setOtherCharacteristics] = useState("")
	const [username, setUsername] = useState("uname_0001")
	const [password, setPassword] = useState("asdf")
	const [speechPattern, setSpeechPattern] = useState("fluent")
	const [totalDuration, setTotalDuration] = useState(0)
	const [numTotalClips, setNumTotalClips] = useState(0)

	const stateVariables = {
		age,
		gender,
		otherGender,
		stutterPattern,
		accent,
		otherAccent,
		pitch,
		otherCharacteristics,
		username,
		password,
		speechPattern,
		totalDuration,
		numTotalClips,
	}
	const stateFunctions = {
		setAge,
		setGender,
		setOtherGender,
		setStutterPattern,
		setAccent,
		setOtherAccent,
		setPitch,
		setOtherCharacteristics,
		setUsername,
		setPassword,
		setSpeechPattern,
		setTotalDuration,
		setNumTotalClips,
	}
	return (
		<DisplayContext.Provider value={{ ...stateVariables, ...stateFunctions }}>
			{children}
		</DisplayContext.Provider>
	)
}

export { DisplayContext, DisplayContextProvider }
