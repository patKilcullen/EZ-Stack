const Sequelize = require('sequelize')
const db = require('../db')


const Request = db.define('request', {
    status: {
    type: Sequelize.ENUM(['PENDING', 'ACCEPTED']),
    defaultValue: 'PENDING'
    },
    requestMessage: {
    type: Sequelize.TEXT
    },
    seenClient: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    seenFreelancer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = Request
