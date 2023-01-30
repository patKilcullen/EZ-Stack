const Sequelize = require('sequelize')
const db = require('../db')



const Message = db.define('message', {
    content: {
      type: Sequelize.TEXT,
      alloWNull: false
    },
    read:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    from: {
      type: Sequelize.STRING,
      alloWNull: false
    }
  })
  
  module.exports = Message
