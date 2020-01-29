import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
 } from '@material-ui/core';
 import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificHackathon } from '../../actions/actions';

 const ProjectModal = props => {
     const dispatch = useDispatch();
     const hackathon = useSelector(state => state.singleHackathon);
     const isFetching = useSelector(state => state.isFetching);
     const project_id = props.project_id;
     const hackathon_id = props.hackathon_id;
     const [open, setOpen] = useState(true);
     

    useEffect(() => {
        dispatch(getSpecificHackathon((hackathon_id)))
    }, [dispatch]);

    if (isFetching || !hackathon) {
        return <h2>Loading...</h2>
    }

    const handleOpen = e => {
        setOpen(true)
    }
    const handleClose = e => {
        setOpen(false)
    }

    const projects = !hackathon ? {} : hackathon.projects;
    const project = !projects ? [] : projects.find(p => p.project_id === Number(project_id));
    const totals = [project.ios_spots, project.android_spots, project.back_end_spots, project.front_end_spots, project.ux_spots, project.data_science_spots];
    const spotsOpen = totals.reduce((a, c) => a+c) !== 0
  
     return (

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
     >
        <DialogTitle id="form-dialog-title">
           <h2>{project.project_title} {!spotsOpen ? `(Full)`: null}</h2>
           <p>{project.project_description}</p>
        </DialogTitle>
        <DialogContent>

        <section className='modal-avail-spots'>
             {spotsOpen ?(
             <>
             <h2>Available Spots</h2>
              <p>Front-end: {project.front_end_spots}</p> 
              <p>Back-end: {project.back_end_spots}</p> 
              <p>iOS: {project.ios_spots}</p> 
              <p>Android: {project.android_spots}</p> 
              <p>Data Science: {project.data_science_spots}</p> 
             <p>UX: {project.ux_spots}</p>
             </> ) : null}
            
          </section>
           
          {!project.participants ? 
          <h1>Loading...</h1> 
          : 
          <>
          <h2>Participants</h2>
          {project.participants.map(p => (
            <card>
                <p className='modal-username'>{p.username}</p>
                <p className='modal-role'>{p.developer_role}</p>
            </card>
          ))}
          </>
          }
         
        </DialogContent>
        <DialogActions>
             {spotsOpen ? <Button color="primary" variant='contained'>
              Join Project
           </Button> : null 
           }
           <Button onClick={handleClose} color="primary">
              Close
           </Button>
        </DialogActions>
 

     </Dialog>
     )
 }
 export default ProjectModal;