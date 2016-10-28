'use strict';

const Remarkable = require('remarkable')
const highlight = require('highlight.js')

const md = new Remarkable('full', {
	html: true,
	langPrefix: 'hljs language-',
	highlight: (str, lang) => {
		if (lang && highlight.getLanguage(lang)) {
			try {
				return highlight.highlight(lang, str).value
			} catch (err) {}
		}
		return '' // use external default escaping
	}
})

const markdown = (content) => md.render(content)

module.exports = markdown
