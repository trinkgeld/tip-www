'use strict'

const h = require('pithy')



const viewport = h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})

const stylesheet = (href, media = 'screen') =>
	h.link({rel: 'stylesheet', type: 'text/css', media, href})

const head = (site, page) => h.head({}, [
	h.meta({charset: 'utf-8'}, ''),
	h.title({}, [page.title, '☮', site.title].join(' ')),
	h.meta({name: 'description', content: page.description}, ''),
	h.meta({name: 'keywords', content: page.keywords.join(', ')}, ''),
	h.meta({name: 'author', content: page.author}, ''),
	viewport,
	stylesheet('styles.css')
])

const nav = (site, page) => h.nav({id: 'nav'}, [
	h.h1({id: 'logo'}, [
		h.a({href: '/'}, site.title)
	]),
	h.ul({id: 'menu'}, site.nav.map((link) =>
		h.li({}, [
			h.a({href: link.href}, link.title)
		])
	))
])

const tpl = (site, page, content) =>
	'<!DOCTYPE html>' +
	h.html({lang: site.lang}, [
		head(site, page),
		h.body({}, [
			nav(site, page),
			h.main({id: 'content'}, [new h.SafeString(content)])
		])
	])

module.exports = tpl
