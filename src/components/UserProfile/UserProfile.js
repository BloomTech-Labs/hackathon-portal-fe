// Shows your user profile
// When refreshing on the page it breaks.

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import moment from 'moment';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Link } from "react-router-dom";

import Button from '@material-ui/core/Button';

import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField
} from '@material-ui/core';
import Loader from 'react-loader-spinner';

// ACTIONS
import { getUser } from '../../actions/actions';
import { deleteUser } from '../../actions/actions';
import ProfileCard from './ProfileCard';

import '../../sass/userProfile/userProfile.scss'

const UserProfile = props => {
   const dispatch = useDispatch();
   const { loading, user, logout } = useAuth0();
   const userProfile = useSelector(state => state.userInfo);
   const currentDate = new Date().toString();
   const [tabs, setTabs] = useState({
      active: true,
      past: false
   });
   const [deleteOpen, setDeleteOpen] = useState(false);
   const [profileInfo, setProfileInfo] = useState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      id: ''
   });

   console.log(user.id)

   const formatDate = date => {
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December"
      ];
      const newDate = new Date(date);
      const y = newDate.getFullYear();
      const d = newDate.getDate();
      const m = months[newDate.getMonth()];
      return `${m} ${d}, ${y}`;
   };

   const getAndSetUserHook = async () => {
      (await axiosWithAuth())
         .get(`/users/${user.id}`)
         .then(res => {
            setProfileInfo({
               first_name: res.data.first_name,
               last_name: res.data.last_name,
               username: res.data.username,
               email: res.data.email,
               id: res.data.id
            });
         })
         .catch(err => {
            console.log(err);
         });
   };

   useEffect(() => {
      dispatch(getUser(user.id));
      getAndSetUserHook();
   }, [user.id]);

   // const handleClickOpen = () => {
   //    setOpen(true);
   // };

   // const handleClose = () => {
   //    setOpen(false);
   // };

   // const handleDeleteClick = () => {
   //    setDeleteOpen(true);
   // };

   // const handleDeleteClose = () => {
   //    setDeleteOpen(false);
   // };

   // const handleChange = event => {
   //    setProfileInfo({
   //       ...profileInfo,
   //       [event.target.name]: event.target.value
   //    });
   //    console.log(profileInfo);
   // };

   // const handleSubmit = async event => {
   //    event.preventDefault();
   //    (await axiosWithAuth())
   //       .put(`/users/${user.id}`, profileInfo)
   //       .then(res => {
   //          setProfileInfo({
   //             first_name: `${res.data.first_name}`,
   //             last_name: `${res.data.last_name}`,
   //             username: `${res.data.username}`,
   //             email: `${res.data.email}`,
   //             id: `${res.data.id}`
   //          });
   //          handleClose();
   //          dispatch(getUser(profileInfo.id));
   //       })
   //       .catch(error => {
   //          console.log('Profile Update', error);
   //       });
   // };

   const renderTableHeader = () => {
      const header = [
         'Hackathon Name',
         'Location',
         'Start Date',
         'End Date',
         'Role',
         'Status'
      ];

      return header.map((header, i) => {
         return (
            <th key={i} className='th-header'>{header}</th>
         )
      })
   }

   const renderTableData = (hackathonStatus) => {
      // const { id, hackathon_name, start_date, end_date, user_hackathon_role } = userProfile.hackathons;

      return hackathonStatus.map(hackathon => {
         return (
            <tr key={hackathon.id} className='tr-data'>
               <td className='td-hackathon-name' onClick={() => {
                  props.history.push(`/hackathon/${hackathon.hackathon_id}`)
               }}>{hackathon.hackathon_name}</td>
               <td className='td-info'>Location</td>
               <td className='td-info'>{formatDate(hackathon.start_date)}</td>
               <td className='td-info'>{formatDate(hackathon.end_date)}</td>
               <td className='td-info'>{hackathon.user_hackathon_role}</td>
               {/* <Link to={`/hackathon/${hackathon.hackathon_id}`}> */}
               {/* <td className='td-details' onClick={() => {
                  props.history.push(`/hackathon/${hackathon.hackathon_id}`)
               }}>Details</td> */}
               {/* </Link> */}
               <td className='td-status'>Status</td>
            </tr>
         )
      })
   }

   if (loading || !userProfile) {
      return <Loader type="Rings" color="#4885E1" height={100} width={100} />
   }

   let presentHackathons = userProfile.hackathons.filter(hackathon => {
      if (
         moment(hackathon.end_date).isSame(currentDate) ||
         moment(hackathon.end_date).isAfter(currentDate)
      ) {
         return hackathon;
      }
   });

   let pastHackathons = userProfile.hackathons.filter(hackathon => {
      if (moment(hackathon.end_date).isBefore(currentDate)) {
         return hackathon;
      }
   });

   return (
      <div className='profile-wrapper'>
         <div className='top-content'>
            <div className='top-left'>
               <h1> Dashboard</h1>
            </div>
            <div className='top-right'>
               <p className={`tabs tabPresent ${tabs.active ? 'active' : ''}`} onClick={() => {
                  setTabs({
                     active: true,
                     past: false
                  })
               }}>Active & Upcoming</p>
               <p className={`tabs tabPast ${tabs.past ? 'active' : ''}`} onClick={() => {
                  setTabs({
                     active: false,
                     past: true
                  })
               }}>Past</p>
            </div>
         </div>
         <div className='logged-in-as'>
            <h3 className='bottom-left'>Logged in as: <p>{userProfile.email}</p></h3>
         </div>
         <div className='above-table'>
            <p className={`hackathons-header ${tabs.active ? '' : 'hidden'}`}>Active & upcoming hackathons</p>
            <p className={`hackathons-header ${tabs.past ? '' : 'hidden'}`}>Past hackathons</p>
            <button onClick={() => props.history.push('/hackathon/create')}>Create a hackathon</button>
         </div>
         <section className='hackathons-section'>
            <div className='profile-container'>
               {presentHackathons.length ? (
                  <table className={`table ${tabs.active ? '' : 'hidden'}`}>
                     <tbody>
                        <tr className='tr-header'>{renderTableHeader()}</tr>
                        {renderTableData(presentHackathons)}
                     </tbody>
                  </table>

               ) : null
               }

               {pastHackathons.length ? (
                  <table className={`table ${tabs.past ? '' : 'hidden'}`} >
                     <tbody>
                        <tr className='tr-header'>{renderTableHeader()}</tr>
                        {renderTableData(pastHackathons)}
                     </tbody>
                  </table>
               ) : <p>nothing to display</p>
               }
            </div>
         </section>
      </div>
   );
};

export default UserProfile;
