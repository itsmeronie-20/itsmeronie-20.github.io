// ===== ALL JAVASCRIPT IS HERE =====

// --- TYPING EFFECT ---
const words = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Open Source Advocate",
    "Problem Solver"
];

let wordIdx = 0,
    charIdx = 0,
    isDeleting = false;

const typedEl = document.getElementById('typed-text');

function typeLoop() {
    const current = words[wordIdx];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000);
        return;
    }

    if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeLoop, 300);
        return;
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(typeLoop, speed);
}

typeLoop();


// --- SCROLL REVEAL (Intersection Observer) ---
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay =
                parseFloat(entry.target.style.transitionDelay) || 0;

            setTimeout(() => {
                entry.target.classList.add('active');
            }, parseFloat(delay) * 1000);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => observer.observe(el));


// --- BACK TO TOP BUTTON ---
const backBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backBtn.classList.add('visible');
    } else {
        backBtn.classList.remove('visible');
    }
});

backBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});