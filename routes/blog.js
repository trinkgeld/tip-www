'use strict'

const path = require('path')

const posts = require('../lib/posts')
const tpl = require('../tpl/blog')
const site = require('../lib/site')



const base = path.join(__dirname, '..')

const route = (req, res, next) => {
	posts()
	.then((posts) => {
		const page = {
			title: 'Blog', description: 'News about Tip Me',
			keywords: [], author: 'Tip Me',
			base, path: path.join(base, 'blog/index.html'), posts
		}
		res.end(tpl(site, page))
	})
	.catch(next)
}

module.exports = route
