// Vanilla JavaScript for Vault Markets Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Button click handlers
    const setupButtonHandlers = () => {
        // Primary CTA buttons
        const primaryButtons = document.querySelectorAll('.vm-btn-primary');
        primaryButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Here you would typically redirect to account opening page
                console.log('Primary CTA clicked - redirect to account opening');
                // window.open('https://your-account-opening-url.com', '_blank');
            });
        });

        // Demo/Watch buttons
        const demoButtons = document.querySelectorAll('.vm-btn-outline');
        demoButtons.forEach(button => {
            if (button.textContent.includes('Demo') || button.textContent.includes('Watch')) {
                button.addEventListener('click', function(e) {
                    console.log('Demo/Watch button clicked');
                    // Here you would typically open a demo or video
                    // window.open('https://your-demo-url.com', '_blank');
                });
            }
        });

        // Video play button
        const playButton = document.querySelector('.vm-play-button');
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                console.log('Video play button clicked');
                // Here you would typically open a video modal or redirect
                // showVideoModal();
            });
        }
    };

    // Intersection Observer for animations
    const setupAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.vm-benefit-card, .vm-instrument-card, .vm-why-benefit, .vm-step, .vm-testimonial-card, .vm-resource-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };

    // Floating icons animation enhancement
    const enhanceFloatingIcons = () => {
        const floatingIcons = document.querySelectorAll('.vm-floating-icon');
        floatingIcons.forEach((icon, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 20 - 10; // -10 to 10px
                const randomY = Math.random() * 20 - 10; // -10 to 10px
                icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + (index * 1000)); // Stagger the animations
        });
    };

    // Card hover effects
    const setupCardEffects = () => {
        const cards = document.querySelectorAll('.vm-benefit-card, .vm-instrument-card, .vm-testimonial-card, .vm-resource-card, .vm-step');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(241, 196, 15, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    };

    // Simple form validation (if forms are added later)
    const setupFormValidation = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Add your form validation logic here
                console.log('Form submitted');
            });
        });
    };

    // Stats counter animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.vm-stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (number && number > 0) {
                        animateNumber(target, 0, number, text);
                    }
                }
            });
        });

        stats.forEach(stat => observer.observe(stat));
    };

    const animateNumber = (element, start, end, originalText) => {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = originalText.replace(/[0-9,]+/, current.toLocaleString());
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        requestAnimationFrame(updateNumber);
    };

    // Mobile menu toggle (if mobile menu is added)
    const setupMobileMenu = () => {
        const menuToggle = document.querySelector('.vm-mobile-menu-toggle');
        const mobileMenu = document.querySelector('.vm-mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
            });
        }
    };

    // Lazy loading for images (basic implementation)
    const setupLazyLoading = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // Initialize all functionality
    setupButtonHandlers();
    setupAnimations();
    enhanceFloatingIcons();
    setupCardEffects();
    setupFormValidation();
    animateStats();
    setupMobileMenu();
    setupLazyLoading();

    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Simple analytics tracking (replace with your analytics service)
    const trackEvent = (eventName, properties = {}) => {
        console.log('Event tracked:', eventName, properties);
        // Example: gtag('event', eventName, properties);
        // Example: analytics.track(eventName, properties);
    };

    // Track button clicks for analytics
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('vm-btn-primary')) {
            trackEvent('cta_click', { button_type: 'primary', button_text: e.target.textContent });
        } else if (e.target.classList.contains('vm-btn-outline')) {
            trackEvent('cta_click', { button_type: 'secondary', button_text: e.target.textContent });
        }
    });

    // Track section visibility for engagement
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                trackEvent('section_view', { section: sectionName });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    console.log('Vault Markets landing page initialized successfully!');
});

// Utility functions
const utils = {
    // Format currency
    formatCurrency: (amount, currency = 'ZAR') => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Debounce function for performance
    debounce: (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    },

    // Throttle function for scroll events
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return (...args) => {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(null, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(null, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
};


    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll(".vm-instrument-card");
        let current = 0;

        if (cards.length === 0) return;

        setInterval(() => {
            // Remove active state from all
            cards.forEach(card => card.classList.remove("is-focused"));

            // Add active state to current card
            cards[current].classList.add("is-focused");

            // Move to next
            current = (current + 1) % cards.length;
        }, 2000); // 2 seconds per card
    });



// Export utils for use in other scripts
window.VaultUtils = utils;