const bcrypt = require('bcrypt-nodejs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    google_id: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    let encrypt_password = (password) => {
      hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
      return hashed_password;
    }

    let validate_password = (password) => {
      return bcrypt.compareSync(password, models.password);
    }

  };
  return users;
};