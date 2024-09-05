<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import { API_URL } from '$lib/stores'

	import type { PageData } from './$types'
	export let data: PageData

	let companies = data.companies.companies
	let total = data.companies.total
	let page = data.companies.page
	let token = data.token

	// ** Pagination :
	const pageSize: number = 10
	let currentPage: number = 1
	$: pageTotal = Math.ceil(total / pageSize)

	const fetchCompanies = async (page: string) => {
		const response = await fetch(API_URL + `/admin/company/all?page=${page}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		const results = await response.json()
		companies = results.companies
		total = results.total
		page = results.page
	}

	async function handlePageChange(page: number) {
		currentPage = page
		spinner = true
		await fetchCompanies(page.toString())
		spinner = false
	}

	// Spinner
	let spinner = false
</script>

<Spinner show={spinner} />

<PageTitle
	title="View Companies"
	breadcrumbs={[
		{ name: 'Companies', link: '/admin/view/companies' },
		{ name: 'view', link: null }
	]}
/>

<section class="py-10 relative">
	<div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
		<div
			class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full"
		>
			<div
				class="flex lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200"
			>
				<p class="font-primary font-semibold text-base leading-7 text-black dark:text-white">
					Total: <span class="text-indigo-600 font-medium">{total}</span>
				</p>
				<p class="font-primary font-semibold text-base leading-7 text-black mt-4 dark:text-white">
					Page: <span class="text-gray-400 font-medium">{page}</span>
				</p>
			</div>
			<div class="w-full px-3 sm:px-6">
				{#if companies.length === 0}
					<div class="flex items-center justify-center py-6">
						<p class="font-primary font-semibold text-lg leading-7 text-gray-500 dark:text-white">
							No companies found
						</p>
					</div>
				{/if}
				{#each companies as company}
					<div
						class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
					>
						<div
							class="flex shrink-0 items-center justify-center size-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-600 relative border-white"
						>
							{#if company.logo}
								<img
									src={company.logo}
									alt="Thumbnail Preview"
									class="w-full h-full object-cover rounded-full"
								/>
							{:else}
								<span class="font-secondary font-bold text-4xl text-gray-600 dark:text-gray-300"
									>{company.name.slice(0, 2)}</span
								>
							{/if}
						</div>
						<div class="flex flex-row items-center w-full">
							<div class="grid grid-cols-1 lg:grid-cols-2 w-full">
								<div class="flex items-center">
									<div class="">
										<a
											class="font-primary font-semibold text-xl leading-8 text-black mb-3 dark:text-white"
											href="/admin/view/companies/{company.id}"
										>
											{company.name}
										</a>
										<p class="font-secondary font-bold text-sm leading-8 text-gray-500 mb-3">
											{company.title}
										</p>
										<div class="font-primary flex items-center">
											<p
												class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200 dark:text-white"
											>
												Founded: <span class="text-gray-500">{company.founded}</span>
											</p>
											<p class="font-medium text-base leading-7 text-black dark:text-white">
												Size: <span class="text-gray-500">{company.size}</span>
											</p>
										</div>
									</div>
								</div>
								<div class="grid grid-cols-1">
									<div
										class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 lg:justify-end"
									>
										<div class="flex gap-3 lg:block">
											<p
												class="font-primary font-bold text-base text-center whitespace-nowrap leading-7 lg:mt-3 text-violet-500"
											>
												<a href="/admin/view/employers/{company.id}" class="hover:underline"
													>View Employers</a
												>
											</p>
											<p
												class="font-primary font-bold text-base text-center whitespace-nowrap leading-7 lg:mt-3 text-violet-500"
											>
												<a href="/admin/create/employer/{company.id}" class="hover:underline"
													>Add Employer</a
												>
											</p>
											<p
												class="font-primary font-bold text-base text-center whitespace-nowrap leading-7 lg:mt-3 text-emerald-500"
											>
												<a href="/admin/update/company/{company.id}" class="hover:underline">Edit</a
												>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
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
</section>
