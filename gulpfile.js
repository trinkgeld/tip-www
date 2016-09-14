'use strict';

const pipe = require('multipipe')
const gulp = require('gulp')
const frontmatter = require('gulp-front-matter')
const through = require('through-gulp')
const moment = require('moment')
const path = require('path')
const rename = require('gulp-rename')
const markdown = require('gulp-remarkable')
const bufferize = require('vinyl-buffer')
const reduce = require('through2-reduce')
const File = require('vinyl')

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



const pages = (globs) => pipe(
	gulp.src(globs),
	frontmatter({property: 'meta', remove: true})
)

const posts = (dir) => pipe(
	pages(dir),
	through((post, _, cb) => {
		if ('date' in post.meta)
			post.meta.date = moment(post.meta.date)
		cb(null, post)
	})
)

const compile = (tpl) => pipe(
	bufferize(), // template needs the whole content at once
	through((post, _, cb) => {
		const page = Object.assign(Object.create(post), post.meta, {
			content: post.contents.toString()
		})
		post.contents = Buffer.from(tpl(site, page))
		cb(null, post)
	})
)

gulp.task('blog', ['blog-posts', 'blog-index'])

gulp.task('blog-posts', () => pipe(
	  posts(['blog/**.md'])
	, markdown({remarkableOptions: {html: true}, preset: 'full'})
	, compile(templates.post)
	, gulp.dest(path.join(__dirname, 'dist/blog'))
))

gulp.task('blog-index', () => pipe(
	  posts(['blog/**.md'])
	, rename({extname: '.html'})
	, reduce({objectMode: true}, (all, post) => all.concat(post), [])
	, through((posts, _, cb) => {
		const page = {
			title: 'Blog', description: 'News about Tip Me',
			keywords: [], author: 'Tip Me',
			url: '/blog',
			posts
		}
		cb(null, new File({
			cwd: process.cwd(),
			base: path.join(process.cwd(), '/blog'),
			path: path.join(process.cwd(), '/blog/index.html'),
			contents: Buffer.from(templates.blog(site, page))
		}))
	})
	, gulp.dest(path.join(__dirname, 'dist/blog'))
))



gulp.task('pages', () => pipe(
	  pages(['pages/**/*.md', '!pages/index.md'])
	, markdown({remarkableOptions: {html: true}, preset: 'full'})
	, compile(templates.page)
	, gulp.dest(path.join(__dirname, 'dist'))
))

gulp.task('start', () => pipe(
	  pages(['pages/index.md'])
	, markdown({remarkableOptions: {html: true}, preset: 'full'})
	, compile(templates.start)
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('assets', () => pipe(
	  gulp.src([path.join(__dirname, '*.css'), path.join(__dirname, '*.svg')])
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('default', [
	  'blog'
	, 'pages'
	, 'start'
	, 'assets'
])
