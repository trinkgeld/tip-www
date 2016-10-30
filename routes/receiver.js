'use strict'

const path = require('path')

const normalize = require('../lib/normalize-path')
const receiver = require('../lib/receiver')
const tpl = require('../tpl/receiver')
const site = require('../lib/site')



const base = path.join(__dirname, '..')

const route = (req, res, next) => {
	if (!req.params.receiver) return next()
	const id = req.params.receiver

	receiver(id)
	.then((page) => {
		page.title = page.name
		page.path = path.join(base, 'receivers/' + id)
		page.url = `/receivers/${id}/`
		res.end(tpl(site, page))
	})
	.catch(next)
}

module.exports = route
