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
    <div>
      {!isAuthenticated && (
        <>
          <Link to="/">Home</Link>&nbsp;
          <button onClick={() => loginWithRedirect({})}>Log in</button>
          {/* TEMPORARY LINK */}
          <Link to='/hackathons/create'>Create a Hackathon</Link>
          <Link to="/hackathons">Hackathons</Link>
        </>
      )}

<Typography className={classes.root}>
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
</Typography>
      {isAuthenticated && (
      <span>
        <Typography className={classes.root}>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
        <Link to="/hackathons">Hackathons</Link>
        <Link to='/hackathons/create'>Create a Hackathon</Link>
        <Link to="/dashboard">Dashboard</Link>
        {/* NEW - Add a link to the /external-api route for testing */}
      <Link to="/external-api">External API</Link>
      </Typography>
      </span>
    )}
    {/* <Dashboard/> */}
    </div>
  );
};

export default NavBar;