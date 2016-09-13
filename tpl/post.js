'use strict'

const h = require('pithy')
const moment = require('moment')
const base = require('./base')
const {meta, facebook, stylesheet} = require('./lib')



const time = (date) =>
	h.time({
		id: 'post-meta-time',
		datetime: moment(date).format('YYYY-MM-DD')
	}, moment(date).locale('de').format('LL'))

const post = (site, page) => base(
	site,
	Object.assign({}, page, {
		head: [
			meta('author', page.author),
			facebook('type', 'article'),
			stylesheet('/post.css')
		]
	}),
	page.content
	+ h.p({id: 'post-meta'}, [
		h.span({id: 'post-meta-author'}, page.author),
		' am ',
		time(page.date)
	]))

module.exports = Object.assign(post, {time})
