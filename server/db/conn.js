const localDB = 'postgres://localhost/project_manager_2_db';
const database = process.env.DATABASE_URL || localDB;

const Sequelize = require('sequelize');
const db = new Sequelize(database, { logging: false });

module.exports = db;
