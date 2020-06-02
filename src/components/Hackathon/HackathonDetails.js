//Shows a desciption of a hackathon (past or present) on a single page, after clicking on a hackathons card
// HackathonDescription

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import ServerModal from './editButton/modal';
import Load from '../Reusable/LoaderWithContainer';


// COMPONENTS
import DeleteHackathon from './DeleteHackathon';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';
import '../../sass/hackathonDetails/hackathonDetails.scss';

const HackathonDetails = props => {
   const dispatch = useDispatch();
   const hackathon = useSelector(state => state.singleHackathon);
   const isFetching = useSelector(state => state.isFetching);
   // const [isOpen, setIsOpen] = useState({ is_open: true });
   const { user } = useAuth0();
   const [pending, setPending] = useState([])


   useEffect(() => {
      dispatch(getSpecificHackathon((props.match.params.id)));
   }, [dispatch, props.match.params.id]);

   useEffect(() => {
      if (hackathon) {
         // setIsOpen({ is_open: hackathon.is_open })
         setPending(hackathon?.projects?.filter(p => !p.is_approved))
      }
   }, [hackathon]);

   // const handleIsOpen = () => {
   //    setIsOpen({ is_open: !isOpen.is_open })
   //    dispatch(editHackathon(props.match.params.id, hackathon.organizer_id, props.history, { is_open: !isOpen.is_open }))
   // }

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

   if (isFetching) {
      return <Load />
   }
   if (hackathon === undefined) {
      return <Load />
   }
   return (
      <div className='single-hackathon-container'>
         <div className='single-hackathon-container-left'>
            <div className='single-hackathon-title'>
               <h1>{hackathon.name}</h1>
            </div>
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
               <div className='organizer-judge-container'>
                  <div className='organizers-container'>
                     <h3>Organizer</h3>
                     <div className='admins-container'>
                        {hackathon?.admins?.map((admin, index) => {
                           return (
                              admin.user_hackathon_role === 'organizer' &&
                              <div className='single-hackathon-admins'
                                 key={index}>
                                 <p>{admin.username}</p>
                              </div>

                           );
                        })}
                     </div>
                  </div>
                  <div className='judges-container'>
                     <h3>Judge</h3>
                     <div className='admins-container'>
                        {hackathon?.admins?.map((admin, index) => {
                           return (
                              admin.user_hackathon_role === 'judge' &&
                              <div className='single-hackathon-admins'
                                 key={index}>
                                 <p>{admin.username}</p>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </div>
               <Link to={`/hackathon/${hackathon.id}/projects`}><button className='single-hackathon-buttons'>View Projects</button></Link>
            </div>
         </div>
         <div className='single-hackathon-container-right'>

            <img alt="random" src="https://picsum.photos/300/300" />
            <div className='sh-buttons-container'>
               {user.id === hackathon.organizer_id ? (
                  <div className='single-hackathon-crud-btns'>
                     <button className={`${pending?.length === 0 ? 'grey-no-pending' : ''} single-hackathon-button-pending`}>
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

export default HackathonDetails;