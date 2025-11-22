// ==========================================
// JOIN PAGE SCRIPTS
// File: scripts/join.js
// ==========================================

// ==========================================
// TIMESTAMP: Set current date/time when form loads
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
        console.log('✓ Timestamp set:', timestampField.value);
    }
});

// ==========================================
// MODAL FUNCTIONALITY
// ==========================================

// Get all modal elements
const modals = {
    np: document.getElementById('np-modal'),
    bronze: document.getElementById('bronze-modal'),
    silver: document.getElementById('silver-modal'),
    gold: document.getElementById('gold-modal')
};

// Get all "Learn More" buttons
const learnMoreButtons = document.querySelectorAll('.learn-more');

// Get all close buttons
const closeButtons = document.querySelectorAll('.close');

// Open modal when "Learn More" is clicked
learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            console.log(`✓ Modal opened: ${modalId}`);
        }
    });
});

// Close modal when X is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
            console.log('✓ Modal closed');
        }
    });
});

// Close modal when clicking outside of modal content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('✓ Modal closed (outside click)');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Object.values(modals).forEach(modal => {
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log('✓ Modal closed (Escape key)');
            }
        });
    }
});

// ==========================================
// FORM VALIDATION ENHANCEMENTS
// ==========================================

const form = document.getElementById('membership-form');

if (form) {
    // Add custom validation messages
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            
            if (input.validity.valueMissing) {
                input.setCustomValidity('This field is required');
            } else if (input.validity.typeMismatch) {
                if (input.type === 'email') {
                    input.setCustomValidity('Please enter a valid email address');
                } else if (input.type === 'tel') {
                    input.setCustomValidity('Please enter a valid phone number');
                }
            } else if (input.validity.patternMismatch) {
                if (input.id === 'title') {
                    input.setCustomValidity('Please enter at least 7 characters (letters, hyphens, and spaces only)');
                }
            }
        });
        
        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
    });
    
    // Form submission handler
    form.addEventListener('submit', (e) => {
        console.log('✓ Form submitted successfully');
        console.log('Form data:', new FormData(form));
    });
}

// ==========================================
// ACCESSIBILITY: Keyboard Navigation for Modals
// ==========================================

// Trap focus within modal when open
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// Apply focus trap to all modals
Object.values(modals).forEach(modal => {
    if (modal) {
        trapFocus(modal);
    }
});

// ==========================================
// PERFORMANCE: Log page load time
// ==========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`✅ Join page loaded in ${loadTime}ms`);
    }
});