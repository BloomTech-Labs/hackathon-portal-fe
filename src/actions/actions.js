import { axiosWithAuth } from '../utils/axiosWithAuth';

// ACTION TYPES
export const FETCH_START = 'FETCH_START';
export const FETCH_HACKATHON = 'FETCH_HACKATHON';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_HACKERS = 'FETCH_HACKERS';
export const FETCH_USER = 'FETCH_USER';
export const POSTHACKATHON_SUCCESS = 'POSTHACKATHON_SUCCESS';
export const POSTORGANIZER_SUCCESS = 'POSTORGANIZER_SUCCESS';

// ACTIONS

// HACKATHONS
export const getHackathons = () => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .get(`/hackathons`)
      .then(response => {
         console.log('GET HACKATHONS', response.data);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const getSpecificHackathon = id => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
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
) => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .post(`/hackathons/u/${user_id}`, hackathonInfo)
      .then(response => {
         dispatch({ type: POSTHACKATHON_SUCCESS });
         history.push(`/success`, response.data.id);
      })
      .catch(error => {
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

// TEAMS
export const getTeams = () => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .get(`/teams`)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
         console.log(error);
      });
};

export const getSpecificTeam = id => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .get(`/teams/${id}`)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
         console.log(error);
      });
};

// HACKERS
export const getHackers = () => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .get(`/users`)
      .then(response => {
         dispatch({ type: FETCH_HACKERS, payload: response.data });
         console.log('GET HACKERS', response.data);
      })
      .catch(error => {
         console.log(error);
         dispatch({ type: FETCH_FAILURE, payload: error.response });
      });
};

export const getUser = id => dispatch => {
   dispatch({ type: FETCH_START });
   axiosWithAuth()
      .get(`/users/${id}`)
      .then(response => {
         dispatch({ type: FETCH_USER, payload: response.data });
         console.log('getUser', response);
      })
      .catch(error => {
         console.log(error);
      });
};
