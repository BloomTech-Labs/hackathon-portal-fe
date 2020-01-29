import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { editProject, getSpecificHackathon, deleteProject } from '../../actions/actions';

const useStyles = makeStyles(theme => ({
    projectcard: {
        width: '20%',
        border: '3px solid red',
    }
  }));

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
     },[]);

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
               {is_approved: true}
            )
         );
     }

     if (isFetching || !hackathon) {
        return <div>Loading...</div>;
     }

    return (
        
        <div>
            <div className='pendingList'>
                    {hackathon.projects.map(e => {
                        return (
                        !e.is_approved && (<form key={e.project_id} className={classes.projectcard}
                            onSubmit={handleApprove(e.project_id)} 
                            // onClick={setCount + 1}
                            >
                                <h3>{e.project_title}</h3>
                                <h3>{e.project_id}</h3>
                                <p>{e.project_description}</p>
                                <button type='submit' >Approve Project</button>
                                <button 
                                onClick={handledisapprove(e.project_id)}type='submit'>Disapprove Project</button>
                            </form>))

                        })}
            </div>
        </div>
    )
}

export default PendingProjects;