import React, { Component } from 'react';
import moment from 'moment';
import API from '../utils/API';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import AdminTimesheet from '../components/AdminTimesheet';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import WeekSelector from '../components/WeekSelector';
import Page from '../components/Page';

function momFormat(int) {
  return moment()
    .day(int)
    .format('ll')
    .toString();
}

const twoWeeks = 14;
const oneWeek = 7;
const zero = 0;

function sixDays(start) {
  return start + 6;
}

class AdminPage extends React.Component {
  state = {
    users: [],
    selectedEmployee: '',
    employeeID: 0,
    two_weeks_ago: momFormat(-twoWeeks) + ' - ' + momFormat(sixDays(-twoWeeks)),
    last_week: momFormat(-oneWeek) + ' - ' + momFormat(sixDays(-oneWeek)),
    this_week: momFormat(zero) + ' - ' + momFormat(sixDays(zero)),
    next_week: momFormat(oneWeek) + ' - ' + momFormat(sixDays(oneWeek)),
    following_week: momFormat(twoWeeks) + ' - ' + momFormat(sixDays(twoWeeks)),
    selectedTimesheet: '',
    start: '',
    end: '',
    userTimesheets: [],
    activities: [],
    timesheetID: 0,
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    console.log('inside get users');
    API.getUsers()
      .then(res => {
        this.setState({
          users: res.data,
          selectedEmployee: `${res.data[0].lastName}, ${res.data[0].firstName}`,
        });
        console.log(this.state.users);
        // this.loadUserTimeSheets(res.data[0].id);
      })

      .catch(err => console.log(err));
  };

  loadUserTimeSheets = (employeeID, start, end) => {
    API.getTimeSheetByUserIdAndStartAndEndDates(employeeID, start, end)
      .then(res => {
        this.setState({
          userTimesheets: res.data,
          timesheetID: res.data[0].id,
        });
        console.log(this.state.userTimesheets);
        console.log(this.state.timesheetID);
      })
      .catch(err => console.log(err));
  };

  loadActivites = timesheetID => {

    API.getActivitiesByTimesheetID(timesheetID).then(res => {
      this.setState({
        activities: res.data,
      });
      
    });
  
  };

  loadPhoto = () => {
    API.getUser(this.state.employeeID)
      .then(res => {
        this.setState({ userPhoto: res.data.photoUrl });
        return this.state.userPhoto;
      })
      .catch(err => console.log(err));
  };

  handleEmployeeChange = e => {
    const selectedIndex = e.target.options.selectedIndex;
    const id = e.target.options[selectedIndex].getAttribute('data-id');

    this.setState({
      selectedEmployee: e.target.value,
      employeeID: id,
    });
  };

  handleTimesheetChange = e => {
    this.setState({
      selectedTimesheet: e.target.value,
      start: e.target.value.split(' - ')[0],
      end: e.target.value.split(' - ')[1],
    });

    console.log('handle data change ', e.target.value);
    console.log(this.state.start);
  };

  handleSubmit = () => {
    let id = this.state.employeeID;
    let start = moment(this.state.start).format('YYYY-MM-DD');
    let end = moment(this.state.end).format('YYYY-MM-DD');
    let timesheetID = this.state.timesheetID;
    console.log(id, start, end);
    this.loadUserTimeSheets(id, start, end);
    this.loadActivites(timesheetID);
    let activities = this.state.activities
    activities.map(activity => {
      var diff = activity.startTime - activity.endTime
      var hoursWorked = {"hoursWorked": diff}
      activity = {...activity, ...hoursWorked};
      return activity
      
    })
    
 };

  render() {
    let users = this.state.users;
    let employeeID = this.state.employeeID;
    console.log(employeeID);

    return (
      <Page title="Administration">
        <FormGroup>
          <Label>Select Employee</Label>
          <Input
            type="select"
            name="select"
            onChange={this.handleEmployeeChange}
          >
            {users.map(user => (
              <option key={user.id} data-id={user.id}>
                {user.lastName},&nbsp;&nbsp;{user.firstName}
              </option>
            ))}
          </Input>
          <br />
          <FormGroup>
            
            <WeekSelector
              two_weeks_ago={this.state.two_weeks_ago}
              last_week={this.state.last_week}
              this_week={this.state.this_week}
              next_week={this.state.next_week}
              following_week={this.state.following_week}
              handleTimeSheetChange={this.handleTimesheetChange}
            />
          </FormGroup>
          <br/>
          <Button onClick={this.handleSubmit}>View timesheet</Button>
          <br/>
          <br></br>
          <AdminTimesheet
            employee={this.state.selectedEmployee}
            selectedTimesheet={this.state.selectedTimesheet}
            activities={this.state.activities}
          />
        </FormGroup>
      </Page>
    );
  }
}

export default AdminPage;

  {/* <Input type="select" onChange={this.handleTimesheetChange} name="select">
              {this.state.userTimesheets.map((timesheet, index) => <option key={index}
              value={`${timesheet.startDate},${timesheet.endDate}`}>
               {moment(timesheet.startDate).format('ll')} - {moment(timesheet.endDate).format('ll')}
              </option> )}
            </Input> */}