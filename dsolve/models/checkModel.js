const mongoose = require('mongoose')
const utils = require('../utils')

const checkSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    dateString: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
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
    isActive: {
        type: Number,
        required: true,
        default: utils.ActiveStatus.Active
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
})

module.exports = mongoose.model("Checked", checkSchema)