import { derived, writable } from 'svelte/store';

export const total = writable(1200);
export const fixCosts = writable(0);
export const maxFixedCosts = derived(total, ($total) => $total);
export const monthlySpendingBudget = writable(0);
export const maxMonthlySpendingBudget = derived(
	[total, fixCosts],
	([$total, $fixCosts]) => $total - $fixCosts
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

maxMonthlySpendingBudget.subscribe((max) => {
	monthlySpendingBudget.update((currentVariableCosts) =>
		currentVariableCosts > max ? max : currentVariableCosts
	);
});

maxSavings.subscribe((max) => {
	savings.update((currentSavings) => (currentSavings > max ? max : currentSavings));
});
