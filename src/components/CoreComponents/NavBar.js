// The navbar for the website

import React from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import HackathonLogo from '../../images/HackathonLogo.png';


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
                  id='login-btn'
                  onClick={() => loginWithRedirect({})}
               >
                  Log in
               </p>
            </>
         )}

         {isAuthenticated && (
            <span className="navBar-span">
               <Link className="navBarLink" to="/">
                  home
               </Link>
               <div className='dot'></div>
               <Link className="navBarLink" to="/hackathons">
                  hackathons
               </Link>
               <div className='dot'></div>
               <Link className="navBarLink" to={`/profile`}>
                  profile
               </Link>
               <div className='dot'></div>
               <Link className="navBarLink" to="/hackathon/create">
                  create a hackathon
               </Link>
               <div className='dot'></div>
               <p className="navBarLink" onClick={() => logout()}>
                  log out
               </p>
            </span>
         )}
      </div>
   );
};

export default NavBar;
