<script lang="ts">
	import type { PageData } from './$types'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	export let data: PageData

	// Importing images
	import homeImg1 from '$lib/images/home-img-1.svg'
	import features from '$lib/images/features.png'
	import aboutUs from '$lib/images/about-us.png'
	import logo from '$lib/images/logo.svg'
	import logoWhite from '$lib/images/logo-white.svg'
	import user from '$lib/images/user.png'

	// Importing Icons
	import MoonStars from 'phosphor-svelte/lib/MoonStars'
	import List from 'phosphor-svelte/lib/List'
	import Sun from 'phosphor-svelte/lib/Sun'
	import X from 'phosphor-svelte/lib/X'

	function scrollToElement(element: string) {
		const el = document.getElementById(element)
		if (!el) return
		el.scrollIntoView({ behavior: 'smooth' })
	}

	let query: string = ''
	let toggleMenu: boolean = false

	// dark mode :

	export let theme: string = data.theme

	const setTheme = (currentTheme: string) => {
		theme = currentTheme
		const themeRoot = document.getElementById('theme')
		if (!themeRoot) return

		themeRoot.classList.remove('dark', 'light')
		themeRoot.classList.add(currentTheme)

		document.cookie = `theme=${currentTheme}; path=/; max-age=31536000`
	}

	// Sale Offer
	let showOffer = false

	onMount(() => {
		setTimeout(() => {
			showOffer = true
		}, 1000)
	})
</script>

<div
	class="modal relative z-50 {showOffer ? '' : 'hidden'}"
	id="modal-idCenter"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
		<div
			class="absolute flex inset-0 bg-black bg-opacity-50 transition-opacity modal-overlay"
		></div>
		<div class="animate-translate p-4 text-center sm:max-w-lg mx-auto top-10">
			<div
				class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-zinc-700 dark:border-zinc-600"
			>
				<div class="bg-white p-5 text-center dark:bg-zinc-700">
					<h2 class="text-xl mt-5 text-gray-700 dark:text-gray-100">Important Notice!</h2>

					<p class="font-primary text-gray-500 dark:text-zinc-100/60 mt-2">
						This website is fully functional and ready to use. If you are interested in inquiring
						this website for your business, please contact us.
					</p>

					<div class="flex justify-center gap-2 mt-6">
						<button
							type="button"
							class="font-primary btn bg-red-500 border-red-500 text-white"
							on:click={() => (showOffer = false)}>Dismiss</button
						>

						<a
							class="font-primary btn bg-violet-500 border-violet-500 text-white"
							href="https://www.linkedin.com/in/mohamed-ach/"
							target="_blank">Contact Us</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Nav bar -->
<nav class="py-5 lg:fixed top-0 left-0 z-50 w-full bg-white dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="w-full flex flex-col lg:flex-row">
			<div class="flex justify-between lg:flex-row">
				<a href="/" class="flex items-center">
					<img src={logo} alt="Talentify Logo" class="dark:hidden" />
					<img src={logoWhite} alt="Talentify Logo" class="hidden dark:block" />
				</a>
				<button
					data-collapse-toggle="navbar"
					class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 dark:text-gray-300 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					on:click={() => (toggleMenu = !toggleMenu)}
					aria-expanded="false"
					type="button"
				>
					<span class="sr-only">Open main menu</span>
					<svelte:component this={toggleMenu ? X : List} size={32} />
				</button>
			</div>
			<div
				class="{toggleMenu
					? ''
					: 'hidden'} w-full lg:flex lg:pl-11 max-lg:mt-1 max-lg:h-screen max-lg:overflow-y-auto"
				id="navbar"
			>
				<ul
					class="flex gap-8 my-8 lg:my-0 lg:items-center lg:justify-center flex-col max-lg:gap-4 max-lg:pt-4 max-lg:mb-4 lg:mt-0 lg:flex-row lg:mx-auto"
				>
					<li>
						<button
							class="font-secondary nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-700 dark:text-gray-300 hover:underline underline-offset-1 font-semibold transition-all duration-500 hover:text-gray-900 dark:hover:text-gray-100"
							on:click={() => scrollToElement('how-it-works')}
							type="button">How it works?</button
						>
					</li>
					<li>
						<button
							class="font-secondary nav-link mb-2 block lg:mr-6 md:mb-0 lg:text-left text-base text-gray-700 dark:text-gray-300 hover:underline underline-offset-1 font-semibold transition-all duration-500 hover:text-gray-900 dark:hover:text-gray-100"
							on:click={() => scrollToElement('about-us')}
							type="button">About us</button
						>
					</li>
					<li class="relative">
						<button
							class="font-secondary flex items-center justify-between text-gray-700 dark:text-gray-300 text-center hover:underline underline-offset-1 text-base font-semibold hover:text-prime-blue-700 dark:hover:text-prime-blue-300 transition-all duration-500 mb-2 lg:mr-6 lg:mb-0 mr-auto lg:text-left lg:m-0 hover:text-gray-900 dark:hover:text-gray-100"
							on:click={() => scrollToElement('features')}
							type="button">Features</button
						>
					</li>
					<li class="relative">
						<button
							class="font-secondary flex items-center justify-between text-gray-700 dark:text-gray-300 text-center hover:underline underline-offset-1 text-base font-semibold hover:text-prime-blue-700 dark:hover:text-prime-blue-300 transition-all duration-500 lg:mr-6 lg:mb-0 mr-auto lg:text-left lg:m-0 hover:text-gray-900 dark:hover:text-gray-100"
							on:click={() => scrollToElement('testimonials')}
							type="button">Testimonials</button
						>
					</li>
				</ul>
				<div
					class="flex lg:items-center font-primary w-full justify-start flex-col lg:flex-row gap-4 lg:w-max max-lg:gap-4 lg:ml-14 lg:justify-end"
				>
					{#if data.user}
						<a
							class="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-6 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-800"
							href="/dashboard">Dashboard</a
						>
					{:else}
						<a
							class="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-6 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-800"
							href="/login">Login</a
						>
						<a
							class="bg-indigo-600 dark:bg-indigo-700 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-6 text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600"
							href="/register">Register</a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
<!-- Nav bar -->

<!-- Hero Section -->
<section id="hero" class="relative py-14 lg:pt-44 bg-slate-100 dark:bg-gray-800">
	<div
		class="w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start"
	>
		<div class="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-20 lg:w-1/2">
			<h1
				class="font-secondary font-bold text-4xl lg:text-left text-center sm:text-[3rem] leading-relaxed mb-5 text-black dark:text-white"
			>
				Land your dream job with Talentify.
			</h1>
			<p
				class="font-secondary text-xl font-medium leading-8 text-gray-400 dark:text-gray-300 lg:text-left text-center mb-14 max-w-xl lg:mx-0 mx-auto"
			>
				Forget the old rules. You can find the best job post for you. Right now. Right here.
			</p>
			<div
				class="parent flex flex-col sm:flex-row items-center max-w-xl lg:mx-0 mx-auto justify-center gap-y-4 sm:justify-between sm:bg-white dark:sm:bg-gray-700 rounded-full mb-5 relative"
			>
				<input
					class="block font-primary w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white dark:sm:bg-gray-700 text-gray-900 dark:text-gray-200 bg-transparent lg:border-none rounded-full placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none leading-normal"
					placeholder="Job Title, Keywords or Company..."
					bind:value={query}
					type="text"
				/>
				<button
					class="py-3 font-primary px-6 max-sm:w-full rounded-full bg-indigo-600 dark:bg-indigo-700 text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-600 sm:absolute top-1.5 right-3"
					on:click={() => goto(query ? `/job-listings?query=${query}` : '/job-listings')}
				>
					Search
				</button>
			</div>
		</div>
		<div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
			<img src={homeImg1} alt="Talentify" class="w-full h-auto lg:max-w-md xl:max-w-xl" />
		</div>
	</div>
</section>
<!-- Hero Section -->

<!-- How it works? -->
<section id="how-it-works" class="pt-8 pb-24 relative dark:bg-gray-800">
	<div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
		<div class="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
			<div class="w-full flex-col justify-start items-center gap-3 flex">
				<h2
					class="font-secondary w-full text-center text-gray-900 dark:text-white text-4xl font-bold leading-normal"
				>
					How It Works?
				</h2>
				<p
					class="font-primary w-full text-center text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed"
				>
					Here is a detailed breakdown of processes and mechanisms behind our system and the
					products, <br />we offer to our users and customers.
				</p>
			</div>
			<span
				class="font-secondary text-lg text-gray-500 dark:text-gray-400 font-semibold text-center block mb-2"
			>
				“FOR OUR USERS”
			</span>
			<div class="w-full justify-start items-center gap-4 flex md:flex-row flex-col mb-16">
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							1
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Create an Account
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Sign up for an account on our platform. Fill in your details and create a profile to
						access all the features and services we offer.
					</p>
				</div>
				<svg
					class="md:flex hidden"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
						stroke="#4F46E5"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							2
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Search for Jobs
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Search for jobs based on your preferences and requirements. Filter the results to find
						the perfect job for you.
					</p>
				</div>
				<svg
					class="md:flex hidden"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
						stroke="#4F46E5"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							3
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Apply for Jobs
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Apply for jobs that interest you. Submit your resume and cover letter to the employer.
						Wait for a response from the employer.
					</p>
				</div>
			</div>

			<span
				class="font-secondary text-lg text-gray-500 dark:text-gray-400 font-semibold text-center block mb-2"
			>
				“FOR OUR CUSTOMERS”
			</span>
			<div class="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							1
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Create a company profile
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Create a company profile on our platform. Fill in your company details and create a
						profile to access all the features and services we offer.
					</p>
				</div>
				<svg
					class="md:flex hidden"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
						stroke="#4F46E5"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							2
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Post Job Listings
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Post job listings on our platform. Fill in the job details and requirements to attract
						the right candidates for the job.
					</p>
				</div>
				<svg
					class="md:flex hidden"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
						stroke="#4F46E5"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
					<div class="self-stretch flex-col justify-start items-center gap-0.5 flex">
						<h3
							class="self-stretch text-center text-indigo-600 dark:text-indigo-400 text-4xl font-extrabold font-manrope leading-normal"
						>
							3
						</h3>
						<h4
							class="self-stretch text-center text-gray-900 dark:text-white text-xl font-semibold leading-8"
						>
							Review and Deploy
						</h4>
					</div>
					<p
						class="font-primary self-stretch text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed"
					>
						Review the applications and resumes submitted by the candidates. Select the right
						candidate for the job and deploy them.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- How it works? -->

<!-- About Us Section -->
<section id="about-us" class="py-24 relative dark:bg-gray-800">
	<div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
		<div class="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
			<div class="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
				<div class="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
					<h2
						class="font-secondary text-gray-900 dark:text-gray-100 text-4xl font-bold font-manrope leading-normal lg:text-start text-center"
					>
						A multi-tenancy platform for job seekers and employers alike.
					</h2>
					<p
						class="font-primary text-gray-700 dark:text-gray-300 text-sm font-normal leading-relaxed lg:text-start text-center"
					>
						Talentify is a multi-tenancy platform that caters to both job seekers and employers. We
						offer a wide range of services and features to help you find the right job or the right
						employee for you. If you are a job seeker you can create an account on our platform and
						search for jobs based on your preferences and requirements. You can apply for jobs that
						interest you and submit your resume and cover letter to the employer. If you are an
						employer you can create a company profile on our platform and post job listings. You can
						fill in the job details and requirements to attract the right candidates for the job.
						You can review the applications and resumes submitted by the candidates and select the
						right candidate for the job and deploy them.
					</p>
				</div>
				<button
					class="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-800 dark:hover:bg-indigo-700 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
				>
					<span
						class="font-secondary px-1.5 text-white dark:text-gray-200 text-sm font-bold leading-6"
						>Explore</span
					>
				</button>
			</div>
			<img class="lg:mx-0 mx-auto h-full rounded-3xl" src={aboutUs} alt="about Us" />
		</div>
	</div>
</section>
<!-- About Us Section -->

<!-- Features Section -->
<section id="features" class="pb-24 pt-8 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-14 text-center">
			<h2
				class="font-secondary text-4xl text-center font-bold text-gray-900 dark:text-gray-100 leading-[3.25rem] mb-6 max-w-max lg:max-w-3xl lg:mx-auto"
			>
				Developed from scratch for seamless online functionality
			</h2>
			<p
				class="font-primary text-base md:text-lg font-normal text-gray-500 dark:text-gray-400 lg:max-w-2xl lg:mx-auto mb-8"
			>
				Using technology to make finance simpler, smarter and more rewarding.
			</p>
			<div
				class="flex flex-col justify-center md:flex-row gap-5 max-w-lg mx-auto md:max-w-2xl lg:max-w-full"
			>
				<a
					href="/dashboard"
					class="font-primary cursor-pointer bg-indigo-600 dark:bg-indigo-500 py-[0.5rem] px-6 rounded-full flex items-center justify-center text-sm font-semibold text-white dark:text-gray-200 transition-all duration-500 focus:outline-none hover:bg-indigo-700 dark:hover:bg-indigo-700"
				>
					Get started
				</a>
				<a
					href="/dashboard"
					class="font-primary cursor-pointer bg-indigo-50 dark:bg-gray-800 py-[0.5rem] px-6 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-gray-300 transition-all duration-500 focus:outline-none hover:bg-indigo-100 dark:hover:bg-gray-700"
				>
					Learn more
				</a>
			</div>
		</div>
		<div
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full"
		>
			<div class="relative w-full h-auto md:col-span-2">
				<div
					class="bg-gray-800 dark:bg-gray-700 rounded-2xl flex justify-between flex-row flex-wrap"
				>
					<div class="p-5 xl:p-8 w-full md:w-1/2">
						<div class="block">
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</div>
						<h3
							class="text-lg font-bold xl:text-xl text-white dark:text-gray-100 py-5 w-full xl:w-64"
						>
							Accomplish tasks swiftly with online tools.
						</h3>
						<p
							class="font-primary text-xs font-normal text-gray-300 dark:text-gray-400 w-full mb-8 xl:w-64"
						>
							Find the right job for you. Find the right employee for you.
						</p>
						<button
							class="py-2 px-5 border border-solid border-gray-300 dark:border-gray-500 rounded-full gap-2 text-xs text-white dark:text-gray-100 font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5 dark:hover:bg-gray-600"
						>
							View More
							<svg
								width="6"
								height="10"
								viewBox="0 0 6 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
									stroke="white"
									stroke-width="1.6"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</button>
					</div>
					<div class="relative hidden h-auto md:w-1/2 md:block">
						<img src={features} alt="Header tailwind Section" class="h-full ml-auto" />
					</div>
				</div>
			</div>
			<div class="relative w-full h-auto">
				<div class="bg-indigo-500 dark:bg-indigo-400 rounded-2xl p-5 xl:p-8 h-full">
					<div class="block">
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
							></path>
						</svg>
					</div>
					<h3 class="py-5 text-white dark:text-gray-100 text-lg font-bold xl:text-xl">
						Improved technology yields greater value
					</h3>
					<p class="font-primary text-xs font-normal text-white dark:text-gray-200 mb-8">
						We’ve eliminated old analogue process with state-of-the art tech
					</p>
					<button
						class="py-2 px-5 border border-solid border-gray-300 dark:border-gray-500 rounded-full gap-2 text-xs text-white dark:text-gray-100 font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5 dark:hover:bg-gray-600"
					>
						View More
						<svg
							width="6"
							height="10"
							viewBox="0 0 6 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
								stroke="white"
								stroke-width="1.6"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</svg>
					</button>
				</div>
			</div>
			<div class="relative w-full h-auto">
				<div class="bg-violet-500 dark:bg-violet-400 rounded-2xl p-5 xl:p-8 h-full">
					<div class="block">
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
							></path>
						</svg>
					</div>
					<h3 class="py-5 text-white dark:text-gray-100 text-lg font-bold xl:text-xl">
						Customized to fit your needs
					</h3>
					<p class="font-primary text-xs font-normal text-white dark:text-gray-200 mb-8">
						You can customize the website to fit your needs and preferences.
					</p>
					<button
						class="py-2 px-5 border border-solid border-gray-300 dark:border-gray-500 rounded-full gap-2 text-xs text-white dark:text-gray-100 font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5 dark:hover:bg-gray-600"
					>
						View More
						<svg
							width="6"
							height="10"
							viewBox="0 0 6 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
								stroke="white"
								stroke-width="1.6"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- Features Section -->

<!-- Testimonials -->
<section id="testimonials" class="bg-white dark:bg-gray-800">
	<div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
		<figure class="max-w-screen-md mx-auto">
			<div
				class="font-primary text-5xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center mb-24"
			>
				<svg
					class="mr-2 h-12 text-gray-400 dark:text-gray-600"
					viewBox="0 0 24 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
						fill="currentColor"
					/>
				</svg>
				Testimonials
			</div>
			<blockquote>
				<p class="font-secondary text-2xl font-bold text-gray-900 dark:text-white">
					“Talentify is a game changer. It has helped me build the perfect job recruitment
					experience suited for me. I am so grateful for this platform.”
				</p>
			</blockquote>
			<figcaption class="flex items-center justify-center mt-6 space-x-3">
				<img class="w-6 h-6 rounded-full" src={user} alt="profile" />
				<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
					<div class="font-secondary pr-3 font-bold text-gray-900 dark:text-white">
						Mohamed Etteouini
					</div>
					<div class="font-secondary pl-3 text-sm font-bold text-gray-500 dark:text-gray-400">
						Manager at SYSTEM BASE
					</div>
				</div>
			</figcaption>
		</figure>
	</div>
</section>
<!-- Testimonials -->

<!-- Footer -->
<footer class="w-full py-14 dark:bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<a href="/" class="flex justify-center">
				<img src={logo} alt="Logo" class="dark:hidden" />
				<img src={logoWhite} alt="Logo" class="dark:block hidden" />
			</a>
			<ul
				class="font-secondary text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200 dark:border-gray-700"
			>
				<li>
					<a
						href={null}
						class="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
						>Talentify</a
					>
				</li>
				<li>
					<a
						href={null}
						class="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
						>Products</a
					>
				</li>
				<li>
					<a
						href={null}
						class="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
						>Resources</a
					>
				</li>
				<li>
					<a
						href={null}
						class="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
						>Our Policy</a
					>
				</li>
				<li>
					<a
						href={null}
						class="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
						>Support</a
					>
				</li>
			</ul>
			<div class="flex space-x-10 justify-center items-center mb-14">
				<a
					href={null}
					class="block text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
				>
					<svg
						class="w-[1.688rem] h-[1.688rem]"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="none"
					>
						<path
							d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a
					href={null}
					class="block text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
				>
					<svg
						class="w-[1.688rem] h-[1.688rem]"
						viewBox="0 0 29 29"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.76556 14.8811C9.76556 12.3243 11.8389 10.2511 14.3972 10.2511C16.9555 10.2511 19.03 12.3243 19.03 14.8811C19.03 17.4379 16.9555 19.5111 14.3972 19.5111C11.8389 19.5111 9.76556 17.4379 9.76556 14.8811ZM7.26117 14.8811C7.26117 18.82 10.456 22.0129 14.3972 22.0129C18.3385 22.0129 21.5333 18.82 21.5333 14.8811C21.5333 10.9422 18.3385 7.7493 14.3972 7.7493C10.456 7.7493 7.26117 10.9422 7.26117 14.8811ZM20.1481 7.46652C20.148 7.79616 20.2457 8.11843 20.4288 8.39258C20.6119 8.66674 20.8723 8.88046 21.177 9.00673C21.4817 9.133 21.8169 9.16614 22.1405 9.10196C22.464 9.03778 22.7612 8.87916 22.9945 8.64617C23.2278 8.41318 23.3868 8.11627 23.4513 7.79299C23.5157 7.46972 23.4829 7.13459 23.3568 6.83C23.2307 6.5254 23.017 6.26502 22.7428 6.08178C22.4687 5.89853 22.1463 5.80065 21.8164 5.80052H21.8158C21.3737 5.80073 20.9497 5.9763 20.637 6.28867C20.3243 6.60104 20.1485 7.02467 20.1481 7.46652ZM8.78274 26.1863C7.42782 26.1246 6.69138 25.8991 6.20197 25.7085C5.55314 25.4561 5.0902 25.1554 4.60346 24.6696C4.11672 24.1839 3.81543 23.7216 3.56395 23.0732C3.37317 22.5843 3.14748 21.8481 3.08588 20.494C3.01851 19.03 3.00506 18.5902 3.00506 14.8812C3.00506 11.1722 3.01962 10.7336 3.08588 9.26841C3.14759 7.9143 3.37495 7.17952 3.56395 6.68919C3.81654 6.04074 4.11739 5.57808 4.60346 5.09163C5.08953 4.60519 5.55203 4.30408 6.20197 4.05274C6.69116 3.86208 7.42782 3.63652 8.78274 3.57497C10.2476 3.50763 10.6877 3.49419 14.3972 3.49419C18.1068 3.49419 18.5473 3.50874 20.0134 3.57497C21.3683 3.63663 22.1035 3.86385 22.5941 4.05274C23.243 4.30408 23.7059 4.60585 24.1926 5.09163C24.6794 5.57741 24.9796 6.04074 25.2322 6.68919C25.4229 7.17808 25.6486 7.9143 25.7102 9.26841C25.7776 10.7336 25.7911 11.1722 25.7911 14.8812C25.7911 18.5902 25.7776 19.0287 25.7102 20.494C25.6485 21.8481 25.4217 22.5841 25.2322 23.0732C24.9796 23.7216 24.6787 24.1843 24.1926 24.6696C23.7066 25.155 23.243 25.4561 22.5941 25.7085C22.105 25.8992 21.3683 26.1247 20.0134 26.1863C18.5485 26.2536 18.1084 26.2671 14.3972 26.2671C10.686 26.2671 10.2472 26.2536 8.78274 26.1863ZM8.66768 1.0763C7.18823 1.14363 6.17729 1.37808 5.29443 1.72141C4.3801 2.07597 3.60608 2.55163 2.83262 3.32341C2.05916 4.09519 1.58443 4.86997 1.22966 5.78374C0.88612 6.66663 0.651535 7.67641 0.584162 9.15497C0.515676 10.6359 0.5 11.1093 0.5 14.8811C0.5 18.6529 0.515676 19.1263 0.584162 20.6072C0.651535 22.0859 0.88612 23.0955 1.22966 23.9784C1.58443 24.8916 2.05927 25.6673 2.83262 26.4387C3.60597 27.2102 4.3801 27.6852 5.29443 28.0407C6.17896 28.3841 7.18823 28.6185 8.66768 28.6859C10.1502 28.7532 10.6232 28.77 14.3972 28.77C18.1713 28.77 18.645 28.7543 20.1268 28.6859C21.6063 28.6185 22.6166 28.3841 23.5 28.0407C24.4138 27.6852 25.1884 27.2105 25.9618 26.4387C26.7353 25.667 27.209 24.8916 27.5648 23.9784C27.9083 23.0955 28.144 22.0857 28.2103 20.6072C28.2777 19.1252 28.2933 18.6529 28.2933 14.8811C28.2933 11.1093 28.2777 10.6359 28.2103 9.15497C28.1429 7.6763 27.9083 6.66608 27.5648 5.78374C27.209 4.87052 26.7341 4.09641 25.9618 3.32341C25.1896 2.55041 24.4138 2.07597 23.5011 1.72141C22.6166 1.37808 21.6062 1.14252 20.1279 1.0763C18.6461 1.00897 18.1724 0.992188 14.3983 0.992188C10.6243 0.992188 10.1502 1.00785 8.66768 1.0763Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a
					href={null}
					class="block text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
				>
					<svg
						class="w-[0.938rem] h-[1.625rem]"
						viewBox="0 0 15 26"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M13.7926 14.4697L14.5174 9.86889H10.0528V6.87836C10.0528 5.62033 10.6761 4.39105 12.6692 4.39105H14.7275V0.473179C13.5289 0.282204 12.3177 0.178886 11.1037 0.164062C7.42917 0.164062 5.0302 2.37101 5.0302 6.36077V9.86889H0.957031V14.4697H5.0302V25.5979H10.0528V14.4697H13.7926Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a
					href={null}
					class="block text-gray-900 dark:text-gray-300 transition-all duration-500 hover:text-indigo-600 dark:hover:text-indigo-400"
				>
					<svg
						class="w-[1.875rem] h-[1.375rem]"
						viewBox="0 0 30 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M26.3106 1.27838C27.5782 1.62071 28.5745 2.61957 28.9113 3.88573C29.524 6.18356 29.524 10.9809 29.524 10.9809C29.524 10.9809 29.524 15.7782 28.9113 18.076C28.5698 19.3469 27.5735 20.3457 26.3106 20.6834C24.0186 21.2977 14.8226 21.2977 14.8226 21.2977C14.8226 21.2977 5.63122 21.2977 3.33456 20.6834C2.06695 20.3411 1.07063 19.3422 0.73385 18.076C0.121094 15.7782 0.121094 10.9809 0.121094 10.9809C0.121094 10.9809 0.121094 6.18356 0.73385 3.88573C1.07531 2.61488 2.07162 1.61602 3.33456 1.27838C5.63122 0.664062 14.8226 0.664062 14.8226 0.664062C14.8226 0.664062 24.0186 0.664062 26.3106 1.27838ZM19.5234 10.9809L11.885 15.403V6.55872L19.5234 10.9809Z"
							fill="currentColor"
						/>
					</svg>
				</a>
			</div>
			<span class="font-secondary text-lg text-gray-500 dark:text-gray-400 text-center block">
				©<a href="/" class="dark:hover:text-gray-100">&nbsp;Talentify</a>, All rights reserved.
			</span>
		</div>
	</div>
</footer>

<!-- Footer -->

<button
	id="darkModeToggle"
	class="fixed bottom-4 right-4 bg-indigo-600 text-white dark:bg-indigo-400 dark:text-gray-900 p-2 rounded-full shadow-lg"
	on:click={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
>
	{#if theme === 'dark'}
		<Sun size={20} weight="bold" class="h-5 w-5" />
	{:else}
		<MoonStars size={24} weight="bold" class="h-5 w-5" />
	{/if}
</button>
