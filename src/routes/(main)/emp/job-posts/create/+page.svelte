<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	export let data: PageData

	import { categoryList, requiredSkills, tagList } from '$lib/stores'
	import { applyAction, enhance } from '$app/forms'
	import { MultiSelect } from 'svelte-multiselect'

	import PageTitle from '$lib/components/PageTitle.svelte'
	import FilePlus from 'phosphor-svelte/lib/FilePlus'
	import Spinner from '$lib/components/Spinner.svelte'
	import { error } from '@sveltejs/kit'

	export let form: any
	let spinner = false

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
</script>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<Spinner show={spinner} />

<PageTitle
	title="Job Post"
	breadcrumbs={[
		{ name: 'Job Posts', link: '/job-posts' },
		{ name: 'create', link: null }
	]}
/>

<div class=" grid grid-cols-1">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div class="flex items-center mb-3 font-primary">
				<div class="flex-grow">
					<div class="mb-4 inline-flex items-center">
						<FilePlus size={32} class="h-6 dark:text-white" />
						<span class="ltr:ml-2 rtl:mr-2 text-lg font-medium text-gray-700 dark:text-gray-100"
							>Create your job posts</span
						>
					</div>
				</div>
			</div>
			<form
				method="POST"
				on:submit={() => {
					spinner = true
				}}
				use:enhance={() => {
					return async ({ result, formElement }) => {
						await applyAction(result)
						if (result.type === 'success') {
							formElement.reset()
							showToast('Success', 'Job post created successfully', 'success')
							setTimeout(() => {
								location.href = '/emp/job-posts'
							}, 2000)
						}
						if (form?.errors) showToast('Error', form.error, 'error')

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
							<label for="job_type" class="block mb-2 font-medium text-gray-600 dark:text-zinc-100"
								>Select Employment type<span class="text-red-500">*</span></label
							>
							<MultiSelect
								name="job_type"
								placeholder="Select from the list..."
								options={['Freelancer', 'Part Time', 'Full Time']}
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
							value={new Date().toISOString().split('T')[0]}
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
						<label for="categories" class="block mb-2 font-medium text-gray-600 dark:text-gray-100"
							>Choose categories</label
						>
						<MultiSelect
							placeholder="Select from the list..."
							name="categories"
							options={categoryList}
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
								name="description"
								id="description"
								rows="5"
								required
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
							type="submit">Publish</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
