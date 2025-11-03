// Global variable to store travel data - embedded directly
let travelData = {
    "countries": [
        {
            "id": 1,
            "name": "Australia",
            "cities": [
                {
                    "name": "Sydney, Australia",
                    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/330px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
                    "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
                },
                {
                    "name": "Melbourne, Australia",
                    "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMelbourne&psig=AOvVaw3ygl_ImjkvHQj1GHl60l3N&ust=1762279616031000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCKj1pKXJ1pADFQAAAAAdAAAAABAE",
                    "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
                }
            ]
        },
        {
            "id": 2,
            "name": "Japan",
            "cities": [
                {
                    "name": "Tokyo, Japan",
                    "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.history.com%2Farticles%2Fsix-things-you-should-know-about-tokyo&psig=AOvVaw2u93asXvQ9dg_T7sHmYuAp&ust=1762279670693000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCICX27_J1pADFQAAAAAdAAAAABAE",
                    "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
                },
                {
                    "name": "Kyoto, Japan",
                    "imageUrl": "https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2025/01/map-of-kyoto-japan-travel-scaled.jpg?fit=2560%2C1707&ssl=1",
                    "description": "Known for its historic temples, gardens, and traditional tea houses."
                }
            ]
        },
        {
            "id": 3,
            "name": "Brazil",
            "cities": [
                {
                    "name": "Rio de Janeiro, Brazil",
                    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/330px-Cidade_Maravilhosa.jpg",
                    "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
                },
                {
                    "name": "São Paulo, Brazil",
                    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Marginal_Pinheiros_e_Jockey_Club.jpg/330px-Marginal_Pinheiros_e_Jockey_Club.jpg",
                    "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
                }
            ]
        }
    ],
    "temples": [
        {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ei1b1PC0KxdBKQ3ILFspUtizCQVc9NvWZw&s",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world."
        },
        {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
        }
    ],
    "beaches": [
        {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Bora_Bora_ISS006.jpg/1200px-Bora_Bora_ISS006.jpg",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
        },
        {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/62/Praia_de_Copacabana_-_Rio_de_Janeiro%2C_Brasil.jpg",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
        }
    ]
};

// Time zone mapping for countries
const countryTimeZones = {
    'australia': 'Australia/Sydney',
    'japan': 'Asia/Tokyo',
    'brazil': 'America/Sao_Paulo',
    'cambodia': 'Asia/Phnom_Penh',
    'india': 'Asia/Kolkata',
    'french polynesia': 'Pacific/Tahiti'
};

// Load travel data when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Travel data loaded successfully:', travelData);
    showPage('home'); // Show home page by default
});

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

    if (!travelData) {
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
