<script lang="ts">
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass'
	import ArrowsDownUp from 'phosphor-svelte/lib/ArrowsDownUp'
	import DotsThree from 'phosphor-svelte/lib/DotsThree'
	import Plus from 'phosphor-svelte/lib/Plus'

	import type { PageData } from './$types'
	import { API_URL } from '$lib/stores'
	import { onMount } from 'svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	export let data: PageData

	// ** State :
	const sessionToken: string = data.token || ''
	const userId: string = data.user?.id || ''
	let spinner: boolean = false
	let showModel: boolean = false
	let sort: boolean = false

	function formatDate(date: string): string {
		const d = new Date(date)
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d)
	}

	let showDropdown: boolean[] = []
	onMount(() => {
		showDropdown = Array(10).fill(false)
	})
	const toggleDropdown = (index: number) => {
		showDropdown = showDropdown.map((show, i) => (i === index ? !show : false))
	}

	// ** Pagination :
	let total: number = data.jobs.total
	const pageSize: number = 10
	let currentPage: number = 1
	let jobs = data.jobs.jobs

	$: pageTotal = Math.ceil(total / pageSize)

	// ** Search Params :
	let query: string = ''

	async function fetchJobsListings(token: string, id: string) {
		const params = new URLSearchParams({
			page: currentPage.toString(),
			sort_by_deadline: sort ? 'asc' : 'desc'
		})
		if (query) params.append('query', query)

		const response = await fetch(`${API_URL}/job-posts/employer/${id}?${params.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		const results = await response.json()

		jobs = results.data
		total = results.total
		currentPage = results.page
	}

	async function handleSortChange() {
		currentPage = 1
		sort = !sort
		spinner = true
		await fetchJobsListings(sessionToken, userId)
		spinner = false
	}

	async function handlePageChange(page: number) {
		currentPage = page
		spinner = true
		await fetchJobsListings(sessionToken, userId)
		spinner = false
	}

	async function handleChange() {
		currentPage = 1
		spinner = true
		await fetchJobsListings(sessionToken, userId)
		spinner = false
	}

	async function handleDelete(token: string, id: string) {
		spinner = true
		const myHeaders = new Headers({
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})
		const requestOptions = {
			method: 'DELETE',
			headers: myHeaders
		}

		const response = await fetch(`${API_URL}/job-posts/${id}`, requestOptions)
		if (response.ok) {
			window.location.reload()
		}
	}
</script>

<Spinner show={spinner} />

<PageTitle
	title="Job Post"
	breadcrumbs={[
		{ name: 'Job Posts', link: '/emp/job-posts' },
		{ name: 'view all', link: null }
	]}
/>

<div class=" grid grid-cols-1">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body relative">
			<div class="grid grid-cols-12 font-primary">
				<div class="flex justify-start items-center col-span-12 lg:col-span-9">
					<a
						href="/emp/job-posts/create"
						class="flex justify-center items-center btn bg-gray-50 border-transparent text-gray-800 dark:bg-zinc-600 dark:text-gray-100 font-semibold"
					>
						<Plus size={18} weight="bold" class="mr-2" />
						Add Post
					</a>

					<span class="ml-2 text-gray-700 font-bold">(Total: {total})</span>
				</div>
				<div class="col-span-12 lg:col-span-3">
					<div class="flex items-center mt-5 lg:mt-0 lg:justify-end">
						<div class="inline-flex datepicker-range">
							<div
								class="flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600"
							>
								<div class="px-4 input-group-text dark:text-zinc-100">
									<MagnifyingGlass size={18} weight="bold" />
								</div>
								<input
									class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
									placeholder="Search for..."
									on:change={handleChange}
									bind:value={query}
									type="text"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{#if total > 0}
				<div class="mt-5 overflow-x-auto font-primary">
					<table class="w-full">
						<thead class="border-b border-gray-50 dark:border-zinc-600 cursor-pointer">
							<tr class="text-gray-700">
								<th class="relative w-72 text-start p-4 dark:text-gray-100">Post Title</th>
								<th class="relative w-32 text-start p-4 dark:text-gray-100">Created At</th>
								<th class="relative w-32 text-start p-4 dark:text-gray-100">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<span class="flex content-center" on:click={handleSortChange}>
										<ArrowsDownUp size={18} class="mr-2" /> Ends At
									</span></th
								>
								<th class="relative w-40 text-start p-4 dark:text-gray-100">Location</th>
								<th class="relative w-40 text-start p-4 dark:text-gray-100">Has Assessment</th>
								<th class="relative w-[90px] text-start p-4 dark:text-gray-100">Action</th>
							</tr>
						</thead>

						<tbody>
							{#each jobs as job, index}
								<tr class="border-b border-gray-50 dark:border-zinc-600 text-gray-600">
									<td class="p-4 dark:text-zinc-100"
										><a href="/emp/job-posts/view/{job.id}">{job.title}</a></td
									>
									<td class="p-4 dark:text-zinc-100">{formatDate(job.created_at)}</td>
									<td class="p-4 dark:text-zinc-100">
										{formatDate(job.application_deadline)}
									</td>
									<td class="p-4">
										<div
											class="text-xs bg-green-50 inline-block text-green-500 px-1 py-0.5 rounded font-medium dark:bg-green-500/30"
										>
											{job.location}
										</div>
									</td>
									<td class="p-4 dark:text-zinc-100"
										>{job.has_questionnaire === 1 ? 'Yes' : 'No'}</td
									>
									<td class="flex content-center">
										<div class="absolute">
											<button
												class="btn border-transparent py-1 text-16 text-gray-500 shadow-none"
												on:click={() => toggleDropdown(index)}
											>
												<DotsThree size={32} weight="bold" class="" />
											</button>
											<ul
												class="{showDropdown[index]
													? ''
													: 'hidden'} absolute bg-white z-50 py-2 list-none text-left w-32 dark:bg-zinc-700
                                               rounded-lg shadow-lg bg-clip-padding border-none transition-all duration-300"
												style="right: 0; top: 100%;"
											>
												<li>
													{#if job.has_questionnaire === 1}
														<a
															class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap dark:text-gray-100 dark:hover:bg-zinc-600/50 bg-transparent text-gray-700 hover:bg-gray-50/50"
															href="/emp/job-posts/quiz/view/{job.id}"
														>
															View quiz
														</a>
													{:else}
														<a
															class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap dark:text-gray-100 dark:hover:bg-zinc-600/50 bg-transparent text-gray-700 hover:bg-gray-50/50"
															href="/emp/job-posts/quiz/create/{job.id}"
														>
															Add quiz
														</a>
													{/if}
												</li>
												<li>
													<a
														class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap dark:text-gray-100 dark:hover:bg-zinc-600/50 bg-transparent text-gray-700 hover:bg-gray-50/50"
														href="/emp/job-posts/update/{job.id}"
													>
														Update
													</a>
												</li>
												<li>
													<button
														class="dropdown-item text-sm py-2 px-4 font-normal text-start block w-full whitespace-nowrap dark:text-gray-100 dark:hover:bg-zinc-600/50 bg-transparent text-gray-700 hover:bg-gray-50/50"
														on:click={() => (showModel = true)}
														type="button"
													>
														Delete
													</button>
												</li>
											</ul>
										</div>
										<div
											class="modal relative z-50 {showModel ? '' : 'hidden'}"
											id="modal-idCenter"
											aria-labelledby="modal-title"
											role="dialog"
											aria-modal="true"
										>
											<div class="fixed inset-0 z-50 overflow-hidden">
												<div
													class="absolute inset-0 bg-black bg-opacity-50 transition-opacity modal-overlay"
												></div>
												<div class="animate-translate p-4 text-center sm:max-w-lg mx-auto">
													<div
														class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-zinc-700 dark:border-zinc-600"
													>
														<div class="bg-white p-5 text-center dark:bg-zinc-700">
															<h2 class="text-xl mt-5 text-gray-700 dark:text-gray-100">
																Confirm Deletion
															</h2>

															<p class="text-gray-500 dark:text-zinc-100/60 mt-2">
																Are you sure you want to delete this job post?
															</p>
															<div class="flex justify-center gap-2 mt-6">
																<button
																	type="button"
																	class="btn bg-gray-500 border-gray-500 text-white"
																	on:click={() => (showModel = false)}>Cancel</button
																>

																<button
																	type="button"
																	class="btn bg-red-500 border-red-500 text-white"
																	on:click={() => handleDelete(sessionToken, job.id)}>Delete</button
																>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="flex justify-center items-center h-32">
					<p class="font-bold text-lg uppercase text-gray-500 dark:text-zinc-100">
						No job posts found
					</p>
				</div>
			{/if}

			{#if total > 10}
				<div class="flex justify-end mt-4">
					<div class="flex">
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
	</div>
</div>
