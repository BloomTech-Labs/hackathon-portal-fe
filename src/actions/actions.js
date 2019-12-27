import { axiosWithAuth } from '../utils/axiosWithAuth'; 
import { connect } from "react-redux";


// ACTION TYPES
export const FETCH_START = 'FETCH_START';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_HACKERS = 'FETCH_HACKERS';

// ACTIONS
export const getHackathons = () => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
        .get(`/hackathons`)
        .then(response => {
        console.log('GET HACKATHONS', response.data)
        dispatch({ type: FETCH_HACKERS, payload: response.data })
        // .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }));
        })
        .catch(error => {
        console.log(error)
        })
}

export const getSpecificHackathon = ( id ) => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
    .get(`/hackathons/${id}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

export const getTeams = () => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
    .get(`/teams`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

export const getSpecificTeam = ( id ) => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
    .get(`/teams/${id}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}

export const getHackers = () => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
    .get(`/users`)
    .then(response => {
        dispatch({ type: FETCH_HACKERS, payload: response.data })
        console.log('GET HACKERS', response.data)
    })
    .catch(error => {
        console.log(error)
        dispatch({ type: FETCH_FAILURE, payload: error.response })
    })
}

export const getSpecificHacker = ( id ) => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth()
    .get(`/users/${id}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
}
