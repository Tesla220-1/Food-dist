'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// ПЕРЕДАЧА Не в JSON формате
	/* function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
		   
			const request = new XMLHttpRequest();
			const formData = new FormData(form);
			const statusMessage = document.createElement('div');

			statusMessage.classList.add('status');
			statusMessage.textContent = messages.loading;
			form.append(statusMessage);

			request.open('POST', 'server.php');
			// request.setRequestHeader('Content-type', 'multipart/form-data');
			//при использовании FormData вместе с XMLHttpRequest нам не нужно указывать заголвки (это вызвовет ошибку)
			request.send(formData);

			request.addEventListener('load', () => {
				if (request.status == 200) {
					statusMessage.textContent = messages.success;
					form.reset(); //Очищает форму
					setTimeout( () => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = messages.failure;
				}
			})
		});
	} */

	//Пример GET
	/* fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => response.json())
		.then(json => console.log(json));

	//Пример POST
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify({name: 'Alex'}),
		headers: {
			'Content-type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(json => console.log(json)); */

	
		//Slider
/* 	const offerSlides = document.querySelectorAll('.offer__slide'),
		offerSliderButtonPrev = document.querySelector('.offer__slider-prev'),
		offerSliderButtonNext = document.querySelector('.offer__slider-next'),
		offerSliderCounterCurrent = document.querySelector('#current'),
		offerSliderCounterTotal = document.querySelector('#total');

	function getCurrentAndTotalCounter(allSlides, currentCounter, totalCounter) {
		let current;
		let total = allSlides.length;
		allSlides.forEach( (slide, i) => {
			if ( !slide.classList.contains('hide') ) {
				current = i + 1;
			}
		} )

		currentCounter.textContent = current < 10 ? `0${current}` : current;
		totalCounter.textContent = total < 10 ? `0${total}` : total;
	}

	function changeSlide(allSlides, prevButton, nextButton, currentCounter, totalCounter) {
		let currentSlide;
		let curentSlideNumber;
		getCurrentAndTotalCounter(allSlides, currentCounter, totalCounter);

		allSlides.forEach( (slide, i) => {
			if ( !slide.classList.contains('hide') ) {
				currentSlide = slide;
				curentSlideNumber = i + 1;
			}
		})

		nextButton.addEventListener('click', () => {
			currentSlide.classList.add('hide');
			curentSlideNumber++;

			if (curentSlideNumber > allSlides.length) {
				curentSlideNumber = 1;
			}

			currentSlide = allSlides[curentSlideNumber - 1];
			currentSlide.classList.remove('hide');
			getCurrentAndTotalCounter(allSlides, currentCounter, totalCounter);
		})

		prevButton.addEventListener('click', () => {
			currentSlide.classList.add('hide');
			curentSlideNumber--;

			if (curentSlideNumber == 0) {
				curentSlideNumber = allSlides.length;
			}

			currentSlide = allSlides[curentSlideNumber - 1];
			currentSlide.classList.remove('hide');
			getCurrentAndTotalCounter(allSlides, currentCounter, totalCounter);
		})
	}

	changeSlide(offerSlides, offerSliderButtonPrev, offerSliderButtonNext, offerSliderCounterCurrent, offerSliderCounterTotal); */

		/*  // Slider
	const slider = document.querySelector('.offer__slider'),
		slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	const navWrapper = document.createElement('div');
	navWrapper.classList.add('carousel-indicators');

	for(let i = 0; i < slides.length; i++) {
		navWrapper.innerHTML += `
			<div class="dot"></div>
		`
	}

	slider.append(navWrapper);

	navWrapper.firstElementChild.style.opacity = '1';
	slider.style.position = 'relative';

	let slideIndex = 1,
		offset = 0;

	let targetNumber = 1, difference;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slides.forEach( slide => {
		slide.style.cssText = `
			width: ${width};
			flex: 0 0 auto;
		`
	});
	
	slidesWrapper.style.overflow = 'hidden';
	slidesField.style.cssText = `
		display: flex;
		transition: all 0.5s ease;
	`;

	next.addEventListener('click', () => {
		if (offset == parseFloat(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += parseFloat(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		navWrapper.children[targetNumber - 1].style.opacity = '0.5';


		if (slideIndex == slides.length) {
			slideIndex = 1;
			targetNumber = 1;
		} else {
			slideIndex++;
			targetNumber++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		navWrapper.children[targetNumber - 1].style.opacity = '1';
	})

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = parseFloat(width) * (slides.length - 1);
		} else {
			offset -= parseFloat(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		navWrapper.children[targetNumber - 1].style.opacity = '0.5';

		if (slideIndex == 1) {
			slideIndex = slides.length;
			targetNumber = slides.length;
		} else {
			slideIndex--;
			targetNumber--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		navWrapper.children[targetNumber - 1].style.opacity = '1';
	})

	//Навигация по слайдам
	navWrapper.addEventListener('click', (e)=> {
		if (e.target.classList.contains('dot') && e.target.style.opacity != '1') {

			for (let i = 0; i < navWrapper.children.length; i++) {
				navWrapper.children[i].style.opacity = '0.5';

				if (navWrapper.children[i] == e.target) {
					targetNumber = i + 1;
				}
			}

			e.target.style.opacity = '1';

			if (targetNumber > slideIndex) {
				difference = targetNumber - slideIndex; 
				offset += parseFloat(width) * difference;
				slidesField.style.transform = `translateX(-${offset}px)`;
			}

			if (targetNumber < slideIndex) {
				difference = slideIndex - targetNumber; 
				offset -= parseFloat(width) * difference;
				slidesField.style.transform = `translateX(-${offset}px)`;
			}

			slideIndex = targetNumber;
	
			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
		}
	}) */

	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsParent = document.querySelector('.tabheader__items'),
		tabsContent = document.querySelectorAll('.tabcontent');

	function hideTabsContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		})

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		})
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabContent();

	tabsParent.addEventListener('click', e => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (item == target) {
					hideTabsContent();
					showTabContent(i);
				}
			})
		}
	})

	//Timer
	const deadline = '2022-07-24';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor( (t / (1000 * 60 * 60) % 24 ));
			minutes = Math.floor( (t / 1000 / 60) % 60 );
			seconds = Math.floor( (t / 1000) % 60 );
		}
			
		return {t, days, hours, minutes, seconds};
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	setClock('.promotion__timer', deadline);

	//Modal

	const modalTrigger = document.querySelectorAll('[data-modal-open]'),
		modal = document.querySelector('[data-modal]');

	function hideModal(modal) {
		modal.classList.add('hide');
		modal.classList.remove('show');
	}

	function showModal(modal) {
		modal.classList.add('show');
		modal.classList.remove('hide');
		/* clearInterval(modalTimerId);
		window.removeEventListener('scroll', showModalByScroll); */
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', () => {
			showModal(modal);
		})
	})

	modal.addEventListener('click', (e) => {
		if (e.target == modal || e.target.getAttribute('data-modal-close') == '') {
			hideModal(modal);
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			hideModal(modal);
		}
	})

	/* const modalTimerId = setTimeout(() => showModal(modal), 10000); */

	/* function showModalByScroll() {
		if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal(modal);
		}
	}

	window.addEventListener('scroll', showModalByScroll); */

	// Меню карточки
	class MenuCard {
		constructor(title, description, price, image, alt, parentSelector, ...classes) {
			this.title = title;
			this.description = description;
			this.price = price;
			this.currencyTransfer = 60;
			this.image = image;
			this.alt = alt;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.changeToRUB();
		}

		changeToRUB() {
			this.price *= this.currencyTransfer;
		}

		render() {
			const element = document.createElement('div');

			if ( this.classes.length == 0 ) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(item => {
					element.classList.add(item);
				});
			}

			element.innerHTML = `
				<img src="${this.image}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;

			this.parent.append(element);
		}
	}

	// ПОЛУЧЕНИЕ В JSON формате
	const getResource = async (url) => {
		const res = await fetch(url);

		if ( !res.ok ) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach( ( {title, descr, price, img, altimg} ) => {
				new MenuCard(title, descr, price, img, altimg, '.menu__field .container').render();
			})
		})

	//Forms
	const forms = document.querySelectorAll('form');
	const messages = {
		loading: 'icons/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	}

	

	// ПЕРЕДАЧА В JSON формате
	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	}


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.style.cssText = `
				display: block;
				margin: 10px auto 0;
			`;
			statusMessage.src = messages.loading;
			form.insertAdjacentElement('afterend', statusMessage);

			//Перевод FormData в JSON
			/* const formData = new FormData(form);
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			}); */

			//Более компактный перевод FormData в JSON
			const json = JSON.stringify( Object.fromEntries( formData.entries() ) );
			
			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(messages.success);
				statusMessage.remove();
			})
			.catch(() => showThanksModal(messages.failure))
			.finally(() => form.reset())
		});
	}

	forms.forEach( item => {
		bindPostData(item);
	})

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">
					&times;
				</div>
				<div class="modal__title">
					${message}
				</div>
			</div>
		`;

		modal.append(thanksModal);
		showModal(modal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			hideModal(modal);
		}, 5000);
	}

	// Slider

    let offset = 0;
    let slideIndex = 1;

    const slider = document.querySelector('.offer__slider'), 
		slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		  dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.classList.add('dot');
		dot.setAttribute('data-slide-to', i + 1);
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

		dots.forEach( dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

		dots.forEach( dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
    });

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent =  `0${slideIndex}`;
			} else {
				current.textContent =  slideIndex;
			}

			dots.forEach( dot => dot.style.opacity = 0.5);
			dots[slideIndex - 1].style.opacity = 1;
		})
	})
});

