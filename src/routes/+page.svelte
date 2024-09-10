<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';
	import { total, fixCosts, variableCosts, rest } from '../store';

	const onUpdateFixCosts = (value: any) => {
		const rest = $total - value.target.value;
		if (rest < $variableCosts) {
			$variableCosts = rest;
		}
	};
</script>

<svelte:head>
	<title>Budgetier</title>
	<meta name="description" content="Simple budgetier app - Budgetier" />
</svelte:head>

<h1>Budgetier</h1>
<div class="col">
	<div class="row">
		<label for="total">Total:</label>
		<input id="total" type="number" bind:value={$total} />
	</div>
	<div class="row">
		<label for="total">Fixkosten:</label>
		<input
			type="range"
			min="0"
			max={$total}
			step="1"
			bind:value={$fixCosts}
			on:change={onUpdateFixCosts}
		/>
		{#if $total !== 0}
			<span>{$fixCosts} € - {(($fixCosts / $total) * 100).toPrecision(3)} % of total budget</span>
		{/if}
	</div>
	<div class="row">
		<label for="total">Variable costs:</label>
		<input type="range" min="0" max={$total - $fixCosts} step="1" bind:value={$variableCosts} />
		{#if $total !== 0}
			<span
				>{$variableCosts} € - {(($variableCosts / $total) * 100).toPrecision(3)} % of total budget</span
			>
		{/if}
	</div>
	<div>
		<span>Rest which is not assigned yet: {$rest} €</span>
	</div>
</div>
