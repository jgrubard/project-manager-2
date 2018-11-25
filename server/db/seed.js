const User = require('./models/User');
const conn = require('./conn');

const seed = () => {
  return Promise.all([
    User.create({
      email: 'jgrubard@gmail.com',
      password: 'jeremy'
    }),
    User.create({
      email: 'su@gmail.com',
      password: 'su'
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



