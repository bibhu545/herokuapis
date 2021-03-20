const express = require('express')
const Users = require('../models/userModel')
const utils = require('../utils')

const router = express.Router()

router.post('/register', (req, res, next) => {
    let userData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        companyName: req.body.companyName,
        userType: req.body.userType
    }
    Users.findOne({ email: userData.email }).then(response => {
        if (response) {
            utils.errorMessage(res, 500, "Email already exists. Please Login to continue.");
        }
        else {
            Users.create(userData).then(response => {
                res.status(201).json(response);
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/login', (req, res, next) => {
    let userData = {
        email: req.body.email,
        password: req.body.password
    }
    Users.findOne(userData).then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            utils.errorMessage(res, 401, "Username or password did not match");
        }
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

router.post('/edit-profile', (req, res, next) => {
    let id = req.body.userId;
    let userData = {
        name: req.body.name,
        phone: req.body.phone,
        companyName: req.body.companyName,
        userType: req.body.userType
    }
    Users.findByIdAndUpdate(id, userData, {new: true}).then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, 'User does not exists anymore');
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.get('/view-profile', (req, res, next) => {
    let userData = {
        email: req.headers.email
    }
    console.log(userData);
    Users.findOne(userData).then(response => {
        if (response) {
            res.status(200).json(response);
        } else {
            utils.errorMessage(res, 500, 'User does not exists anymore', err);
        }
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, error);
    })
})

module.exports = router
