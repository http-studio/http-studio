<script>
	import { onMount } from 'svelte';
	import throttle from 'just-throttle';

	let clientX = -100;
	let clientY = -100;
	let offset = 0;

	let cursor;

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	const updateOffset = throttle(() => {
		offset = window.innerWidth < 768 ? 15 : 30;
	}, 30);

	let requestId;

	const render = () => {
		cursor.style.transform = `translate(${clientX - offset}px, ${clientY - offset}px)`;
		requestId = requestAnimationFrame(render);
	};

	onMount(() => {
		if (window.matchMedia('(hover: hover)').matches) {
			document.addEventListener('mousemove', updateCoordinates);
			window.addEventListener('resize', updateOffset);

			updateOffset();

			requestId = requestAnimationFrame(render);

			return () => {
				document.removeEventListener('mousemove', updateCoordinates);
				window.removeEventListener('resize', updateOffset);
				cancelAnimationFrame(requestId);
			};
		}
	});
</script>

<style>
	.cursor {
		--size: 30px;

		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: var(--size);
		height: var(--size);
		border-radius: var(--size);
		background-color: var(--purple);
		filter: blur(calc(var(--size) / 4));
		pointer-events: none;
	}

	@media (min-width: 768px) {
		.cursor {
			--size: 60px;
		}
	}

	@media (hover: hover) {
		:global(body) {
			cursor: none;
		}

		:global(a) {
			cursor: none;
		}

		.cursor {
			display: block;
		}
	}
</style>

<div bind:this={cursor} class='cursor'></div>
