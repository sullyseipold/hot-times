import React, { Component } from 'react';
import moment from 'moment';
import API from '../utils/API';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import AdminTimesheet from '../components/AdminTimesheet';
import { POINT_CONVERSION_COMPRESSED } from 'constants';




class AdminPage extends React.Component {
  state = {
    users: [],
    employee: "",
    employeeID: 0,
    two_weeks_ago: moment().day(-14).format("ll").toString() + "-" + moment().day(-8).format("ll").toString(),
    last_week: moment().day(-7).format("ll").toString() + "-" + moment().day(-1).format("ll").toString(),
    this_week: moment().day(0).format("ll").toString() + "-" + moment().day(6).format("ll").toString(),
    next_week: moment().day(7).format("ll").toString() + "-" + moment().day(13).format("ll").toString(),
    following_week: moment().day(14).format("ll").toString() + "-" + moment().day(20).format("ll").toString(),
    chosen_weeks: "",
    start: "",
    end:""
  };

  componentDidMount() {
    this.loadUsers();
    
  };

  loadUsers = () => {
    API.getUsers()
      .then(
        res => {
          this.setState({ users: res.data})   
          console.log(this.state.users)
        })
      .catch(err => console.log(err));
  };


  handleChange = (e) => {
    let options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      chosen_weeks: value
    });
    };

  chooseEmployee = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    this.setState({
      employee: e.target.value,
      employeeID: e.target.options[selectedIndex].getAttribute('id')
    })
  
  };

  handleSubmit = () => {
    let employeeID = this.state.employeeID;
    let str = this.state.chosen_weeks.toString();
    let formatStr= str.split("-");
    let startDate = moment(formatStr[0]).format('YYYY-MM-DD');
    console.log(startDate)

    API.getTimesheet(employeeID)
    .then(
      res => {   
        console.log(res.data)
      })
    .catch(err => console.log(err));

  };

  render() {
    let users = this.state.users;
   
    return(
    
    
      <FormGroup>
        <Label>Select Employee</Label>
        <Input type="select" name="select"  onClick={this.chooseEmployee}>
        {users.map((user) => (

           <option
           key={user.id}
           id={user.id}
           >
           {user.lastName},{user.firstName}
           </option>
        ))}
     </Input>
        <br></br>
      <Label for="exampleSelect">Select weeks</Label>
      <Input type="select" onChange={this.handleChange} name="select" multiple>
  
          <option value={this.state.two_weeks_ago}>{this.state.two_weeks_ago}</option>
          <option value={this.state.last_week}>{this.state.last_week}</option>
          <option value={this.state.this_week}>{this.state.this_week}</option>
          <option value={this.state.next_week}>{this.state.next_week}</option>
          <option value={this.state.following_week}>{this.state.following_week}</option>
  
            </Input>
            <br>
            </br>
        <Button onClick={this.handleSubmit}>View timesheet</Button>

        <AdminTimesheet
        employee={this.state.employee}>
        </AdminTimesheet>
          </FormGroup>
   
     
    );
  
  }
} 

export default AdminPage;
