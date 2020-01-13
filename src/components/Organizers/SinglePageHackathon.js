import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import Button from '@material-ui/core/Button';


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
   const [user_id, setUser_id] = useState(0)
   const { loading, user } = useAuth0();
  
   useEffect(() => {
      dispatch(getSpecificHackathon((props.match.params.id)));
   }, []);
   
   useEffect(() => {
      if(hackathon){
         setIsOpen({ is_open: hackathon.is_open })
      }
   }, [hackathon]);

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

   if (isFetching) {
      return <div>Loading...</div>;
   }
   if (hackathon === undefined) {
      return <div>Loading...</div>;
   }
   return (
      <div className='single-hackathon-container'>
         <div className='single-hackathon-title'>
               <h2>{hackathon.name}</h2>
         </div>

         <div className='single-hackathon-close-btn-container'>
               {user.id === hackathon.organizer_id && (
                  <>
                     {!hackathon.is_open ? (
                        <Button id='single-hackathon-close-btn' 
                        type="button" variant='outlined' color='#fff' onClick={()=>handleIsOpen()}>OPEN HACKATHON</Button>
                     ) : (
                        
                        <Button id='single-hackathon-close-btn'
                        type="button" variant='outlined' color='#fff' onClick={()=>handleIsOpen()}>CLOSE HACKATHON</Button>
                     )}
                  </>

               )}
         </div>
         
            <div className='single-hackathon-description'>
                  <Typography variant='h4'>Description:</Typography>
                  <Typography variant='h5'>{hackathon.description}
                  </Typography>
            </div>
         

        
            <div className='single-hackathon-dates'>
                  <Typography variant='h5'>Start date: {formatDate(hackathon.start_date)}</Typography>
      
                  <Typography variant='h5'>End Date: {formatDate(hackathon.end_date)}</Typography>
            </div>
         

         <div className='single-hackathon-crud-btns-container'>
               {user.id === hackathon.organizer_id && (
                  <div className='single-hackathon-crud-btns'>
                     <Link to={`/hackathon/edit/${hackathon.id}`}><Button id='single-hackathon-crud-btn'>EDIT</Button></Link>
                     <DeleteHackathon id={hackathon.id} org_id={hackathon.organizer_id} history={props.history} />
                  </div>
               )}
         </div>

         <div className='single-hackathon-participants'>
               <Typography variant='h4'>Participants:</Typography>
               {hackathon.teams[0] ? (
                  <Typography variant='body1'>
                     {hackathon.teams
                        .map(team => {
                           return team.devs.length;
                        })
                        .reduce((acc, curr) => acc + curr) +
                        hackathon.individual_devs.length}
                  </Typography>
               ) : (
                  <p>{0 + hackathon.individual_devs.length}</p>
               )}
         </div>
         
         <div className='admins-parent'>
               <Typography variant='h4'>Admins:</Typography>
                     {hackathon.admins.map((admin, index) => {
                        return (
                           <div className='single-hackathon-admins'
                              key={index}>
                              <p>{admin.username}</p>
                              <p>{admin.user_hackathon_role}</p>
                           </div>
                        );
                     })}
         </div>
      </div>
   );
};

export default SinglePage;
