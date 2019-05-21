<script>
	export let href = '';
	export let title = '';
</script>

<style>
	.link {
		margin: 2px;
		padding: calc(var(--spacing-S) / 5) calc(var(--spacing-S) / 2);
		border: 2px solid var(--purple);
		border-radius: 999px;
		color: var(--purple);
		transition: color 0.4s var(--easing), background-color 0.4s var(--easing);
	}

	.link:hover {
		color: var(--white);
		background-color: var(--purple);
	}
</style>

<a class='link' target='_blank' rel='noopener noreferrer' {href}>{title}</a>
