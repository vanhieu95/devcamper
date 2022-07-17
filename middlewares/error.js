const ErrorResponse = require('../utils/errorResponse')

const CAST_OBJECT_FAILED_ERROR = 'CastError'
const VALIDATION_ERROR = 'ValidationError'

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  // Log to console
  console.log(err)
  console.log(err.name)

  // Mongoose bad ObjectId
  if (err.name === CAST_OBJECT_FAILED_ERROR) {
    const message = `Model not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = []
    for (const [key, value] of Object.entries(err.keyValue)) {
      field.push(`${key}: ${value}`)
    }

    const message = `Duplicate field value entered ${field.join(', ')}`
    error = new ErrorResponse(message, 400)
  }

  // Mongoose validation error
  if (err.name === VALIDATION_ERROR) {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler
