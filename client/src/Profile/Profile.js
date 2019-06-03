import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.auth.profile,
    };
  }

  componentDidMount() {
    // this.setState( {user: this.props.auth.profile});
    console.log(this.state.user);
  }

  render() {
    console.log(this.props);
    console.log(this.props.auth);

    // var arr = ['https://example.com/roles'];
    // console.log(arr[0])

    const profile = this.props.auth.profile;
    var userRole = profile['https://example.com/roles'];

    const showRole = userRole[0];

    const firstName = profile.given_name;
    const lastName = profile.family_name;

    return (
      <div>
        <h1>Welcome back, {firstName} !</h1>

        <Row>
        <Col>  </Col>

        <Col>         <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={profile.picture} />
          <Card.Body>
            <Card.Title>
              {firstName} {lastName}
            </Card.Title>
            <Card.Text>Role: {showRole}</Card.Text>
            <Button variant="light">
              <Link to="/">Logout</Link>
            </Button>
            <br/>

            <Button variant="light">
              <Link to="/admin">View Employee's Timesheets</Link>
            </Button>
            <br/>
            <Button variant="light">
            <Link to="/modalpage">Add shift</Link>
            </Button>
            <br/>
          </Card.Body>
        </Card> </Col>

        <Col>  </Col>



        </Row>




      </div>
    );
  }
}

export default Profile;
