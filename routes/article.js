'use strict'

const fs = require('fs')



const article = (req, res, next) => {
	res.end('blog article')
}

module.exports = article
