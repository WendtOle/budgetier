import { BudgetBlockType, type BudgetBlock } from './types';

export const getTotalAmount = (block: BudgetBlock): number => {
	return block.typeOfBlock === BudgetBlockType.FixedValueList
		? block.content.reduce((acc, { amount }) => acc + amount, 0)
		: block.alreadyPresent + block.willAdd;
};
