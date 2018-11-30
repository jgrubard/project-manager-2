// const app = require('express').Router();
// module.exports = app;

// const { Task } = require('../db').models;

// app.get('/:projectId', async (req, res, next) => {
//   const { projectId } = req.params;
//   try {
//     const tasks = await Task.findAllFromProject(projectId);
//     res.send(tasks);
//   } catch(err) {
//     next(err);
//   }
// });

// app.post('/:projectId', async (req, res, next) => {
//   try {
//     const task = await Task.create(req.body)
//     res.send(task);
//   } catch(err) {
//     next(err);
//   }
// });