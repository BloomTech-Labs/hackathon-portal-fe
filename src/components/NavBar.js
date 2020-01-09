import React, { useEffect, useState } from 'react';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HackathonLogo from '../components/images/HackathonLogo.png';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
   root: {
      '& > * + *': {
         marginLeft: theme.spacing(2),
         color: 'black'
      }
   }
}));

const NavBar = props => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
   const classes = useStyles();

   return (
      <div className="navBar">
         <img id="logo" src={HackathonLogo} alt="logo" />
         {!isAuthenticated && (
            <>
               <Link to="/">Home</Link>

               <button onClick={() => loginWithRedirect({})}>Log in</button>
            </>
         )}

         {isAuthenticated && (
            <span className="navBar">
               <Link className="navBarLink" to="/">
                  Home
                  <FiberManualRecordIcon
                     className="dot"
                     style={{ fontSize: 10 }}
                  />
               </Link>

               <Link className="navBarLink" to="/hackathons">
                  Hackathons
                  <FiberManualRecordIcon
                     className="dot"
                     style={{ fontSize: 10 }}
                  />
               </Link>

               <Link className="navBarLink" to={`/profile`}>
                  Profile
                  <FiberManualRecordIcon
                     className="dot"
                     style={{ fontSize: 10 }}
                  />
               </Link>

               <Link className="navBarLink" to="/hackathon/create">
                  Create A Hackathon
                  <FiberManualRecordIcon
                     className="dot"
                     style={{ fontSize: 10 }}
                  />
               </Link>
               <Link className="navBarLink" onClick={() => logout()}>
                  Log out
               </Link>
            </span>
         )}
      </div>
   );
};

export default NavBar;
