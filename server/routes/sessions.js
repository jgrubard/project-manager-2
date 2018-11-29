const app = require('express').Router();
module.exports = app;
const { User } = require('../db').models;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

app.post('/login', async (req, res, next) => {
  const error = { status: 401 }
  try {
    const { email, password } = req.body;
    const hash = await User.findPassword(email);
    const authorized = await bcrypt.compare(password, hash);
    if(authorized) {
      const token = await User.authenticate(email, hash);
      return res.send(token);
    }
    res.sendStatus(error.status);
    throw error;
  } catch(err) {
    console.log('ERROR AUTHENTICATING:', err);
  }
});

app.get('/:token', async (req, res, next) => {
  const { token } = req.params;
  const user = await User.exchangeTokenForUser(token);
  res.send(user);
});

app.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const body = { email, password: hashedPassword };
  try {
    const user = await User.create(body);
    const { email, password } = user;
    const token = await User.authenticate(email, password);
    res.send(token);
  } catch(err) {
    console.log(err);
    next(err);
  }
});