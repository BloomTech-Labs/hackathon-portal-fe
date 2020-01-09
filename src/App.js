import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import ExternalApi from './components/ExternalApi';
import history from './utils/history';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import HackerList from './components/hackerList';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import Hackathons from './components/hackathons';
import CreateHackathon from './components/Organizers/CreateHackathon';
import EditHackathon from './components/Organizers/EditHackathon';
import SinglePage from './components/Organizers/SinglePageHackathon';
import SuccessPage from './components/SuccessPage';
import UserProfile from './components/UserProfile';

// ACTIONS
import { getHackathons } from './actions/actions';

function App(props) {
   useEffect(() => {
      props.getHackathons();
   }, []);

   return (
      <div className="App">
         {/* Don't forget to include the history module */}
         <Router history={history}>
            <header>
               <NavBar />
            </header>
            <Switch>
               <Route exact path="/" component={Homepage} />
               <Route exact path="/hackathons" component={Hackathons} />
               <PrivateRoute path="/profile" component={Profile} />
               <PrivateRoute path="/dashboard" component={Dashboard} />
               <PrivateRoute
                  exact
                  path="/hackathon/create"
                  component={CreateHackathon}
               />
               <PrivateRoute
                  exact
                  path="/hackathon/edit/:id"
                  component={EditHackathon}
               />
               <PrivateRoute path={`/hackathon/:id`} component={SinglePage} />
               {/* NEW - add a route to the ExternalApi component for testing atm */}
               <PrivateRoute path="/external-api" component={ExternalApi} />
               <PrivateRoute path={`/users/:id`} component={UserProfile} />
               <Route path="/success" component={SuccessPage} />
               <Route path="/hackerlist" component={HackerList} />
            </Switch>
         </Router>
      </div>
   );
}

export default connect(null, { getHackathons })(App);
