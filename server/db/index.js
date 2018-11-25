const db = require('./conn');
const User = require('./models/User');

const sync = () => {
  return db.sync({ force: true });
}

const seed = () => {
  return Promise.all([
    User.create({
      email: 'jgrubard@gmail.com',
      password: 'jeremy'
    }),
    User.create({
      email: 'su@gmail.com',
      password: 'su'
    })
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
}