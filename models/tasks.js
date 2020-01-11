// var Users = require("./users");

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
    // Tasks.belongsTo(Users);

    return Tasks;
  };