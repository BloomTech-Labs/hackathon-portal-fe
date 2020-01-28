import {
   FETCH_START,
   FETCH_FAILURE,
   FETCH_HACKERS,
   FETCH_HACKATHON,
   FETCH_HACKATHONS,
   FETCH_USER,
   POSTHACKATHON_SUCCESS,
   POSTPROJECT_SUCCESS,
   EDITHACKATHON_SUCCESS,
   DELETEHACKATHON_SUCCESS,
   DELETE_USER,
   DELETE_USER_SUCCESS,
   DELETE_USER_FAIL
} from '../actions/actions';

const initialState = {
   singleHackathon: {},
   hackers: [],
   hackathons: [],
   projects: [],
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
            userInfo: action.payload,
            isFetch: false,
            error: ''
         };
      case DELETEHACKATHON_SUCCESS:
      case EDITHACKATHON_SUCCESS:
      case POSTPROJECT_SUCCESS:
      case POSTHACKATHON_SUCCESS:
      case DELETE_USER:
      case DELETE_USER_SUCCESS:
         return {
            ...state,
            isFetching: false,
            error: ''
         };
         
      case FETCH_HACKATHONS:
         return {
            ...state,
            hackathons: action.payload,
            isFetching: false,
            error: ''
         };
      case DELETE_USER_FAIL:
         return {
            ...state,
            error: action.payload
         };
      default:
         return state;
   }
};

export default reducer;
