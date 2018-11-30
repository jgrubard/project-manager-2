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

Task.findAllFromProject = async function(projectId) {
  const tasks = await this.findAll({ where: { projectId } });
  return tasks;
}