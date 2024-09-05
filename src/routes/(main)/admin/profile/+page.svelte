<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	// ** Icons :
	import DotsThreeOutline from 'phosphor-svelte/lib/DotsThreeOutline'
	import DotOutline from 'phosphor-svelte/lib/DotOutline'

	// ** Components :
	import PageTitle from '$lib/components/PageTitle.svelte'
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
									<span class="font-medium text-4xl text-gray-600 dark:text-gray-300"
										>{data.user ? data?.user.first_name[0] + data?.user.last_name[0] : 'PH'}</span
									>
								</div>
							</div>
							<div>
								<h5 class="text-16 mb-1 text-gray-700 dark:text-gray-100">
									{data.user?.first_name + ' ' + data.user?.last_name}
								</h5>
								<p class="text-gray-500 dark:text-zinc-100 text-13">The Website Super Admin</p>

								<div class="flex flex-wrap items-start gap-2 text-13 mt-3">
									<div class="flex items-center text-gray-500 dark:text-zinc-100">
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
								href={null}
								target="_blank"
								class="btn bg-gray-50/50 border-transparent dark:bg-zinc-700 dark:text-gray-100 font-bold text-red-500"
								><i class="me-1"></i>ADMIN</a
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
								<ul
									class=" dropdown-menu min-w-max absolute bg-white z-50 float-left py-2 list-none text-left -right-10 top-6 w-40
									rounded-lg shadow-lg hidden bg-clip-padding border-none dark:bg-zinc-700"
									aria-labelledby="dropdownMenu1"
								>
									<li>
										<a
											class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-zinc-600/50"
											href={null}>Action</a
										>
									</li>
									<li>
										<a
											class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
										bg-transparent text-gray-700 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-zinc-600/50"
											href={null}>Another action</a
										>
									</li>
									<li>
										<a
											class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent
										text-gray-700 dark:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-zinc-600/50"
											href={null}>Something else here</a
										>
									</li>
								</ul>
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
							class="py-5 px-3 active text-violet-500 border-violet-300 border-b-2 dark:border-violet-500 font-medium"
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
									<h5 class="text-15 text-gray-700 dark:text-gray-100">Description :</h5>
								</div>
							</div>
							<div class="col-span-10">
								<div class="text-gray-500 dark:text-zinc-100">
									<p class="mb-2">
										This is the super admin of the website. He has all the rights to manage the
										website and its users. He can create, update, delete and view all the users and
										their profiles. He can also manage the website settings and configurations. He
										can create and manage the website content and its pages. He can also manage the
										website's security and its performance. He can also manage the website's SEO and
										its marketing. He can also manage the website's analytics and its reports. He
										can also manage the website's social media and its campaigns. He can also manage
										the website's advertisements and its promotions. He can also manage the
										website's subscriptions and its payments. He can also manage the website's
										notifications and its alerts. He can also manage the website's messages and its
										chats. He can also manage the website's emails and its newsletters. He can also
										manage the website's forms and its surveys. He can also manage the website's
										quizzes and its exams. He can also manage the website's events and its
										calendars. He can also manage the website's blogs and its articles.
									</p>
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
				<h5 class="text-15 text-gray-700 dark:text-gray-100 mb-3">Assigned Tasks</h5>
				<div class="font-secondary font-semibold flex flex-wrap gap-2">
					<a href="/admin/create/company" class="hover:underline">Create Company profiles</a>
					<a href="/admin/create/employer" class="hover:underline">Create Employer's Accounts</a>
					<a href="/admin/view/companies" class="hover:underline">Edit Company profiles</a>
					<a href="/admin/view/employers" class="hover:underline">Edit Employer's Accounts</a>
					<a href="/admin/view/companies" class="hover:underline">View All Companies profiles</a>
					<a href="/admin/view/employers" class="hover:underline">View All Employers Accounts</a>
				</div>
			</div>
		</div>
	</div>
</div>
