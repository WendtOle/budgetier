<script lang="ts">
	import { writable } from 'svelte/store';
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
		expenses,
		totalExpenses,
		expensesOverBudget,
		savingsFundRelative,
		savingsFundAbsolute,
		savingsFundCurrently,
		savingsFundWouldHave,
		savingsFundTarget
	} from '../store';

	const name = writable('');
	const amount = writable(0);

	const handleAddExpense = () => {
		$expenses = [
			...$expenses,
			{ id: 'id-' + Math.random().toString(36).substr(2, 9), name: $name, amount: $amount }
		];
		$name = '';
		$amount = 0;
	};
	const deleteExpense = (idToDelete: string) => () => {
		$expenses = $expenses.filter(({ id }) => id !== idToDelete);
	};
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
		{#each $expenses as { id, name, amount }}
			<div class="flex justify-between">
				<span>"{name}"</span>
				<span>{amount}€</span>
				<button class="border px-1 rounded-md" on:click={deleteExpense(id)}>Delete</button>
			</div>
		{/each}
		<div class="flex justify-between">
			<input class="w-28 border-b-2" bind:value={$name} />
			<input class="w-28 border-b-2" bind:value={$amount} type="number" />
			<button class="border px-1 rounded-md" on:click={handleAddExpense}>Add</button>
		</div>
		<div>
			<span
				>total: {$totalExpenses}€ - {(($totalExpenses / $total) * 100).toPrecision(3)} % of total budget</span
			>
		</div>
		{#if $expensesOverBudget < 0}
			<span class={`border ${expensesOverBudget ? 'border-red-500' : 'border-transparent'}`}
				>Expenses are over budget ({Math.abs($expensesOverBudget)})€</span
			>
		{/if}
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
