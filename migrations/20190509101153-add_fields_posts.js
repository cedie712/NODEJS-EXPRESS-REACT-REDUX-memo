'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'is_done', Sequelize.BOOLEAN);
  },

  down: (queryInterface, Sequelize, done) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn('posts', 'is_done');
  }
};
