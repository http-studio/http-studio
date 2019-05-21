<script context='module'>
	import '../style/base.css';
</script>

<style>
	.nav {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: var(--spacing-S) var(--spacing-M);
	}

	main {
		flex: 1;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
</style>

<nav class='nav nav-top'>
	<a href='/'>Http</a>
	<a href='/'>Studio</a>
</nav>

<main>
	<slot></slot>
</main>

<nav class='nav nav-bottom'>
	<a href='mailto:hello@http.studio'>e-mail</a>
	<a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/http.studio/'>instagram</a>
	<a target='_blank' rel='noopener noreferrer' href='https://www.are.na/http-studio'>are.na</a>
</nav>
