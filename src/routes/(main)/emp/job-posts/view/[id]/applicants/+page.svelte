<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import UserCircleDashed from 'phosphor-svelte/lib/UserCircleDashed'

	import PageTitle from '$lib/components/PageTitle.svelte'
</script>

<PageTitle
	title="Job Applicants"
	breadcrumbs={[
		{ name: 'job posts', link: '/job-posts' },
		{ name: 'applcants', link: null }
	]}
/>

{#await data.applicants}
	<div class="flex justify-center items-center">
		<div
			class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
		>
			<span class="hidden">Loading...</span>
		</div>
	</div>
{:then applicants}
	<div class="grid grid-cols-1">
		<div class="grid items-stretch grid-cols-12">
			<div class="self-center col-span-12 lg:col-span-6">
				<h5 class="text-gray-800 text-15 dark:text-gray-100">
					Total <span class="ml-2 font-normal text-gray-500 dark:text-zinc-100"
						>({applicants.length})</span
					>
				</h5>
			</div>
		</div>

		<div class="relative mt-5 overflow-x-auto">
			<table class="w-full">
				<thead class="border-b cursor-pointer border-gray-50 dark:border-zinc-600">
					<tr class="text-gray-800 dark:text-gray-100">
						<th class="relative p-4 w-96 text-start dark:text-gray-100">Name</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Employment Type</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Location</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">End In</th>
						<th class="relative p-4 w-72 text-start dark:text-gray-100">Has Quiz </th>
					</tr>
				</thead>
				<tbody>
					{#if applicants.length === 0}
						<tr class="text-gray-800 border-b border-gray-50 dark:border-zinc-600">
							<td class="p-4 text-center" colspan="5">You haven't applied for any job yet!</td>
						</tr>
					{/if}
					{#each applicants as applicant}
						<tr class="text-gray-800 border-b border-gray-50 dark:border-zinc-600">
							<td class="inline-flex items-center p-4">
								<UserCircleDashed size={72} weight="fill" class="rounded-full dark:text-white" />
								<a href="/job-seeker/" class="text-gray-800 dark:text-gray-100">Phyllis Gatlin</a>
							</td>
							<td class="p-4 dark:text-zinc-50">{job.job_post.job_type}</td>
							<td class="p-4 dark:text-zinc-50">{job.job_post.location}</td>
							<td class="flex flex-wrap gap-1 p-4">{job.job_post.application_deadline}</td>
							<td class="p-4">{job.job_post.has_questionnaire === 1 ? 'Yes' : 'No'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/await}
