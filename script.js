// Data for tools and site content
const tools = [
    { name: "AI Writer", desc: "A tool for generating high-quality text content effortlessly.", url: "https://example.com/ai-writer", category: "AI Tools" },
    { name: "ImageGenix", desc: "Create stunning visuals with AI-powered image generation.", url: "https://example.com/imagegenix", category: "AI Tools" },
    { name: "CodeBot", desc: "Automate coding tasks with this intelligent assistant.", url: "https://example.com/codebot", category: "AI Tools" },
    { name: "VoiceCraft", desc: "Generate realistic voiceovers using advanced AI technology.", url: "https://example.com/voicecraft", category: "AI Tools" }
];

const siteContent = [
    { title: "AI Breakthrough in 2025", desc: "New AI model outperforms predecessors in natural language tasks.", url: "ai-news.html", category: "AI News" },
    { title: "Next-Gen Console Launch", desc: "Tech giant unveils a futuristic gaming console with AI integration.", url: "gaming-news.html", category: "Gaming News" },
    { title: "AI Ethics Debate", desc: "50 replies | Join the debate on AI ethics and its future impact.", url: "community.html", category: "Community" },
    ...tools
];

// Display AI tools in the AI Tools section
function displayTools(toolArray) {
    const toolList = document.getElementById("toolList");
    if (!toolList) return;
    toolList.innerHTML = "";
    toolArray.forEach(tool => {
        const div = document.createElement("div");
        div.className = "tool-card";
        div.innerHTML = `<h3>${tool.name}</h3><p>${tool.desc}</p><a href="${tool.url}" target="_blank">Visit Site</a>`;
        toolList.appendChild(div);
    });
}

// Search AI tools
function searchTools() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    const filteredTools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
    );
    displayTools(filteredTools);
}

// Display search results for the site
function displaySearchResults(results) {
    const searchResultsList = document.getElementById("searchResultsList");
    if (!searchResultsList) return;
    searchResultsList.innerHTML = "";
    results.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${item.title || item.name}</h3><p>${item.desc}</p><p>Category: ${item.category}</p><div class="cta"><a href="${item.url}">View</a></div>`;
        searchResultsList.appendChild(div);
    });
}

// Search the site
function searchSite() {
    const searchInput = document.getElementById("siteSearchInput");
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    const filteredResults = siteContent.filter(item => 
        (item.title || item.name).toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    displaySearchResults(filteredResults);
}

// Search from the ending section
function searchSiteFromEnding() {
    const searchInput = document.getElementById("ending-search-input");
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    const filteredResults = siteContent.filter(item => 
        (item.title || item.name).toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    displaySearchResults(filteredResults);
    window.location.href = "search.html"; // Redirect to search page
}

// Toggle the side menu
function toggleSideMenu() {
    console.log("Toggling side menu...");
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu) {
        console.log("Side menu found, toggling active class...");
        sideMenu.classList.toggle('active');
    } else {
        console.log("Side menu not found!");
    }
}

// Set up submenu toggles
function setupSubmenuToggles() {
    const toggleSubmenus = document.querySelectorAll('.toggle-submenu');
    toggleSubmenus.forEach(toggle => {
        toggle.addEventListener('click', event => {
            event.preventDefault();
            const submenu = toggle.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
                toggle.classList.toggle('active');
            }
        });
    });
}

// Close side menu when clicking submenu links
function setupSubmenuLinks() {
    const submenuLinks = document.querySelectorAll('.side-menu .submenu a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sideMenu = document.querySelector('.side-menu');
            if (sideMenu) {
                sideMenu.classList.remove('active');
            }
        });
    });
}

// Initialize Particles.js for the hero section
function initParticles() {
    try {
        if (typeof particlesJS === 'undefined') {
            console.error("Particles.js not loaded. Ensure the script is included and you're running on a local server to avoid CORS issues.");
            return;
        }
        if (document.getElementById("particles-js")) {
            particlesJS("particles-js", {
                particles: {
                    number: { value: 120, density: { enable: true, value_area: 600 } },
                    color: { value: ['#ff003c', '#00f0ff'] },
                    shape: { type: 'circle' },
                    opacity: { value: 0.6, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: '#00f0ff', opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                    modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
        }
    } catch (error) {
        console.error("Error initializing particles:", error);
    }
}

// Filter news cards by category
function filterCategory(category) {
    const cards = document.querySelectorAll('.news-card');
    const tabs = document.querySelectorAll('.category-tabs .tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Like a post
function likePost(button) {
    let likes = parseInt(button.textContent) || 0;
    likes++;
    button.textContent = `${likes} Likes`;
}

// Comment on a post
function commentPost(button) {
    let comments = parseInt(button.textContent) || 0;
    comments++;
    button.textContent = `${comments} Comments`;
}

// Initialize scroll animations with GSAP
function initScrollAnimations() {
    try {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error("GSAP or ScrollTrigger not loaded.");
            return;
        }
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections
        gsap.utils.toArray('section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Animate news cards
        gsap.utils.toArray('.news-card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });

        // Animate cards in other sections
        gsap.utils.toArray('.card').forEach((card, i) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });
    } catch (error) {
        console.error("Error initializing scroll animations:", error);
    }
}

// Initialize loading animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    });
}

// Toggle the login modal
function toggleLoginModal() {
    console.log("Toggling login modal...");
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Initialize AI Tools page
function initAIToolsPage() {
    if (document.getElementById("toolList")) {
        displayTools(tools);
        const searchButton = document.querySelector(".search-section button");
        if (searchButton) searchButton.addEventListener("click", searchTools);
        const searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") searchTools();
        });
    }
}

// Initialize Search page
function initSearchPage() {
    if (document.getElementById("siteSearchInput")) {
        const searchButton = document.querySelector(".search-section button");
        if (searchButton) searchButton.addEventListener("click", searchSite);
        const searchInput = document.getElementById("siteSearchInput");
        if (searchInput) searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") searchSite();
        });
    }
}

// Load latest content (placeholder)
function loadLatestContent() {
    console.log("Loading latest content for landing page...");
}

// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded, setting up event listeners...");

    // Initialize pages and features
    initAIToolsPage();
    initSearchPage();
    loadLatestContent();
    initParticles();
    initScrollAnimations();
    initLoadingAnimation();

    // Setup side menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    if (menuToggle) {
        console.log("Menu toggle found, adding event listener...");
        menuToggle.addEventListener('click', toggleSideMenu);
    } else {
        console.log("Menu toggle not found!");
    }
    if (closeBtn) {
        console.log("Close button found, adding event listener...");
        closeBtn.addEventListener('click', toggleSideMenu);
    } else {
        console.log("Close button not found!");
    }

    // Setup login modal toggle
    const loginLink = document.querySelector(".login a");
    if (loginLink) {
        console.log("Login link found, adding event listener...");
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            toggleLoginModal();
        });
    } else {
        console.log("Login link not found!");
    }

    // Close login modal when clicking outside
    const modal = document.getElementById('loginModal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Setup submenu toggles and links
    setupSubmenuToggles();
    setupSubmenuLinks();
});

