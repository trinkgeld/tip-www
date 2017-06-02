(function () {
	var thanks = [
		'Danke!', // german
		'நன்றி!', // tamil
		'ขอบคุณ!', // thai
		'ຂອບໄຈ!', // laotian
		'धन्यवाद!', // hindi
		'شكرا', // arabic
		'dankon!', // esperanto
		'gracias!', // spanish
		'Thank you!' // english
	]
	var thanksEl = document.getElementById('intro-thanks')

	var products = [
		'shoes',
		'coffee',
		'cocoa',
		'condoms'
	]
	var productsEl = document.getElementById('intro-products')

	var i = 0
	setInterval(function () {
		thanksEl.style.opacity = 0
		productsEl.style.opacity = 0

		setTimeout(function () {
			thanksEl.innerHTML = thanks[i++ % thanks.length]
			thanksEl.style.opacity = 1

			productsEl.innerHTML = products[i++ % products.length]
			productsEl.style.opacity = 1
		}, 300)
	}, 3000)
})()
