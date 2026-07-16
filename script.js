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


    // --- 3. Logika Smart Sticky Navbar & Color Transition ---
    const mainNavbar = document.getElementById('main-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerSpans = document.querySelectorAll('#hamburger-btn span');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        let currentScrollY = window.scrollY;

        // PERBAIKAN: Lepaskan kunci animasi saat user mulai scroll
        if (mainNavbar.classList.contains('animate-slide-down')) {
            mainNavbar.classList.remove('animate-slide-down');
            mainNavbar.classList.remove('opacity-0'); // Hapus class opacity-0 awal
            mainNavbar.style.animation = 'none';      // Matikan paksa sisa keyframe
        }

        // Fitur 1: Sembunyikan saat scroll ke bawah, Munculkan saat scroll ke atas
        // Batas 80px agar tidak berkedip jika user baru sedikit scroll dari paling atas
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            mainNavbar.classList.add('-translate-y-full'); // Sembunyikan ke atas
        } else {
            mainNavbar.classList.remove('-translate-y-full'); // Munculkan kembali
        }

        // Fitur 2: Ganti warna saat melewati Hero Section
        const heroHeight = window.innerHeight - 100; // Tinggi 1 layar dikurangi toleransi

        if (currentScrollY > heroHeight) {
            // TEMA PINK & GLASS
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
            // TEMA PUTIH & TRANSPARAN
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

        // Update posisi terakhir
        lastScrollY = currentScrollY;
    });
});