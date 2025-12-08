import { tracks } from './data.js';

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Update footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// State management
let currentTracks = [...tracks];
let currentFilter = 'all';
let currentSort = 'title';

// DOM elements
const tracksGrid = document.getElementById('tracks-grid');
const genreFilter = document.getElementById('genre-filter');
const sortSelect = document.getElementById('sort-select');
const modal = document.getElementById('track-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

// Load user preferences from local storage
function loadPreferences() {
    const savedFilter = localStorage.getItem('genreFilter');
    const savedSort = localStorage.getItem('sortPreference');
    
    if (savedFilter) {
        currentFilter = savedFilter;
        genreFilter.value = savedFilter;
    }
    
    if (savedSort) {
        currentSort = savedSort;
        sortSelect.value = savedSort;
    }
}

// Save user preferences to local storage
function savePreferences() {
    localStorage.setItem('genreFilter', currentFilter);
    localStorage.setItem('sortPreference', currentSort);
}

// Filter tracks by genre
function filterTracks(genre) {
    if (genre === 'all') {
        currentTracks = [...tracks];
    } else {
        currentTracks = tracks.filter(track => track.genre === genre);
    }
    sortTracks(currentSort);
}

// Sort tracks
function sortTracks(sortBy) {
    switch(sortBy) {
        case 'title':
            currentTracks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'artist':
            currentTracks.sort((a, b) => a.artist.localeCompare(b.artist));
            break;
        case 'year-desc':
            currentTracks.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            currentTracks.sort((a, b) => a.year - b.year);
            break;
    }
    displayTracks();
}

// Display tracks in grid
function displayTracks() {
    tracksGrid.innerHTML = '';
    
    currentTracks.forEach(track => {
        const card = createTrackCard(track);
        tracksGrid.appendChild(card);
    });
}

// Create track card element
function createTrackCard(track) {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.dataset.trackId = track.id;
    
    const img = document.createElement('img');
    img.src = track.image;
    img.alt = `${track.title} cover art`;
    img.className = 'track-image';
    img.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'track-info';
    
    // Using template literals for dynamic content
    info.innerHTML = `
        <h3>${track.title}</h3>
        <p><strong>Artist:</strong> ${track.artist}</p>
        <p><strong>Genre:</strong> ${track.genre}</p>
        <p><strong>Year:</strong> ${track.year}</p>
    `;
    
    card.appendChild(img);
    card.appendChild(info);
    
    // Event listener for modal
    card.addEventListener('click', () => {
        openModal(track);
    });
    
    return card;
}

// Open modal with track details
function openModal(track) {
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${track.image}" alt="${track.title} cover art" class="modal-image">
            <h3 id="modal-title">${track.title}</h3>
        </div>
        <div class="modal-details">
            <div class="modal-detail">
                <strong>Artist:</strong>
                <span>${track.artist}</span>
            </div>
            <div class="modal-detail">
                <strong>Genre:</strong>
                <span>${track.genre}</span>
            </div>
            <div class="modal-detail">
                <strong>Year:</strong>
                <span>${track.year}</span>
            </div>
            <div class="modal-detail">
                <strong>Album:</strong>
                <span>${track.album}</span>
            </div>
            <div class="modal-detail">
                <strong>Label:</strong>
                <span>${track.label}</span>
            </div>
            <div class="modal-detail">
                <strong>Producer:</strong>
                <span>${track.producer}</span>
            </div>
            <div class="modal-detail">
                <strong>Duration:</strong>
                <span>${track.duration}</span>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
genreFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    filterTracks(currentFilter);
    savePreferences();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    sortTracks(currentSort);
    savePreferences();
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Initialize
loadPreferences();
filterTracks(currentFilter);