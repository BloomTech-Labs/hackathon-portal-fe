import React from 'react';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import HackathonLogo from '../components/images/HackathonLogo.png';


const NavBar = props => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

   return (
      <div className="navBar">
         <Link to="/">
            <img id="logo" src={HackathonLogo} alt="logo"></img>
         </Link>

         {!isAuthenticated && (
            <>
               <p
                  className="navBarLink"
                  onClick={() => loginWithRedirect({})}
               >
                  Log in
               </p>
            </>
         )}

         {isAuthenticated && (
            <span className="navBar-span">
               <Link className="navBarLink" to="/">
                  Home
               </Link>

               <Link className="navBarLink" to="/hackathons">
                  Hackathons
               </Link>

               <Link className="navBarLink" to={`/profile`}>
                  Profile
               </Link>

               <Link className="navBarLink" to="/hackathon/create">
                  Create A Hackathon
               </Link>
               <p className="navBarLink" onClick={() => logout()}>
                  Log out
               </p>
            </span>
         )}
      </div>
   );
};

export default NavBar;
