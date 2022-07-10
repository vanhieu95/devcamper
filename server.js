const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
// Middlewares
const logger = require('./middlewares/logger')
// Route files
const bootcamps = require('./routes/bootcamps')

// Load config vars
dotenv.config({ path: './config/config.env' })

const app = express()

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount middleware
// app.use(logger)

// Mount routes
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
