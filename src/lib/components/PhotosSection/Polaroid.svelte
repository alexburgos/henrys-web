<script lang="ts">
    let { src, alt = "" }: { src: string | undefined; alt?: string } = $props();
</script>

<div class="polaroid">
    <div class="polaroid-frame">
        {#if src}
            <img {src} {alt} draggable="false" loading="lazy" />
        {/if}
    </div>
</div>

<style>
    @import './Polaroid.css';
</style>
