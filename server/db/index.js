const conn = require('./conn');
const User = require('./models/User');
const Project = require('./models/Project');
const UserProject = require('./models/UserProject');
const Task = require('./models/Task');

User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

Task.belongsTo(Project);
Project.hasMany(Task);

module.exports = {
  conn,
  models: {
    User,
    Project,
    UserProject,
    Task
  }
}