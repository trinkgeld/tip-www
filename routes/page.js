'use strict'

const path = require('path')

const content = require('../lib/content')
const normalize = require('../lib/normalize-path')
const tpl = require('../tpl/page')
const site = require('../lib/site')



const base = path.join(__dirname, '..', 'pages')

const route = (req, res, next) => {
	if (req.path.slice(-1) !== '/') return next()

	content(path.join('pages', normalize(req.path)))
	.then((page) => {
		page.path = path.join(page.base, path.relative(base, page.path))
		res.end(tpl(site, page))
	})
	.catch(next)
}

module.exports = route
