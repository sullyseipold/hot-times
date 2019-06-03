import axios from 'axios';

export default {
  // Gets all users
  getUsers: function() {
    return axios.get('http://localhost:3001/api/user');
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get('/api/user/' + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete('/api/user/' + id);
  },

  getTimesheets: function(UserId) {
    return axios.get('/api/timesheet/' + UserId);
  },

  // Saves a user to the database
  saveUser: function(user) {
    return axios({
      method: 'post',
      baseURL: 'http://localhost:3001/api/user',
      data: user,
    });
  },
  
  // Saves a user to the database
  saveActivity: function(activity) {
    return axios({
      method: 'post',
      url: 'http://localhost:3001/api/activity',
      data: activity,
    });
  },

  getActivitiesByTimesheetID: function(timesheetId) {
    return axios.get(
      `http://localhost:3001/api/activity/?TimesheetId/${timesheetId}`,
    );
  },

  getTimeSheetByUserIdAndStartAndEndDates: function(
    userId,
    startDate,
    endDate,
  ) {
    return axios.get(
      `http://localhost:3001/api/timesheet/user/${userId}/startDate/${startDate}/endDate/${endDate}`,
    );
  },

  getTimesheetsByUserId: function(userId) {
    return axios.get(`http://localhost:3001/api/timesheet/user/${userId}`);
  },

  createTimesheet: function(timesheet) {
    return axios({
      method: 'post',
      url: 'http://localhost:3001/api/timesheet',
      data: timesheet,
    });
  },
   
    getPayPeriodReport: function(startDate, endDate) {
      return axios.get(`http://localhost:3001/api/reports/payPeriod/startDate/${startDate}/endDate/${endDate}`)
    }
};
