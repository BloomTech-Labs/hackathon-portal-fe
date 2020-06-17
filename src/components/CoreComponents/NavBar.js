// The navbar for the website
// possibly rename nav-bar classnames to be more clear

import React from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';

import '../../sass/navbar/navBar.scss'
import logo from '../../svgs/logo.svg'

// import SideDrawer from './SideDrawer';

const NavBar = ({ hamburger, setHamburger }) => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

   return (
      <div className="navBar">
         <div className='navbar-content'>
            <Link to="/">
               <img id="logo" src={logo} alt="logo"></img>
            </Link>
            <div className='hamburger-menu' onClick={() => {
               setHamburger(!hamburger)
            }}>
               <div className='line'></div>
               <div className='line'></div>
               <div className='line'></div>
            </div>
            {!isAuthenticated && (
               <div className='navBar-div'>

                  <Link className='navBarLink home-link' to="/">
                     Home
               </Link>
                  <Link className='navBarLink' to="/about">
                     About
               </Link>
                  <Link className='navBarLink' to="/hackathons">
                     All Hackathons
               </Link>
                  <button
                     className='logIn-OutButton'
                     id='login-btn'
                     onClick={() => loginWithRedirect({})}
                  >
                     Log in
               </button>
                  <button
                     className='signUpButton'
                     id='login-btn'
                     onClick={() => loginWithRedirect({})}
                  >
                     Sign up
               </button>
               </div>
            )}

            {isAuthenticated && (
               <div className="navBar-div">
                  <Link className="navBarLink shorter-link" to="/">
                     Home
                  </Link>
                  <Link className="navBarLink about-link" to='/about'>
                     About
                  </Link>
                  <Link className="navBarLink" to="/hackathons">
                     All Hackathons
                  </Link>
                  <Link className="navBarLink" to="/profile">
                     Dashboard
                  </Link>
                  <button className="logIn-OutButton" onClick={() => logout()}>
                     Log Out
                  </button>
               </div>
            )}
         </div>
         {/* <SideDrawer /> */}

      </div>
   );
};

export default NavBar;
