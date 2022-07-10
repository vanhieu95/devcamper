const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors');

// Load config vars
dotenv.config({ path: './config/config.env' })

const connectDB = require('./config/db')
connectDB()

// Middlewares
// const logger = require('./middlewares/logger')
// Route files
const bootcamps = require('./routes/bootcamps')

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

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

// Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
