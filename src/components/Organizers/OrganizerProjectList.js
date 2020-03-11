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
import "../../sass/organizerProjectList/organizerProjectList.scss"


const useStyles = makeStyles(theme => ({
    root: {
        background: 'white',
        textTransform: 'none'
    },
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
        width: '100%',
        // opacity: '0.5',
        color: 'white',
        overflow: 'hidden'
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
        color: 'black',
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
        return <Loader type="Rings" color="#311B92" height={100} width={100} />
    }

    console.log(hackathon)

    return (
        <div className="container">
            <div>
                <button onClick={handleOpen} className='create-project-button'>
                    Add a project
                </button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                // BackdropProps={{
                //     timeout: 500,
                // }}
                >
                    <Fade in={open}>
                        <CreateProject />
                    </Fade>
                </Modal>

                {hackathon?.projects?.map(project => {
                    return (
                        <div className='project-title' key={project.project_id}>
                            <p>Project</p>
                            <p>
                                {project.project_title}
                            </p>
                            {/* <CardContent>
                                    <Typography noWrap={true}>
                                        {project.project_description}
                                    </Typography>
                                </CardContent> */}
                        </div>
                    )
                })}

            </div>
        </div>
    )
};

export default OrganizerProjectList;