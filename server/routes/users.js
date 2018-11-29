const app = require('express').Router();
module.exports = app;
const { User } = require('../db').models;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

app.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch(err) {
    next(err);
  }
});

app.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const { email, firstName, lastName, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const passwordChange = { email, firstName, lastName, password: hashedPassword };
  const noPasswordChange = { email, firstName, lastName };
  const body = !!password ? passwordChange : noPasswordChange;
  try {
    const user = await User.findById(userId);
    await Object.assign(user, body);
    await user.save();
    res.send(user);
  } catch(err) {
    next(err);
  }
})