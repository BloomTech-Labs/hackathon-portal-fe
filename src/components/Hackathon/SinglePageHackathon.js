//Shows a desciption of a hackathon (past or present) on a single page, after clicking on a hackathons card
// HackathonDescription

import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import Button from '@material-ui/core/Button';
import ServerModal from './editButton/modal';
import Loader from 'react-loader-spinner';


// COMPONENTS
import DeleteHackathon from './DeleteHackathon';
import { editHackathon } from '../../actions/actions';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';
import { Typography } from '@material-ui/core';
import '../../sass/hackathonDetails/hackathonDetails.scss';

const SinglePage = props => {
   const dispatch = useDispatch();
   const hackathon = useSelector(state => state.singleHackathon);
   const isFetching = useSelector(state => state.isFetching);
   const [isOpen, setIsOpen] = useState({ is_open: true });
   const { user } = useAuth0();
   const [pending, setPending] = useState([])


   useEffect(() => {
      dispatch(getSpecificHackathon((props.match.params.id)));
   }, [dispatch, props.match.params.id]);

   useEffect(() => {
      if (hackathon) {
         setIsOpen({ is_open: hackathon.is_open })
         setPending(hackathon.projects.filter(p => !p.is_approved))
      }
   }, [hackathon]);

   // useEffect(() => {
   //    if (hackathon.projects) {
   //       setPending(hackathon.projects.filter(p => !p.is_approved))
   //    }
   // }, [hackathon.projects])

   const handleIsOpen = () => {
      setIsOpen({ is_open: !isOpen.is_open })
      dispatch(editHackathon(props.match.params.id, hackathon.organizer_id, props.history, { is_open: !isOpen.is_open }))
   }

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

   // const userRoles = userRole => {
   //    const { admins } = hackathon;
   //    admins.filter(user => {
   //       if (user.user_hackathon_role === userRole) {
   //          console.log(user.username)
   //          return user.username
   //       }
   //       return null;
   //    })
   // }

   // const userRole = userRoles('organizer')

   //const pending = !hackathon ? [] : hackathon.projects.filter(element=> !element.is_approved)

   if (isFetching) {
      return <Loader type="Rings" color="#4885E1" height={100} width={100} />
   }
   if (hackathon === undefined) {
      return <Loader type="Rings" color="#4885E1" height={100} width={100} />
   }
   return (
      <div className='single-hackathon-container'>
         <div className='single-hackathon-container-left'>
            <div className='single-hackathon-title'>
               <h1>{hackathon.name}</h1>
            </div>
            {console.log(props, 'this is props')}
            <div className='single-hackathon-description'>
               <div className='description'>
                  <h3>Description</h3>
                  <p>{hackathon.description}</p>
               </div>
            </div>

            <div className='single-hackathon-dates'>
               <div className='start-container'>
                  <h3>Start date</h3>
                  <p>{formatDate(hackathon.start_date)}</p>
               </div>
               <div className='end-container'>
                  <h3>End date</h3>
                  <p>{formatDate(hackathon.end_date)}</p>
               </div>
            </div>

            <div>

            </div>

            <div className='admins-parent'>
               <h3>Organizer</h3>
               {hackathon.admins.map((admin, index) => {
                  return (
                     <div className='single-hackathon-admins'
                        key={index}>
                        <h2>{admin.username}</h2>
                        <p>{admin.user_hackathon_role}</p>
                     </div>
                  );
               })}

               <Link to={`/hackathon/${hackathon.id}/projects`}><button className='single-hackathon-buttons'>View Projects</button></Link>


            </div>
         </div>
         <div className='single-hackathon-container-right'>

            <img src="https://picsum.photos/300/300" />
            <div className='sh-buttons-container'>
               {user.id === hackathon.organizer_id ? (
                  <div className='single-hackathon-crud-btns'>
                     <button className='single-hackathon-buttons'>
                        <Link to={{ pathname: `/${props.match.params.id}/pendingprojects`, state: { hackathonId: Number(props.match.params.id) } }}>
                           Pending Projects
                        </Link>
                     </button>
                     <ServerModal id='pendingpagebtn' props={`/hackathon/edit/${hackathon.id}`} />
                     {user.id === hackathon.organizer_id && (
                        <button className='single-hackathon-buttons' onClick={() => props.history.push(`/hackathon/${hackathon.id}/users`)}>Add an organizer</button>
                     )}
                     <DeleteHackathon id={hackathon.id} org_id={hackathon.organizer_id} history={props.history} />

                  </div>
               ) : null}
            </div>

         </div>



      </div>
   )
}

export default SinglePage;