// ==========================================
// MAIN SCRIPTS - BASE/GLOBAL SCRIPTS
// File: scripts/main.js
// ==========================================

// ==========================================
// FOOTER: Dynamic Year and Last Modified
// ==========================================

// Set current year in footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Set last modified date in footer
const lastModifiedSpan = document.getElementById('lastModified');
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

// ==========================================
// NAVIGATION: Hamburger Menu Toggle
// ==========================================

const menuToggle = document.getElementById('menu-toggle');
const navigation = document.querySelector('.navigation');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        // Toggle the 'open' class on navigation
        navigation.classList.toggle('open');
        
        // Toggle hamburger icon (☰ to ✕)
        if (navigation.classList.contains('open')) {
            menuToggle.textContent = '✕';
            menuToggle.setAttribute('aria-label', 'Close navigation menu');
        } else {
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });
}

// ==========================================
// NAVIGATION: Close menu when clicking outside
// ==========================================

document.addEventListener('click', (event) => {
    if (navigation && menuToggle) {
        // Check if click is outside navigation and menu button
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            if (navigation.classList.contains('open')) {
                navigation.classList.remove('open');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
            }
        }
    }
});

// ==========================================
// NAVIGATION: Close menu on window resize
// ==========================================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navigation) {
        // Remove open class on larger screens
        navigation.classList.remove('open');
        if (menuToggle) {
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    }
});

// ==========================================
// NAVIGATION: Close menu when clicking nav links
// ==========================================

if (navigation) {
    const navLinks = navigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navigation.classList.remove('open');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                    menuToggle.setAttribute('aria-label', 'Open navigation menu');
                }
            }
        });
    });
}

// ==========================================
// ACCESSIBILITY: Skip to main content
// ==========================================

// Add keyboard navigation enhancement
document.addEventListener('DOMContentLoaded', () => {
    // Focus management for better accessibility
    const firstFocusableElement = document.querySelector('a, button, input, select, textarea');
    if (firstFocusableElement) {
        // Ensure first interactive element is reachable
        firstFocusableElement.setAttribute('tabindex', '0');
    }
});

// ==========================================
// PERFORMANCE: Lazy load images optimization
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // This will be used for future lazy-loaded images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PERFORMANCE: Log page load time (dev only)
// ==========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`✅ Page loaded in ${loadTime}ms`);
    }
});