// Initialize Lucide Icons
lucide.createIcons();

// Scroll Animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // Form submission handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = bookingForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Collect form data and encode it properly for Google Apps Script
            const formData = new FormData(bookingForm);
            const data = new URLSearchParams(formData);

            // URL for your Google Apps Script Web App
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVj_aorbEI6A0vGG-KaG6MN7iFrXZEruKM5aCuQzh0MOxGAzGyyYEv-Ne7NbIDs7WY0w/exec";


            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: data
            })
                .then(response => {
                    submitBtn.textContent = 'Booking Request Sent!';
                    submitBtn.style.background = '#16a34a'; // Success green
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        bookingForm.reset();
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    submitBtn.textContent = 'Error sending request';
                    submitBtn.style.background = '#dc2626'; // Error red
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // offset for the fixed navbar
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Handle "Book Now" in Navbar
    const navBookBtn = document.querySelector('.nav-book-btn');
    if (navBookBtn) {
        navBookBtn.addEventListener('click', () => {
            const target = document.querySelector('#booking');
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }
});
