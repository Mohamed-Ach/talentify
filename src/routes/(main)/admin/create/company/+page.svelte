<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import { applyAction, enhance } from '$app/forms'
	export let form: any

	// Components
	import PageTitle from '$lib/components/PageTitle.svelte'
	import Spinner from '$lib/components/Spinner.svelte'

	// Icons
	import Upload from 'phosphor-svelte/lib/Upload'

	// Avatar Upload
	let imageUrl: string = ''
	let avatar: string = ''
	function triggerInput() {
		const fileInput = document.getElementById('avatar') as HTMLInputElement
		if (fileInput) {
			fileInput.click()
		}
	}

	async function handleAvatarChange(event: any) {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				if (e.target && e.target.result) {
					imageUrl = e.target.result.toString()
				}
			}
			reader.readAsDataURL(file)
		}
		errorUpload = true
		await uploadImage(file)
		errorUpload = false
		showToast('Success', 'Profile avatar added successfully', 'success')
	}

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

	// Upload Image
	let errorUpload = false
	async function uploadImage(file: File) {
		const formData = new FormData()
		formData.append('file', file)

		const response = await fetch('/api/cloudinary', {
			method: 'POST',
			body: formData
		})

		const result = await response.json()
		if (response.ok) {
			avatar = result.url
		} else {
			console.error('Upload failed:', result.message)
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
			on:submit={() => {
				spinner = true
			}}
			use:enhance={() => {
				return async ({ result, formElement }) => {
					await applyAction(result)
					if (result.type === 'success') {
						formElement.reset()
						showToast('Success', 'Company created successfully', 'success')
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
					Create Company Profile
				</h2>
				<p
					class="font-secondary max-w-4xl text-center text-gray-500 text-base font-normal leading-relaxed dark:text-gray-300"
				>
					Create a company profile to get started with your company. This will help you to get the
					best candidates for your company.
				</p>
			</div>
			<div class="w-full flex-col justify-start items-start gap-6 flex">
				<h4 class="text-gray-900 text-xl font-semibold leading-loose dark:text-white">
					Company Details
				</h4>
				<div class="w-full flex-col justify-start items-start gap-8 flex">
					<div class="w-full flex flex-col justify-center items-center gap-2.5 mb-2">
						<div class="flex items-center justify-center">
							<div
								class="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
							>
								{#if imageUrl}
									<img
										src={imageUrl}
										alt="Thumbnail Preview"
										class="w-full h-full object-cover rounded-full"
									/>
								{:else}
									<span class="font-secondary font-bold text-4xl text-gray-600 dark:text-gray-300"
										>Logo</span
									>
								{/if}
							</div>
							<button
								class="w-32 h-32 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
								type="button"
								on:click={triggerInput}
							>
								<Upload size={32} weight="duotone" class="hidden group-hover:block w-12" />
							</button>
							<input
								on:change={handleAvatarChange}
								accept="image/*"
								type="file"
								id="avatar"
								hidden
							/>
							<input name="avatar" type="text" value={avatar} hidden />
						</div>
					</div>
					<!-- Profile Picture -->

					<!-- Company Banner -->
					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-name"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Name
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter Company Name"
								name="companyName"
								type="text"
								required
							/>
						</div>
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-title"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Title
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter Company Title"
								name="companyTitle"
								type="text"
							/>
						</div>
					</div>
					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-phone"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Phone Number
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="028 2154-2541"
								name="companyPhone"
								type="text"
								required
							/>
						</div>
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-address"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Address
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter the address"
								name="companyAddress"
								type="text"
								required
							/>
						</div>
					</div>

					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-foundation"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Founded In
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter the foundation date"
								name="companyFoundation"
								type="number"
								min="1900"
								max={new Date().getFullYear()}
								required
							/>
						</div>
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-size"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Size
								<span class="text-red-500">*</span>
							</label>
							<input
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Enter the size"
								name="companySize"
								type="number"
							/>
						</div>
					</div>

					<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
						<div class="w-full flex-col justify-start items-start gap-1.5 flex">
							<label
								for="company-bio"
								class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
								>Company Bio
								<span class="text-red-500">*</span>
							</label>
							<textarea
								class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
								placeholder="Write the company's bio..."
								name="companyBio"
								rows="5"
								required
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full flex-col justify-start items-start gap-6 flex">
				<h4 class="text-gray-900 text-xl font-semibold leading-loose dark:text-white">
					Company Contact Media
				</h4>

				<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
					<div class="w-full flex-col justify-start items-start gap-1.5 flex">
						<label
							for="company-website"
							class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
							>Company Website
							<span class="text-red-500">*</span>
						</label>
						<input
							class="font-secondary font-bold w-full focus:outline-none dark:text-white dark:bg-gray-900 text-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
							placeholder="Enter the company's website"
							name="companyWebsite"
							type="text"
							required
						/>
					</div>
					<div class="w-full flex-col justify-start items-start gap-1.5 flex">
						<label
							for="company-facebook"
							class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
							>Company Facebook
							<span class="text-red-500">*</span>
						</label>
						<input
							class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
							placeholder="Enter the company's facebook"
							name="companyFacebook"
							type="text"
							required
						/>
					</div>
				</div>

				<div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
					<div class="w-full flex-col justify-start items-start gap-1.5 flex">
						<label
							for="company-twitter"
							class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
							>Company Twitter
							<span class="text-red-500">*</span>
						</label>
						<input
							class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
							placeholder="Enter the company's twitter"
							name="companyTwitter"
							type="text"
							required
						/>
					</div>
					<div class="w-full flex-col justify-start items-start gap-1.5 flex">
						<label
							for="company-linkedIn"
							class="font-secondary font-bold flex gap-1 items-center text-gray-600 text-base leading-relaxed dark:text-white"
							>Company LinkedIn
							<span class="text-red-500">*</span>
						</label>
						<input
							class="font-secondary font-bold w-full focus:outline-none text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 text-sm leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
							placeholder="Enter the company's linkedIn"
							name="companyLinkedIn"
							type="text"
							required
						/>
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
					disabled={errorUpload}
					type="submit"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</section>
