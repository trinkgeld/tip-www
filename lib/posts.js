'use strict';

const glob = require('glob')
const path = require('path')

const content = require('./content')


const posts = (dirname) =>
	new Promise((yay, nay) => {
		glob(path.join(__dirname, '..', 'blog', '**/*.md'), (err, files) => {
			if (err) nay(err)
			else yay(Promise.all(files.map(content)))
		})
	})

module.exports = posts
