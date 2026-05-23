<script lang="ts">
    import { persistTheme, type Theme } from "$lib/theme";

    function toggle() {
        const isDark = document.documentElement.dataset.theme === "dark";
        const next: Theme = isDark ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        persistTheme(next);
    }
</script>

<button class="illustration" type="button" aria-label="Toggle theme" onclick={toggle}>
    <div class="room"></div>
</button>

<style>
    @import './ThemeToggle.css';
</style>
