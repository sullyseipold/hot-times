'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:  true
    },
    startDateTime:  {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime:  {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull:  false
    }
  }, {});
  Activity.associate = function(models) {
    Activity.belongsTo(models.Timesheet, {
      foreignKey: {
        allowNull:  false
      }
    });
  };
  return Activity;
};