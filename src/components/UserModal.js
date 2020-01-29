import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Typography, Button, FormHelperText } from '@material-ui/core';

// ACTIONS
import { assignRole } from '../actions/actions';

const UserModel = ({ userInfo, hackathon, role }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const makeOrganizer = () => {
    if(role === 'organizer'){
      setError(true)
    }else{
      dispatch(assignRole(hackathon.id, userInfo.id, { user_hackathon_role: 'organizer' }))
    }
  }

  
  if(!userInfo || !hackathon){
    return(
      <div>Loading...</div>
      )
    }

  return(
    <div>
      <Avatar src='./images/profile_img.jpg' />
      {userInfo.first_name !== undefined && (
        <Typography>{userInfo.first_name}</Typography>
      )}
      {userInfo.last_name !== undefined && (
        <Typography>{userInfo.last_name}</Typography>
      )}
      <Typography>{userInfo.username}</Typography>
      {role && (
        <Typography>{role}</Typography>
      )}
      {hackathon.organizer_id !== userInfo.id && (
        <>
          <Button onClick={() => makeOrganizer()}>Set as organizer</Button>
          {error && (<FormHelperText error>This user is already an organizer</FormHelperText>)}
        </>
      )}
    </div>
  )
};

export default UserModel;