const app = require('express').Router();
module.exports = app;
const { User } = require('../db').models;

app.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch(err) {
    next(err);
  }
});