'use strict'

const pkg = require('./package.json')
const tpl = require('./tpl/index')



const site = {
	lang: 'en',
	title: pkg.title,
	nav: [
		{href: '/developers', title: 'Developers'},
		{href: '/blog', title: 'Blog'}
	]
}

const page = {
	title: 'Start',
	description: 'Give tips to whose who create stuff you buy.',
	keywords: ['tip', 'online', 'shops'],
	author: pkg.author.name
}

const content = `
	<section>
		<h2>FooBar Cotton Company</h2>
		<img src="foobar-cotton-company.jpg" alt="FooBar Cotton Company">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nihil, suscipit quaerat quo, possimus sequi tenetur laudantium minima pariatur distinctio repudiandae explicabo, earum <a href="#">dolor architecto optio</a>. Architecto nemo delectus sed sit ullam quam, ad doloremque neque perferendis nobis, esse ratione est vitae natus dolores mollitia, laborum quis perspiciatis officiis consequuntur.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nihil, suscipit quaerat quo, possimus sequi tenetur laudantium minima pariatur distinctio repudiandae explicabo, earum dolor architecto optio. Architecto nemo delectus sed sit ullam quam, ad doloremque neque perferendis nobis, esse ratione est vitae natus dolores mollitia, laborum quis perspiciatis officiis consequuntur.</p>
	</section>
	<section class="flip">
		<h2>Qux Sewing Corp.</h2>
		<img src="qux-sewing-corp.jpg" alt="Qux Sewing Corp.">
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nihil, suscipit quaerat quo, possimus sequi tenetur laudantium minima pariatur distinctio repudiandae explicabo, earum dolor architecto optio. Architecto <a href="#">nemo</a> delectus sed sit ullam quam, ad doloremque neque perferendis nobis, esse ratione est vitae natus dolores mollitia, laborum quis perspiciatis officiis consequuntur.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nihil, suscipit quaerat quo, possimus sequi tenetur laudantium minima pariatur distinctio repudiandae explicabo, earum dolor architecto optio. Architecto nemo delectus sed sit ullam quam, ad doloremque neque perferendis nobis, esse ratione est vitae natus dolores mollitia, laborum quis perspiciatis officiis consequuntur.</p>
	</section>`

process.stdout.write(tpl(site, page, content))
