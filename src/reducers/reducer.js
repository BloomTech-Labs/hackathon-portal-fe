import axios from "axios";
import { FETCH_START, FETCH_FAILURE, FETCH_HACKERS, FETCH_HACKATHONS } from '../actions/actions';

const initialState = {
    hackers: [],
    hackathons: [],
    isFetching: false,
    error: ''
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_START:
            return{
                isFetching: true,
                error: ''
            };
        case FETCH_FAILURE:
            return{
                isFetching: false,
                error: action.payload
            };
        case FETCH_HACKERS:
            return{
                ...state,
                hackers: action.payload,
                isFetching: false,
                error: ''
            };
        case FETCH_HACKATHONS:
            return{
                ...state,
                hackathons: action.payload,
                isFetching: false,
                error: ''
            };
        default:
            return state;
    }
}


export default reducer;