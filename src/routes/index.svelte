<style>
	.content {
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

	.links {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}

	.link {
		margin: 2px;
		padding: calc(var(--spacing-S) / 5) calc(var(--spacing-S) / 2);
		border: 1px solid;
		border-radius: 999px;
		color: var(--purple);
	}

	.link:hover {
		color: var(--black);
	}
</style>

<svelte:head>
	<title>Http Studio</title>
</svelte:head>

<div class='content'>
	<div class='intro'>
		<p>
			Design and development<br>
			for glowing rectangles
		</p>
	</div>
	<div class='links'>
		<a class='link' target='_blank' rel='noopener noreferrer' href='https://lauragerte.com'>lauragerte.com</a>
		<a class='link' target='_blank' rel='noopener noreferrer' href='https://nicholaschristowitz.com'>nicholaschristowitz.com</a>
		<a class='link' target='_blank' rel='noopener noreferrer' href='https://iloveyou-magazine.com'>iloveyou-magazine.com</a>
		<a class='link' target='_blank' rel='noopener noreferrer' href='https://beige.de'>beige.de</a>
	</div>
	<div class='spacer'></div>
</div>
