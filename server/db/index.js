const conn = require('./conn');
const User = require('./models/User');

module.exports = {
  conn,
  models: {
    User
  }
}