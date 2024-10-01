<script lang="ts">
	import CollapsableContent from './CollapsableContent.svelte';
	import Slider from './Slider.svelte';

	export let state: { alreadyPresent: number; willAdd: number };
	export let onStateChange: (newState: { alreadyPresent: number; willAdd: number }) => void;
	export let target: number;
	export let maxAvailable: number;

	$: willState = state.alreadyPresent + state.willAdd;
</script>

<CollapsableContent title="Savings fund">
	<div slot="summary">
		{state.willAdd}€
	</div>
	<div slot="content" class="savings-fund">
		<label for="current">Current savings fund amount:</label>
		<input
			class="bg-white border border-gray-300 rounded-lg p-2"
			type="number"
			id="current"
			value={state.alreadyPresent}
			on:input={(event) =>
				onStateChange({
					...state,
					alreadyPresent: Number((event.target as HTMLInputElement).value)
				})}
		/>
		<Slider
			value={(state.willAdd / maxAvailable) * 100}
			onChange={(newValue) =>
				onStateChange({
					...state,
					willAdd: Math.round((newValue * maxAvailable) / 100)
				})}
			label="Variable costs"
			max={100}
			steps={1}
			displayValue={() => `${state.willAdd} €`}
		/>
		<span>Savings fund would reach {willState}€ - ({Math.round((willState / target) * 100)} %)</span
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
