import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { DisplayContext } from "../context/DisplayContext"
import { UserContext } from "../context/UserContext"

export default function SignupScreen() {
	const {
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
		setUsername,
		setPassword,
	} = useContext(DisplayContext)
	const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
	let navigate = useNavigate();
	const URL = "http://localhost:8000"
	async function submit(e) {
		const signupInfo = {
			username,
			password,
			stutterPattern,
			age,
			gender: gender === "other" ? otherGender : gender,
			accent: accent === "other" ? otherAccent : accent,
			pitch,
			otherCharacteristics,
		}
		e.preventDefault()
		try {
			console.log(signupInfo)
			await axios.post(URL + "/auth/signup", signupInfo)
            .then(res=>{
				if (res.status === 200) {
					const { user, token } = res.data
					Promise.all([
						setCurrentUser(user),
						setIsLoggedIn(true),
					 ]);
					navigate('/home')
				}
            
            })
            .catch(e=>{
				console.log(e)
				alert(e.response.data)
            })
		}
		catch (e) {
			console.log(e);
		}
	}
	return (
		<div className="signup">
			<h1>Signup: Enter Your Username and Password Here</h1>
			<form action="POST">
				<input type="username" onChange={(e)=>{setUsername(e.target.value)}} placeholder="username"/>
				<input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password"/>

			<input type="submit" onClick={submit}/>
			</form>
		</div>
	)
}