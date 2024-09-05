<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'

	import type { PageData } from './$types'
	import { onMount } from 'svelte'
	export let data: PageData

	import computer from '$lib/images/computer.svg'
	import study from '$lib/images/study.svg'
	import todo from '$lib/images/todo.svg'

	let currentIndex = 0
	let images = [computer, study, todo]

	onMount(() => {
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length
		}, 3000)

		return () => clearInterval(interval)
	})
</script>

<PageTitle
	title="Dashboard"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'view', link: null }
	]}
/>

<div class="bg-gray-50 w-full rounded overflow-hidden">
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
		<div class="lg:col-span-2 py-10 px-6">
			<h1 class="text-gray-800 text-3xl font-bold">
				Master the Art of Job Seeking and Unlock Possibilities!
			</h1>
			<p class="mt-4 text-sm text-gray-500 font-secondary">
				Explore the latest updates and features of the platform. Get started with the best job
				search experience. Apply for jobs, get job invitations, and increase your profile views.
			</p>
			<button
				type="button"
				class="px-5 py-3 mt-8 rounded text-white text-sm tracking-wider font-medium border-none outline-none bg-violet-600 hover:bg-blue-700"
				>Get started</button
			>
		</div>

		<div class="relative w-full h-full">
			{#each images as image, index}
				<img
					src={image}
					alt="Slider"
					class="absolute w-full h-full object-cover shrink-0 transition-opacity duration-1000 ease-in-out"
					class:opacity-100={index === currentIndex}
					class:opacity-0={index !== currentIndex}
				/>
			{/each}
		</div>
	</div>
</div>

<h1 class="text-3xl font-bold text-gray-500 leading-tight font-primary my-12 mx-2">
	Welcome back! <span class="underline text-violet-500">
		{data.user?.first_name + ' ' + data.user?.last_name}</span
	>
</h1>

<div class="grid grid-cols-1 gap-6 gap-y-0 2xl:gap-6 md:grid-cols-2 2xl:grid-cols-4">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600 font-primary">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Jobs Applied</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">32</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+20%</span
				>
				<span class="ml-1.5 text-gray-700 text-13 dark:text-zinc-100">Since last week</span>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Job Invitations</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">4</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-red-500/40 text-red-500 rounded font-medium dark:bg-red-500/30"
					>-5%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Profile Views</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">67</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+30%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">success Rate</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">32.57%</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+ 2.95%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
</div>

<div class="grid grid-cols-1">
	<div class="grid items-stretch grid-cols-12 mb-4">
		<div class="self-center col-span-12 lg:col-span-6">
			<h5 class="mb-sm-0 text-lg font-semibold grow text-gray-800 dark:text-gray-100">
				Jobs Recommendation
			</h5>
		</div>
	</div>

	<div class="grid grid-cols-12 gap-6">
		{#each Array(4) as _}
			<div class="col-span-12 lg:col-span-6 xl:col-span-4">
				<div class="mb-0 card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body">
						<p class="mb-2 text-gray-400 dark:text-zinc-100">10 Apr, 2022</p>
						<h5>
							<a href={null} class="font-medium text-gray-700 dark:text-gray-100 text-[17.5px]"
								>Beautiful Day with Friends</a
							>
						</h5>
						<p class="mt-2 mb-0 text-gray-700 text-15 dark:text-zinc-100">
							Contrary to popular belief, Lorem Ipsum is not simply random text,a Latin professor at
							Hampden-Sydney College in Virginia.
						</p>
						<div class="mt-4">
							<a href={null} class="align-middle text-violet-500 text-15">View more... </a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
