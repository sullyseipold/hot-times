import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Table,
    Row,
  } from 'reactstrap';
  import moment from 'moment';

  class AdminTimesheet extends React.Component {
    render() {
       
        const {
         employee,
         selectedTimesheet,
         activities
          } = this.props;
        
    
      return (
          <Card className="mb-3">
            <CardHeader>{employee} - {selectedTimesheet}</CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <Card body>
                    <Table responsive {...{ ["bordered" || 'default']: true }}>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Hour Type</th>
                          <th>Time worked</th>
                          <th>Number of hours</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                    
                      {activities.map(activity => (
                        
                             <tr key={activity.id} id={activity.activityType}>
                                <th scope="row">{activity.startDate}</th>
                                     <td>{activity.activityType}</td>
                                <td>{activity.startTime} - {activity.endTime}</td>
                         <td>{
                            moment(activity.endDate + ' ' + activity.endTime, 'YYYY-MM-DD HH:mm')
                                .diff(moment(activity.startDate + ' ' + activity.startTime,'YYYY-MM-DD HH:mm'), 'hours', true)
                         
                         }</td>
                       
                     </tr>
              
            ))}
           
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

//   {moment(selectedTimesheet.split(',')[0]).format('ll')} - {moment(selectedTimesheet.split(',')[1]).format('ll')}