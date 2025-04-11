// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const isLightTheme = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
});
// Fade-in on Scroll for Text Elements
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px' }
);

fadeInElements.forEach((el) => observer.observe(el));

// Fallback for fade-in
setTimeout(() => {
    fadeInElements.forEach((el) => {
        if (!el.classList.contains('visible')) {
            el.classList.add('visible');
        }
    });
}, 10000);

// Stats Counter
const statItems = document.querySelectorAll('.stat-item h3');
const countObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalCount = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const increment = finalCount / 50; // Smooth animation over 50 steps
                const updateCount = () => {
                    count += increment;
                    if (count >= finalCount) {
                        target.textContent = `${finalCount}${finalCount === 100 ? '%' : '+'}`;
                    } else {
                        target.textContent = `${Math.floor(count)}${finalCount === 100 ? '%' : '+'}`;
                        requestAnimationFrame(updateCount);
                    }
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
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active', isMenuOpen);
    navLinks.classList.toggle('active', isMenuOpen);
    document.body.classList.toggle('nav-open', isMenuOpen);
});

// Close mobile nav when a main nav link is clicked
const mainNavLinks = document.querySelectorAll('.nav-links > a, .nav-links .nav-item > a');
mainNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
});

// Fix scroll glitch on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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
let currentWord = '';
let isDeleting = false;

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
            setTimeout(type, 1000); // Pause before deleting
            return;
        }
    }
    setTimeout(type, isDeleting ? 100 : 150);
}
type();

// Contact Form Dynamic Fields
function updateFormFields() {
    const contactType = document.getElementById('contact-type').value;
    const quoteField = document.getElementById('quote-field');
    const questionField = document.getElementById('question-field');
    const supportField = document.getElementById('support-field');
    const messageField = document.getElementById('message-field');

    quoteField.classList.add('hidden-field');
    questionField.classList.add('hidden-field');
    supportField.classList.add('hidden-field');

    if (contactType === 'quote') {
        quoteField.classList.remove('hidden-field');
        quoteField.querySelector('textarea').required = true;
        questionField.querySelector('input').required = false;
        supportField.querySelector('input').required = false;
    } else if (contactType === 'question') {
        questionField.classList.remove('hidden-field');
        questionField.querySelector('input').required = true;
        quoteField.querySelector('textarea').required = false;
        supportField.querySelector('input').required = false;
    } else if (contactType === 'support') {
        supportField.classList.remove('hidden-field');
        supportField.querySelector('input').required = true;
        quoteField.querySelector('textarea').required = false;
        questionField.querySelector('input').required = false;
    }
    messageField.required = true;
}

// Form Submission (Simulated)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We’ll get back to you soon.');
    contactForm.reset();
    document.getElementById('contact-type').value = '';
    updateFormFields();
});

// Why Choose Us Accordion on Mobile
const whyChooseUsItems = document.querySelectorAll('.why-choose-us-item');
whyChooseUsItems.forEach(item => {
    const header = item.querySelector('.why-choose-us-header');
    header.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const isActive = item.classList.contains('active');
            // Close all other items
            whyChooseUsItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                }
            });
            // Toggle the clicked item
            item.classList.toggle('active', !isActive);
        }
    });
});
