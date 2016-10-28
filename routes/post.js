'use strict'

const content = require('../lib/content')
const normalize = require('../lib/normalize-path')
const tpl = require('../tpl/post')
const site = require('../lib/site')



const route = (req, res, next) => {
	if (req.path.slice(-1) !== '/') return next()

	content(normalize(req.path))
	.then((page) => {
		res.end(tpl(site, page))
	})
	.catch(next)
}

module.exports = route
