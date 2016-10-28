'use strict'

const express      = require('express')
const hsts         = require('hsts')
const compression  = require('compression')
const path         = require('path')
const serve        = require('serve-static')

const start = require('./routes/start')
const page = require('./routes/page')
const blog = require('./routes/blog')
const article = require('./routes/article')



const app = express()
module.exports = app

app.use(hsts({maxAge: 24 * 60 * 60 * 1000}))
app.use(compression())



app.get('/blog', blog)
app.get('/blog/*', post)
app.get('/', start)
app.get('/*', page)

app.use('/blog', serve(path.join(__dirname, 'blog'), {index: false}))
app.use('/', serve(path.join(__dirname, 'pages'), {index: false}))
app.use('/', serve(path.join(__dirname, 'assets'), {index: false}))



app.use((err, req, res, next) => {
	if (!res.headersSent)
		res.status(err.status || 500).end(err.message)
	next()
})
