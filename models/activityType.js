'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivityType = sequelize.define('ActivityType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:  true
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull:  false
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime:  {
      type: DataTypes.DATE,
      allowNull:  false
    }
  }, {});
  return ActivityType;
};