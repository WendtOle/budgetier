<script>
	import { total, fixCosts } from '../store';
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<h1>Budgetier</h1>
<div>
	<div>
		<label for="total">Total:</label>
		<input id="total" type="number" bind:value={$total} />
	</div>
	<div>
		<label for="total">Fixkosten:</label>
		<input id="total" type="number" bind:value={$fixCosts} />
		{#if $total !== 0}
			<span>{(($fixCosts / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</div>
	<div>
		<span>Rest which is not assigned yet: {$total - $fixCosts} €</span>
	</div>
</div>
