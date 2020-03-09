// A button on ProjectModel that says "Join Project"
// When clicked, opens a seperate modal that says "submit"
// Where you would choose you role for the project

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Select, MenuItem, FormHelperText } from '@material-ui/core';

// ACTIONS
import { joinProject } from '../../actions/actions';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    color: 'black'
  },
  joinButton: {
    color: 'white',
    // backgroundColor: '#311B92'
  },
}));

function JoinProjectModal({ project, hackathon_id, registered, history }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRoles, setOpenRoles] = useState([])
  const [formattedRole, setFormattedRole] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  let spots = { 'front_end_spots': 'front end', 'back_end_spots': 'back end', 'ux_spots': 'ux', 'data_science_spots': 'data science', 'android_spots': 'android', 'ios_spots': 'ios' };
  const { loading, user } = useAuth0();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    Object.keys(spots).filter((role, index) => {
      if (project[role] > 0) {
        openRoles.push(Object.values(spots)[index])
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRoles([]);
    setError(false)
  };

  const handleChange = e => {
    setRole(Object.keys(spots)[Object.values(spots).indexOf(Object.values(spots).find((element, index) => {
      return element === e.target.value
    }))]);
    setFormattedRole(e.target.value)
  };

  const handleSubmit = e => {
    if (loading) {
      return;
    }
    const id = user.sub.replace('auth0|', '');
    e.preventDefault();
    if (registered) {
      setError(true)
    } else {
      dispatch(joinProject(hackathon_id, id, { project_id: project.project_id, user_hackathon_role: 'participant', developer_role: formattedRole }, { [role]: project[role] - 1 }, history));
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={classes.joinButton}>
        Join Project
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <h2 id="projectTitle">{project.project_title}</h2>
              {openRoles.length > 1 && (<p>Choose your role:</p>)}
              {!openRoles[0] ?
                false
                :
                <Select onChange={handleChange}>
                  {openRoles.map(element => {
                    return (<MenuItem value={element}>{element}</MenuItem>)
                  })}
                </Select>
              }
              <Button type='submit'>Submit</Button>
              {error && (<FormHelperText error>You are already registered for this hackathon</FormHelperText>)}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default JoinProjectModal;