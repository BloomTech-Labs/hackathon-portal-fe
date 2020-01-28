import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProject from '../Projects/CreateProject';

//STYLES
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: '25%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 26,
    },
    pos: {
      marginBottom: 12,
    },
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


 
const OrganizerProjectList = props => {
    const classes = useStyles();
    const hackathon = useSelector(state => state.singleHackathon)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


     if (!hackathon) {
    return <h2>Loading...</h2>

}


    return(
        <div>
         <Card className={classes.card} onClick={handleOpen}>
                <CardContent>
                      <AddIcon />
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                         Create Project 
                    </Typography>
                </CardContent>

        </Card>

                       
    
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
                    <CreateProject />
                </Fade>
            </Modal>
        </div>
    )
};

export default OrganizerProjectList;