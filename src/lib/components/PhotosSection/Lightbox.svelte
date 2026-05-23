<script lang="ts">
    interface SelectedPhoto {
        src: string;
        alt: string;
    }

    let selected: SelectedPhoto | null = $state(null);
    let dialogEl: HTMLDialogElement | undefined = $state();

    export function open(src: string, alt: string): void {
        selected = { src, alt };
        dialogEl?.showModal();
    }

    export function close(): void {
        dialogEl?.close();
        selected = null;
    }

    function onBackdropClick(e: MouseEvent): void {
        if (e.target === dialogEl) close();
    }
</script>

<dialog bind:this={dialogEl} class="lightbox" onclick={onBackdropClick}>
    {#if selected}
        <button class="lightbox-close" onclick={close} aria-label="Close"
            >✕</button
        >
        <img src={selected.src} alt={selected.alt} class="lightbox-img" />
    {/if}
</dialog>

<style>
    @import "./Lightbox.css";
</style>
