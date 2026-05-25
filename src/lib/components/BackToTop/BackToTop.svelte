<script lang="ts">
    let visible = $state(false);

    $effect(() => {
        function onScroll(): void {
            visible = window.scrollY > window.innerHeight * 0.8;
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    function scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
</script>

<button
    class="back-to-top"
    class:visible
    onclick={scrollToTop}
    aria-label="Back to top"
>
    <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <circle cx="22" cy="22" r="21" stroke="currentColor" stroke-width="2" />
        <path
            d="M22 30V14M14 22l8-8 8 8"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</button>

<style>
    @import "./BackToTop.css";
</style>
