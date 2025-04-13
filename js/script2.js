document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    const hidePreloader = () => {
        preloader.classList.add('hidden');
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 3000);

    // Product Grid Scroll and Arrows
    const productGrid = document.querySelector('.products-grid');
    const productLeftArrow = document.querySelector('.products-grid-wrapper .scroll-arrow.left');
    const productRightArrow = document.querySelector('.products-grid-wrapper .scroll-arrow.right');
    const productItems = document.querySelectorAll('.product-item');
    const productItemWidth = 320;

    if (productItems.length <= 3) {
        productLeftArrow.style.display = 'none';
        productRightArrow.style.display = 'none';
    } else {
        productLeftArrow.classList.add('visible');
        productRightArrow.classList.add('visible');
    }

    if (productItems.length === 2) {
        productGrid.classList.add('two-items');
    }

    productLeftArrow.addEventListener('click', () => {
        productGrid.scrollBy({ left: -productItemWidth, behavior: 'smooth' });
    });

    productRightArrow.addEventListener('click', () => {
        productGrid.scrollBy({ left: productItemWidth, behavior: 'smooth' });
    });

    // Client Grid Scroll and Arrows
    const clientGrid = document.querySelector('.clients-grid');
    const clientLeftArrow = document.querySelector('.clients-grid-wrapper .scroll-arrow.left');
    const clientRightArrow = document.querySelector('.clients-grid-wrapper .scroll-arrow.right');
    const clientItems = document.querySelectorAll('.client-item');
    const clientItemWidth = 320;

    if (clientItems.length <= 3) {
        clientLeftArrow.style.display = 'none';
        clientRightArrow.style.display = 'none';
    } else {
        clientLeftArrow.classList.add('visible');
        clientRightArrow.classList.add('visible');
    }

    if (clientItems.length === 2) {
        clientGrid.classList.add('two-items');
    }

    clientLeftArrow.addEventListener('click', () => {
        clientGrid.scrollBy({ left: -clientItemWidth, behavior: 'smooth' });
    });

    clientRightArrow.addEventListener('click', () => {
        clientGrid.scrollBy({ left: clientItemWidth, behavior: 'smooth' });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const logoImg = document.querySelector('.logo-img');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLightTheme = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        logoImg.src = isLightTheme ? 'images/logo.ico' : 'images/logo.png';
        const placeholders = document.querySelectorAll('.product-item img, .client-item img');
        placeholders.forEach(img => {
            if (isLightTheme) {
                img.src = img.src.replace('2a2a2a/2a2a2a', 'd0d0d0/d0d0d0');
            } else {
                img.src = img.src.replace('d0d0d0/d0d0d0', '2a2a2a/2a2a2a');
            }
        });
    });// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    { threshold: 0.7 } // Update nav links when 70% of the section is visible
);

sections.forEach((section) => navObserver.observe(section));

    // Fade-in and Fade-out on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));

    setTimeout(() => {
        fadeElements.forEach((el) => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 10000);

    // Side Decor Animation
    const sideDecors = document.querySelectorAll('.side-decor');
    const decorObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    sideDecors.forEach((el) => decorObserver.observe(el));

    // Stats Counter with Slot Machine Effect and Comma Formatting
    const statItems = document.querySelectorAll('.impact-item h3');
    const countObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalCount = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000;
                    const steps = 50;
                    const baseIncrement = finalCount / steps;
                    let currentStep = 0;

                    const formatNumber = (num) => {
                        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    };

                    const updateCount = () => {
                        if (currentStep >= steps) {
                            target.textContent = `${formatNumber(finalCount)}${finalCount === 100 ? '%' : '+'}`;
                            return;
                        }
                        const randomFactor = 0.8 + Math.random() * 0.4;
                        count += baseIncrement * randomFactor;
                        if (count >= finalCount) {
                            count = finalCount;
                        }
                        target.textContent = `${formatNumber(Math.floor(count))}${finalCount === 100 ? '%' : '+'}`;
                        currentStep++;
                        setTimeout(updateCount, duration / steps);
                    };
                    updateCount();
                    countObserver.unobserve(target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statItems.forEach((el) => countObserver.observe(el));

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    let isMenuOpen = false;

    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        navLinksContainer.classList.toggle('active', isMenuOpen);
        document.body.classList.toggle('nav-open', isMenuOpen);
    });

    const mainNavLinks = document.querySelectorAll('.nav-links > a');
    mainNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Code Scramble Animation (Updated for "Code")
    const scrambleElement = document.querySelector('.code-scramble');
    const originalText = scrambleElement.textContent;
    const characters = '01ABCDEF';
    function scrambleText() {
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
            scrambled += Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : originalText[i];
        }
        scrambleElement.textContent = scrambled;
        setTimeout(() => (scrambleElement.textContent = originalText), 100);
    }
    setInterval(scrambleText, 2000);

    // Typewriter Effect (Updated for "Future")
    const typewriterElement = document.querySelector('.typewriter');
    const words = ['Future', 'Success', 'Growth'];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = words[0];
    let isDeleting = false;

    typewriterElement.textContent = 'Future';

    function type() {
        if (wordIndex >= words.length) wordIndex = 0;
        currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex++;
            }
        } else {
            charIndex++;
            typewriterElement.textContent = currentWord.substring(0, charIndex);
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            }
        }
        setTimeout(type, isDeleting ? 100 : 150);
    }
    type();

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We’ll get back to you soon.');
        contactForm.reset();
        document.getElementById('contact-type').value = '';
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
