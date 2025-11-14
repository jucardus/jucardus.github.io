// Escape script tags in code content to prevent them from being executed
function escapeScriptTags(text) {
    return text.replace(/<script\b[^>]*>/gi, '&lt;script&gt;')
               .replace(/<\/script\s*>/gi, '&lt;/script&gt;');
}

// Process blockquotes
function processBlockquotes(text) {
    const lines = text.split('\n');
    let inBlockquote = false;
    let blockquoteContent = '';
    let result = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('> ')) {
            if (!inBlockquote) {
                inBlockquote = true;
                blockquoteContent = line.substring(2);
            } else {
                blockquoteContent += '<br>' + line.substring(2);
            }
        } else {
            if (inBlockquote) {
                result += `<blockquote>${blockquoteContent}</blockquote>`;
                inBlockquote = false;
                blockquoteContent = '';
            }
            result += line + '\n';
        }
    }

    // Close any open blockquote at the end
    if (inBlockquote) {
        result += `<blockquote>${blockquoteContent}</blockquote>`;
    }

    return result;
}

// Process images with custom styling
function processImages(text, currentPath) {
    return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, altText, imageUrl) {
        let fullImageUrl = imageUrl;

        // Handle relative image paths
        if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || !imageUrl.includes('://')) {
            const baseDir = currentPath.includes('/')
                ? currentPath.substring(0, currentPath.lastIndexOf('/') + 1)
                : '';

            if (imageUrl.startsWith('./')) {
                fullImageUrl = BASE_URL + baseDir + imageUrl.substring(2);
            } else if (imageUrl.startsWith('../')) {
                let path = baseDir;
                let relPath = imageUrl;
                while (relPath.startsWith('../')) {
                    path = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
                    relPath = relPath.substring(3);
                }
                fullImageUrl = BASE_URL + path + relPath;
            } else if (!imageUrl.includes('://')) {
                fullImageUrl = BASE_URL + baseDir + imageUrl;
            }
        }

        return `<div id="imagenes"><img src="${fullImageUrl}" alt="${altText}" class="imagenes"></div>`;
    });
}

// Process code blocks with ``` delimiters - with HTML escaping
function processCodeBlocks(text) {
    let result = '';
    let i = 0;
    let inCodeBlock = false;
    let codeContent = '';
    let language = '';

    while (i < text.length) {
        // Look for code block delimiters ```
        if (text[i] === '`' && i + 2 < text.length && text[i + 1] === '`' && text[i + 2] === '`') {
            if (!inCodeBlock) {
                // Start of code block - check for language specification
                inCodeBlock = true;
                i += 3;

                // Check if there's a language specified after ```
                let langStart = i;
                while (i < text.length && text[i] !== '\n') {
                    i++;
                }
                language = text.substring(langStart, i).trim();

                // Skip the newline character
                if (i < text.length && text[i] === '\n') {
                    i++;
                }

                codeContent = '';
            } else {
                // End of code block
                inCodeBlock = false;

                // HTML escape the code content and escape script tags
                const escapedContent = escapeScriptTags(escapeHtml(codeContent));

                // Apply syntax highlighting with Highlight.js
                const codeElement = document.createElement('code');
                if (language) {
                    codeElement.className = `language-${language}`;
                }
                codeElement.textContent = escapedContent;

                // Apply syntax highlighting
                hljs.highlightElement(codeElement);

                result += `<pre>${codeElement.outerHTML}</pre>`;
                i += 3;
            }
            continue;
        }

        if (inCodeBlock) {
            // Collect code content
            codeContent += text[i];
            i++;
        } else {
            // Regular text
            result += text[i];
            i++;
        }
    }

    // If we're still in a code block at the end, close it
    if (inCodeBlock) {
        // HTML escape the code content and escape script tags
        const escapedContent = escapeScriptTags(escapeHtml(codeContent));

        // Apply syntax highlighting with Highlight.js
        const codeElement = document.createElement('code');
        if (language) {
            codeElement.className = `language-${language}`;
        }
        codeElement.textContent = escapedContent;

        // Apply syntax highlighting
        hljs.highlightElement(codeElement);

        result += `<pre>${codeElement.outerHTML}</pre>`;
    }

    return result;
}

// Process text formatting in correct order
function processTextFormatting(text) {
    let result = text;

    // Process in correct order:
    // 1. ***bold-italic***, 2. **bold**, 3. *italic*, 4. _italic_

    // 1. Bold-italic (***text***)
    result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');

    // 2. Bold (**text**)
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 3. Italic (*text*)
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 4. Robust italic with underscores (_text_)
    result = result.replace(/(^|\s|\(|\[|\{|\<|«|"|'|—|–|:)(_[^_]+_)(?=$|\s|\)|\]|\}|\>|»|"|'|,|;|\.|\?|!|:|—|–)/g,
        function(match, before, italicText) {
            // Extract the actual text between underscores
            const textContent = italicText.substring(1, italicText.length - 1);
            return before + '<em>' + textContent + '</em>';
        }
    );

    return result;
}

// Process links in text - handles nested brackets
function processLinks(text, basePath, currentPagePath) {
    let result = '';
    let i = 0;

    while (i < text.length) {
        // Look for the start of a link
        if (text[i] === '[' && i + 1 < text.length) {
            let bracketCount = 1;
            let j = i + 1;

            // Find the matching closing bracket for the link text
            while (j < text.length && bracketCount > 0) {
                if (text[j] === '[') bracketCount++;
                if (text[j] === ']') bracketCount--;
                j++;
            }

            // If we found the closing bracket, look for the URL part
            if (bracketCount === 0 && j < text.length && text[j] === '(') {
                let k = j + 1;
                let parenCount = 1;

                // Find the matching closing parenthesis for the URL
                while (k < text.length && parenCount > 0) {
                    if (text[k] === '(') parenCount++;
                    if (text[k] === ')') parenCount--;
                    k++;
                }

                if (parenCount === 0) {
                    // Extract link text and URL
                    const linkText = text.substring(i + 1, j - 1);
                    let url = text.substring(j + 1, k - 1);

                    // Check for share links FIRST (before any URL processing)
                    if (isShareLink(url)) {
                        // Modify share URL to use clean site URLs
                        const modifiedUrl = modifyShareUrl(url, currentPagePath);
                        result += `<a href="${modifiedUrl}" target="_blank" rel="noopener noreferrer nofollow external">${linkText}</a>`;
                        i = k;
                        continue;
                    }

                    let fullUrl = url;

                    // Handle relative URLs
                    if (url.startsWith('./') || url.startsWith('../') || !url.includes('://')) {
                        const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
                        if (url.startsWith('./')) {
                            fullUrl = BASE_URL + baseDir + url.substring(2);
                        } else if (url.startsWith('../')) {
                            let path = baseDir;
                            let relPath = url;
                            while (relPath.startsWith('../')) {
                                path = path.substring(0, path.lastIndexOf('/', path.length - 2) + 1);
                                relPath = relPath.substring(3);
                            }
                            fullUrl = BASE_URL + path + relPath;
                        } else if (!url.includes('://')) {
                            fullUrl = BASE_URL + baseDir + url;
                        }
                    }

                    // Check for busca links - should open in same tab without target="_blank"
                    if (isBuscaLink(url)) {
                        result += `<a href="${url}">${linkText}</a>`;
                    } else if (isInternalLink(fullUrl)) {
                        // Store only the relative path in data-url
                        const relativePath = extractRelativePath(fullUrl);
                        result += `<a href="#" data-url="${relativePath}">${linkText}</a>`;
                    } else {
                        result += `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow external">${linkText}</a>`;
                    }

                    i = k;
                    continue;
                }
            }
        }

        // If not a link, just add the character
        result += text[i];
        i++;
    }

    return result;
}

// Add page separator to content
function addPageSeparator(html) {
    return html + '<div class="page-separator">~ • ~</div>';
}

// Simple markdown to HTML converter
function renderMarkdown(text, currentPath) {
    const basePath = currentPath.includes('/')
        ? currentPath.substring(0, currentPath.lastIndexOf('/') + 1)
        : '';

    let html = text;

    // Process blockquotes FIRST
    html = processBlockquotes(html);

    // Process code blocks SECOND
    html = processCodeBlocks(html);

    // Process images THIRD
    html = processImages(html, currentPath);

    // Process ALL links (pass currentPath for share URL modification)
    html = processLinks(html, basePath, currentPath);

    // Convert headers
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Process text formatting AFTER links and code blocks
    html = processTextFormatting(html);

    // Convert lists and handle paragraphs
    const lines = html.split('\n');
    let inList = false;
    let inParagraph = false;
    let newHtml = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Skip processing for lines inside pre tags (code blocks) or blockquotes
        if (line.includes('<pre>') || line.includes('<blockquote>') ||
            (inParagraph && (line.includes('</pre>') || line.includes('</blockquote>')))) {
            if (inParagraph) {
                newHtml += '</p>';
                inParagraph = false;
            }
            if (inList) {
                newHtml += '</ul>';
                inList = false;
            }
            newHtml += line;
            continue;
        }

        // Handle headers - they break paragraphs
        if (trimmedLine.startsWith('<h1>') || trimmedLine.startsWith('<h2>') || trimmedLine.startsWith('<h3>')) {
            if (inParagraph) {
                newHtml += '</p>';
                inParagraph = false;
            }
            if (inList) {
                newHtml += '</ul>';
                inList = false;
            }
            newHtml += line;
            continue;
        }

        // Handle list items (look for * at start of line)
        if (line.startsWith('* ') && !line.startsWith('* *')) {
            if (inParagraph) {
                newHtml += '</p>';
                inParagraph = false;
            }

            if (!inList) {
                newHtml += '<ul>';
                inList = true;
            }
            // Convert the list item
            let listItem = line.substring(2);
            newHtml += `<li>${listItem}</li>`;
            continue;
        }

        // Handle empty lines (paragraph breaks)
        if (trimmedLine === '') {
            if (inParagraph) {
                newHtml += '</p>';
                inParagraph = false;
            }
            if (inList) {
                newHtml += '</ul>';
                inList = false;
            }
            newHtml += '<br>'; // Blank line
            continue;
        }

        // Check if this line is a navigation menu and wrap it
        let processedLine = line;
        if (isNavigationMenu(line)) {
            processedLine = `<div class="sticky-nav">${line}</div>`;
        }

        // Handle regular text (start or continue paragraph)
        if (!inParagraph) {
            newHtml += '<p>';
            inParagraph = true;
        } else {
            newHtml += '<br>'; // Line break within paragraph
        }
        newHtml += processedLine;
    }

    // Close any open tags
    if (inParagraph) {
        newHtml += '</p>';
    }
    if (inList) {
        newHtml += '</ul>';
    }

    // Add page separator at the end
    newHtml = addPageSeparator(newHtml);

    return newHtml;
}
