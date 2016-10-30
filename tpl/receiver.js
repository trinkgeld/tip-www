'use strict'

const h = require('pithy')
const url = require('url')

const base = require('./base')
const {stylesheet} = require('./lib')



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

const hero = (site, page) =>
	h.div({
		id: 'picture',
		style: `background-image: url(${page.photo})`
	}, [
		h.img({src: page.photo})
	])

const blog = (site, page) => base(
	site,
	Object.assign(Object.create(page), {
		head: [
			stylesheet('/assets/receiver.css')
		]
	}),
	h.div({}, [
		hero(site, page),
		h.div({id: 'details'}, [
			h.h2({}, page.title),
			// map(page.lat, page.lon, {alt: 'map showing ' + page.title})
		])
	])
)

module.exports = blog
