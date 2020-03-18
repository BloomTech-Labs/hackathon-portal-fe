//Deletes a hackathon

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';


// ACTIONS
import { deleteHackathon } from '../../actions/actions'

import { style } from '../../MUI-Styles/deleteHackathonStyles';

const useStyles = makeStyles(theme => style)

export default function DeleteHackathonModal(props) {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const classes = useStyles();

  const handleDeleteClick = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  return (
    <div>
      <Button disableRipple id='single-hackathon-delete-btn' type="button" variant='outlined' onClick={handleDeleteClick} className={classes.button}>
        Delete Event
      </Button>

      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this event? This cannot be undone.'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            NO, CANCEL
               </Button>
          <Button
            onClick={() => dispatch(deleteHackathon(props.id, props.org_id, props.history))
            }
            color="primary"
            autoFocus
          >
            YES, DELETE
               </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}