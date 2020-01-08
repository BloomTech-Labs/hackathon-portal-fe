import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';

// COMPONENTS
import DeleteHackathon from './DeleteHackathon';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';
import { Typography } from '@material-ui/core';

const SinglePage = props => {
   const dispatch = useDispatch();
   const hackathon = useSelector(state => state.singleHackathon);
   const isFetching = useSelector(state => state.isFetching);
   const [user_id, setUser_id] = useState(0)
   const { loading, user } = useAuth0();

   useEffect(() => {
      dispatch(getSpecificHackathon(props.match.params.id));
   }, []);

   const formatDate = date => {
      const days = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday'
      ];
      const months = [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December'
      ];
      const newDate = new Date(date);
      const y = newDate.getFullYear();
      const d = newDate.getDate();
      const m = months[newDate.getMonth()];
      const day = days[newDate.getDay()];
      return `${day}, ${m} ${d}, ${y}`;
   };

   console.log('HACKATHON PAGE', hackathon, isFetching);

   if (isFetching) {
      return <div>Loading...</div>;
   }
   if (hackathon === undefined) {
      return <div>Loading...</div>;
   } 
   return (
      <div>
         <h2>{hackathon.name}</h2>
         {!hackathon.is_open ? (
            <button>open</button>
         ) : (
            <button>close</button>
         )}
         <h4>Description:</h4>
         <p>{hackathon.description}</p>
         <h4>Start date:</h4>
         <p>{formatDate(hackathon.start_date)}</p>
         <h4>End date:</h4>
         <p>{formatDate(hackathon.end_date)}</p>
         {user.id === hackathon.organizer_id && (
            <>
               <Link to='/hackathon/edit'><button>edit</button></Link>
               <DeleteHackathon id={hackathon.id} org_id={hackathon.organizer_id} />
            </>
         )}
         <h4>Participants:</h4>
         {hackathon.teams[0] ? (
            <p>
               {hackathon.teams
                  .map(team => {
                     return team.devs.length;
                  })
                  .reduce((acc, curr) => acc + curr) +
                  hackathon.individual_devs.length}
            </p>
         ) : (
            <p>{0 + hackathon.individual_devs.length}</p>
         )}
         <h4>Admins</h4>
         {hackathon.admins.map((admin, index) => {
            return (
               <div key={index}>
                  <p>{admin.username}</p>
                  <p>{admin.user_hackathon_role}</p>
               </div>
            );
         })}
         <h4>Teams</h4>
         {hackathon.teams[0] ? (
            hackathon.teams.map((team, index) => {
               console.log(team);
               return (
                  <div key={index}>
                     <p>{team.team_name}</p>
                     <p>members: {team.devs.length}</p>
                  </div>
               );
            })
         ) : (
            <p>No teams</p>
         )}
         <h4>
            Individual participants ({hackathon.individual_devs.length})
         </h4>
      </div>
   );
};

export default SinglePage;
