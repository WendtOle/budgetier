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
export const rest = derived(
	[total, fixCostAbsolute, monthlySpendingBudgetAbsolute],
	([$total, $fixCosts, $variableCosts]) => $total - $fixCosts - $variableCosts
);
