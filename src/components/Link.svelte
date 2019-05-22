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
		margin: 2px;
		padding: calc(var(--spacing-S) / 5) calc(var(--spacing-S) / 2);
		border: 2px solid var(--purple);
		border-radius: 999px;
		color: var(--purple);
		background-color: var(--white);
		transition: color 0.4s var(--easing), background-color 0.4s var(--easing);
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
