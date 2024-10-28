<script lang="ts">
	import FixedValueListComponent from '../FixedValueList.svelte';
	import { budget } from '../generalStore';
	import {
		BudgetBlockType,
		IncomeOrExpense,
		type BudgetBlock,
		type FixedValue,
		type FixedValueList
	} from '../types';
	import Card from '../Card.svelte';
	import SavingsFund from '../SavingsFund.svelte';
	import { getTotalAmount } from '../utils';

	const newId = () => 'id-' + Math.random().toString(36).substr(2, 9);

	const addBlock = (block: BudgetBlock) => {
		const id = newId();
		$budget = {
			...$budget,
			blocks: {
				...$budget.blocks,
				[id]: block
			},
			order: [...$budget.order, id]
		};
	};

	const addListBlock = (type: IncomeOrExpense) => () =>
		addBlock({ type, content: [], typeOfBlock: BudgetBlockType.FixedValueList });

	const addSavingsBlock = () =>
		addBlock({
			name: 'Savings fund',
			type: IncomeOrExpense.EXPENSE,
			alreadyPresent: 0,
			willAdd: 0,
			typeOfBlock: BudgetBlockType.SavingsEntry
		});

	$: blocks = $budget.order
		.map((id) => [id, $budget.blocks[id]] as const)
		.reduce(
			(acc, [id, cur]) => {
				const currSum = getTotalAmount(cur);
				const lastEntry = acc[acc.length - 1] ?? { income: 0, expense: 0 };

				const newExpense =
					cur.type === IncomeOrExpense.EXPENSE ? lastEntry.expense + currSum : lastEntry.expense;
				const newIncome =
					cur.type === IncomeOrExpense.INCOME ? lastEntry.income + currSum : lastEntry.income;

				console.log({ id, cur, newIncome, newExpense, lastEntry, currSum });

				return [...acc, { income: newIncome, expense: newExpense, blockId: id }];
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

<div class="list">
	{#each $budget.order as blockId, i}
		{@const block = $budget.blocks[blockId]}
		{@const currBlockData = blocks[blockId]}
		{@const lastBlockData = i > 0 ? blocks[$budget.order[i - 1]] : { income: 0, expense: 0 }}
		<Card>
			{#if block.typeOfBlock === BudgetBlockType.FixedValueList}
				<FixedValueListComponent
					title={block.type === IncomeOrExpense.INCOME ? 'Income' : 'Expenses'}
					handleUpdate={(value: FixedValue[]) =>
						(($budget.blocks[blockId] as FixedValueList).content = value)}
					value={block.content}
					handleDelete={() => {
						const { [blockId]: _, ...rest } = $budget.blocks;
						$budget = {
							...$budget,
							blocks: rest,
							order: $budget.order.filter((id) => id !== blockId)
						};
					}}
					handleMoveUp={i > 0 ? () => {
						const index = $budget.order.indexOf(blockId);
						if (index === 0) {
							throw new Error('Cannot move first element up');
						}
						const newOrder = [...$budget.order];
						[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
						$budget = { ...$budget, order: newOrder };
					} : undefined}
				/>
			{:else if block.typeOfBlock === BudgetBlockType.SavingsEntry}
				<SavingsFund
					state={block}
					target={2705 * 3}
					maxAvailable={lastBlockData.income - lastBlockData.expense}
					onStateChange={(newState) => ($budget.blocks[blockId] = { ...block, ...newState })}
				/>
			{/if}
		</Card>
		<div class="font-bold">
			{`${currBlockData.expense}€ / ${currBlockData.income}€ spent`}
		</div>
	{/each}
	<div class="flex flex-col w-80 gap-2 mt-8">
		<button class="border rounded-md p-2" on:click={addListBlock(IncomeOrExpense.INCOME)}
			>Add income block</button
		>
		<button class="border rounded-md p-2" on:click={addListBlock(IncomeOrExpense.EXPENSE)}
			>Add expense block</button
		>
		<button class="border rounded-md p-2" on:click={addSavingsBlock}>Add savings block</button>
	</div>
</div>

<style>
	.list {
		overflow: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
