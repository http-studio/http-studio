<script>
	import { onMount } from 'svelte';
	import { bus } from '../lib/eventbus.js';

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';

	onMount(() => {
		const image = new Image();

		image.onload = () => {
			bus.emit('setimage', image);
		};

		image.src = '/error.png';

		return () => {
			bus.emit('resetimage');
		};
	});
</script>

<style>
	.error {
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-S) var(--spacing-M);
	}

	.error h1,
	.error p {
		margin-bottom: calc(var(--spacing-S) / 2);
	}
</style>

<svelte:head>
	<title>{status} | Http Studio</title>
</svelte:head>

<div class='error'>
	<h1>{status}</h1>
	<p>{error.message}</p>
	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>
