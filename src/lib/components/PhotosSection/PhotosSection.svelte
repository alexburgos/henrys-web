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
    let currentIndex = $state(0);

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

    function prev(): void {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    }

    function next(): void {
        currentIndex = (currentIndex + 1) % photos.length;
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

        <div class="photos-carousel">
            <div class="carousel-row">
                <button class="carousel-btn" onclick={prev} aria-label="Previous photo">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <button
                    class="polaroid-wrapper carousel-polaroid"
                    style="--rotate: {rotations[currentIndex]}deg"
                    onclick={() => open(photos[currentIndex])}
                    aria-label="View photo {currentIndex + 1}"
                >
                    <Polaroid
                        src={sectionVisible ? photos[currentIndex].src : undefined}
                        alt={photos[currentIndex].alt}
                    />
                </button>

                <button class="carousel-btn" onclick={next} aria-label="Next photo">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>

            <p class="carousel-counter">{currentIndex + 1} / {photos.length}</p>
        </div>
    </div>
</section>

<Lightbox bind:this={lightboxEl} />

<style>
    @import "./PhotosSection.css";
</style>
