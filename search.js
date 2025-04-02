document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.querySelectorAll('.search-results .news-card');

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();

        searchResults.forEach(result => {
            const title = result.querySelector('h3').textContent.toLowerCase();
            const description = result.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || description.includes(query) || query === '') {
                result.style.display = 'block';
            } else {
                result.style.display = 'none';
            }
        });
    };

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Search as user types
    searchInput.addEventListener('input', performSearch);
});