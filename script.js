document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        if (!slides.length) return;

        const slide = slides[0];
        const gap = 20;
        const slideWidth = slide.offsetWidth;

        carouselContainer.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalSlides - 1;
            }
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });
    }

    // Add event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    window.addEventListener('resize', updateCarousel);

    setTimeout(updateCarousel, 100);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-carousel .product-card');

    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        const productCarousel = document.querySelector('.product-carousel');
        if (productCarousel) {
            productCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }

    if (filterBtns && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProducts(btn.textContent.trim());
            });
        });

        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) filterProducts(activeBtn.textContent.trim());
    }

    const productCarousel = document.querySelector('.product-carousel');
    const leftArrow = document.querySelector('.bs-arrows .arrow-btn:first-child');
    const rightArrow = document.querySelector('.bs-arrows .arrow-btn:last-child');

    if (productCarousel && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            productCarousel.scrollBy({ left: -344, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            productCarousel.scrollBy({ left: 344, behavior: 'smooth' });
        });
    }

    const swatches = document.querySelectorAll('.swatch-img');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function () {
            const parentSwatches = this.closest('.color-swatches');
            parentSwatches.querySelectorAll('.swatch-img').forEach(s => s.classList.remove('active'));
            this.classList.add('active');

            const colorName = this.getAttribute('data-color');
            const labelSpan = this.closest('.colors').querySelector('.selected-color-name');
            if (labelSpan) labelSpan.textContent = colorName;

            const newImgSrc = this.getAttribute('data-img');
            const productCard = this.closest('.product-card');
            const mainImg = productCard.querySelector('.main-product-img');
            if (mainImg) mainImg.src = newImgSrc;
        });

        swatch.addEventListener('mouseenter', function () {
            const newImgSrc = this.getAttribute('data-img');
            const productCard = this.closest('.product-card');
            const mainImg = productCard.querySelector('.main-product-img');
            if (mainImg) {
                mainImg.src = newImgSrc;
            }
        });

        swatch.addEventListener('mouseleave', function () {
            const parentSwatches = this.closest('.color-swatches');
            const activeSwatch = parentSwatches.querySelector('.swatch-img.active');
            const productCard = this.closest('.product-card');
            const mainImg = productCard.querySelector('.main-product-img');
            if (mainImg && activeSwatch) {
                mainImg.src = activeSwatch.getAttribute('data-img');
            }
        });
    });

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const navLinks = document.querySelector('.nav-links');
    const sidebarOverlay = document.querySelector('.mobile-sidebar-overlay');

    function toggleMobileNav() {
        if (navLinks && sidebarOverlay && mobileMenuBtn) {
            navLinks.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileNav);
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', toggleMobileNav);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleMobileNav);
    }
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('filled');
    });
});
