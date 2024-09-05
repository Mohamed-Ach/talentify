<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	// ** Components
	import PageTitle from '$lib/components/PageTitle.svelte'

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
</script>

<PageTitle
	title="Job Preview"
	breadcrumbs={[
		{ name: 'Job Posts', link: '/job-posts' },
		{ name: 'view', link: null }
	]}
/>

<div class=" grid grid-cols-1">
	{#if data.job}
		<div class="grid grid-cols-1 xl:grid-cols-12 gap-5">
			<div class="col-span-12 xl:col-span-8">
				<div class="card dark:bg-zinc-800 dark:border-zinc-600">
					<div class="card-body">
						<div class="grid grid-cols-1 md:grid-cols-2 text-center mb-8">
							<h4
								class="text-gray-700 text-21 dark:text-gray-100 order-2 md:order-1 mt-4 md:mt-0 md:text-start"
							>
								{data.job.job_post.title}
							</h4>

							<div class="flex justify-center md:justify-end gap-2 order-1 md:order-2">
								<a
									class="h-10 font-semibold mr-2 text-white bg-violet-500 border-violet-500 btn hover:bg-violet-600 hover:border-violet-600 focus:bg-violet-600 focus:border-violet-600 focus:ring focus:ring-violet-500/30 active:bg-violet-600 active:border-violet-600"
									href="/emp/job-posts/view/{data.job.job_post.id}/applicants"
								>
									View Applicants</a
								>
							</div>
						</div>
						<div class="grid grid-cols-12">
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
									<p class="font-primary text-gray-500 dark:text-zinc-100 text-15 mb-3">
										{formatDate(data.job.job_post.created_at)}
									</p>
								</div>
							</div>
							<div class="col-span-4">
								<div class="text-center">
									<h5 class="text-15 mb-3 text-gray-700 dark:text-gray-100">End in</h5>
									<p class="font-primary text-gray-500 dark:text-zinc-100 mb-2">
										{formatDate(data.job.job_post.application_deadline)}
									</p>
								</div>
							</div>
						</div>
						<hr class="my-4 border-gray-100 dark:border-zinc-600" />

						<div class="mt-4">
							<div class="font-primary text-gray-500 dark:text-zinc-100 text-14">
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
															<li class="font-primary py-1">{data.job.job_post.salary}</li>
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
