// ==========================================
// INDEX/HOME PAGE SCRIPTS
// File: scripts/index.js
// ==========================================

// ==========================================
// WEATHER: OpenWeatherMap API Integration
// ==========================================


const WEATHER_API_KEY = '1273319fc961cba2ab6ea8af91de76df'; 
const HARARE_LAT = -17.8292;
const HARARE_LON = 31.0522;

async function fetchWeatherData() {
    console.log('🌤️ Starting weather fetch...');
    console.log('API Key:', WEATHER_API_KEY ? 'Set ✓' : 'Not set ✗');
    
    // Check if API key is set
    if (WEATHER_API_KEY === '' || !WEATHER_API_KEY) {
        console.warn('⚠️ OpenWeatherMap API key not set. Please add your API key to scripts/index.js');
        displayWeatherError();
        return;
    }
    
    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${HARARE_LAT}&lon=${HARARE_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
        console.log('Fetching current weather from:', currentUrl);
        
        // Fetch current weather (using imperial units for Fahrenheit)
        const currentResponse = await fetch(currentUrl);
        
        console.log('Current weather response status:', currentResponse.status);
        
        if (!currentResponse.ok) {
            const errorText = await currentResponse.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch current weather: ${currentResponse.status}`);
        }
        
        const currentData = await currentResponse.json();
        console.log('✅ Current weather data received:', currentData);
        
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${HARARE_LAT}&lon=${HARARE_LON}&units=imperial&appid=${WEATHER_API_KEY}`;
        console.log('Fetching forecast from:', forecastUrl);
        
        // Fetch 3-day forecast (using imperial units for Fahrenheit)
        const forecastResponse = await fetch(forecastUrl);
        
        console.log('Forecast response status:', forecastResponse.status);
        
        if (!forecastResponse.ok) {
            const errorText = await forecastResponse.text();
            console.error('API Error Response:', errorText);
            throw new Error(`Failed to fetch forecast: ${forecastResponse.status}`);
        }
        
        const forecastData = await forecastResponse.json();
        console.log('✅ Forecast data received:', forecastData);
        
        // Display weather data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
    } catch (error) {
        console.error('❌ Weather Error:', error);
        console.error('Error stack:', error.stack);
        displayWeatherError();
    }
}

// ==========================================
// WEATHER: Display Current Weather
// ==========================================

function displayCurrentWeather(data) {
    console.log('📍 displayCurrentWeather called with data:', data);
    
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');
    const highElement = document.getElementById('weather-high');
    const lowElement = document.getElementById('weather-low');
    const humidityElement = document.getElementById('weather-humidity');
    const sunriseElement = document.getElementById('weather-sunrise');
    const sunsetElement = document.getElementById('weather-sunset');
    
    console.log('Elements found:', {
        tempElement: !!tempElement,
        descElement: !!descElement,
        iconElement: !!iconElement,
        highElement: !!highElement,
        lowElement: !!lowElement,
        humidityElement: !!humidityElement,
        sunriseElement: !!sunriseElement,
        sunsetElement: !!sunsetElement
    });
    
    if (!tempElement || !descElement || !iconElement) {
        console.error('❌ Critical weather elements not found in DOM!');
        console.error('Missing:', {
            temp: !tempElement,
            desc: !descElement,
            icon: !iconElement
        });
        return;
    }
    
    try {
        // Display temperature in Fahrenheit
        const temp = Math.round(data.main.temp);
        tempElement.textContent = `${temp}°F`;
        console.log('✓ Temperature set:', temp);
        
        // Display description
        const description = data.weather[0].description;
        descElement.textContent = description;
        console.log('✓ Description set:', description);
        
        // Display weather icon (emoji based on condition)
        const iconCode = data.weather[0].main.toLowerCase();
        const emoji = getWeatherEmoji(iconCode);
        iconElement.textContent = emoji;
        console.log('✓ Icon set:', emoji, 'for condition:', iconCode);
        
        // Display additional weather details
        if (highElement) {
            highElement.textContent = `High: ${Math.round(data.main.temp_max)}°`;
            console.log('✓ High temp set');
        }
        if (lowElement) {
            lowElement.textContent = `Low: ${Math.round(data.main.temp_min)}°`;
            console.log('✓ Low temp set');
        }
        if (humidityElement) {
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            console.log('✓ Humidity set');
        }
        
        // Format sunrise and sunset times
        if (sunriseElement) {
            const sunrise = new Date(data.sys.sunrise * 1000);
            sunriseElement.textContent = `Sunrise: ${sunrise.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
            console.log('✓ Sunrise set');
        }
        if (sunsetElement) {
            const sunset = new Date(data.sys.sunset * 1000);
            sunsetElement.textContent = `Sunset: ${sunset.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
            console.log('✓ Sunset set');
        }
        
        console.log('✅ Current weather displayed successfully');
    } catch (error) {
        console.error('❌ Error displaying weather:', error);
    }
}

// ==========================================
// WEATHER: Get Weather Emoji
// ==========================================

function getWeatherEmoji(condition) {
    const emojiMap = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'smoke': '🌫️',
        'haze': '🌫️',
        'dust': '🌫️',
        'fog': '🌫️',
        'sand': '🌫️',
        'ash': '🌫️',
        'squall': '💨',
        'tornado': '🌪️'
    };
    
    return emojiMap[condition] || '🌤️';
}

// ==========================================
// WEATHER: Display 3-Day Forecast
// ==========================================

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    
    if (!forecastContainer) {
        console.error('❌ Forecast container not found');
        return;
    }
    
    console.log('Displaying forecast...');
    
    // Clear loading message
    forecastContainer.innerHTML = '';
    
    // Get forecast for next 3 days (one entry per day at noon)
    const dailyForecasts = [];
    const processedDates = new Set();
    
    for (let item of data.list) {
        const date = new Date(item.dt * 1000);
        const dateString = date.toDateString();
        
        // Get one forecast per day (preferably around noon)
        if (!processedDates.has(dateString) && date.getHours() >= 11 && date.getHours() <= 14) {
            dailyForecasts.push(item);
            processedDates.add(dateString);
            
            if (dailyForecasts.length === 3) break;
        }
    }
    
    // If we don't have 3 forecasts at noon, get any 3 days
    if (dailyForecasts.length < 3) {
        dailyForecasts.length = 0;
        processedDates.clear();
        
        for (let item of data.list) {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();
            
            if (!processedDates.has(dateString)) {
                dailyForecasts.push(item);
                processedDates.add(dateString);
                
                if (dailyForecasts.length === 3) break;
            }
        }
    }
    
    // Display each day's forecast
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(forecast.main.temp);
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <p class="forecast-date">${dayName}:</p>
            <p class="forecast-temp">${temp}°F</p>
        `;
        
        forecastContainer.appendChild(forecastDay);
    });
    
    console.log('✅ Forecast displayed successfully');
}

// ==========================================
// WEATHER: Display Error
// ==========================================

function displayWeatherError() {
    const tempElement = document.getElementById('current-temp');
    const descElement = document.getElementById('weather-desc');
    const iconElement = document.getElementById('weather-icon');
    const highElement = document.getElementById('weather-high');
    const lowElement = document.getElementById('weather-low');
    const humidityElement = document.getElementById('weather-humidity');
    const sunriseElement = document.getElementById('weather-sunrise');
    const sunsetElement = document.getElementById('weather-sunset');
    const forecastContainer = document.getElementById('forecast-container');
    
    console.log('Displaying weather error state...');
    
    if (tempElement) tempElement.textContent = 'N/A';
    if (descElement) descElement.textContent = 'Unable To Load Weather Data';
    if (iconElement) iconElement.innerHTML = '<span style="font-size: 4rem;">⚠️</span>';
    if (highElement) highElement.textContent = 'High: --°';
    if (lowElement) lowElement.textContent = 'Low: --°';
    if (humidityElement) humidityElement.textContent = 'Humidity: --%';
    if (sunriseElement) sunriseElement.textContent = 'Sunrise: --';
    if (sunsetElement) sunsetElement.textContent = 'Sunset: --';
    
    if (forecastContainer) {
        forecastContainer.innerHTML = '<p style="text-align: center; color: #dc3545; padding: 2rem;">Forecast unavailable</p>';
    }
}

// ==========================================
// SPOTLIGHTS: Fetch and Display Members
// ==========================================

async function fetchSpotlightMembers() {
    const spotlightContainer = document.getElementById('spotlight-container');
    
    if (!spotlightContainer) return;
    
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
        
        // Filter gold (3) and silver (2) members only
        const qualifiedMembers = data.members.filter(
            member => member.membershipLevel === 2 || member.membershipLevel === 3
        );
        
        // Randomly select 2-3 members
        const numberOfSpotlights = Math.random() > 0.5 ? 3 : 2;
        const selectedMembers = getRandomMembers(qualifiedMembers, numberOfSpotlights);
        
        // Display spotlights
        displaySpotlights(selectedMembers);
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
        if (spotlightContainer) {
            spotlightContainer.innerHTML = `
                <p class="error" style="grid-column: 1/-1;">
                    ⚠️ Unable to load member spotlights. Please try again later.
                </p>
            `;
        }
    }
}

// ==========================================
// SPOTLIGHTS: Get Random Members
// ==========================================

function getRandomMembers(members, count) {
    // Fisher-Yates shuffle algorithm for random selection
    const shuffled = [...members];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ==========================================
// SPOTLIGHTS: Display Members
// ==========================================

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    
    if (!spotlightContainer) return;
    
    // Clear loading message
    spotlightContainer.innerHTML = '';
    
    members.forEach((member, index) => {
        const card = document.createElement('article');
        card.className = `spotlight-card ${member.membershipLevel === 3 ? 'gold' : 'silver'}`;
        
        // Add staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Get membership level badge
        const levelBadge = getMembershipBadge(member.membershipLevel);
        
        // Sanitize data
        const name = escapeHtml(member.name || 'Unknown Business');
        const address = escapeHtml(member.address || 'Address not available');
        const phone = escapeHtml(member.phone || 'Phone not available');
        const website = member.website || '#';
        const image = member.image || 'images/placeholder-logo.jpg';
        
        card.innerHTML = `
            <img src="${image}" alt="${name} logo" loading="lazy" onerror="this.src='images/placeholder-logo.jpg'">
            <h3>${name}</h3>
            ${levelBadge}
            <div class="spotlight-info">
                <p>📍 ${address}</p>
                <p>📞 ${phone}</p>
            </div>
            <a href="${website}" target="_blank" rel="noopener noreferrer">Visit Website →</a>
        `;
        
        spotlightContainer.appendChild(card);
    });
}

// ==========================================
// UTILITY: Get Membership Badge
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
// UTILITY: Escape HTML (prevent XSS)
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// INITIALIZE: Load data when page loads
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing index page...');
    
    // Fetch weather data
    fetchWeatherData();
    
    // Fetch spotlight members
    fetchSpotlightMembers();
});

// ==========================================
// PERFORMANCE: Log page load (dev only)
// ==========================================

window.addEventListener('load', () => {
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`✅ Index page loaded in ${loadTime}ms`);
    }
});