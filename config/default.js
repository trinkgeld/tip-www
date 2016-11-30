'use strict'

module.exports = {
	hostname: 'localhost',
	port:     3000,
	httpPort: 3001,
	key:      '<path to SSL key>',
	cert:     '<path to SSL cert>',
	ca:       '<path to SSL CA cert>',
	backend: {
		url: 'https://api.tip-me.org/',
		insecure: false
	}
}
