const mongoose = require('mongoose')
const utils = require('../utils')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    joinedAt: {
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
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("Users", userSchema)