import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel } from "@material-ui/core";
import JoinProjectModal from "./JoinProject";

const ProjectList = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if(hackathon){
      setProjects(hackathon.projects)
    }
  }, [hackathon])
  /*
  front_end_spots: 3
  back_end_spots: 1

  ios_spots: 1
  android_spots: 1
  data_science_spots: 1
  ux_spots: 1
  */

  const handleCheckboxChange = e => {
      setFilterBy(e.target.value)
  }

  useEffect(() => {
    if(hackathon && !filterBy){
      setProjects(hackathon.projects)
    }else if(hackathon){
      console.log(filterBy)
      setProjects(hackathon.projects.filter(element => {
        return element[filterBy] > 0
      }))
    }
  }, [filterBy])

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <RadioGroup value={filterBy} onChange={handleCheckboxChange}>
        <FormControlLabel
          control={<Radio />}
          value=''
          label="show all"
        />
        <FormControlLabel
          control={<Radio />}
          value='front_end_spots'
          label="front end"
        />
        <FormControlLabel
          control={<Radio />}
          value='back_end_spots'
          label="back end"
        />
        <FormControlLabel
          control={<Radio />}
          value='ux_spots'
          label="ux"
        />
        <FormControlLabel
          control={<Radio />}
          value='data_science_spots'
          label="data science"
        />
        <FormControlLabel
          control={<Radio />}
          value='ios_spots'
          label="ios"
        />
        <FormControlLabel
          control={<Radio />}
          value='android_spots'
          label="android"
        />
      </RadioGroup>
      <Typography variant='h4'>Project List</Typography>
      {!projects ? 
        <Typography variant='h6'>There are no projects posted at this time.</Typography>
        :
        projects.map((project, index) => {
          return(
            project.is_approved && (
              <div key={index} style={{border:'2px solid red', width:'300px'}}>
                <div>
                  <Typography variant='h5' style={{fontWeight:'bold'}}>{project.project_title}</Typography>
                  <Typography variant='body1'>{project.project_description}</Typography>
                </div>
                <div style={{display:'flex', margin:'0 auto'}}>
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
                </div>
                <JoinProjectModal project={project} />
              </div>
          ))
        })
      }
    </div>
  );
};

export default ProjectList;
