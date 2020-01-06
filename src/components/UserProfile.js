import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { getSpecificHacker } from '../../actions/actions';

const UserProfile = props => {
   const dispatch = useDispatch();
   const user = useSelector(state => state.userInfo);
   const isFetching = useSelector(state => state.isFetching);

   useEffect(() => {
      dispatch(getSpecificHacker(props.match.params.id));
   }, []);
};

export default UserProfile;
