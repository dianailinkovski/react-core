import { LOG_IN, LOG_OUT,GET_ME } from "../actions/types";

const initialState = {
  user: {},
  token:''
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload        
      };
    case LOG_OUT:   
      return {
        ...state,
        user: '',token:''
      };
     case GET_ME:       
      return {
        ...state,
        user: action.payload,
      };   
    default:
      return state;
  }
}