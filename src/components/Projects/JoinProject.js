import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Select, MenuItem, FormLabel, InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function JoinProjectModal({ project }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openRoles, setOpenRoles] = useState([])
  const [role, setRole] = useState('')
  let spots = {'front_end_spots':'front end', 'back_end_spots':'back end', 'ux_spots':'ux', 'data_science_spots':'data science', 'android_spots':'android', 'ios_spots':'ios'}

  const handleOpen = () => {
    setOpen(true);
    Object.keys(spots).filter((role, index) => {
      if(project[role] > 0){
        openRoles.push(Object.values(spots)[index])
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRoles([]);
  };

  const handleChange = e => {
    setRole(Object.keys(spots)[Object.values(spots).indexOf(Object.values(spots).find((element, index) => {
      return element === e.target.value
  }))])
  };

  const handleSubmit = () => {

  };

  return (
    <div>
      <Button type="button" onClick={handleOpen}>
        JOIN
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
            <h2 id="projectTitle">{project.project_title}</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
            <Select onChange={handleChange}>
              {openRoles.map(element => {
                return (<MenuItem value={element}>{element}</MenuItem>)
              })}
            </Select>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default JoinProjectModal;