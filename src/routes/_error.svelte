<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
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
		margin-bottom: 1em;
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class='error'>
	<h1>{status}</h1>
	<p>{error.message}</p>
	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>
