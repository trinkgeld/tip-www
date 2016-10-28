'use strict'

const fs = require('fs')



const page = (req, res, next) => {
	res.end('start page')
}

module.exports = page
