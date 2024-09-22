<script lang="ts">
	import {
		total,
		fixCostAbsolute,
		fixedCostsNeed,
		fixedCostLeftOver,
		fixCostRelative
	} from './store';
	import CollapsableContent from './CollapsableContent.svelte';
</script>

<div>
	<CollapsableContent title="Fixed costs">
		<div slot="summary">
			{$fixCostAbsolute}€
		</div>
		<div slot="content" class="content">
			<div>
				<label for="total">Total need</label>
				<input
					id="total"
					bind:value={$fixedCostsNeed}
					type="number"
					class="bg-white border border-gray-300 rounded-lg p-2"
				/>
			</div>
			<div>
				<label for="left-over">Left over</label>
				<input
					id="left-over"
					bind:value={$fixedCostLeftOver}
					type="number"
					class="bg-white border border-gray-300 rounded-lg p-2"
				/>
			</div>
			<span>{$fixCostAbsolute}€ - {$fixCostRelative} % of total budget</span>
		</div>
	</CollapsableContent>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
