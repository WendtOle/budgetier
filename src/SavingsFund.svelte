<script lang="ts">
	import Block from './Block.svelte';
	import { budgetBlockToEdit } from './generalStore';
	import Slider from './Slider.svelte';

	export let state: { alreadyPresent: number; willAdd: number };
	export let onStateChange: (newState: { alreadyPresent: number; willAdd: number }) => void;
	export let target: number;
	export let maxAvailable: number;
	export let handleDelete: () => void;
	export let handleMoveUp: (() => void) | undefined;
	export let id: string;

	$: actuallyMaxAvailable = maxAvailable > 0 ? maxAvailable : target - state.alreadyPresent;
	
	$: willState = state.alreadyPresent + state.willAdd;
</script>

<Block id={id}>
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
			value={(state.willAdd / actuallyMaxAvailable) * 100}
			onChange={(newValue) =>
				onStateChange({
					...state,
					willAdd: Math.round((newValue * actuallyMaxAvailable) / 100)
				})}
			label="Variable costs"
			max={100}
			steps={1}
			displayValue={() => `${state.willAdd} €`}
		/>
		<span>Savings fund would reach {willState}€ - ({Math.round((willState / target) * 100)} %)</span>
		<div class="flex w-full justify-between">
			<button class="border rounded-md px-4 py-2" popovertarget="edit-title-popover" on:click={() => $budgetBlockToEdit = id}>Edit block name</button>
			<button class="border rounded-md px-4 py-2" on:click={handleDelete}>Delete block</button>
			{#if handleMoveUp !== undefined}
				<button class="border rounded-md px-4 py-2" on:click={handleMoveUp}>Move block up</button>
			{/if}
		</div>
	</div>
</Block>

<style>
	.savings-fund {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
