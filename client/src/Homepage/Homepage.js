import React from 'react';
// import bgImage from '../assets/img/bg/background_1920-19.jpg';
import { Container, Button, Image, Row, Col } from 'react-bootstrap';
import Logo from '../assets/img/logo/logo_200.png';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import bn from '../utils/bemnames';
import './homepage.css';

function Homepage(props) {
  console.log(props);
  const { authenticated } = props;

  const logout = () => {
    props.auth.logout();
    props.history.push('/');
  };

  // const background = {
  //   backgroundImage: `url("${bgImage}")`,
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // };

  // const bem = bn.create('homepage');

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
      <Container className="op" fluid>
        <br />

        <h1>H 
          
        <Image
          src={Logo}
          width="40"
          height="30"
          className="pr-2"
          alt="HotTime Logo"
          rounded
        />
        tTime</h1>


        <br />
        <br/>
        <Button onClick={props.auth.login}>Log in</Button>
      </Container>
    </div>
  );
}

export default withRouter(Homepage);
