//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Client = require('./models/Client')
const Freelancer = require('./models/Freelancer')
const Project = require('./models/Project')
const Request = require('./models/Request')

//associations could go here!
Client.hasMany(Project)
Project.belongsTo(Client)
Freelancer.hasMany(Project)
Project.belongsTo(Freelancer)
Project.hasMany(Request)
Request.belongsTo(Project)
Freelancer.hasMany(Request)
Request.belongsTo(Freelancer)


module.exports = {
  db,
  models: {
    User,
    Client,
    Freelancer,
    Project,
    Request
  },
}
