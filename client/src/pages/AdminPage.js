import React from 'react';
import moment from 'moment';
import API from '../utils/API';
import { Button, FormGroup, Label, Input, Card, CardHeader, CardBody } from 'reactstrap';
import AdminTimesheet from '../components/AdminTimesheet';
import Page from '../components/Page';
import WeekSelector from '../components/WeekSelector';
import { saveAs } from 'file-saver';


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



const payPeriodDates = [
  {
    text: moment().day(-14).format("ll").toString() + " - " + moment().day(-8).format("ll").toString(),
    value: moment().day(-14).format("YYYY-MM-DD").toString() + "," + moment().day(-8).format("YYYY-MM-DD").toString()
  },
  {
    text: moment().day(-7).format("ll").toString() + " - " + moment().day(-1).format("ll").toString(),
    value: moment().day(-7).format("YYYY-MM-DD").toString() + "," + moment().day(-1).format("YYYY-MM-DD").toString()
  },
  {
    text: moment().day(0).format("ll").toString() + " - " + moment().day(6).format("ll").toString(),
    value: moment().day(0).format("YYYY-MM-DD").toString() + "," + moment().day(6).format("YYYY-MM-DD").toString()
  },
  {
    text: moment().day(7).format("ll").toString() + " - " + moment().day(13).format("ll").toString(),
    value: moment().day(7).format("YYYY-MM-DD").toString() + "," + moment().day(13).format("YYYY-MM-DD").toString()
  },
  {
    text: moment().day(14).format("ll").toString() + " - " + moment().day(20).format("ll").toString(),
    value: moment().day(14).format("YYYY-MM-DD").toString() + "," + moment().day(20).format("YYYY-MM-DD").toString()
  }
];

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
    selectedPayPeriod:  payPeriodDates[0].value,
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
      employeeID: id
    });

    this.loadUserTimeSheets(id);
  }

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
  handlePayPeriodChangeChange = e => {
    this.setState({
      selectedPayPeriod: e.target.value,
    });

    console.log('handle pay period change ', e.target.value);
  };

  handleGetReport = () => {
    console.log('handle get report');
    let startDate = this.state.selectedPayPeriod.split(',')[0];
    let endDate = this.state.selectedPayPeriod.split(',')[1];

    console.log('get report start date = ', startDate);
    console.log('get report end date = ', endDate);


    API.getPayPeriodReport(startDate, endDate)
      .then(res => {
        var byteCharacters = atob(res.data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, `report_${startDate}_${endDate}`);
      })
  };

  render() {
    let users = this.state.users;
    let employeeID = this.state.employeeID;
    console.log(employeeID);

    return (
      <Page title="Administration">
        <Card>
          <CardHeader>Generate Pay Period Report</CardHeader>
          <CardBody>
            <FormGroup>
              <Label for="exampleSelect">Select A Pay Period</Label>
              <Input type="select" onChange={this.handlePayPeriodChangeChange} name="select">
                {payPeriodDates.map((payPeriod, index) => <option key={index}
                  value={payPeriod.value}>
                  {payPeriod.text}
                </option>)}
              </Input>
            </FormGroup>
            <br />
            <Button color="danger" onClick={this.handleGetReport}>
              Get Pay Period Report
                </Button>
          </CardBody>
        </Card>
        <br /><br />
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
