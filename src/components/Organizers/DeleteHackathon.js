import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch } from 'react-redux';

// ACTIONS
import { deleteHackathon } from '../../actions/actions'

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

export default function DeleteHackathonModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        DELETE
      </button>
      <Modal
        aria-labelledby="delete-hackathon"
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
            <h2 id="transition-modal-title">Deleting Hackathon</h2>
            <p id="transition-modal-description">Are you sure you want to delete this event? This can not be undone.</p>
            <button onClick={()=>dispatch(deleteHackathon(props.id, props.org_id, props.history))}>YES, DELETE</button>
            <button onClick={()=>handleClose()}>NO, CANCEL</button>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}