<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	// Components
	import PageTitle from '$lib/components/PageTitle.svelte'

	// Icons
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo'
	import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo'
	import TwitterLogo from 'phosphor-svelte/lib/TwitterLogo'
	import LinkSimple from 'phosphor-svelte/lib/LinkSimple'

	// Images
	import cover from '$lib/images/company-banner.png'

	const company = data.company.company
</script>

<PageTitle
	title="Company Profile"
	breadcrumbs={[
		{ name: 'Companies', link: '/admin/view/companies' },
		{ name: 'view', link: null }
	]}
/>

<section class="relative pt-36 pb-24">
	<img src={cover} alt="cover" class="w-full absolute top-0 left-0 z-0 h-60" />
	<div class="w-full max-w-7xl mx-auto px-6 md:px-8">
		<div class="flex justify-center items-center">
			<div
				class="flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 relative z-10 mb-2.5 border-2 border-white"
			>
				{#if company.logo}
					<img
						src={company.logo}
						alt="Thumbnail Preview"
						class="w-full h-full object-cover rounded-full"
					/>
				{:else}
					<span class="font-secondary font-bold text-4xl text-gray-600 dark:text-gray-300"
						>{company.name.slice(0, 2)}</span
					>
				{/if}
			</div>
		</div>
		<h3
			class="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3 dark:text-white"
		>
			{company.name}
		</h3>
		<p class="font-secondary font-bold text-base leading-7 text-gray-500 text-center mb-8">
			{company.title}
		</p>
		<div class="flex flex-row items-center justify-center gap-5 mb-4">
			<p
				class="font-secondary font-bold text-base leading-7 text-gray-900 dark:text-white text-center mb-4"
			>
				{company.location}
			</p>
			<p
				class=" font-secondary font-bold text-base leading-7 text-gray-900 dark:text-white text-center mb-4"
			>
				Founded in: {company.founded}
			</p>
			<p
				class="font-secondary font-bold text-base leading-7 text-gray-900 dark:text-white text-center mb-4"
			>
				Size: {company.size}
			</p>
		</div>

		<div class="flex items-center justify-center gap-5">
			<a
				class="group p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
				href={company.website}
				target="_blank"
			>
				<LinkSimple size={24} weight="duotone" class="group-hover:text-white" />
			</a>
			<a
				class="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
				href={'https://facebook.com/' + company.facebook}
				target="_blank"
			>
				<FacebookLogo size={24} weight="duotone" class="group-hover:text-white" />
			</a>
			<a
				class="p-3 rounded-full border border-solid border-gray-300 bg-gray-50 group transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
				href={'https://linkedin.com/' + company.linkedin}
				target="_blank"
			>
				<LinkedinLogo size={24} weight="duotone" class="group-hover:text-white" />
			</a>
			<a
				class="p-3 rounded-full border border-solid border-gray-300 group bg-gray-50 transition-all duration-500 hover:bg-indigo-700 hover:border-indigo-700"
				href={'https://twitter.com/' + company.twitter}
				target="_blank"
			>
				<TwitterLogo size={24} weight="duotone" class="group-hover:text-white" />
			</a>
		</div>

		<div class="flex flex-row items-center justify-center gap-5 mt-12">
			<p
				class="font-secondary font-bold text-base leading-7 text-gray-900 dark:text-white text-center mb-4"
			>
				{company.description}
			</p>
		</div>
	</div>
</section>
