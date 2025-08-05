// ===== RESPONSIVE PORTFOLIO ENHANCEMENTS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Update active link
                updateActiveNavLink(this);
            }
        });
    });
    
    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // ===== SCROLL SPY FUNCTIONALITY =====
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const correspondingNavLink = document.querySelector(`.navbar-nav .nav-link[href="#${entry.target.id}"]`);
                if (correspondingNavLink) {
                    updateActiveNavLink(correspondingNavLink);
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll (mobile optimization)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== RESPONSIVE CAROUSEL HEIGHT ADJUSTMENT =====
    function adjustCarouselHeight() {
        const carousel = document.querySelector('#carouselExample');
        const carouselItems = document.querySelectorAll('.carousel-item');
        
        if (carousel && carouselItems.length > 0) {
            const viewportHeight = window.innerHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            let carouselHeight;
            
            if (window.innerWidth <= 575) {
                carouselHeight = Math.min(viewportHeight * 0.6, 400);
            } else if (window.innerWidth <= 767) {
                carouselHeight = Math.min(viewportHeight * 0.7, 500);
            } else if (window.innerWidth <= 1199) {
                carouselHeight = Math.min(viewportHeight * 0.8, 600);
            } else {
                carouselHeight = viewportHeight;
            }
            
            carousel.style.height = `${carouselHeight}px`;
            carouselItems.forEach(item => {
                item.style.height = `${carouselHeight}px`;
            });
        }
    }
    
    // Initial adjustment and on resize
    adjustCarouselHeight();
    window.addEventListener('resize', debounce(adjustCarouselHeight, 250));
    
    // ===== RESPONSIVE FONT SIZE ADJUSTMENTS =====
    function adjustResponsiveFonts() {
        const root = document.documentElement;
        const viewportWidth = window.innerWidth;
        
        // Adjust base font size for better readability on different devices
        if (viewportWidth <= 375) {
            root.style.fontSize = '14px';
        } else if (viewportWidth <= 768) {
            root.style.fontSize = '15px';
        } else {
            root.style.fontSize = '16px';
        }
    }
    
    adjustResponsiveFonts();
    window.addEventListener('resize', debounce(adjustResponsiveFonts, 250));
    
    // ===== TOUCH GESTURES FOR MOBILE =====
    if ('ontouchstart' in window) {
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped up - hide navbar faster on mobile
                    if (window.scrollY > 100) {
                        navbar.style.transform = 'translateY(-100%)';
                    }
                } else {
                    // Swiped down - show navbar
                    navbar.style.transform = 'translateY(0)';
                }
            }
        }
    }
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #007bff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#sobre';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link visually-hidden-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #007bff;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Preload critical images
    const criticalImages = [
        'assets/experiencia4.jpg',
        'assets/formatura.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Disable carousel auto-play
        const carousel = document.querySelector('#carouselExample');
        if (carousel) {
            carousel.setAttribute('data-bs-ride', 'false');
        }
    }
    
    // ===== ERROR HANDLING FOR IMAGES =====
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
    
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get viewport dimensions
function getViewportSize() {
    return {
        width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
}

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('Responsive Portfolio JavaScript loaded successfully!');
console.log('Viewport size:', getViewportSize());
console.log('Mobile device:', isMobileDevice());