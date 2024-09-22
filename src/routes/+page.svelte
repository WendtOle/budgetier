<script lang="ts">
	import Card from '../Card.svelte';
	import Slider from '../Slider.svelte';
	import {
		total,
		fixCostRelative,
		fixCostAbsolute,
		monthlySpendingBudgetRelative,
		monthlySpendingBudgetAbsolute,
		dailySpendingBudgetAbsolute,
		rest,
		expensesOverBudget,
		savingsFundRelative,
		savingsFundAbsolute,
		savingsFundCurrently,
		savingsFundWouldHave,
		savingsFundTarget
	} from '../store';
	import Expenses from '../Expenses.svelte';
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<div class="overflow-auto">
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
		<Slider
			value={fixCostRelative}
			label="Fixkosten"
			steps={1}
			max={100}
			displayValue={() => $fixCostAbsolute + '€'}
		/>
		{#if $total !== 0}
			<span>{$fixCostRelative} % of total budget</span>
		{/if}
	</Card>
	<Card>
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
	</Card>
	<Card>
		<Expenses />
	</Card>
	{#if $expensesOverBudget > 0}
		<Card>
			<span>Savingsfund</span>
			<input
				class="bg-white border border-gray-300 rounded-lg p-2"
				type="number"
				bind:value={$savingsFundCurrently}
			/>
			<Slider
				value={savingsFundRelative}
				label="Variable costs"
				max={100}
				steps={1}
				displayValue={() => `${$savingsFundAbsolute}€`}
			/>
			{#if $total !== 0}
				<div>
					{($monthlySpendingBudgetRelative * (100 - $fixCostRelative)) / 100} % of total budget
				</div>
			{/if}
			<span
				>Savings fund would reach {$savingsFundWouldHave}€ - ({Math.round(
					($savingsFundWouldHave / $savingsFundTarget) * 100
				)} %)</span
			>
		</Card>
	{/if}
	{#if $expensesOverBudget > 0}
		<Card>
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
