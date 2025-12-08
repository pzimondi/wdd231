import { tracks } from './data.js';

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update footer year and last modified
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load featured tracks (first 3 from data)
function loadFeaturedTracks() {
    const featuredContainer = document.getElementById('featured-tracks');
    const featuredTracks = tracks.slice(0, 3);
    
    featuredTracks.forEach(track => {
        const trackCard = createTrackCard(track);
        featuredContainer.appendChild(trackCard);
    });
}

function createTrackCard(track) {
    const card = document.createElement('div');
    card.className = 'track-card';
    
    const img = document.createElement('img');
    img.src = track.image;
    img.alt = `${track.title} cover art`;
    img.className = 'track-image';
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'track-info';
    
    info.innerHTML = `
        <h3>${track.title}</h3>
        <p><strong>Artist:</strong> ${track.artist}</p>
        <p><strong>Genre:</strong> ${track.genre}</p>
        <p><strong>Year:</strong> ${track.year}</p>
    `;
    
    card.appendChild(img);
    card.appendChild(info);
    
    // Add click event to navigate to library
    card.addEventListener('click', () => {
        window.location.href = 'library.html';
    });
    
    return card;
}

// Initialize
loadFeaturedTracks();