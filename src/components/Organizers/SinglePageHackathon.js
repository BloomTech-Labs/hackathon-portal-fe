import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

// ACTIONS
import { getSpecificHackathon } from '../../actions/actions';
import { Typography } from '@material-ui/core';

const SinglePage = (props) => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon)
  const isFetching = useSelector(state => state.isFetching)

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id))
  }, [])

  const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const newDate = new Date(date)
    const y = newDate.getFullYear()
    const d = newDate.getDate()
    const m = months[newDate.getMonth()]
    const day = days[newDate.getDay()]
    return `${day}, ${m} ${d}, ${y}`
  }
  {console.log(hackathon)}

  if(isFetching){
    return(
      <div>
        Loading...
      </div>
    )
  }else if(!isFetching){
    return(
      <div>
        <h2>{hackathon.name}</h2>
        {!hackathon.is_open ? 
          <button>open</button>
          :
          <button>close</button>
        }
        <h4>Description:</h4>
        <p>{hackathon.description}</p>
        <h4>Start date:</h4>
        <p>{formatDate(hackathon.start_date)}</p>
        <h4>End date:</h4>
        <p>{formatDate(hackathon.end_date)}</p>
        <button>edit</button>
        <button>delete</button>
        <h4>Participants:</h4>
        <p>
          {hackathon.teams.map(team => {
            return team.devs.length
          }).reduce((acc, curr)=>acc + curr)}
        </p>
        <h4>Admins</h4>
      </div>
    )
  }
}

export default SinglePage;