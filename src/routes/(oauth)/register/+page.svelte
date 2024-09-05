<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import { API_URL } from '$lib/stores'

	// ** Icons :
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo'
	import GoogleLogo from 'phosphor-svelte/lib/GoogleLogo'
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed'
	import Envelope from 'phosphor-svelte/lib/Envelope'
	import User from 'phosphor-svelte/lib/User'
	import Eye from 'phosphor-svelte/lib/Eye'

	// ** Importing Functions :
	import Spinner from '$lib/components/Spinner.svelte'
	import { applyAction, enhance } from '$app/forms'
	export let form: any

	// ** Form Validation :
	let errorConfirmPassword: string = ''
	let errorFirstName: string = ''
	let errorLastName: string = ''
	let errorPassword: string = ''
	let errorEmail: string = ''
	let errorTerms: string = ''
	$: isAnyError =
		errorFirstName ||
		errorLastName ||
		errorEmail ||
		errorPassword ||
		errorConfirmPassword ||
		errorTerms

	const validateFirstName = (event: any) => {
		const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/
		const firstName = event.target as HTMLInputElement
		if (!firstName) return
		else if (firstName.value.length < 3 || firstName.value.length > 30)
			errorFirstName = 'First Name must be between 3 and 30 characters.'
		else if (regex.test(firstName.value))
			errorFirstName = 'First Name cannot contain numbers or special characters.'
		else errorFirstName = ''
	}

	const validateLastName = (event: any) => {
		const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]/
		const lastName = event.target as HTMLInputElement
		if (!lastName) return
		else if (lastName.value.length < 3 || lastName.value.length > 30)
			errorLastName = 'Last Name must be between 3 and 30 characters.'
		else if (regex.test(lastName.value))
			errorLastName = 'Last Name cannot contain numbers or special characters.'
		else errorLastName = ''
	}

	const validateEmail = (event: any) => {
		const email = (event.target as HTMLInputElement).value
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			errorEmail = 'Invalid email address.'
		} else {
			errorEmail = ''
		}
	}

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

	const validateTerms = (event: any) => {
		const input = (event.target as HTMLInputElement).checked
		if (!input) {
			errorTerms = 'You must accept the terms and conditions.'
		} else {
			errorTerms = ''
		}
	}

	// Toggle Password Visibility
	let view = false
	let spinner = false

	function handleSubmit(event: any) {
		if (isAnyError) {
			event.preventDefault()
		} else {
			spinner = true
		}
	}

	// Toast
	const showToast = (
		title: string,
		description: string,
		type: ToastType,
		duration: number = 5000
	) => {
		toasts.add({
			title,
			description,
			duration,
			type,
			theme: 'dark',
			placement: 'top-center',
			showProgress: true,
			onClick: () => {},
			onRemove: () => {}
		})
	}
</script>

<Spinner show={spinner} />

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<form
	class="space-y-4"
	method="POST"
	on:submit={handleSubmit}
	use:enhance={() => {
		return async ({ result, formElement }) => {
			await applyAction(result)
			spinner = false
			if (form?.error) showToast('Error', form.error, 'error')
			if (form?.success) {
				formElement.reset()
				showToast('Success', form.success, 'success', 0)
			}
		}
	}}
>
	<div class="mb-8">
		<h3 class="text-gray-800 text-3xl font-extrabold dark:text-white">Sign in</h3>
		<p class="text-gray-500 text-sm mt-4 leading-relaxed">
			Sign up to create your account and explore a world of possibilities. Your journey begins here.
		</p>
	</div>
	<div>
		<label for="firstName" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>First Name<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorFirstName
					? 'border-error'
					: ''}  w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
				placeholder="Enter First Name"
				on:input={validateFirstName}
				name="firstName"
				type="text"
				required
			/>
			<User size={24} weight="duotone" class="absolute right-4 text-gray-400" />
		</div>
		{#if errorFirstName}
			<span class="text-red-600 mt-1">{errorFirstName}</span>
		{/if}
	</div>
	<div>
		<label for="lastName" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Last Name<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorLastName
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
				placeholder="Enter Last Name"
				on:input={validateLastName}
				name="lastName"
				type="text"
				required
			/>
			<User size={24} weight="duotone" class="absolute right-4 text-gray-400" />
		</div>
		{#if errorLastName}
			<span class="text-red-600 mt-1">{errorLastName}</span>
		{/if}
	</div>

	<div>
		<label for="email" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Email<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorEmail
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
				placeholder="Enter email"
				on:input={validateEmail}
				name="email"
				type="email"
				required
			/>
			<Envelope size={24} weight="duotone" class="absolute right-4 text-gray-400" />
		</div>
		{#if errorEmail}
			<span class="text-red-600 mt-1">{errorEmail}</span>
		{/if}
	</div>
	<div>
		<label for="password" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Password<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorPassword
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
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
			<span class="text-red-600 mt-1">{errorPassword}</span>
		{/if}
	</div>

	<div>
		<label for="password" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Confirm Password<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorConfirmPassword
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
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
			<span class="text-red-600 mt-1">{errorConfirmPassword}</span>
		{/if}
	</div>

	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center">
			<input
				class="{errorTerms
					? 'border-error'
					: ''} h-4 w-4 shrink-0 text-violet-600 focus:ring-violet-500 border-gray-300 rounded dark:bg-gray-900"
				name="termsAndConditions"
				on:input={validateTerms}
				id="termsAndConditions"
				type="checkbox"
				checked
			/>
			<label for="remember-me" class="ml-3 block text-sm text-gray-800 dark:text-white">
				Accept the terms and conditions
			</label>
		</div>
		{#if errorTerms}
			<span class="text-red-600">{errorTerms}</span>
		{/if}
	</div>

	<div class="!mt-8">
		<button
			class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
			disabled={isAnyError ? true : false}
			type="submit"
		>
			Register
		</button>
	</div>

	<div class="mt-4 pt-2 text-center">
		<div>
			<h6 class="text-14 mb-3 text-gray-500 dark:text-gray-100 font-medium">- Sign up with -</h6>
		</div>

		<div class="flex justify-center items-center gap-3">
			<a
				href={API_URL + '/auth/google'}
				class="flex justify-center items-center h-9 w-9 bg-red-600 leading-[2.9] rounded-full"
			>
				<GoogleLogo size={24} weight="bold" class="text-white" />
			</a>
			<a
				href={API_URL + '/auth/github'}
				class="flex justify-center items-center h-9 w-9 bg-gray-900 leading-[2.9] rounded-full"
			>
				<GithubLogo size={24} weight="bold" class="text-white" />
			</a>
		</div>
	</div>

	<p class="text-sm !mt-8 text-center text-gray-800 dark:text-white">
		Already have an account <a
			href="/login"
			class="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a
		>
	</p>
</form>
