'use strict';

const gulp = require('gulp')
const pipe = require('multipipe')
const path = require('path')
const frontmatter = require('gulp-front-matter')
const markdown = require('gulp-remarkable')
const bufferize = require('vinyl-buffer')
const through = require('through-gulp')
const moment = require('moment')

const templates = require('./tpl/index')
const pkg = require('./package.json')

const site = {
	lang: 'en',
	title: pkg.title,
	nav: [
		{href: '/developers', title: 'Developers'},
		{href: '/blog', title: 'Blog'}
	]
}

const posts = []



gulp.task('posts', () => pipe(
	  gulp.src(path.join(__dirname, 'posts/*'))
	, frontmatter({property: 'meta', remove: true})
	, markdown({preset: 'full'})
	, bufferize() // template needs the whole content at once
	, through((file, _, cb) => {
		if (!file.isBuffer()) return cb()
		file = file.clone()
		const page = Object.assign({
			content: file.contents.toString()
		}, file.meta)
		page.date = moment(page.date)
		file.contents = Buffer.from(templates.post(site, page))
		cb(null, file)
	})
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('pages', () => pipe(
	  gulp.src(path.join(__dirname, 'pages/*'))
	, frontmatter({property: 'meta', remove: true})
	, markdown({preset: 'full'})
	, bufferize() // template needs the whole content at once
	, through((file, _, cb) => {
		if (!file.isBuffer()) return cb()
		file = file.clone()
		const page = Object.assign({
			content: file.contents.toString()
		}, file.meta)
		file.contents = Buffer.from(templates.page(site, page))
		cb(null, file)
	})
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('assets', () => pipe(
	  gulp.src([path.join(__dirname, 'styles.css')])
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('default', [
	  'posts'
	, 'pages'
	, 'assets'
])
