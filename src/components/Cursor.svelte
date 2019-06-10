<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import throttle from 'just-throttle';
	import { cursorFocused } from '../lib/store';

	let cursor;

	let clientX = -100;
	let clientY = -100;
	let offset = 30;
	let focused = false;
	let scale = 1;

	const _scale = tweened(1, {
		duration: 200,
		easing: cubicOut
	});

	_scale.subscribe(value => {
		scale = value;
	});

	cursorFocused.subscribe(_focused => {
		_scale.set(_focused ? 0.5 : 1);
		focused = _focused;
	});

	const updateCoordinates = event => {
		clientX = event.clientX;
		clientY = event.clientY;
	};

	const updateOffset = throttle(() => {
		offset = (window.innerWidth < 768 ? 30 : 60) * 0.5;
	}, 30);

	let requestId;

	const render = () => {
		cursor.style.transform = `translate(${clientX - offset}px, ${clientY - offset}px) scale(${scale})`;
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
		z-index: 999;
		top: 0;
		left: 0;
		width: var(--size);
		height: var(--size);
		border-radius: var(--size);
		background-color: var(--purple);
		filter: blur(calc(var(--size) / 4));
		pointer-events: none;
		transform-origin: center;
		transition: filter 0.2s var(--easing);
	}

	.focused {
		filter: none;
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

<div bind:this={cursor} class='cursor' class:focused></div>
