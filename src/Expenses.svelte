<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { total, expenses, totalExpenses, expensesOverBudget } from './store';
	import CollapsableContent from './CollapsableContent.svelte';

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

	const forceExpanded = derived(
		expensesOverBudget,
		($expensesOverBudget) => $expensesOverBudget < 0
	);
</script>

<CollapsableContent title="Expenses" {forceExpanded}>
	<div slot="summary">
		{$totalExpenses}€
	</div>

	<div slot="content" class="expenses">
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
	</div>
</CollapsableContent>

<style>
	.expenses {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
