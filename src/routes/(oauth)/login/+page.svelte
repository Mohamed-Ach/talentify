<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import { applyAction, enhance } from '$app/forms'
	import { API_URL } from '$lib/stores'

	// ** Components :
	import Spinner from '$lib/components/Spinner.svelte'

	// ** Icons :
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo'
	import GoogleLogo from 'phosphor-svelte/lib/GoogleLogo'
	import EyeClosed from 'phosphor-svelte/lib/EyeClosed'
	import User from 'phosphor-svelte/lib/User'
	import Eye from 'phosphor-svelte/lib/Eye'

	export let form: any

	// Toggle Password Visibility
	let view = false
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

<Spinner show={spinner} />

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<form
	class="space-y-4"
	method="POST"
	on:submit={() => (spinner = true)}
	use:enhance={() => {
		return async ({ result }) => {
			await applyAction(result)
			spinner = false
			if (form?.error) showToast('Error', form.error, 'error')
			else showToast('Success', 'Logged in successfully', 'success')
		}
	}}
>
	<div class="mb-8">
		<h3 class="text-gray-800 text-3xl font-extrabold dark:text-white">Sign in</h3>
		<p class="text-gray-500 text-sm mt-4 leading-relaxed">
			Sign in to your account and explore a world of possibilities. Your journey begins here.
		</p>
	</div>

	<div>
		<label for="email" class="text-gray-800 text-sm mb-2 block dark:text-white">Email</label>
		<div class="relative flex items-center">
			<input
				name="email"
				type="text"
				required
				class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
				placeholder="Enter email"
			/>
			<User size={24} weight="duotone" class="absolute right-4 text-gray-400" />
		</div>
	</div>
	<div>
		<label for="password" class="text-gray-800 text-sm mb-2 block dark:text-white">Password</label>
		<div class="relative flex items-center">
			<input
				name="password"
				type={view ? 'text' : 'password'}
				required
				class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg dark:bg-gray-900 dark:text-white"
				placeholder="Enter password"
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
	</div>

	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex items-center">
			<input
				id="remember-me"
				name="remember-me"
				type="checkbox"
				class="h-4 w-4 shrink-0 text-violet-600 focus:ring-violet-500 border-gray-300 rounded dark:bg-gray-900"
			/>
			<label for="remember-me" class="ml-3 block text-sm text-gray-800 dark:text-white">
				Remember me
			</label>
		</div>

		<div class="text-sm">
			<a href="/recover-password" class="text-violet-600 hover:underline font-semibold">
				Forgot your password?
			</a>
		</div>
	</div>

	<div class="!mt-8">
		<button
			class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
			type="submit"
		>
			Log in
		</button>
	</div>

	<div class="mt-4 pt-2 text-center">
		<div>
			<h6 class="text-14 mb-3 text-gray-500 dark:text-gray-100 font-medium">- Sign in with -</h6>
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
		Don't have an account <a
			href="/register"
			class="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a
		>
	</p>
</form>
