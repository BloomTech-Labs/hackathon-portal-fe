import React from "react";
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../logo.png'
// import Dashboard from './Dashboard';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
      <img id='logo' src={Logo} alt='logo'/>
      {!isAuthenticated && (
        <>
          <Link to="/">Home</Link>&nbsp;
          <br />
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        </>
      )}

      {isAuthenticated && (
        <span className='navBar'>
        <Link className='navBarLink' to="/">Home<FiberManualRecordIcon className='dot' style={{ fontSize: 10 }}/></Link>
        {/* &nbsp; */}
        {/* <br />
        <Link className='navBarLink' to='/hackathon/create'>Create a Hackathon</Link> */}
        <br />
        <Link className='navBarLink' to='/hackathons'>Hackathons<FiberManualRecordIcon className='dot' style={{ fontSize: 10 }}/></Link>
        <br />
        <Link className='navBarLink' to="/profile">Profile<FiberManualRecordIcon className='dot' style={{ fontSize: 10 }}/></Link>
        <br />
        <Link className='navBarLink' to='/dashboard'>Dashboard<FiberManualRecordIcon className='dot' style={{ fontSize: 10 }}/></Link>
        <br />
        <Link className='navBarLink' onClick={() => logout()}>Log out</Link>
        {/* NEW - Add a link to the /external-api route for testing */}
        {/* <Link className='navBarLink' to="/external-api">External API</Link> */}
      </span>
    )}

    {/* <br />
    {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
    </div>
  );
};

export default NavBar;