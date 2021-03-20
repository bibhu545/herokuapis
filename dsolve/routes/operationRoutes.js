const express = require('express')
const Checked = require('../models/checkModel')
const Departments = require('../models/departmentModel')
const Defects = require('../models/defectModel')
const DefectData = require('../models/defectDataModel')
const utils = require('../utils')

const router = express.Router()

router.post('/add-dhu', (req, res, next) => {
    let checkedData = {
        date: new Date(req.body.dateString),
        dateString: req.body.dateString,
        amount: req.body.amount,
        user: req.body.userId,
        department: req.body.deptId,
        lastUpdated: new Date()
    }
    Checked.findOne({ dateString: checkedData.dateString, department: checkedData.department }).then(response => {
        if (response) {
            Checked.findOneAndUpdate({ dateString: checkedData.dateString, department: checkedData.department }, { $set: checkedData }, { new: true }).then(response => {
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
                }
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
        else {
            Checked.create(checkedData).then(response => {
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
                }
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/get-dhu', (req, res, next) => {
    let checkedData = {
        user: req.body.userId,
        department: req.body.deptId
    }
    Checked.find({ user: checkedData.user, department: checkedData.department }).then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/add-department', (req, res, next) => {
    let depData = {
        name: req.body.name
    }
    Departments.findOneAndUpdate({ name: depData.name }, { $set: { depData } }, { upsert: true, new: true }).then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.get('/get-department', (req, res, next) => {
    Departments.find().then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/add-defects', (req, res, next) => {
    let defData = {
        name: req.body.name
    }
    Defects.findOneAndUpdate({ name: defData.name }, { $set: { defData } }, { upsert: true, new: true }).then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.get('/get-defects', (req, res, next) => {
    Defects.find().then(response => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

router.post('/add-defectdata', (req, res, next) => {
    let defData = {
        amount: req.body.amount,
        checked: req.body.checked,
        defect: req.body.defect,
        defectName: req.body.defectName,
        amount: req.body.amount,
        lastUpdated: new Date(),
        user: req.body.user
    }
    if (!defData.defect) {
        Defects.create({ name: defData.defectName }).then(response => {
            if (response) {
                defData.defect = response._id;
            }
            else {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            }
        }).catch(err => {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
        });
    }
    DefectData.findOne({ user: defData.user, defect: defData.defect, checked: defData.checked }).then(response => {
        if (response) {
            DefectData.findOneAndUpdate({ user: defData.user, defect: defData.defect, checked: defData.checked }, { $set: defData }, { new: true }).then(response => {
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
                }
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
        else {
            DefectData.create(defData).then(response => {
                if (response) {
                    res.status(200).json(response);
                }
                else {
                    utils.errorMessage(res, 500, utils.ERROR_MESSAGE);
                }
            }).catch(err => {
                utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
            })
        }
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    })
})

module.exports = router