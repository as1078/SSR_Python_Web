import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DisplayContext } from "../context/DisplayContext"

export default function UserInfoScreen() {
	const navigate = useNavigate()
	const {
		age,
		gender,
		otherGender,
		stutterPattern,
		accent,
		otherAccent,
		pitch,
		otherCharacteristics,
		setAge,
		setGender,
		setOtherGender,
		setStutterPattern,
		setAccent,
		setOtherAccent,
		setPitch,
		setOtherCharacteristics,

	} = useContext(DisplayContext)
	const genderOptions = ["Male", "Female", "Other"]
	const pitchOptions = ["High-pitch", "Medium-pitch", "Low-pitch"]
	const stutterOptions = ["None", "Little", "Moderate", "Frequent"]
	async function submit(e) {
		navigate("/signup")
	}
	return (
		<div className="userInfo">
			<h1>Enter Your Information</h1>
			<form action="POST">
				<input type="number" onChange={(e)=>{setAge(e.target.value)}} placeholder="Age"/>
				<label htmlFor="gender">
					<select value={gender} onChange={(e) => setGender(e.target.value)}>
					<option value="">What is your gender?</option>
					{genderOptions.map((option, index) => (
						<option key={index} value={option}>
						{option}
						</option>
					))}
					</select>
				</label>
				<label htmlFor="pitch">
					<select value={pitch} onChange={(e) => setPitch(e.target.value)}>
					<option value="">Please select your voice pitch.</option>
					{pitchOptions.map((option, index) => (
						<option key={index} value={option}>
						{option}
						</option>
					))}
					</select>
				</label>
				<label htmlFor="stutter">
					<select value={stutterPattern} onChange={(e) => setStutterPattern(e.target.value)}>
					<option value="">Please select your level of stuttering.</option>
					{stutterOptions.map((option, index) => (
						<option key={index} value={option}>
						{option}
						</option>
					))}
					</select>
				</label>
				<label htmlFor="accent">
					<input type="text" placeholder="Enter your accent" value={accent} 
					onChange={(e) => setAccent(e.target.value)}/>
				</label>
				<input type="submit" onClick={submit} value="next"/>
			</form>
		</div>
	)
}
