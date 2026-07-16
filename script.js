// --- script.js ---

document.addEventListener("DOMContentLoaded", () => {
    // Mengambil elemen gambar berdasarkan ID
    const images = [
        document.getElementById('hero-img-1'),
        document.getElementById('hero-img-2'),
        document.getElementById('hero-img-3')
    ];
    
    let currentIndex = 0;

    // Fungsi interval untuk mengganti gambar setiap 4 detik
    setInterval(() => {
        // Hilangkan opacity dari gambar saat ini
        images[currentIndex].classList.remove('opacity-100');
        images[currentIndex].classList.add('opacity-0');
        
        // Pindah ke indeks gambar selanjutnya
        currentIndex = (currentIndex + 1) % images.length;
        
        // Munculkan gambar selanjutnya
        images[currentIndex].classList.remove('opacity-0');
        images[currentIndex].classList.add('opacity-100');
    }, 4000); 
});