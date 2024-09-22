<script lang="ts">
	import Slider from './Slider.svelte';
	import { total, fixCostRelative, fixCostAbsolute } from './store';
	import CollapsableContent from './CollapsableContent.svelte';
</script>

<div>
	<CollapsableContent title="Fixed costs">
		<div slot="summary">
			{$fixCostAbsolute}€
		</div>
		<div slot="content">
			<Slider
				value={fixCostRelative}
				label="Fixkosten"
				steps={1}
				max={100}
				displayValue={() => $fixCostAbsolute + '€'}
			/>
			{#if $total !== 0}
				<span>{$fixCostRelative} % of total budget</span>
			{/if}
		</div>
	</CollapsableContent>
</div>
