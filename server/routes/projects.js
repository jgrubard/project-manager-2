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
  try {
    const tasks = await Task.findAllFromProject(projectId);
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

app.put('/:projectId/tasks/:taskId', async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    Object.assign(task, req.body);
    await task.save();
    // const socket = something
    // socket.broadcast.emit('updated-task', task);
    res.send(task);
  } catch(err) {
    next(err);
  }
});

app.delete('/:projectId/tasks/:taskId', async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    await task.destroy();
    res.sendStatus(204);
  } catch(err) {
    next(err);
  }
});