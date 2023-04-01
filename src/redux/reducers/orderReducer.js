import { GET_ORDER_USER,GET_ORDER_LOCATION,ORDER_UPDATE,RESET_UPDATE_STATUS } from "../actions/types";

const initialState = {
  orders: [], 
  updatedOrder:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_USER:      
      return {
        ...state,
        orders: action.payload
      };   
      case GET_ORDER_LOCATION:      
      return {
        ...state,
        orders: action.payload
      };   
      case ORDER_UPDATE:      
      return {
        ...state,
        updatedOrder: action.payload
      };   
      case RESET_UPDATE_STATUS:      
      return {
        ...state,
        updatedOrder: action.payload
      };  
      
    default:
      return state;
  }
}
