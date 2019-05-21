import throttle from 'just-throttle';

// Work around Mobile Safari viewport height problem
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

const setViewportHeightProperty = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setViewportHeightProperty();

window.addEventListener('resize', throttle(setViewportHeightProperty, 30));
