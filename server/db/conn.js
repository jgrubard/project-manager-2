const Sequelize = require('sequelize');

const localDB = 'postgres://localhost/project_manager_2_db';
const database = process.env.DATABASE_URL || localDB;
const noLogging = { logging: false };

const conn = new Sequelize(database, noLogging);

module.exports = conn;
