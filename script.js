document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    let currentIndex = 0;
    let autoSlideInterval;

    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function showNext() {
        const nextIndex = (currentIndex + 1) % slides.length;
        updateSlider(nextIndex);
    }

    function showPrev() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(prevIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlider(index));
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(showNext, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Hover pause
    const sliderContainer = document.querySelector('.top-slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    updateSlider(0);
    startAutoSlide();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
