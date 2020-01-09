import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Button,
   TextField
} from '@material-ui/core';

// ACTIONS
import { getUser } from '../actions/actions';
import { deleteUser } from '../actions/actions';

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
      <div>
         <div>
            <h1>
               {userProfile.first_name} {userProfile.last_name}
            </h1>
            <h2>{userProfile.username}</h2>
         </div>
         <div>
            {user.id === userProfile.id ? (
               <>
                  <button onClick={handleClickOpen}>Edit Profile</button>
                  <button onClick={handleDeleteClick}>Delete Profile</button>
               </>
            ) : null}
         </div>
         <div>
            <h1>Hackathons</h1>
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
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">
               Update user information
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
