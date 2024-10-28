<script lang="ts">
	import { budget, budgetBlockToEdit } from "./generalStore";

    const onSave = () => {
        if ($budgetBlockToEdit === undefined) {
            return;
        }
        $budget = {
            ...$budget,
            blocks: {
                ...$budget.blocks,
                [$budgetBlockToEdit]: {
                    ...$budget.blocks[$budgetBlockToEdit],
                    title
                }
            }
        };
        title = ""
        $budgetBlockToEdit = undefined;
    }

    let title = "";
    $: placeholder = $budgetBlockToEdit ? $budget.blocks[$budgetBlockToEdit].title : ""

</script>

<div id="edit-title-popover" popover>
    <div class="popover">
        <h3>Edit title</h3>
        <input placeholder={placeholder} bind:value={title}/>
        <button class="border rounded-md px-8 py-2" on:click={onSave} popovertarget="edit-title-popover" popovertargetaction="hide">Save</button>
    </div>
</div>

<style>
    .popover {
        margin: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    input {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 4px 8px;
    }
    [popover] {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }
</style>