'use strict'

const spdy = require('spdy')
const http = require('http')
const fs = require('fs')
const config = require('config')

const app = require('./app')

const secure = spdy.createServer({
	  key:  fs.readFileSync(config.key)
	, cert: fs.readFileSync(config.cert)
	, ca:   fs.readFileSync(config.ca)
}, app)
secure.listen(config.port, (err) => {
	if (err) console.error(err)
	else console.log(`HTTPS server listening on ${config.port}.`)
})

const insecure = http.createServer(app)
insecure.listen(config.httpPort, (err) => {
	if (err) console.error(err)
	else console.log(`HTTP server listening on ${config.httpPort}.`)
})
