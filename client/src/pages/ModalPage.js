import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
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
// import "rc-time-picker/assets/index.css";
// import InputMoment from "../../components/InputMoment/InputMoment";
import API from '../utils/API';
import WeekSelector from '../components/WeekSelector';
import { verify } from 'crypto';


// function convertDate(date) {
//     return moment(date).format("YYYY-MM-DD HH:mm:ss");
// };

class ModalPage extends React.Component {
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_timesheet: false,
    backdrop: true,
    two_weeks_ago:
      moment()
        .day(-14)
        .format('ll')
        .toString() +
      ' - '  +
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
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    chosen_weeks: '',
    sheetEndDate: '',
    sheetStartDate:''
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

//verify that a time range is picked. Placeholder is value of first option,
//!options does not disable a submit yet

  checkValue = e => {
    let options = e.target.value;
    console.log(options)
    if (options === "placeholder" || !options  ) {
      alert("please select a date range")
    } 
  };

// Start Time 
  handleStartTimeChange = e => {
    this.setState({ startTime: e.target.value });
  };

//End Time
  handleEndTimeChange = e => {
    this.setState({ endTime: e.target.value });
  };

//Start Date
  handleStartDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

//End Date
  handleEndDateChange = e => {
    this.setState({ endDate: e.target.value });
  };

//Hour type (activity type)
  handleHourTypeChange = e => {
    this.setState({ hourType: e.target.value });
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
  handlePayPeriodChange = e => {
    let options = e.target.value;
    let formatStr = options.split('-');
    let sheetStartDate = moment(formatStr[0]).format('YYYY-MM-DD');
    let sheetEndDate = moment(formatStr[1]).format('YYYY-MM-DD');

    this.setState({
      chosen_weeks: options,
      sheetEndDate: sheetEndDate,
      sheetStartDate: sheetStartDate
    });
    
  };

  
//Save to database
  handleClick = () => {
  
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;
    var startTime = this.state.startTime;
    var endTime = this.state.endTime;
    var startDateTime = startDate + ' ' + startTime;
    var endDateTime = endDate + ' ' + endTime;

    //input validation for time entry

    if (moment(startDate).isBetween(this.state.sheetStartDate, this.state.sheetEndDate) && 
    moment(endDate).isBetween(this.state.sheetStartDate, this.state.sheetEndDate) && 
    (moment(startDate).isBefore(endDate)))
    {
      API.saveActivity({
        startDateTime: startDateTime,
        endDateTime: endDateTime,
      });

    } else {
      alert(`please choose a date between ${this.state.chosen_weeks}, and make sure start date is before end date`);
    }
   
  };



  render() {
    return (
      <Page title="(ModalPage)Timesheets">
        
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader />
              <CardBody>
                <WeekSelector
                two_weeks_ago = { this.state.two_weeks_ago }
                last_week = { this.state.last_week }
                this_week = { this.state.this_week } 
                next_week = { this.state.next_week }
                following_week = { this.state.following_week }
                handleDateChange = { this.handlePayPeriodChange }/>
                <Button
                  color="dark"
                  onClick={this.toggle('nested_parent')}
                  onSubmit={this.checkValue}
                >
                  Add Shift
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
                            name="startDate"
                            placeholder="Start Date"
                            defaultValue={new Date()}
                            onChange={this.handleStartDateChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="startTime">Start Time</Label>
                          <Input
                            type="time"
                            name="startTime"
                            placeholder="Start Time"
                            onChange={this.handleStartTimeChange}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label for="endDate">End Date</Label>
                          <Input
                            type="date"
                            name="endDate"
                            placeholder="End Date"
                            onChange={this.handleEndDateChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="endTime">End Time</Label>
                          <Input
                            type="time"
                            name="endTime"
                            placeholder="End Time"
                            onChange={this.handleEndTimeChange}
                          />
                        </FormGroup>

                        <Form>
                          <FormGroup>
                            <Label for="hourType">Select Hour Type</Label>
                            <Input
                              type="select"
                              name="hourType"
                              onChange={this.handleHourTypeChange}
                            >
                              <option type="text" name="Regular Hours">
                                Regular Hours
                              </option>
                              <option>Overnight Duty</option>
                              <option>Detail</option>
                              <option>OT</option>
                              <option>Other</option>
                              <option>Sick Hours Used </option>
                              <option>Comp Hours Earned</option>
                              <option>Holiday Hours</option>
                              <option>Vacation Hours Used</option>
                              <option>Comp Hours Used</option>
                            </Input>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                    <br />
                   
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.handleClick}>
                      Save Time Entry
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={this.toggle('nested_parent')}
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
