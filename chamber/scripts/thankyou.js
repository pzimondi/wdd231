// ==========================================
// THANK YOU PAGE SCRIPTS
// File: scripts/thankyou.js
// ==========================================

// ==========================================
// DISPLAY FORM DATA FROM URL PARAMETERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    displayApplicationData();
});

function displayApplicationData() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get the container element
    const container = document.getElementById('application-data');
    
    if (!container) {
        console.error('Application data container not found');
        return;
    }
    
    // Define the fields we want to display (required fields only)
    const fields = [
        { param: 'first-name', label: 'First Name' },
        { param: 'last-name', label: 'Last Name' },
        { param: 'email', label: 'Email Address' },
        { param: 'phone', label: 'Mobile Phone' },
        { param: 'organization', label: 'Business/Organization' },
        { param: 'membership-level', label: 'Membership Level' },
        { param: 'timestamp', label: 'Application Submitted' }
    ];
    
    // Clear container
    container.innerHTML = '';
    
    // Check if we have any data
    let hasData = false;
    
    // Create and append data items
    fields.forEach(field => {
        const value = urlParams.get(field.param);
        
        if (value) {
            hasData = true;
            
            // Format the value
            let displayValue = value;
            
            // Format membership level
            if (field.param === 'membership-level') {
                displayValue = formatMembershipLevel(value);
            }
            
            // Format timestamp
            if (field.param === 'timestamp') {
                displayValue = formatTimestamp(value);
            }
            
            // Create summary item
            const item = document.createElement('div');
            item.className = 'summary-item';
            item.innerHTML = `
                <span class="summary-label">${field.label}</span>
                <span class="summary-value">${escapeHtml(displayValue)}</span>
            `;
            
            container.appendChild(item);
        }
    });
    
    // If no data found, show message
    if (!hasData) {
        container.innerHTML = `
            <div class="summary-item" style="grid-column: 1/-1;">
                <p style="text-align: center; color: var(--text-light);">
                    No application data found. If you just submitted the form, please try again.
                </p>
            </div>
        `;
    }
    
    console.log('✅ Application data displayed successfully');
}

// ==========================================
// FORMAT MEMBERSHIP LEVEL
// ==========================================

function formatMembershipLevel(level) {
    const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    
    return levels[level] || level;
}

// ==========================================
// FORMAT TIMESTAMP
// ==========================================

function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        
        // Format: "Month Day, Year at Hour:Minute AM/PM"
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        
        return date.toLocaleString('en-US', options);
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return timestamp;
    }
}

// ==========================================
// ESCAPE HTML TO PREVENT XSS
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// PERFORMANCE: Log page load time
// ==========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`✅ Thank you page loaded in ${loadTime}ms`);
    }
});