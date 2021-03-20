const mongoose = require('mongoose')
const utils = require('../utils')

const defectDataSchema = mongoose.Schema({
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
    isActive:{
        type: Number,
        required: true,
        default: utils.ActiveStatus.Active
    },
    defect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Defect',
        required: true
    },
    checked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checked',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model("DefectData", defectDataSchema)