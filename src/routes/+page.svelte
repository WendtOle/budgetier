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
		<CollapsableContent title="Income">
			<div slot="summary">
				{$total}€
			</div>
			<div slot="content">
				<input
					class="bg-white border border-gray-300 rounded-lg p-2"
					type="number"
					bind:value={$total}
				/>
			</div>
		</CollapsableContent>
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
					displayValue={() => `${$dailySpendingBudgetAbsolute}€/d`}
				/>
				{#if $total !== 0}
					<div>
						{$monthlySpendingBudgetAbsolute}€ - {($monthlySpendingBudgetRelative *
							(100 - $fixCostRelative)) /
							100} % of total budget
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
			<CollapsableContent title="Investing">
				<div slot="summary">{$rest} €</div>
				<div slot="content">
					<div>Rest which is not assigned yet: {$rest} €</div>
					<div>{(($rest / $total) * 100).toPrecision(3)} % of total budget</div>
				</div>
			</CollapsableContent>
		</Card>
	{/if}
</div>

<style>
	.overflow-auto {
		overflow: auto;
	}
</style>
