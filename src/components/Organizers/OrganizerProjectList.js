//Organizer of hackathon can see a list of projects
//Can create projects after creating hackathons
//Try to find "Create Projects"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateProject from '../Projects/CreateProject';

//STYLES
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Loader from 'react-loader-spinner';


const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: '25%',
      margin: '0 auto',
      color: 'white',
      background: 'inherit',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
      color: 'white',
    },
    pos: {
      marginBottom: 12,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#686875',
        color: 'white',
        overflow: 'scroll'
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      content: {
          color: 'white',
          border: '1px solid',
          borderRadius: '13.5px',
          paddingBottom: '0'
      },
      projects: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '50px'
      },
      listItem: {
          color: 'white',
          textAlign: 'left'
      }
  }));

 
const OrganizerProjectList = props => {
    const classes = useStyles();
    const hackathon = useSelector(state => state.singleHackathon)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  
    if (!hackathon) {
        return <Loader type="Rings" color="#4885E1" height={100} width={100} />
    }

console.log(hackathon)

    return(
        <div className="container">
            <div>    
                <Card className={classes.card} onClick={handleOpen}>
                        <CardContent className={classes.content}>
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

                <div className={classes.projects}>
                    {hackathon.projects.map(project => {
                        return (
                            <div className={classes.listItem} key={project.project_id}>
                                 <div>
                                    <CardHeader
                                        title={project.project_title}
                                    />
                                    <CardContent>
                                        <Typography noWrap={true}>
                                                {project.project_description}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                        )
                    })}
                    
            </div>
        </div>
    )
};

export default OrganizerProjectList;