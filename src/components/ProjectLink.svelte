<script>
	import { onMount } from 'svelte';
	import { focusCursor, unfocusCursor } from '../lib/store.js';

	import {
		roles,
		resetRoles,
		activeLink
	} from '../lib/store.js';

	import { bus } from '../lib/eventbus.js';

	export let href = '';
	export let title = '';
	export let image = null;
	export let imageSrc = '';
	export let i = 0;
	export let design = true;
	export let development = true;

	let hover = false;

	onMount(() => {
		hover = window.matchMedia('(hover: hover)').matches;
	});

	const setProject = () => {
		if (hover) {
			bus.emit('setimage', image);
			roles.set({ design, development });
		}
	};

	const resetProject = () => {
		if (hover) {
			bus.emit('resetimage');
			resetRoles();
		}
	};
</script>

<style>
	.project-link {
		--border-width: 1px;
		margin: 2px;
		padding: calc(var(--spacing) / 5) calc(var(--spacing) / 1.5);
		border: var(--border-width) solid var(--purple);
		border-radius: 999px;
		color: var(--purple);
		background-color: var(--white);
		transition: color 0.4s var(--easing), background-color 0.4s var(--easing);
	}

	@media (min-width: 768px) {
		.project-link {
			--border-width: 2px;
			padding: calc(var(--spacing) / 5) calc(var(--spacing) / 2);
		}
	}

	.project-link.active,
	.project-link:hover {
		color: var(--white);
		background-color: var(--purple);
	}
</style>

<a
	class='project-link'
	class:active={i === $activeLink}
	target='_blank'
	rel='noopener'
	{href}
	on:mouseenter={setProject}
	on:mouseenter={focusCursor}
	on:mouseleave={resetProject}
	on:mouseleave={unfocusCursor}
>{title}</a>
