// gaming-news.js
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const sideMenu = document.querySelector('.side-menu');

    if (menuToggle && closeBtn && sideMenu) {
        // Open sidebar
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
        });

        // Close sidebar
        closeBtn.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }

    // Submenu toggle functionality
    document.querySelectorAll('.toggle-submenu').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                const isVisible = submenu.style.display === 'block';
                // Close all other submenus and remove active class
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.style.display = 'none';
                });
                document.querySelectorAll('.toggle-submenu').forEach(t => {
                    t.classList.remove('active');
                });
                // Toggle the clicked submenu
                submenu.style.display = isVisible ? 'none' : 'block';
                toggle.classList.toggle('active', !isVisible);
            }
        });
    });
});