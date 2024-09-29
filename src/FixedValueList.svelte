<script lang="ts">
	import { writable } from 'svelte/store';
	import CollapsableContent from './CollapsableContent.svelte';
	import type { FixedValueList } from './types';

	export let title: string;
	export let value: FixedValueList = [];
	export let handleUpdate: (newState: FixedValueList) => void;
	export let handleDelete: () => void;

	const name = writable('');
	const amount = writable(0);

	const handleAddExpense = () => {
		handleUpdate([
			...value,
			{ id: 'id-' + Math.random().toString(36).substr(2, 9), name: $name, amount: $amount }
		]);
		$name = '';
		$amount = 0;
	};

	const deleteExpense = (idToDelete: string) => () => {
		handleUpdate(value.filter(({ id }) => id !== idToDelete));
	};

	const forceExpanded = writable(false);

	$: total = value.reduce((acc, { amount }) => acc + amount, 0);
</script>

<CollapsableContent {title} {forceExpanded}>
	<div slot="summary">
		{total}€
	</div>

	<div slot="content" class="expenses">
		{#each value as { id, name, amount }}
			<div class="flex justify-between">
				<div>
					<span>{amount}€</span> - <span>"{name}"</span>
				</div>
				<button class="border px-1 rounded-md" on:click={deleteExpense(id)}>Delete</button>
			</div>
		{/each}
		<div class="flex justify-between">
			<input class="w-28 border-b-2" bind:value={$amount} type="number" placeholder="amount" />
			<input class="w-28 border-b-2" bind:value={$name} placeholder="description" />
			<button class="border px-1 rounded-md" on:click={handleAddExpense}>Add</button>
		</div>
		<div>
			<span>total: {total} total€</span>
		</div>
		<button class="border rounded-md px-2" on:click={handleDelete}>Delete block</button>
	</div>
</CollapsableContent>

<style>
	.expenses {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
