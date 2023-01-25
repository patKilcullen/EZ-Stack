const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Freelancer = db.define("freelancer", {
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false,
},
imageUrl: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
  categories: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    // allowNull: false,
    min: 5,
  },
  
});

module.exports = Freelancer;


Freelancer.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

Freelancer.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

Freelancer.authenticate = async function ({ username, password }) {
  const freelancer = await this.findOne({ where: { username } });
  if (!freelancer || !(await freelancer.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return freelancer.generateToken();
};

Freelancer.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const freelancer = Freelancer.findByPk(id);
    if (!freelancer) {
      throw "nooo";
    }
    return freelancer;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

const hashPassword = async (freelancer) => {
  if (freelancer.changed("password")) {
    freelancer.password = await bcrypt.hash(freelancer.password, SALT_ROUNDS);
  }
};

Freelancer.beforeCreate(hashPassword);
Freelancer.beforeUpdate(hashPassword);
Freelancer.beforeBulkCreate((freelancer) => Promise.all(freelancer.map(hashPassword)));
