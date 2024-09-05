<script lang="ts">
	import MoonStars from 'phosphor-svelte/lib/MoonStars'
	import Sun from 'phosphor-svelte/lib/Sun'
	export let theme: string

	const setTheme = (currentTheme: string) => {
		theme = currentTheme
		const themeRoot = document.getElementById('theme')
		if (!themeRoot) return

		themeRoot.classList.remove('dark', 'light')
		themeRoot.classList.add(currentTheme)

		document.cookie = `theme=${currentTheme}; path=/; max-age=31536000`
	}
</script>

<div>
	<button
		type="button"
		class="light-dark-mode text-xl px-4 h-[70px] text-gray-600 dark:text-gray-100"
		on:click={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
	>
		{#if theme === 'dark'}
			<Sun size={20} weight="bold" class="h-5 w-5" />
		{:else}
			<MoonStars size={24} weight="bold" class="h-5 w-5" />
		{/if}
	</button>
</div>
