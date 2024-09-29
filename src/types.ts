export interface Budget {
	blocks: BudgetBlock[];
}

export interface BudgetBlock {
	type: BudgetBlockType;
	content: FixedValueList;
}

enum BudgetBlockType {
	INCOME = 'INCOME',
	EXPENSE = 'EXPENSE'
}

interface FixedValueList {
	entries: FixedValue[];
}

interface FixedValue {
	id: string;
	name: string;
	amount: number;
}
