<script lang="ts">
	import Card from '../Card.svelte';
	import Slider from '../Slider.svelte';
	import {
		total,
		fixCosts,
		maxFixedCosts,
		dailySpendingBudget,
		maxDailySpendingBudget,
		monthlySpendingBudget,
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
		<Slider value={fixCosts} label="Fixkosten" max={$maxFixedCosts} />
		{#if $total !== 0}
			<span>{(($fixCosts / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</Card>
	<Card>
		<Slider
			value={dailySpendingBudget}
			label="Variable costs"
			max={$maxDailySpendingBudget}
			steps={1}
			displayValue={(value) => `${value}€/d - ${$monthlySpendingBudget}€/m`}
		/>
		{#if $total !== 0}
			<div>
				{(($monthlySpendingBudget / $total) * 100).toPrecision(3)} % of total budget
			</div>
		{/if}
	</Card>
	<Card>
		<Slider value={savings} label="Savings" max={$maxSavings} />
		{#if $total !== 0}
			<span>{(($savings / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</Card>
	<Card>
		<span>Rest which is not assigned yet: {$rest} €</span>
	</Card>
</div>
