// You can join a project while viewing a project in a hackathon
// It opens a modal on a seperate page
// We should decide on either modal or seprate page
// Has a button "Join Button" that will link to a modal on "JoinProject.js"

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificHackathon, getSubmittedProject } from '../../actions/actions';

import JoinProjectModal from './JoinProject';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import moment from 'moment';

import "../../sass/projectModal/projectModal.scss";

const useStyles = makeStyles(theme => ({
  modal: {
    minWidth: '500px',
  }
}));



const ProjectModal = props => {
  const dispatch = useDispatch();
  const hackathon = useSelector(state => state.singleHackathon);
  const submittedProjectInfo = useSelector(state => state.submittedProjectInfo)
  const isFetching = useSelector(state => state.isFetching);
  const [open, setOpen] = useState(true);
  const project_id = props.match.params.project_id;
  const [registered, setRegistered] = useState({ registered: false, project_id: 0 })
  const classes = useStyles();
  const { user } = useAuth0();
  const currentDate = new Date().toString();

  useEffect(() => {
    if (hackathon && hackathon.projects) {
      hackathon.projects.map(item => {
        if (item.participants.find(element => {
          return element.user_id === user?.id
        })) {
          setRegistered({ registered: true })
        }
      })
    }

  }, [hackathon])
  useEffect(() => {
    if (hackathon && hackathon?.projects) {
      if (hackathon?.admins?.find(element => {
        return element?.user_id === user?.id
      })) {
        setRegistered({ registered: true })
      }
    }

  }, [hackathon])

  useEffect(() => {
    dispatch(getSpecificHackathon((props.match.params.id)))
    dispatch(getSubmittedProject(project_id))
  }, [dispatch, props.match.params.id, project_id]);

  if (isFetching || !hackathon) {
    return <Loader type="Rings" color="#311B92" height={100} width={100} />
  }

  const handleClose = e => {
    setOpen(false)
    props.history.push(`/hackathon/${hackathon.id}/projects`)
  }
  console.log(hackathon)
  const projects = !hackathon ? {} : hackathon.projects;

  const project = !projects ? [] : projects.find(p => p.project_id === Number(project_id));
  const totals = [project.ios_spots, project.android_spots, project.back_end_spots, project.front_end_spots, project.ux_spots, project.data_science_spots];
  const spotsOpen = totals.reduce((a, c) => a + c) !== 0;
  const isPast = moment(hackathon.end_date).isBefore(currentDate)


  return (

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"

    >
      <DialogTitle id="form-dialog-title" className={classes.modal}>
        <h2>{project.project_title} {!spotsOpen && project.participants.length ? `(Full)` : null}</h2>
        {!spotsOpen && project.participants.length < 2 ? (
          <p>Solo Project</p>
        ) : null}
        <p>{project.project_description}</p>
      </DialogTitle>
      <DialogContent>

        <section className='modal-avail-spots'>
          {!project.submitted ? (
            spotsOpen ? (
              <>
                <h3>Available Spots</h3>
                <p>Front-end: {project.front_end_spots}</p>
                <p>Back-end: {project.back_end_spots}</p>
                <p>iOS: {project.ios_spots}</p>
                <p>Android: {project.android_spots}</p>
                <p>Data Science: {project.data_science_spots}</p>
                <p>UX: {project.ux_spots}</p>
              </>) : null
          ) : (
            <>
              <h3>Submitted Project</h3>
              <p>Judge score: <span className='score-status'> Pending</span></p>
              <p className='links-p'>Github: <a href={`${submittedProjectInfo?.github_url}`} target='_blank'>{submittedProjectInfo?.github_url}</a></p>
              <p className='links-p'>Deployed: <a href={`${submittedProjectInfo?.deployed_url}`} target='_blank'>{submittedProjectInfo?.deployed_url}</a></p>
              <p className='links-p'>Video: <a href={`${submittedProjectInfo?.video_url}`} target='_blank'>{submittedProjectInfo?.video_url}</a></p>
            </>
          )}
            
        </section>

        {!project.participants ?
          <h1>Loading...</h1>
          :
          <>
            <h3>Participants</h3>
            <div className='user'>
              {project.participants.length ? project.participants.map(p => (
                <card>
                  <p className='modal-username'>{p.username}</p>
                  <p className='modal-role'>{p.developer_role}</p>
                </card>

              )) : <p>This project currently has no participants</p>}
            </div>
          </>
        }

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        {(spotsOpen && !registered.registered && !isPast && !project.submitted) || 
        (!spotsOpen && !project.participants.length && !registered.registered && !isPast && !project.submitted) ?
          <button className='join-project-button'>
            <JoinProjectModal project={project} hackathon_id={hackathon.id}
              history={props.history} registered={registered.registered} />
          </button>
          : null
        }
      </DialogActions>


    </Dialog>
  )
}
export default ProjectModal;