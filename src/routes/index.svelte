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
	import {
		roles,
		resetRoles,
		activeLink,
		resetActiveLink
	} from '../lib/store.js';
	import ProjectLink from '../components/ProjectLink.svelte';

	export let links = [];

	let _links;
	let index = 0;

	$: {
		_links = typeof window !== 'undefined'
			? links.map(link => {
				const image = new Image();
				image.src = link.imageSrc;
				return { ...link, image };
			})
			: links
	}

	const startDrawing = event => {
		const link = _links[index];

		if (link) {
			bus.emit('setimage', link.image);
			activeLink.set(index);
			roles.set({
				design: link.design,
				development: link.development
			});
		}

		index = (index + 1) % _links.length;
	};

	const stopDrawing = event => {
		bus.emit('resetimage');
		resetActiveLink();
		resetRoles();
	};

	onMount(() => {
		if (!window.matchMedia('(hover: hover)').matches) {
			document.documentElement.addEventListener('touchstart', startDrawing);
			document.documentElement.addEventListener('touchend', stopDrawing);

			return () => {
				document.documentElement.removeEventListener('touchstart', startDrawing);
				document.documentElement.removeEventListener('touchend', stopDrawing);
			}
		}
	});
</script>

<style>
	.content {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto 1fr;
		padding: 0 var(--spacing);
		user-select: none;
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
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		width: 85vw;
		max-width: 650px;
		margin: 0 auto;
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
		{#each _links as link, i}
			<ProjectLink {...link} {i}/>
		{/each}
	</div>

	<div class='spacer'></div>
</div>
