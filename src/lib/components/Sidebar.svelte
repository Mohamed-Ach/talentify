<script lang="ts">
	import ChatTeardropText from 'phosphor-svelte/lib/ChatTeardropText'
	import BookBookmark from 'phosphor-svelte/lib/BookBookmark'
	import SquaresFour from 'phosphor-svelte/lib/SquaresFour'
	import HouseLine from 'phosphor-svelte/lib/HouseLine'
	import FilePlus from 'phosphor-svelte/lib/FilePlus'
	import SignOut from 'phosphor-svelte/lib/SignOut'
	import Quotes from 'phosphor-svelte/lib/Quotes'

	export let user

	let item1 = {
		name: 'Dashboard',
		link: '/dashboard',
		icon: HouseLine
	}
	let item2 = {
		name: 'Applied Jobs',
		link: '/applied-jobs',
		icon: SquaresFour
	}
	let item3 = {
		name: 'Saved Jobs',
		link: '/applicant-saved-jobs',
		icon: BookBookmark
	}
	let item4 = {
		name: 'Share Feedback',
		link: '/feedback',
		icon: ChatTeardropText
	}
	let item5 = {
		name: 'Testimonials',
		link: '/testimonials',
		icon: Quotes
	}

	if (user.user_type === 'admin') {
		item1 = {
			name: 'Dashboard',
			link: '/admin/dashboard',
			icon: HouseLine
		}
		item2 = {
			name: 'View Companies',
			link: '/admin/view/companies',
			icon: SquaresFour
		}
		item3 = {
			name: 'View Employers',
			link: '/admin/view/companies',
			icon: SquaresFour
		}
		item4 = {
			name: 'Create Employer',
			link: '/admin/view/companies',
			icon: FilePlus
		}
		item5 = {
			name: 'Create Company',
			link: '/admin/create/company',
			icon: FilePlus
		}
	} else if (user.user_type === 'job_employer') {
		item1 = {
			name: 'Dashboard',
			link: '/emp/dashboard',
			icon: HouseLine
		}

		item2 = {
			name: 'My Jobs',
			link: '/emp/job-posts',
			icon: SquaresFour
		}

		item3 = {
			name: 'Create Job Post',
			link: '/emp/job-posts/create',
			icon: FilePlus
		}
	}
</script>

<div
	class="vertical-menu rtl:right-0 fixed ltr:left-0 bottom-0 top-16 h-screen border-r bg-slate-50 border-gray-50 print:hidden dark:bg-zinc-800 dark:border-neutral-700 z-10"
>
	<div data-simplebar class="h-full">
		<div class="metismenu pb-10 pt-2.5" id="sidebar-menu">
			<ul class="metismenu flex flex-col min-h-[90vh]" id="side-menu">
				<li
					class="menu-heading px-4 py-3.5 text-xs font-medium text-gray-500 cursor-default"
					data-key="t-menu"
				>
					Menu
				</li>

				<li class="group">
					<a
						href={item1.link}
						class="group-hover:bg-slate-50 group-hover:dark:bg-zinc-800 font-primary pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white dark:bg-zink-800"
					>
						<svelte:component this={item1.icon} size={24} weight="bold" class="align-middle" />
						<span data-key="t-dashboard"> {item1.name}</span>
					</a>
				</li>

				<li class="group">
					<a
						href={item2.link}
						aria-expanded="false"
						class="group-hover:bg-slate-50 group-hover:dark:bg-zinc-800 font-primary pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white"
					>
						<svelte:component this={item2.icon} size={24} weight="bold" class="align-middle" />
						<span data-key="t-apps">{item2.name}</span>
					</a>
				</li>
				<li class="group">
					<a
						href={item3.link}
						aria-expanded="false"
						class="group-hover:bg-slate-50 group-hover:dark:bg-zinc-800 font-primary pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white"
					>
						<svelte:component this={item3.icon} size={24} weight="bold" class="align-middle" />
						<span data-key="t-apps">{item3.name}</span>
					</a>
				</li>
				<li class="group">
					<a
						href={item4.link}
						aria-expanded="false"
						class="group-hover:bg-slate-50 group-hover:dark:bg-zinc-800 font-primary pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white"
					>
						<svelte:component this={item4.icon} size={24} weight="bold" class="align-middle" />
						<span data-key="t-apps">{item4.name}</span>
					</a>
				</li>
				<li class="group">
					<a
						href={item5.link}
						aria-expanded="false"
						class="group-hover:bg-slate-50 group-hover:dark:bg-zinc-800 font-primary pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white"
					>
						<svelte:component this={item5.icon} size={24} weight="bold" class="align-middle" />
						<span data-key="t-apps">{item5.name}</span>
					</a>
				</li>
				<li class="mt-auto">
					<form method="POST" action="/logout">
						<button
							class="pl-6 pr-4 py-3 block text-sm font-medium text-gray-700 transition-all duration-150 ease-linear hover:text-violet-500 dark:text-gray-300 dark:active:text-white dark:hover:text-white"
							aria-expanded="false"
							type="submit"
						>
							<SignOut size={20} weight="bold" class="align-middle" />
						</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>
