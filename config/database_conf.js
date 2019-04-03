const Sequelize = require('sequelize');
const keys = require('./keys');

const db = new Sequelize(keys.database.local.db_name, keys.database.local.user, keys.database.local.password, {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});

module.exports = db;