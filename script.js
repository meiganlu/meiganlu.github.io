const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Videos ---------- */
document.querySelectorAll('.media').forEach((media) => {
    const video = media.querySelector('video');
    const button = media.querySelector('.pause-btn');
    if (!video || !button) return;

    // True once the visitor presses pause; we never auto-resume after that
    let pausedByUser = false;

    function showAsPaused(isPaused) {
        button.classList.toggle('is-paused', isPaused);
        button.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
    }

    function tryPlay() {
        // play() can be blocked (e.g. iPhone Low Power Mode). If so, the poster stays visible.
        const attempt = video.play();
        if (attempt) {
            attempt.then(() => showAsPaused(false)).catch(() => showAsPaused(true));
        }
    }

    // If the video file is missing, keep the poster image and hide the button
    const source = video.querySelector('source');
    function handleMissingVideo() {
        button.hidden = true;
    }
    if (source) source.addEventListener('error', handleMissingVideo);
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) handleMissingVideo();

    // Reduce motion: start paused on the poster
    if (prefersReducedMotion) {
        video.removeAttribute('autoplay');
        video.pause();
        pausedByUser = true;
        showAsPaused(true);
    }

    button.addEventListener('click', () => {
        if (video.paused) {
            pausedByUser = false;
            tryPlay();
        } else {
            pausedByUser = true;
            video.pause();
            showAsPaused(true);
        }
    });

    // Play when at least 25% of the video is on screen, pause when it scrolls away
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!pausedByUser) tryPlay();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(video);
});

/* ---------- Fade-in on scroll ---------- */
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target); // only animate once
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach((el) => revealObserver.observe(el));
}

/* ---------- Footer year ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();