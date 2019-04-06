const Sequelize = require('sequelize');
const keys = require('./keys');
const database_keys = require('./config.json');

const db = new Sequelize(database_keys.development.database, database_keys.development.username, database_keys.development.password, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});

module.exports = db;