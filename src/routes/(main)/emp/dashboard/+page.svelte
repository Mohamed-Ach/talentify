<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'
</script>

<PageTitle
	title="Dashboard"
	breadcrumbs={[
		{ name: 'Dashboard', link: '/dashboard' },
		{ name: 'view', link: null }
	]}
/>

<div class="px-8 py-12 font-[sans-serif]">
	<div class="max-w-6xl mx-auto grid md:grid-cols-2 justify-center items-center gap-12">
		<div class="text-center md:text-left">
			<h2 class="text-4xl lg:text-5xl font-extrabold text-violet-500 mb-6 md:!leading-[55px]">
				Welcome back!
			</h2>
			<p class="text-lg lg:text-xl text-violet-400">
				Explore the latest updates and features of the platform.
			</p>
		</div>
		<div class="text-center">
			<img src="https://readymadeui.com/management-img.webp" alt="Banner" class="w-full mx-auto" />
		</div>
	</div>
</div>

<div class="grid grid-cols-1 gap-6 gap-y-0 2xl:gap-6 md:grid-cols-2 2xl:grid-cols-4 mb-32">
	<div class="card dark:bg-zinc-800 dark:border-zinc-600 font-primary">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Jobs Created</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">32</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+20%</span
				>
				<span class="ml-1.5 text-gray-700 text-13 dark:text-zinc-100">Since last week</span>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Job Invitations</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">4</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-red-500/40 text-red-500 rounded font-medium dark:bg-red-500/30"
					>-5%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Company Views</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">67</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center mt-1">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+30%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
	<div class="card dark:bg-zinc-800 dark:border-zinc-600">
		<div class="card-body">
			<div>
				<div class="grid items-center grid-cols-12 gap-6">
					<div class="col-span-6">
						<span class="text-gray-700 dark:text-zinc-100">Accepted Interviews</span>
						<h4 class="my-4 font-medium text-gray-800 text-21 dark:text-gray-100">
							<span class="counter-value" data-target="865.2">32.57%</span>
						</h4>
					</div>
				</div>
			</div>
			<div class="flex items-center">
				<span
					class="text-[10px] py-[1px] px-1 bg-green-500/40 text-green-500 rounded font-medium dark:bg-green-500/30"
					>+ 2.95%</span
				>
				<span class="ltr:ml-1.5 rtl:mr-1.5 text-gray-700 text-13 dark:text-zinc-100"
					>Since last week</span
				>
			</div>
		</div>
	</div>
</div>
