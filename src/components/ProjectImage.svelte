<script>
	import { onMount } from 'svelte';

	export let src = '';

	let clientX = -100;
	let clientY = -100;

	let canvas;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	let requestId;

	onMount(() => {
		document.addEventListener('mousemove', updateCoordinates);

		const width = window.innerWidth;
		const height = window.innerHeight;

		const dpr = window.devicePixelRatio || 1;

		canvas.width = width * dpr;
		canvas.height = height * dpr;

		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		const ctx = canvas.getContext('2d');

		ctx.scale(dpr, dpr);

		const image = new Image();

		image.onload = () => {
			const { naturalWidth, naturalHeight } = image;

			const dWidth = 500;
			const dHeight = 500 * naturalHeight / naturalWidth;

			const render = () => {
				const dx = clientX - dWidth / 2;
				const dy = clientY - dHeight / 2;

				ctx.drawImage(image, dx, dy, dWidth, dHeight);

				requestId = requestAnimationFrame(render);
			};

			requestId = requestAnimationFrame(render);
		};

		image.src = src;

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
