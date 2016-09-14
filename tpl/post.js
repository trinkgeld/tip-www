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

const article = (site, page) =>
	page.content +
	h.p({id: 'post-meta'}, [
		h.span({id: 'post-meta-author'}, page.author),
		' am ',
		time(page.date)
	])

const post = (site, page) => base(
	site,
	Object.assign(Object.create(page), {
		head: [
			meta('author', page.author),
			facebook('type', 'article'),
			stylesheet('/post.css')
		]
	}),
	article(site, page)
)

module.exports = Object.assign(post, {time})
