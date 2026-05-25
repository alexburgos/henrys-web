<script lang="ts">
    type Lang = "english" | "spanish";

    const PAGE_COUNT = 5;

    let lang: Lang = $state("english");
    let pageIndex = $state(0);
    let isFlipping = $state(false);

    let pdfHref = $derived(`/menu-${lang}.pdf`);
    let currentSrc = $derived(`/menu/${lang}/menu-${pageIndex}.webp`);
    let nextIndex = $derived((pageIndex + 1) % PAGE_COUNT);
    let nextSrc = $derived(`/menu/${lang}/menu-${nextIndex}.webp`);

    let cardInner: HTMLDivElement | undefined = $state();

    function setLang(newLang: Lang): void {
        lang = newLang;
        pageIndex = 0;
        isFlipping = false;
        if (cardInner) {
            cardInner.style.transition = "none";
            cardInner.style.transform = "rotateY(0deg)";
        }
    }

    function flip(): void {
        if (isFlipping || !cardInner) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (prefersReduced) {
            pageIndex = nextIndex;
            return;
        }

        isFlipping = true;
        cardInner.style.transition = "transform 0.55s ease";
        cardInner.style.transform = "rotateY(180deg)";
    }

    function onTransitionEnd(): void {
        if (!isFlipping || !cardInner) return;

        pageIndex = nextIndex;
        cardInner.style.transition = "none";
        cardInner.style.transform = "rotateY(0deg)";
        isFlipping = false;
    }
</script>

<section id="menu" class="menu">
    <div class="menu-inner">
        <div class="menu-left">
            <h2 class="menu-heading">MENU</h2>
            <div class="lang-switcher">
                <button
                    class="lang-btn"
                    style:opacity={lang === "english" ? 1 : 0.4}
                    onclick={() => setLang("english")}
                >
                    English
                </button>
                <span class="lang-sep" aria-hidden="true">|</span>
                <button
                    class="lang-btn"
                    style:opacity={lang === "spanish" ? 1 : 0.4}
                    onclick={() => setLang("spanish")}
                >
                    Spanish
                </button>
            </div>
            <p class="sub">(pdf version available <a class="pdf-link" href={pdfHref} download>here</a>)</p>
        </div>

        <div class="menu-right">
            <div class="flip-card">
                <div
                    class="flip-card-inner"
                    bind:this={cardInner}
                    ontransitionend={onTransitionEnd}
                >
                    <button
                        class="flip-card-front"
                        onclick={flip}
                        aria-label="Open menu"
                        disabled={isFlipping}
                    >
                        <img
                            src={currentSrc}
                            alt="Menu page {pageIndex + 1}"
                            draggable="false"
                        />
                    </button>
                    <div class="flip-card-back" aria-hidden="true">
                        <img src={nextSrc} alt="" draggable="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import "./MenuSection.css";
</style>
