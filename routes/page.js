'use strict'

const fs = require('fs')



const page = (req, res, next) => {
	res.end('page')
}

module.exports = page
