<script lang="ts">
	import Card from '../Card.svelte';
	import Slider from '../Slider.svelte';
	import {
		total,
		fixCostRelative,
		monthlySpendingBudgetRelative,
		monthlySpendingBudgetAbsolute,
		dailySpendingBudgetAbsolute,
		rest,
		expensesOverBudget
	} from '../store';
	import Expenses from '../Expenses.svelte';
	import SavingsFund from '../SavingsFund.svelte';
	import CollapsableContent from '../CollapsableContent.svelte';
	import FixedCosts from '../FixedCosts.svelte';
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<div class="overflow-auto">
	<Card title="Total">
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
		<FixedCosts />
	</Card>
	<Card>
		<CollapsableContent title="Spending budget">
			<div slot="summary">
				{$monthlySpendingBudgetAbsolute}€
			</div>
			<div slot="content">
				<Slider
					value={monthlySpendingBudgetRelative}
					label="Variable costs"
					max={100}
					steps={1}
					displayValue={() =>
						`${$dailySpendingBudgetAbsolute}€/d - ${$monthlySpendingBudgetAbsolute}€/m`}
				/>
				{#if $total !== 0}
					<div>
						{($monthlySpendingBudgetRelative * (100 - $fixCostRelative)) / 100} % of total budget
					</div>
				{/if}
			</div>
		</CollapsableContent>
	</Card>
	<Card><Expenses /></Card>
	{#if $expensesOverBudget > 0}
		<Card title=""><SavingsFund /></Card>
	{/if}
	{#if $expensesOverBudget > 0}
		<Card title="">
			<span>Rest which is not assigned yet: {$rest} € </span>
			<span>{(($rest / $total) * 100).toPrecision(3)} % of total budget</span>
		</Card>
	{/if}
</div>

<style>
	.overflow-auto {
		overflow: auto;
	}
</style>
