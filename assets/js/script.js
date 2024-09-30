document.addEventListener("DOMContentLoaded", () =>{
	openHeader();
	actionSliderFunction();
});

const openHeader = () =>{
	const htmlElement = document.querySelector('html');
	const burgerBtn = document.querySelector('.burger');
const navLinks = document.querySelectorAll('nav ul a');
burgerBtn.addEventListener('click', () =>{
	htmlElement.classList.toggle('open');
});

navLinks.forEach((link) =>{
	link.addEventListener('click', () =>{
		htmlElement.classList.remove('open');
	})
})
}
const actionSliderFunction = () =>{
	const actionSliderInit = document.querySelector(".moveSlider");
	var slides = document.querySelectorAll(".move-slide");
	slides.forEach((slide, index) => {
		if (index % 2 === 0) {
			slide.classList.add("even");
		} else {
			slide.classList.add("odd");
		}
	});
	
	if (actionSliderInit) {
		const sliderAction = new Swiper(".moveSlider", {
			slidesPerView: 2,
			spaceBetween: 10,
			watchOverflow: true,
			loop: true,
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
				},
				speed: 3000,
			breakpoints: {
				367: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				550: {
					slidesPerView: 4,
					spaceBetween: 10,
				},
				767: {
					slidesPerView: 5,
					spaceBetween: 10,
				},
				1023: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
			},
		});
	}
}
