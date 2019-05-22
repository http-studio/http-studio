<script context='module'>
	import '../../node_modules/ress/ress.css';
	import '../style/base.css';
</script>

<script>
	import { stores } from '@sapper/app';
	import Cursor from '../components/Cursor.svelte';
	import ProjectImage from '../components/ProjectImage.svelte';

	const { page } = stores();

	let path;

	page.subscribe(value => {
		if (path !== value.path) {
			path = value.path;

			setTimeout(() => {
				window.ga('send', 'pageview');
			}, 250);
		}
	});
</script>

<style>
	.nav {
		z-index: 2;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		user-select: none;
	}

	.nav-top {
		padding: var(--spacing-S) var(--spacing-M) 0;
	}

	.nav-bottom {
		padding: 0 var(--spacing-M) var(--spacing-S);
	}

	.main {
		flex: 1;
		position: relative;
		z-index: 2;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
</style>

<nav class='nav nav-top'>
	<a rel='prefetch' href='/'>Http</a>
	<a rel='prefetch' href='/'>Studio</a>
</nav>

<main class='main'>
	<slot></slot>
</main>

<nav class='nav nav-bottom'>
	<a href='mailto:hello@http.studio'>e-mail</a>
	<a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/http.studio/'>instagram</a>
	<a target='_blank' rel='noopener noreferrer' href='https://www.are.na/http-studio'>are.na</a>
</nav>

<ProjectImage/>
<Cursor/>
