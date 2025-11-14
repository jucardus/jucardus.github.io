// Load a page
async function loadPage(url) {
    const contentDiv = document.getElementById('content');

    try {
        let fetchUrl;
        if (url.startsWith('http')) {
            fetchUrl = toRawUrl(url);
        } else {
            // For relative paths, construct the full URL
            fetchUrl = BASE_URL + url;
        }

        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const markdown = await response.text();

        contentDiv.innerHTML = renderMarkdown(markdown, url);

        // Update page title based on h1 content
        updatePageTitle();

        // Update URL hash
        window.location.hash = url.startsWith('http') ? extractRelativePath(url) : url;

        // Highlight active navigation after content is rendered
        setTimeout(highlightActiveNav, 0);

        // Scroll to top after loading new page
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Error:', error);
        contentDiv.innerHTML = `
            <center><big>La página <b>${url}</b> ha sido eliminada o nunca existió.<br><br>
            <big><a href="#" onclick="loadPage('index.md')"><b>Volver al inicio</b></a></big></big></center>
        `;
        // Scroll to top on error too
        window.scrollTo(0, 0);
    }
}

// Handle link clicks
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        const url = e.target.getAttribute('data-url');
        if (url) {
            e.preventDefault();
            loadPage(url);
        }
    }
});

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    loadPage(getCurrentPage());
});

// Start the app
loadPage(getCurrentPage());
