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
					console.log(request.response)
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
		console.log(e.target);
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

	console.log(getTimeRemaining(deadline));

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

			if (this.classes.lenght === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(item => {
					element.classList.add(item);
				});
			}

			element.innerHTML = `
				<img src="${this.image}" alt="${this.alt}">
				<h3 class="menu__item-subtitle">${this.title}   </h3>
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

	const fitnesCard = new MenuCard(
		'Меню "Фитнес"',
		`
			Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.
			Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!
		`,
		12, 
		'img/tabs/vegy.jpg',
		'Меню "Фитнес"',
		'.menu__field .container',
		'menu__item',
		'big'
	);

	const premiumCard = new MenuCard(
		'Меню “Премиум”',
		`
			В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.
			Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!
		`,
		20, 
		'img/tabs/elite.jpg',
		'Меню “Премиум”',
		'.menu__field .container',
		'menu__item'
	);

	const leanCard = new MenuCard(
		'Меню "Постное"',
		`
			Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,
			молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.
		`,
		9, 
		'img/tabs/post.jpg',
		'Меню "Постное"',
		'.menu__field .container',
		'menu__item'
	);

	fitnesCard.render();
	premiumCard.render();
	leanCard.render();

	//Forms
	const forms = document.querySelectorAll('form');
	const messages = {
		loading: 'icons/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	}

	

	// ПЕРЕДАЧА В JSON формате
	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.style.cssText = `
				display: block;
				margin: 10px auto 0;
			`;
			statusMessage.src = messages.loading;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});
			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object)
			})
			.then(data => data.text())
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
		postData(item);
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
});

