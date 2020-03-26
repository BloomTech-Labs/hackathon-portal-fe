//Organizer of hackathon can see a list of projects
//Can create projects after creating hackathons
//Try to find "Create Projects"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateProject from '../Projects/CreateProject';

//STYLES
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Loader from 'react-loader-spinner';
import "../../sass/organizerProjectList/organizerProjectList.scss"

import { modalStyle } from '../../MUI-Styles/organizerProjectList';

const useStyles = makeStyles(theme => modalStyle)


const OrganizerProjectList = props => {
    const classes = useStyles();
    const hackathon = useSelector(state => state.singleHackathon)
    const [open, setOpen] = React.useState(false);
    // const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (!hackathon) {
        return <Loader type="Rings" color="#311B92" height={100} width={100} />
    }

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
                >
                    <Fade in={open}>
                        <CreateProject handleClose={handleClose} />
                    </Fade>
                </Modal>

                {hackathon?.projects?.map(project => {
                    return (
                        <div className='project-title' key={project.project_id}>
                            <p>Project</p>
                            <p>
                                {project.project_title}
                            </p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
};

export default OrganizerProjectList;