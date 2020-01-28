import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { editProject, getSpecificHackathon } from '../../actions/actions';

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
    let { register, handleSubmit } = useForm();
    const hackathon = useSelector(state => state.singleHackathon);
    const projects = useSelector(state => state.projects);
    const [projectInfo, setprojectInfo] = useState({ is_open: true });

    //  useEffect(() => {
    //     if(hackathon.projects[0].is_approved == true){
    //         console.log(hackathon.projects[0].is_approved);
    //     }
    //  }, [hackathon]);

    console.log('this is hackathon', hackathon);

    const handleApprove = projectid => {

         console.log(projectid, 'this is date');
         const id = user.sub.replace('auth0|', '');
        //  data.preventDefault();
         dispatch(
            editProject(
               Number(projectid),
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
                {/* <form
                onSubmit={handleSubmit(handleApprove)}
                // className={classes.root}
                // style={{ width: '50%', margin: '0 auto' }}
                > */}
                    {hackathon.projects.map(e => (
                        <div key={e.project_id} className={classes.projectcard}>
                            <h3>{e.project_title}</h3>
                            <h3>{e.project_id}</h3>
                            <p>{e.project_description}</p>
                            <button onClick={handleApprove(e.project_id)}>Approve Project</button>
                        </div>
                    ))}
                {/* </form> */}
            </div>
        </div>
    )
}

export default PendingProjects;