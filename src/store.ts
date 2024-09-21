import { derived, writable } from 'svelte/store';

const DAYS_IN_MONTH = 31;

export const total = writable(1200);
export const fixCosts = writable(0);
export const maxFixedCosts = derived(total, ($total) => $total);
export const dailySpendingBudget = writable(0);
export const monthlySpendingBudget = derived(
	[dailySpendingBudget],
	([$dailySpendingBudget]) => $dailySpendingBudget * DAYS_IN_MONTH
);
export const maxDailySpendingBudget = derived([total, fixCosts], ([$total, $fixCosts]) =>
	Math.round(($total - $fixCosts) / DAYS_IN_MONTH)
);
export const savings = writable(0);
export const maxSavings = derived(
	[total, fixCosts, monthlySpendingBudget],
	([$total, $fixCosts, $variableCosts]) => $total - $fixCosts - $variableCosts
);
export const rest = derived(
	[total, fixCosts, monthlySpendingBudget, savings],
	([$total, $fixCosts, $variableCosts, $savings]) => $total - $fixCosts - $variableCosts - $savings
);

maxFixedCosts.subscribe((max) => {
	fixCosts.update((currentFixCosts) => (currentFixCosts > max ? max : currentFixCosts));
});

maxDailySpendingBudget.subscribe((max) => {
	dailySpendingBudget.update((currentDailySpendingBudget) =>
		currentDailySpendingBudget > max ? max : currentDailySpendingBudget
	);
});

maxSavings.subscribe((max) => {
	savings.update((currentSavings) => (currentSavings > max ? max : currentSavings));
});
