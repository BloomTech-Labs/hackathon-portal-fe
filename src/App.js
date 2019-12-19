import React from 'react';
import axios from 'axios';
import './App.css';

import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import HackerList from './components/hackerList';


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
        </Switch>
      </Router>
      <HackerList />
    </div>

  );
}

export default App;
