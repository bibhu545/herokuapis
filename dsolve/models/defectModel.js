const mongoose = require('mongoose')
const utils = require('../utils')

const defectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true,
        default: 'No solution available.'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
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

module.exports = mongoose.model("Defect", defectSchema)