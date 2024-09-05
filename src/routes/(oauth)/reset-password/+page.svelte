<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	export let data: PageData

	// ** Icons :
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed'
	import Warning from 'phosphor-svelte/lib/Warning'
	import Eye from 'phosphor-svelte/lib/Eye'

	// ** Importing Functions :
	import Spinner from '$lib/components/Spinner.svelte'
	import { applyAction, enhance } from '$app/forms'
	export let form: any

	// ** Form Validation :
	let errorConfirmPassword: string = ''
	let errorPassword: string = ''
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

	function redirectTo(timeout: number, url: string): string {
		setTimeout(() => {
			window.location.href = url
		}, timeout)

		return ''
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
			if (form?.error) {
				showToast('Error', form.error, 'error')
				redirectTo(2000, '/recover-password')
			}
			if (form?.success) {
				formElement.reset()
				showToast('Success', form.success, 'success', 0)
				redirectTo(2000, '/login')
			}
		}
	}}
>
	<div class="mb-8">
		<h3 class="text-gray-800 text-3xl font-extrabold dark:text-white">Reset Password</h3>
		<p class="text-gray-500 text-sm mt-4 leading-relaxed">
			Please enter your new password. Make sure it's at least 8 characters long with numbers and
			special characters.
		</p>
	</div>

	{#if typeof data.verify.message === 'object'}
		<input type="text" name="email" value={data.verify.message.email} hidden />
		<input type="text" name="expires" value={data.verify.message.expires} hidden />
		<input type="text" name="signature" value={data.verify.message.signature} hidden />
		<input type="text" name="token" value={data.verify.message.token} hidden />
	{/if}

	<div>
		<label for="password" class="text-gray-800 text-sm mb-2 block dark:text-white"
			>Password<span class="text-red-600">*</span></label
		>
		<div class="relative flex items-center mb-2">
			<input
				class="{errorPassword
					? 'border-error'
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-800 dark:text-white"
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
					: ''} w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-800 dark:text-white"
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

	<div class="!mt-8">
		<button
			class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
			disabled={isAnyError ? true : false}
			type="submit"
		>
			Update
		</button>
	</div>

	<p class="text-sm !mt-8 text-center text-gray-800 dark:text-white">
		Remember it ? <a
			href="/login"
			class="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap">Login here</a
		>
	</p>
</form>
