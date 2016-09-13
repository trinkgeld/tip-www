'use strict'

const base = require('./base')
const {stylesheet, facebook} = require('./lib')

const page = (site, page) => base(
	site,
	Object.assign({}, page, {
		head: (page.stylesheets || []).map(stylesheet)
	}),
	page.content
)

module.exports = page
