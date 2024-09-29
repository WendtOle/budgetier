export interface Budget {
	blocks: BudgetBlock[];
}

export interface BudgetBlock {
	id: string;
	type: BudgetBlockType;
	content: FixedValueList;
}

export enum BudgetBlockType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE'
}

export type FixedValueList = FixedValue[];

export interface FixedValue {
	id: string;
	name: string;
	amount: number;
}
