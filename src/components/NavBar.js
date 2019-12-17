import React from "react";
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          <Link to="/">Home</Link>&nbsp;
          <button onClick={() => loginWithRedirect({})}>Log in</button>
          {/* TEMPORARY LINK */}
          <Link to='/hackathon/create'>Create a Hackathon</Link> 
        </>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
        <Link to='/hackathon/create'>Create a Hackathon</Link>
      </span>
    )}
    </div>
  );
};

export default NavBar;