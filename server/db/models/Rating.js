const Sequelize = require('sequelize')
const db = require('../db')

const Rating = db.define('rating', {
    rating: {
      type: Sequelize.INTEGER,
      validate: {
        max: 5,
        min: 1,
      }
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: true, 
    },
  })
  
  module.exports = Rating
