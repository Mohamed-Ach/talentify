<script lang="ts">
	// ** Importing Components :
	import LoadingBar from '$lib/components/LoadingBar.svelte'
	import Sidebar from '$lib/components/Sidebar.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
	import type { PageData } from '../$types'
	import { navigating } from '$app/stores'
	import { writable } from 'svelte/store'

	export let data: PageData

	const loading = writable(false)
</script>

{#if $navigating}
	{loading.set(true)}
{:else}
	{loading.set(false)}
{/if}
<Header theme={data.theme} user={data.user} />
<Sidebar user={data.user} />
<div class="main-content">
	<div class="page-content dark:bg-zinc-700">
		<div class="container-fluid px-[0.625rem] min-h-screen">
			<LoadingBar {loading} />
			<slot />
			<Footer />
		</div>
	</div>
</div>
