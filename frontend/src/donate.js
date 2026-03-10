import './style.css'

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Detail Gallery Slider Logic
const detailGallery = document.getElementById('detail-gallery');
const detailGalleryPrev = document.getElementById('detail-gallery-prev');
const detailGalleryNext = document.getElementById('detail-gallery-next');

if (detailGallery && detailGalleryPrev && detailGalleryNext) {
    const images = detailGallery.querySelectorAll('.gallery-images img');
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    detailGalleryNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    detailGalleryPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
}

// Featured Fundraisers Slider Logic
const donateFundraiserGrid = document.getElementById('donate-fundraiser-grid');
const donateFeaturedPrev = document.getElementById('donate-featured-prev');
const donateFeaturedNext = document.getElementById('donate-featured-next');

if (donateFundraiserGrid && donateFeaturedPrev && donateFeaturedNext) {
    let scrollPosition = 0;
    const cardWidth = 340; // Card width + gap

    donateFeaturedNext.addEventListener('click', () => {
        const maxScroll = donateFundraiserGrid.scrollWidth - donateFundraiserGrid.parentElement.clientWidth;
        scrollPosition = Math.min(scrollPosition + cardWidth, maxScroll);
        donateFundraiserGrid.style.transform = `translateX(-${scrollPosition}px)`;
    });

    donateFeaturedPrev.addEventListener('click', () => {
        scrollPosition = Math.max(scrollPosition - cardWidth, 0);
        donateFundraiserGrid.style.transform = `translateX(-${scrollPosition}px)`;
    });
}

console.log('Benefactor Donation Page Loaded');
