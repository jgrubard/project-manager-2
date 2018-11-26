const conn = require('../conn');
const { Sequelize } = conn;

const Task = conn.define('task', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  colId: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false
});

module.exports = Task;