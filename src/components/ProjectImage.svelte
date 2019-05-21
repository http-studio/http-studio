<script>
	import { onMount } from 'svelte';

	export let src = '';

	let clientX = -100;
	let clientY = -100;

	let container;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	let requestId;

	const render = () => {
		container.style.transform = `translate(${clientX}px, ${clientY}px)`;
		requestId = requestAnimationFrame(render);
	};

	onMount(() => {
		document.addEventListener('mousemove', updateCoordinates);
		requestId = requestAnimationFrame(render);

		return () => {
			document.removeEventListener('mousemove', updateCoordinates);
			cancelAnimationFrame(requestId);
		};
	});
</script>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 300px;
		height: 300px;
		pointer-events: none;
	}

	.project-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>

<div bind:this={container} class='container'>
	<img class='project-image' {src} alt=''>
</div>
