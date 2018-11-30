const app = require('express').Router();
module.exports = app;

const { UserProject } = require('../db').models;

app.get('/:projectId/:userId', async (req, res, next) => {
  const { projectId, userId } = req.params;
  const userProjects = await UserProject.findAll({ where: { projectId }});
  res.send(userProjects);
});