<script>
	import { onMount } from 'svelte';
	import { bus } from '../lib/eventbus.js';

	let clientX = -100;
	let clientY = -100;

	let canvas;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	const updateTouchCoordinates = event => {
		clientX = e.changedTouches[0].clientX;
		clientY = e.changedTouches[0].clientY;
	};

	let requestId;

	onMount(() => {
		const isTouch = 'ontouchstart' in window;

		if (isTouch) {
			document.addEventListener('touchmove', updateCoordinates);
		} else {
			document.addEventListener('mousemove', updateTouchCoordinates);
		}

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

		bus.on('setimage', image => {
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
		top: 0;
		left: 0;
		pointer-events: none;
		touch-action: none;
	}
</style>

<canvas bind:this={canvas} class='canvas'></canvas>
