<script lang="ts">
	import FixedValueListComponent from '../FixedValueList.svelte';
	import { budget } from '../generalStore';
	import { BudgetBlockType, IncomeOrExpense, type FixedValue, type FixedValueList } from '../types';
	import Card from '../Card.svelte';
	import SavingsFund from '../SavingsFund.svelte';
	import CollapsableContent from '../CollapsableContent.svelte';

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
						: cur.willAdd;
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

	$: length = $budget.blocks.length;
	$: lastBlock =
		length > 0 ? blocks[$budget.blocks[$budget.blocks.length - 1].id] : { income: 0, expense: 0 };
	$: rest = lastBlock.income - lastBlock.expense;
	$: totalIncome = lastBlock.income;
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<div class="list">
	{#each $budget.blocks as block, i}
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
					maxAvailable={blocks[$budget.blocks[i - 1].id].income -
						blocks[$budget.blocks[i - 1].id].expense}
					onStateChange={(newState) => (block = { ...block, ...newState })}
				/>
			{/if}
		</Card>
		<div class="font-bold">
			{`${blocks[block.id].expense}€ / ${blocks[block.id].income}€ spent`}
		</div>
	{/each}
	<div>
		<button class="border rounded-md px-2" on:click={addBlock(IncomeOrExpense.INCOME)}
			>Add income block</button
		>
		<button class="border rounded-md px-2" on:click={addBlock(IncomeOrExpense.EXPENSE)}
			>Add expense block</button
		>
		<button class="border rounded-md px-2" on:click={addSavingsBlock}>Add savings block</button>
	</div>
	<Card
		><CollapsableContent title="Investing">
			<div slot="summary">{rest} €</div>
			<div slot="content">
				<div>Rest which is not assigned yet: {rest} €</div>
				<div>{((rest / totalIncome) * 100).toPrecision(3)} % of total budget</div>
			</div>
		</CollapsableContent></Card
	>
</div>

<style>
	.list {
		overflow: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 16px;
	}
</style>
