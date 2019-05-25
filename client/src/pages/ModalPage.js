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
  UncontrolledButtonDropdown,
} from 'reactstrap';

class ModalPage extends React.Component {
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_timesheet:  false,
    backdrop: true,
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

  render() {
    return (
      <Page title="Timesheets">
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="exampleSelect">Select a Pay Period</Label>
                  <Input type="select" name="select">
                    <option>May 26, 2019</option>
                    <option>June 2, 2019</option>
                    <option>June 9, 2019</option>
                    <option>June 16, 2019</option>
                    <option>June 23, 2019</option>
                    <option>June 30, 2019</option>
                    <option>July 7, 2019</option>
                    <option>July 14, 2019</option>
                    <option>July 21, 2019</option>
                    <option>July 28, 2019</option>

                  </Input>
                </FormGroup>
                <Button color="secondary" onClick={this.toggle('nested_parent')}>
                  Enter Time
                </Button>{' '}
                <Button color="primary" onClick={this.toggle('nested_parent')}>
                  Timesheet        
                </Button>
                <Modal
                  isOpen={this.state.modal_nested_parent}
                  toggle={this.toggle('nested_parent')}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle('nested_parent')}>
                    Enter Time Worked
                  </ModalHeader>
                  <ModalBody>
                    <Card>
                      {/* <CardHeader>Start and End Dates</CardHeader> */}
                      <CardBody>
                        <FormGroup>
                          <Label for="exampleDate">Start Date</Label>
                          <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleTime">Start Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleDate">End Date</Label>
                          <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleTime">End Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                        <Form>
                          <FormGroup>
                            <Label for="exampleSelect">Select Hour Type</Label>
                            <Input type="select" name="select">
                              <option>Regular Hours</option>
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
                    <Modal
                      isOpen={this.state.modal_nested}
                      toggle={this.toggle('nested')}>
                      <ModalHeader>Select Start and End Time</ModalHeader>
                      <ModalBody>

                        <FormGroup>
                          <Label for="exampleTime">Start Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleTime">End Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle('nested')}>
                          Done
                        </Button>{' '}
                        <Button
                          color="secondary"
                          onClick={this.toggle('nested_parent')}>
                          All Done
                        </Button>
                      </ModalFooter>
                    </Modal>

                    <Modal
                      isOpen={this.state.modal_nested}
                      toggle={this.toggle('nested')}>
                      <ModalHeader>Select Start and End Time</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <Label for="exampleTime">Start Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleTime">End Time</Label>
                          <Input
                            type="time"
                            name="time"
                            id="exampleTime"
                            placeholder="time placeholder"
                          />
                        </FormGroup>
                      </ModalBody>


                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle('nested')}>
                          Done
                        </Button>{' '}
                        <Button
                          color="secondary"
                          onClick={this.toggle('nested_parent')}>
                          All Done
                        </Button>
                      </ModalFooter>
                    </Modal>
                    
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={this.toggle('nested_parent')}>
                      Save Time Entry
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={this.toggle('nested_parent')}>
                      Cancel
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
