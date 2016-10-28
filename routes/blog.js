'use strict'

const fs = require('fs')



const blog = (req, res, next) => {
	res.end('blog index')
}

module.exports = blog
