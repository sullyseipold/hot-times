import Page from 'components/Page';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import moment from 'moment';

// import moment from "moment";
// import "rc-time-picker/assets/index.css";
// import InputMoment from "../../components/InputMoment/InputMoment";
import API from '../utils/API';

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
    two_weeks_ago: moment().day(-14).format("ll").toString() + "-" + moment().day(-8).format("ll").toString(),
    last_week: moment().day(-7).format("ll").toString() + "-" + moment().day(-1).format("ll").toString(),
    this_week: moment().day(0).format("ll").toString() + "-" + moment().day(6).format("ll").toString(),
    next_week: moment().day(7).format("ll").toString() + "-" + moment().day(13).format("ll").toString(),
    following_week: moment().day(14).format("ll").toString() + "-" + moment().day(20).format("ll").toString(),
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

  handleStartTimeChange = e => {
    this.setState({ startTime: e.target.value });
  };

  handleEndTimeChange = e => {
    this.setState({ endTime: e.target.value });
  };

  handleStartDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = e => {
    this.setState({ endDate: e.target.value });
  };

  handleHourTypeChange = e => {
    this.setState({ hourType: e.target.value });
  };

  handleClick = () => {
    console.log(this.state);
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;

    var startTime = this.state.startTime;
    var endTime = this.state.endTime;
    var startDateTime = startDate + ' ' + startTime;

    var endDateTime = endDate + ' ' + endTime;

    console.log({
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      activityType: this.state.hourType,
    });
    API.saveActivity({
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    });
  };

  render() {
    return (
      <Page title="Timesheets">
        
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader />
              <CardBody>
                <FormGroup>
          
                  <Label for="payPeriod">Select a Pay Period</Label>
                  <Input
                    type="select"
                    name="payPeriod"
                    onChange={this.handlePayPeriodChange}
                  >
                    <option>{this.state.two_weeks_ago}</option>
                      <option>{this.state.last_week}</option>
                      <option>{this.state.this_week}</option>
                      <option>{this.state.next_week}</option>
                      <option>{this.state.following_week}</option>
                  </Input>
                </FormGroup>
                <Button
                  color="secondary"
                  onClick={this.toggle('nested_parent')}
                >
                  Add Shift
                </Button>{' '}
                <Button color="primary" onClick={this.toggle('timesheet')}>
                  View Timesheet
                </Button>
                <Modal
                  isOpen={this.state.modal_nested_parent}
                  toggle={this.toggle('nested_parent')}
                  className={this.props.className}
                >
                  <ModalHeader toggle={this.toggle('nested_parent')}>
                    Enter Time Worked
                  </ModalHeader>

                  <ModalBody>
                    <Card>
                      {/* <CardHeader>Start and End Dates</CardHeader> */}
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
                    {/* <Button color="success" onClick={this.toggle('nested')}>
                      Enter Start and End Time
                    </Button> */}
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
