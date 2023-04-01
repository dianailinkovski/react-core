import axios from "axios";
import { GET_ORDER_USER,GET_ORDER_LOCATION,ORDER_UPDATE,RESET_UPDATE_STATUS } from "./types";
import { Constants } from "../../constants/environment";
import Auth from '../../cookie/Auth.js';

export const getOrderByUser = () => dispatch => {   
  let config = {
    headers: {
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }  
  axios
    .get(
      Constants.BASE_URL +
        'api/orders/user/'+Auth.getToken('userId'),config
    )
    .then(result =>{   
        return dispatch({
          type: GET_ORDER_USER,
          payload: result.data        
        })
    }
      
    );
};

export const getOrderByLocation = () => dispatch => { 
  console.log(Auth.getToken('token'));
  let config = {
    headers: {
      Authorization: "Bearer "+Auth.getToken('token'),
    }
  }  
  axios
    .get(
      Constants.BASE_URL +
        'api/orders/location/'+Auth.getToken('locationId'),config
    )
    .then(result =>{      
        return dispatch({
          type: GET_ORDER_LOCATION,
          payload: result.data        
        })
    }
      
    );
};

export const orderUpdate = postData => dispatch => {  
  axios
    .put(Constants.BASE_URL + 'api/orders/'+postData.id, postData, {
      headers: {
        //"content-type": "application/json",
        Authorization: "Bearer "+Auth.getToken('token'),
      }
    })
    .then(result =>{     
      return dispatch({
        type: ORDER_UPDATE,
        payload: result
      })
    }
      
    )
    .catch(function(error) {
      console.log("ERROR", error);
    });
};

export const resetUpdatedOrder = ()=> dispatch => {
    
      return dispatch({
        type: RESET_UPDATE_STATUS,
        payload: []
      })
   
};
