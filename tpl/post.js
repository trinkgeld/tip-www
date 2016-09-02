'use strict'

const h = require('pithy')
const base = require('./base')

const post = (site, page) => base(site, page, page.content)

module.exports = post
