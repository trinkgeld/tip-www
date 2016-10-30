'use strict'

const express      = require('express')
const hsts         = require('hsts')
const compression  = require('compression')
const path         = require('path')
const serveStatic = require('serve-static')

const start = require('./routes/start')
const page = require('./routes/page')
const blog = require('./routes/blog')
const post = require('./routes/post')
const receiver = require('./routes/receiver')



const app = express()
module.exports = app

app.use(hsts({maxAge: 24 * 60 * 60 * 1000}))
app.use(compression())



app.get('/blog', blog)
app.get('/blog/*', post)
app.get('/receivers/:receiver/', receiver)
app.get('/', start)
app.get('/*', page)


const serve = (p) =>
	serveStatic(path.join(__dirname, p), {index: false, fallthrough: true})
app.use('/blog', serve('blog'))
app.use('/assets', serve('assets'))
app.use('/', serve('pages'))



app.use((err, req, res, next) => {
	if (!res.headersSent)
		res.status(err.status || 500).end(err.message)
	next()
})
