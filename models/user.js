'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        isEmail: true
      }
    },
    memberNumber: {
      type: DataTypes.STRING,
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Timesheet);
  };
  return User;
};