<script>
	import { onMount } from 'svelte';

	import {
		roles,
		resetRoles,
		activeLink,
		resetActiveLink
	} from '../store.js';

	import { bus } from '../lib/eventbus.js';

	export let href = '';
	export let title = '';
	export let image = '';
	export let i = 0;

	export let design = true;
	export let development = true;

	let img;

	onMount(() => {
		img = new Image();
		img.src = image;
	});

	const setRoles = () => {
		roles.set({ design, development });
	};

	const setImage = () => {
		bus.emit('setimage', img);
	};

	const resetImage = () => {
		bus.emit('resetimage');
	};
</script>

<style>
	.link {
		--border-width: 1px;
		margin: 2px;
		padding: calc(var(--spacing-S) / 5) calc(var(--spacing-S) / 1.5);
		border: var(--border-width) solid var(--purple);
		border-radius: 999px;
		color: var(--purple);
		background-color: var(--white);
		transition: color 0.4s var(--easing), background-color 0.4s var(--easing);
	}

	@media (min-width: 768px) {
		.link {
			--border-width: 2px;
			padding: calc(var(--spacing-S) / 5) calc(var(--spacing-S) / 2);
		}
	}

	.link.active,
	.link:hover {
		color: var(--white);
		background-color: var(--purple);
	}
</style>

<a
	class='link'
	class:active={i === $activeLink}
	target='_blank'
	rel='noopener noreferrer'
	{href}
	on:mouseenter={setImage}
	on:mouseleave={resetImage}
	on:mouseenter={setRoles}
	on:mouseleave={resetRoles}
>{title}</a>
