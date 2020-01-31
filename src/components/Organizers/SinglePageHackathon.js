import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import Button from '@material-ui/core/Button';
import ServerModal from './editButton/modal';


// COMPONENTS
import DeleteHackathon from './DeleteHackathon';
import { editHackathon } from '../../actions/actions';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';
import { Typography } from '@material-ui/core';

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
      if(hackathon){
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

   //const pending = !hackathon ? [] : hackathon.projects.filter(element=> !element.is_approved)

   if (isFetching) {
      return <div>Loading...</div>;
   }
   if (hackathon === undefined) {
      return <div>Loading...</div>;
   }
   return (
      <div className='single-hackathon-container'>
         <div className='single-hackathon-title'>
               <h3>{hackathon.name}</h3>
         </div>
         
         {console.log(props, 'this is props')}
            <div className='single-hackathon-description'>
                  <Typography variant='h4'>Description</Typography>
                  <Typography variant='h5'>{hackathon.description}
                  </Typography>
            </div>
         
            <div className='single-hackathon-dates'>
                  <Typography variant='h5'>Start date: {formatDate(hackathon.start_date)}</Typography>
      
                  <Typography variant='h5'>End date: {formatDate(hackathon.end_date)}</Typography>
            </div>

         <div>
         
         </div>
         <div className='single-hackathon-crud-btns-container'>
               {user.id === hackathon.organizer_id ? (
                  <div className='single-hackathon-crud-btns'>
                     <Link to={`/hackathon/${hackathon.id}/projects`}><Button className={!hackathon.projects.length ? 'grayed' : null} id='single-hackathon-crud-btn'>VIEW PROJECTS</Button></Link>
<div className={!pending.length ? `grayed` : null}><Button><Link id='pendingpagebutton' to={{ pathname:`/${props.match.params.id}/pendingprojects`, state: { hackathonId: Number(props.match.params.id) }}}>Pending Projects{pending.length ? <div id='frag'>({pending.length})</div> : null}</Link></Button></div>
                     <ServerModal id='single-hackathon-crud-btn' props={`/hackathon/edit/${hackathon.id}`}/>
                     <div>
                     <DeleteHackathon id={hackathon.id} org_id={hackathon.organizer_id} history={props.history} />
                     </div>
                  </div>
               ) : <Link to={`/hackathon/${hackathon.id}/projects`}><Button className={!hackathon.projects.length ? 'grayed' : null} id='single-hackathon-crud-btn'>VIEW PROJECTS</Button></Link>}
         </div>
   

      <div className='admins-parent'>
            <Typography variant='h4' id="admins-title">Admins</Typography>
            {hackathon.admins.map((admin, index) => {
               return (
                  <div className='single-hackathon-admins'
                     key={index}>
                     <h2>{admin.username}</h2>
                     <p>{admin.user_hackathon_role}</p>
                  </div>
               );
            })}
             {user.id === hackathon.organizer_id && (
               <Button id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}/users`)}>Add Organizer</Button>
            )}
      </div>
   </div>
)}

export default SinglePage;