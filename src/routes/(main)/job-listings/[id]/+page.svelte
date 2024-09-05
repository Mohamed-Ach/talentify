<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	import { API_URL } from '$lib/stores'
	export let data: PageData

	const sessionToken = data.token

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

	// ** Components
	import PageTitle from '$lib/components/PageTitle.svelte'

	// ** Icons
	import BookmarksSimple from 'phosphor-svelte/lib/BookmarksSimple'
	import Briefcase from 'phosphor-svelte/lib/Briefcase'
	import { goto } from '$app/navigation'

	// ** Helper Functions
	function formatDate(date: string): string {
		const d = new Date(date)
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d)
	}

	function replaceNewlines(text: string): string {
		return text.replace(/\r\n|\n|\r/g, '<br>')
	}

	// ** Handle Bookmarks
	let booked = data.bookmarks.includes(data.job.job_post.id)
	let applied = data.appliedJobs.includes(data.job.job_post.id)

	async function handleBookmark(id: string) {
		if (!booked) await addToBookmarks(id, sessionToken)
		else await removeFromBookmarks(id, sessionToken)
	}

	const addToBookmarks = async (id: string, token: string) => {
		const res = await fetch(`${API_URL}/job-posts/bookmark/${id}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		await res.json()

		if (res.ok) {
			booked = true
			showToast('Success', 'Job bookmarked successfully', 'success')
		} else showToast('Error', 'Something went wrong', 'error')
	}

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
			booked = false
			showToast('Success', 'Job removed from bookmarks', 'success')
		} else showToast('Error', 'Something went wrong', 'error')
	}

	const applyToJob = async (id: string, token: string) => {
		const res = await fetch(`${API_URL}/job-posts/apply/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		await res.json()
		if (res.ok) {
			applied = true
			showModel = false
			showToast('Success', 'You have applied to this job successfully!', 'success')
		} else showToast('Error', 'Something went wrong', 'error')
	}

	const checkQuiz = async (id: string, token: string) => {
		const res = await fetch(`${API_URL}/job-posts/has-passed-questionnaire/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		console.log(res)
		const r = await res.json()
		console.log(r)
	}

	let showModel: boolean = false
</script>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<PageTitle
	title="Job Preview"
	breadcrumbs={[
		{ name: 'Job Listings', link: '/job-listings' },
		{ name: 'view', link: null }
	]}
/>

<div class=" grid grid-cols-1">
	{#if data.job}
		<div class="grid grid-cols-1 xl:grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-span-8">
				<div class="card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body">
						<div class="grid md:grid-cols-2 grid-cols-1 text-center mb-8">
							<h4
								class="md:text-start text-center text-gray-700 text-21 dark:text-gray-100 md:mt-0 mt-4 md:order-1 order-2"
							>
								{data.job.job_post.title}
							</h4>

							<div class="flex md:justify-end justify-center gap-2 md:order-2 order-1">
								{#if applied}
									{#if data.job.job_post.has_questionnaire === 1}
										<button
											type="button"
											class="h-10 font-semibold mr-2 text-white bg-green-500 border-green-500 btn hover:bg-green-600 hover:border-green-600 focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-500/30 active:bg-green-600 active:border-green-600"
											on:click={() => checkQuiz(data.job.job_post.id, sessionToken)}
											><span class="align-middle mr-1">✓</span><span class="align-middle"
												>Applied</span
											></button
										>
									{:else}
										<button
											type="button"
											class="h-10 font-semibold mr-2 text-white bg-green-500 border-green-500 btn hover:bg-green-600 hover:border-green-600 focus:bg-green-600 focus:border-green-600 focus:ring focus:ring-green-500/30 active:bg-green-600 active:border-green-600"
											><span class="align-middle mr-1">✓</span><span class="align-middle"
												>Applied</span
											></button
										>
									{/if}
								{:else}
									<button
										type="button"
										class="h-10 px-4 mr-2 font-semibold text-md text-white btn bg-violet-500 border-violet-500 hover:bg-violet-600 hover:border-violet-600 focus:bg-violet-600 focus:border-violet-600 focus:ring focus:ring-violet-500/30"
										on:click={() => (showModel = true)}>Apply</button
									>
								{/if}
								<button
									type="button"
									class="h-10 px-4 font-semibold text-md text-gray-800 btn hover:text-white {booked
										? 'text-white bg-violet-600 border-violet-600'
										: 'bg-gray-50 border-gray-300'}  hover:bg-violet-600 hover:border-violet-600 focus:bg-violet-600 focus:border-violet-600 focus:text-white"
									on:click={() => handleBookmark(data.job.job_post.id)}
									><BookmarksSimple size={18} weight="bold" /></button
								>
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
													Job Application
												</h2>

												{#if data.job.job_post.has_questionnaire === 1}
													<p class="text-gray-500 dark:text-zinc-100/60 mt-2">
														This job requires you to take a quiz assessment before applying. Click
														on `Take quiz` to start the quiz.
													</p>
												{:else}
													<p class="text-gray-500 dark:text-zinc-100/60 mt-2">
														Please read and verify all the details and information before you click
														on `Submit` to apply for this job.
													</p>
												{/if}
												<div class="flex justify-center gap-2 mt-6">
													<button
														type="button"
														class="btn bg-red-500 border-red-500 text-white"
														on:click={() => (showModel = false)}>Cancel</button
													>
													{#if data.job.job_post.has_questionnaire === 1}
														<button
															type="button"
															class="btn bg-violet-500 border-violet-500 text-white"
															on:click={() => {
																applyToJob(data.job.job_post.id, sessionToken)
																goto('/job-listings/' + data.job.job_post.id + '/quiz')
															}}>Take Quiz</button
														>
													{:else}
														<button
															type="button"
															class="btn bg-violet-500 border-violet-500 text-white"
															on:click={() => applyToJob(data.job.job_post.id, sessionToken)}
															>Submit</button
														>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="grid md:grid-cols-12 grid-cols-1">
							<div class="col-span-4">
								<div class="text-center">
									<h6 class="mb-2 text-gray-700 dark:text-gray-100">Job Type</h6>
									<p class="text-gray-500 dark:text-zinc-100 text-15 mb-3">
										{data.job.job_post.job_type}
									</p>
								</div>
							</div>
							<div class="col-span-4">
								<div class="text-center">
									<h6 class="mb-2 text-gray-700 dark:text-gray-100">Published</h6>
									<p class="text-gray-500 dark:text-zinc-100 text-15 mb-3">
										{formatDate(data.job.job_post.created_at)}
									</p>
								</div>
							</div>
							<div class="col-span-4">
								<div class="text-center">
									<h5 class="text-15 mb-3 text-gray-700 dark:text-gray-100">End in</h5>
									<p class="text-gray-500 dark:text-zinc-100 mb-2">
										{formatDate(data.job.job_post.application_deadline)}
									</p>
								</div>
							</div>
						</div>
						<hr class="my-4 border-gray-100 dark:border-zinc-600" />

						<div class="mt-4">
							<div class="text-gray-500 dark:text-zinc-100 text-14">
								<p class="mb-4">
									{@html replaceNewlines(data.job.job_post.description)}
								</p>

								{#if data.job.job_post.salary}
									<div class="mt-4">
										<h5 class="mb-3 text-gray-700 dark:text-gray-100">Salary:</h5>

										<div>
											<div class="grid grid-cols-12">
												<div class="col-span-4">
													<div>
														<ul class="ltr:pl-5 rtl:pr-5 list-disc">
															<li class="py-1">{data.job.job_post.salary}</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-span-12 xl:col-span-4">
				<div class="card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body">
						<div>
							<ul class="list-unstyled font-medium px-2">
								<li class="flex justify-between">
									<span
										class="px-2 py-1 text-md font-medium text-green-500 rounded badge bg-green-50"
										>{data.job.job_post.location}</span
									>
								</li>
							</ul>
						</div>
						<div class="mt-8">
							<h5 class="mb-4 text-gray-700 dark:text-gray-100">Required Skills</h5>
							<div class="flex flex-wrap gap-5 px-2 text-[16px] font-semibold">
								{#each data.job.job_post.required_skills as skill}
									<button type="button" class="flex-wrap text-gray-900 pb-4 dark:text-gray-100"
										>{skill}</button
									>
								{/each}
							</div>
						</div>
						<div class="mt-8">
							<h5 class="mb-4 text-gray-700 dark:text-gray-100">Categories</h5>
							<div class="flex flex-wrap gap-5 px-2 text-[16px] font-semibold">
								{#each data.job.job_post.categories as category}
									<button
										type="button"
										class="underline decoration text-gray-900 pb-4 dark:text-gray-100"
									>
										{category}
									</button>
								{/each}
							</div>
						</div>
						<div class="mt-8">
							<h5 class="mb-4 text-gray-700 dark:text-gray-100">Tags</h5>
							<div class="flex flex-wrap gap-2 px-2">
								{#each data.job.job_post.tags as tag}
									<button type="button" class="text-13"
										><span
											class="bg-violet-50/50 text-violet-500 px-1 py-0.5 rounded font-medium dark:bg-violet-500/20"
											>{tag}</span
										></button
									>
								{/each}
							</div>
						</div>
						{#await data.recommendations}
							<div class="flex justify-center items-center mt-8">
								<div
									class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
								>
									<span class="hidden">Loading...</span>
								</div>
							</div>
						{:then recommendations}
							<div class="mt-8">
								<h5 class="text-gray-700 dark:text-gray-100">Related Jobs</h5>
								<div class="list-group list-group-flush">
									{#each recommendations.data as recommendation}
										<a href={recommendation.id} class="list-group-item text-muted pb-3 pt-0 px-2">
											<div class="flex items-center">
												<div class="flex-shrink-0 ltr:mr-4 rtl:ml-4">
													<Briefcase
														size={32}
														weight="bold"
														class="h-auto rounded dark:text-white"
													/>
												</div>
												<div class="flex-grow">
													<h5 class="text-13 text-gray-700 dark:text-gray-100">
														{recommendation.title}
													</h5>
													<p class="mb-0 mt-1 text-gray-500 dark:text-zinc-100">
														{formatDate(recommendation.created_at)} - {recommendation.location}
													</p>
												</div>
											</div>
										</a>
									{/each}
								</div>
							</div>
						{:catch error}
							<div class="mt-8">
								<h5 class="text-gray-700 dark:text-gray-100">Related Jobs</h5>
								<div class="list-group list-group-flush">
									<div class="list-group-item text-muted pb-3 pt-0 px-2">
										<div class="flex items-center">
											<div class="flex-shrink-0 ltr:mr-4 rtl:ml-4">
												<Briefcase size={32} weight="bold" class="h-auto rounded dark:text-white" />
											</div>
											<div class="flex-grow">
												<h5 class="text-13 text-gray-700 dark:text-gray-100">
													No related jobs found
												</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/await}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="col-span-12">
			<div class="card dark:bg-zinc-800 dark:border-zinc-600">
				<div class="card-body">
					<div class="text-center">
						<h4 class="text-gray-700 dark:text-gray-100">
							Job not found or does not exists anymore!
						</h4>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
