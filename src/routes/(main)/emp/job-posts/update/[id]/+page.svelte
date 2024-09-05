<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { categoryList, requiredSkills, tagList } from '$lib/stores'
	import { applyAction, enhance } from '$app/forms'
	import { MultiSelect } from 'svelte-multiselect'

	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import FilePlus from 'phosphor-svelte/lib/FilePlus'

	export let form: any
	let spinner = false

	// ** Helper Functions :
	function formatDate(date: string): string {
		const d = new Date(date)
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d)
	}
</script>

<PageTitle
	title="Job Post"
	breadcrumbs={[
		{ name: 'Job Posts', link: '/job-posts' },
		{ name: 'update', link: null }
	]}
/>

<Spinner show={spinner} />

<div class=" grid grid-cols-1">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div class="flex items-center mb-3 font-primary">
				<div class="flex-grow">
					<div class="mb-4 inline-flex items-center">
						<FilePlus size={32} class="h-6 dark:text-white" />
						<span class="ltr:ml-2 rtl:mr-2 text-lg font-medium text-gray-700 dark:text-gray-100"
							>Update your job posts</span
						>
					</div>
				</div>
			</div>

			{#await data.job}
				<div class="flex justify-center items-center mt-8">
					<div
						class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
					>
						<span class="hidden">Loading...</span>
					</div>
				</div>
			{:then job}
				<form
					method="POST"
					on:submit={() => {
						spinner = true
					}}
					use:enhance={() => {
						return async ({ result }) => {
							await applyAction(result)
							spinner = false
						}
					}}
				>
					<div class="grid grid-cols-12 mb-5">
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<label class="block mb-2 font-medium text-gray-600 dark:text-gray-100" for="title"
								>Job Title<span class="text-red-500">*</span></label
							>
							<input
								class="w-full placeholder:text-sm py-1.5 rounded border-gray-100 focus:border focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100"
								placeholder="Enter the job title..."
								value={job.job_post.title}
								name="title"
								type="text"
								id="title"
								required
							/>
						</div>
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<label class="block mb-2 font-medium text-gray-600 dark:text-gray-100" for="location"
								>Job Location<span class="text-red-500">*</span></label
							>
							<input
								class="w-full placeholder:text-sm py-1.5 rounded border-gray-100 focus:border focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100"
								placeholder="Enter the job location..."
								value={job.job_post.location}
								name="location"
								id="location"
								type="text"
								required
							/>
						</div>
					</div>

					<div class="grid grid-cols-12 mb-5">
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<div class="mb-3">
								<label
									for="job_type"
									class="block mb-2 font-medium text-gray-600 dark:text-zinc-100"
									>Select Employement type<span class="text-red-500">*</span></label
								>
								<MultiSelect
									name="job_type"
									placeholder="Select from the list..."
									options={['Freelancer', 'Part Time', 'Full Time']}
									selected={job.job_post.job_type || []}
									ulOptionsStyle=""
									liOptionStyle=""
									liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
									style=""
									ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
									inputStyle="color: {data.theme === 'dark'
										? 'white'
										: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
									required
								/>
							</div>
						</div>
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<label
								for="example-text-input"
								class="block mb-2 font-medium text-gray-600 dark:text-gray-100"
								>Choose the due date<span class="text-red-500">*</span></label
							>
							<input
								class="w-full border-gray-100 rounded placeholder:text-sm focus:border text-gray-500 focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-zinc-100"
								name="application_deadline"
								id="application_deadline"
								value={job.job_post.application_deadline}
								min={new Date().toISOString().split('T')[0]}
								type="date"
								required
							/>
						</div>
					</div>

					<div class="grid grid-cols-12 mb-5">
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<div class="mb-3">
								<label
									for="required_skills"
									class="block mb-2 font-medium text-gray-600 dark:text-zinc-100"
									>Select the required skills<span class="text-red-500">*</span></label
								>
								<MultiSelect
									name="required_skills"
									placeholder="Select from the list..."
									options={requiredSkills}
									selected={job.job_post.required_skills || []}
									ulOptionsStyle=""
									liOptionStyle=""
									liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
									style=""
									ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
									inputStyle="color: {data.theme === 'dark'
										? 'white'
										: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
									required
								/>
							</div>
						</div>
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<label
								for="categories"
								class="block mb-2 font-medium text-gray-600 dark:text-gray-100"
								>Choose categories</label
							>
							<MultiSelect
								placeholder="Select from the list..."
								name="categories"
								options={categoryList}
								selected={job.job_post.categories || []}
								ulOptionsStyle=""
								liOptionStyle=""
								liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
								style=""
								ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
								inputStyle="color: {data.theme === 'dark'
									? 'white'
									: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
							/>
						</div>
					</div>

					<div class="grid grid-cols-12 mb-5">
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<div class="mb-3">
								<label
									for="required_skills"
									class="block mb-2 font-medium text-gray-600 dark:text-zinc-100"
									>Select the tags</label
								>
								<MultiSelect
									name="tags"
									placeholder="Select from the list..."
									selected={job.job_post.tags || []}
									options={tagList}
									ulOptionsStyle=""
									liOptionStyle=""
									liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
									style=""
									ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
									inputStyle="color: {data.theme === 'dark'
										? 'white'
										: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
									required
								/>
							</div>
						</div>
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<label for="salary" class="block mb-2 font-medium text-gray-700 dark:text-gray-100"
								>Salary<span class="text-red-500">*</span>
								<span class="text-sm">(Amount, To be discussed or Unspecified)</span></label
							>
							<input
								class="w-full placeholder:text-sm py-1.5 rounded border-gray-100 focus:border focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100 dark:text-zinc-100"
								placeholder="Specify the salary..."
								value={job.job_post.salary}
								name="salary"
								type="text"
								id="salary"
								required
							/>
						</div>
					</div>

					<div class="grid grid-cols-12 mb-5">
						<div
							class="col-span-12 md:col-span-6 mb-4 font-primary font-semibold text-lg mx-5 xl:mx-12"
						>
							<div class="mb-3">
								<label
									for="required_skills"
									class="block mb-2 font-medium text-gray-600 dark:text-zinc-100"
									>Job Description<span class="text-red-500">*</span></label
								>
								<textarea
									class="form-textarea w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
									placeholder="Add a description to your post..."
									value={job.job_post.description}
									name="description"
									id="description"
									required
									rows="5"
								></textarea>
							</div>
						</div>
					</div>

					<div>
						<div class="float-right pb-5 space-x-2">
							<button
								class="btn bg-green-500 border-transparent text-white shadow-md shadow-green-200 dark:shadow-zinc-600"
								type="reset">Reset</button
							>
							<button
								class="btn bg-violet-500 border-violet-500 text-white w-28 shadow-md shadow-violet-100 dark:shadow-zinc-600"
								type="submit">Update</button
							>
						</div>
					</div>
				</form>
			{/await}

			{#if form?.error}
				<div
					class="relative px-5 py-3 mt-5 border-2 bg-red-50 text-red-700 border-red-100 rounded mb-3"
				>
					<p>{form.error}</p>
				</div>
			{/if}

			{#if form?.success}
				<div
					class="relative px-5 py-3 mt-5 border-2 bg-green-50 text-green-700 border-green-100 rounded mb-3"
				>
					<p>{form.success}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
