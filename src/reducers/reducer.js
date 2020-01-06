import {
   FETCH_START,
   FETCH_FAILURE,
   FETCH_HACKERS,
   FETCH_HACKATHON,
   FETCH_USER,
   POSTHACKATHON_SUCCESS
} from '../actions/actions';

const initialState = {
   singleHackathon: [],
   hackers: [],
   userInfo: [],
   isFetching: false,
   error: ''
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_START:
         return {
            isFetching: true,
            error: ''
         };
      case FETCH_FAILURE:
         return {
            isFetching: false,
            error: action.payload
         };
      case FETCH_HACKATHON:
         return {
            ...state,
            singleHackathon: action.payload,
            isFetching: false,
            error: ''
         };
      case FETCH_HACKERS:
         return {
            ...state,
            hackers: action.payload,
            isFetching: false,
            error: ''
         };
      case FETCH_USER:
         return {
            ...state,
            user: action.payload,
            isFetch: false,
            error: ''
         };
      case POSTHACKATHON_SUCCESS:
         return {
            ...state,
            isFetching: false,
            error: ''
         };
      default:
         return state;
   }
};

export default reducer;
