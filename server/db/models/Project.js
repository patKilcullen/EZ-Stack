const Sequelize = require('sequelize')
const db = require('../db')



const Project = db.define('project', {
    title: {
     type: Sequelize.STRING(30),
     allowNull: false
    },
    status: {
      type: Sequelize.ENUM(['Pending','Ongoing', 'Complete' ]),
      allowNull: false,
      defaultValue: 'Pending'
    },
    description: {
      type: Sequelize.TEXT,
    },
    category: {
      type: Sequelize.STRING
    },
    work: {
      type: Sequelize.TEXT
    },
    comment: {
      type: Sequelize.TEXT
    },
    rejectedWork: {
      type: Sequelize.TEXT
    }
  })
  
  module.exports = Project
