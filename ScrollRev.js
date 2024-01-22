ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.heading-txt,   .btn-hero, .about-h1-txt', { origin: 'top' });
ScrollReveal().reveal('.subheading-txt, .hero-img', { origin: 'bottom' });
ScrollReveal().reveal('.first-ctr-img, ', { origin: 'left' });
ScrollReveal().reveal('.second-ctr-img', { origin: 'right' });