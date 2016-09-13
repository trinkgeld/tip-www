'use strict'

const h = require('pithy')
const path = require('path')
const base = require('./base')
const {time} = require('./post')



const blog = (site, page) => base(
	site,
	Object.assign({}, page, {stylesheets: ['/blog.css']}),
	'' + h.ol({id: 'articles'}, page.posts.map((post) =>
		h.li({}, [
			h.a({href: path.relative(post.base, post.path)}, post.meta.title),
			time(post.meta.date)
		])
	))
)

module.exports = blog
