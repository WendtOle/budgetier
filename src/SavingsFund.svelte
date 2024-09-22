<script lang="ts">
	import CollapsableContent from './CollapsableContent.svelte';
	import Slider from './Slider.svelte';
	import {
		total,
		fixCostRelative,
		savingsFundRelative,
		savingsFundAbsolute,
		savingsFundCurrently,
		savingsFundWouldHave,
		savingsFundTarget
	} from './store';
</script>

<CollapsableContent title="Savings fund">
	<div slot="summary">
		{$savingsFundAbsolute}€
	</div>
	<div slot="content" class="savings-fund">
		<label for="current">Current savings fund amount:</label>
		<input
			class="bg-white border border-gray-300 rounded-lg p-2"
			type="number"
			id="current"
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
				{Math.round(($savingsFundAbsolute / $total) * 100)} % of total budget
			</div>
		{/if}
		<span
			>Savings fund would reach {$savingsFundWouldHave}€ - ({Math.round(
				($savingsFundWouldHave / $savingsFundTarget) * 100
			)} %)</span
		>
	</div>
</CollapsableContent>

<style>
	.savings-fund {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
