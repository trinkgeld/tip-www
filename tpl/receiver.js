'use strict'

const h = require('pithy')
const url = require('url')
const interpolate = require('util').format
const accounting = require('accounting')

const base = require('./base')
const {stylesheet} = require('./lib')

const formatMoney = (amount) =>
	accounting.formatMoney(amount, {symbol: '€', decimal: ',', thousand: '.'})



const map = (lat, lon, opt = {}) => h.img({
	alt: opt.alt, style: `width: ${(opt.width || 600) / 2}px`,
	src: url.format({
		protocol: 'https:', host: 'maps.googleapis.com',
		pathname: '/maps/api/staticmap', query: {
			size: (opt.width || 600)+ 'x' + (opt.height || 300),
			zoom: '2',
			scale: 2,
			markers: `color:0x3498db|${lon},${lat}`,
			center: lon + ',' + lat,
			style: [
				'feature:all|visibility:off',
				'feature:water|visibility:on|color:0x777777'
			]
		}
	})
})

const amount = (site, page) => {
	const nr = page.tips.length
	const amount = page.tips.reduce((sum, tip) => sum + tip.amount, 0)
	return h.p({},
		`${page.title} has received ${nr} tips, worth ${formatMoney(amount)}.`
	)
}

const blog = (site, page) => base(
	site,
	Object.assign(Object.create(page), {
		head: [
			stylesheet('/assets/receiver.css')
		],
		navBackground: page.photo
	}),
	[
		h.h2({}, page.title),
		amount(site, page)
	].join('\n')
)

module.exports = blog
