document.addEventListener("DOMContentLoaded", () =>{
	openHeader();
	actionSliderFunction();
	stickyElementFunction();
	initReviewsSlider();
	openTabs();
	accordionFunction();
	fixedHeader();
	animateSectionPosition();
	animateServeBlocks();
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
	const slides = document.querySelectorAll(".move-slide");
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
					spaceBetween: 20,
				},
				550: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				767: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				1023: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
			},
		});
	}
}
const stickyElementFunction =() =>{
	const stikyElement = document.querySelectorAll(".scrolling_item");
  const resizeStikyElement = () => {
    windowInnerWidth = window.innerWidth; 

    if (windowInnerWidth >= 1024 && stikyElement) {
      stikyElement.forEach((stiky, index) => {
        stiky.style.top = `calc(100px + ${50 * index}px)`;
      });
    } else if (windowInnerWidth <= 1023 && stikyElement) {
      stikyElement.forEach((stiky, index) => {
        stiky.style.top = `calc(50px + ${50 * index}px)`;
      });
    }
  };
  resizeStikyElement();
  window.addEventListener("resize", resizeStikyElement);
}
const initReviewsSlider = () =>{
	const reviewsSlider = document.querySelector('.reviewsSlider');
	if(!reviewsSlider) return;
	const reviewsSlide = document.querySelectorAll('.reviews__slider__slide');
	const reviewsBtns = document.querySelectorAll('.reviews__slider-arrow')
	const windowInnerWidth = window.innerWidth;
	if(reviewsSlide.length <= 2 || windowInnerWidth < 768){
		reviewsBtns.forEach((btn) =>{
			btn.style.display = 'none';
		})
	}
	const reviewsSliderinit = new Swiper(reviewsSlider, {
		
		slidesPerView: 1,
		spaceBetween: 10,
		watchOverflow: true,
		breakpoints: {
			
		  767: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			1023: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
		pagination: {
			el: ".reviews__slider-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".reviews__slider-button-next",
			prevEl: ".reviews__slider-button-prev",
		},
	});
}
const openTabs = () => {
	const tabGroups = document.querySelectorAll(".target__wrap"); // Знаходимо всі групи табів

  tabGroups.forEach((group) => {
    const tabsLinks = group.querySelectorAll(".target__list-item");
    const allContentBlocks = group.querySelectorAll(".target__content");
    let frontBlockId = tabsLinks[0].dataset.name; // Перша вкладка активна за замовчуванням

    function addTabsActive() {
      tabsLinks.forEach((button, index) => {
        button.addEventListener("click", () => {
          tabsLinks.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          button.classList.add("active");
          showContent(button.dataset.name, index);
        });
      });
    }

    function updateActiveTab(index) {
      tabsLinks.forEach((button, i) => {
        if (i === index) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }

    function changeSlide(blockId) {
      allContentBlocks.forEach((block) => {
        if (block.getAttribute("id") === blockId) {
          block.style.display = "flex";
          block.style.opacity = 1;
        } else {
          block.style.opacity = 0;
          block.style.display = "none";
        }
      });
      frontBlockId = blockId;
    }

    function showContent(itemName, index) {
      changeSlide(itemName);
      updateActiveTab(index);
    }

    addTabsActive();
    showContent(frontBlockId, 0); 
  });
};
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  
  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
    });
  });
};

document.querySelectorAll('a[href^="#"').forEach(link => {

	link.addEventListener('click', function(e) {
			e.preventDefault();

			let href = this.getAttribute('href').substring(1);

			const scrollTarget = document.getElementById(href);

			const topOffset = document.querySelector('header').offsetHeight;
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;

			window.scrollBy({
					top: offsetPosition,
					behavior: 'smooth'
			});
	});
});

const fixedHeader = () =>{
	let windowInnerWidth = window.innerWidth;
	const headerNav = document.querySelector(".header__bottom");
	let lastScrollTop = 0;

	window.addEventListener("scroll", function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (windowInnerWidth >= 1024) {
			if (scrollTop > lastScrollTop) {
				if (scrollTop > 100) {
					headerNav.classList.add("fixed-header-nav");
					headerNav.style.animationName = "smoothScroll";
				}
			} else if (scrollTop <= 0) {
				headerNav.classList.remove("fixed-header-nav");
				headerNav.style.animationName = "removeSmoothScroll";
			}
			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		}
	});
}
const animateSectionPosition = () =>{
	const sections = document.querySelectorAll(".sectionScroll");
	if(!sections) return;
	const options = {
		root: document,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const callback = function (entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !entry.target.classList.contains("animate")) {
				entry.target.classList.add("animate");
			} else if (
				!entry.isIntersecting &&
				entry.target.classList.contains("animate")
			) {
				entry.target.classList.remove("animate");
			}
		});
	};

	const observer = new IntersectionObserver(callback, options);

	sections.forEach((section) => observer.observe(section));

}

const animateServeBlocks = () =>{
	const sections = document.querySelectorAll(".serve__item");
	if(!sections) return;
	const options = {
		root: document,
		rootMargin: "0px",
		threshold: 0.4,
	};

	const callback = function (entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting && !entry.target.classList.contains("animate")) {
				entry.target.classList.add("animateblocks");
			} else if (
				!entry.isIntersecting &&
				entry.target.classList.contains("animateblocks")
			) {
				entry.target.classList.remove("animateblocks");
			}
		});
	};

	const observer = new IntersectionObserver(callback, options);

	sections.forEach((section) => observer.observe(section));

}