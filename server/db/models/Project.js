const conn = require('../conn');
const { Sequelize } = conn;

const Project = conn.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
});

Project.findAllForUser = async function(userId) {
  const userProjects = await conn.models.user_project.findAll({ where: { userId }});
  const projectIds = userProjects.map(up => up.projectId);
  let projects = projectIds.map(async id => {
    return await this.findOne({ where: { id }});
  });
  return Promise.all(projects);
}

Project.createAndAssociate = async function(userId, reqBody) {
  const project = await Project.create(reqBody);
  const user = await conn.models.user.findById(userId);
  project.addUser(user, { through: { role: 'creator' }});
  return project;
}

Project.updateAndManageAssociations = async function(projectId, proj, usersToAdd, usersToRemove) {
  const project = await this.findById(projectId);
  const final = await Object.assign(project, proj);
  await final.save();
  final.removeUsers(usersToRemove);
  final.addUsers(usersToAdd);
  return final;
}

Project.deleteAndDisassociate = async function(userId, projectId) {
  const userProjects = await conn.models.user_project.findAll({ where: { projectId }});
  const projectIds = userProjects.map(up => up.projectId);
  const user = await conn.models.user.findById(userId);
  user.removeProjects(projectIds);
  const project = await this.findById(projectId);
  return project.destroy();
}

module.exports = Project;