<script lang="ts">
    type NavItem = { id: string; label: string };

    let { items }: { items: NavItem[] } = $props();

    let current = $state(items[0]?.id ?? "");
    let hovered = $state<string | null>(null);

    let active = $derived(hovered ?? current);

    function navigate(event: MouseEvent, id: string) {
        const section = document.getElementById(id);
        if (!section) return;

        event.preventDefault();
        current = id;
        section.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${id}`);
    }
</script>

<nav class="site-nav">
    <ul>
        {#each items as item (item.id)}
            <li>
                <a
                    href={`#${item.id}`}
                    class:active={active === item.id}
                    onclick={(e) => navigate(e, item.id)}
                    onmouseenter={() => (hovered = item.id)}
                    onmouseleave={() => (hovered = null)}
                    onfocus={() => (hovered = item.id)}
                    onblur={() => (hovered = null)}
                >
                    <span class="indicator" aria-hidden="true"></span>
                    {item.label}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    @import './SiteNav.css';
</style>
