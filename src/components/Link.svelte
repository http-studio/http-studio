<script>
	import {
		roles,
		resetRoles,
		projectImage,
		resetProjectImage
	} from '../store.js';

	export let href = '';
	export let title = '';
	export let image = '';

	export let design = true;
	export let development = true;

	const setRoles = () => {
		roles.set({ design, development });
	};

	const setProjectImage = () => {
		projectImage.set(image);
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

	.link:hover {
		color: var(--white);
		background-color: var(--purple);
	}
</style>

<a
	class='link'
	target='_blank'
	rel='noopener noreferrer'
	{href}
	on:mouseenter={setRoles}
	on:mouseenter={setProjectImage}
	on:mouseleave={resetRoles}
	on:mouseleave={resetProjectImage}
>{title}</a>
