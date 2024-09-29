export interface Budget {
	blocks: BudgetBlock[];
}

export interface BaseBudgetBlock {
	id: string;
	type: IncomeOrExpense;
	typeOfBlock: BudgetBlockType;
}

type BudgetBlock = FixedValueList | SavingsEntry;

export enum BudgetBlockType {
	FixedValueList = 'FixedValueList',
	SavingsEntry = 'SavingsEntry'
}

export enum IncomeOrExpense {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE'
}

export interface FixedValueList extends BaseBudgetBlock {
	content: FixedValue[];
	typeOfBlock: BudgetBlockType.FixedValueList;
}

export interface FixedValue {
	id: string;
	name: string;
	amount: number;
}

export interface SavingsEntry extends BaseBudgetBlock {
	name: string;
	type: IncomeOrExpense.EXPENSE;
	typeOfBlock: BudgetBlockType.SavingsEntry;
	alreadyPresent: number;
	willAdd: number;
}
