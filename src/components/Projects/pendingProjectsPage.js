import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { editProject, getSpecificHackathon } from '../../actions/actions';

const useStyles = makeStyles(theme => ({
    projectcard: {
        border: '3px solid red',
    }
  }));

const PendingProjects = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, user } = useAuth0();
    let { register, handleSubmit } = useForm();
    const hackathon = useSelector(state => state.singleHackathon);
    // const projects = useSelector(state => state.projects);
    const [projectInfo, setprojectInfo] = useState({ is_open: true });
    const isFetching = useSelector(state => state.isFetching);

    // useEffect(() => {
    //     dispatch(editProject(hackathonProjects.projects));
    //  }, [dispatch, hackathonProjects.projects]);
    console.log(props, 'this is the last props')

    useEffect(() => {
        dispatch(getSpecificHackathon((props.id)));
     }, [dispatch, props.id]);

     useEffect(() => {
        if(hackathon){
           setprojectInfo({ projectInfo: hackathon.projectInfo })
        }
     }, [hackathon]);

     console.log(props.hackathonid, 'this is props');
    //  console.log(hackathonProjects, 'this is hackathonprojects');
    //  console.log(projects, 'this is projects');
    const handleApprove = (data, e) => {
        if (loading) {
            return;
         }
         const id = user.sub.replace('auth0|', '');
        //  e.preventDefault();
         dispatch(
            editProject(
               Number(hackathon.projects.project_id),
               props.history,
               projectInfo
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
                            {/* <button onClick={handleApprove}>Approve Project</button> */}
                        </div>
                    ))}
                {/* </form> */}
            </div>
        </div>
    )
}

export default PendingProjects;