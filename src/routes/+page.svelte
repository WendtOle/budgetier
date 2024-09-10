<script lang="ts">
	import Card from '../Card.svelte';
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

<div>
	<Card>
		<div>
			<label for="total">Total:</label>
			<input
				class="bg-white border border-gray-300 rounded-lg p-2"
				id="total"
				type="number"
				bind:value={$total}
			/>
		</div>
	</Card>
	<Card>
		<div>
			<label for="total">Fixkosten:</label>
			<input
				type="range"
				min="0"
				max={$maxFixedCosts}
				step="1"
				bind:value={$fixCosts}
				disabled={$maxFixedCosts === 0}
			/>
			<span>{$fixCosts} €</span>
		</div>
		{#if $total !== 0}
			<span>{(($fixCosts / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</Card>
	<Card>
		<div>
			<label for="total">Variable costs:</label>
			<input
				type="range"
				min="0"
				max={$maxVariableCosts}
				step="1"
				bind:value={$variableCosts}
				disabled={$maxVariableCosts === 0}
			/>
			<span>{$variableCosts} €</span>
		</div>
		{#if $total !== 0}
			<div>
				{(($variableCosts / $total) * 100).toPrecision(3)} % of total budget
			</div>
		{/if}
	</Card>
	<Card>
		<div>
			<label for="total">Savings:</label>
			<input
				type="range"
				min="0"
				max={$maxSavings}
				step="1"
				bind:value={$savings}
				disabled={$maxSavings === 0}
			/>
			<span>{$savings} €</span>
		</div>
		{#if $total !== 0}
			<span>{(($savings / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</Card>
	<Card>
		<span>Rest which is not assigned yet: {$rest} €</span>
	</Card>
</div>
