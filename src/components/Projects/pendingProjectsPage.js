import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { editProject } from '../../actions/actions';

const useStyles = makeStyles(theme => ({
    projectcard: {
        border: '3px solid red',
    }
  }));

const PendingProjects = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const hackathon = useSelector(state => state.singleHackathon);
    const [isOpen, setIsOpen] = useState({ is_open: true });

     console.log(hackathon, 'this is hackathon');
     
    const handleIsOpen = id => {
        setIsOpen({ is_open: !isOpen.is_open })
        dispatch(editProject(id, { is_open: !isOpen.is_open }))
     }

    return (
        <div>
            hello this is the pending projects list
            <div className='pendingList'>
                {hackathon.projects.map(e => (
                    <div className={classes.projectcard}>
                        <h3>{e.project_title}</h3>
                        <h3>{e.project_id}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingProjects;