import { React, useContext, useEffect} from "react"
import { Link } from "react-router-dom"
import { UserContext} from "../context/UserContext";
import useStartup from "../components/util/useStartup"

const linkStyle = {
	color: 'blue', // Change the color to your desired color
	textDecoration: 'none', // Remove the underline
  };

function LoginLink(){
	return (
		<div>
			<Link to="/login" style={linkStyle}>Click Here to Login</Link>, or 
			<Link to="/userinfo" style={linkStyle}> Get Started Here</Link>
		</div>
		
	)	
}

function UploadScript() {
	return (
	<div>
		<Link to="/record" style={linkStyle}>Click Here to Get Started Recording</Link>
	</div>
	)
}

export default function WelcomeScreen() {
	const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
	  let name = "";
	  console.log(isLoggedIn);
	  console.log(currentUser);
	  if (currentUser) {
		name = currentUser.username;
	  }
	
	//   const callStartup = useStartup();
	//   callStartup();
	
	return (
		<div>
			<h1>Welcome {name} to the SSR Team Data Collection App</h1>
			<p>
				This app is our crowdsourced effor to gather data to build speech
				recognition systems that understand stuttering. We're collecting data
				of stuttered and fluent speech to accomplish this, and we need your
				help recording samples.
			</p>
			{isLoggedIn ?  <UploadScript/>: <LoginLink/>}
		</div>
			
	)
}
