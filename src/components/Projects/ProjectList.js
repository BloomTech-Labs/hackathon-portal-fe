import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, FormControlLabel, Radio, RadioGroup, FormHelperText } from "@material-ui/core";
import JoinProjectModal from "./JoinProject";

const ProjectList = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterBy, setFilterBy] = useState('');
 const [registered, setRegistered] = useState({ registered:false, project_id:0 })
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if(hackathon){
      setProjects(hackathon.projects)
    }
  }, [hackathon])

  const handleCheckboxChange = e => {
      setFilterBy(e.target.value)
  }

  useEffect(() => {
    if(hackathon && hackathon.projects){
      hackathon.projects.map(item => {
        item.participants.map(element => {
        if(element.user_id === user.id){
          setRegistered({ registered:true, project_id:item.project_id })
        }
      })})
    }
    
  }, [hackathon])

  useEffect(() => {
    if(hackathon && !filterBy){
      setProjects(hackathon.projects)
    }else if(hackathon){
      setProjects(hackathon.projects.filter(element => {
        return element[filterBy] > 0
      }))
    }
  }, [filterBy])

  if (isFetching || !hackathon) {
    return <div>Loading...</div>;
  }


  // TO DO: SHOW MESSAGE IF ALREADY IN THE HACKATHON
  // TO DO: MODAL FOR DETAILED PROJECT?

  return (
    <div>
      <Typography variant='h4'>Project List</Typography>
      <button><Link to={`/hackathon/${hackathon.id}/create/project`}>Submit a project idea</Link></button>
      {!projects[0] ? 
        <Typography variant='h6'>There are no projects posted at this time.</Typography>
        :
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
            style={{color:'green'}}
          />
          <FormControlLabel
            control={<Radio />}
            value='back_end_spots'
            label="back end"
            style={{color:'blue'}}
          />
          <FormControlLabel
            control={<Radio />}
            value='ux_spots'
            label="ux"
            style={{color:'orange'}}
          />
          <FormControlLabel
            control={<Radio />}
            value='data_science_spots'
            label="data science"
            style={{color:'purple'}}
          />
          <FormControlLabel
            control={<Radio />}
            value='ios_spots'
            label="ios"
            style={{color:'white'}}
          />
          <FormControlLabel
            control={<Radio />}
            value='android_spots'
            label="android"
            style={{color:'red'}}
          />
        </RadioGroup>}
        {
          projects[0] && (
            projects.map((project, index) => {
              return(
                project.is_approved && (
                  
                  <div key={index} style={{border:'2px solid red', width:'300px'}} 
                  onClick={() => props.history.push(`/hackathon/${hackathon.id}/projects/${project.project_id}`)}>
                    <div>
                      <Typography variant='h5' style={{fontWeight:'bold'}}>{project.project_title}</Typography>
                      <Typography variant='body1'>{project.project_description}</Typography>
                      {registered.project_id === project.project_id ? (
                    <FormHelperText style={{color:'lime'}}>You are successfully registered for {project.project_title}!</FormHelperText>
                    ):false}
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
                    {/* <JoinProjectModal project={project} hackathon_id={hackathon.id} 
                    history={props.history} registered={registered.registered} /> */}
                  </div>
              ))
    
            })
          )
        }
    </div>
  );
};

export default ProjectList;