<div class="card">
	<slot />
</div>

<style>
	.card {
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		margin: 1rem;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
