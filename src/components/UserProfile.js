import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   // Button,
   TextField
} from '@material-ui/core';

// ACTIONS
import { getUser } from '../actions/actions';
import { deleteUser } from '../actions/actions';
import ProfileCard from './ProfileCard';

const UserProfile = props => {
   const dispatch = useDispatch();
   const { loading, user, logout } = useAuth0();
   const userProfile = useSelector(state => state.userInfo);
   const currentDate = new Date().toString();
   const [open, setOpen] = useState(false);
   const [deleteOpen, setDeleteOpen] = useState(false);
   const [profileInfo, setProfileInfo] = useState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      id: ''
   });

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

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleDeleteClick = () => {
      setDeleteOpen(true);
   };

   const handleDeleteClose = () => {
      setDeleteOpen(false);
   };

   const handleChange = event => {
      setProfileInfo({
         ...profileInfo,
         [event.target.name]: event.target.value
      });
      console.log(profileInfo);
   };

   const handleSubmit = async event => {
      event.preventDefault();
      (await axiosWithAuth())
         .put(`/users/${user.id}`, profileInfo)
         .then(res => {
            setProfileInfo({
               first_name: `${res.data.first_name}`,
               last_name: `${res.data.last_name}`,
               username: `${res.data.username}`,
               email: `${res.data.email}`,
               id: `${res.data.id}`
            });
            handleClose();
            dispatch(getUser(profileInfo.id));
         })
         .catch(error => {
            console.log('Profile Update', error);
         });
   };

   if (loading || !userProfile) {
      return <div>Loading...</div>;
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
         <div className='profile-container'>
            <div className='profile-left'>
               <img id='profile-img' src='https://i.imgflip.com/1slnr0.jpg'></img>
               <div className='profile-headers'>
               <h1 id='profile-name'>
                  {userProfile.first_name} {userProfile.last_name}
               </h1>
               <h1 id='profile-username'>{userProfile.username}</h1>
               </div>
            </div>
               <div className='profile-buttons'>
               {user.id === userProfile.id ? (
                  <>
                     <Button  id='profile-edit-btn' variant='outlined' color='#fff' onClick={handleClickOpen}>Edit Profile</Button>
                     <Button id='profile-delete-btn' variant="outlined" onClick={handleDeleteClick}>Delete Profile</Button>
                  </>
               ) : null}
            </div>

         </div>
         
         <div className='profile-hackathons'>
            <h1>Hackathons</h1>
            <div className='profile-hackathon-list'>
                  {presentHackathons.map(hackathon => (
                     <ProfileCard 
                     key={hackathon.hackathon_id} 
                     id={hackathon.hackathon_id}
                     name={hackathon.hackathon_name}
                     team_name={hackathon.team_name}
                     user_role={hackathon.user_hackathon_role}
                     />
                  ))}
            </div>
         </div>
         <div className='profile-hackathons'>
            <h1>Past:</h1>
            <div className='profile-hackathon-list'>
                  {pastHackathons.map(hackathon => (
                     <ProfileCard 
                     key={hackathon.hackathon_id} 
                     id={hackathon.hackathon_id}
                     name={hackathon.hackathon_name}
                     team_name={hackathon.team_name}
                     user_role={hackathon.user_hackathon_role}
                     />
                  ))}
            </div>
         </div>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">
               Update your profile 
            </DialogTitle>
            <DialogContent>
               <TextField
                  autoFocus
                  margin="dense"
                  name="first_name"
                  value={profileInfo.first_name}
                  label="First name"
                  type="text"
                  fullWidth
                  onChange={handleChange}
               />
               <TextField
                  autoFocus
                  margin="dense"
                  name="last_name"
                  value={profileInfo.last_name}
                  label="Last name"
                  type="text"
                  fullWidth
                  onChange={handleChange}
               />
               <TextField
                  autoFocus
                  margin="dense"
                  name="username"
                  value={profileInfo.username}
                  label="Username"
                  type="text"
                  fullWidth
                  onChange={handleChange}
               />
               <TextField
                  autoFocus
                  margin="dense"
                  name="email"
                  value={profileInfo.email}
                  label="Email"
                  type="email"
                  fullWidth
                  onChange={handleChange}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleSubmit} color="primary">
                  Confirm
               </Button>
            </DialogActions>
         </Dialog>
         <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {'Are you sure you want to delete your account?'}
            </DialogTitle>
            <DialogActions>
               <Button onClick={handleDeleteClose} color="primary">
                  Cancel
               </Button>
               <Button
                  onClick={() =>
                     dispatch(deleteUser(`${user.id}`)).then(() => logout())
                  }
                  color="primary"
                  autoFocus
               >
                  Delete
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default UserProfile;
