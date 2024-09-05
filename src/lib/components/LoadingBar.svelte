<script lang="ts">
	export let loading
	let isLoading = false
	loading.subscribe((value: boolean) => {
		isLoading = value
	})
</script>

<div class="loading-bar {isLoading ? '' : 'hidden'} "></div>

<style>
	.loading-bar {
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background-color: #5156be;
		transform: translateX(-100%);
		animation: loading 2s linear infinite;
	}

	@keyframes loading {
		0% {
			transform: translateX(-100%);
		}
		50% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
