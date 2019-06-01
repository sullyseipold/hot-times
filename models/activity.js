'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:  true
    },
    startDate:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDate:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endTime:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activityType: {
      type: DataTypes.STRING,
      // allowNull:  false
    }
  }, {});
  Activity.associate = function(models) {
    Activity.belongsTo(models.Timesheet, {
      foreignKey: {
        allowNull:  true
      }
    });
  };
  return Activity;
};