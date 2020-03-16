module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    task_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: function(id) {
        var alphaNumeric = "abcdefghijklmnopqrstuvwxyz0123456789"; //possible characters for unique id
        var idArray = []; //array to hold random characters
        for (var i = 0; i < 20; i++) {
          //loop through string 20 times to create 20 character string
          var randChar = Math.floor(Math.random() * 35); //random string position
          idArray.push(alphaNumeric.charAt(randChar));
        }
        id = idArray.join(""); //concats idArray
        return id; //returns user_id value
      }
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
  return Tasks;
};
