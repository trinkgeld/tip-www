'use strict'

const h = require('pithy')
const moment = require('moment')
const base = require('./base')

const time = (date) =>
	h.time({
		id: 'post-meta-time',
		datetime: moment(date).format('YYYY-MM-DD')
	}, moment(date).locale('de').format('LL'))

const post = (site, page) => base(site, page,
	  h.div({id: 'post-meta'}, [
		h.span({id: 'post-meta-author'}, page.author),
		time(page.date)
	])
	+ page.content)

module.exports = Object.assign(post, {time})
