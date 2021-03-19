const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')
const utils = require('../utils')

const router = express.Router()

router.post('/signup', (req, res, next) => {
    let userData = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    Users.findOne({ email: userData.email }).then(response => {
        if (response) {
            utils.errorMessage(res, 500, "Email already exists. Please Login to continue.");
        }
        else {
            bcrypt.hash(userData.password, 5, function (err, hash) {
                if (err) {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
                }
                else {
                    userData.password = hash;
                    Users.create(userData).then(response => {
                        console.log(response)
                        res.status(201).json({
                            message: "Acount Created. Please Login to continue."
                        })
                    }).catch(err => {
                        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
                    })
                }
            });
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
    Users.findOne({ email: userData.email }).then(response => {
        if (response) {
            bcrypt.compare(userData.password, response.password, function (err, result) {
                if (err) {
                    utils.errorMessage(res, 401, "Username or password did not match", err);
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: response.email,
                            id: response._id
                        },
                        utils.API_AUTH_SECRET,
                        { expiresIn: '2h' }
                    );
                    res.status(200).json({
                        message: "Successfully logged in",
                        data: token
                    })
                }
                else {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
                }
            });
        } else {
            utils.errorMessage(res, 401, "Username or password did not match", err);
        }
    }).catch(error => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

module.exports = router
