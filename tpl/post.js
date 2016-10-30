'use strict'

const h = require('pithy')
const moment = require('moment')
const path = require('path')
const base = require('./base')
const {meta, facebook, stylesheet, twitter, google} = require('./lib')



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
			stylesheet('/assets/post.css'),
			stylesheet('/assets/highlight.js/tomorrow.css')
		].concat(page.picture ? [
			// <meta property="og:image" content="https://example.com/image.jpg">
			facebook('image', path.join(page.url, page.picture)),
			twitter('image', path.join(page.url, page.picture)),
			google('image', path.join(page.url, page.picture))
		] : [])
	}),
	article(site, page)
)

module.exports = Object.assign(post, {time})
