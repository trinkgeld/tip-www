'use strict'

const http = require('http')
const config = require('config')

const app = require('./app')

const insecure = http.createServer(app)
insecure.listen(config.port, (err) => {
	if (err) console.error(err)
	else console.log(`HTTP server listening on ${config.port}.`)
})
