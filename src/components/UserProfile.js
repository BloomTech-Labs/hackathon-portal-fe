import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import moment from 'moment';

// ACTIONS
import { getUser } from '../actions/actions';

const UserProfile = props => {
   const dispatch = useDispatch();
   const { loading, user } = useAuth0();
   const userProfile = useSelector(state => state.userInfo);
   const isFetching = useSelector(state => state.isFetching);
   const currentDate = new Date().toString();

   useEffect(() => {
      dispatch(getUser(props.match.params.id));
   }, [props.match.params.id]);

   if (loading || !userProfile) {
      return <div>Loading...</div>;
   }

   let presentHackathons = userProfile.hackathons.filter(hackathon => {
      if (
         moment(hackathon.end_date).isSame(currentDate) ||
         moment(hackathon.end_date).isAfter(currentDate)
      ) {
         return hackathon.hackathon_name, hackathon.user_hackathon_role;
      }
   });

   let pastHackathons = userProfile.hackathons.filter(hackathon => {
      if (moment(hackathon.end_date).isBefore(currentDate)) {
         return hackathon.hackathon_name, hackathon.user_hackathon_role;
      }
   });

   return (
      <div>
         <>
            <h1>
               {userProfile.first_name} {userProfile.last_name}
            </h1>
            <h2>{userProfile.username}</h2>
            {user.id === userProfile.id ? (
               <>
                  <button>Edit Profile</button>
                  <button>Delete Profile</button>
               </>
            ) : null}
            <div>
               <h1>Hackathons</h1>
               <h1>Present:</h1>
               <div>
                  <ol>
                     {presentHackathons.map(hackathon => (
                        <li key={hackathon.hackathon_id}>
                           {hackathon.hackathon_name}
                           <Link to={`/hackathon/${hackathon.hackathon_id}`}>
                              See more
                           </Link>
                           <ul>
                              {hackathon.team_name ? (
                                 <li>Team: {hackathon.team_name}</li>
                              ) : null}
                              <li>Role: {hackathon.user_hackathon_role}</li>
                           </ul>
                        </li>
                     ))}
                  </ol>
               </div>
            </div>
            <div>
               <h1>Past:</h1>
               <div>
                  <ol>
                     {pastHackathons.map(hackathon => (
                        <li>
                           {hackathon.hackathon_name}
                           <Link to={`/hackathon/${hackathon.hackathon_id}`}>
                              See more
                           </Link>
                           <ul>
                              {hackathon.team_name ? (
                                 <li>Team: {hackathon.team_name}</li>
                              ) : null}
                              <li>Role: {hackathon.user_hackathon_role}</li>
                           </ul>
                        </li>
                     ))}
                  </ol>
               </div>
            </div>
         </>
      </div>
   );
};

export default UserProfile;
