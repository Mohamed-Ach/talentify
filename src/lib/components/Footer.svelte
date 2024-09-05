<script lang="ts">
	import { websiteName } from '$lib/stores'
</script>

<footer
	class="footer absolute bottom-0 right-0 left-0 border-t border-gray-50 py-5 pl-10 pr-5 bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
>
	<div class="grid grid-cols-2">
		<div class="grow font-primary">
			&copy;
			{new Date().getFullYear() + ' '}
			{websiteName}
		</div>
		<div class="hidden md:inline-block text-end font-primary">
			Design & Develop by <a
				href="https://github.com/Mohamed-Ach"
				class="text-violet-500 hover:underline font-bold">Mohamed Ach.</a
			>
		</div>
	</div>
</footer>
