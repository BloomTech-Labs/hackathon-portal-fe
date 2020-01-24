import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar } from "@material-ui/core";

const ProjectList = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  console.log(hackathon)
  /*
  front_end_spots: 3
  back_end_spots: 1
  ios_spots: 1
  android_spots: 1
  data_science_spots: 1
  ux_spots: 1
  */

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  let arr = [];
  for(let i=0; i <= hackathon.max_team_participants; i++){
    arr.push(i)
  }
  console.log(arr)
  return (
    <div>
      Project List
      {arr.map(number => {
        return(<div>{number}</div>)
      })}
      {hackathon.projects.map((project, index) => {
        return(
          project.is_accepted && (
          <div key={index} style={{border:'2px solid red', width:'300px'}}>
            <div>
              <Typography variant='h5' style={{fontWeight:'bold'}}>{project.project_title}</Typography>
              <Typography variant='body1'>{project.project_description}</Typography>
            </div>
            <div style={{display:'flex', margin:'0 auto'}}>
              {/* {project.is_accepted ?  */}
                {project.front_end_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid green', color:'green'}}>FE</Avatar>
                )}
                {project.back_end_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid blue', color:'blue'}}>BE</Avatar>
                )}
                {project.ux_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid orange', color:'orange'}}>UX</Avatar>
                )}
                {project.data_science_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid purple', color:'purple'}}>DS</Avatar>
                )}
                {project.ios_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid white', color:'white'}}>IOS</Avatar>
                )}
                {project.android_spots > 0 && (
                  <Avatar style={{background:'none', border:'1px solid red', color:'red'}}>AND</Avatar>
                )}
              {/* // } */}
            </div>
          </div>
        ))
      })}
    </div>
  );
};

export default ProjectList;
