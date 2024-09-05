<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import { applyAction, enhance } from '$app/forms'

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

	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'
	import { goto } from '$app/navigation'

	let spinner = false
</script>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<Spinner show={spinner} />

<PageTitle
	title="Quiz"
	breadcrumbs={[
		{ name: 'quiz', link: null },
		{ name: 'create', link: null }
	]}
/>
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
							if (result.status === 200) {
								showToast('Success', 'Feedback shared successfully', 'success')
								setTimeout(() => {
									goto('/dashboard')
								}, 2000)
							} else {
								showToast('Error', 'Something went wrong', 'error')
								spinner = false
							}
							spinner = false
						}
					}}
				>
					<div class="mb-6 card-body">
						<div class="grid grid-cols-1 lg:grid-cols-12">
							<div class="col-span-12 md:max-w-2xl mx-auto">
								<div class="text-center my-5">
									<h5 class="text-gray-700 dark:text-gray-100">
										We're interested in hearing from you!
									</h5>
									<p class="mt-2 text-gray-500 dark:text-zinc-100/60 md:mx-2">
										Your thoughts matter to us. Please let us know how we're doing. Help us enhance
										your experience by providing your feedback.
									</p>
								</div>
							</div>
						</div>

						<div class="grid lg:grid-cols-3 grid-cols-1 mt-8">
							<!-- Left Section -->
							<div></div>

							<!-- Middle Section -->
							<div>
								<h5 class="mb-3 font-size-16 dark:text-gray-100">Leave an Opinion:</h5>
								<div>
									<div class="col-span-12 md:col-span-6">
										<div class=" block mb-5">
											<label
												for="email"
												class="font-primary font-medium text-gray-700 dark:text-gray-100"
												>Subject</label
											>
											<input
												class="w-full mt-2 rounded border-gray-50 placeholder:text-13 placeholder:text-gray-400 dark:bg-zinc-700/50 dark:border-zinc-600 focus:ring focus:ring-violet-500/20 focus:border-violet-100 dark:text-gray-100 text-13"
												placeholder="Enter the subject..."
												id="commentemail-input"
												name="subject"
												type="text"
												required
											/>
										</div>
									</div>
								</div>
								<div class="mb-3">
									<label
										for="message"
										class="font-primary font-medium text-gray-700 dark:text-gray-100">Message</label
									>
									<textarea
										class="w-full mt-2 rounded border-gray-50 placeholder:text-13 placeholder:text-gray-400 dark:bg-zinc-700/50 dark:border-zinc-600 focus:ring focus:ring-violet-500/20 focus:border-violet-100 dark:text-gray-100 text-13"
										placeholder="Enter your message..."
										id="commentmessage-input"
										name="message"
										required
										rows="4"
									></textarea>
								</div>
							</div>

							<!-- Right Section -->
							<div></div>
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
								type="submit">Share</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
