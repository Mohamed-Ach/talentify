<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import type { PageData } from '../$types'
	export let data: PageData

	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import Question from '$lib/components/ui/Question.svelte'

	export let form: any
	let spinner = false
</script>

<PageTitle
	title="Quiz"
	breadcrumbs={[
		{ name: 'quiz', link: null },
		{ name: 'create', link: null }
	]}
/>

<Spinner show={spinner} />

<div class="grid grid-cols-12 gap-6 mb-5">
	<div class="col-span-12">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="mb-6 card-body">
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
					<div class="mb-6 card-body">
						<div class="grid grid-cols-1 lg:grid-cols-12">
							<div class="col-span-12 md:max-w-2xl mx-auto">
								<div class="text-center my-5">
									<h5 class="text-gray-700 dark:text-gray-100">Add a quiz to your job listings</h5>
									<p class="mt-2 text-gray-500 dark:text-zinc-100/60 md:mx-2">
										The quiz must be composed of 10 questions with multiple choices (Each question
										must have at least 2 choices and at most 4)
									</p>
								</div>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-12 md:mt-0">
							{#each Array(10) as _, i}
								<Question index={i + 1} questions={data.questions.questions} />
							{/each}
						</div>
					</div>
					<div class="mt-16">
						<div class="float-right pb-5 space-x-2">
							<button
								class="btn bg-green-500 border-transparent text-white shadow-md shadow-green-200 dark:shadow-zinc-600"
								type="reset">Reset</button
							>
							<button
								class="btn bg-violet-500 border-violet-500 text-white w-28 shadow-md shadow-violet-100 dark:shadow-zinc-600"
								type="submit">Add</button
							>
						</div>
					</div>
				</form>
				{#if form?.error}
					<div
						class="relative px-5 py-3 mt-5 border-2 bg-red-50 text-red-700 border-red-100 rounded"
					>
						<p>{form.error}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
