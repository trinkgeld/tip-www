'use strict';

const pkg = require('../package.json')

const site = {
	language: 'de',
	title: pkg.title,
	nav: [
		{href: '/developers', title: 'Developers'},
		{href: '/blog', title: 'Blog'}
	]
}

module.exports = site
