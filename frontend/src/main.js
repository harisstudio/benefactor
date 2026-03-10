import './style.css'

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Featured Fundraisers Slider Logic
const featuredGrid = document.querySelector('.fundraiser-grid');
const featuredPrev = document.getElementById('featured-prev');
const featuredNext = document.getElementById('featured-next');

if (featuredGrid && featuredPrev && featuredNext) {
    const updateScrollThumb = () => {
        const scrollPercentage = featuredGrid.scrollLeft / (featuredGrid.scrollWidth - featuredGrid.clientWidth);
        const thumbWidthPercentage = (featuredGrid.clientWidth / featuredGrid.scrollWidth) * 100;

        // Update thumb width and position
        const thumb = document.getElementById('scroll-thumb');
        if (thumb) {
            thumb.style.width = `${thumbWidthPercentage}%`;
            // Calculate left position based on available space for the thumb to move
            // available space is 100% - thumb width%
            const maxLeft = 100 - thumbWidthPercentage;
            const leftPos = scrollPercentage * maxLeft;
            thumb.style.left = `${leftPos}%`;
        }
    };

    featuredGrid.addEventListener('scroll', updateScrollThumb);
    window.addEventListener('resize', updateScrollThumb);

    // Initial call
    updateScrollThumb();

    const getScrollAmount = () => {
        const card = featuredGrid.querySelector('.fundraiser-card');
        if (!card) return 0;
        const style = window.getComputedStyle(featuredGrid);
        const gap = parseInt(style.gap) || 0;
        return card.offsetWidth + gap;
    };

    featuredNext.addEventListener('click', () => {
        featuredGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    featuredPrev.addEventListener('click', () => {
        featuredGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
}


// Campaign Gallery Slider Logic
const gallery = document.getElementById('campaign-gallery');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

if (gallery && galleryPrev && galleryNext) {
    const images = gallery.querySelectorAll('.gallery-images img');
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    galleryNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    galleryPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
}

// Topic Pills Click Handler - Show/Hide Topic Cards
const topicPills = document.querySelectorAll('.topic-pill');
const topicCardsGroups = document.querySelectorAll('.topic-cards');

if (topicPills.length > 0 && topicCardsGroups.length > 0) {
    topicPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const targetTopic = pill.getAttribute('data-topic');
            const currentActive = document.querySelector('.topic-cards.active');
            const targetGroup = document.querySelector(`.topic-cards[data-topic="${targetTopic}"]`);

            // Skip if already active
            if (currentActive === targetGroup) return;

            // Update pill states
            topicPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Smooth cross-fade: fade out current, then fade in new
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // Use requestAnimationFrame for smoother timing
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (targetGroup) {
                        targetGroup.classList.add('active');
                    }
                });
            });
        });
    });
}


console.log('Benefactor Platform Loaded');
