<script lang="ts">
	export let show: boolean = false;
</script>

{#if show}
	<div class="wrapper">
		<div class="lds-ripple">
			<div></div>
			<div></div>
		</div>
	</div>
{/if}

<style>
	.wrapper {
		position: fixed; /* Make the wrapper fixed to the viewport */
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.3); /* Dark background */
		z-index: 1000; /* Ensure it is on top of other content */
	}
	.lds-ripple,
	.lds-ripple div {
		box-sizing: border-box;
		color: #5156BE;
	}
	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid currentColor;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 1;
		}
		100% {
			top: 0;
			left: 0;
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}
</style>