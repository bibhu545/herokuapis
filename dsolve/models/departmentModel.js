const mongoose = require('mongoose')
const utils = require('../utils')

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    },
    isActive:{
        type: Number,
        required: true,
        default: utils.ActiveStatus.Active
    }
})

module.exports = mongoose.model("Department", departmentSchema)