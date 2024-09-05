<script lang="ts">
	import { API_URL } from '$lib/stores'
	export let data: any

	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'

	let employers = data.employers.employers
	let total = data.employers.total
	let page = data.employers.page
	let token = data.token
	let id = data.id

	// ** Pagination :
	const pageSize: number = 1
	let currentPage: number = 1
	$: pageTotal = Math.ceil(total / pageSize)

	const fetchCompanies = async (page: string) => {
		const response = await fetch(API_URL + `/admin/company/employers/${id}?page=${page}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		const results = await response.json()
		employers = results.employers
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
	title="View Employers"
	breadcrumbs={[
		{ name: 'Companies', link: '/admin/view/companies' },
		{ name: 'view', link: null }
	]}
/>
<div class="overflow-x-auto font-primary mx-2 lg:mx-24 mt-12">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-lg text-gray-700 dark:text-white">Total: {total}</h2>
		<h2 class="text-lg text-gray-700 dark:text-white">Page: {page}</h2>
	</div>
	<table class="min-w-full bg-white">
		<thead class="bg-gray-700 whitespace-nowrap">
			<tr>
				<th class="p-4 text-left text-sm font-medium text-white"> First Name </th>
				<th class="p-4 text-left text-sm font-medium text-white"> Last Name </th>
				<th class="p-4 text-left text-sm font-medium text-white"> Email </th>
				<th class="p-4 text-left text-sm font-medium text-white"> Actions </th>
			</tr>
		</thead>

		<tbody class="whitespace-nowrap">
			{#if employers.length === 0}
				<tr class="dark:bg-gray-800">
					<td class="p-4 text-sm dark:text-gray-300" colspan="4">No Employers Found</td>
				</tr>
			{/if}
			{#each employers as employer}
				<tr class="even:bg-blue-50 dark:bg-gray-800">
					<td class="p-4 text-sm dark:text-gray-300"> {employer.first_name} </td>
					<td class="p-4 text-sm dark:text-gray-300"> {employer.last_name} </td>
					<td class="p-4 text-sm dark:text-gray-300"> {employer.email} </td>
					<td class="p-4 text-sm dark:text-gray-300">
						<a href="/admin/view/companies/{id}" class="font-bold text-violet-400 hover:underline"
							>View Company</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
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
