import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const tableTypes = [''];

const TablePage = () => {
  return (
    <Page
      title="Tables"
      breadcrumbs={[{ name: 'tables', active: true }]}
      className="TablePage"
    >
      {tableTypes.map((tableType, index) => (
        <Row key={index}>
          <Col>
            <Card className="mb-10">
              <CardHeader>{tableType || 'Weekly Timecard'}</CardHeader>
              <CardBody>
              <Row>
        <Col>
          <Card className="mb-10">
            <CardHeader>Employee 1</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Day/Work Type</th>
                    <th>Regular</th>
                    <th>Overnight</th>
                    <th>Detail</th>
                    <th>Overtime</th>
                    <th>Other</th>
                    <th>Sick Hours Used</th>
                    <th>Comp Hours Earned</th>
                    <th>Holiday Hours</th>
                    <th>Vacation Hours Used</th>
                    <th>Comp Hours Used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Monday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 

                    
                  </tr>
                  <tr>
                    <th scope="row">Tuesday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                  <tr>
                    <th scope="row">Wednesday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                  <tr>
                    <th scope="row">Thursday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                  <tr>
                    <th scope="row">Friday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                  <tr>
                    <th scope="row">Saturday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                  <tr>
                    <th scope="row">Sunday</th>
                    <td>8</td>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td> 
                    <td>1</td>
                    <td>0</td>
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                    <td>0</td> 
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}

     
  
    </Page>
  );
};

export default TablePage;
