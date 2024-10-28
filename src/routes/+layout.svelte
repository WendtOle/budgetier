<script>
	import '../app.css';
	import EditTitlePopover from '../EditTitlePopover.svelte';
</script>

<div class="main">
	<slot />
</div>
<EditTitlePopover />

<style>
	.main {
		display: flex;
		justify-content: center;
	}
</style>
