import React from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';

import '../../sass/SideDrawer/SideDrawer.scss'

import x from '../../svgs/x.svg'

const SideDrawer = ({ hamburger, setHamburger }) => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className={`side-drawer-container ${hamburger ? '' : 'drawer-closed'}`}>
            <img className='x-button' src={x} onClick={() => {
                setHamburger(!hamburger)
            }}/>
            {!isAuthenticated && (
               <div className='side-bar-content'>

                  <Link className='sideBarLink' to="/" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     Home
               </Link>
                  <Link className='sideBarLink' to="/about" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     About
               </Link>
                  <Link className='sideBarLink' to="/hackathons" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     All Hackathons
               </Link>
                  <Link
                     className='sideBarLink'
                     id='login-btn'
                     onClick={() => loginWithRedirect({})}
                  >
                     Log in
               </Link>
                  <Link
                     className='sideBarLink'
                     id='login-btn'
                     onClick={() => loginWithRedirect({})}
                  >
                     Sign up
               </Link>
               </div>
            )}

            {isAuthenticated && (
               <div className="side-bar-content">
                  <Link className="sideBarLink shorter-link" to="/" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     Home
                  </Link>
                  <Link className="sideBarLink about-link" to='/about' onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     About
                  </Link>
                  <Link className="sideBarLink" to="/hackathons" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     All Hackathons
                  </Link>
                  <Link className="sideBarLink" to="/profile" onClick={() => {
                      setHamburger(!hamburger)
                  }}>
                     Dashboard
                  </Link>
                  <Link className="sideBarLink" onClick={() => logout()}>
                     Log Out
                  </Link>
               </div>
            )}
        </div>
    )
}

export default SideDrawer;