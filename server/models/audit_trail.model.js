const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AuditTrailSchema = new Schema({
    at_action: {
        type: String
    },
    at_user: {
        type: String
    },
    at_date: {
        type: Date
    },
    role: {
        type: String
    },
    at_detils: {
        type: String
    },


})

const AuditTrail = model('AuditTrail', AuditTrailSchema)

module.exports = AuditTrail