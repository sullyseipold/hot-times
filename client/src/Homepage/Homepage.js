import React from 'react';
import { withRouter } from 'react-router';

function Homepage(props) {
    console.log(props)
    const { authenticated } = props;
  
    const logout = () => {
      props.auth.logout();
      props.history.push('/');
    };
  
  
    if (authenticated) {
        const { name } = props.auth.getProfile();
        return (
          <div>
            <h1>Howdy! Glad to see you back, {name}.</h1>
            <button onClick={logout}>Log out</button>
          </div>
        );
      }
  
    return (
  
      <div>
        <h1>I don't know you. Please, log in.</h1>
        <button onClick={props.auth.login}>Log in</button>
      </div>
    );

  }
  
export default withRouter(Homepage);