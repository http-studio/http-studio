<script>
	import { stores } from '@sapper/app';
	import { focusCursor, unfocusCursor } from '../lib/store.js';

	const { page } = stores();

	export let href;

	let external;
	let target;
	let rel;

	$: {
		external = /(^https?:\/\/)|(^mailto:)/.test(href);
		target = external ? '_blank' : '_self';
		rel = external ? 'noopener' : 'prefetch';
	}
</script>

<style>
	.strikethrough {
		text-decoration: line-through;
	}

	.strikethrough:hover {
		text-decoration: none;
	}
</style>

<a
	{target}
	{rel}
	{href}
	on:mouseenter={focusCursor}
	on:mouseleave={unfocusCursor}
	class:strikethrough={$page.path !== '/' && $page.path === href}
><slot></slot></a>
