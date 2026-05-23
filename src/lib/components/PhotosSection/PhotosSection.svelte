<script lang="ts">
    import Polaroid from "./Polaroid.svelte";
    import Lightbox from "./Lightbox.svelte";

    interface Photo {
        src: string;
        alt: string;
    }

    interface LightboxInstance {
        open: (src: string, alt: string) => void;
    }

    const photos: Photo[] = [0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({
        src: `/photos/${n}.webp`,
        alt: `Henry's Cocktail Bar — photo ${n + 1}`,
    }));

    const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];

    let lightboxEl: LightboxInstance | undefined = $state();
    let sectionEl: HTMLElement | undefined = $state();
    let sectionVisible = $state(false);

    $effect(() => {
        if (!sectionEl) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    sectionVisible = true;
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );
        observer.observe(sectionEl);
        return () => observer.disconnect();
    });

    function open(photo: Photo): void {
        lightboxEl?.open(photo.src, photo.alt);
    }
</script>

<section id="photos" class="photos" bind:this={sectionEl}>
    <div class="photos-bg">
        <div class="photos-grid">
            {#each photos as photo, i}
                <button
                    class="polaroid-wrapper"
                    style="--rotate: {rotations[i]}deg"
                    onclick={() => open(photo)}
                    aria-label="View photo {i + 1}"
                >
                    <Polaroid src={sectionVisible ? photo.src : undefined} alt={photo.alt} />
                </button>
            {/each}
        </div>
    </div>
</section>

<Lightbox bind:this={lightboxEl} />

<style>
    @import "./PhotosSection.css";
</style>
