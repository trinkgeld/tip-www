'use strict'

const base = require('./base')

const page = (site, page) => base(site, page, page.content)

module.exports = page
