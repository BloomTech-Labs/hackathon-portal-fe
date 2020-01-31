import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { editProject, getSpecificHackathon, deleteProject } from '../../actions/actions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    projectcard: {
        padding: '25px',
        height: '250px',
         margin: '20px',
        background: "#1c1c1f",
        border: "1px solid #D0DDFF",
         width: "250px",
        borderRadius: "3%",
    },
    h3: {
         margin:' 0 0 5px',
        fontSize: '22px',
        fontWeight: 'bold',
    },
    description: {
        overflow: 'scroll',
        textOverflow: 'ellipsis',
        height: '164px'
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

     const pending = !hackathon ? [] : hackathon.projects.filter(element=> !element.is_approved)

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
     console.log(hackathon, 'this is hackathon')
     if (isFetching || !hackathon) {
        return <h2>Loading...</h2>;
     }

    return (
        <div className='pending-container'>
          
         <Button id='view-archive-btn'onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>
          
            <div>
                <div className='pendingList'>
               
                    {pending.length ? pending.map(e => {
                        return (
                        (<form key={e.project_id} className={classes.projectcard}
                            onSubmit={handleApprove(e.project_id)} 
                            >
                                <h3 className={classes.h3}>{e.project_title}</h3>
                                <p className={classes.description}>{e.project_description}</p>
                                <button type='submit' className='checkbox' ><i class="material-icons checkbox">
                                    check</i></button>
                                <button className='decline'
                                onClick={handledisapprove(e.project_id)}type='submit'><i class="material-icons">
                                close
                                </i></button>
                            </form>)
                            )
                        }) : <p>No pending projects</p>}
                </div>
            </div>
        </div>
    )
}

export default PendingProjects;