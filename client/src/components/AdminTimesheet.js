import React, { Component }  from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Table,
    Row,
  } from 'reactstrap';

  class AdminTimesheet extends React.Component {
    render() {
       
        const {
         employee,
         chosen_weeks
          } = this.props;

      return (
          <Card className="mb-3">
            <CardHeader>{employee} - {chosen_weeks}</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Card body>
                    <Table {...{ ["bordered" || 'default']: true }}>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Reg Hours</th>
                          <th>Overtime</th>
                          <th>Duty</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
                </Row>
                </CardBody>
                </Card>
    );
      
  
    }
  }

  export default AdminTimesheet