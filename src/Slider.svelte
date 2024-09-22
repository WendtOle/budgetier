<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let value: Writable<number>;
	export let max: number;
	export let label: string;
	export let steps: number = 5;
	export let displayValue: (value: number) => string = (value) => value.toString();
</script>

<div>
	<input type="range" min="0" {max} step={steps} bind:value={$value} disabled={max === 0} />
	<span>{displayValue($value)}</span>
</div>
