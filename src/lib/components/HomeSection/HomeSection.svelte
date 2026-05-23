<script lang="ts">
    import ThemeToggle from "$lib/components/ThemeToggle/ThemeToggle.svelte";
    import SiteNav from "$lib/components/SiteNav/SiteNav.svelte";

    const navItems = [
        { id: "menu", label: "MENU" },
        { id: "photos", label: "PHOTOS" },
        { id: "contact", label: "CONTACT" },
    ];
</script>

<main class="home">
    <section class="content">
        <div class="logo" role="img" aria-label="Henry's Cocktail Bar"></div>
        <SiteNav items={navItems} />
    </section>

    <ThemeToggle />
</main>

<style>
    @import './HomeSection.css';
</style>
