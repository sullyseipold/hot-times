import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import API from '../utils/API';
import React from 'react';

// import Profile from '../pages/ProfilePage';

export default class Auth extends React.Component {

  constructor(props) {
    super(props);
      this.auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: AUTH_CONFIG.apiUrl,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    // this.state = {
    //   profile: this.getProfile.bind(this)
    // }
    // this.changeName = this.changeName.bind(this);

  }

  getProfile() {
    console.log("Profile object from getProfile() in auth.js:", this.profile);
    console.log("auth.js state", this.state);
    // this.setState({profile: this.profile});
    return this.profile;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    })
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  login() {
    this.auth0.authorize();
    console.log(this);
  }

  logout() {
    // clear id token and expiration
    this.idToken = null;
    this.expiresAt = null;
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 100000 + new Date().getTime();
    console.log("Session object from auth.js:", this);
    console.log("Profile object from setSession(authResult) in auth.js:", this.profile);
    console.log(authResult);
    // console.log(result);
    var User = {
      firstName: this.profile.given_name,
      lastName: this.profile.family_name,
      // role: this.profile["example.com"],
      photoUrl: this.profile.picture
    }

    console.log(User);
    API.saveUser(User);

  }
}
