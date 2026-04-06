import './style.css'
import { initNavbar } from './nav.js'

document.body.classList.add('ready');
initNavbar();

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

    const getCardWidth = () => {
        const card = donateFundraiserGrid.querySelector('.fundraiser-card, [class*="card"]');
        if (!card) return 340;
        const gap = parseInt(getComputedStyle(donateFundraiserGrid).gap) || 0;
        return card.offsetWidth + gap;
    };

    donateFeaturedNext.addEventListener('click', () => {
        const maxScroll = donateFundraiserGrid.scrollWidth - donateFundraiserGrid.parentElement.clientWidth;
        scrollPosition = Math.min(scrollPosition + getCardWidth(), maxScroll);
        donateFundraiserGrid.style.transform = `translateX(-${scrollPosition}px)`;
    });

    donateFeaturedPrev.addEventListener('click', () => {
        scrollPosition = Math.max(scrollPosition - getCardWidth(), 0);
        donateFundraiserGrid.style.transform = `translateX(-${scrollPosition}px)`;
    });

    // Reset position on resize to prevent stale transform
    window.addEventListener('resize', () => {
        scrollPosition = 0;
        donateFundraiserGrid.style.transform = 'translateX(0)';
    });
}

console.log('Benefactor Donation Page Loaded');
