<script lang="ts">
	import Slider from './Slider.svelte';
	import {
		total,
		fixCostRelative,
		monthlySpendingBudgetRelative,
		savingsFundRelative,
		savingsFundAbsolute,
		savingsFundCurrently,
		savingsFundWouldHave,
		savingsFundTarget
	} from './store';
</script>

<div class="savings-fund">
	<span>Savingsfund</span>
	<input
		class="bg-white border border-gray-300 rounded-lg p-2"
		type="number"
		bind:value={$savingsFundCurrently}
	/>
	<Slider
		value={savingsFundRelative}
		label="Variable costs"
		max={100}
		steps={1}
		displayValue={() => `${$savingsFundAbsolute}€`}
	/>
	{#if $total !== 0}
		<div>
			{($monthlySpendingBudgetRelative * (100 - $fixCostRelative)) / 100} % of total budget
		</div>
	{/if}
	<span
		>Savings fund would reach {$savingsFundWouldHave}€ - ({Math.round(
			($savingsFundWouldHave / $savingsFundTarget) * 100
		)} %)</span
	>
</div>

<style>
	.savings-fund {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
