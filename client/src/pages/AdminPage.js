import React, { Component } from 'react';
import moment from 'moment';
import API from '../utils/API';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import AdminTimesheet from '../components/AdminTimesheet';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import WeekSelector from '../components/WeekSelector';

class AdminPage extends React.Component {
  state = {
    users: [],
    chosenEmployee: '',
    employeeID: 0,
    two_weeks_ago:
      moment()
        .day(-14)
        .format('ll')
        .toString() +
      ' - ' +
      moment()
        .day(-8)
        .format('ll')
        .toString(),
    last_week:
      moment()
        .day(-7)
        .format('ll')
        .toString() +
      ' - ' +
      moment()
        .day(-1)
        .format('ll')
        .toString(),
    this_week:
      moment()
        .day(0)
        .format('ll')
        .toString() +
      ' - ' +
      moment()
        .day(6)
        .format('ll')
        .toString(),
    next_week:
      moment()
        .day(7)
        .format('ll')
        .toString() +
      ' - ' +
      moment()
        .day(13)
        .format('ll')
        .toString(),
    following_week:
      moment()
        .day(14)
        .format('ll')
        .toString() +
      ' - ' +
      moment()
        .day(20)
        .format('ll')
        .toString(),
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
