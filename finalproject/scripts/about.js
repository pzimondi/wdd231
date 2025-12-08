// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Form validation and handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    // Additional validation
    if (name.length < 2) {
        e.preventDefault();
        alert('Please enter a valid name (at least 2 characters).');
        return;
    }
    
    if (!email.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!subject) {
        e.preventDefault();
        alert('Please select a subject.');
        return;
    }
    
    if (message.length < 10) {
        e.preventDefault();
        alert('Please enter a message with at least 10 characters.');
        return;
    }
    
    // Form is valid, will proceed to thank-you.html with URL parameters
});