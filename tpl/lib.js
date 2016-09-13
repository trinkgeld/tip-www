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

const site = url.parse(pkg.url)
const pageUrl = (page) => {
	page = url.parse(page)
	const pathname = path.join(site.pathname || '', page.pathname || '')
	return url.format({
		protocol: page.protocol || site.protocol,
		hostname: page.hostname || site.hostname,
		port:     page.port     || site.port,
		query:    page.query    || site.query,
		hash:     page.hash     || site.hash,
		pathname
	})
}


module.exports = {viewport, meta, noReferrer, stylesheet, icon, facebook, pageUrl}
