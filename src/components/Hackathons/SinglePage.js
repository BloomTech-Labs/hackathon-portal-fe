import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';

const SinglePage = (props) => {
  const hackathon = useSelector(state => state.singleHackathon)

  useEffect(() => {
    props.getSpecificHackathon(props.match.params.id)
  }, [])

  console.log('CHANGING REDUCER', hackathon)

  return(
    <div>
      {console.log(props.match.params.id)}
      Single
    </div>
  )
}

export default connect(null, 
  { getSpecificHackathon }  
)(SinglePage);