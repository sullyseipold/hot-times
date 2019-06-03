import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


class ActivitySelector extends React.Component {
    render() {
        const {
            activityTypes,
            handleActivityChange
        } = this.props;
        return (
            <FormGroup>
                <Label for="activitySelect">Select Hour Type</Label>
                <Input
                    type="select"
                    name="select"
                    onChange={handleActivityChange} >
                        {activityTypes.map((activity, index) => <option key={index} value={activity.value}>{activity.text}</option>)}
                </Input>
            </FormGroup>
        );
    }
};

export default ActivitySelector