import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { UserContext } from "./context/UserContext";


export default function Navbar() {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  function handleSignOut() {
    console.log("Running navbar");
    setCurrentUser(null);
    localStorage.setItem('currentUser', currentUser);
    setIsLoggedIn(false);
    console.log(isLoggedIn);
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      {isLoggedIn ?  
      <Link to="/home">
        <button onClick={handleSignOut}>Sign Out</button>
      </Link>: <></>
      }
    </nav>
  );
};
