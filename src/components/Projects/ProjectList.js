import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import moment from 'moment';

// ACTIONS
import { getSpecificHackathon } from "../../actions/actions";
import { Typography, Avatar, FormControlLabel, Radio, RadioGroup, FormHelperText, makeStyles, Card } from "@material-ui/core";

// STYLES
import { style } from '../../styles/projectListStyles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => style);


const ProjectList = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.isFetching);
  const [projects, setProjects] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [approvedProjects, setApprovedProjects] = useState(true);
  const [registered, setRegistered] = useState({ registered:false, project_id:0 })
  const { user } = useAuth0();
  const currentDate = new Date().toString();

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleCheckboxChange = e => {
      setFilterBy(e.target.value)
  }


  useEffect(() => {
    if(hackathon){
      setProjects(hackathon.projects)
      setApprovedProjects(hackathon.projects.filter(element=>{return element.is_approved}))
    }
    if(hackathon && hackathon.projects){
      hackathon.projects.map(item => {
        if(item.participants.find(element => {
          return element.user_id === user.id
        })){
          setRegistered({ registered:true, project_id: item.project_id })
        }
      })
    }
    
  }, [hackathon])
  useEffect(() => {
    if(hackathon && hackathon.projects){
      if(hackathon.admins.find(element => {
        return element.user_id === user.id
      })){
        setRegistered({ registered:true })
      }
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

  return (
    <div>
      <Typography className={classes.projectsHeader} variant='h4'>Project List</Typography>
     { !moment(hackathon.end_date).isBefore(currentDate)?
      <Button id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}/create/project`)}>Submit a project idea</Button> : null}
      <div className={classes.contentContainer}>
        <RadioGroup value={filterBy} onChange={handleCheckboxChange} className={classes.radioGroup}>
          <Button id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>
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
          </RadioGroup>
        {!hackathon.projects ? 
          <Typography variant='h6'>This hackathon currently has no projects</Typography>
          :
          !projects[0] && filterBy !== '' ? 
          <Typography variant='h6'>There are no projects with the chosen role available</Typography>
          :
          !approvedProjects[0] ? 
          <Typography variant='h6'>This hackathon currently has no projects</Typography>
          :
          projects[0] ? 
          <div className={classes.cardContainer}>
            {projects.map((project, index) => {
              return(
                project.is_approved && (
                  <Card key={index}  className={classes.projectCards} 
                  onClick={() => props.history.push(`/hackathon/${hackathon.id}/projects/${project.project_id}`)}>
                    <div>
                      <Typography variant='h5' className={classes.projectTitle}>{project.project_title}</Typography>
                      <Typography noWrap={true} variant='body2' className={classes.projectDescription}>{project.project_description}</Typography>
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
                    <p className={classes.viewMore}>View More</p>
                  </Card>
              ))
            })}
          </div>
          :
          <Typography variant='h6'>This hackathon currently has no projects</Typography>
        }
      </div>
    </div>
  );
};

export default ProjectList;
