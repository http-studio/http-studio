<script>
	import { onMount } from 'svelte';

	let clientX = -100;
	let clientY = -100;

	let cursor;

	onMount(() => {
		const hover = window.matchMedia('(hover: hover)').matches;

		if (hover) {
			document.addEventListener('mousemove', event => {
				clientX = event.clientX;
				clientY = event.clientY;
			});

			const render = () => {
				cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
				requestAnimationFrame(render);
			};

			requestAnimationFrame(render);
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
