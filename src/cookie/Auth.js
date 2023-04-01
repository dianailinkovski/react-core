class Auth {

  /**
   * Authenticate a user. Save a token string in Cookie
   *
   * @param {string} token
   */
  static authenticateUser(cname,cvalue) {
    console.log('shfsdfa auth. js',cname,cvalue)
    var d = new Date();
    var exdays=3;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
  }  

  /**
   * Deauthenticate a user. Remove a token from Cookie
   *
   */
  static deauthenticateUser() {   
    this.authenticateUser('token','');
    this.authenticateUser('userId','');
    this.authenticateUser('locationId','');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";    
  }

}

export default Auth;
