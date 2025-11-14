// Highlight active navigation link
function highlightActiveNav() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.sticky-nav a');

    console.log('Current page:', currentPage);

    // First, remove all active classes
    navLinks.forEach(link => {
        link.classList.remove('nav-active');
    });

    // Then, add active class to the appropriate link
    navLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase().trim();
        console.log('Checking link:', linkText, 'for page:', currentPage);

        // Check each navigation mapping
        for (const [page, keywords] of Object.entries(NAV_MAPPING)) {
            if (page === currentPage && keywords.includes(linkText)) {
                console.log('Highlighting:', linkText, 'for page:', currentPage);
                link.classList.add('nav-active');
                break;
            }
        }
    });
}
