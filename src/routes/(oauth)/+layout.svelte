<script lang="ts">
	export let data
	import { websiteName } from '$lib/stores'

	// Images
	import loginImage from '$lib/images/login-image.svg'
	import logoWhite from '$lib/images/logo-white.svg'
	import logo from '$lib/images/logo.svg'

	// ** Icons :
	import Briefcase from 'phosphor-svelte/lib/Briefcase'
	import Buildings from 'phosphor-svelte/lib/Buildings'
	import Users from 'phosphor-svelte/lib/Users'
	import Heart from 'phosphor-svelte/lib/Heart'

	// dark mode :
	import MoonStars from 'phosphor-svelte/lib/MoonStars'
	import Sun from 'phosphor-svelte/lib/Sun'
	export let theme: string = data.theme

	const setTheme = (currentTheme: string) => {
		theme = currentTheme
		const themeRoot = document.getElementById('theme')
		if (!themeRoot) return

		themeRoot.classList.remove('dark', 'light')
		themeRoot.classList.add(currentTheme)

		document.cookie = `theme=${currentTheme}; path=/; max-age=31536000`
	}
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 min-h-screen dark:bg-gray-900">
	<div
		class="flex flex-col shrink gap-4 items-center justify-evenly max-h-screen overflow-y-auto font-primary bg-slate-50 dark:bg-gray-800"
	>
		<!-- Headers -->
		<div class="lg:self-start lg:ml-[10%] my-[3%]">
			<a href="/">
				<img src={logo} alt="Logo" class="dark:hidden" />
				<img src={logoWhite} alt="Logo" class="hidden dark:block" />
			</a>
		</div>

		<!-- Main Form -->
		<div class="flex items-center justify-center max-lg:mx-4">
			<div
				class="border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-md lg:max-w-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] dark:shadow-[0_2px_22px_-4px_rgba(0,0,0,0.7)] max-md:mx-auto"
			>
				<slot />
			</div>
		</div>

		<!-- Footer -->
		<div class="w-full my-2 text-center">
			<p
				class="flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm leading-relaxed"
			>
				© {new Date().getFullYear()}
				{websiteName} . Crafted with <Heart size={16} weight="fill" class="text-red-500 ml-2" />
			</p>
		</div>
	</div>

	<div class="max-lg:hidden flex flex-col items-center justify-evenly">
		<div class="inset-0 flex flex-col items-center justify-center text-center">
			<h1 class="font-secondary text-violet-700 dark:text-violet-400 text-3xl font-bold mb-8 mt-8">
				Over 1,750,324 candidates waiting for good employees.
			</h1>
			<div class="flex space-x-8 font-secondary">
				<div class="flex flex-col items-center">
					<Users size={28} weight="fill" class="text-violet-500 dark:text-violet-300" />
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">1,750,324</span>
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">Users</span>
				</div>
				<div class="flex flex-col items-center">
					<Briefcase size={28} weight="fill" class="text-violet-500 dark:text-violet-300" />
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">50,000</span>
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">Jobs</span>
				</div>
				<div class="flex flex-col items-center">
					<Buildings size={28} weight="fill" class="text-violet-500 dark:text-violet-300" />
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">10,000</span>
					<span class="text-violet-700 dark:text-violet-400 text-lg font-bold mt-2">Companies</span>
				</div>
			</div>
		</div>

		<div class="lg:h-3/4 lg:w-3/4 bg-white dark:bg-gray-800">
			<img
				src={loginImage}
				class="w-full h-full max-md:w-4/5 mx-auto block object-cover"
				alt="Bg"
			/>
		</div>
	</div>
</div>

<button
	id="darkModeToggle"
	class="fixed bottom-4 right-4 bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-900 p-2 rounded-full shadow-lg"
	on:click={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
>
	{#if theme === 'dark'}
		<Sun size={20} weight="bold" class="h-5 w-5" />
	{:else}
		<MoonStars size={24} weight="bold" class="h-5 w-5" />
	{/if}
</button>
