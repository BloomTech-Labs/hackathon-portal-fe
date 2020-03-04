import {
   FETCH_START,
   FETCH_FAILURE,
   FETCH_HACKERS,
   FETCH_HACKATHON,
   FETCH_HACKATHONS,
   FETCH_USER,
   POST_HACKATHON_SUCCESS,
   POST_PROJECT_SUCCESS,
   EDIT_HACKATHON_SUCCESS,
   DELETE_HACKATHON_SUCCESS,
   EDIT_PROJECT_SUCCESS,
   DELETE_USER,
   DELETE_USER_SUCCESS,
   DELETE_USER_FAIL,
   JOIN_PROJECT_SUCCESS,
   UPDATE_PROJECT_SUCCESS,
   ASSIGN_ROLE_SUCCESS
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
            isFetching: false,
            error: ''
         };
      case ASSIGN_ROLE_SUCCESS:
      case JOIN_PROJECT_SUCCESS:
      case UPDATE_PROJECT_SUCCESS:
      case DELETE_HACKATHON_SUCCESS:
      case EDIT_HACKATHON_SUCCESS:
      case POST_HACKATHON_SUCCESS:
         return {
            ...state,
            singleHackathon: action.payload,
            isFetching: false,
            error: ''
         }
      case POST_PROJECT_SUCCESS:
      case DELETE_USER:
      case DELETE_USER_SUCCESS:
         return {
            ...state,
            isFetching: false,
            error: ''
         };
      case EDIT_PROJECT_SUCCESS:
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
