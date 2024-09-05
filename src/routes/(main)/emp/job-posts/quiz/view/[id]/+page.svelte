<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	// ** Components
	import PageTitle from '$lib/components/PageTitle.svelte'

	// ** Icons
	import Minus from 'phosphor-svelte/lib/Minus'
	import Plus from 'phosphor-svelte/lib/Plus'
	import { applyAction, enhance } from '$app/forms'

	// Sample data for accordion items
	let accordionItems: any = []
	for (let i = 1; i <= 10; i++) {
		accordionItems.push({ title: `Question ${i}`, isOpen: false, answered: false })
	}

	// Function to toggle the accordion item
	function toggleAccordion(index: number) {
		accordionItems = accordionItems.map((item: any, i: number) => {
			if (i === index) {
				return { ...item, isOpen: !item.isOpen }
			}
			return item
		})
	}
</script>

<PageTitle
	title="Job Post"
	breadcrumbs={[
		{ name: 'Job Posts', link: '/emp/job-posts ' },
		{ name: 'Quiz', link: null }
	]}
/>

{#await data.survey}
	<div class="flex justify-center items-center">
		<div
			class="spinner-border animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-violet-500 rounded-full"
		>
			<span class="hidden">Loading...</span>
		</div>
	</div>
{:then survey}
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body border-b border-gray-100 dark:border-zinc-600">
			<h6 class="mb-1 text-gray-700 text-15 dark:text-gray-100">Pass The Quiz (10 questions)</h6>
		</div>

		<div class="grid grid-cols-1 xl:grid-cols-2 gap-4 card-body">
			<!-- Left Column -->
			<div class="flex flex-col gap-4">
				{#each accordionItems.slice(0, 5) as item, index}
					<div class="text-gray-700 accordion-item">
						<h2>
							<button
								type="button"
								class="flex items-center justify-between w-full p-3 font-medium text-left border border-b-0 border-gray-100 rounded-t-lg
								   accordion-header group hover:bg-gray-50/50 dark:hover:bg-zinc-700/50 dark:border-zinc-600 {item.isOpen
									? 'active'
									: ''}"
								on:click={() => toggleAccordion(index)}
							>
								<span class="text-15">{item.title}</span>
								<Plus size={24} weight="bold" class="text-xl group-[.active]:hidden block" />
								<Minus size={24} weight="bold" class="text-xl group-[.active]:block hidden" />
							</button>
						</h2>
						<div class="accordion-body text-md {item.isOpen ? '' : 'hidden'}">
							<div class="p-5 font-light border border-b-0 border-gray-100 dark:border-zinc-600">
								<p class="font-primary font-bold text-lg mb-2 text-gray-500 dark:text-gray-400">
									{survey.questions[index].question}
								</p>
								<p class="font-primary font-bold mb-2 text-violet-500 dark:text-gray-400">
									Options
								</p>
								<input
									type="text"
									name="question{index}"
									value={survey.questions[index].id}
									hidden
								/>
								<select
									class="font-primary font-semibold text-md p-5 dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
									name="answer{index}"
									required
								>
									<option value="">Select...</option>
									{#each survey.questions[index].options as option}
										<option value={option.id}>{option.option_text}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Right Column -->
			<div class="flex flex-col gap-4">
				{#each accordionItems.slice(5, 10) as item, index}
					<div class="text-gray-700 accordion-item">
						<h2>
							<button
								type="button"
								class="flex items-center justify-between w-full p-3 font-medium text-left border border-b-0 border-gray-100 rounded-t-lg
									accordion-header group hover:bg-gray-50/50 dark:hover:bg-zinc-700/50 dark:border-zinc-600 {item.isOpen
									? 'active'
									: ''}"
								on:click={() => toggleAccordion(index + 5)}
							>
								<span class="text-15">{item.title} </span>
								<Plus size={24} weight="bold" class="text-xl group-[.active]:hidden block" />
								<Minus size={24} weight="bold" class="text-xl group-[.active]:block hidden" />
							</button>
						</h2>
						<div class="accordion-body text-md {item.isOpen ? '' : 'hidden'}">
							<div class="p-5 font-light border border-b-0 border-gray-100 dark:border-zinc-600">
								<p class="font-primary font-bold text-lg mb-2 text-gray-500 dark:text-gray-400">
									{survey.questions[index + 5].question}
								</p>
								<p class="font-primary font-bold mb-2 text-violet-500 dark:text-gray-400">
									Options
								</p>
								<input
									type="text"
									name="question{index + 5}"
									value={survey.questions[index + 5].id}
									required
									hidden
								/>
								<select
									class="font-primary font-semibold text-md p-5 dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
									name="answer{index + 5}"
									required
								>
									<option value="">Select...</option>
									{#each survey.questions[index + 5].options as option}
										<option value={option.id}>{option.option_text}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:catch error}
	<p>error loading survey: {error.message}</p>
{/await}
