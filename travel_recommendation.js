// Global variable to store travel data
let travelData = null;

// Time zone mapping for countries
const countryTimeZones = {
    'australia': 'Australia/Sydney',
    'japan': 'Asia/Tokyo',
    'brazil': 'America/Sao_Paulo',
    'cambodia': 'Asia/Phnom_Penh',
    'india': 'Asia/Kolkata',
    'french polynesia': 'Pacific/Tahiti'
};

// Fetch travel data when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchTravelData();
    showPage('home'); // Show home page by default
});

// Fetch data from JSON file
function fetchTravelData() {
    fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            travelData = data;
            console.log('Travel data loaded successfully:', data);
        })
        .catch(error => {
            console.error('Error fetching travel data:', error);
            alert('Failed to load travel recommendations. Please make sure you are using Live Server or a local web server.');
        });
}

// Function to show/hide pages
function showPage(pageName) {
    // Hide all pages
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('aboutPage').classList.add('hidden');
    document.getElementById('contactPage').classList.add('hidden');

    // Show/hide search container based on page
    const searchContainer = document.getElementById('searchContainer');
    
    if (pageName === 'home') {
        document.getElementById('homePage').classList.remove('hidden');
        searchContainer.style.display = 'flex';
    } else if (pageName === 'about') {
        document.getElementById('aboutPage').classList.remove('hidden');
        searchContainer.style.display = 'none';
    } else if (pageName === 'contact') {
        document.getElementById('contactPage').classList.remove('hidden');
        searchContainer.style.display = 'none';
    }

    // Clear results when changing pages
    if (pageName !== 'home') {
        clearResults();
    }
}

// Search recommendations based on keyword
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!searchInput) {
        alert('Please enter a search keyword (beach, temple, or country)');
        return;
    }

    // Debug: Check if travelData exists
    console.log('travelData exists:', !!travelData);
    console.log('travelData value:', travelData);
    
    if (!travelData || typeof travelData !== 'object') {
        console.error('Travel data is not loaded properly');
        alert('Travel data is still loading. Please try again in a moment.');
        return;
    }

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    let results = [];
    let category = '';

    // Check for beach/beaches keyword
    if (searchInput.includes('beach')) {
        results = travelData.beaches || [];
        category = 'Beaches';
    }
    // Check for temple/temples keyword
    else if (searchInput.includes('temple')) {
        results = travelData.temples || [];
        category = 'Temples';
    }
    // Check for country/countries keyword
    else if (searchInput.includes('country') || searchInput.includes('countries') || 
             searchInput.includes('city') || searchInput.includes('cities')) {
        // Get all cities from all countries
        if (travelData.countries) {
            travelData.countries.forEach(country => {
                if (country.cities) {
                    country.cities.forEach(city => {
                        results.push({
                            ...city,
                            country: country.name,
                            timeZone: getTimeZone(country.name)
                        });
                    });
                }
            });
        }
        category = 'Countries & Cities';
    }
    // If no exact match, try to find in specific country names
    else {
        const foundCountry = travelData.countries?.find(country => 
            country.name.toLowerCase().includes(searchInput)
        );
        
        if (foundCountry && foundCountry.cities) {
            results = foundCountry.cities.map(city => ({
                ...city,
                country: foundCountry.name,
                timeZone: getTimeZone(foundCountry.name)
            }));
            category = foundCountry.name;
        } else {
            alert('No results found. Try searching for: beach, temple, or country');
            return;
        }
    }

    // Display results
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem;">No recommendations found for your search.</p>';
        return;
    }

    displayResults(results, category);
}

// Get time zone for a country
function getTimeZone(countryName) {
    const countryLower = countryName.toLowerCase();
    for (const [key, value] of Object.entries(countryTimeZones)) {
        if (countryLower.includes(key)) {
            return value;
        }
    }
    return null;
}

// Display current time for a time zone
function getCurrentTime(timeZone) {
    if (!timeZone) return null;
    
    try {
        const options = { 
            timeZone: timeZone, 
            hour12: true, 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };
        const time = new Date().toLocaleTimeString('en-US', options);
        return time;
    } catch (error) {
        console.error('Error getting time for timezone:', timeZone, error);
        return null;
    }
}

// Display results on the page
function displayResults(results, category) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Add category heading
    const heading = document.createElement('h2');
    heading.style.cssText = 'grid-column: 1 / -1; color: #667eea; text-align: center; margin-bottom: 1rem;';
    heading.textContent = `${category} Recommendations`;
    resultsContainer.appendChild(heading);

    // Create cards for each result
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';

        // Create image element with placeholder
        const img = document.createElement('img');
        // Use a placeholder image from Unsplash based on category
        let placeholderUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop';
        
        if (category === 'Beaches') {
            placeholderUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop';
        } else if (category === 'Temples') {
            placeholderUrl = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=250&fit=crop';
        }
        
        img.src = placeholderUrl;
        img.alt = item.name;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x250?text=Travel+Destination';
        };

        // Create content section
        const content = document.createElement('div');
        content.className = 'result-card-content';

        const title = document.createElement('h3');
        title.textContent = item.name;

        const description = document.createElement('p');
        description.textContent = item.description;

        content.appendChild(title);
        content.appendChild(description);

        // Add time display if timezone is available
        if (item.timeZone) {
            const currentTime = getCurrentTime(item.timeZone);
            if (currentTime) {
                const timeDiv = document.createElement('div');
                timeDiv.className = 'time-display';
                timeDiv.innerHTML = `<strong>Local Time:</strong> ${currentTime}`;
                content.appendChild(timeDiv);
            }
        }

        // Add visit button
        const visitBtn = document.createElement('button');
        visitBtn.className = 'btn btn-search';
        visitBtn.textContent = 'Visit';
        visitBtn.style.cssText = 'margin-top: 1rem; width: 100%;';
        visitBtn.onclick = function() {
            alert(`Thank you for your interest in ${item.name}! This would normally take you to a booking page.`);
        };
        content.appendChild(visitBtn);

        card.appendChild(img);
        card.appendChild(content);
        resultsContainer.appendChild(card);
    });
}

// Clear search results
function clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    document.getElementById('searchInput').value = '';
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, this would send data to a server
    console.log('Form submitted:', { name, email, message });
    
    alert(`Thank you for your message, ${name}! We will get back to you at ${email} soon.`);
    
    // Clear form
    event.target.reset();
}

// Add event listener for Enter key in search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchRecommendations();
            }
        });
    }
});
