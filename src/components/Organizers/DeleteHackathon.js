import React, {useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // Button,
  TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

// ACTIONS
import { deleteHackathon } from '../../actions/actions'


export default function DeleteHackathonModal(props) {
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteOpen(true);
 };

 const handleDeleteClose = () => {
    setDeleteOpen(false);
 };

  return (
    <div>
      <button type="button" onClick={handleDeleteClick}>
        DELETE
      </button>

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
                  onClick={()=>dispatch(deleteHackathon(props.id, props.org_id, props.history))
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