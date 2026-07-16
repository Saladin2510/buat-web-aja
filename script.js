// --- script.js ---

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Logika Slider Gambar Hero ---
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

    // --- 2. Logika Hamburger Menu Mobile ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const spans = hamburgerBtn.querySelectorAll('span');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Fungsi untuk Toggle Menu dan Animasi Ikon X
    function toggleMenu() {
        // Slide menu masuk/keluar
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');
        
        // Animasi Span 1 (Garis atas memutar)
        spans[0].classList.toggle('translate-y-[9px]');
        spans[0].classList.toggle('rotate-45');
        
        // Animasi Span 2 (Garis tengah menghilang)
        spans[1].classList.toggle('opacity-0');
        
        // Animasi Span 3 (Garis bawah memutar berlawanan)
        spans[2].classList.toggle('-translate-y-[9px]');
        spans[2].classList.toggle('-rotate-45');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Menutup menu otomatis jika salah satu link diklik
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });
});