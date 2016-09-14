'use strict'

const h = require('pithy')
const path = require('path')
const base = require('./base')
const {stylesheet} = require('./lib')
const {time} = require('./post')



const index = (site, page) =>
	h.ol({id: 'articles'}, page.posts.map((post) =>
		h.li({}, [
			h.a({href: path.relative(post.base, post.path)}, post.meta.title),
			time(post.meta.date)
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
