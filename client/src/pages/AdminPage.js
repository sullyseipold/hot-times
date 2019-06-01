import React, { Component } from 'react';
import moment from 'moment';
import API from '../utils/API';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import AdminTimesheet from '../components/AdminTimesheet';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import WeekSelector from '../components/WeekSelector';

function momFormat(int){
return moment().day(int).format('ll').toString();
};

const twoWeeks = 14;
const oneWeek = 7;
const zero = 0;



function sixDays(start){
  return (start + 6);
}

class AdminPage extends React.Component {
  state = {
    users: [],
    chosenEmployee: '',
    employeeID: 0,
    two_weeks_ago:

      momFormat(-twoWeeks) +
      ' - ' +
      momFormat(sixDays(-twoWeeks)),
    last_week:
      momFormat(-oneWeek)+
      ' - ' +
      momFormat(sixDays(-oneWeek)),
    this_week:
      momFormat(zero) +
      ' - ' +
      momFormat(sixDays(zero)),
    next_week:
      momFormat(oneWeek) +
      ' - ' +
      momFormat(sixDays(oneWeek)),
    following_week:
      momFormat(twoWeeks) +
      ' - ' +
      momFormat(sixDays(twoWeeks)),
    chosen_weeks: '',
    start: '',
    end: '',
  };

  componentDidMount() {
    this.loadUsers();
  }



  loadUsers = () => {
    API.getUsers()
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      })
      .catch(err => console.log(err));
  };

  loadPhoto = () => {
  API.getUser(this.state.employeeID).then(res => {
    this.setState({ userPhoto: res.data.photoUrl });
    return this.state.userPhoto;
  })
  .catch(err => console.log(err));
};


  handleChange = e => {
    let employ = e.target.value;
    let options = e.target.options;
    const selectedIndex = e.target.options.selectedIndex;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      employeeID: e.target.options[selectedIndex].getAttribute('id'),
      chosenEmployee: employ,

    });
    console.log(this.state.chosenEmployee);

    console.log(this.state.employeeID)
    this.loadPhoto();
  };

  handleDateChange = e => {
    let options = e.target.value;
    this.setState({
      chosen_weeks: options,
    });
  };


  handleSubmit = () => {
    let employeeID = this.state.employeeID;
    let str = this.state.chosen_weeks.toString();
    let formatStr = str.split('-');
    let startDate = moment(formatStr[0]).format('YYYY-MM-DD');
    console.log(startDate, employeeID);
  };

  render() {
    let users = this.state.users;
    let employeeID = this.state.employeeID;
    console.log(employeeID);


    return (
      <FormGroup>
        <Label>Select Employee</Label>
        <Input type="select" name="select" onChange={this.handleChange} >
          {users.map(user => (
            <option key={user.id} id={user.id}>
              {user.lastName},{user.firstName}
            </option>
                      ))}

      </Input>
      {/* {users.map(user => (

      <img src={user.photoUrl} />
      ))} */}

        <br />
      <WeekSelector
      two_weeks_ago = { this.state.two_weeks_ago }
      last_week = { this.state.last_week }
      this_week = { this.state.this_week } 
      next_week = { this.state.next_week }
      following_week = { this.state.following_week }
      handleDateChange = { this.handleDateChange }
      />
        <br />
        <Button onClick={this.handleSubmit}>View timesheet</Button>

        <AdminTimesheet
          employee={this.state.chosenEmployee}
          chosen_weeks={this.state.chosen_weeks}

        />
      </FormGroup>
    );
  }
}

export default AdminPage;
