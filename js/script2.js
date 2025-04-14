document.addEventListener('DOMContentLoaded', () => {
    // Cookie Handling Functions
    const setCookie = (name, value, days) => {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    };

    const getCookie = (name) => {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    };

    // Function to Update Placeholder Images
    const updatePlaceholders = (isLightTheme) => {
        const placeholders = document.querySelectorAll('.product-item img:not(.breezy-icon-container img), .client-item img');
        placeholders.forEach(img => {
            if (isLightTheme) {
                img.src = img.src.replace('2a2a2a/2a2a2a', 'f5f5f5/f5f5f5');
            } else {
                img.src = img.src.replace('f5f5f5/f5f5f5', '2a2a2a/2a2a2a');
            }
        });
    };

    // Preloader
    const preloader = document.querySelector('.preloader');
    const hidePreloader = () => {
        preloader.classList.add('hidden');
    };

    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 3000);

    // Restore Theme from Cookie on Page Load
    const savedTheme = getCookie('theme');
    const isLightThemeInitially = savedTheme === 'light';
    if (isLightThemeInitially) {
        document.documentElement.classList.add('light-theme');
    }
    const logoImg = document.querySelector('.logo-img');
    logoImg.src = isLightThemeInitially ? 'images/logo.ico' : 'images/logo.png';
    updatePlaceholders(isLightThemeInitially);

    // Boolean to disable arrows on mobile
    const disableArrowsOnMobile = true;

    // Function to update arrow states (only used on desktop)
    const updateArrowStates = (grid, leftArrow, rightArrow, items) => {
        const scrollLeft = grid.scrollLeft;
        const itemWidth = 300; // Width of each item
        const gap = 20; // Gap between items
        const totalItemsWidth = items.length * (itemWidth + gap) - gap; // Total width of all items
        const viewportWidth = grid.clientWidth; // Visible width of the grid
        const maxScroll = Math.max(0, totalItemsWidth - viewportWidth); // Adjusted max scroll

        const threshold = 5; // Pixels

        // Disable left arrow if at the start
        if (scrollLeft <= threshold) {
            leftArrow.classList.add('disabled');
        } else {
            leftArrow.classList.remove('disabled');
        }

        // Disable right arrow if at the end
        if (scrollLeft >= maxScroll - threshold || maxScroll <= 0) {
            rightArrow.classList.add('disabled');
        } else {
            rightArrow.classList.remove('disabled');
        }
    };

    // Product Grid Scroll and Arrows
    const productGrid = document.querySelector('.products-grid');
    const productGridWrapper = document.querySelector('.products-grid-wrapper');
    const productLeftArrow = document.querySelector('.products-grid-wrapper .scroll-arrow.left');
    const productRightArrow = document.querySelector('.products-grid-wrapper .scroll-arrow.right');
    const productItems = document.querySelectorAll('.product-item');
    const productItemWidth = 300; // Width of each item
    const productGap = 20; // Gap between items
    const productScrollDistance = productItemWidth + productGap; // Total distance to scroll per click

    // Function to determine arrow visibility
    const determineArrowVisibility = (items, isMobile) => {
        if (isMobile && disableArrowsOnMobile) {
            return false; // No arrows on mobile if disabled
        }
        return isMobile ? items.length > 1 : items.length > 3;
    };

    // Initial arrow visibility
    let isMobile = window.innerWidth <= 768;
    let showProductArrows = determineArrowVisibility(productItems, isMobile);

    if (isMobile && disableArrowsOnMobile) {
        productGridWrapper.classList.add('hide-arrows-mobile');
    }

    if (showProductArrows) {
        productLeftArrow.classList.add('visible');
        productRightArrow.classList.add('visible');
    } else {
        productLeftArrow.style.display = 'none';
        productRightArrow.style.display = 'none';
    }

    if (productItems.length === 2) {
        productGrid.classList.add('two-items');
    }

    // Center the first item on load (for mobile)
    if (isMobile && productItems.length > 1) {
        const viewportWidth = window.innerWidth;
        const padding = 40; // Padding on mobile
        const offset = (viewportWidth - productItemWidth) / 2 - padding;
        productGrid.scrollLeft = offset; // Start with the first item centered
    }

    productLeftArrow.addEventListener('click', () => {
        productGrid.scrollBy({ left: -productScrollDistance, behavior: 'smooth' });
    });

    productRightArrow.addEventListener('click', () => {
        productGrid.scrollBy({ left: productScrollDistance, behavior: 'smooth' });
    });

    // Update arrow states on scroll for product grid (only on desktop)
    productGrid.addEventListener('scroll', () => {
        if (showProductArrows) {
            updateArrowStates(productGrid, productLeftArrow, productRightArrow, productItems);
        }
    });

    // Initial check for product grid arrow states
    if (showProductArrows) {
        updateArrowStates(productGrid, productLeftArrow, productRightArrow, productItems);
    }

    // Client Grid Scroll and Arrows
    const clientGrid = document.querySelector('.clients-grid');
    const clientGridWrapper = document.querySelector('.clients-grid-wrapper');
    const clientLeftArrow = document.querySelector('.clients-grid-wrapper .scroll-arrow.left');
    const clientRightArrow = document.querySelector('.clients-grid-wrapper .scroll-arrow.right');
    const clientItems = document.querySelectorAll('.client-item');
    const clientItemWidth = 300;
    const clientGap = 20;
    const clientScrollDistance = clientItemWidth + clientGap;

    // Initial arrow visibility for client grid
    let showClientArrows = determineArrowVisibility(clientItems, isMobile);

    if (isMobile && disableArrowsOnMobile) {
        clientGridWrapper.classList.add('hide-arrows-mobile');
    }

    if (showClientArrows) {
        clientLeftArrow.classList.add('visible');
        clientRightArrow.classList.add('visible');
    } else {
        clientLeftArrow.style.display = 'none';
        clientRightArrow.style.display = 'none';
    }

    if (clientItems.length === 2) {
        clientGrid.classList.add('two-items');
    }

    // Center the first item on load (for mobile)
    if (isMobile && clientItems.length > 1) {
        const viewportWidth = window.innerWidth;
        const padding = 40; // Padding on mobile
        const offset = (viewportWidth - clientItemWidth) / 2 - padding;
        clientGrid.scrollLeft = offset; // Start with the first item centered
    }

    clientLeftArrow.addEventListener('click', () => {
        clientGrid.scrollBy({ left: -clientScrollDistance, behavior: 'smooth' });
    });

    clientRightArrow.addEventListener('click', () => {
        clientGrid.scrollBy({ left: clientScrollDistance, behavior: 'smooth' });
    });

    // Update arrow states on scroll for client grid (only on desktop)
    clientGrid.addEventListener('scroll', () => {
        if (showClientArrows) {
            updateArrowStates(clientGrid, clientLeftArrow, clientRightArrow, clientItems);
        }
    });

    // Initial check for client grid arrow states
    if (showClientArrows) {
        updateArrowStates(clientGrid, clientLeftArrow, clientRightArrow, clientItems);
    }

    // Update arrow states and visibility on resize
    window.addEventListener('resize', () => {
        const isMobileResize = window.innerWidth <= 768;
        const viewportWidth = window.innerWidth;

        // Update product grid arrows visibility
        showProductArrows = determineArrowVisibility(productItems, isMobileResize);
        if (isMobileResize && disableArrowsOnMobile) {
            productGridWrapper.classList.add('hide-arrows-mobile');
        } else {
            productGridWrapper.classList.remove('hide-arrows-mobile');
        }

        if (showProductArrows) {
            productLeftArrow.classList.add('visible');
            productRightArrow.classList.add('visible');
            productLeftArrow.style.display = 'block';
            productRightArrow.style.display = 'block';
            updateArrowStates(productGrid, productLeftArrow, productRightArrow, productItems);
        } else {
            productLeftArrow.classList.remove('visible');
            productRightArrow.classList.remove('visible');
            productLeftArrow.style.display = 'none';
            productRightArrow.style.display = 'none';
        }

        // Update client grid arrows visibility
        showClientArrows = determineArrowVisibility(clientItems, isMobileResize);
        if (isMobileResize && disableArrowsOnMobile) {
            clientGridWrapper.classList.add('hide-arrows-mobile');
        } else {
            clientGridWrapper.classList.remove('hide-arrows-mobile');
        }

        if (showClientArrows) {
            clientLeftArrow.classList.add('visible');
            clientRightArrow.classList.add('visible');
            clientLeftArrow.style.display = 'block';
            clientRightArrow.style.display = 'block';
            updateArrowStates(clientGrid, clientLeftArrow, clientRightArrow, clientItems);
        } else {
            clientLeftArrow.classList.remove('visible');
            clientRightArrow.classList.remove('visible');
            clientLeftArrow.style.display = 'none';
            clientRightArrow.style.display = 'none';
        }

        // Recenter items on resize for mobile
        if (isMobileResize) {
            const padding = 40; // Padding on mobile
            const productOffset = (viewportWidth - productItemWidth) / 2 - padding;
            const clientOffset = (viewportWidth - clientItemWidth) / 2 - padding;
            if (productItems.length > 1) {
                productGrid.scrollLeft = productOffset;
                if (showProductArrows) {
                    updateArrowStates(productGrid, productLeftArrow, productRightArrow, productItems);
                }
            }
            if (clientItems.length > 1) {
                clientGrid.scrollLeft = clientOffset;
                if (showClientArrows) {
                    updateArrowStates(clientGrid, clientLeftArrow, clientRightArrow, clientItems);
                }
            }
        }
    });

    // Theme Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            // Select elements that should not animate during theme toggle
            const activeNavLink = document.querySelector('.nav-links a.active');
            const backToTop = document.querySelector('.back-to-top');
            const learnMoreButtons = document.querySelectorAll('.btn');

            // Combine all elements into a single NodeList for easier handling
            const elementsToDisableTransition = [
                activeNavLink,
                backToTop,
                ...learnMoreButtons
            ].filter(el => el); // Filter out null/undefined elements

            // Apply no-transition class to disable transitions
            elementsToDisableTransition.forEach(el => el.classList.add('no-transition'));

            // Toggle the theme
            const isLightTheme = !document.documentElement.classList.contains('light-theme');
            document.documentElement.classList.toggle('light-theme', isLightTheme);
            setCookie('theme', isLightTheme ? 'light' : 'dark', 30); // Save theme for 30 days
            logoImg.src = isLightTheme ? 'images/logo.ico' : 'images/logo.png';
            updatePlaceholders(isLightTheme);

            // Remove no-transition class after a short delay to restore normal transitions
            setTimeout(() => {
                elementsToDisableTransition.forEach(el => el.classList.remove('no-transition'));
            }, 0); // Delay of 0ms ensures the theme change is applied instantly
        });

    // Active Nav Link on Scroll
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
        { threshold: 0.7 }
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

    // Code Scramble Animation
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

    // Typewriter Effect
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
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We’ll get back to you soon.');
        contactForm.reset();
        document.querySelector('#contact-type').value = '';
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
