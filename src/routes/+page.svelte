<script lang="ts">
	import FixedValueListComponent from '../FixedValueList.svelte';
	import { budget } from '../generalStore';
	import { BudgetBlockType } from '../types';
	import type { BudgetBlock, FixedValueList } from '../types';
	import Card from '../Card.svelte';

	const addBlock = (type: BudgetBlockType) => () => {
		$budget = {
			...$budget,
			blocks: [
				...$budget.blocks,
				{
					id: 'id-' + Math.random().toString(36).substr(2, 9),
					type,
					content: []
				}
			]
		};
	};

	$: blocks = $budget.blocks
		.reduce(
			(acc, cur) => {
				const currSum = cur.content.reduce((acc, { amount }) => acc + amount, 0);
				const lastEntry = acc[acc.length - 1] ?? { income: 0, expense: 0 };

				if (cur.type === BudgetBlockType.INCOME) {
					const total = lastEntry.income + currSum;
					return [
						...acc,
						{
							...lastEntry,
							blockId: cur.id,
							income: total
						}
					];
				}

				const total = lastEntry.expense + currSum;

				return [
					...acc,
					{
						...lastEntry,
						blockId: cur.id,
						expense: total
					}
				];
			},
			[] as { blockId: string; income: number; expense: number }[]
		)
		.reduce(
			(acc, { blockId, ...rest }) => ({
				...acc,
				[blockId]: rest
			}),
			{} as Record<string, { income: number; expense: number }>
		);
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<div class="overflow-auto">
	{#each $budget.blocks as block}
		<Card>
			<FixedValueListComponent
				title={block.type === BudgetBlockType.INCOME ? 'Income' : 'Expenses'}
				handleUpdate={(value: FixedValueList) => (block.content = value)}
				value={block.content}
				handleDelete={() =>
					($budget = { ...$budget, blocks: $budget.blocks.filter((b) => b.id !== block.id) })}
			/>
		</Card>
		<div>{`${blocks[block.id].expense}€ / ${blocks[block.id].income}€ spent`}</div>
	{/each}
	<button class="border rounded-md px-2" on:click={addBlock(BudgetBlockType.INCOME)}
		>Add income block</button
	>
	<button class="border rounded-md px-2" on:click={addBlock(BudgetBlockType.EXPENSE)}
		>Add expense block</button
	>
</div>

<style>
	.overflow-auto {
		overflow: auto;
	}
</style>
