<script lang="ts">
	import { websiteName } from '$lib/stores'

	// ** Importing Images :
	import logoSm from '$lib/images/logo-sm.svg'

	// ** Importing Icons :
	import ArrowCircleRight from 'phosphor-svelte/lib/ArrowCircleRight'
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass'
	import SquaresFour from 'phosphor-svelte/lib/SquaresFour'

	import Clock from 'phosphor-svelte/lib/Clock'
	import Bell from 'phosphor-svelte/lib/Bell'
	import List from 'phosphor-svelte/lib/List'

	// ** Importing Components :
	import ThemeSwitcher from './ui/ThemeSwitcher.svelte'
	import ProfileAvatar from './ui/ProfileAvatar.svelte'

	export let theme
	export let user

	// Toggle Vertical Menu
	import { collapseSidebar } from '$lib/stores'
	import { goto } from '$app/navigation'

	let query = ''

	// Subscribe to collapseSidebar to dynamically update the attribute
	function toggleSidebar() {
		collapseSidebar.update((currentState) => !currentState)
		collapseSidebar.subscribe((value) => {
			if (value) document.body.classList.remove('sidebar-enable')
			else document.body.classList.add('sidebar-enable')
		})
	}
</script>

<nav
	class="border-b border-slate-100 dark:bg-zinc-800 print:hidden flex items-center fixed top-0 right-0 left-0 bg-white z-10 dark:border-zinc-700"
>
	<div class="flex items-center justify-between w-full">
		<div class="topbar-brand flex items-center">
			<div
				class="hidden lg:flex navbar-brand items-center justify-between shrink px-5 h-[70px] border-r bg-slate-50 border-r-gray-50 dark:border-zinc-700 dark:bg-zinc-800"
			>
				<a href="/" class="flex items-center font-bold text-lg dark:text-white">
					<img src={logoSm} alt="" class="ltr:mr-2 rtl:ml-2 inline-block mt-1 h-6" />
					<span class="hidden xl:block align-middle">{websiteName}</span>
				</a>
			</div>
			<button
				type="button"
				class="md:hidden text-gray-600 dark:text-white h-[70px] ltr:-ml-10 ltr:mr-6 rtl:-mr-10 rtl:ml-10 vertical-menu-btn"
				id="vertical-menu-btn"
				on:click={toggleSidebar}
			>
				<List size={20} weight="bold" />
			</button>
			<form
				class="app-search hidden xl:block px-5"
				on:submit|preventDefault={() => {
					goto(query ? `/job-listings?query=${query}` : '/job-listings')
				}}
			>
				<div class="relative inline-block">
					<input
						class="bg-gray-50/30 dark:bg-zinc-700/50 border-0 rounded focus:ring-0 placeholder:text-sm px-4 dark:placeholder:text-gray-200 dark:text-gray-100 dark:border-zinc-700"
						placeholder="Search..."
						bind:value={query}
						name="query"
						type="text"
					/>
					<button
						class="py-1.5 px-2.5 text-white bg-violet-500 inline-block absolute ltr:right-1 top-1 rounded shadow shadow-violet-100 dark:shadow-gray-900 rtl:left-1 rtl:right-auto"
						type="submit"><MagnifyingGlass size={20} weight="bold" /></button
					>
				</div>
			</form>
		</div>
		<div class="flex items-center">
			<div>
				<div class="dropdown relative sm:hidden block">
					<button
						type="button"
						class="text-xl px-4 h-[70px] text-gray-600 dark:text-gray-100 dropdown-toggle"
						data-dropdown-toggle="navNotifications"
					>
						<i data-feather="search" class="h-5 w-5"></i>
					</button>

					<div
						class="dropdown-menu absolute px-4 -left-36 top-0 mx-4 w-72 z-50 hidden list-none border border-gray-50 rounded bg-white shadow dark:bg-zinc-800 dark:border-zinc-600 dark:text-gray-300"
						id="navNotifications"
					>
						<form
							class="py-3 dropdown-item"
							aria-labelledby="navNotifications"
							on:submit|preventDefault={() => {
								goto(`/job-listings?query=${query}`)
							}}
						>
							<div class="form-group m-0">
								<div class="flex w-full">
									<input
										class="border-gray-100 dark:border-zinc-600 dark:text-zinc-100 w-fit"
										aria-label="Search Result"
										placeholder="Search ..."
										bind:value={query}
										name="query"
										type="text"
									/>
									<button
										class="btn btn-primary border-l-0 rounded-l-none bg-violet-500 border-transparent text-white"
										type="submit"><MagnifyingGlass size={20} weight="bold" /></button
									>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div>
				<div class="dropdown relative text-gray-600 hidden sm:block">
					<button
						type="button"
						class="btn border-0 h-[70px] text-xl px-4 dropdown-toggle dark:text-gray-100"
						data-bs-toggle="dropdown"
						id="dropdownMenuButton1"
					>
						<SquaresFour size={24} weight="bold" />
					</button>
					<div
						class="dropdown-menu absolute -left-40 z-50 hidden w-72 list-none border border-gray-50 rounded bg-white shadow dark:bg-zinc-800 dark:border-zinc-600 dark:text-gray-300"
						aria-labelledby="dropdownMenuButton1"
					>
						<div class="p-2">
							<div class="grid grid-cols-3">
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<span>GitHub</span>
								</a>
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<img class="mb-2 mx-auto h-6" alt="Github" />
									<span>Bitbucket</span>
								</a>
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<span>Dribbble</span>
								</a>
							</div>
							<div class="grid grid-cols-3">
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<span>Dropbox</span>
								</a>
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<span>Mail Chimp</span>
								</a>
								<a
									class="dropdown-item hover:bg-gray-50/50 py-4 text-center dark:hover:bg-zinc-700/50 dark:hover:text-gray-50"
									href="null"
								>
									<span>Slack</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="dropdown relative hidden sm:block">
					<div class="relative">
						<button
							type="button"
							class="btn border-0 h-[70px] dropdown-toggle px-4 text-gray-500 dark:text-gray-100"
							aria-expanded="false"
							data-dropdown-toggle="notification"
						>
							<Bell size={24} weight="bold" class="h-5 w-5" />
						</button>
						<span
							class="absolute text-xs px-1.5 bg-red-500 text-white font-medium rounded-full left-6 top-2.5"
							>5</span
						>
					</div>
					<div
						class="dropdown-menu absolute z-50 hidden w-80 list-none rounded bg-white shadow dark:bg-zinc-800"
						id="notification"
					>
						<div
							class="border border-gray-50 dark:border-gray-700 rounded"
							aria-labelledby="notification"
						>
							<div class="grid grid-cols-12 p-4">
								<div class="col-span-6">
									<h6 class="m-0 text-gray-700 dark:text-gray-100">Notifications</h6>
								</div>
								<div class="col-span-6 justify-self-end">
									<a href="#!" class="text-xs underline dark:text-gray-400"> Unread (3)</a>
								</div>
							</div>
							<div class="max-h-56" data-simplebar>
								<div>
									<a href="#!" class="text-reset notification-item">
										<div class="flex px-4 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
											<div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
												<img src="" class="rounded-full h-8 w-8" alt="user-pic" />
											</div>
											<div class="flex-grow">
												<h6 class="mb-1 text-gray-700 dark:text-gray-100">James Lemire</h6>
												<div class="text-13 text-gray-600">
													<p class="mb-1 dark:text-gray-400">
														It will seem like simplified English.
													</p>
													<p class="mb-0">
														<Clock size={18} weight="fill" class="text-gray-400" />
														<span>1 hour ago</span>
													</p>
												</div>
											</div>
										</div>
									</a>
									<a href="#!" class="text-reset notification-item">
										<div class="flex px-4 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
											<div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
												<div class="h-8 w-8 bg-violet-500 rounded-full text-center">
													<span class="bx bx-cart text-xl leading-relaxed text-white">Kr</span>
												</div>
											</div>
											<div class="flex-grow">
												<h6 class="mb-1 text-gray-700 dark:text-gray-100">Your order is placed</h6>
												<div class="text-13 text-gray-600">
													<p class="mb-1 dark:text-gray-400">
														If several languages coalesce the grammar
													</p>
													<p class="mb-0">
														<Clock size={18} weight="fill" class="text-gray-400" />
														<span>3 min ago</span>
													</p>
												</div>
											</div>
										</div>
									</a>
									<a href="#!" class="text-reset notification-item">
										<div class="flex px-4 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
											<div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
												<div class="h-8 w-8 bg-green-500 rounded-full text-center">
													<span class="bx bx-badge-check text-xl leading-relaxed text-white">C</span
													>
												</div>
											</div>
											<div class="flex-grow">
												<h6 class="mb-1 text-gray-700 dark:text-gray-100">Your item is shipped</h6>
												<div class="text-13 text-gray-600">
													<p class="mb-1 dark:text-gray-400">
														If several languages coalesce the grammar
													</p>
													<p class="mb-0">
														<Clock size={18} weight="fill" class="text-gray-400" />
														<span>3 min ago</span>
													</p>
												</div>
											</div>
										</div>
									</a>
									<a href="#!" class="text-reset notification-item">
										<div class="flex px-4 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
											<div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
												<img src="" class="rounded-full h-8 w-8" alt="user-pic" />
											</div>
											<div class="flex-grow">
												<h6 class="mb-1 text-gray-700 dark:text-gray-100">Salena Layfield</h6>
												<div class="text-13 text-gray-600">
													<p class="mb-1 dark:text-gray-400">
														As a skeptical Cambridge friend of mine occidental.
													</p>
													<p class="mb-0">
														<Clock size={18} weight="fill" class="text-gray-400" />
														<span>1 hour ago</span>
													</p>
												</div>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div
								class="p-1 border-t grid border-gray-50 dark:border-zinc-600 justify-items-center"
							>
								<a class="btn border-0 text-violet-500" href="null">
									<ArrowCircleRight size={20} weight="bold" class="mr-1" /> <span>View More..</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ThemeSwitcher {theme} />

			<ProfileAvatar {user} />
		</div>
	</div>
</nav>
