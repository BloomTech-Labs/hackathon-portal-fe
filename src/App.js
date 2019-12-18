import React from 'react';
import axios from 'axios';
import './App.css';
import ExternalApi from "./components/ExternalApi";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from './components/NavBar';
import Profile from './components/Profile';



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


          {/* NEW - add a route to the ExternalApi component for testing atm */}
      <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
