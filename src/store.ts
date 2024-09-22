import { derived } from 'svelte/store';
import { persistedWritable } from './persistedWritable';

const DAYS_IN_MONTH = 31;

export const total = persistedWritable('total', 1200);
export const fixCostRelative = persistedWritable('fixCostRelative', 0);
export const fixCostAbsolute = derived([total, fixCostRelative], ([$total, $fixCostRelative]) =>
	Math.round(($total * $fixCostRelative) / 100)
);
export const monthlySpendingBudgetRelative = persistedWritable('monthlySpendingBudgetRelative', 0);
export const monthlySpendingBudgetAbsolute = derived(
	[total, fixCostAbsolute, monthlySpendingBudgetRelative],
	([$total, $fixCostAbsolute, $monthlySpendingBudgetRelative]) =>
		Math.round((($total - $fixCostAbsolute) * $monthlySpendingBudgetRelative) / 100)
);
export const dailySpendingBudgetAbsolute = derived(
	[monthlySpendingBudgetAbsolute],
	([$monthlySpendingBudgetAbsolute]) => Math.round($monthlySpendingBudgetAbsolute / DAYS_IN_MONTH)
);

export const expenses = persistedWritable<Array<{ id: string; name: string; amount: number }>>(
	'expenses',
	[]
);
export const totalExpenses = derived(expenses, ($expenses) =>
	$expenses.reduce((acc, expense) => acc + expense.amount, 0)
);
export const expensesOverBudget = derived(
	[total, fixCostAbsolute, monthlySpendingBudgetAbsolute, totalExpenses],
	([$total, $fixCostAbsolute, $monthlySpendingBudgetAbsolute, $totalExpenses]) =>
		$total - $fixCostAbsolute - $monthlySpendingBudgetAbsolute - $totalExpenses
);

export const savingsFundCurrently = persistedWritable('savingsFundCurrently', 0);
export const savingsFundTarget = derived([total], ([$total]) => Math.round($total * 3));
export const savingsFundRelative = persistedWritable('savingsFundRelative', 0);
export const savingsFundAbsolute = derived(
	[total, fixCostAbsolute, monthlySpendingBudgetAbsolute, totalExpenses, savingsFundRelative],
	([$total, $fixCosts, $variableCosts, $totalExpenses, $savingsFundRelative]) => {
		const currentRest = $total - $fixCosts - $variableCosts - $totalExpenses;
		return Math.round((currentRest * $savingsFundRelative) / 100);
	}
);
export const savingsFundWouldHave = derived(
	[savingsFundCurrently, savingsFundAbsolute],
	([$savingsFundCurrently, $savingsFundAbsolute]) => $savingsFundCurrently + $savingsFundAbsolute
);

export const rest = derived(
	[total, fixCostAbsolute, monthlySpendingBudgetAbsolute, totalExpenses, savingsFundAbsolute],
	([$total, $fixCosts, $variableCosts, $totalExpenses, $savingsFundAbsolute]) =>
		$total - $fixCosts - $variableCosts - $totalExpenses - $savingsFundAbsolute
);
