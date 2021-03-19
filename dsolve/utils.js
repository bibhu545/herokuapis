exports.API_AUTH_SECRET = "veryStrongPassword@dsolve"
exports.ERROR_MESSAGE = "Some internal error occured. Please try again."

exports.ActiveStatus = {
    Deleted: 0,
    Active: 1
}

exports.errorMessage = (res, statusCode = 500, message = "", data = {}) => {
    console.log(data)
    return res.status(statusCode).json({
        message: message,
        data: data
    })
}