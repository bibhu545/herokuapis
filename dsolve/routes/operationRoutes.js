const express = require('express')
const Checked = require('../models/checkModel')
const Departments = require('../models/departmentModel')
const Defects = require('../models/defectModel')
const DefectData = require('../models/defectDataModel')
const utils = require('../utils')
const { ObjectId } = require('mongodb');

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

router.post('/get-dhu-bydate', (req, res, next) => {
    let checkedData = {
        user: req.body.userId,
        department: req.body.deptId,
        date: {
            $lte: new Date(req.body.fromDate)
        }
    }
    if (req.body.toDate) {
        checkedData = {
            ...checkedData,
            date: {
                $gte: new Date(req.body.fromDate),
                $lte: new Date(req.body.toDate)
            }
        }
    }
    Checked.find(checkedData).then(response => {
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

router.post('/get-defectdata-bychecked-ids', (req, res, next) => {
    let ids = req.body.ids
    data = []
    ids.forEach(element => {
        data.push(ObjectId(element));
    });
    DefectData.find({ checked: { $in: data } }).then(response => {
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
        name: req.body.name,
        department: req.body.deptId,
        defectId: req.body.defectId
    }
    if (req.body.solution) {
        defData = {
            ...defData,
            solution: req.body.solution
        }
    }
    Defects.findById(defData.defectId).then(response => {
        if (response) {
            Defects.findOneAndUpdate({ _id: defData.defectId }, { $set: defData }, { new: true }).then(response => {
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
            Defects.create(defData).then(response => {
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

router.post('/get-defects', (req, res, next) => {
    let defData = {
        department: req.body.deptId
    }
    Defects.find(defData).then(response => {
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

router.post('/delete-defect', (req, res, next) => {
    Defects.deleteOne({ _id: req.body.defectId }).then(response => {
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

router.post('/add-defectdata', async (req, res, next) => {
    let defData = {
        amount: req.body.amount,
        checked: req.body.checked,
        defect: req.body.defect,
        defectName: req.body.defectName,
        lastUpdated: new Date(),
        user: req.body.user,
        department: req.body.deptId,
    }
    if (defData.defect === '0') {
        await Defects.create({ name: defData.defectName, department: defData.department }).then(response => {
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
                    next();
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
                    next();
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
}, getDefects())

router.get('/get-defectdata', async (req, res, next) => {
    next();
}, getDefects())

function getDefects() {
    return (req, res) => {
        DefectData.aggregate([
            { $lookup: { from: "defects", localField: "defect", foreignField: "_id", as: "defectDetails" } }
        ]).then(response => {
            res.status(200).json(response);
        }).catch(err => {
            utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
        });
    }
}

router.get('/get-solutions', (req, res, next) => {
    DefectData.aggregate([
        { $lookup: { from: "checkeds", localField: "checked", foreignField: "_id", as: "checkedDetails" } },
        { $lookup: { from: "defects", localField: "defect", foreignField: "_id", as: "defectDetails" } }
    ]).then(response => {
        res.status(200).json(response);
    }).catch(err => {
        utils.errorMessage(res, 500, utils.ERROR_MESSAGE, err);
    });
})


module.exports = router
