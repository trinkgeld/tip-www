'use strict'

const base = require('./base')
const {stylesheet} = require('./lib')

const page = (site, page) => base(
	site,
	Object.assign(Object.create(page), {
		head: [stylesheet('/highlight.js/tomorrow.css')]
	}),
	page.content
)

module.exports = page
