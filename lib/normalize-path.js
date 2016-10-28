'use strict'

const p = require('path')

const normalizePath = (f) => p.relative('/', f)

module.exports = normalizePath
