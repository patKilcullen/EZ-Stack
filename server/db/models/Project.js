const Sequelize = require('sequelize')
const db = require('../db')



const Project = db.define('project', {
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
    }
  })
  
  module.exports = Project
