<script lang="ts">
	import { onMount } from 'svelte'

	// ** Icons :
	import UserCircle from 'phosphor-svelte/lib/UserCircle'
	import CaretDown from 'phosphor-svelte/lib/CaretDown'
	import GearSix from 'phosphor-svelte/lib/GearSix'
	import SignOut from 'phosphor-svelte/lib/SignOut'

	export let user

	let show = false

	$: style =
		screenWidth > 1140
			? 'position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 70px, 0px);'
			: 'position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(-99px, 70px, 0px);'

	let screenWidth = 0

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth
	}

	// Initialize screen width on component mount
	onMount(() => {
		updateScreenWidth()
		window.addEventListener('resize', updateScreenWidth)

		// Cleanup listener on component unmount
		return () => {
			window.removeEventListener('resize', updateScreenWidth)
		}
	})

	let profile = '/profile'
	let settings = '/settings'

	if (user.user_type === 'admin') {
		profile = '/admin/profile'
		settings = '/admin/settings'
	} else if (user.user_type === 'job_employer') {
		profile = '/emp/company'
		settings = '/emp/settings'
	}
</script>

<div>
	<div class="dropdown relative ltr:mr-4 rtl:ml-4">
		<button
			type="button"
			class="flex items-center px-3 py-5 border-x border-gray-50 bg-gray-50/30 dropdown-toggle dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-100"
			id="page-header-user-dropdown"
			data-bs-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="true"
			on:click={() => (show = !show)}
		>
			<div
				class="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2"
			>
				{#if user.avatar}
					<img
						class="object-cover w-full h-full rounded-full"
						src={user.avatar}
						alt={user.first_name}
					/>
				{:else}
					<span class="font-medium text-sm text-gray-600 dark:text-gray-300"
						>{user.last_name
							? user.first_name[0] + user.last_name[0]
							: user.first_name.slice(0, 2)}</span
					>
				{/if}
			</div>

			<span class="font-primary font-medium hidden xl:block"
				>{user.first_name} {' ' + user.last_name.charAt(0)}.</span
			>
			<CaretDown size={12} weight="bold" class="align-bottom hidden xl:block" />
		</button>
		<div
			class="absolute dropdown-menu rounded bg-white shadow top-0 z-50 w-[165px] list-none dark:bg-zinc-800 {show
				? 'block dropdown-animation'
				: 'hidden ltr:-left-3 rtl:-right-3'}"
			id="profile/log"
			{style}
		>
			<div class="border border-gray-50 dark:border-zinc-600" aria-labelledby="navNotifications">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="dropdown-item dark:text-gray-100" on:click={() => (show = false)}>
					<a
						class="flex items-center px-3 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50"
						href={profile}
					>
						<UserCircle size={18} weight="bold" class="text-16 align-middle mr-3" /> Profile
					</a>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				{#if user.user_type !== 'admin'}
					<div class="dropdown-item dark:text-gray-100" on:click={() => (show = false)}>
						<a
							class="flex items-center px-3 py-2 hover:bg-gray-50/50 dark:hover:bg-zinc-700/50"
							href={settings}
						>
							<GearSix class="text-16 align-middle mr-3" /> Settings
						</a>
					</div>
				{/if}
				<hr class="border-gray-50 dark:border-gray-700" />
				<form method="POST" action="/logout" class="hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
					<div class="dropdown-item dark:text-gray-100 dark:hover:bg-zinc-700/50">
						<button class="flex items-center p-3 py-2 dark:hover:bg-zinc-700/50" type="submit">
							<SignOut class="text-16 align-middle mr-3" /> Logout
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
