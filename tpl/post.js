'use strict'

const h = require('pithy')
const moment = require('moment')
const base = require('./base')

const post = (site, page) => base(site, page,
	  h.div({id: 'post-meta'}, [
		h.span({id: 'post-meta-author'}, page.author),
		h.time({
			id: 'post-meta-time',
			datetime: moment(page.date).format('YYYY-MM-DD')
		}, moment(page.date).locale('de').format('LL'))
	])
	+ page.content)

module.exports = post
