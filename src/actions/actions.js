import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const FETCH_START = 'FETCH_START';
export const FETCH_HACKATHON = 'FETCH_HACKATHON';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_HACKERS = 'FETCH_HACKERS';
export const FETCH_USER = 'FETCH_USER';
export const POST_HACKATHON_SUCCESS = 'POST_HACKATHON_SUCCESS';
export const DELETE_HACKATHON_SUCCESS = 'DELETE_HACKATHON_SUCCESS';
export const EDIT_HACKATHON_SUCCESS = 'EDIT_HACKATHON_SUCCESS';
export const POST_ORGANIZER_SUCCESS = 'POST_ORGANIZER_SUCCESS';
export const FETCH_HACKATHONS = 'FETCH_HACKATHONS';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS';
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const JOIN_PROJECT_SUCCESS = 'JOIN_PROJECT_SUCCESS';
export const ASSIGN_ROLE_SUCCESS = 'ASSIGN_ROLE_SUCCESS';
export const EDIT_PROJECT_SUCCESS = 'EDIT_PROJECT_SUCCESS';

// ACTIONS



//PROJECTS
export const editProject = (
   hackathonId,
   project_id,
   projectInfo
   ) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .put(`/projects/${project_id}`, projectInfo)
      .then(response => {
         dispatch({ type: EDIT_PROJECT_SUCCESS })
         if(projectInfo.is_approved){
            dispatch(getSpecificHackathon(hackathonId))
         };
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
}

export const deleteProject = (
   hackathonId,
   project_id,
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
   .delete(`/projects/${project_id}`)
   .then(response => {
      dispatch({ type: POST_PROJECT_SUCCESS })
      if(project_id){
         dispatch(getSpecificHackathon(hackathonId))
      };
   })
   .catch(error => {
      dispatch({ type: FETCH_FAILURE})
   })
}

export const createProject = (
   hackathon_id,
   projectInfo,
   history
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .post(`/projects`, projectInfo)
      .then(response => {
         console.log('ACTION RESPONSE', response)
         dispatch({ type: POST_PROJECT_SUCCESS });
         dispatch(getSpecificHackathon( response.data.data.hackathon_id ))
         // history.push(`/hackathon/${hackathon_id}`);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const updateProject = (
   project_id,
   info
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .put(`/projects/${project_id}`, info)
      .then(response => {
         console.log('ACTION RESPONSE', response)
         dispatch({ type: UPDATE_PROJECT_SUCCESS });
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const joinProject = (
   hackathon_id,
   user_id,
   project,
   role,
   history
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .post(`/hackathons/${hackathon_id}/join/${user_id}`, project)
      .then(response => {
         console.log('ACTION RESPONSE', response)
         dispatch({ type: JOIN_PROJECT_SUCCESS })
         dispatch(updateProject(project.project_id, role))
         history.push(`/profile`)
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
}

// HACKATHONS
export const getHackathons = () => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/hackathons`)
      .then(response => {
         dispatch({ type: FETCH_HACKATHONS, payload: response.data });
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const getSpecificHackathon = id => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/hackathons/${id}`)
      .then(response => {
         dispatch({ type: FETCH_HACKATHON, payload: response.data });
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const createHackathon = (
   user_id,
   hackathonInfo,
   history,
   setId
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .post(`/hackathons/u/${user_id}`, hackathonInfo)
      .then(response => {  
         dispatch({ type: POST_HACKATHON_SUCCESS });
         dispatch(getSpecificHackathon(response.data.id))
         setId(response.data.id)
         // console.log(response.data)
         // history.push(`/success`, response.data.id);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
         console.log(error)
         window.alert("Error: Please make sure you've included all required fields, or try again later.")
      });
};

export const editHackathon = (
   id,
   org_id,
   history,
   hackathonInfo
   ) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .put(`/hackathons/${id}/u/${org_id}`, hackathonInfo)
      .then(response => {
         dispatch({ type: EDIT_HACKATHON_SUCCESS });
         dispatch(getSpecificHackathon(id));
         history.push(`/success`, response.data.id);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
}

export const deleteHackathon = (id, org_id, history) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .delete(`/hackathons/${id}/u/${org_id}`)
      .then(response => {
         dispatch({ type: DELETE_HACKATHON_SUCCESS });
         history.push(`/profile`)
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

// USERS
export const getHackers = () => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/users`)
      .then(response => {
         dispatch({ type: FETCH_HACKERS, payload: response.data });
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const getUser = id => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/users/${id}`)
      .then(response => {
         console.log('TEST', response.data)
         dispatch({ type: FETCH_USER, payload: response.data });
      })
      .catch(error => {
         console.log(error);
      });
};

export const deleteUser = id => async dispatch => {
   dispatch({ type: DELETE_USER });
   (await axiosWithAuth())
      .delete(`/users/${id}`)
      .then(res => {
         dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
      })
      .catch(err => {
         dispatch({ type: DELETE_USER_FAIL });
      });
};

export const assignRole = (
   hackathon_id,
   user_id,
   role,
   setOpen
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .post(`/hackathons/${hackathon_id}/join/${user_id}`, role)
      .then(response => {
         console.log('ACTION RESPONSE', response)
         dispatch({ type: ASSIGN_ROLE_SUCCESS })
         setOpen(false)

      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
}
