'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:  true
    },
    startDateTime:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDateTime:  {
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