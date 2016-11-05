'use strict'

const h = require('pithy')
const {
	viewport, meta, noReferrer,
	facebook, twitter, google,
	icon, stylesheet, script,
	pageUrl
} = require('./lib')



const head = (site, page) =>
	h.head({}, [
		h.meta({charset: 'utf-8'}),
		viewport,
		h.title({}, [page.title, '☮', site.title].join(' ')),
		meta('summary', page.summary),
		meta('description', page.description),
		meta('url', pageUrl(page)),
		noReferrer,
		facebook('url', pageUrl(page)),
		facebook('site_name', site.title),
		facebook('title', page.title),
		facebook('description', page.description),
		twitter('site', site.title),
		twitter('title', page.title),
		twitter('description', page.description),
		google('name', page.title),
		google('description', page.description),
		icon('/assets/icon.png'),
		stylesheet('/assets/system-font.css'),
		stylesheet('/assets/base.css'),
		stylesheet('/assets/forms.css'),
		stylesheet('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400')
	].concat(page.head || []))

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
const nav = (site, page) => {
	const style = page.navBackground ?
		`background-image: url(${page.navBackground})` : 'none'
	return h.nav({id: 'nav', style}, [
		h.a({href: '/'}, [
			h.img({id: 'nav-logo', src: '/assets/jar.svg', alt: site.title})
		])
	])
}

const tpl = (site, page, content) =>
	'<!DOCTYPE html>' +
	h.html({lang: page.language || site.language}, [
		head(site, page),
		h.body({}, [
			(site.nav && site.nav.length > 0 ? nav(site, page) : ''),
			h.main({id: 'content'}, [new h.SafeString('' + content)])
		].concat((page.scripts || []).map(script)))
	])

module.exports = tpl
