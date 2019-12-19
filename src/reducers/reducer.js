import axios from "axios";
import { FETCH_START } from '../actions/index';

const initialState = {
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
        default:
            return state;
    }
}


export default reducer;