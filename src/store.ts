import { derived } from 'svelte/store';
import { persistedWritable } from './persistedWritable';

const DAYS_IN_MONTH = 31;

export const total = persistedWritable('total', 1200);
export const fixCosts = persistedWritable('fixCosts', 0);
export const maxFixedCosts = derived(total, ($total) => $total);
export const dailySpendingBudget = persistedWritable('dailySpendingBudget', 0);
export const monthlySpendingBudget = derived(
	[dailySpendingBudget],
	([$dailySpendingBudget]) => $dailySpendingBudget * DAYS_IN_MONTH
);
export const maxDailySpendingBudget = derived([total, fixCosts], ([$total, $fixCosts]) =>
	Math.round(($total - $fixCosts) / DAYS_IN_MONTH)
);
export const rest = derived(
	[total, fixCosts, monthlySpendingBudget],
	([$total, $fixCosts, $variableCosts]) => $total - $fixCosts - $variableCosts
);

maxFixedCosts.subscribe((max) => {
	fixCosts.update((currentFixCosts) => (currentFixCosts > max ? max : currentFixCosts));
});

maxDailySpendingBudget.subscribe((max) => {
	dailySpendingBudget.update((currentDailySpendingBudget) =>
		currentDailySpendingBudget > max ? max : currentDailySpendingBudget
	);
});
