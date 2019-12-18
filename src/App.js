import React from 'react';
import axios from 'axios';
import './App.css';

import { Router, Route, Switch, Link } from "react-router-dom";
import ExternalApi from "./components/ExternalApi";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import CreateHackathon from './components/Organizers/CreateHackathon';



function App() {

  
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={Profile} />
          {/* TEMPORARILY ROUTE */}
          <Route path="/hackathon/create" component={CreateHackathon} />
          {/* NEW - add a route to the ExternalApi component for testing atm */}
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
