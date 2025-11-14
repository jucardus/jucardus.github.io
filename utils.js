// HTML escaping function for better handling of special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Convert path to markdown path
function pathToMdPath(path) {
    if (!path) return 'index.md';

    // If path doesn't have .md extension, add it
    if (!path.endsWith('.md')) {
        path += '.md';
    }

    return path;
}

// Convert GitHub URL to clean site URL
function githubUrlToSiteUrl(githubUrl) {
    if (!githubUrl.includes('github.com')) return githubUrl;

    // Extract path from GitHub blob URL
    const match = githubUrl.match(/github\.com\/[^\/]+\/[^\/]+\/blob\/[^\/]+\/(.+\.md)/);
    if (match) {
        const mdPath = match[1];
        // Remove .md extension for clean URL
        const cleanPath = mdPath.replace(/\.md$/, '');
        return `${SITE_URL}/#${cleanPath}`;
    }

    return githubUrl;
}

// Extract relative path from GitHub URL
function extractRelativePath(url) {
    if (!url.includes('github.com')) return url;

    // Extract path from GitHub blob URL
    const match = url.match(/github\.com\/[^\/]+\/[^\/]+\/blob\/[^\/]+\/(.+\.md)/);
    if (match) {
        return match[1];
    }

    // Extract path from raw GitHub URL
    const rawMatch = url.match(/raw\.githubusercontent\.com\/[^\/]+\/[^\/]+\/[^\/]+\/(.+\.md)/);
    if (rawMatch) {
        return rawMatch[1];
    }

    return url;
}

// Get current page from URL hash
function getCurrentPage() {
    const hash = window.location.hash.substring(1);
    return pathToMdPath(hash) || 'index.md';
}

// Get current page name without path for navigation highlighting
function getCurrentPageName() {
    const path = getCurrentPage();
    // Extract just the filename from the path
    return path.includes('/') ? path.split('/').pop() : path;
}

// Convert any GitHub URL to raw URL
function toRawUrl(url) {
    if (url.includes('github.com') && url.includes('/blob/')) {
        return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
    }
    return url;
}

// Check if URL is a GitHub .md file in our repo
function isInternalLink(url) {
    return url.includes(USER) && url.includes(REPO) && url.includes('.md');
}

// Check if URL is a busca link (should open in same tab)
function isBuscaLink(url) {
    return url.includes('https://jucardus.github.io/busca') ||
           url.includes('https://jucardus.github.io/busca.html') ||
           url.includes('http://jucardus.github.io/busca.html') ||
           url.includes('http://jucardus.github.io/busca') ||
           url.includes('jucardus.github.io/busca.html') ||
           url.includes('jucardus.github.io/busca') ||
           url === 'busca' ||
           url === 'busca.html' ||
           url === './busca' ||
           url === './busca.html';
}

// Check if URL is a Twitter/X share link and modify it
function isShareLink(url) {
    return url.includes('https://x.com/intent/tweet?text=') ||
           url.includes('https://twitter.com/intent/tweet?text=');
}

// Modify share URL to use clean site URLs
function modifyShareUrl(url, currentPagePath) {
    if (!isShareLink(url)) return url;

    // Extract the text parameter from the current share URL
    const urlParams = new URLSearchParams(url.split('?')[1]);
    let text = urlParams.get('text') || '';

    // Replace GitHub URLs with clean site URLs in the text
    text = text.replace(
        /https:\/\/github\.com\/[^\/]+\/[^\/]+\/blob\/[^\/]+\/(.+\.md)/g,
        (match, mdPath) => {
            const cleanPath = mdPath.replace(/\.md$/, '');
            return `${SITE_URL}/#${cleanPath}`;
        }
    );

    // Update the text parameter
    urlParams.set('text', text);

    // Reconstruct the URL
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?${urlParams.toString()}`;
}

// Check if text looks like a navigation menu
function isNavigationMenu(text) {
    const navPatterns = [
        /inicio.*índice.*etiquetas.*actividad.*compartir/i,
        /inicio.*index.*tags.*activity.*share/i,
        /\[.*inicio.*\].*\[.*índice.*\].*\[.*etiquetas.*\].*\[.*actividad.*\].*\[.*compartir.*\]/i
    ];
    return navPatterns.some(pattern => pattern.test(text));
}

// Update page title based on h1 content
function updatePageTitle() {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        const titleText = h1Element.textContent.trim();
        document.getElementById('dynamic-title').textContent = `${titleText} | JUCARDUS.COM`;
    }
}
