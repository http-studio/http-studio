<script>
	import { onMount } from 'svelte';
	import { bus } from '../lib/eventbus.js';

	let hover = false;
	let image;

	const startDrawing = () => {
		bus.emit('setimage', image);
	};

	const stopDrawing = () => {
		bus.emit('resetimage');
	};

	onMount(() => {
		hover = window.matchMedia('(hover: hover)').matches;

		image = new Image();
		image.src = '/us.png';

		if (!hover) {
			document.documentElement.addEventListener('touchstart', startDrawing);
			document.documentElement.addEventListener('touchend', stopDrawing);

			return () => {
				document.documentElement.removeEventListener('touchstart', startDrawing);
				document.documentElement.removeEventListener('touchend', stopDrawing);
			};
		}
	});
</script>

<style>
	.page {
		width: 80vw;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		padding: var(--spacing) var(--spacing) calc(var(--spacing) + 1em);
		text-align: center;
		hyphens: auto;
	}

	@media (min-width: 768px) {
		.page {
			max-width: 800px;
		}
	}
</style>

<svelte:head>
	<title>Info | Http Studio</title>
</svelte:head>

<div class='page'>
	<p>
		A design and development studio with a focus on identity, web, and technology projects.
		Founded by <span on:mouseenter={startDrawing} on:mouseleave={stopDrawing}>Nicholas Christowitz and Nikolai Sivertsen</span>.
	</p>
</div>
