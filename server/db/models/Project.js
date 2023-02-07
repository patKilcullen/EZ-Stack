const Sequelize = require('sequelize')
const db = require('../db')



const Project = db.define('project', {
    title: {
     type: Sequelize.STRING,
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
      type: Sequelize.ENUM(
        ['Python Developer', 
        'Javascript Developer',
        'HTML & CSS Developer',
        'Android Developer',
        'iOS Developer'
      ]),
  }})
  
  module.exports = Project
