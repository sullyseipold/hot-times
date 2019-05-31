import React, { Component }  from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


class WeekSelector extends React.Component {
    render() {
        const {
            two_weeks_ago,
            last_week,
            this_week,
            next_week,
            following_week,
            handleDateChange
             } = this.props;
        return (
    <FormGroup>
     <Label for="exampleSelect">Select Week</Label>
        <Input type="select" onChange={handleDateChange} name="select">
          <option value="placeholder">Click to select your timesheet</option>
          <option value={two_weeks_ago}>{two_weeks_ago}</option>
          <option value={last_week}>{last_week}</option>
          <option value={this_week}>{this_week}</option>
          <option value={next_week}>{next_week}</option>
          <option value={following_week}>{following_week}</option>
        </Input>
    </FormGroup>
        );
    }
};

export default WeekSelector