import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import moment from 'moment';

// ACTIONS
import { getUser } from '../actions/actions';

const UserProfile = props => {
   const dispatch = useDispatch();
   const { loading, user } = useAuth0();
   const userProfile = useSelector(state => state.userInfo);
   const isFetching = useSelector(state => state.isFetching);
   const currentDate = new Date().toString();

   // const splitDates = arr => {
   //    let currentDate = new Date().toString();
   //    console.log(currentDate);
   //    arr.map(hackathon => {
   //       if (hackathon.end_date < currentDate) {
   //          setPast([...past, hackathon]);
   //       } else {
   //          setPresent([...present, hackathon]);
   //       }
   //    });
   // };

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
      <>
         {user.id === userProfile.id ? (
            <>
               <h2>{userProfile.username}</h2>
               <h1>{userProfile.id}</h1>
               <button>Edit</button>
               <div>
                  <h1>Present Hackathons</h1>
                  <div>
                     {presentHackathons.map(hackathon => (
                        <h1>
                           {hackathon.hackathon_name},{' '}
                           {hackathon.user_hackathon_role}
                        </h1>
                     ))}
                  </div>
               </div>
               <div>
                  <h1>Past Hackathons</h1>
                  <div>
                     {pastHackathons.map(hackathon => (
                        <h1>
                           {hackathon.hackathon_name},{' '}
                           {hackathon.user_hackathon_role}
                        </h1>
                     ))}
                  </div>
               </div>
            </>
         ) : (
            <>
               <h2>{userProfile.username}</h2>
               <h1>{userProfile.id}</h1>
               <div>
                  <h1>Present Hackathons</h1>
                  <div>
                     {presentHackathons.map(hackathon => (
                        <h1>
                           {hackathon.hackathon_name},{' '}
                           {hackathon.user_hackathon_role}
                        </h1>
                     ))}
                  </div>
               </div>
               <div>
                  <h1>Past hackathons</h1>
                  <div>
                     {pastHackathons.map(hackathon => (
                        <h1>
                           {hackathon.hackathon_name},{' '}
                           {hackathon.user_hackathon_role}
                        </h1>
                     ))}
                  </div>
               </div>
            </>
         )}
      </>
   );
   // first_name
   // last_name
   // username
   // h1 Hackathons
   // Present - includes start_date, end_date, hackathon_description
   // Past - includes start_date, end_date, hackathon_description
};

export default UserProfile;
