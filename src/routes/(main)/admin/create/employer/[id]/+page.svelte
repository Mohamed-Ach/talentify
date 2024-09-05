<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import { applyAction, enhance } from '$app/forms'
	export let form: any

	// Components
	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'

	// Icons
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed'
	import Eye from 'phosphor-svelte/lib/Eye'

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

	// Spinner
	let spinner = false
	let view = false

	// Validation
	let errorConfirmPassword = ''
	let errorPassword = ''

	$: isAnyError = errorPassword || errorConfirmPassword

	const validatePassword = (event: any) => {
		const password = (event.target as HTMLInputElement).value
		if (password.length < 8) {
			errorPassword = 'Password must be at least 8 characters long.'
		} else if (!/\d/.test(password)) {
			errorPassword = 'Password must contain at least one number.'
		} else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
			errorPassword = 'Password must contain at least one special character.'
		} else {
			errorPassword = ''
		}
	}

	const validateConfirmPassword = (event: any) => {
		const password = (event.target as HTMLInputElement).value
		const confirmPassword = (document.getElementById('password') as HTMLInputElement).value
		if (password !== confirmPassword) {
			errorConfirmPassword = 'The two passwords do not match.'
		} else {
			errorConfirmPassword = ''
		}
	}

	function handleSubmit(event: any) {
		if (isAnyError) {
			event.preventDefault()
		} else {
			spinner = true
		}
	}
</script>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<Spinner show={spinner} />

<PageTitle
	title="Create Company"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/admin/dashboard' },
		{ name: 'create', link: null }
	]}
/>
<section class="py-24 relative">
	<div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
		<form
			class="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex"
			method="POST"
			on:submit={handleSubmit}
			use:enhance={() => {
				return async ({ result, formElement }) => {
					await applyAction(result)
					if (result.type === 'success') {
						formElement.reset()
						showToast('Success', 'Employer created successfully', 'success')
						window.location.href = '/admin/view/companies'
					}
					if (form?.error) showToast('Error', form.error, 'error')
					spinner = false
				}
			}}
		>
			<div class="w-full flex-col justify-center items-center gap-4 flex">
				<h2
					class="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal dark:text-white"
				>
					Create Employer's Profile
				</h2>
				<p
					class="font-secondary max-w-4xl text-center text-gray-500 text-base font-normal leading-relaxed dark:text-gray-300"
				>
					Create a new employer profile by filling in the details below.
				</p>
			</div>
			<div class="w-full flex-col justify-start items-start gap-6 flex">
				<h4 class="text-gray-900 text-xl font-semibold leading-loose dark:text-white">
					Employer's Details
				</h4>
				<div class="w-full flex-col justify-start items-start gap-8 flex">
					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="first-name"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>First Name
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter First Name"
								name="firstName"
								type="text"
								required
							/>
						</div>
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-title"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Last Name
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter Last Name"
								name="lastName"
								type="text"
							/>
						</div>
					</div>
					<div class="w-full sm:w-1/2 justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="email"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Email
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter email"
								name="email"
								type="email"
								required
							/>
						</div>
					</div>

					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="password"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Password
								<span class="text-red-500">*</span>
							</label>
							<div class="relative flex items-center mb-2 w-full">
								<input
									class="{errorPassword
										? 'border-error'
										: ''} font-secondary w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
									type={view ? 'text' : 'password'}
									placeholder="Enter password"
									on:input={validatePassword}
									name="password"
									id="password"
									required
								/>
								<button
									type="button"
									class="flex items-center justify-center"
									on:click={() => (view = !view)}
								>
									<svelte:component
										this={view ? EyeClosed : Eye}
										class="absolute right-4 text-gray-400"
										weight="duotone"
										size={24}
									/>
								</button>
							</div>
							{#if errorPassword}
								<p class="font-secondary text-red-500 text-sm">{errorPassword}</p>
							{/if}
						</div>
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-foundation"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Confirm Password
								<span class="text-red-500">*</span>
							</label>
							<div class="relative flex items-center mb-2 w-full">
								<input
									class="{errorConfirmPassword
										? 'border-error'
										: ''} font-secondary w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
									on:input={validateConfirmPassword}
									type={view ? 'text' : 'password'}
									placeholder="Enter password"
									name="passwordConfirmation"
									required
								/>
								<button
									type="button"
									class="flex items-center justify-center"
									on:click={() => (view = !view)}
								>
									<svelte:component
										this={view ? EyeClosed : Eye}
										class="absolute right-4 text-gray-400"
										weight="duotone"
										size={24}
									/>
								</button>
							</div>
							{#if errorConfirmPassword}
								<p class="font-secondary text-red-500 text-sm">{errorConfirmPassword}</p>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<div class="w-full flex items-center justify-end gap-2">
				<button
					class="text-white font-seconday font-bold text-base sm:w-fit w-full px-6 py-2 bg-green-400 hover:bg-green-500 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex"
					type="reset"
				>
					Reset
				</button>
				<button
					class="text-white font-seconday font-bold text-base sm:w-fit w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex"
					disabled={isAnyError ? true : false}
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</section>
