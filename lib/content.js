'use strict';

const fs = require('fs')
const path = require('path')
const fm = require('front-matter')

const markdown = require('../lib/markdown')

const base = path.join(__dirname, '..')

const page = (dirname) =>
	new Promise((yay, nay) => {
		const full = path.basename(dirname) === 'index.md'
			? dirname : path.join(base, dirname, 'index.md')
		fs.readFile(full, {encoding: 'utf8'}, (err, content) => {
			if (err) return nay(err)
			try { content = fm(content) }
			catch (err) { nay(err) }
			yay(Object.assign(content.attributes, {
				content: markdown(content.body),
				base, url: path.relative(base, path.dirname(full)) + '/',
				path: path.join(path.dirname(full), path.basename(full, '.md') + '.html')
			}))
		})
	})

module.exports = page
