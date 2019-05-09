'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    user_id: DataTypes.INTEGER,
    post_title: DataTypes.STRING,
    post_body: DataTypes.STRING,
    post_due_date: DataTypes.DATE,
    is_done: DataTypes.BOOLEAN
  }, {});
  posts.associate = function(models) {
    // associations can be defined here
  };
  return posts;
};