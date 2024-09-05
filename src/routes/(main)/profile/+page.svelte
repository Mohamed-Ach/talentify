<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	// ** Icons :
	import DotsThreeOutline from 'phosphor-svelte/lib/DotsThreeOutline'
	import UserCircleDashed from 'phosphor-svelte/lib/UserCircleDashed'
	import FacebookLogo from 'phosphor-svelte/lib/FacebookLogo'
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo'
	import DotOutline from 'phosphor-svelte/lib/DotOutline'
	import XLogo from 'phosphor-svelte/lib/XLogo'

	// ** Components :
	import PageTitle from '$lib/components/PageTitle.svelte'

	function replaceNewlines(text: string): string {
		return text.replace(/\r\n|\n|\r/g, '<br>')
	}
</script>

<PageTitle
	title="Profile"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'Profile', link: null }
	]}
/>

<div class="grid grid-cols-12 gap-4">
	<div class="col-span-12 lg:col-span-9">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<div class="grid grid-cols-12">
					<div class="col-span-9">
						<div class="flex flex-wrap items-center">
							<div class="h-20 w-20 ltr:mr-3 rtl:ml-1">
								<div
									class="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2"
								>
									{#if data.user?.avatar}
										<img
											class="object-cover w-full h-full rounded-full"
											src={data.user?.avatar}
											alt={data.user?.first_name}
										/>
									{:else}
										<span class="font-medium text-sm text-gray-600 dark:text-gray-300"
											>{data.user?.last_name
												? data.user?.first_name[0] + data.user?.last_name[0]
												: data.user?.first_name.slice(0, 2)}</span
										>
									{/if}
								</div>
							</div>
							<div>
								<h5 class="text-16 mb-1 text-gray-700 dark:text-gray-100">
									{data.user?.first_name + ' ' + data.user?.last_name}
								</h5>
								<p class="font-secondary text-gray-500 dark:text-zinc-100 text-13">
									{data.profile.profile?.profession || '[Not Set]'}
								</p>

								<div class="flex flex-wrap items-start gap-2 text-13 mt-3">
									<div class="font-secondary flex items-center text-gray-500 dark:text-zinc-100">
										<DotOutline
											size={18}
											weight="fill"
											class="me-1 text-green-500 align-middle ltr:mr-1 rtl:ml-1"
										/>
										{data.user?.email}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-3">
						<div class="flex flex-wrap justify-end">
							<a
								class="btn bg-gray-50/50 border-transparent dark:bg-zinc-700 dark:text-gray-100 font-secondary font-bold"
								href={data.profile.profile?.cv || null}
								target="_blank"><i class="me-1"></i>Resume</a
							>
							<div class="dropstart text-end relative">
								<a
									class="btn border-transparent px-6 py-1 text-16 text-gray-500 dark:text-zinc-100 shadow-none dropdown-toggle"
									href={null}
									role="button"
									data-bs-toggle="dropdown"
									id="dropdownMenu1"
									aria-expanded="false"
								>
									<DotsThreeOutline size={24} weight="fill" />
								</a>
							</div>
						</div>
					</div>
				</div>

				<ul
					class="flex border-t border-gray-50 mt-5 pt-5 dark:border-zinc-600"
					id="pills-tab"
					role="tablist"
				>
					<li>
						<a
							class="font-secondary font-bold py-5 px-3 active text-violet-500 border-violet-300 border-b-2 dark:border-violet-500"
							data-bs-toggle="tab"
							href="#overview"
							role="tab"
							aria-selected="true">Overview</a
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body border-b border-gray-50 dark:border-zinc-600">
				<h5 class="text-15 text-gray-700 dark:text-gray-100">About</h5>
			</div>
			<div class="card-body">
				<div>
					<div class="pb-3">
						<div class="grid grid-cols-12">
							<div class="col-span-2">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Bio :</h5>
								</div>
							</div>
							<div class="col-span-10">
								<div class="text-gray-500 dark:text-zinc-100 font-secondary font-bold">
									<p class="mb-2">
										{@html replaceNewlines(data.profile.profile?.bio || '[Not Set]')}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="py-3">
						<div class="grid grid-cols-12">
							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Degree :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul
										class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4 font-secondary font-bold"
									>
										<li class="flex items-center py-1">
											{data.profile.profile?.degree || '[Not Set]'}
										</li>
									</ul>
								</div>
							</div>
							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Institution :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4">
										<li class="flex items-center py-1 font-secondary font-bold">
											{data.profile.profile?.institution || '[Not Set]'}
										</li>
									</ul>
								</div>
							</div>
							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Certificates :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4">
										{#if data.profile.profile?.certifications}
											{#each data.profile.profile.certifications as certificate}
												<li class="flex items-center py-1 font-secondary font-bold">
													{certificate}
												</li>
											{/each}
										{:else}
											<li class="flex items-center py-1">
												<DotOutline
													size={18}
													weight="fill"
													class="ltr:mr-1 rtl:ml-1 text-green-500 align-middle"
												/>
												[Not Set]
											</li>
										{/if}
									</ul>
								</div>
							</div>
							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Last Job :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4">
										<li class="flex items-center py-1 font-secondary font-bold">
											{data.profile.profile?.experiences || '[Not Set]'}
										</li>
									</ul>
								</div>
							</div>
							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Employment Preference :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4">
										<li class="flex items-center py-1 capitalize font-secondary font-bold">
											{data.profile.profile?.employment_type || '[Not Set]'}
										</li>
									</ul>
								</div>
							</div>

							<div class="col-span-10">
								<div>
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Personal Details :</h5>
								</div>
							</div>
							<div class="col-span-10 mb-5">
								<div class="text-gray-500 dark:text-zinc-100">
									<ul class="list-unstyled mb-0 text-gray-500 dark:text-zinc-100 mt-4">
										<li class="flex items-center py-1 font-secondary font-bold">
											Phone Number: <span class="text-blue-700 ml-2 font-secondary font-bold"
												>{data.profile.profile?.phone_number || '[Not Set]'}</span
											>
										</li>
										<li class="flex items-center py-1 font-secondary font-bold">
											Address: <span class="text-blue-700 ml-2 font-secondary font-bold"
												>{data.profile.profile?.address || '[Not Set]'}</span
											>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-span-12 lg:col-span-3">
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-3">Technical Skills</h5>
				<div class="flex flex-wrap gap-2">
					{#if data.profile.profile?.technical_skills}
						{#each data.profile.profile.technical_skills as skill}
							<a
								href={null}
								class="font-secondary font-bold text-xs px-2 py-0.5 rounded text-violet-500 bg-violet-50/50 hover:bg-violet-50 duration-300 dark:bg-violet-500/20"
							>
								{skill}
							</a>
						{/each}
					{:else}
						<p>[Not Set]</p>
					{/if}
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-3">Soft Skills</h5>
				<div class="flex flex-wrap gap-2">
					{#if data.profile.profile?.soft_skills}
						{#each data.profile.profile?.soft_skills as skill}
							<a
								href={null}
								class="font-secondary font-bold text-xs px-2 py-0.5 rounded text-violet-500 bg-violet-50/50 hover:bg-violet-50 duration-300 dark:bg-violet-500/20"
								>{skill}</a
							>
						{/each}
					{:else}
						<p>[Not Set]</p>
					{/if}
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-3">Languages</h5>
				<div class="flex flex-wrap gap-2">
					{#if data.profile.profile?.languages}
						{#each data.profile.profile?.languages as skill}
							<a
								href={null}
								class="font-secondary font-bold text-xs px-2 py-0.5 rounded text-violet-500 bg-violet-50/50 hover:bg-violet-50 duration-300 dark:bg-violet-500/20"
								>{skill}</a
							>
						{/each}
					{:else}
						<p>[Not Set]</p>
					{/if}
				</div>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-4">Social Media</h5>
				<ul class="list-unstyled mb-0">
					{#if data.profile.profile?.facebook}
						<li>
							<a
								href={'https://facebook.com/' + data.profile.profile.facebook}
								target="_blank"
								class="flex items-center py-2 d-block text-gray-500 dark:text-zinc-100 font-secondary font-bold"
								><FacebookLogo
									size={20}
									weight="fill"
									class="text-blue-600 ltr:mr-1 rtl:ml-1"
								/>Facebook</a
							>
						</li>
					{/if}
					{#if data.profile.profile?.twitter}
						<li class="mt-2">
							<a
								href={'https://x.com/' + data.profile.profile.twitter}
								target="_blank"
								class="flex items-center py-2 d-block text-gray-500 dark:text-zinc-100 font-secondary font-bold"
								><XLogo size={20} weight="fill" class="text-gray-900 ltr:mr-1 rtl:ml-1" />Twitter</a
							>
						</li>
					{/if}
					{#if data.profile.profile?.linkedin}
						<li class="mt-2">
							<a
								href={'https://linkedin.com/' + data.profile.profile.linkedin}
								target="_blank"
								class="flex items-center py-2 d-block text-gray-500 dark:text-zinc-100 font-secondary font-bold"
								><LinkedinLogo
									size={20}
									weight="fill"
									class="text-blue-700 ltr:mr-1 rtl:ml-1"
								/>Linkedin</a
							>
						</li>
					{/if}
					{#if !data.profile.profile?.facebook && !data.profile.profile?.twitter && !data.profile.profile?.linkedin}
						<li class="mt-4">[Not Set]</li>
					{/if}
				</ul>
			</div>
		</div>
		<div class="card dark:bg-zinc-800 dark:border-zinc-600">
			<div class="card-body">
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-4">Similar Profiles</h5>
				<div class="list-group">
					<a href={null}>
						<div class="flex items-center p-4 border-b border-gray-50 dark:border-zinc-600">
							<div class="avatar-sm flex-shrink-0 ltr:mr-3 rtl:ml-3">
								<UserCircleDashed size={32} weight="fill" class="text-gray-800 dark:text-white" />
							</div>
							<div class="flex-grow">
								<div>
									<h5 class="text-sm mb-1 text-gray-700 dark:text-gray-100">James Nix</h5>
									<p class="text-13 text-gray-500 dark:text-zinc-100 mb-0">Full Stack Developer</p>
								</div>
							</div>
						</div>
					</a>
					<a href={null}>
						<div class="flex items-center p-4 border-b border-gray-50 dark:border-zinc-600">
							<div class="avatar-sm flex-shrink-0 ltr:mr-3 rtl:ml-3">
								<UserCircleDashed size={32} weight="fill" class="text-gray-800 dark:text-white" />
							</div>
							<div class="flex-grow">
								<div>
									<h5 class="text-sm mb-1 text-gray-700 dark:text-gray-100">Darlene Smith</h5>
									<p class="text-13 text-gray-500 dark:text-zinc-100 mb-0">UI/UX Designer</p>
								</div>
							</div>
						</div>
					</a>
					<a href={null}>
						<div class="flex items-center p-4">
							<div class="avatar-sm flex-shrink-0 ltr:mr-3 rtl:ml-3">
								<div
									class="flex items-center justify-center bg-gray-50/50 h-8 w-8 text-22 rounded-full text-center text-gray-100"
								>
									<UserCircleDashed size={32} weight="fill" class="text-gray-800" />
								</div>
							</div>
							<div class="flex-grow">
								<div>
									<h5 class="text-sm mb-1 text-gray-700 dark:text-gray-100">William Swift</h5>
									<p class="text-13 text-gray-500 dark:text-zinc-100 mb-0">Backend Developer</p>
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
