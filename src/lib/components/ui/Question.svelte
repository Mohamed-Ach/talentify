<script lang="ts">
	import Question from 'phosphor-svelte/lib/Question'
	import Select from 'svelte-select'

	export let questions: any
	export let index: number

	let items = [{ value: 0, label: 'New' }]
	for (const question in questions)
		items.push({ value: questions[question].id, label: questions[question].question })

	let selected: (typeof items)[0]
	let choices: number = 2
</script>

<div class="overflow-hidden border rounded-md border-gray-50 dark:border-zinc-600">
	<div class="relative">
		<Question
			size={64}
			weight="bold"
			class="absolute text-7xl text-violet-50/50 ltr:-right-3 rtl:-left-4 -top-6 dark:text-violet-500/10"
		/>
	</div>
	<div class="p-5">
		<h5 class="text-violet-500 font-medium">{index < 10 ? '0' + index + '.' : index + '.'}</h5>

		<Select
			name="question-{index}"
			placeholder=". What is Lorem Ipsum?"
			class="w-full mt-3 font-primary font-bold text-gray-700 dark:text-gray-100 dark:bg-zinc-800"
			{items}
			floatingConfig={{
				strategy: 'fixed'
			}}
			bind:value={selected}
			required
		/>

		<div
			class="{selected?.value === 0
				? 'opacity-100 scale-100'
				: 'hidden opacity-0 scale-95'} transform transition duration-150 ease-in-out"
		>
			<!-- Question -->
			<div
				class="font-primary font-bold flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600 my-4"
			>
				<div class="px-4 text-2xl input-group-text text-gray-700 dark:text-zinc-100">?</div>
				<input
					class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
					required={selected?.value !== 0 ? false : true}
					placeholder="Enter the question..."
					name="question-{index}-question"
					type="text"
				/>
			</div>
			<!-- Question -->

			<!-- First Options -->
			<div class="flex content-center gap-4">
				<div
					class="font-primary font-bold flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600 my-4"
				>
					<div class="px-4 text-2xl input-group-text text-gray-700 dark:text-zinc-100">~</div>
					<input
						class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
						required={selected?.value !== 0 ? false : true}
						placeholder="Enter the answer..."
						name="question-{index}-answer-1"
						type="text"
					/>
				</div>
				<div class="flex justify-center items-center gap-2 font-primary font-bold">
					<input
						class="ring-0 ring-offset-0 focus:bg-violet-500 dark:bg-zinc-700 dark:border-zinc-400 dark:checked:bg-violet-500"
						name="question-{index}-correct-answer"
						type="radio"
						value="1"
					/>
					<label
						class="text-sm font-medium text-gray-900 ltr:ml-2 rtl:mr-2 dark:text-gray-300"
						for="default-radio-1">Correct Answer</label
					>
				</div>
			</div>
			<!-- First Options -->

			<!-- Second Options -->
			<div class="flex content-center gap-4">
				<div
					class="font-primary font-bold flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600 my-4"
				>
					<div class="px-4 text-2xl input-group-text text-gray-700 dark:text-zinc-100">~</div>
					<input
						class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
						required={selected?.value !== 0 ? false : true}
						placeholder="Enter the answer..."
						name="question-{index}-answer-2"
						type="text"
					/>
				</div>
				<div class="flex justify-center items-center gap-2 font-primary font-bold">
					<input
						class="ring-0 ring-offset-0 focus:bg-violet-500 dark:bg-zinc-700 dark:border-zinc-400 dark:checked:bg-violet-500"
						name="question-{index}-correct-answer"
						type="radio"
						value="2"
					/>
					<label
						for="default-radio-1"
						class="text-sm font-medium text-gray-900 ltr:ml-2 rtl:mr-2 dark:text-gray-300"
						>Correct Answer</label
					>
				</div>
			</div>
			<!-- Second Options -->

			<!-- Third Options -->
			<div class="flex content-center gap-4 {choices > 2 ? '' : 'hidden'}">
				<div
					class="font-primary font-bold flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600 my-4"
				>
					<div class="px-4 text-2xl input-group-text text-gray-700 dark:text-zinc-100">~</div>
					<input
						class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
						placeholder="Enter the answer..."
						name="question-{index}-answer-3"
						required={choices >= 3}
						type="text"
					/>
				</div>
				<div class="flex justify-center items-center gap-2 font-primary font-bold">
					<input
						class="ring-0 ring-offset-0 focus:bg-violet-500 dark:bg-zinc-700 dark:border-zinc-400 dark:checked:bg-violet-500"
						name="question-{index}-correct-answer"
						type="radio"
						value="3"
					/>
					<label
						for="default-radio-1"
						class="text-sm font-medium text-gray-900 ltr:ml-2 rtl:mr-2 dark:text-gray-300"
						>Correct Answer</label
					>
				</div>
			</div>
			<!-- Third Options -->

			<!-- Fourth Options -->
			<div class="flex content-center gap-4 {choices === 4 ? '' : 'hidden'}">
				<div
					class="font-primary font-bold flex items-center border rounded bg-gray-50 dark:border-zinc-600 dark:bg-zinc-600 my-4"
				>
					<div class="px-4 text-2xl input-group-text text-gray-700 dark:text-zinc-100">~</div>
					<input
						class="w-full border-0 border-l border-gray-100 placeholder:text-sm focus:border-violet-100 focus:ring focus:ring-violet-500/20 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:placeholder:text-zinc-100"
						placeholder="Enter the answer..."
						name="question-{index}-answer-4"
						required={choices === 4}
						type="text"
					/>
				</div>
				<div class="flex justify-center items-center gap-2 font-primary font-bold">
					<input
						class="ring-0 ring-offset-0 focus:bg-violet-500 dark:bg-zinc-700 dark:border-zinc-400 dark:checked:bg-violet-500"
						name="question-{index}-correct-answer"
						type="radio"
						value="4"
					/>
					<label
						for="default-radio-1"
						class="text-sm font-medium text-gray-900 ltr:ml-2 rtl:mr-2 dark:text-gray-300"
						>Correct Answer</label
					>
				</div>
			</div>
			<!-- Fourth Options -->

			<!-- Add More -->
			<div
				class="flex justify-center items-center font-primary font-semibold text-violet-500 gap-5"
			>
				<button
					on:click={() => choices < 4 && choices++}
					type="button"
					class={choices < 4 ? '' : 'hidden'}>Add</button
				>
				<button
					on:click={() => choices > 2 && choices--}
					type="button"
					class={choices > 2 ? '' : 'hidden'}>Remove</button
				>
			</div>
			<!-- Add More -->
		</div>
	</div>
</div>
