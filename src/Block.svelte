<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { derived, writable } from 'svelte/store';
	import Card from './Card.svelte';
	import { budget } from './generalStore';

	export let id: string;
	export let forceExpanded: Readable<boolean> = writable(false);

	const collapsed = writable(true);

	const isCollapsed = derived(
		[collapsed, forceExpanded],
		([$collapsed, $forceExpanded]) => $collapsed && !$forceExpanded
	);

	const handleToggle = () => ($collapsed = !$collapsed);
	const handleClickOnHeader = () => {
		if (!$isCollapsed) return;
		handleToggle();
	};

	$: title = $budget.blocks[id].title
</script>

<Card>
	{#if $isCollapsed}
		<button class="header" on:click={handleClickOnHeader}>
			<div class="flex gap-2">
				{title}
				- <slot name="summary" />
			</div>

			<div class="border rounded-md px-2">expand</div>
		</button>
	{:else}
		<div class="header mb-2 pb-3 border-b-2">
			<span>{title}</span>
			{#if !$forceExpanded}
				<button class="border rounded-md px-2" on:click={handleToggle}>collapse</button>
			{/if}
		</div>
		<slot name="content" />
	{/if}
</Card>

<style>
	.header {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>
