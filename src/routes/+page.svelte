<script lang="ts">
	import {
		total,
		fixCosts,
		maxFixedCosts,
		variableCosts,
		maxVariableCosts,
		rest,
		savings,
		maxSavings
	} from '../store';
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<h1>Budgetier</h1>
<div class="col">
	<div class="row">
		<label for="total">Total:</label>
		<input id="total" type="number" bind:value={$total} />
	</div>
	<div class="row">
		<label for="total">Fixkosten:</label>
		<input
			type="range"
			min="0"
			max={$maxFixedCosts}
			step="1"
			bind:value={$fixCosts}
			disabled={$maxFixedCosts === 0}
		/>
		{#if $total !== 0}
			<span>{$fixCosts} € - {(($fixCosts / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</div>
	<div class="row">
		<label for="total">Variable costs:</label>
		<input
			type="range"
			min="0"
			max={$maxVariableCosts}
			step="1"
			bind:value={$variableCosts}
			disabled={$maxVariableCosts === 0}
		/>
		{#if $total !== 0}
			<span
				>{$variableCosts} € - {(($variableCosts / $total) * 100).toPrecision(3)} % of total budget</span
			>
		{/if}
	</div>
	<div class="row">
		<label for="total">Savings:</label>
		<input
			type="range"
			min="0"
			max={$maxSavings}
			step="1"
			bind:value={$savings}
			disabled={$maxSavings === 0}
		/>
		{#if $total !== 0}
			<span>{$savings} € - {(($savings / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</div>
	<div>
		<span>Rest which is not assigned yet: {$rest} €</span>
	</div>
</div>
