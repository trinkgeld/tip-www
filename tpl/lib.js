'use strict'

const h = require('pithy')
const url = require('url')
const path = require('path')

const pkg = require('../package.json')



const viewport =
	h.meta({name: 'viewport', content: 'width=device-width,initial-scale=1'})

const meta = (key, value) =>
	h.meta({name: key, content: value})

const noReferrer = h.meta({name: 'referrer', content: 'never'}, '')

const stylesheet = (href) =>
	h.link({rel: 'stylesheet', type: 'text/css', media: 'screen', href})

const icon = (href) =>
	h.link({rel: 'icon', type: 'image/png', href})

const facebook = (key, value) =>
	h.meta({property: 'og:' + key, content: value})

const twitter = (key, value) =>
	h.meta({property: 'twitter:' + key, content: value})

const google = (key, value) =>
	h.meta({itemprop: 'google:' + key, content: value})

const site = url.parse(pkg.url)
const pageUrl = (page) => {
	let p = path.basename(page.path, '.html') === 'index'
		? path.dirname(page.path) : page.path
	p = url.parse('/' + path.relative(page.base, p))
	const pathname = path.join(site.pathname || '', p.pathname || '')
	return url.format({
		protocol: p.protocol || site.protocol,
		hostname: p.hostname || site.hostname,
		port:     p.port     || site.port,
		query:    p.query    || site.query,
		hash:     p.hash     || site.hash,
		pathname
	})
}


module.exports = {
	viewport, meta, noReferrer, stylesheet, icon,
	facebook, twitter, google,
	pageUrl
}
