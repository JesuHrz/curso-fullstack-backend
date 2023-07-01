require('dotenv').config()
const http = require('http')

const app = require('./app')
const { createConnection } = require('./utils/db')
const { DatabaseConnectionError } = require('./utils/errors')

const { PORT } = process.env

;(async () => {
  try {
    const server = http.createServer(app)

    await createConnection()

    server.listen(PORT, () => {
      console.log(`Server running localhost:${PORT}`)
    })
  } catch (e) {
    if (e instanceof DatabaseConnectionError) {
      console.error('[DATABASE]', e.message)
    }
  }
})()
