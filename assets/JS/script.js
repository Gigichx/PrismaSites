new Glide('.glide', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    gap: 30,
    peek: { before: 80, after: 80 },
    breakpoints: {
        1024: { perView: 2, peek: { before: 50, after: 50 } },
        600: { perView: 1, peek: { before: 40, after: 40 }, gap: 20 }
    }
}).mount();

/* ── CAROUSEL ── */
let current = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let timer = setInterval(nextSlide, 4500);

function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    clearInterval(timer);
    timer = setInterval(nextSlide, 4500);
}
function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

/* ── CATEGORIE PORTFOLIO ── */
function showCat(cat, btn) {
    // Pulsanti
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Panel con dissolvenza
    const panels = document.querySelectorAll('.gallery-panel');
    panels.forEach(p => {
        p.style.opacity = '0';
        p.style.transition = 'opacity .3s';
    });
    setTimeout(() => {
        panels.forEach(p => p.classList.remove('active'));
        const target = document.getElementById('panel-' + cat);
        if (target) {
            target.classList.add('active');
            requestAnimationFrame(() => {
                target.style.opacity = '1';
            });
        }
    }, 200);
}

/* ── LIGHTBOX ── */
function openLightbox(caption, colorClass) {
    const lb = document.getElementById('lightbox');
    const lbPh = document.getElementById('lbPh');
    const lbCap = document.getElementById('lbCaption');
    // Rimuovi classi precedenti
    lbPh.className = 'lightbox-ph ' + colorClass;
    lbPh.textContent = caption;
    lbCap.textContent = caption + ' — Prisma Foto';
    lb.style.display = 'flex';
    requestAnimationFrame(() => lb.classList.add('visible'));
    // Blocca il tasto destro / salva immagine
    lbPh.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', onLbKey);
}
function closeLightbox(e) {
    if (e && e.target !== document.getElementById('lightbox') && !e.target.classList.contains('lb-close')) return;
    const lb = document.getElementById('lightbox');
    lb.classList.remove('visible');
    setTimeout(() => lb.style.display = 'none', 350);
    document.removeEventListener('keydown', onLbKey);
}
function onLbKey(e) { if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') }); }

/* Blocca download su tutta la galleria */
document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('.gal-item') || e.target.closest('.lightbox')) {
        e.preventDefault();
    }
});
document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
});

/* ── FADE-IN ON SCROLL ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('visible');
            observer.unobserve(el.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.background = 'rgba(12, 8, 8, 0.96)';
    } else {
        navbar.style.background = 'rgba(15, 10, 10, 0.52)';
    }
});