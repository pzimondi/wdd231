// main.js - Harare Chamber of Commerce
// Pastor Munashe Zimondi - WDD 231
// Modern Enhanced Version

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
// DIRECTORY: Get members display element
// ==========================================

const membersDisplay = document.querySelector('#members-display');

// ==========================================
// DIRECTORY: Grid/List View Toggle
// ==========================================

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

// Only set up toggle if buttons exist (directory page)
if (gridbutton && listbutton && display) {
    // Grid button - using arrow function
    gridbutton.addEventListener("click", () => {
        display.classList.add("grid");
        display.classList.remove("list");
        gridbutton.classList.add("active");
        listbutton.classList.remove("active");
        
        // Store preference in sessionStorage
        sessionStorage.setItem('viewMode', 'grid');
    });

    // List button - using named function
    listbutton.addEventListener("click", showList);

    function showList() {
        display.classList.add("list");
        display.classList.remove("grid");
        listbutton.classList.add("active");
        gridbutton.classList.remove("active");
        
        // Store preference in sessionStorage
        sessionStorage.setItem('viewMode', 'list');
    }

    // Restore user's previous view preference
    const savedView = sessionStorage.getItem('viewMode');
    if (savedView === 'list') {
        showList();
    } else {
        // Set grid as default active state
        gridbutton.classList.add("active");
    }
}

// ==========================================
// DIRECTORY: Fetch and Display Members
// ==========================================

async function fetchMembers() {
    // Show loading state with modern spinner
    if (membersDisplay) {
        membersDisplay.innerHTML = '<p class="loading">⏳ Loading member directory...</p>';
    }
    
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Validate data structure
        if (!data.members || !Array.isArray(data.members)) {
            throw new Error('Invalid data structure');
        }
        
        displayMembers(data.members);
    } catch (error) {
        console.error('Error loading members:', error);
        if (membersDisplay) {
            membersDisplay.innerHTML = `
                <p class="error">
                    ⚠️ Unable to load member directory. Please try again later.
                    <br><small>Error: ${error.message}</small>
                </p>
            `;
        }
    }
}

// ==========================================
// DIRECTORY: Display Members Function
// ==========================================

function displayMembers(members) {
    if (!membersDisplay) return;
    
    // Clear any existing content
    membersDisplay.innerHTML = '';
    
    // Add header row for list view
    const headerSection = document.createElement('section');
    headerSection.className = 'list-header';
    headerSection.innerHTML = `
        <h3>Business Name</h3>
        <p>Address</p>
        <p>Phone</p>
        <a>Website</a>
    `;
    membersDisplay.appendChild(headerSection);
    
    // Create member sections with enhanced animation
    members.forEach((member, index) => {
        const section = document.createElement('section');
        
        // Add staggered animation delay for smooth entrance
        section.style.animationDelay = `${index * 0.05}s`;
        
        // Get membership level badge
        const levelBadge = getMembershipBadge(member.membershipLevel);
        
        // Validate and sanitize member data
        const name = escapeHtml(member.name || 'Unknown Business');
        const address = escapeHtml(member.address || 'Address not available');
        const phone = escapeHtml(member.phone || 'Phone not available');
        const website = member.website || '#';
        const image = member.image || 'images/placeholder-logo.jpg';
        
        section.innerHTML = `
            <img src="${image}" alt="${name} logo" loading="lazy" onerror="this.src='images/placeholder-logo.jpg'">
            <h3>${name}</h3>
            ${levelBadge}
            <p class="member-address">📍 ${address}</p>
            <p class="member-phone">📞 ${phone}</p>
            <a href="${website}" target="_blank" rel="noopener noreferrer">🔗 Visit Site</a>
        `;
        
        membersDisplay.appendChild(section);
    });
}

// ==========================================
// DIRECTORY: Get Membership Level Badge
// ==========================================

function getMembershipBadge(level) {
    const badges = {
        1: '<span class="membership-badge member">✓ Member</span>',
        2: '<span class="membership-badge silver">★ Silver Member</span>',
        3: '<span class="membership-badge gold">★★★ Gold Member</span>'
    };
    return badges[level] || badges[1];
}

// ==========================================
// UTILITY: Escape HTML to prevent XSS
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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
// INITIALIZE: Load members when page loads
// ==========================================

// Only run on directory page
if (membersDisplay) {
    // Add a slight delay for smooth page load
    setTimeout(() => {
        fetchMembers();
    }, 100);
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
// PERFORMANCE: Log page load time (dev only)
// ==========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`✅ Page loaded in ${loadTime}ms`);
    }
});