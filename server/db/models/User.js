const conn = require('../conn');
const { Sequelize } = conn;
const jwt = require('jwt-simple');

const User = conn.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

User.findPassword = async function(email) {
  const user = await this.findOne({
    where: { email }
  });
  if(user) {
    return user.password;
  }
  throw('user does not exist');
}

User.authenticate = async function(email, password) {
  const user = await this.findOne({
    where: { email, password }
  })
  if(user) {
    const token = jwt.encode({ id: user.id }, process.env.JWT_KEY);
    return token;
  }
  throw { status: 401 };
}

User.exchangeTokenForUser = async function(token) {
  try {
    const id = jwt.decode(token, process.env.JWT_KEY).id;
    const user = await this.findById(id);
    if(user) {
      return user;
    }
    throw { status: 401 };
  } catch(err) {
    console.error(err);
  }
}

module.exports = User;