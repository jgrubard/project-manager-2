const app = require('express').Router();
module.exports = app;
const { Project, Task } = require('../db').models;

app.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const projects = await Project.findAllForUser(userId);
    res.send(projects);
  } catch(err) {
    next(err);
  }
});

app.post('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const project = await Project.createAndAssociate(userId, req.body);
    res.send(project);
  } catch(err) {
    next(err);
  }
});

app.put('/:userId/:projectId', async (req, res, next) => {
  const { userId, projectId } = req.params;
  const { proj, usersToAdd, usersToRemove } = req.body;
  try {
    const project = await Project.updateAndManageAssociations(projectId, proj, usersToAdd, usersToRemove);
    res.send(project);
  } catch(err) {
    next(err);
  }
});

app.delete('/:userId/:projectId', async (req, res, next) => {
  const { userId, projectId } = req.params;
  try {
    await Project.deleteAndDisassociate(userId, projectId);
    res.sendStatus(204);
  } catch(err) {
    next(err);
  }
});

/* Task Routes */

app.get('/:projectId/tasks', async (req, res, next) => {
  const { projectId } = req.params;
  // console.log(projectId);
  try {
    // console.log(await Task.findAll());
    const tasks = await Task.findAll()
    // console.log(tasks);
    res.send(tasks);
  } catch(err) {
    next(err);
  }
});

app.post('/:projectId/tasks', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.send(task);
  } catch(err) {
    next(err);
  }
});