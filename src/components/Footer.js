import React from 'react';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   root: {
      '& > * + *': {
         marginLeft: theme.spacing(2),
         color: 'black'
      }
   }
}));

const Footer = props => {
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
   const classes = useStyles();

   return (
      <div className="footer">

         {!isAuthenticated && (
            <>
               <Link
                  className="navBarLink"
                  onClick={() => loginWithRedirect({})}
               >
                  Log in
               </Link>
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
               <Link className="navBarLink" onClick={() => logout()}>
                  Log out
               </Link>
            </span>
         )}
      </div>
   );
};

export default Footer;