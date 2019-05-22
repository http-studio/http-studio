<script>
	import { onMount } from 'svelte';

	export let src = '';

	let clientX = -100;
	let clientY = -100;

	let canvas;

	let width;
	let height;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	let requestId;

	onMount(() => {
		document.addEventListener('mousemove', updateCoordinates);

		const ctx = canvas.getContext('2d');

		const image = new Image();
		image.src = src;

		const render = () => {
			ctx.drawImage(image, clientX, clientY, 400, 312);

			requestId = requestAnimationFrame(render);
		};

		requestId = requestAnimationFrame(render);

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

<svelte:window bind:innerWidth={width} bind:innerHeight={height}/>

<canvas bind:this={canvas} class='canvas' {width} {height} style='width: {width}px; height: {height}px;'></canvas>
