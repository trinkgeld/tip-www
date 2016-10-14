'use strict';

const pipe = require('multipipe')
const gulp = require('gulp')
const frontmatter = require('gulp-front-matter')
const through = require('through-gulp')
const moment = require('moment')
const path = require('path')
const filter = require('gulp-filter')
const rename = require('gulp-rename')
const remarkable = require('gulp-remarkable')
const highlight = require('highlight.js')
const bufferize = require('vinyl-buffer')
const reduce = require('through2-reduce')
const File = require('vinyl')

const templates = require('./tpl/index')
const pageUrl = require('./tpl/lib').pageUrl
const pkg = require('./package.json')

const site = {
	language: 'de',
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

const media = (globs) => pipe(
	gulp.src(globs),
	filter((f) => !f.isDirectory() && path.extname(f.path) !== '.md')
)

const markdown = () =>
	remarkable({remarkableOptions: {
		html: true,
		langPrefix: 'hljs language-',
		highlight: (str, lang) => {
			if (lang && highlight.getLanguage(lang)) {
				try {return highlight.highlight(lang, str).value}
				catch (err) {}
			}
			return '' // use external default escaping
		}
	}, preset: 'full'})

const compile = (tpl) => pipe(
	bufferize(), // template needs the whole content at once
	through((post, _, cb) => {
		const page = Object.assign(Object.create(post), post.meta, {
			url: pageUrl(post),
			content: post.contents.toString()
		})
		post.contents = Buffer.from(tpl(site, page))
		cb(null, post)
	})
)

gulp.task('blog', ['blog-posts', 'blog-index', 'blog-media'])

gulp.task('blog-posts', () => pipe(
	  posts(['blog/**/*.md'])
	, markdown()
	, compile(templates.post)
	, gulp.dest('dist/blog')
))

gulp.task('blog-index', () => pipe(
	  posts(['blog/**/*.md'])
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
	, gulp.dest('dist/blog')
))

gulp.task('blog-media', () => pipe(
	  media(['blog/**/*'])
	, gulp.dest('dist/blog')
))



gulp.task('pages', ['pages-media'], () => pipe(
	  pages(['pages/**/*.md', '!pages/index.md'])
	, markdown()
	, compile(templates.page)
	, gulp.dest('dist')
))

gulp.task('start', () => pipe(
	  pages(['pages/index.md'])
	, markdown()
	, compile(templates.start)
	, gulp.dest('dist')
))

gulp.task('pages-media', () => pipe(
	  media(['pages/**/*'])
	, gulp.dest('dist')
))



gulp.task('assets', () => pipe(
	  gulp.src(['assets/**/*'])
	, gulp.dest('dist')
))



gulp.task('default', [
	  'blog'
	, 'pages'
	, 'start'
	, 'assets'
])
