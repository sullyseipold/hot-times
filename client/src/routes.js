import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './pages/loginAuth0';
import Home from './home/home';
import Profile from './Profile/profile';
import Ping from './Ping/Ping';
import Admin from './Admin/Admin';
import Callback from './Callback/callback';
import Auth from './Auth/auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/ping" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Ping auth={auth} {...props} />
            )
          )} />
          <Route path="/admin" render={(props) => (
            !auth.isAuthenticated() || !auth.userHasScopes(['write:messages']) ? (
              <Redirect to="/home"/>
            ) : (
              <Admin auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
  );
}
