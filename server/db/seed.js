require('dotenv').config();
const conn = require('./conn');
const { User } = require('./index').models;

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const jeremyPassword = bcrypt.hashSync(process.env.JG_PW, salt);
const suPassword = bcrypt.hashSync(process.env.SS_PW, salt);

const seed = () => {
  return Promise.all([
    User.create({
      email: 'jgrubard@gmail.com',
      password: jeremyPassword
    }),
    User.create({
      email: 'su@gmail.com',
      password: suPassword
    }),
    User.create({
      email: 'mario@gmail.com',
      password: 'mario'
    })
  ])
}

console.log('1. syncing to db');
conn.sync({ force: true })
  .then(() => {
    console.log('2. seeding db');
    return seed();
  })
  .then(() => console.log('3. db seeded'))
  .then(() => {
    console.log('4. closing connection');
    conn.close();
    console.log('5. connection closed');
  })
  .catch(err => {
    console.log('Error Seeding', err);
  });