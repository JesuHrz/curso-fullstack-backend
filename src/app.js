'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const { authRoutes, billingsRoutes } = require('./routes')
const response = require('./utils/response')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routres
app.use('/api/auth', authRoutes)
app.use('/api/billings', billingsRoutes)

// 404 Error
app.use((_, res, ___) => response.error(res))

// 500 Error
app.use((err, __, res, ____) => {
  console.error(err.stack)
  response.error(res, { message: 'Something was wrong.', code: 500 })
})

module.exports = app
