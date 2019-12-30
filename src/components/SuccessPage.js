import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ACTIONS
import { getSpecificHackathon } from '../actions/actions';

const SuccessPage = (props) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSpecificHackathon(props.location.state))
  }, [])

  return(
    <div>
      return(
        <>
          <div>Success. Redirecting...</div>
          <Redirect from='/success' to={`/hackathon/${props.location.state}`} />
        </>
      )
    </div>
  )
};

export default SuccessPage;