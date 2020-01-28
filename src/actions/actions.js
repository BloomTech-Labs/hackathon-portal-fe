import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const FETCH_START = 'FETCH_START';
export const FETCH_HACKATHON = 'FETCH_HACKATHON';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_HACKERS = 'FETCH_HACKERS';
export const FETCH_USER = 'FETCH_USER';
export const POSTHACKATHON_SUCCESS = 'POSTHACKATHON_SUCCESS';
export const DELETEHACKATHON_SUCCESS = 'DELETEHACKATHON_SUCCESS';
export const EDITHACKATHON_SUCCESS = 'EDITHACKATHON_SUCCESS';
export const POSTORGANIZER_SUCCESS = 'POSTORGANIZER_SUCCESS';
export const FETCH_HACKATHONS = 'FETCH_HACKATHONS';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const POSTPROJECT_SUCCESS = 'POSTPROJECT_SUCCESS';
export const EDITPROJECT_SUCCESS = 'EDITPROJECT_SUCCESS';

// ACTIONS



//PROJECTS
export const editProject = (
   project_id,
   history,
   projectInfo
   ) => async dispatch => {
   dispatch({ type: EDITPROJECT_SUCCESS });
   (await axiosWithAuth())
      .put(`/projects/${project_id}`, projectInfo)
      .then(response => {
         dispatch({ type: POSTPROJECT_SUCCESS });
         history.push(`/success`, response.data.id);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
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
         dispatch({ type: POSTPROJECT_SUCCESS });
         // history.push(`/hackathon/${hackathon_id}`);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

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
   history
) => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .post(`/hackathons/u/${user_id}`, hackathonInfo)
      .then(response => {
         dispatch({ type: POSTHACKATHON_SUCCESS });
         history.push(`/success`, response.data.id);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
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
         dispatch({ type: EDITHACKATHON_SUCCESS });
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
         dispatch({ type: DELETEHACKATHON_SUCCESS });
         history.push(`/`)
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

// TEAMS
export const getTeams = () => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/teams`)
      .then(response => {
      })
      .catch(error => {
         console.log(error);
      });
};

export const getSpecificTeam = id => async dispatch => {
   dispatch({ type: FETCH_START });
   (await axiosWithAuth())
      .get(`/teams/${id}`)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
         console.log(error);
      });
};

// HACKERS
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
