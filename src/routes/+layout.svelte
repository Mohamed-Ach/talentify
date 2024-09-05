<script lang="ts">
	import '../app.css'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div id="theme" class={data.theme === 'dark' ? 'dark' : ''}>
	<slot />
</div>
