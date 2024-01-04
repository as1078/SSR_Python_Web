import React, { useState, createContext, useEffect } from "react"

const UserContext = createContext()
function UserContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	useEffect(() => {
		console.log("Running use effect...")
		const storedLoggedIn = localStorage.getItem('isLoggedIn');
		console.log(storedLoggedIn)
		const initialLoggedInState = storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
		const storedCurrentUser = localStorage.getItem('currentUser');
		console.log(storedCurrentUser);
		const initialCurrentUserState = storedCurrentUser ? JSON.parse(storedCurrentUser) : false;
		setIsLoggedIn(initialLoggedInState);
		setCurrentUser(initialCurrentUserState);
	  },[]);
	
	//   useEffect(() => {
	// 	console.log("When isLoggedIn changes, update localStorage")
	// 	sessionStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
	// 	sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
	//   }, [isLoggedIn, currentUser]);
	
	const stateVariables = { currentUser, isLoggedIn }
	const stateFunctions = { setCurrentUser, setIsLoggedIn }
	return (
		<UserContext.Provider value={{ ...stateVariables, ...stateFunctions }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserContextProvider }
