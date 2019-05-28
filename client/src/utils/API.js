import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function(user) {
    return axios({
      method: 'post',
      baseURL:"http://localhost:3001/api/user",
      data: user
    });
  },
    // Deletes the user with the given id
    // deleteUser: function(id) {
    //   return axios.delete("/api/user/" + id);
    // },
    // Saves a user to the database
    saveActivity: function(activity) {
      return axios({
        method: 'post',
        url:"http://localhost:3001/api/activity",
        data: activity
      });
    }
};