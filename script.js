const filterBusiness = [
    { state: 'New York', cities: ['Buffalo', 'Rochester', 'New York City', 'Syracuse'] },
    { state: 'Ohio', cities: ['Columbus', 'Akron'] },
    { state: 'Pennsylvania', cities: ['Philadelphia', 'Pittsburgh'] },
    { state: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
    { state: 'Texas', cities: ['Houston', 'Dallas', 'Austin'] },
    // Add more states and cities as needed...
];

function createBusiness(imagePath, businessName, phoneNumber, address, city, state, zipCode) {
    const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    const mapLink = `https://maps.google.com/?q=${encodedAddress}`;
    const callButton = `<a href="tel:${phoneNumber}" class="call-button">Call</a>`;

    // Function to generate first initials of each word while excluding non-alphabetic characters
    const getInitials = (str) => str.match(/\b[a-zA-Z]/g).join('');

    // Generate alt text with first initials if business name is longer than 22 characters
    const altText = businessName.length > 10 ?
        getInitials(businessName) :
        businessName;

    return `
        <div class="business" data-state="${state}" data-city="${city}" onclick="showBusinessDetails('${businessName}', '${fullAddress}', '${phoneNumber}')">
            <div class="business-logo">
                <img src="${imagePath}" alt=" " style="width: 100%; height: 100%;">
            </div>
            <div class="business-info">
                <h3>${businessName}</h3>
                <a href="${mapLink}" target="_blank" class="map-link">Map</a>
                ${callButton}
            </div>
        </div>`;
}




function showBusinessDetails(name, location, phoneNumber) {
    alert(`Business: ${name}\nLocation: ${location}\nPhone Number: ${phoneNumber}`);
}

function createCategory(categoryName, categoryId, businesses) {
    return `
        <div class="category">
            <div class="category-header">
                <h2>${categoryName}</h2>
            </div>
            <div id="${categoryId}" class="business-container">
                ${businesses}
            </div>
        </div>`;
}

function filterByStateAndSearch(state) {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const businessContainers = document.querySelectorAll('.business-container');

    businessContainers.forEach(container => {
        const businesses = container.querySelectorAll('.business');
        businesses.forEach(business => {
            const businessState = business.dataset.state;
            const businessName = business.querySelector('.business-info h3').innerText.toLowerCase();

            if ((state === 'All' || businessState === state) && businessName.includes(searchInput)) {
                business.classList.remove('hidden');
            } else {
                business.classList.add('hidden');
            }
        });
    });

    refreshSelectState();
}

function filterByCityAndSearch(city) {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const businessContainers = document.querySelectorAll('.business-container');

    businessContainers.forEach(container => {
        const businesses = container.querySelectorAll('.business');
        businesses.forEach(business => {
            const businessCity = business.dataset.city;
            const businessName = business.querySelector('.business-info h3').innerText.toLowerCase();

            if ((businessCity === city || city === 'All') && businessName.includes(searchInput)) {
                business.classList.remove('hidden');
            } else {
                business.classList.add('hidden');
            }
        });
    });

    const citiesContainer = document.getElementById('cities-container');
    citiesContainer.innerHTML = '';

    refreshSelectState();
}

function searchBusiness() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const businessContainers = document.querySelectorAll('.business-container');

    businessContainers.forEach(container => {
        const businesses = container.querySelectorAll('.business');
        businesses.forEach(business => {
            const businessName = business.querySelector('.business-info h3').innerText.toLowerCase();

            if (businessName.includes(searchInput)) {
                business.classList.remove('hidden');
            } else {
                business.classList.add('hidden');
            }
        });
    });

    refreshSelectState();
}

function showCityButtons(state) {
    const cities = filterBusiness.find(item => item.state === state)?.cities || [];
    const citiesContainer = document.getElementById('cities-container');
    citiesContainer.innerHTML = '';
    cities.forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.classList.add('city-button');
        cityButton.innerText = city;
        cityButton.onclick = function () {
            filterByCityAndSearch(city);
        };
        citiesContainer.appendChild(cityButton);
    });
    filterByStateAndSearch(state);
}

function refreshSelectState() {
    const selectedState = document.getElementById('selected-state');
    selectedState.innerText = 'Select State';

    
}

document.addEventListener('DOMContentLoaded', function () {
  const categoriesData = [
    {
        name: 'Groceries', id: 'groceries', businesses: [
            createBusiness('https://lh3.googleusercontent.com/p/AF1QipPApJqO3q4NiRli9XWkyeOxC_9FXFkYvUWcLtWd=s680-w680-h510', 'JP International Grocery', '716-768-6002', '98 Grant St', 'Buffalo', 'New York', '14213'),
            createBusiness('path/to/logo2.jpg', 'T & T Asian Grocery', '', '2768-B, 2768 Elmwood Ave, Kenmore', 'Buffalo', 'New York', '14217'),
            createBusiness('path/to/logo3.jpg', 'Annapurna Grocery', '', '639 Lake Ave, Rochester', 'Rochester', 'New York', '14613'),
            createBusiness('path/to/logo4.jpg', 'Everest Moktan Food Market', '', '34 Lake Ave, Rochester', 'Rochester', 'New York', '14608'),
            createBusiness('path/to/logo5.jpg', 'Gorkhas Grocery Store', '', '537 State St, Rochester', 'Rochester', 'New York', '14608'),
            createBusiness('path/to/logo6.jpg', 'Nepali Store International LLC', '(315) 450-2084', '1919 Teall Ave, Syracuse', 'Syracuse', 'New York', '13206'),
            createBusiness('path/to/logo7.jpg', 'Wagle Nepali Store', '', '604 Court St, Syracuse', 'Syracuse', 'New York', '13208'),
            createBusiness('path/to/logo8.jpg', 'NAMASTE NEPAL', '(315) 372-0685', '808 N Townsend St, Syracuse', 'Syracuse', 'New York', '13203'),
            createBusiness('path/to/logo9.jpg', 'Gorkhali Bazar', '(315) 218-6910', '405 Pond St, Syracuse', 'Syracuse', 'New York', '13208'),
            createBusiness('path/to/logo10.jpg', 'Gorkhali Mart', '(234) 571-5647', '1186 E Tallmadge Ave, Akron', 'Akron', 'Ohio', '44310'),
            createBusiness('path/to/logo11.jpg', 'Lafa Store', '(234) 251-2016', '1504 Brittain Rd, Akron', 'Akron', 'Ohio', '44310'),
            createBusiness('path/to/logo12.jpg', 'Belcity Bazaar', '(234) 334-6365', '1950 Buchholzer Blvd, Akron', 'Akron', 'Ohio', '44310'),
            createBusiness('path/to/logo13.jpg', 'Himalayans Market', '(234) 334-6441', '2048 Bailey Rd, Cuyahoga Falls', 'Cuyahoga Falls', 'Ohio', '44221'),
            createBusiness('path/to/logo14.jpg', 'Dragon Asian Grocery LLC', '(330) 849-5103', '1785 Brittain Rd, Akron', 'Akron', 'Ohio', '44310'),
            createBusiness('path/to/logo15.jpg', 'Neighbours Grocery', '(330) 288-9039', '1159 E Tallmadge Ave, Akron', 'Akron', 'Ohio', '44310'),
            createBusiness('path/to/grocery16.jpg', 'Sagarmatha Grocery & Clothing LLC', '', '787 N Main St, Akron', 'OH', '44310'),
            createBusiness('path/to/grocery17.jpg', 'KOSELI CLOTHING & GIFT SHOP', '(330) 208-3063', '1911 Brittain Rd', 'Akron', 'OH', '44310'),
            // Add more grocery businesses...
        ]
    },
    {
        name: 'Fashion', id: 'fashion', businesses: [
            createBusiness('path/to/fashion1.jpg', 'Kanchenjunga Clothing Store', '(330) 201-6921', '272 E Cuyahoga Falls Ave', 'Akron', 'OH', '44310'),
            createBusiness('path/to/fashion2.jpg', 'KHUSie (Khushi) New Collection', '(832) 782-8947', '66 E Cuyahoga Falls Ave', 'Akron', 'OH', '44310'),
            createBusiness('path/to/fashion3.jpg', 'Himalayan Bazaar', '(330) 631-5742', '272 E Cuyahoga Falls Ave', 'Akron', 'OH', '44310'),
            createBusiness('path/to/fashion4.jpg', 'ROSHIKA COLLECTION LLC', '', '1311 E Tallmadge Ave', 'Akron', 'OH', '44310'),
            createBusiness('path/to/fashion5.jpg', 'Raee Boutique', '(234) 237-9642', '951 N Main St', 'Akron', 'OH', '44310'),
            createBusiness('path/to/fashion6.jpg', 'Asian Clothing & Accessories', '(716) 602-4069', '1784 Morse Rd B', 'Columbus', 'OH', '43229'),
            createBusiness('path/to/fashion7.jpg', 'KANCHI CUSTOM FASHION LLC', '(616) 264-5322', '6826 Refugee Rd', 'Canal Winchester', 'OH', '43110'),
            createBusiness('path/to/fashion8.jpg', 'Tulasha Collection. Nepali and Indian clothing Store LLC', '(315) 560-3508', '1218 Hill Rd N', 'Pickerington', 'OH', '43147'),
            createBusiness('path/to/fashion9.jpg', 'Asian fashion LLC (Nepali Clothing Store)', '(614) 598-5973', '7140 E Main St', 'Reynoldsburg', 'OH', '43068'),
            createBusiness('path/to/fashion10.jpg', 'A2Z Fashion LLC (Nepali Clothing Store)', '(614) 353-8719', '7625 E Main St', 'Reynoldsburg', 'OH', '43068'),
            // Add more fashion businesses...
        ]
    },
    {
        name: 'Jewelry', id: 'jewelry', businesses: [
            createBusiness('path/to/jewelry1.jpg', 'ROHAN (Nepali & Indian) JEWELRY', '(716) 816-8859', '155 E Tallmadge Ave', 'Akron', 'OH', '44310'),
            // Add more jewelry businesses...
        ]
    },
    {
        name: 'Insurances', id: 'insurances', businesses: [
           // createBusiness('path/to/insurance1.jpg', 'Himalayan Insurance Agency', '(330) 111-2222', '789 Oak St', 'Cleveland', 'OH', '44101'),
            // Add more insurance businesses...
        ]
    },
    {
        name: 'Restaurants', id: 'restaurants', businesses: [
           // createBusiness('path/to/restaurant1.jpg', 'Himalayan Delights', '(330) 123-4567', '123 Main St', 'Akron', 'OH', '44310'),
            // Add more restaurant businesses...
        ]
    },
    {
        name: 'Technology Startups', id: 'technologyStartups', businesses: [
           // createBusiness('path/to/techStartup1.jpg', 'Everest Tech Solutions', '(234) 987-6543', '456 Tech Blvd', 'Columbus', 'OH', '43201'),
            // Add more technology startup businesses...
        ]
    },
    {
        name: 'IT Consulting Firms', id: 'itConsultingFirms', businesses: [
          //  createBusiness('path/to/itConsulting1.jpg', 'Himalayan IT Consulting', '(330) 333-4444', '789 Main St', 'Cleveland', 'OH', '44101'),
            // Add more IT consulting firm businesses...
        ]
    },
    {
        name: 'Consulting Services', id: 'consultingServices', businesses: [
          //  createBusiness('path/to/consulting1.jpg', 'Everest Consulting', '(234) 555-6666', '456 Oak St', 'Columbus', 'OH', '43201'),
            // Add more consulting service businesses...
        ]
    },
    {
        name: 'Non-Profit Organizations', id: 'nonProfitOrganizations', businesses: [
           // createBusiness('path/to/nonProfit1.jpg', 'Himalayan Charity Foundation', '(330) 777-8888', '789 Main St', 'Cleveland', 'OH', '44101'),
            // Add more non-profit organization businesses...
        ]
    },
    {
        name: 'Travel Agencies', id: 'travelAgencies', businesses: [
           // createBusiness('path/to/travelAgency1.jpg', 'Everest Travel', '(234) 999-0000', '456 Travel Ave', 'Columbus', 'OH', '43201'),
            // Add more travel agency businesses...
        ]
    },
    {
        name: 'Import-Export Companies', id: 'importExportCompanies', businesses: [
         //   createBusiness('path/to/importExport1.jpg', 'Himalayan Imports', '(330) 111-0000', '789 Export St', 'Cleveland', 'OH', '44101'),
            // Add more import-export company businesses...
        ]
    },
    // Add more categories as needed...
];



     const categoriesContainer = document.getElementById('categories');
    const selectStateButton = document.getElementById('select-state');
    const citiesContainer = document.getElementById('cities-container');

    selectStateButton.addEventListener('click', function () {
        const states = filterBusiness.map(item => item.state);
        const stateButtons = states.map(state => `<button class="city-button" onclick="showCityButtons('${state}')">${state}</button>`);
        citiesContainer.innerHTML = '';
        citiesContainer.insertAdjacentHTML('beforeend', stateButtons.join(''));
    });

    categoriesData.forEach(categoryData => {
        const categoryHTML = createCategory(categoryData.name, categoryData.id, categoryData.businesses.join(''));
        categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
    });

    adjustBusinessWidth(); // Call the function to adjust business width

    window.addEventListener('resize', function () {
        adjustBusinessWidth(); // Adjust business width on window resize
    });

    function adjustBusinessWidth() {
        const businessContainers = document.querySelectorAll('.business-container');
        let maxWordLength = 0;

        businessContainers.forEach(container => {
            const businesses = container.querySelectorAll('.business');

            businesses.forEach(business => {
                const businessName = business.querySelector('.business-info h3').innerText;
                const words = businessName.split(' ');
                const maxLength = Math.max(...words.map(word => word.length));

                maxWordLength = Math.max(maxWordLength, maxLength);
            });
        });

        // Set the width for all .business elements based on the length of the longest word
        const businessElements = document.querySelectorAll('.business');
        businessElements.forEach(business => {
            business.style.width = `${maxWordLength * 10}px`; // You can adjust the multiplier as needed
        });
    }
});
