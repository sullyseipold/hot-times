module.exports = function(sequelize, DataTypes) {
  const Timesheet = sequelize.define('Timesheet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.STRING
    },
    endDate: {
      type: DataTypes.STRING
    }
  });

  Timesheet.associate = function(models) {
    Timesheet.belongsTo(models.User, {
      foreignKey: {
        allowNull:  true
      }
    });
  };
  return Timesheet;
};