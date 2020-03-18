// A page that shows an organizer a list of pending project ideas for their hackathon that can be approved or denied

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { editProject, getSpecificHackathon, deleteProject } from '../../actions/actions';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';

import { style } from '../../MUI-Styles/pendingProjectPageStyles';

const useStyles = makeStyles(theme => style)

const PendingProjects = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, user } = useAuth0();
    const isFetching = useSelector(state => state.isFetching);
    const hackathon = useSelector(state => state.singleHackathon);
    const projects = useSelector(state => state.projects);
    const hackathonId = (props.history.location.state.hackathonId)
    const [count, setCount] = useState(0);

    useEffect(() => {
        dispatch(getSpecificHackathon(hackathonId))
    }, []);

    const pending = !hackathon ? [] : hackathon.projects.filter(element => !element.is_approved)

    const handledisapprove = data => (e) => {
        const id = user.sub.replace('auth0|', '');
        e.preventDefault();
        dispatch(
            deleteProject(
                hackathon.id,
                data
            )
        );
    }

    const handleApprove = data => (e) => {
        const id = user.sub.replace('auth0|', '');
        e.preventDefault();
        dispatch(
            editProject(
                hackathon.id,
                data,
                { is_approved: true }
            )
        );
    }
    console.log(hackathon, 'this is hackathon')
    if (isFetching || !hackathon) {
        return <Loader type="Rings" color="#311B92" height={100} width={100} />;
    }

    return (
        <div className={classes.pendingContainer}>

            <Button className={classes.backButton} id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>

            <div>
                <div className='pendingList'>

                    {pending.length ? pending.map(e => {
                        return (
                            (<form className={classes.pendingProjectCard} key={e.project_id}
                                onSubmit={handleApprove(e.project_id)}
                            >
                                <div className={classes.upperContent}>
                                    <h3 className={classes.h3}>{e.project_title}</h3>
                                    <p className={classes.description}>{e.project_description}</p>
                                </div>
                                <div className={classes.buttonsContainer}>

                                    <button
                                        className={classes.disapprove}
                                        onClick={handledisapprove(e.project_id)}
                                        type='submit'>
                                        Disapprove
                                </button>
                                    <button
                                        type='submit'
                                        className={classes.approve}
                                    >
                                        Approve
                                </button>

                                </div>
                            </form>)
                        )
                    }) : <p>No pending projects</p>}
                </div>
            </div>
        </div>
    )
}

export default PendingProjects;