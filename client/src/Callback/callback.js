import React from 'react';
import { withRouter } from 'react-router';

function Callback(props) {
  // const {authenticated} = props;


  props.auth.handleAuthentication().then(() => {
    
    props.auth.getProfile();
    props.history.push('/admin');

  });

  return (
    <div>
      Loading user profile.
    </div>
  );
}

export default withRouter(Callback);