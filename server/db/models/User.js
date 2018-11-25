const db = require('../conn');
const { Sequelize } = db;

const User = db.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = User;