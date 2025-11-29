// scripts/discover.js
// Discover Page Functionality

import { attractions } from '../data/attractions.mjs';

// ==========================================
// VISITOR MESSAGE FUNCTIONALITY
// ==========================================

function displayVisitorMessage() {
    const visitText = document.getElementById('visit-text');
    const visitorMessage = document.querySelector('.visitor-message');
    const closeButton = document.getElementById('close-message');
    
    if (!visitText || !visitorMessage) return;

    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDiff = now - lastVisitTime;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            // Less than a day
            message = "Back so soon! Awesome!";
        } else if (daysDiff === 1) {
            // Exactly 1 day
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            message = `You last visited ${daysDiff} days ago.`;
        }
    }
    
    // Display the message
    visitText.textContent = message;
    visitorMessage.classList.remove('hidden');
    
    // Store current visit
    localStorage.setItem('lastVisit', now.toString());
    
    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            visitorMessage.classList.add('hidden');
        });
    }
}

// ==========================================
// ATTRACTIONS DISPLAY FUNCTIONALITY
// ==========================================

function displayAttractions() {
    const attractionsGrid = document.getElementById('attractions-grid');
    
    if (!attractionsGrid) return;
    
    // Clear loading message
    attractionsGrid.innerHTML = '';
    
    // Create and append attraction cards
    attractions.forEach(attraction => {
        const card = createAttractionCard(attraction);
        attractionsGrid.appendChild(card);
    });
}

function createAttractionCard(attraction) {
    // Create card elements
    const card = document.createElement('article');
    card.className = 'attraction-card';
    
    // Title
    const title = document.createElement('h2');
    title.textContent = attraction.name;
    
    // Figure with image
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = attraction.image;
    img.alt = attraction.imageAlt;
    img.loading = 'lazy';
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);
    
    // Address
    const address = document.createElement('address');
    address.textContent = attraction.address;
    
    // Description
    const description = document.createElement('p');
    description.textContent = attraction.description;
    
    // Learn More Button
    const button = document.createElement('button');
    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
        alert(`More information about ${attraction.name} coming soon!`);
    });
    
    // Append all elements to card
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);
    
    return card;
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    displayVisitorMessage();
    displayAttractions();
});