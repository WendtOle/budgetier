<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let value: Writable<number>;
	export let max: number;
	export let label: string;
</script>

<div>
	<label for="total">{label}:</label>
	<input type="range" min="0" {max} step="1" bind:value={$value} disabled={max === 0} />
	<span>{$value} €</span>
</div>
