<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		setTimeout(() => {
			window.location.href = '/dashboard'
		}, 500)
	})
</script>

<h3 class="absolute top-[50%] right-[50%] text-2xl">Redirecting ...</h3>
