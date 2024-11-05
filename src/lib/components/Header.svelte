<script lang="ts">
	export let title: string;
	export let onReset: () => void; // A function passed in to handle reset logic
</script>

<header class="flex items-center justify-between bg-blue-600 p-4 text-white shadow-md">
	<h1 class="flex-1 text-center text-2xl font-bold">{title}</h1>
	<button
		class="rounded bg-green-500 px-4 py-1 text-white transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-400"
		on:click={onReset}
	>
		New Game
	</button>
</header>
