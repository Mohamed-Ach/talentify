<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts'
	import type { ToastType } from 'svelte-toasts/types/common'
	import type { PageData } from './$types'
	export let data: PageData

	import { degrees, languages, softSkills, technicalSkills } from '$lib/stores'
	import Spinner from '$lib/components/Spinner.svelte'
	import { applyAction, enhance } from '$app/forms'
	import { MultiSelect } from 'svelte-multiselect'
	import { onMount } from 'svelte'
	export let form: any

	// ** Icons :
	import IdentificationBadge from 'phosphor-svelte/lib/IdentificationBadge'
	import FediverseLogo from 'phosphor-svelte/lib/FediverseLogo'
	import ReadCvLogo from 'phosphor-svelte/lib/ReadCvLogo'
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight'
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft'
	import SealCheck from 'phosphor-svelte/lib/SealCheck'
	import Upload from 'phosphor-svelte/lib/Upload'
	import List from 'phosphor-svelte/lib/List'

	// ** Section navigation :
	let currentSection: number = 1

	// ** Validation :
	let employmentTypeError: string = ''
	let institutionError: string = ''
	let degreeError: string = ''
	let addressError: string = ''
	let phoneError: string = ''
	let titleError: string = ''

	function validateSection(section: number, to: number = 0) {
		if (section === 1) {
			const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement
			const address = document.getElementById('address') as HTMLInputElement
			if (!phoneNumber.value) {
				phoneError = '*Phone number is required'
				return
			} else if (!address.value) {
				addressError = '*Address is required'
				return
			} else {
				phoneError = ''
				addressError = ''
			}
		} else if (section === 2) {
			const degree = document.getElementById('degree') as HTMLInputElement
			const institution = document.getElementById('institution') as HTMLInputElement
			if (!degree.value) {
				degreeError = '*Degree field is required'
				return
			} else if (!institution.value) {
				institutionError = '*Institution field is required'
				return
			} else {
				degreeError = ''
				institutionError = ''
			}
		} else if (section === 3) {
			const title = document.getElementById('profession') as HTMLInputElement
			const employmentType = document.getElementById('employmentType') as HTMLInputElement
			if (!title.value) {
				titleError = '*Profile title is required'
				return
			} else if (!employmentType.value) {
				employmentTypeError = '*Employment preference field is required'
				return
			} else {
				employmentTypeError = ''
				titleError = ''
			}
		}
		if (to === 0) currentSection++
		else currentSection = to
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

	onMount(() => {
		if (data.user?.is_onboarding === 0)
			setTimeout(() => {
				showToast(
					'Welcome',
					'Please fill in your details to complete your profile. Providing thorough details helps us better recommend jobs for you',
					'info'
				)
			}, 500)
	})

	// Avatar Upload
	let errorUpload = false
	let imageUrl: string = ''
	let avatar: string = ''

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

	// CV Upload
	let resume: File | null = null
	let cv: string = ''

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

	// Spinner
	let spinner = false
</script>

<Spinner show={spinner} />

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>

<div class="grid grid-cols-1">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body pb-0">
			<h6 class="mb-1 text-15 text-gray-700 dark:text-gray-100">
				On Boarding Wizard (<a href="/profile" class="hover:underline text-violet-600">Skip</a>)
			</h6>
		</div>
		<div class="card-body">
			<div class="nav-tabs">
				<ul
					class="nav w-full flex flex-wrap text-sm font-medium text-center text-gray-500 py-5 dark:text-gray-400"
				>
					<li class="nav-item flex-grow relative">
						<button
							class="nav-link {currentSection === 1 ? 'active' : ''} group"
							data-tw-target="profile-details"
							data-tw-toggle="tab"
							type="button"
							on:click={() => validateSection(currentSection, 1)}
						>
							<div
								class="inline-block relative bg-white border border-violet-50 h-14 w-14 rounded-full dark:bg-transparent dark:border-violet-500/30 group-[.active]:bg-violet-500/20"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title="Seller Details"
							>
								<List
									size={32}
									weight="bold"
									class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-22 leading-[2.5] text-violet-500"
								/>
							</div>
						</button>
						<div
							class="content-[''] absolute w-[75%] h-[4px] {currentSection > 1
								? 'bg-violet-500'
								: 'bg-gray-50/50'} left-[62%] top-[50%] sm:block hidden dark:bg-zinc-700"
						></div>
					</li>
					<li class="nav-item flex-grow relative">
						<button
							class="nav-link {currentSection === 2 ? 'active' : ''} group"
							data-tw-toggle="tab"
							data-tw-target="company-document"
							on:click={() => validateSection(currentSection, 2)}
						>
							<div
								class="bg-white border relative border-violet-50 inline-block h-14 w-14 rounded-full dark:bg-transparent dark:border-violet-500/30 group-[.active]:bg-violet-500/20"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title="Company Document"
							>
								<IdentificationBadge
									size={32}
									weight="bold"
									class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-22 leading-[2.5] text-violet-500"
								/>
							</div>
						</button>
						<div
							class="content-[''] absolute w-[75%] h-[4px] {currentSection > 2
								? 'bg-violet-500'
								: 'bg-gray-50/50'} left-[62%] top-[50%] sm:block hidden dark:bg-zinc-700"
						></div>
					</li>
					<li class="nav-item flex-grow relative">
						<button
							class="nav-link {currentSection === 3 ? 'active' : ''} group"
							data-tw-toggle="tab"
							data-tw-target="bank-detail"
							on:click={() => validateSection(currentSection, 3)}
						>
							<div
								class="bg-white border relative border-violet-50 inline-block h-14 w-14 rounded-full dark:bg-transparent dark:border-violet-500/30 group-[.active]:bg-violet-500/20"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title="Bank Details"
							>
								<FediverseLogo
									size={32}
									weight="bold"
									class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-22 leading-[2.5] text-violet-500"
								/>
							</div>
						</button>

						<div
							class="content-[''] absolute w-[75%] h-[4px] {currentSection > 3
								? 'bg-violet-500'
								: 'bg-gray-50/50'} left-[62%] top-[50%] sm:block hidden dark:bg-zinc-700"
						></div>
					</li>
					<li class="nav-item flex-grow">
						<button
							class="nav-link {currentSection === 4 ? 'active' : ''} group"
							data-tw-toggle="tab"
							data-tw-target="bank-detail"
							on:click={() => validateSection(currentSection, 4)}
						>
							<div
								class="bg-white border relative border-violet-50 inline-block h-14 w-14 rounded-full dark:bg-transparent dark:border-violet-500/30 group-[.active]:bg-violet-500/20"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title="Bank Details"
							>
								<SealCheck
									size={32}
									weight="bold"
									class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-22 leading-[2.5] text-violet-500"
								/>
							</div>
						</button>
					</li>
				</ul>

				<div class="tab-content twitter-bs-wizard-tab-content font-primary">
					<div class="tab-pane block" id="seller-details">
						<div class="text-center mt-8">
							<h5 class="text-gray-700 dark:text-gray-100">Personal Details</h5>
							<p class="text-gray-500 dark:text-zinc-100/60">
								Fill in the information below and build your profile
							</p>
						</div>
						<form
							class="flex flex-col items-center justify-center my-8"
							method="post"
							on:submit={() => (spinner = true)}
							use:enhance={() => {
								return async ({ result }) => {
									await applyAction(result)
									spinner = false
									if (form?.error) showToast('Error', form.error, 'error')
									else showToast('Success', 'On boarded successfully', 'success')
								}
							}}
						>
							<div class="w-full max-w-lg">
								<div class="section {currentSection !== 1 ? 'hidden' : ''}">
									<div class="flex items-center justify-center mb-6">
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
										</div>
										<button
											class="w-32 h-32 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
											type="button"
											on:click={triggerInput}
										>
											<Upload size={32} weight="duotone" class="hidden group-hover:block w-12" />
										</button>
										<input
											on:change={handleFileChange}
											accept="image/*"
											type="file"
											id="avatar"
											hidden
										/>
										<input name="avatar" type="text" value={avatar} hidden />
									</div>
									<!-- Profile Picture -->

									<!-- Phone Number -->
									<div class="mb-6">
										<label
											for="phoneNumber"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Phone Number
										</label>
										<input
											required
											type="text"
											id="phoneNumber"
											name="phoneNumber"
											on:input={() => {
												phoneError = ''
											}}
											class="{phoneError
												? 'border-error'
												: ''} form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Enter your phone number..."
										/>
										{#if phoneError}
											<span class="text-red-600">{phoneError}</span>
										{/if}
									</div>

									<!-- Address -->
									<div class="mb-6">
										<label
											for="address"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Address
										</label>
										<textarea
											id="address"
											on:input={() => {
												addressError = ''
											}}
											name="address"
											class="{addressError
												? 'border-error'
												: ''} form-textarea w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											rows="4"
											placeholder="Enter your address..."
										></textarea>
										{#if addressError}
											<span class="text-red-600">{addressError}</span>
										{/if}
									</div>
								</div>

								<div class="section {currentSection !== 2 ? 'hidden' : ''}">
									<div class="flex items-center gap-5">
										<!-- Degree -->
										<div class="mb-6">
											<label
												for="degree"
												class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
											>
												Degree
											</label>
											<select
												name="degree"
												id="degree"
												on:input={() => {
													degreeError = ''
												}}
												class="{degreeError
													? 'border-error'
													: ''} form-select dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
											>
												<option value="">Select a degree...</option>
												{#each degrees as degree}
													<option value={degree}>{degree}</option>
												{/each}
											</select>
											{#if degreeError}
												<span class="text-red-600">{degreeError}</span>
											{/if}
										</div>

										<!-- Institution -->
										<div class="mb-6">
											<label
												for="institution"
												class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
											>
												Institution
											</label>
											<input
												on:input={() => {
													institutionError = ''
												}}
												type="text"
												id="institution"
												name="institution"
												class="{institutionError
													? 'border-error'
													: ''} form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
												placeholder="Enter your institution..."
											/>
											{#if institutionError}
												<span class="text-red-600">{institutionError}</span>
											{/if}
										</div>
									</div>

									<!-- Certifications Multi-select -->
									<div class="mb-6">
										<label
											for="certifications"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Certifications
										</label>
										<MultiSelect
											name="certifications"
											placeholder="Add your certifications..."
											options={[]}
											ulOptionsStyle=""
											allowUserOptions={true}
											liOptionStyle=""
											liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
											style=""
											ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
											inputStyle="color: {data.theme === 'dark'
												? 'white'
												: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
										/>
									</div>

									<!-- Technical Skills Multi-select -->
									<div class="mb-6">
										<label
											for="technical_skills"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Technical Skills
										</label>
										<MultiSelect
											name="technicalSkills"
											placeholder="Select from the list..."
											options={technicalSkills}
											ulOptionsStyle=""
											liOptionStyle=""
											liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
											style=""
											ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
											inputStyle="color: {data.theme === 'dark'
												? 'white'
												: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
										/>
									</div>

									<!-- Soft Skills Multi-select -->
									<div class="mb-6">
										<label
											for="soft_skills"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Soft Skills
										</label>
										<MultiSelect
											name="softSkills"
											placeholder="Select from the list..."
											options={softSkills}
											ulOptionsStyle=""
											liOptionStyle=""
											liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
											style=""
											ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
											inputStyle="color: {data.theme === 'dark'
												? 'white'
												: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
										/>
									</div>

									<!-- Languages Multi-select -->
									<div class="mb-6">
										<label
											for="languages"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Languages
										</label>
										<MultiSelect
											name="languages"
											placeholder="Select from the list..."
											options={languages}
											ulOptionsStyle=""
											liOptionStyle=""
											liSelectedStyle="background-color: rgb(81 86 190 / 1); color: #fff;"
											style=""
											ulSelectedStyle="color: #fff; font-size: 0.9rem; padding: .2rem;"
											inputStyle="color: {data.theme === 'dark'
												? 'white'
												: 'black'}; padding-top: .25rem; padding-bottom: .25rem;"
										/>
									</div>
								</div>

								<div class="section {currentSection !== 3 ? 'hidden' : ''}">
									<!-- Profession -->
									<div class="mb-6">
										<label
											for="profession"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Profile Title
										</label>
										<input
											type="text"
											id="profession"
											name="profession"
											on:input={() => {
												titleError = ''
											}}
											class="{titleError
												? 'border-error'
												: ''} form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Enter a title for your profile..."
										/>
										{#if titleError}
											<span class="text-red-600">{titleError}</span>
										{/if}
									</div>

									<!-- Employment Type -->
									<div class="mb-6">
										<label
											for="degree"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Employment Type
										</label>
										<select
											name="employmentType"
											on:input={() => {
												employmentTypeError = ''
											}}
											id="employmentType"
											class="{employmentTypeError
												? 'border-error'
												: ''} form-select dark:bg-zinc-800 dark:border-zinc-700 w-full rounded border-gray-100 py-2.5 text-sm text-gray-500 focus:border focus:border-violet-500 focus:ring-0 dark:bg-zinc-700/50 dark:text-zinc-100"
										>
											<option value="">Select your favorite employment type...</option>
											<option value="freelancer">Freelancer</option>
											<option value="part_time">Part Time</option>
											<option value="full_time">Full Time</option>
										</select>
										{#if employmentTypeError}
											<span class="text-red-600">{employmentTypeError}</span>
										{/if}
									</div>

									<!-- Previous Experience -->
									<div class="mb-6">
										<label
											for="experience"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Previous Experience
										</label>
										<input
											type="text"
											id="experience"
											name="experience"
											class="form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Enter your previous job title or position..."
										/>
									</div>

									<!-- Bio -->
									<div class="mb-6">
										<label
											for="technical_skills"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Bio
										</label>
										<textarea
											id="bio"
											name="bio"
											class="form-textarea w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											rows="5"
											placeholder="Add a biography to your profile..."
										></textarea>
									</div>
								</div>

								<div class="section {currentSection !== 4 ? 'hidden' : ''}">
									<!-- Resume CV -->
									<div class="mb-3">
										<label
											for="cv"
											class="font-primary block mb-2 text-sm font-medium text-gray-900 dark:text-gray-50"
											>Upload your cv/resume</label
										>
										<input
											class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
											on:change={handleFileUpload}
											accept=".pdf"
											type="file"
											id="cv"
										/>
										<input type="text" name="cv" value={cv} hidden />
										<button
											class="flex items-center bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-1 mt-3 outline-none rounded w-max cursor-pointer mx-auto"
											on:click={previewCV}
											type="button"
										>
											<ReadCvLogo size={32} weight="bold" class="w-6 mr-2 fill-white inline" />
											Preview
										</button>
									</div>
									<!-- Facebook -->
									<div class="mb-6">
										<label
											for="certifications"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Facebook
										</label>
										<input
											type="text"
											id="facebook"
											name="facebook"
											class="form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Add your facebook account..."
										/>
									</div>

									<!-- Twitter -->
									<div class="mb-6">
										<label
											for="certifications"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Twitter
										</label>
										<input
											type="text"
											id="twitter"
											name="twitter"
											class="form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Add your twitter account..."
										/>
									</div>

									<!-- Linkedin -->
									<div class="mb-6">
										<label
											for="certifications"
											class="block text-gray-700 font-bold mb-2 dark:text-gray-200"
										>
											Linkedin
										</label>
										<input
											type="text"
											id="linkedin"
											name="linkedin"
											class="form-input w-full mt-1 p-2 border rounded-md shadow-sm placeholder:text-sm bg-white dark:bg-zinc-800 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:text-white focus:ring-violet-500 focus:border-violet-500"
											placeholder="Add your linkedin account..."
										/>
									</div>
								</div>

								<!-- Submit Button -->
								<div class="flex text-right justify-end items-center gap-5">
									<button
										type="button"
										class="inline-flex items-center justify-center px-4 py-2 bg-violet-500 border border-transparent rounded-md font-semibold text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
										on:click={() => {
											currentSection--
										}}
										disabled={currentSection === 1}
									>
										<ArrowLeft size={12} weight="bold" class="me-1 align-middle" />
										Previous
									</button>

									{#if currentSection === 4}
										<button
											type="submit"
											class="inline-flex items-center justify-center px-4 py-2 bg-violet-500 border border-transparent rounded-md font-semibold text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
										>
											Submit
											<ArrowRight size={12} weight="bold" class="ms-1 align-middle" />
										</button>
									{:else}
										<button
											type="button"
											on:click={() => {
												validateSection(currentSection)
											}}
											class="inline-flex items-center justify-center px-4 py-2 bg-violet-500 border border-transparent rounded-md font-semibold text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
										>
											Next
											<ArrowRight size={12} weight="bold" class="ms-1 align-middle" />
										</button>
									{/if}
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
