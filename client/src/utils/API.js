import axios from 'axios';

export default {
  // Gets all users
  getUsers: function() {
    return axios.get('/api/user');
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
      baseURL: '/api/user',
      data: user,
    });
  },
  
  // Saves a user to the database
  saveActivity: function(activity) {
    return axios({
      method: 'post',
      url: '/api/activity',
      data: activity,
    });
  },

  getActivitiesByTimesheetID: function(timesheetId) {
    return axios.get(
      `/api/activity/?TimesheetId/${timesheetId}`,
    );
  },

  getTimeSheetByUserIdAndStartAndEndDates: function(
    userId,
    startDate,
    endDate,
  ) {
    return axios.get(
      `/api/timesheet/user/${userId}/startDate/${startDate}/endDate/${endDate}`,
    );
  },

  getTimesheetsByUserId: function(userId) {
    return axios.get(`/api/timesheet/user/${userId}`);
  },

  createTimesheet: function(timesheet) {
    return axios({
      method: 'post',
      url: '/api/timesheet',
      data: timesheet,
    });
  },
   
    getPayPeriodReport: function(startDate, endDate) {
      return axios.get(`/api/reports/payPeriod/startDate/${startDate}/endDate/${endDate}`)
    }
};
