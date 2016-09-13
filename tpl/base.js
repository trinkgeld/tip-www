'use strict'

const h = require('pithy')
const {viewport, meta, noReferrer, icon, stylesheet, facebook, pageUrl} = require('./lib')




const head = (site, page) => h.head({}, [
	h.meta({charset: 'utf-8'}, ''),
	h.title({}, [page.title, '☮', site.title].join(' ')),
	h.meta({name: 'description', content: page.description}, ''),
	h.meta({name: 'keywords', content: page.keywords.join(', ')}, ''),
	h.meta({name: 'author', content: page.author}, ''),
	viewport,
	stylesheet('/base.css')
].concat((page.stylesheets || []).map(stylesheet)))

// const nav = (site, page) => h.nav({id: 'nav'}, [
// 	h.h1({id: 'logo'}, [
// 		h.a({href: '/'}, site.title)
// 	]),
// 	h.ul({id: 'menu'}, site.nav.map((link) =>
// 		h.li({}, [
// 			h.a({href: link.href}, link.title)
// 		])
// 	))
// ])
const nav = (site, page) => h.nav({id: 'nav'}, [
	h.a({href: '/'}, [
		h.img({id: 'nav-logo', src: '/jar.svg', alt: site.title})
	])
])

const tpl = (site, page, content) =>
	'<!DOCTYPE html>' +
	h.html({lang: site.lang}, [
		head(site, page),
		h.body({}, [
			(site.nav && site.nav.length > 0 ? nav(site, page) : ''),
			h.main({id: 'content'}, [new h.SafeString(content)])
		])
	])

module.exports = tpl
