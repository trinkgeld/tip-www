'use strict'

const path = require('path')

const content = require('../lib/content')
const tpl = require('../tpl/start')
const site = require('../lib/site')



const route = (req, res, next) => {
	content('pages')
	.then((page) => {
		page.path = path.join(page.base, 'index.html')
		res.end(tpl(site, page))
	})
	.catch(next)
}

module.exports = route
