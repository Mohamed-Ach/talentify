<script lang="ts">
	// ** Importing Functions :
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import Spinner from '$lib/components/Spinner.svelte'
	import { applyAction, enhance } from '$app/forms'
	export let form: any

	// ** Icons :
	import User from 'phosphor-svelte/lib/User'

	// Toggle Password Visibility
	let spinner = false

	// ** Form Validation :
	let errorEmail: string = ''
	const validateEmail = (event: any) => {
		const email = (event.target as HTMLInputElement).value
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			errorEmail = 'Invalid email address.'
		} else {
			errorEmail = ''
		}
	}

	function handleSubmit(event: any) {
		if (errorEmail) {
			event.preventDefault()
		} else {
			spinner = true
		}
	}
	// Toast
	const showToast = (title: string, description: string, type: ToastType, duration = 5000) => {
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

<!-- <Spinner show={spinner} />

<div class="my-auto">
	<div class="text-center mb-8">
		<h5 class="text-gray-600 dark:text-gray-100">Reset Password</h5>
		<p class="text-gray-500 mt-1 dark:text-zinc-100/60">Reset your password now.</p>
	</div>

	<div class="px-5 py-3 bg-green-500/10 border-2 border-green-500/30 rounded">
		<p class="text-green-500">Enter your Email and instructions will be sent to you!</p>
	</div>

	<form
		class="mt-4 pt-2"
		method="POST"
		on:submit={handleSubmit}
		use:enhance={() => {
			return async ({ result, formElement }) => {
				await applyAction(result)
				if (result.type === 'success') {
					formElement.reset()
				}
				spinner = false
			}
		}}
	>
		<div class="mb-6">
			<label for="email" class="text-gray-600 font-medium mb-2 block dark:text-gray-100"
				>Email</label
			>
			<input
				required
				on:input={validateEmail}
				type="email"
				name="email"
				class="{errorEmail
					? 'border-error'
					: ''} w-full border-gray-100 rounded placeholder:text-sm py-2 placeholder:text-gray-400 dark:bg-zinc-700/50 dark:border-zinc-600 dark:text-gray-100 dark:placeholder:text-zinc-100/60"
				id="email"
				placeholder="Enter email"
			/>
			{#if errorEmail}
				<div class="inline-flex items-center text-sm text-red-600">
					<span>{errorEmail}</span>
				</div>
			{/if}
		</div>

		<div class="mb-4">
			<button
				disabled={errorEmail ? true : false}
				class="btn border-transparent bg-violet-500 w-full py-2.5 text-white w-100 waves-effect waves-light shadow-md shadow-violet-200 dark:shadow-zinc-600"
				on:click={() => (spinner = true)}
				type="submit">Reset</button
			>
		</div>
	</form>

	{#if form?.error}
		<div class="relative px-5 py-3 mt-5 border-2 bg-red-50 text-red-700 border-red-100 rounded">
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

	<div class="mt-12 text-center">
		<p class="text-gray-500 dark:text-zinc-100">
			Remember It ? <a href="/login" class="text-violet-500 font-semibold"> Sign In </a>
		</p>
	</div>
</div> -->

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
		<h3 class="text-gray-800 text-3xl font-extrabold dark:text-white">Reset Password</h3>
		<p class="text-gray-500 text-sm mt-4 leading-relaxed">
			Reset your password now. Enter your Email and instructions will be sent to you!
		</p>
	</div>

	<div>
		<label for="email" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Email<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorEmail
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-800 dark:text-white"
				placeholder="Enter email"
				on:input={validateEmail}
				name="email"
				type="email"
				required
			/>
			<User size={24} weight="duotone" class="absolute right-4 text-gray-400" />
		</div>
		{#if errorEmail}
			<span class="text-red-600">{errorEmail}</span>
		{/if}
	</div>

	<div class="!mt-8">
		<button
			class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
			type="submit"
		>
			Send
		</button>
	</div>
	<p class="text-sm !mt-8 text-center text-gray-800 dark:text-white">
		Remember it ? <a
			href="/login"
			class="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a
		>
	</p>
</form>
