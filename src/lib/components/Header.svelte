<script lang="ts">
	export let title: string;
	export let onReset: () => void;
</script>

<header
	class="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-lg"
>
	<!-- Title with Decorative Border and Centered Alignment -->
	<h1 class="flex-1 text-center text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
		{title}
	</h1>

	<!-- New Game Button with Modern Styling -->
	<button
		class="flex items-center space-x-2 rounded-full bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
		on:click={onReset}
	>
		<!-- Add Icon to Button (Optional) -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 4v1m0 14v1m8-8h1m-14 0H3m15.364-7.364l.707.707M6.343 6.343l-.707.707m12.728 12.728l.707.707M6.343 17.657l-.707.707M12 2a10 10 0 100 20 10 10 0 000-20z"
			/>
		</svg>
		<span>New Game</span>
	</button>
</header>
