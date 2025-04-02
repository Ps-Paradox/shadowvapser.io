// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get sidebar elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const closeBtn = document.querySelector('.close-btn');
    const toggleSubmenus = document.querySelectorAll('.toggle-submenu');
    
    // Toggle sidebar open
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    // Toggle sidebar closed
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Toggle submenus
    toggleSubmenus.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default navigation
            const submenu = this.nextElementSibling; // Get the submenu
            
            // Close all other open submenus
            const openSubmenus = document.querySelectorAll('.submenu.active');
            openSubmenus.forEach(function(menu) {
                if (menu !== submenu) {
                    menu.classList.remove('active');
                }
            });
            
            // Toggle this submenu
            submenu.classList.toggle('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        // If side menu is active and the click is outside the menu
        if (sideMenu.classList.contains('active') && 
            !sideMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Also add this to close the menu when user navigates to a link
    const menuLinks = document.querySelectorAll('.side-menu a:not(.toggle-submenu)');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            sideMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});