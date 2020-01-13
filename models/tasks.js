module.exports = function(sequelize, DataTypes) {

    var Tasks = sequelize.define("tasks", {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      task_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      task_title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Enter a Task"
      
    },
      task_text: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Enter a Task"
      
    },
    task_status: {
      type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    }
  });
  // Tasks.associate = function(models) {
  //   Tasks.belongsTo(models.Users, {foreignKey: 'user_id'})
  // };
    return Tasks;
  };