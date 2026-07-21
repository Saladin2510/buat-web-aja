document.addEventListener("DOMContentLoaded", () => {
    const images = [
        document.getElementById('hero-img-1'),
        document.getElementById('hero-img-2'),
        document.getElementById('hero-img-3')
    ];
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].classList.remove('opacity-100');
        images[currentIndex].classList.add('opacity-0');

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].classList.remove('opacity-0');
        images[currentIndex].classList.add('opacity-100');
    }, 4000);

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const spans = hamburgerBtn.querySelectorAll('span');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');

        spans[0].classList.toggle('translate-y-[9px]');
        spans[0].classList.toggle('rotate-45');

        spans[1].classList.toggle('opacity-0');

        spans[2].classList.toggle('-translate-y-[9px]');
        spans[2].classList.toggle('-rotate-45');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });

    const mainNavbar = document.getElementById('main-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerSpans = document.querySelectorAll('#hamburger-btn span');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        let currentScrollY = window.scrollY;

        if (mainNavbar.classList.contains('animate-slide-down')) {
            mainNavbar.classList.remove('animate-slide-down');
            mainNavbar.classList.remove('opacity-0');
            mainNavbar.style.animation = 'none';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            mainNavbar.classList.add('-translate-y-full');
        } else {
            mainNavbar.classList.remove('-translate-y-full');
        }

        const heroHeight = window.innerHeight - 100;

        if (currentScrollY > heroHeight) {
            mainNavbar.classList.remove('text-brand-white', 'bg-transparent', 'border-transparent');
            mainNavbar.classList.add('text-brand-pink', 'bg-brand-white/80', 'backdrop-blur-md', 'border-brand-pink/10', 'shadow-sm');

            navLinks.forEach(link => {
                link.classList.remove('hover:border-brand-white', 'hover:bg-white/20');
                link.classList.add('hover:border-brand-pink', 'hover:bg-brand-pink/10');
            });

            hamburgerSpans.forEach(span => {
                span.classList.remove('bg-brand-white');
                span.classList.add('bg-brand-pink');
            });
        } else {
            mainNavbar.classList.add('text-brand-white', 'bg-transparent', 'border-transparent');
            mainNavbar.classList.remove('text-brand-pink', 'bg-brand-white/80', 'backdrop-blur-md', 'border-brand-pink/10', 'shadow-sm');

            navLinks.forEach(link => {
                link.classList.add('hover:border-brand-white', 'hover:bg-white/20');
                link.classList.remove('hover:border-brand-pink', 'hover:bg-brand-pink/10');
            });

            hamburgerSpans.forEach(span => {
                span.classList.add('bg-brand-white');
                span.classList.remove('bg-brand-pink');
            });
        }

        lastScrollY = currentScrollY;
    });

    const aboutImages = [
        document.getElementById('about-img-1'),
        document.getElementById('about-img-2'),
        document.getElementById('about-img-3'),
        document.getElementById('about-img-4')
    ];
    let currentAboutIndex = 0;

    setInterval(() => {
        aboutImages[currentAboutIndex].classList.remove('opacity-100');
        aboutImages[currentAboutIndex].classList.add('opacity-0');

        currentAboutIndex = (currentAboutIndex + 1) % aboutImages.length;

        aboutImages[currentAboutIndex].classList.remove('opacity-0');
        aboutImages[currentAboutIndex].classList.add('opacity-100');
    }, 2000);
});

const revealOptions = { threshold: 0.2 };
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal-lock').forEach(item => {
    revealObserver.observe(item);
});

const scrollSvgs = document.querySelectorAll('.scroll-svg');
const isiSection = document.getElementById('isi');
const uiDots = [
    { el: document.getElementById('ui-dot-1'), triggerPos: 0.25 },
    { el: document.getElementById('ui-dot-2'), triggerPos: 0.60 },
    { el: document.getElementById('ui-dot-3'), triggerPos: 0.90 }
];

window.addEventListener('scroll', () => {
    if (!isiSection) return;

    const rect = isiSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startDraw = windowHeight * 0.75;
    const scrollDistance = rect.height * 0.85;

    let scrollPercent = (startDraw - rect.top) / scrollDistance;
    scrollPercent = Math.max(0, Math.min(1, scrollPercent));

    const clipPercent = 100 - (scrollPercent * 100);
    scrollSvgs.forEach(svg => {
        svg.style.clipPath = `inset(0 0 ${clipPercent}% 0)`;
        svg.style.webkitClipPath = `inset(0 0 ${clipPercent}% 0)`;
    });

    uiDots.forEach(dot => {
        if (scrollPercent >= dot.triggerPos) {
            dot.el.classList.remove('scale-0');
            dot.el.classList.add('scale-100');
        } else {
            dot.el.classList.add('scale-0');
            dot.el.classList.remove('scale-100');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slideTexts = document.querySelectorAll('.slide-text');
    const slideImgs = document.querySelectorAll('.slide-img');
    const btnNext = document.getElementById('slider-next');
    const btnPrev = document.getElementById('slider-prev');

    if (slideTexts.length === 0 || slideImgs.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slideTexts.length;

    function goToSlide(index, direction) {
        slideTexts[currentIndex].classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
        slideTexts[currentIndex].classList.add('opacity-0', 'pointer-events-none');
        slideTexts[currentIndex].classList.add(direction === 'next' ? '-translate-x-8' : 'translate-x-8');

        slideImgs[currentIndex].classList.remove('opacity-100', 'scale-100');
        slideImgs[currentIndex].classList.add('opacity-0', 'scale-105');

        slideTexts[index].classList.remove('-translate-x-8', 'translate-x-8');

        slideTexts[index].classList.remove('opacity-0', 'pointer-events-none');
        slideTexts[index].classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');

        slideImgs[index].classList.remove('opacity-0', 'scale-105');
        slideImgs[index].classList.add('opacity-100', 'scale-100');

        currentIndex = index;
    }

    btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        let nextIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        goToSlide(nextIndex, 'next');
    });

    btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        let prevIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        goToSlide(prevIndex, 'prev');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', '-translate-x-12', 'translate-x-12', 'translate-y-12', 'scale-x-0');
                entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0', 'scale-x-100');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
});