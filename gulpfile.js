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



const pages = (dir) => pipe(
	  gulp.src(path.join(__dirname, dir, '**/*.md'))
	, frontmatter({property: 'meta', remove: true}))

const posts = (dir) =>
	pages(dir)
	.pipe(through((post, _, cb) => {
		if ('date' in post.meta)
			post.meta.date = moment(post.meta.date)
		cb(null, post)
	}))

const compile = (tpl) => through((post, _, cb) => {
	post = post.clone()
	const page = Object.assign({}, post.meta, {content: post.contents.toString()})
	post.contents = Buffer.from(tpl(site, page))
	cb(null, post)
})

gulp.task('blog', ['blog-posts', 'blog-index'])

gulp.task('blog-posts', () => pipe(
	  posts('blog')
	, markdown({preset: 'full'})
	, bufferize() // template needs the whole content at once
	, compile(templates.post)
	, gulp.dest(path.join(__dirname, 'dist/blog'))
))

gulp.task('blog-index', ['blog-posts'], () => pipe(
	  posts('blog')
	, rename({extname: '.html'})
	, reduce({objectMode: true}, (all, post) => all.concat(post), [])
	, through((posts, _, cb) => {
		const page = {
			title: 'Blog', description: 'News about Tip Me',
			keywords: [], author: 'Tip Me',
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
	  pages('pages')
	, markdown({preset: 'full'})
	, bufferize() // template needs the whole content at once
	, compile(templates.page)
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('assets', () => pipe(
	  gulp.src([path.join(__dirname, 'styles.css')])
	, gulp.dest(path.join(__dirname, 'dist'))
))



gulp.task('default', [
	  'blog'
	, 'pages'
	, 'assets'
])
