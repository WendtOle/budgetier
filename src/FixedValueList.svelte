<script lang="ts">
	import { writable } from 'svelte/store';
	import Block from './Block.svelte';
	import type { FixedValue } from './types';
	import { budgetBlockToEdit } from './generalStore';

	export let value: FixedValue[] = [];
	export let handleUpdate: (newState: FixedValue[]) => void;
	export let handleDelete: () => void;
	export let handleMoveUp: (() => void) | undefined;
	export let id: string;

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

<Block id={id} {forceExpanded}>
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
		<div class="flex w-full justify-between">
			<button class="border rounded-md px-4 py-2" popovertarget="edit-title-popover" on:click={() => $budgetBlockToEdit = id}>Edit block name</button>
			<button class="border rounded-md px-4 py-2" on:click={handleDelete}>Delete block</button>
			{#if handleMoveUp !== undefined}
				<button class="border rounded-md px-4 py-2" on:click={handleMoveUp}>Move block up</button>
			{/if}
		</div>
	</div>
</Block>

<style>
	.expenses {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
