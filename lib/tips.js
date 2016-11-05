'use strict'

const got = require('got')
const qs = require('querystring')
const boom = require('boom')

const {url, insecure} = require('config').backend

const tips = (filter = {}) =>
	got(url + 'tips?' + qs.stringify(filter), {
		json: true, rejectUnauthorized: !insecure
	})
	.then((res) => {
		if (res.body.error) throw boom.create(res.statusCode, res.body.msg)
		return res.body.data
	})
	.catch((err) => {
		if (err.isBoom) throw err
		if (err.statusCode) throw boom.wrap(err)
		throw boom.badGateway('could not fetch from backend')
	})


module.exports = tips
