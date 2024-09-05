<script lang="ts">
	import { tagList, categoryList } from '$lib/stores'
	import type { PageData } from './$types'
	import { API_URL } from '$lib/stores'
	export let data: PageData

	// ** Components :
	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'

	// ** Icons :
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight'
	import ArrowDown from 'phosphor-svelte/lib/ArrowDown'
	import ArrowUp from 'phosphor-svelte/lib/ArrowUp'
	import MapPin from 'phosphor-svelte/lib/MapPin'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	// ** Helper Functions :
	function formatDate(date: string): string {
		const d = new Date(date)
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d)
	}

	function getFirstSixWords(paragraph: string): string {
		const words = paragraph.split(' ').slice(0, 6)
		return words.join(' ')
	}

	function toggleTag(tag: string) {
		if (tags.includes(tag)) tags = tags.filter((t) => t !== tag)
		else tags = [...tags, tag]
	}

	function toggleCategory(category: string) {
		if (categories.includes(category)) categories = categories.filter((c) => c !== category)
		else categories = [...categories, category]
	}

	// ** State :
	const sessionToken: string = data.token || ''
	let spinner: boolean = false
	let load: boolean = true

	onMount(() => {
		load = false
	})

	// ** Pagination :
	let total: number = data.jobs.total
	const pageSize: number = 10
	let currentPage: number = 1
	let jobs = data.jobs.data

	$: pageTotal = Math.ceil(total / pageSize)

	// ** Search Params :
	let employmentType: string = ''
	let categories: string[] = []
	let location: string = ''
	let sort: boolean = false
	let tags: string[] = []
	let query: string = $page.url.searchParams.get('query') || ''

	$: tags, handleChange()
	$: categories, handleChange()

	async function fetchJobsListings(token: string) {
		const myHeaders = new Headers({
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})

		const params = new URLSearchParams({
			page: currentPage.toString(),
			sort_by_deadline: sort ? 'asc' : 'desc'
		})

		if (employmentType) params.append('job_type[]', employmentType)
		if (location) params.append('location', location)
		if (query) params.append('query', query)
		tags.forEach((tag) => params.append('tags[]', tag))
		categories.forEach((category) => params.append('categories[]', category))

		const requestOptions: RequestInit = {
			method: 'GET',
			headers: myHeaders
		}

		const response = await fetch(`${API_URL}/jobs/search?${params.toString()}`, requestOptions)
		const results = await response.json()

		jobs = results.data
		total = results.total
		currentPage = results.page
	}

	async function handlePageChange(page: number) {
		currentPage = page
		spinner = true
		await fetchJobsListings(sessionToken)
		spinner = false
	}

	async function handleSortChange() {
		currentPage = 1
		sort = !sort
		spinner = true
		await fetchJobsListings(sessionToken)
		spinner = false
	}

	async function handleChange() {
		if (load) return
		currentPage = 1
		spinner = true
		await fetchJobsListings(sessionToken)
		spinner = false
	}
</script>

<Spinner show={spinner} />

<PageTitle
	title="Job Listings"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'Job Listings', link: null }
	]}
/>

<div class=" grid grid-cols-1">
	<div class="grid grid-cols-12 items-stretch mb-4">
		<div class="col-span-12 lg:col-span-6 self-center">
			<h5 class="text-15 text-gray-600 dark:text-gray-100">
				Job List <span class="text-gray-500 font-normal ml-2 dark:text-zinc-100">({total})</span>
			</h5>
		</div>
		<div class="col-span-12 lg:col-span-6">
			<div class="flex flex-wrap items-center gap-2 mt-5 lg:mt-0 lg:justify-end">
				<div>
					<ul class="flex flex-wrap">
						<li class="nav-item">
							<button
								class="nav-link flex justify-center items-center active py-2 px-4 bg-violet-500 rounded text-white text-16"
								type="button"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								aria-label="Grid"
								on:click={handleSortChange}
							>
								<svelte:component
									this={sort ? ArrowDown : ArrowUp}
									size={18}
									weight="fill"
									class="mr-1"
								/>
								Sort
							</button>
						</li>
					</ul>
				</div>
				<div>
					<select
						name="employmentType"
						bind:value={employmentType}
						on:change={handleChange}
						id="employmentType"
						class="form-select dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
						required
					>
						<option value="">All Types</option>
						<option value="full_time">Full Time</option>
						<option value="part_time">Part Time</option>
						<option value="freelancer">Freelancer</option>
					</select>
				</div>
				<div>
					<div
						class="flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600"
					>
						<div class="px-4 input-group-text dark:text-zinc-100">
							<MapPin size={20} weight="bold" class="text-violet-" />
						</div>
						<input
							bind:value={location}
							name="location"
							id="location"
							type="text"
							class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
							placeholder="Enter Location..."
							on:change={handleChange}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-12 gap-5">
		<div class="col-span-12 lg:col-span-4">
			<div class="card dark:bg-zinc-800 dark:border-zinc-600">
				<div class="card-body">
					<div class="search-box">
						<h5 class="mb-3 text-gray-700 dark:text-gray-100">Search</h5>
						<div class="relative px-2">
							<input
								class="w-full border-transparent bg-gray-50/50 rounded pl-10 placeholder:text-13 text-gray-700 placeholder:text-gray-400 dark:bg-zinc-700/50 dark:border-zinc-600"
								placeholder="Find the perfect job for you..."
								on:change={handleChange}
								bind:value={query}
								type="text"
							/>
							<i class="mdi mdi-magnify search-icon absolute left-5 top-2 text-lg text-gray-600"
							></i>
						</div>
					</div>
					<div class="mt-12">
						<h5 class="mb-4 text-gray-700 dark:text-gray-100">Categories</h5>
						<ul class="list-unstyled font-medium px-2">
							{#each categoryList as category}
								<div class="form-check">
									<input
										type="checkbox"
										class="align-middle rounded focus:ring-0 focus:ring-offset-0 dark:bg-zinc-700 dark:border-zinc-400 checked:bg-violet-500 dark:checked:bg-violet-500"
										id="formrow-customCheck"
										name="categories"
										value={category}
										on:change={() => toggleCategory(category)}
									/>
									<label
										class="font-medium text-gray-700 ltr:ml-2 rtl:mr-2 dark:text-zinc-100"
										for="formrow-customCheck">{category}</label
									>
								</div>
							{/each}
						</ul>
					</div>
					<div class="mt-8">
						<h5 class="mb-4 text-gray-700 dark:text-gray-100">Tag Clouds</h5>
						<div class="flex flex-wrap gap-2 px-2">
							{#each tagList as tag}
								<button
									type="button"
									class="btn py-1 px-3 text-[11.5px] {tags.includes(tag)
										? 'bg-violet-600 border-violet-600 text-white'
										: 'text-violet-500 bg-violet-50 border-violet-50'} hover:text-white hover:bg-violet-600 hover:border-violet-600 active:text-white active:bg-violet-600 active:border-violet-600 dark:border-transparent"
									on:click={() => toggleTag(tag)}>{tag}</button
								>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-12 lg:col-span-8">
			{#if total === 0}
				<div class="card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body text-center">
						<h5 class="text-gray-700 dark:text-gray-100">No Jobs Found</h5>
						<p class="text-gray-500 dark:text-zinc-100">
							We couldn't find any jobs that match your search.
						</p>
					</div>
				</div>
			{/if}
			{#each jobs as job}
				<div class="card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body">
						<div class="flex justify-between">
							<p class="text-gray-500 dark:text-zinc-100 mb-2">
								{formatDate(job.created_at)}
								<span class="text-violet-500 hover:underline cursor-pointer font-bold">
									( Ends in
									{formatDate(job.application_deadline)} )</span
								>
							</p>
							<span
								class="hidden xl:block text-right px-2 py-1 text-xs font-medium rounded badge bg-violet-50 text-violet-500"
								><span class="inline-block p-1 mr-1 rounded-full bg-violet-500"></span>
								{#each job.job_type as type, c}
									{type}
									{#if c !== job.job_type.length - 1}
										{' & '}
									{/if}
								{/each}
							</span>
						</div>
						<div class="flex justify-between mt-2">
							<h5>
								<a href={'/job-listings/' + job.id} class="text-gray-900 dark:text-gray-100"
									>{job.title + ' - '}
									<span class="text-green-300 hover:underline cursor-pointer text-sm"
										>{job.location}</span
									></a
								>
							</h5>
							<div class="hidden xl:flex xl:justify-center xl:gap-2">
								{#if job.required_skills.length > 0}
									{#each job.required_skills as skill}
										<span
											class="px-2 py-1 text-xs font-medium text-green-500 rounded badge bg-green-50"
											>{skill}</span
										>
									{/each}
								{/if}
							</div>
						</div>
						<p class="mb-0 mt-1 text-gray-500 dark:text-zinc-100mt-1 text-15 dark:text-zinc-100">
							{@html getFirstSixWords(job.description)}
						</p>
						<div class="mt-3">
							<a
								href="/job-listings/{job.id}"
								class="flex just items-center align-middle text-15 text-violet-500"
								>View more <ArrowRight size={18} weight="bold" class="ml-2" /></a
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if total > pageSize}
		<div class="mb-5">
			<div class="flex justify-center">
				<nav aria-label="Page navigation example border">
					<ul class="flex list-style-none">
						<li
							class="border ltr:rounded-l rtl:rounded-r ltr:border-r-0 rtl:border-l-0 dark:border-zinc-600"
						>
							<button
								class="relative block px-4 py-2 text-gray-500 transition-all duration-300 bg-transparent border-0 outline-none page-link hover:text-violet-500 focus:shadow-none dark:text-zinc-100 dark:hover:bg-zinc-600 hover:bg-gray-50/50"
								on:click={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
								disabled={currentPage === 1}>Previous</button
							>
						</li>
						{#each Array(pageTotal) as _, index}
							<li
								class="border {index + 1 === currentPage
									? 'bg-violet-100 border-violet-500'
									: 'bg-white'}"
							>
								<button
									class="relative block px-4 py-2 transition-all duration-300 bg-transparent outline-none page-link text-violet-500 hover:text-violet-500 hover:bg-gray-50/50 focus:shadow-none dark:text-zinc-900 dark:hover:text-gray-100 dark:hover:bg-zinc-600"
									on:click={() => handlePageChange(index + 1)}>{index + 1}</button
								>
							</li>
						{/each}
						<li class="border ltr:rounded-r rtl:rounded-l dark:border-zinc-600">
							<button
								class="relative block px-4 py-2 text-gray-500 transition-all duration-300 bg-transparent border-0 outline-none page-link hover:text-violet-500 hover:bg-gray-50/50 focus:shadow-none dark:text-zinc-100 dark:hover:bg-zinc-600"
								on:click={() =>
									handlePageChange(currentPage < pageSize ? currentPage + 1 : pageSize)}
								disabled={currentPage === pageTotal}>Next</button
							>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	{/if}
</div>
