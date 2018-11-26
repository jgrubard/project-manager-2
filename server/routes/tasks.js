const app = require('express').Router();
module.exports = app;

const { Task } = require('../db').models;

app.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.send(tasks);
  } catch(err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body)
    res.send(task);
  } catch(err) {
    next(err);
  }
});