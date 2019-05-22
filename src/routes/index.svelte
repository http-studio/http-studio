<script context='module'>
	export function preload({ params, query }) {
		return this.fetch('links.json').then(r => r.json()).then(links => {
			return { links };
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { bus } from '../lib/eventbus.js';
	import { roles, projectImage } from '../store.js';
	import Link from '../components/Link.svelte';
	import ProjectImage from '../components/ProjectImage.svelte';

	export let links = [];

	let images;
	let index = 0;

	$: {
		images = typeof window !== 'undefined'
			? links.map(link => {
				const image = new Image();
				image.src = link.image;
				return image;
			})
			: [null];
	}

	let hover = false;

	onMount(() => {
		hover = window.matchMedia('(hover: hover)').matches;

		if (!hover) {
			document.documentElement.addEventListener('touchstart', event => {
				bus.emit('setimage', images[index]);

				index = (index + 1) % images.length;

				document.documentElement.addEventListener('touchend', event => {
					bus.emit('resetimage');
				});
			});
		}
	});
</script>

<style>
	.content {
		position: relative;
		z-index: 1;
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto 1fr;
		padding: 0 var(--spacing-M);
	}

	.intro {
		display: flex;
		flex-flow: column;
		justify-content: center;
	}

	.intro p {
		text-align: center;
	}

	.strikethrough {
		text-decoration: line-through;
	}

	.links {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}
</style>

<svelte:head>
	<title>Http Studio</title>
</svelte:head>

<div class='content'>
	<div class='intro'>
		<p>
			<span class:strikethrough={!$roles.design}>Design</span> and
			<span class:strikethrough={!$roles.development}>development</span><br>
			for glowing rectangles
		</p>
	</div>

	<div class='links'>
		{#each links as link}
			<Link {...link}/>
		{/each}
	</div>

	<div class='spacer'></div>
</div>

<ProjectImage src={$projectImage}/>
