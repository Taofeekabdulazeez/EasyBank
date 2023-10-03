'use strict';

//////////////////////////////////////////
const btnOpenModal = document.querySelector('.cta__link');
const btnCloseModal = document.querySelector('.btn__close-modal');
const btnSignUp = document.querySelector('.sign-up__link');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  document.body.classList.add('open');
};

const closeModal = function (e) {
  document.body.classList.remove('open');
  if (e.key == 'Escape') document.body.classList.remove(open);
};

btnSignUp.addEventListener('click', openModal);
btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//////////////////////////////////////////
const header = document.querySelector('.header');
const btnOpenNav = document.querySelector('.btn__nav--open');
const btnCloseNav = document.querySelector('.btn__nav--close');

const openNav = function () {
  header.classList.add('nav--open');
};

const closeNav = function () {
  header.classList.remove('nav--open');
};

btnOpenNav.addEventListener('click', openNav);
btnCloseNav.addEventListener('click', closeNav);

////////////////////////////////////////////////////////

const nav = document.querySelector('.main__nav');
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      nav.classList.remove('sticky');
    }
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

//////////////////////////////////////////////////////////
const sections = document.querySelectorAll('section');

sections.forEach(section => section.classList.add('scale'));

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('scale');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

sections.forEach(section => sectionObserver.observe(section));

////////////////////////////////////////////////////
const tabsContainer = document.querySelector('.operations__tabs');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');
  if (!clickedTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////
const slider = document.querySelector('.slider');
const btnNextSlide = document.querySelector('.btn__slide--next');
const btnPrevSlide = document.querySelector('.btn__slide--prev');
const slides = [...document.querySelectorAll('.slide')];
const dotsContainer = document.querySelector('.dots__container');

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dot" data-slide=${i}></button>`
    );
  });
  return document.querySelectorAll('.dot');
};

const dots = createDots();

let currentSlide = 0;
const minSlide = 0;
const maxSlide = slides.length - 1;

const gotoSlide = function (currentSlide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
  });
};

gotoSlide(0);

const nextSlide = function () {
  currentSlide == maxSlide ? (currentSlide = minSlide) : currentSlide++;
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  currentSlide == minSlide ? (currentSlide = maxSlide) : currentSlide--;
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

const activateDot = function (currentSlide) {
  dots.forEach(dot => dot.classList.remove('dot__active'));
  dots[currentSlide].classList.add('dot__active');
};
activateDot(0);

dotsContainer.addEventListener('click', function (e) {
  const clickedDot = e.target.closest('.dot');
  if (!clickedDot) return;

  currentSlide = Number(clickedDot.dataset.slide);
  gotoSlide(currentSlide);
  activateDot(currentSlide);
});

btnNextSlide.addEventListener('click', nextSlide);
btnPrevSlide.addEventListener('click', prevSlide);

//////////////////////////////////////////////////////////
const lazyImgs = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy--img');
    });
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '150px',
  }
);

lazyImgs.forEach(img => imgObserver.observe(img));


////////////////////////////////////////////////////

let slideDistance = 0;
let startPositon = 0;

const getPositionX = function (e) {
  return e.touches[0].pageX;
};

slides.forEach(slide => {
  slide.addEventListener(
    'touchstart',
    event => (startPositon = getPositionX(event))
  );

  slide.addEventListener(
    'touchmove',
    event => (slideDistance = getPositionX(event))
  );

  slide.addEventListener('touchend', () => {
    if (startPositon > 200 && slideDistance < 280) nextSlide();
    if (startPositon < 200 && slideDistance > 200) prevSlide();
  });
});

//////////////////////////////////////////////////////////
const navLinks = document.querySelectorAll('.nav__link');
const scrollToSection = function (section) {
  // const section = sect | this;
  console.log(section);
  section.scrollIntoView({
    behavior: 'smooth',
  });
};

navLinks.forEach((navLink, i) => {
  navLink.addEventListener('click', event => {
    event.preventDefault();

    if (header.classList.contains('nav--open')) {
      closeNav();
      setTimeout(() => scrollToSection(sections[i]), 1000);
      return;
    }
    scrollToSection(sections[i]);
  });
});

document
  .querySelector('.intro__content .cta__link')
  .addEventListener('click', event => {
    event.preventDefault();
    scrollToSection(sections[0]);
  });

///////////////////////////////////////////////
const modalCookie = document.querySelector('.modal__cookie');
const btnHideCookie = document.querySelector('.btn__close--cookie');
const btnAcceptCookie = document.querySelector('.btn__accept');

const showCookie = function () {
  modalCookie.classList.remove('hide');
};

const closeCookie = function () {
  modalCookie.classList.add('hide');
  setTimeout(() => (modalCookie.style.display = 'none'), 1000);
};

setTimeout(showCookie, 2000);
// window.addEventListener('load', showCookie)
btnHideCookie.addEventListener('click', closeCookie);
btnAcceptCookie.addEventListener('click', closeCookie);
