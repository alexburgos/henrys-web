<script lang="ts">
    import { fly } from "svelte/transition";
    import { cubicOut, cubicIn } from "svelte/easing";

    let visible = $state(false);
    let sectionEl: HTMLElement | undefined = $state();

    $effect(() => {
        if (!sectionEl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                visible = entries[0].isIntersecting;
            },
            { threshold: 0.15 },
        );

        observer.observe(sectionEl);
        return () => observer.disconnect();
    });
</script>

<section id="contact" class="contact" bind:this={sectionEl}>
    <div class="contact-content">
        <p class="headline">Call us for a good time!</p>
        <p class="sub">(or just to reserve a table)</p>
        <p class="phone"><a href="tel:+34933007695">+34 93 30 07 695</a></p>
        <a
            href="https://www.instagram.com/henrys.cocktailbar/"
            target="_blank"
            rel="noopener noreferrer"
            class="ig-link"
            aria-label="Instagram"
        >
            <span class="ig-icon" aria-hidden="true"></span>
        </a>
    </div>

    {#if visible}
        <div
            class="henry"
            aria-hidden="true"
            in:fly={{ y: 140, duration: 900, easing: cubicOut }}
            out:fly={{ y: 140, duration: 500, easing: cubicIn }}
        ></div>
    {/if}
</section>

<style>
    @import './ContactSection.css';
</style>
