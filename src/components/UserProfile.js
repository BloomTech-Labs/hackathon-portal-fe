import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../auth0-hooks/react-auth0-spa';

// ACTIONS
import { getUser } from '../actions/actions';

const UserProfile = props => {
   const dispatch = useDispatch();
   const { loading, user } = useAuth0();
   const userProfile = useSelector(state => state.userInfo);
   const isFetching = useSelector(state => state.isFetching);

   useEffect(() => {
      dispatch(getUser(props.match.params.id));
   }, []);

   if (loading || !user) {
      return <div>Loading...</div>;
   }

   console.log('UserProfile', user);
   return <h2>{user.name}</h2>;
};

export default UserProfile;
