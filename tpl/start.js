'use strict'

const base = require('./base')
const {stylesheet} = require('./lib')



const start = (site, page) => base(
	Object.assign({}, site, {nav: false}),
	Object.assign(Object.create(page), {
		head: page.stylesheets.map(stylesheet)
	}),
	page.content
)

module.exports = start
