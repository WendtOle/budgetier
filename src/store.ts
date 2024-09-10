import { derived, readable, writable } from 'svelte/store';

export const total = writable(1200);
export const fixCosts = writable(0);
export const variableCosts = writable(0);
export const rest = derived(
	[total, fixCosts, variableCosts],
	([$total, $fixCosts, $variableCosts]) => $total - $fixCosts - $variableCosts
);
