<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<PageTitle
	title="Dashboard"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'view', link: null }
	]}
/>
<div class="px-8 py-12 font-[sans-serif]">
	<div class="max-w-6xl mx-auto grid md:grid-cols-2 justify-center items-center gap-12">
		<div class="text-center md:text-left">
			<h2 class="text-4xl lg:text-5xl font-extrabold text-violet-500 mb-6 md:!leading-[55px]">
				Welcome back!
			</h2>
			<p class="text-lg lg:text-xl text-violet-400">
				Explore the latest updates and features of the platform.
			</p>
		</div>
		<div class="text-center">
			<img src="https://readymadeui.com/management-img.webp" alt="Banner" class="w-full mx-auto" />
		</div>
	</div>
</div>

<h1 class="text-3xl font-bold text-gray-500 leading-tight font-primary my-12 mx-2">
	Here's a quick overview
</h1>

{#await data.stats}
	<div class="flex justify-center items-center">
		<div
			class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
		>
			<span class="hidden">Loading...</span>
		</div>
	</div>
{:then stats}
	<div class="grid grid-cols-1 gap-6 gap-y-0 2xl:gap-6 md:grid-cols-2 2xl:grid-cols-4 mb-32">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600 font-primary">
			<div class="card-body">
				<div>
					<div class="grid items-center grid-cols-12 gap-6">
						<div class="col-span-12">
							<span class="text-gray-700 dark:text-zinc-100">Number of Companies</span>
							<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
								<span class="counter-value text-5xl" data-target={stats.number_of_companies}
									>{stats.number_of_companies}</span
								>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<div>
					<div class="grid items-center grid-cols-12 gap-6">
						<div class="col-span-12">
							<span class="text-gray-700 dark:text-zinc-100">Number of Employers</span>
							<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
								<span class="counter-value text-5xl" data-target={stats.number_of_employers}
									>{stats.number_of_employers}</span
								>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<div>
					<div class="grid items-center grid-cols-12 gap-6">
						<div class="col-span-12">
							<span class="text-gray-700 dark:text-zinc-100">Number of Job Seekers</span>
							<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
								<span class="counter-value text-5xl" data-target={stats.number_of_job_seekers}
									>{stats.number_of_job_seekers}</span
								>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<div>
					<div class="grid items-center grid-cols-12 gap-6">
						<div class="col-span-12">
							<span class="text-gray-700 dark:text-zinc-100">Number of Job Posts</span>
							<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
								<span class="counter-value text-5xl" data-target={stats.number_of_job_posts}
									>{stats.number_of_job_posts}</span
								>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/await}
