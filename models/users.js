module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_id: {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "null first and last"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://image.flaticon.com/icons/png/512/1177/1177568.png"
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: " "
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: " "
    },
    resetPasswordExpires: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: " "
    }
  });
  return Users;
};
