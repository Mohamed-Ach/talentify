<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	export let data: PageData

	import { degrees, languages, softSkills, technicalSkills } from '$lib/stores'
	import { applyAction, enhance } from '$app/forms'
	import { MultiSelect } from 'svelte-multiselect'
	import Eye from 'phosphor-svelte/lib/Eye'
	export let form: any

	// ** Components :
	import PageTitle from '$lib/components/PageTitle.svelte'

	// ** Icons :
	import ReadCvLogo from 'phosphor-svelte/lib/ReadCvLogo'
	import Spinner from '$lib/components/Spinner.svelte'
	import EyeSlash from 'phosphor-svelte/lib/EyeSlash'
	import Upload from 'phosphor-svelte/lib/Upload'

	// ** Validations :
	let errorConfirmPassword: string = ''
	let errorPassword: string = ''

	$: isAnyError2 = errorPassword || errorConfirmPassword

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
		console.log(password, confirmPassword)
		if (password !== confirmPassword) {
			errorConfirmPassword = 'The two passwords do not match.'
		} else {
			errorConfirmPassword = ''
		}
	}

	// Toggle Password Visibility
	let view = false
	let spinner = false

	const handleSubmitPassword = (event: any) => {
		if (!isAnyError2) {
			spinner = true
		} else {
			event.preventDefault()
		}
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

	// CV Upload
	let errorUpload: boolean = false
	let resume: File | null = null
	let cv: string = data.profile?.cv || ''

	function previewCV() {
		if (resume) {
			const fileURL = URL.createObjectURL(resume)
			window.open(fileURL, '_blank')
		} else {
			showToast('Error', 'No CV uploaded', 'error')
		}
	}

	const handleFileUpload = async (event: any) => {
		const file = event.target.files[0]
		if (file) {
			resume = file
			const reader = new FileReader()
			reader.readAsDataURL(file)
			errorUpload = true
			await uploadCV(file)
			errorUpload = false
			showToast('Success', 'CV added successfully', 'success')
		}
	}

	async function uploadCV(file: File) {
		const formData = new FormData()
		formData.append('file', file)

		const response = await fetch('/api/cloudinary', {
			method: 'POST',
			body: formData
		})

		const result = await response.json()
		if (response.ok) {
			cv = result.url
		} else {
			console.error('Upload failed:', result.message)
		}
	}

	// Avatar Upload
	let imageUrl: string = data.user?.avatar || ''
	let avatar: string = data.user?.avatar || ''

	function triggerInput() {
		const fileInput = document.getElementById('avatar') as HTMLInputElement
		if (fileInput) {
			fileInput.click()
		}
	}

	async function handleFileChange(event: any) {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				if (e.target && e.target.result) {
					imageUrl = e.target.result.toString()
				}
			}
			reader.readAsDataURL(file)

			errorUpload = true
			await uploadImage(file)
			errorUpload = false
			showToast('Success', 'Profile avatar added successfully', 'success')
		}
	}

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

<Spinner show={spinner} />

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<PageTitle
	title="Profile"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'Settings', link: null }
	]}
/>

<div class="grid grid-cols-12 gap-5">
	<div class="col-span-12 xl:col-span-6">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body pb-0">
				<h6 class="mb-1 text-15 text-gray-700 dark:text-gray-100">Personal Details</h6>
			</div>
			<div class="card-body">
				<form
					action="?/updateProfile"
					method="POST"
					on:submit={() => {
						spinner = true
					}}
					use:enhance={() => {
						return async ({ result }) => {
							await applyAction(result)
							spinner = false
							if (form?.error1) showToast('Error', form.error1, 'error')
							else if (form?.success1) showToast('Success', form.success1, 'success')
						}
					}}
				>
					<div class="grid gap-6 mb-6 items-center justify-center">
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
								<span class="font-medium text-7xl text-gray-600 dark:text-gray-300"
									>{data.user?.last_name
										? data.user?.first_name[0] + data.user?.last_name[0]
										: data.user?.first_name.slice(0, 2)}</span
								>
							{/if}

							<button
								class="w-32 h-32 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
								type="button"
								on:click={triggerInput}
							>
								<Upload size={32} weight="duotone" class="hidden group-hover:block w-12" />
							</button>
							<input on:change={handleFileChange} accept="image/*" type="file" id="avatar" hidden />
							<input name="avatar" type="text" value={avatar} hidden />
						</div>
					</div>
					<div class="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label
								for="first_name"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>First name</label
							>
							<input
								type="text"
								id="first_name"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								value={data.user?.first_name}
								readonly
							/>
						</div>
						<div>
							<label
								for="last_name"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Last name</label
							>
							<input
								type="text"
								id="last_name"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								value={data.user?.last_name}
								readonly
							/>
						</div>
						<div>
							<label
								for="address"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Address</label
							>
							<input
								type="text"
								id="address"
								name="address"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter your address"
								value={data.profile?.address || ''}
								required
							/>
						</div>
						<div>
							<label
								for="phone"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Phone number</label
							>
							<input
								type="tel"
								id="phone"
								name="phoneNumber"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="+212XXXXXXXXX"
								pattern="+212[0-9]{9}"
								value={data.profile?.phone_number || ''}
								required
							/>
						</div>
						<div>
							<label
								for="degree"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Degree</label
							>
							<select
								name="degree"
								id="degree"
								class="font-primary font-bold form-select dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
								required
							>
								<option value="">Select a degree...</option>
								selected={data.profile?.degree}
								{#each degrees as degree}
									{#if data.profile?.degree === degree}
										<option value={degree} selected>{degree}</option>
									{:else}
										<option value={degree}>{degree}</option>
									{/if}
								{/each}
							</select>
						</div>
						<div>
							<label
								for="institution"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Institution</label
							>
							<input
								type="text"
								id="institution"
								name="institution"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.institution || ''}
								required
							/>
						</div>
						<div>
							<label
								for="visitors"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Certificates</label
							>
							<MultiSelect
								name="certifications"
								placeholder="Add your certifications..."
								options={[]}
								ulOptionsStyle=""
								allowUserOptions={true}
								selected={data.profile?.certifications || []}
								liOptionStyle=""
								liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
								style=""
								ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
								inputStyle="color: {data.theme === 'dark'
									? 'white'
									: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
							/>
						</div>
						<div>
							<label
								for="visitors"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Technical Skills</label
							>
							<MultiSelect
								name="technicalSkills"
								placeholder="Select from the list..."
								options={technicalSkills}
								ulOptionsStyle=""
								liOptionStyle=""
								selected={data.profile?.technical_skills || []}
								liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
								style=""
								ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
								inputStyle="color: {data.theme === 'dark'
									? 'white'
									: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
							/>
						</div>
						<div>
							<label
								for="visitors"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Soft Skills</label
							>
							<MultiSelect
								name="softSkills"
								placeholder="Select from the list..."
								options={softSkills}
								ulOptionsStyle=""
								liOptionStyle=""
								selected={data.profile?.soft_skills || []}
								liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
								style=""
								ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
								inputStyle="color: {data.theme === 'dark'
									? 'white'
									: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
							/>
						</div>
						<div>
							<label
								for="visitors"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Languages</label
							>
							<MultiSelect
								name="languages"
								placeholder="Select from the list..."
								options={languages}
								ulOptionsStyle=""
								liOptionStyle=""
								selected={data.profile?.languages || []}
								liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
								style=""
								ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
								inputStyle="color: {data.theme === 'dark'
									? 'white'
									: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
							/>
						</div>
						<div>
							<label
								for="institution"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Profile Title</label
							>
							<input
								type="text"
								id="profession"
								name="profession"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.profession || ''}
								required
							/>
						</div>
						<div>
							<label
								for="employmentType"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Employment Preference</label
							>
							<select
								name="employmentType"
								id="employmentType"
								class="font-primary font-bold form-select dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
								required
							>
								<option value="">Select your favorite employment type...</option>
								<option value="freelancer" selected={data.profile?.employment_type === 'freelancer'}
									>Freelancer</option
								>
								<option value="part_time" selected={data.profile?.employment_type === 'part_time'}
									>Part Time</option
								>
								<option value="full_time" selected={data.profile?.employment_type === 'full_time'}
									>Full Time</option
								>
							</select>
						</div>
						<div>
							<label
								for="experience"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Previous Job</label
							>
							<input
								type="text"
								id="experience"
								name="experience"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.experiences || ''}
							/>
						</div>
						<div>
							<label
								for="facebook"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Facebook</label
							>
							<input
								type="text"
								id="facebook"
								name="facebook"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.facebook || ''}
							/>
						</div>
						<div>
							<label
								for="linkedin"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Linkedin</label
							>
							<input
								type="text"
								id="linkedin"
								name="linkedin"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.linkedin || ''}
							/>
						</div>
						<div>
							<label
								for="twitter"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Twitter</label
							>
							<input
								type="text"
								id="twitter"
								name="twitter"
								class="font-primary font-bold border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
								placeholder="Enter the name of your institution"
								value={data.profile?.twitter || ''}
							/>
						</div>
						<div class="mb-3">
							<label
								for="cv"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Upload your cv/resume</label
							>
							<input
								class="font-primary relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
								on:change={handleFileUpload}
								accept=".pdf"
								type="file"
								id="cv"
							/>
							<input type="text" value={cv} name="cv" hidden />
							<button
								class="font-primary flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-1 mt-3 outline-none rounded w-max cursor-pointer mx-auto"
								on:click={previewCV}
								type="button"
							>
								<ReadCvLogo size={32} weight="bold" class="w-6 mr-2 fill-white inline" />
								Preview
							</button>
						</div>
						<div>
							<label
								for="bio"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Bio</label
							>
							<textarea
								id="bio"
								name="bio"
								class="font-primary font-bold form-textarea w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
								rows="5"
								placeholder="Add a biography to your profile..."
								value={data.profile?.bio || ''}
							></textarea>
						</div>
					</div>
					<div class="flex items-center justify-end gap-5">
						<button
							type="submit"
							class="font-primary text-white bg-violet-500 hover:bg-violet-700 focus:ring-2 focus:ring-violet-100 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
							>Reset</button
						>
						<button
							class="font-primary text-white bg-violet-500 hover:bg-violet-700 focus:ring-2 focus:ring-violet-100 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
							disabled={errorUpload}
							type="submit">Submit</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="col-span-12 xl:col-span-6">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body pb-0">
				<h6 class="mb-1 text-15 text-gray-700 dark:text-gray-100">Reset Password</h6>
			</div>
			<div class="card-body">
				<form
					method="POST"
					action="?/resetPassword"
					on:submit={handleSubmitPassword}
					use:enhance={() => {
						return async ({ result, formElement }) => {
							await applyAction(result)
							if (result.type === 'success') {
								formElement.reset()
							}
							spinner = false
						}
					}}
					use:enhance={() => {
						return async ({ result, formElement }) => {
							await applyAction(result)
							if (result.type === 'success') {
								formElement.reset()
							}
							spinner = false
							if (form?.error2) showToast('Error', form.error2, 'error')
							else if (form?.success2) showToast('Success', form.success2, 'success')
						}
					}}
				>
					<div class="grid">
						<div class="mb-6">
							<label
								for="password"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Old Password</label
							>
							<div class="flex">
								<input
									type={view ? 'text' : 'password'}
									id="oldPassword"
									name="oldPassword"
									class="font-primary border border-gray-100 text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
									placeholder="Enter your old password..."
									required
								/>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<span
									on:click={() => (view = !view)}
									class="flex items-center justify-center bg-gray-50 px-4 rounded ltr:rounded-l-none rtl:rounded-r-none border border-gray-100 ltr:border-l-0 rtl:border-r-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-100"
									id="password-addon"
									><svelte:component
										this={view ? EyeSlash : Eye}
										size={20}
										weight="fill"
										class="text-black dark:text-gray-100"
									/></span
								>
							</div>
						</div>
						<div class="mb-6">
							<label
								for="password"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Password</label
							>
							<div class="flex">
								<input
									type={view ? 'text' : 'password'}
									id="password"
									name="password"
									on:input={validatePassword}
									class="{errorPassword
										? 'border-error focus:outline-none'
										: 'border border-gray-100'} font-primary text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
									placeholder="Enter your new password..."
									required
								/>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<span
									on:click={() => (view = !view)}
									class="flex items-center justify-center bg-gray-50 px-4 rounded ltr:rounded-l-none rtl:rounded-r-none border border-gray-100 ltr:border-l-0 rtl:border-r-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-100"
									id="password-addon"
									><svelte:component
										this={view ? EyeSlash : Eye}
										size={20}
										weight="fill"
										class="text-black dark:text-gray-100"
									/></span
								>
							</div>
							{#if errorPassword}
								<p class="text-red-600 text-sm mt-1">{errorPassword}</p>
							{/if}
						</div>
						<div class="mb-6">
							<label
								for="confirm_password"
								class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
								>Confirm password</label
							>
							<div class="flex">
								<input
									type={view ? 'text' : 'password'}
									id="confirm_password"
									name="confirmPassword"
									on:input={validateConfirmPassword}
									class="{errorConfirmPassword
										? 'border-error'
										: 'border border-gray-100'} font-primary text-gray-900 text-sm rounded focus:ring-violet-100 focus:border-violet-500 block w-full p-2.5 dark:bg-zinc-700/50 dark:border-zinc-600 dark:placeholder:text-zinc-100/60 dark:text-zinc-100"
									placeholder="Confirm your new password..."
									required
								/>

								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<span
									on:click={() => (view = !view)}
									class="flex items-center justify-center bg-gray-50 px-4 rounded ltr:rounded-l-none rtl:rounded-r-none border border-gray-100 ltr:border-l-0 rtl:border-r-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-100"
									id="password-addon"
									><svelte:component
										this={view ? EyeSlash : Eye}
										size={20}
										weight="fill"
										class="text-black dark:text-gray-100"
									/></span
								>
							</div>
							{#if errorConfirmPassword}
								<p class="text-red-600 text-sm mt-1">{errorConfirmPassword}</p>
							{/if}
						</div>
						<div class="flex justify-end gap-5">
							<button
								type="reset"
								class="font-primary text-white bg-violet-500 hover:bg-violet-700 focus:ring-2 focus:ring-violet-100 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
								>Cancel</button
							>
							<button
								type="submit"
								disabled={isAnyError2 ? true : false}
								class="font-primary text-white bg-violet-500 hover:bg-violet-700 focus:ring-2 focus:ring-violet-100 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
								>Submit</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
