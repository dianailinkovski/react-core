import axios from "axios";
import { LOG_IN, LOG_OUT,GET_ME } from "./types";
import { Constants } from "../../constants/environment";
import Auth from '../../cookie/Auth.js';
export const loginAction = (userData) => dispatch => {  
  axios
    .post(
      Constants.BASE_URL +
        'auth/local?email='+userData.email+'&password='+userData.password
    )
    .then(result =>{     
      if(result.status==200){
        const {data}=result;
        Auth.authenticateUser('token',data.token);
        return dispatch({
          type: LOG_IN,
          payload: data.token          
        })         
      }
      else{
        return dispatch({
          type: LOG_IN,
          payload: "failed"       
        })
      }
    }    
     
    ).catch(function(error) {
      console.log("ERROR", error);
      return dispatch({
        type: LOG_IN,
        payload: "failed"                
      })
    });
};

export const getMeAction = (token) => dispatch => {
 
  let config = {
    headers: {
      Authorization: "Bearer "+token,
    }
  }  
  axios
    .get(
      Constants.BASE_URL +
        'api/users/me',config
    )
    .then(result =>{ 
     
      const {data}=result;
      Auth.authenticateUser('userId',data._id);
      Auth.authenticateUser('locationId',data.locationInfo.locationId);
      Auth.authenticateUser('taxinfo',data.taxInfo.taxRate);
      var rewards=0;
      data.loyaltyPoints.map(item=>{
        rewards+=parseInt(item);
      })
      data.earnedPoints.map(item=>{
        rewards+=parseInt(item);
      })
      Auth.authenticateUser('rewards',rewards);
      
      return dispatch({
        type: GET_ME,
        payload: data               
      })
    
    } 
    ).catch(function(error) {
      console.log("ERROR", error);
      return dispatch({
        type: GET_ME,
        payload: {}          
      })
    });
};

/**
export const setCookie=(cname,cvalue)=> {  
  var d = new Date();
  var exdays=3;
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";   
}
 */
export const logoutAction=(cname,cvalue)=> dispatch => {  
  Auth.deauthenticateUser();
  return dispatch({
    type: LOG_OUT,
    payload: ""          
  }) 
}

/**
export const getCookie=(cname)=>dispatch=>{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {     
      return  c.substring(name.length, c.length) ;
    }
  }
  return ''
}
 */


