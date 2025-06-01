<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<nav class="mx-auto w-full max-w-screen-lg">
	<div class="m-4 flex h-14 items-center gap-4 rounded bg-zinc-500/10 px-4 font-medium shadow-md">
		<a
			class={`border-b-2 ${page.url.pathname === '/' ? 'border-zinc-500' : 'border-transparent hover:border-zinc-500'}`}
			href="/"
		>
			Home
		</a>
		<a
			class={`border-b-2 ${page.url.pathname === '/add' ? 'border-zinc-500' : 'border-transparent hover:border-zinc-500'}`}
			href="/add"
		>
			Add
		</a>
	</div>
</nav>

<main class="mx-auto w-full max-w-screen-lg px-4">
	{@render children()}
</main>
