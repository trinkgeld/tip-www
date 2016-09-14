(function () {
	var translations = [
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
	var thankyou = document.getElementById('intro-thankyou')
	var i = 0
	setInterval(function () {
		thankyou.style.opacity = 0
		setTimeout(function () {
			thankyou.innerHTML = translations[i++ % translations.length]
			thankyou.style.opacity = 1
		}, 300)
	}, 3000)
})()
