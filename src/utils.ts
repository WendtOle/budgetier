import { BudgetBlockType, type BudgetBlock } from './types';

export const getTotalAmount = (block: BudgetBlock): number => {
	if (block.typeOfBlock === BudgetBlockType.FixedValueList) {
		return block.content.reduce((acc, { amount }) => acc + amount, 0);
	}
	if (block.typeOfBlock === BudgetBlockType.SavingsEntry) {
		return block.willAdd;
	}
	throw new Error('Unknown block type');
};
