import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { DisplayContext } from "../context/DisplayContext"
import { UserContext } from "../context/UserContext"

export default function LoginScreen() {
	const history= useNavigate();
	const {
		username,
		password,
		setUsername,
		setPassword,
	} = useContext(DisplayContext)
	const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
	const URL = "http://localhost:8000"
	async function submit(e) {
		e.preventDefault()
		try {
			await axios.post(URL + "/auth/login",{
                username, password
            })
            .then(res=>{
                if(res.status === 200){
					const { user, token } = res.data;
					setIsLoggedIn(true);
            		setCurrentUser(user);

					// Now, after setting the state, store the values in localStorage
					localStorage.setItem('isLoggedIn', true);
					localStorage.setItem('currentUser', JSON.stringify(user));
					localStorage.setItem("authToken", token);

                    history("/home",  { replace: true })
                }
                else if(res.status===400){
                    alert("User has not signed up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
		}
		catch (e) {
			console.log(e);
		}
	}
	return (
		<div className="login">
			<h1>Login</h1>
			<form action="POST">
				<input type="email" onChange={(e)=>{setUsername(e.target.value)}} placeholder="username"/>
				<input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password"/>
			<input type="submit" onClick={submit}/>
			</form>
		</div>
	)
}