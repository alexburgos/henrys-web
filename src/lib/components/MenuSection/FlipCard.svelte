<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        flipped = false,
        front,
        back,
    }: {
        flipped?: boolean;
        front: Snippet;
        back: Snippet;
    } = $props();
</script>

<div class="flip-card" class:flipped>
    <div class="flip-card-inner">
        <div class="flip-card-face flip-card-front">
            {@render front()}
        </div>
        <div class="flip-card-face flip-card-back">
            {@render back()}
        </div>
    </div>
</div>

<style>
    @import './FlipCard.css';
</style>
