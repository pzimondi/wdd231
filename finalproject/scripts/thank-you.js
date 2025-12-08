// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Get URL parameters and display submission details
function displaySubmissionDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('submission-details');
    
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const subject = urlParams.get('subject');
    const message = urlParams.get('message');
    
    if (name && email && subject && message) {
        // Create details HTML using template literals
        const detailsHTML = `
            <h3>Submission Details:</h3>
            <div class="detail-item">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${escapeHtml(name)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${escapeHtml(email)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Subject:</span>
                <span class="detail-value">${formatSubject(subject)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Message:</span>
                <span class="detail-value">${escapeHtml(message)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Submitted:</span>
                <span class="detail-value">${new Date().toLocaleString()}</span>
            </div>
        `;
        
        detailsContainer.innerHTML = detailsHTML;
    } else {
        detailsContainer.innerHTML = '<p>No submission data found. Please submit the form again.</p>';
    }
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper function to format subject
function formatSubject(subject) {
    const subjectMap = {
        'music-suggestion': 'Music Suggestion',
        'feedback': 'General Feedback',
        'question': 'Question',
        'other': 'Other'
    };
    return subjectMap[subject] || subject;
}

// Initialize
displaySubmissionDetails();