'use strict'

const h = require('pithy')
const path = require('path')
const base = require('./base')
const {stylesheet, pageUrl} = require('./lib')
const {time} = require('./post')



const index = (site, page) =>
	h.ol({id: 'articles'}, page.posts.map((post) =>
		h.li({}, [
			h.a({href: pageUrl(post)}, post.title),
			time(post.date)
		])
	))

const blog = (site, page) => base(
	site,
	Object.assign(Object.create(page), {
		head: [
			stylesheet('/blog.css')
		]
	}),
	index(site, page)
)

module.exports = blog
