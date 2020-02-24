import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import PrivateRoute from './components/CoreComponents/PrivateRoute';
import NavBar from './components/CoreComponents/NavBar';
import Homepage from './components/CoreComponents/Homepage';
import Hackathons from './components/Hackathon/HackathonList';
import CreateHackathon from './components/Hackathon/CreateHackathon';
import EditHackathon from './components/Hackathon/EditHackathon';
import SinglePage from './components/Hackathon/SinglePageHackathon';
import SuccessPage from './components/NotBeingUsed/SuccessPage';
import UserProfile from './components/UserPorfile/UserProfile';
import PendingProjects from './components/Projects/pendingProjectsPage';
import PastHackathons from './components/Hackathon/PastHackathons';
import CreateProject from './components/Projects/CreateProject';
import ProjectList from './components/Projects/ProjectList';
import UserList from './components/Organizers/UserList';
import ErrorPage from './components/CoreComponents/ErrorPage';

// ACTIONS
import { getHackathons } from './actions/actions';
import ProjectModal from './components/Projects/ProjectModal';

function App(props) {
   useEffect(() => {
      props.getHackathons();
   }, [props]);

   return (
      <div className="App">
         <Router history={history}>
            <container className='main-container'>
            <header>
               <NavBar />
            </header>
            <Switch>
      <Route exact path="/" component={Homepage} />
               <Route exact path="/hackathons" component={Hackathons} />
               <Route exact path='/hackathons/archive' component={PastHackathons} />
               <Route exact path='/hackathon/:id/projects/:project_id' component={ProjectModal} />
               <PrivateRoute path="/profile" component={UserProfile} />
               <PrivateRoute path='/:id/pendingprojects' id={`:id`} component={PendingProjects}/>
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
               <PrivateRoute exact path={`/hackathon/:id`} component={SinglePage} />
               {/* <Route path="/success" component={SuccessPage} /> */}
               <PrivateRoute exact path='/hackathon/:id/projects' component={ProjectList} />
               <PrivateRoute exact path='/hackathon/:id/create/project' component={CreateProject} />
               <PrivateRoute exact path='/hackathon/:id/users' component={UserList} />
               {/* <Route path="/success" component={SuccessPage} /> */}
               <Route component={ErrorPage} />
            </Switch>
            </container>
            {/* <Footer /> */}
         </Router>
      </div>
   );
}

export default connect(null, { getHackathons })(App);
