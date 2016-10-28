'use strict'

const spdy = require('spdy')
const fs = require('fs')
const config = require('config')

const app = require('./app')
const server = spdy.createServer({
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}, app)

server.listen(config.port, (err) => {
	if (err) console.error(err)
	else console.log(`Listening on ${config.port}.`)
})
