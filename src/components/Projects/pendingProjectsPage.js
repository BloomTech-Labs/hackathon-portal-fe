import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    projectcard: {
        border: '3px solid red',
    }
  }));

const PendingProjects = () => {
    const classes = useStyles();
    const hackathon = useSelector(state => state.singleHackathon);

     console.log(hackathon, 'this is hackathon');

    return (
        <div>
            hello this is the pending projects list
            <div className='pendingList'>
                {hackathon.projects.map(e => (
                    <div className={classes.projectcard}>
                        <h3>{e.project_title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingProjects;