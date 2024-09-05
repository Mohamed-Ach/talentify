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
	title="My Bookmarks"
	breadcrumbs={[
		{ name: 'Personal', link: '/profile' },
		{ name: 'Bookmarks', link: null }
	]}
/>

{#await data.bookmarks}
	<div class="flex justify-center items-center">
		<div
			class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
		>
			<span class="hidden">Loading...</span>
		</div>
	</div>
{:then bookmarks}
	<div class="grid grid-cols-1">
		<div class="grid items-stretch grid-cols-12">
			<div class="self-center col-span-12 lg:col-span-6">
				<h5 class="text-gray-800 text-15 dark:text-gray-100">
					Total <span class="ml-2 font-normal text-gray-500 dark:text-zinc-100"
						>({bookmarks.length})</span
					>
				</h5>
			</div>
		</div>

		<div class="relative mt-5 overflow-x-auto">
			<table class="w-full">
				<thead class="border-b cursor-pointer border-gray-50 dark:border-zinc-600">
					<tr class="text-gray-800 dark:text-gray-100">
						<th class="relative p-4 w-96 text-start dark:text-gray-100 font-primary">Job Title </th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Employment Type </th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Location </th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">End In </th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Action </th>
					</tr>
				</thead>
				<tbody>
					{#if bookmarks.length === 0}
						<tr class="text-gray-800 border-b border-gray-50 dark:border-zinc-600">
							<td class="p-4 text-center font-primary dark:text-zinc-50" colspan="5"
								>No bookmarks found</td
							>
						</tr>
					{/if}
					{#each bookmarks as bookmark}
						<tr class="text-gray-800 border-b border-gray-50 dark:border-zinc-600">
							<td class="inline-flex items-center p-4">
								<a
									href="/job-listings/{bookmark.job_post.id}"
									class="text-gray-800 dark:text-gray-100 font-primary">{bookmark.job_post.title}</a
								>
							</td>
							<td class="p-4 dark:text-zinc-50 font-primary">{bookmark.job_post.job_type}</td>
							<td class="p-4 dark:text-zinc-50 font-primary">{bookmark.job_post.location}</td>
							<td class="flex flex-wrap gap-1 p-4 dark:text-zinc-50 font-primary"
								>{bookmark.job_post.application_deadline}</td
							>
							<td class="p-4">
								<div class="relative flex justify-start items-center dropdown text-center">
									<button
										class="text-red-500 btn bg-red-50 border-red-50 hover:text-white hover:bg-red-600 hover:border-red-600 focus:bg-red-600 focus:text-white focus:border-red-600 focus:ring focus:ring-red-500/10 active:bg-red-600 active:border-red-600 dark:bg-red-500/20 dark:border-transparent"
										on:click={() => (showModel = true)}
										type="button"><span class="text-red-800 align-middle text-sm">✘</span></button
									>
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
															Confirm Removal
														</h2>

														<p class="text-gray-500 dark:text-zinc-100/60 mt-2">
															Are you sure you want to remove this job post from bookmark?
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
																on:click={() =>
																	removeFromBookmarks(bookmark.job_post.id, sessionToken)}
																>Remove</button
															>
														</div>
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
	</div>
{/await}
