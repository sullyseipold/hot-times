import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

import moment from "moment";
import API from '../utils/API';
import WeekSelector from '../components/WeekSelector';
import ActivitySelector from '../components/ActivitySelector';

const timesheetDates = {
  two_weeks_ago: {
    text: moment().day(-14).format("ll").toString() + " - " + moment().day(-8).format("ll").toString(),
    value: moment().day(-14).format("YYYY-MM-DD").toString() + "," + moment().day(-8).format("YYYY-MM-DD").toString()
  },
  last_week: {
    text: moment().day(-7).format("ll").toString() + " - " + moment().day(-1).format("ll").toString(),
    value: moment().day(-7).format("YYYY-MM-DD").toString() + "," + moment().day(-1).format("YYYY-MM-DD").toString()
  },
  this_week: {
    text: moment().day(0).format("ll").toString() + " - " + moment().day(6).format("ll").toString(),
    value: moment().day(0).format("YYYY-MM-DD").toString() + "," + moment().day(6).format("YYYY-MM-DD").toString()
  },
  next_week: {
    text: moment().day(7).format("ll").toString() + " - " + moment().day(13).format("ll").toString(),
    value: moment().day(7).format("YYYY-MM-DD").toString() + "," + moment().day(13).format("YYYY-MM-DD").toString()
  },
  following_week: {
    text: moment().day(14).format("ll").toString() + " - " + moment().day(20).format("ll").toString(),
    value: moment().day(14).format("YYYY-MM-DD").toString() + "," + moment().day(20).format("YYYY-MM-DD").toString()
  },
};

const activityTypes = [
  {
    text: 'Regular Hours',
    value: 'regular'
  },
  {
    text: 'Overnight Duty',
    value: 'overnight'
  },
  {
    text: 'Detail',
    value: 'detail'
  },
  {
    text: 'Overtime',
    value: 'overtime'
  },
  {
    text: 'Other',
    value: 'other'
  },
  {
    text: 'Sick Hours Used',
    value: 'sick'
  },
  {
    text: 'Holiday Hours Used',
    value: 'holiday'
  },
  {
    text: 'Vacation Hours Used',
    value: 'vacation'
  },
  {
    text: 'Comp Hours Used',
    value: 'comp'
  }
]

class ModalPage extends React.Component {
  state = {
    userId: 1,
    currentTimesheetId: '',
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_timesheet: false,
    backdrop: true,
    activityTypes: activityTypes,
    two_weeks_ago: timesheetDates.two_weeks_ago.text,
    last_week: timesheetDates.last_week.text,
    this_week: timesheetDates.this_week.text,
    next_week: timesheetDates.next_week.text,
    following_week: timesheetDates.following_week.text,
    activityStartDate: '',
    activityEndDate: '',
    activityStartTime: '',
    activityEndTime: '',
    activityType: activityTypes[0].value,
    chosen_weeks: timesheetDates.this_week.text,
    sheetEndDate: timesheetDates.this_week.value.split(',')[1],
    sheetStartDate: timesheetDates.this_week.value.split(',')[0]
  };


  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  // Start Time 
  toggleModal = type => {
    if (!type) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${type}`]: !this.state[`modal_${type}`],
    });
  }

  handleStartTimeChange = e => {
    this.setState({ activityStartTime: e.target.value });
    console.log('start time = ', e.target.value);
  };

  //End Time
  handleEndTimeChange = e => {
    this.setState({ activityEndTime: e.target.value });
    console.log('end time = ', e.target.value);

  };

  //Start Date
  handleStartDateChange = e => {
    this.setState({ activityStartDate: e.target.value });
    console.log('handleStartDateChange', this.state.activityStartDate);
    console.log('handleStartTime activity type = ', this.state.activityType);

  };

  //End Date
  handleEndDateChange = e => {
    this.setState({ activityEndDate: e.target.value });
    console.log('handleEndDateChange', this.state.activityEndDate);

  };

  //Hour type (activity type)
  handleActivityChange = e => {
    this.setState({ activityType: e.target.value });
    console.log('handleActivityChange', this.state.activityType);

  };

  //Timesheet Dates
  handleDateChange = e => {
    let options = e.target.value;
    this.setState({
      chosen_weeks: options,
    });
    console.log(options)
  };

  //Set time period and parse Start and End date of time period
  handleTimeSheetChange = e => {
    let options = e.target.value;
    let formatStr = options.split('-');
    let sheetStartDate = moment(formatStr[0]).format('YYYY-MM-DD');
    let sheetEndDate = moment(formatStr[1]).format('YYYY-MM-DD');
    console.log('handleTimeSheetChange = ', e.target.value);
    console.log('sheetStartDate = ', sheetStartDate);
    console.log('sheetEndDate = ', sheetEndDate);

    this.setState({
      chosen_weeks: options,
      sheetEndDate: sheetEndDate,
      sheetStartDate: sheetStartDate
    });

  };

  handleAddTimeClick = type => {
    console.log('handleAddTimeClick');
    console.log('handleAddTimeClick state.sheetStartDate = ', this.state.sheetStartDate);
    console.log('handleAddTimeClick state.sheetEndDate = ', this.state.sheetEndDate);

    API.getTimeSheetByUserIdAndStartAndEndDates(this.state.userId, this.state.sheetStartDate, this.state.sheetEndDate)
      .then(response => {
        console.log('get timesheet response.data = ', response.data);
        if (!response.data.length) {
          this.createTimesheet();
        }
        else {
          this.setState({
            currentTimesheetId: response.data[0].id
          });
          console.log('get timesheet id = ', this.state.currentTimesheetId);
        }
      });

    this.toggleModal(type);
  }

  createTimesheet = () => {
    API.createTimesheet({
      UserId: this.state.userId,
      startDate: this.state.sheetStartDate,
      endDate: this.state.sheetEndDate
    })
      .then(response => {
        console.log('createTimesheet response = ', response);
        this.setState({
          currentTimesheetId: response.data.id
        });
        console.log('create timesheet id = ', this.state.currentTimesheetId);
      });
  }


  //Save to database
  handleSaveTimeClick = type => {

    var startDate = this.state.activityStartDate;
    var endDate = this.state.activityEndDate;
    var startTime = this.state.activityStartTime;
    var endTime = this.state.activityEndTime;

    //input validation for time entry
    if (moment(startDate).isBetween(this.state.sheetStartDate, this.state.sheetEndDate, null, '[]') &&
      moment(endDate).isBetween(this.state.sheetStartDate, this.state.sheetEndDate, null, '[]') &&
      (moment(startDate).isSameOrBefore(endDate))) {
      API.saveActivity({
        TimesheetId: this.state.currentTimesheetId,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        activityType: this.state.activityType
      });
      this.toggleModal(type);

    } else {
      alert(`please choose a date between ${this.state.chosen_weeks}, and make sure start date is before end date`);
    }
  };



  render() {
    return (
      <Page title="Timesheets">

        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader />
              <CardBody>
                <WeekSelector
                  two_weeks_ago={this.two_weeks_ago}
                  last_week={this.state.last_week}
                  this_week={this.state.this_week}
                  next_week={this.state.next_week}
                  following_week={this.state.following_week}
                  handleTimeSheetChange={this.handleTimeSheetChange} />
                <Button
                  color="dark"
                  onClick={() => this.handleAddTimeClick('nested_parent')}
                >
                  Add Time
                </Button>{' '}
                <Button color="danger" onClick={this.toggle('timesheet')}>
                  View Timesheet
                </Button>
                <Modal
                  isOpen={this.state.modal_nested_parent}
                  toggle={this.toggle('nested_parent')}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle('nested_parent')}>
                    Enter Time Worked from {this.state.chosen_weeks}
                  </ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <FormGroup>
                          <Label for="startDate">Start Date</Label>
                          <Input
                            type="date"
                            name="date"
                            placeholder="date placeholder"
                            defaultValue={new Date()}
                            onChange={this.handleStartDateChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="startTime">Start Time</Label>
                          <Input
                            type="time"
                            name="time"
                            placeholder="time placeholder"
                            onChange={this.handleStartTimeChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="endDate">End Date</Label>
                          <Input
                            type="date"
                            name="date"
                            placeholder="date placeholder"
                            onChange={this.handleEndDateChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="endTime">End Time</Label>
                          <Input
                            type="time"
                            name="time"
                            placeholder="time placeholder"
                            onChange={this.handleEndTimeChange}
                          />
                        </FormGroup>
                        <ActivitySelector
                          activityTypes={this.state.activityTypes}
                          handleActivityChange={this.handleActivityChange}
                        />
                      </CardBody>
                    </Card>
                    <br />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={() => this.handleSaveTimeClick('nested_parent')}>
                      Save Time Entry
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={() => this.toggleModal('nested_parent')}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                <Modal
                  isOpen={this.state.modal_timesheet}
                  toggle={this.toggle('timesheet')}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle('timesheet')}>
                    Enter Time Worked
                  </ModalHeader>
                  <ModalBody>
                    <Card>
                      <CardBody>
                        <Row>
                          <Col>
                            <Card className="mb-3">
                              <CardHeader>Worthy's Timesheet</CardHeader>
                              <CardBody>
                                <Table bordered responsive>
                                  <thead>
                                    <tr>
                                      <th>Day</th>
                                      <th>Actual</th>
                                      <th>Regular</th>
                                      <th>Detail</th>
                                      <th>Holiday</th>
                                      <th>OT</th>
                                      <th>Overnight</th>
                                      <th>Sick</th>
                                      <th>Vacation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th scope="row">Sunday</th>
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Monday</th>
                                      <td />
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Tuesday</th>
                                      <td />
                                      <td />
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Wednesday</th>
                                      <td />
                                      <td />
                                      <td />
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Thursday</th>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Friday</th>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td>9:00am - 5:00pm</td>
                                      <td />
                                      <td />
                                    </tr>
                                    <tr>
                                      <th scope="row">Saturday</th>
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td />
                                      <td>9:00am - 12:00pm</td>
                                      <td>12:00pm - 5:00pm</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.toggle('timesheet')}>
                      Edit
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={this.toggle('timesheet')}
                    >
                      Done
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default ModalPage;
