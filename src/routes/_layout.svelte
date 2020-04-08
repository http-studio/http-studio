<script context='module'>
	import '../../node_modules/ress/ress.css';
	import '../style/base.css';
</script>

<script>
	import { stores } from '@sapper/app';
	import { focusCursor, unfocusCursor } from '../lib/store.js';
	import Link from '../components/Link.svelte';
	import Cursor from '../components/Cursor.svelte';
	import Canvas from '../components/Canvas.svelte';

	const { page } = stores();

	let path;

	page.subscribe(value => {
		if (path !== value.path) {
			path = value.path;

			if (typeof window !== 'undefined') {
				setTimeout(() => {
					window.ga('send', 'pageview');
				}, 250);
			}
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: var(--spacing) var(--spacing) 0;
	}

	.nav-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 var(--spacing) var(--spacing);
	}

	.main {
		padding: 120px 0;
		position: relative;
		z-index: 2;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.error-link {
		display: none;
	}
</style>

<nav class='nav nav-top'>
	<Link href='/'>Http</Link>
	<Link href='/info'>Studio</Link>
</nav>

<main class='main'>
	<slot></slot>
</main>

<nav class='nav nav-bottom'>
	<Link href='mailto:hello@http.studio'>e-mail</Link>
	<Link href='https://www.instagram.com/http.studio/'>instagram</Link>
	<Link href='https://www.are.na/http-studio'>are.na</Link>
</nav>

<div class='error-link'><a href='/404'>404</a></div>
<Canvas/>
<Cursor/>
