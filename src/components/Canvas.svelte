<script>
	import { onMount } from 'svelte';
	import throttle from 'just-throttle';
	import { bus } from '../lib/eventbus.js';

	let clientX = -1000;
	let clientY = -1000;

	let canvas;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	const updateTouchCoordinates = event => {
		clientX = event.changedTouches[0].clientX;
		clientY = event.changedTouches[0].clientY;
	};

	const scaleCanvas = throttle(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		const dpr = window.devicePixelRatio || 1;

		canvas.width = width * dpr;
		canvas.height = height * dpr;

		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext('2d');

		ctx.scale(dpr, dpr);
		ctx.imageSmoothingEnabled = false;
	}, 30);

	onMount(() => {
		const isTouch = 'ontouchstart' in window;

		if (isTouch) {
			document.addEventListener('touchstart', updateTouchCoordinates);
			document.addEventListener('touchmove', updateTouchCoordinates);
		} else {
			document.addEventListener('mousemove', updateCoordinates);
		}

		window.addEventListener('resize', scaleCanvas);

		scaleCanvas();

		let requestId;
		const ctx = canvas.getContext('2d');

		bus.on('setimage', image => {
			if (image instanceof Image) {
				const { naturalWidth, naturalHeight } = image;

				const bounds = 0.85 * Math.min(window.innerWidth, window.innerHeight);

				let dWidth;
				let dHeight;

				if (naturalWidth > naturalHeight) {
					dWidth = bounds;
					dHeight = bounds * naturalHeight / naturalWidth;
				} else {
					dWidth = bounds * naturalWidth / naturalHeight;
					dHeight = bounds;
				}

				const render = () => {
					const dx = clientX - dWidth / 2;
					const dy = clientY - dHeight / 2;

					ctx.drawImage(image, dx, dy, dWidth, dHeight);

					requestId = requestAnimationFrame(render);
				};

				requestId = requestAnimationFrame(render);
			}
		});

		bus.on('resetimage', () => {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			cancelAnimationFrame(requestId);
		});

		return () => {
			document.removeEventListener('mousemove', updateCoordinates);
			cancelAnimationFrame(requestId);
		};
	});
</script>

<style>
	.canvas {
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		pointer-events: none;
		touch-action: none;
	}
</style>

<canvas bind:this={canvas} class='canvas'></canvas>
