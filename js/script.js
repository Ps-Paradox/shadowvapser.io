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

function searchTools() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    const filteredTools = tools.filter(tool => 
        tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
    );
    displayTools(filteredTools);
}

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

function toggleSideMenu() {
    const sideMenu = document.querySelector('.side-menu');
    if (sideMenu) {
        sideMenu.classList.toggle('active');
    }
}

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

function initParticles() {
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
}

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

function likePost(button) {
    let likes = parseInt(button.textContent) || 0;
    likes++;
    button.textContent = `${likes} Likes`;
}

function commentPost(button) {
    let comments = parseInt(button.textContent) || 0;
    comments++;
    button.textContent = `${comments} Comments`;
}

function initScrollAnimations() {
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
}

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

function loadLatestContent() {
    console.log("Loading latest content for landing page...");
}

function toggleLoginModal() {
    console.log("Toggling login modal...");
}

document.addEventListener("DOMContentLoaded", () => {
    initAIToolsPage();
    initSearchPage();
    loadLatestContent();
    initParticles();
    initScrollAnimations();
    initLoadingAnimation();

    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const loginLink = document.querySelector(".login a");

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSideMenu);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSideMenu);
    }
    if (loginLink) {
        loginLink.addEventListener("click", (e) => {
            e.preventDefault();
            toggleLoginModal();
        });
    }

    setupSubmenuToggles();
    setupSubmenuLinks();
});

const e3Date = new Date('June 10, 2025 09:00:00').getTime();
const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = e3Date - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('e3-timer').textContent = `${days}d ${hours}h ${minutes}m`;
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('e3-timer').textContent = 'Event Started!';
    }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
    // Loading Animation
    setTimeout(() => {
        document.querySelector('.loading-overlay').style.display = 'none';
    }, 2000);

    // GSAP Animations for Hero Section
    gsap.from('.hero h2', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.hero p', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero .cta a', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 1,
        ease: 'back.out(1.7)'
    });

    gsap.from('.hero .social-icons a', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // GSAP Animations for News Cards
    gsap.from('.news-card', {
        scrollTrigger: {
            trigger: '#news-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // GSAP Animation for Trending Sidebar
    gsap.from('.trending li', {
        scrollTrigger: {
            trigger: '.trending',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // GSAP Animation for Community Goals
    gsap.from('.goals-content p, .goals-content ul li', {
        scrollTrigger: {
            trigger: '.community-goals',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // GSAP Animation for Other Sections
    const sections = ['#personalized', '#forums', '#ai-tools', '#social-links'];
    sections.forEach(section => {
        gsap.from(`${section} .card`, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    // Category Filter
    window.filterCategory = (category) => {
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
    };

    // Like and Comment Functions
    window.likePost = (button) => {
        let likes = parseInt(button.textContent) || 0;
        button.textContent = `${likes + 1} Likes`;
    };

    window.commentPost = (button) => {
        let comments = parseInt(button.textContent) || 0;
        button.textContent = `${comments + 1} Comments`;
    };

    // Search Function for Ending Section
    window.searchSiteFromEnding = () => {
        const query = document.getElementById('ending-search-input').value;
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    };

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});