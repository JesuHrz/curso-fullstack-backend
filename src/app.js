const express = require('express')
const bodyParser = require('body-parser')

const response = require('./utils/response')

const app = express()

const morgan = require('morgan')

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/blogs', (req, res) => {
  const data = { greeting: 'HOLA blogs' }

  response.success(res, { code: 201, data })
})

app.get('/blogs/:id/links/:linkIds', (req, res) => {
  console.log('req.params', req.params)
  console.log('req.query', req.query)
  res.status(200)
  res.json({
    greeting: 'HOLA blogs'
  })
})

app.use((_, res, ___) => response.error(res))

module.exports = app
