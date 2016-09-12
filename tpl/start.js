'use strict'

const base = require('./base')



const start = (site, page) => base(
	Object.assign({}, site, {nav: false}),
	page, page.content
)

module.exports = start
