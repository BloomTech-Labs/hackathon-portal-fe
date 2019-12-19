import axios from "axios";
import { FETCH_START, FETCH_HACKATHON } from '../actions/index';

const initialState = {
    singleHackathon: [],
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
        case FETCH_HACKATHON:
            return{
                ...state,
                singleHackathon: {
                    ...state.singleHackathon,
                    description: action.payload.description
                },
                isFetching: false,
                error: ''
            };
        default:
            return state;
    }
}


export default reducer;