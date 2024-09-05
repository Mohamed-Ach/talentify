<script lang="ts">
	import CaretRight from 'phosphor-svelte/lib/CaretRight'

	export let title = 'Title'
	export let breadcrumbs: { name: string; link: string | null }[] = []
</script>

<div class="grid grid-cols-1 mb-5">
	<div class="flex items-center justify-between">
		<h4 class="mb-sm-0 text-lg font-semibold grow text-gray-800 dark:text-gray-100">{title}</h4>
		<nav class="flex font-primary" aria-label="Breadcrumb">
			<ol class="inline-flex items-center space-x-1 ltr:md:space-x-3 rtl:md:space-x-0">
				{#each breadcrumbs as crumb, i}
					<li>
						<div class="flex items-center">
							{#if i > 0}
								<CaretRight size={10} weight="bold" class="w-4 h-4 text-gray-400 mr-2" />
							{/if}
							<a
								href={crumb.link}
								class="inline-flex items-center text-sm font-medium text-gray-800 hover:text-gray-900 dark:text-zinc-100 dark:hover:text-white"
							>
								{crumb.name}
							</a>
						</div>
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</div>
