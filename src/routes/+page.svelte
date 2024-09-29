<script lang="ts">
	import FixedValueListComponent from '../FixedValueList.svelte';
	import { budget } from '../generalStore';
	import { BudgetBlockType, IncomeOrExpense, type FixedValue, type FixedValueList } from '../types';
	import Card from '../Card.svelte';
	import SavingsFund from '../SavingsFund.svelte';

	const addBlock = (type: IncomeOrExpense) => () => {
		$budget = {
			...$budget,
			blocks: [
				...$budget.blocks,
				{
					id: 'id-' + Math.random().toString(36).substr(2, 9),
					type,
					content: [],
					typeOfBlock: BudgetBlockType.FixedValueList
				}
			]
		};
	};

	const addSavingsBlock = () => {
		$budget = {
			...$budget,
			blocks: [
				...$budget.blocks,
				{
					id: 'id-' + Math.random().toString(36).substr(2, 9),
					name: 'Savings fund',
					type: IncomeOrExpense.EXPENSE,
					alreadyPresent: 0,
					willAdd: 0,
					typeOfBlock: BudgetBlockType.SavingsEntry
				}
			]
		};
	};

	$: blocks = $budget.blocks
		.reduce(
			(acc, cur) => {
				const currSum =
					cur.typeOfBlock === BudgetBlockType.FixedValueList
						? cur.content.reduce((acc, { amount }) => acc + amount, 0)
						: 0;
				const lastEntry = acc[acc.length - 1] ?? { income: 0, expense: 0 };

				if (cur.type === IncomeOrExpense.INCOME) {
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
			{#if block.typeOfBlock === BudgetBlockType.FixedValueList}
				<FixedValueListComponent
					title={block.type === IncomeOrExpense.INCOME ? 'Income' : 'Expenses'}
					handleUpdate={(value: FixedValue[]) => ((block as FixedValueList).content = value)}
					value={block.content}
					handleDelete={() =>
						($budget = { ...$budget, blocks: $budget.blocks.filter((b) => b.id !== block.id) })}
				/>
			{:else if block.typeOfBlock === BudgetBlockType.SavingsEntry}
				<SavingsFund
					state={block}
					target={2705 * 3}
					onStateChange={(newState) => (block = { ...block, ...newState })}
				/>
			{/if}
		</Card>
		<div>{`${blocks[block.id].expense}€ / ${blocks[block.id].income}€ spent`}</div>
	{/each}
	<button class="border rounded-md px-2" on:click={addBlock(IncomeOrExpense.INCOME)}
		>Add income block</button
	>
	<button class="border rounded-md px-2" on:click={addBlock(IncomeOrExpense.EXPENSE)}
		>Add expense block</button
	>
	<button class="border rounded-md px-2" on:click={addSavingsBlock}>Add savings block</button>
</div>

<style>
	.overflow-auto {
		overflow: auto;
	}
</style>
