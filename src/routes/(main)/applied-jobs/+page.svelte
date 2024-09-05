<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	export let data: PageData

	import PageTitle from '$lib/components/PageTitle.svelte'
	import { API_URL } from '$lib/stores'

	// Toast
	const showToast = (title: string, description: string, type: ToastType) => {
		toasts.add({
			title,
			description,
			duration: 5000,
			type,
			theme: 'dark',
			placement: 'top-center',
			showProgress: true,
			onClick: () => {},
			onRemove: () => {}
		})
	}

	const sessionToken = data.token || ''
	let showModel = false

	const removeFromBookmarks = async (id: string, token: string) => {
		const res = await fetch(`${API_URL}/job-posts/bookmark/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		await res.json()
		if (res.ok) {
			showToast('Success', 'Job removed from bookmarks', 'success')
			location.reload()
		} else showToast('Error', 'Something went wrong!', 'error')
	}
</script>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<PageTitle
	title="My Job Applications"
	breadcrumbs={[
		{ name: 'Personal', link: '/profile' },
		{ name: 'applied jobs', link: null }
	]}
/>

{#await data.appliedJobs}
	<div class="flex justify-center items-center">
		<div
			class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
		>
			<span class="hidden">Loading...</span>
		</div>
	</div>
{:then jobs}
	<div class="grid grid-cols-1">
		<div class="grid items-stretch grid-cols-12">
			<div class="self-center col-span-12 lg:col-span-6">
				<h5 class="text-gray-800 text-15 dark:text-gray-100">
					Total <span class="ml-2 font-normal text-gray-500 dark:text-zinc-100"
						>({jobs.length})</span
					>
				</h5>
			</div>
		</div>

		<div class="relative mt-5 overflow-x-auto">
			<table class="w-full">
				<thead class="border-b cursor-pointer border-gray-50 dark:border-zinc-600">
					<tr class="text-gray-800 dark:text-gray-100">
						<th class="relative p-4 w-96 text-start dark:text-gray-100 font-primary">Job Title</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100 font-primary"
							>Employment Type</th
						>
						<th class="relative p-4 w-72 text-start dark:text-gray-100 font-primary">Location</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100 font-primary">End In</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100 font-primary">Has Quiz </th>
					</tr>
				</thead>
				<tbody>
					{#if jobs.length === 0}
						<tr
							class="text-gray-800 border-b border-gray-50 dark:border-zinc-600 font-primary font-bold"
						>
							<td class="p-4 text-center dark:text-zinc-50 font-primary" colspan="5"
								>You haven't applied for any job yet!</td
							>
						</tr>
					{/if}
					{#each jobs as job}
						<tr class="text-gray-800 border-b border-gray-50 dark:border-zinc-600">
							<td class="inline-flex items-center p-4">
								<a href="/job-listings/{job.job_post.id}" class="text-gray-800 dark:text-gray-100"
									>{job.job_post.title}</a
								>
							</td>
							<td class="p-4 dark:text-zinc-50 font-primary">{job.job_post.job_type}</td>
							<td class="p-4 dark:text-zinc-50 font-primary">{job.job_post.location}</td>
							<td class="flex flex-wrap gap-1 p-4 dark:text-zinc-50 font-primary"
								>{job.job_post.application_deadline}</td
							>
							<td class="p-4 font-primary dark:text-zinc-50"
								>{job.job_post.has_questionnaire === 1 ? 'Yes' : 'No'}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/await}
