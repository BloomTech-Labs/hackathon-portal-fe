import React from "react";
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Dashboard from './Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
      color: 'black',
    
    },
  },
}));


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const classes = useStyles();
  const preventDefault = event => event.preventDefault();
  return (
    <div className='navBar'>
      
      {!isAuthenticated && (
        <>
          <Link to="/">Home</Link>&nbsp;
          <br />
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        </>
      )}

      {isAuthenticated && (
        <span className='navBar'>
        <Link className='navBarLink' to="/">Home</Link>&nbsp;
        <br />
        <Link className='navBarLink' to="/profile">Profile</Link>
        <br />
        <Link className='navBarLink' to='/hackathon/create'>Create a Hackathon</Link>
        <br />
        <Link to='/dashboard'>Dashboard</Link>
        <br />
        <Link to='/hackathons'>Hackathons</Link>
        <br />

        {/* NEW - Add a link to the /external-api route for testing */}
        <Link to="/external-api">External API</Link>
      </span>
    )}

    <br />
    {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;