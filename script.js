let allEntries = [];
let currentStartIndex = 0;
const entriesPerPage = 10;
let currentView = 'home';

async function loadEntries() {
    try {
        const response = await fetch('https://jucardus.github.io/base.csv');
        const csvData = await response.text();
        allEntries = parseCSV(csvData);
        showHome();
    } catch (error) {
        console.error('Error loading the CSV file:', error);
        document.getElementById('entries-container').innerHTML = 
            '<p>Error loading entries. Please try again later.</p>';
    }
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',').map(h => h.trim());
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const obj = {};
        let currentline = lines[i];
        
        const regex = /(?:,|^)("(?:(?:"")*[^"]*)*"|[^,]*)/g;
        let matches;
        const fields = [];
        
        while ((matches = regex.exec(currentline)) !== null) {
            let field = matches[1];
            if (field.startsWith('"') && field.endsWith('"')) {
                field = field.slice(1, -1).replace(/""/g, '"');
            }
            fields.push(field.trim());
        }
        
        for (let j = 0; j < headers.length; j++) {
            let value = fields[j] || '';
            
            if (headers[j] === 'TÍTULO' && !value && fields[3]) {
                value = fields[3].substring(0, 40);
                if (fields[3].length > 40) value += '...';
            }
            
            obj[headers[j]] = value;
        }
        
        result.push(obj);
    }
    
    return result;
}

function showHome() {
    currentView = 'home';
    currentStartIndex = 0;
    document.getElementById('main-title').textContent = 'Jucardus.com';
    document.getElementById('search-container').style.display = 'none';
    displayCurrentEntries();
    scrollToTop();
}

function showAZ() {
    currentView = 'az';
    document.getElementById('main-title').textContent = 'Índice alfabético';
    document.getElementById('search-container').style.display = 'none';
    
    const sortedEntries = [...allEntries].sort((a, b) => {
        const cleanTitleA = (a['TÍTULO'] || '').replace(/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, '');
        const cleanTitleB = (b['TÍTULO'] || '').replace(/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, '');
        return cleanTitleA.localeCompare(cleanTitleB, 'es', { sensitivity: 'base' });
    });
    
    const container = document.getElementById('entries-container');
    container.innerHTML = `
        <div class="list-view">
            <h2>De la A a la Z</h2>
            <ul>
                ${sortedEntries.map(entry => `
                    <li onclick="showSingleEntry('${entry['']}')">
                        ${entry['TÍTULO'] || 'Untitled'}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function showRandom() {
    currentView = 'random';
    document.getElementById('main-title').textContent = 'Entradas al azar';
    document.getElementById('search-container').style.display = 'none';
    
    const randomEntries = [];
    const indices = new Set();
    while (randomEntries.length < 3 && randomEntries.length < allEntries.length) {
        const randomIndex = Math.floor(Math.random() * allEntries.length);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            randomEntries.push(allEntries[randomIndex]);
        }
    }
    
    const container = document.getElementById('entries-container');
    container.innerHTML = `
        <div class="list-view">
            <h2>Selección al azar</h2>
            <ul>
                ${randomEntries.map(entry => `
                    <li onclick="showSingleEntry('${entry['']}')">
                        ${entry['TÍTULO'] || 'Untitled'}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function showArchive() {
    currentView = 'archive';
    document.getElementById('main-title').textContent = 'Archivo por fecha';
    document.getElementById('search-container').style.display = 'none';
    
    const groupedEntries = {};
    
    allEntries.forEach(entry => {
        if (!entry['FECHA']) return;
        
        const dateOnly = entry['FECHA'].split(' ')[0];
        const dateParts = dateOnly.split('-');
        if (dateParts.length < 3) return;
        
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        if (!groupedEntries[year]) {
            groupedEntries[year] = {};
        }
        if (!groupedEntries[year][month]) {
            groupedEntries[year][month] = {};
        }
        if (!groupedEntries[year][month][day]) {
            groupedEntries[year][month][day] = [];
        }
        
        groupedEntries[year][month][day].push(entry);
    });
    
    const sortedYears = Object.keys(groupedEntries).sort((a, b) => a - b);
    
    let archiveHTML = '<div class="list-view"><h2>Entradas por fecha (antiguas al inicio)</h2>';
    
    sortedYears.forEach(year => {
        archiveHTML += `<div class="archive-year"><h3>${year}</h3>`;
        
        const sortedMonths = Object.keys(groupedEntries[year]).sort((a, b) => a - b);
        
        sortedMonths.forEach(month => {
            archiveHTML += `<div class="archive-month"><h4>${getMonthName(month)}</h4>`;
            
            const sortedDays = Object.keys(groupedEntries[year][month]).sort((a, b) => a - b);
            
            sortedDays.forEach(day => {
                archiveHTML += `<div class="archive-day"><h5>${day}</h5>`;
                archiveHTML += `<ul style="list-style-type: none; padding-left: 20px;">`;
                
                groupedEntries[year][month][day].forEach(entry => {
                    archiveHTML += `
                        <li class="archive-entry" onclick="showSingleEntry('${entry['']}')">
                            ${entry['TÍTULO'] || 'Untitled'}
                        </li>
                    `;
                });
                
                archiveHTML += `</ul></div>`;
            });
            
            archiveHTML += '</div>';
        });
        
        archiveHTML += '</div>';
    });
    
    archiveHTML += '</div>';
    
    const container = document.getElementById('entries-container');
    container.innerHTML = archiveHTML;
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function getMonthName(monthNumber) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[parseInt(monthNumber) - 1] || monthNumber;
}

function showTags() {
    currentView = 'tags';
    document.getElementById('main-title').textContent = 'Todas las etiquetas';
    document.getElementById('search-container').style.display = 'none';
    
    const tags = new Set();
    allEntries.forEach(entry => {
        if (entry['TEMA']) {
            tags.add(entry['TEMA']);
        }
    });
    
    const sortedTags = Array.from(tags).sort();
    
    const container = document.getElementById('entries-container');
    container.innerHTML = `
        <div class="list-view">
            <h2>Todas las etiquetas</h2>
            <ul>
                ${sortedTags.map(tag => `
                    <li onclick="showEntriesByTag('${tag}')">
                        ${tag}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'block') {
        searchContainer.style.display = 'none';
        showHome();
    } else {
        searchContainer.style.display = 'block';
        document.getElementById('main-title').textContent = 'Búsqueda';
        document.getElementById('entries-container').innerHTML = '';
        document.querySelector('.nav-buttons').style.display = 'none';
        document.getElementById('search-box').value = '';
        document.getElementById('search-box').focus();
        scrollToTop();
    }
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        const searchBox = document.getElementById('search-box');
        const searchTerm = searchBox.value.toLowerCase();
        
        document.getElementById('search-container').style.display = 'none';
        searchBox.value = '';
        
        if (searchTerm.trim() === '') {
            showHome();
            return;
        }
        
        const results = allEntries.filter(entry => {
            return (
                (entry['TÍTULO'] && entry['TÍTULO'].toLowerCase().includes(searchTerm)) ||
                (entry['CONTENIDO'] && entry['CONTENIDO'].toLowerCase().includes(searchTerm)) ||
                (entry['TEMA'] && entry['TEMA'].toLowerCase().includes(searchTerm))
            );
        });
        
        document.getElementById('main-title').textContent = `Búsqueda: «${searchTerm}»`;
        
        const container = document.getElementById('entries-container');
        if (results.length === 0) {
            container.innerHTML = '<p class="no-results">Ninguna coincidencia.</p>';
        } else {
            const resultsText = results.length === 1 ? 
                'Se encontró 1 entrada' : 
                `Se encontraron ${results.length} entradas`;
            
            container.innerHTML = `
                <div class="list-view">
                    <h2>${resultsText}</h2>
                    <ul>
                        ${results.map(entry => `
                            <li onclick="showSingleEntry('${entry['']}')">
                                ${entry['TÍTULO'] || 'Untitled'}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
        
        scrollToTop();
    }
}

function loadNextEntries() {
    currentStartIndex += entriesPerPage;
    displayCurrentEntries();
    scrollToTop();
}

function loadPrevEntries() {
    currentStartIndex -= entriesPerPage;
    displayCurrentEntries();
    scrollToTop();
}

function displayCurrentEntries() {
    const currentEntries = allEntries.slice(currentStartIndex, currentStartIndex + entriesPerPage);
    displayEntries(currentEntries);
    
    document.getElementById('prev-button').disabled = currentStartIndex === 0;
    document.getElementById('next-button').disabled = currentStartIndex + entriesPerPage >= allEntries.length;
    document.querySelector('.nav-buttons').style.display = 'flex';
}

function displayEntries(entries, filterType = null, filterValue = null) {
    if (currentView !== 'home') return;
    
    const container = document.getElementById('entries-container');
    container.innerHTML = '';
    
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        
        const title = document.createElement('h2');
        title.textContent = entry['TÍTULO'] || '';
        title.onclick = () => showSingleEntry(entry['']);
        
        const meta = document.createElement('div');
        meta.className = 'meta';
        
        const rowNumber = entry[''] ? `<span class="non-clickable">${entry['']}</span>` : '';
        const tema = entry['TEMA'] ? `<span class="clickable" onclick="showEntriesByTag('${entry['TEMA']}')">${entry['TEMA']}</span>` : '';
        const fecha = entry['FECHA'] ? `<span class="non-clickable">${entry['FECHA']}</span>` : '';
        
        meta.innerHTML = [
            rowNumber,
            tema,
            fecha
        ].filter(Boolean).join(' | ');
        
        const content = document.createElement('div');
        const processedContent = processContent(entry['CONTENIDO']);
        if (processedContent) {
            content.innerHTML = processedContent;
        }
        
        const link = document.createElement('p');
        if (entry['ENLACE']) {
            const linkAnchor = document.createElement('a');
            linkAnchor.href = entry['ENLACE'];
            linkAnchor.textContent = extractDomain(entry['ENLACE']);
            linkAnchor.target = '_blank';
            linkAnchor.rel = 'noopener noreferrer';
            link.appendChild(linkAnchor);
        }
        
        const imageContainer = document.createElement('div');
        if (entry['IMAGEN']) {
            const img = document.createElement('img');
            img.src = entry['IMAGEN'];
            img.alt = entry['TÍTULO'] || 'Entry image';
            imageContainer.appendChild(img);
        }
        
        entryDiv.appendChild(title);
        if (rowNumber || tema || fecha) {
            entryDiv.appendChild(meta);
        }
        if (processedContent) {
            entryDiv.appendChild(content);
        }
        if (entry['ENLACE']) {
            entryDiv.appendChild(link);
        }
        if (entry['IMAGEN']) {
            entryDiv.appendChild(imageContainer);
        }
        
        container.appendChild(entryDiv);
    });
}

function showEntriesByTag(tag) {
    currentView = 'tag';
    const filtered = allEntries.filter(entry => entry['TEMA'] === tag);
    document.getElementById('main-title').textContent = `Entradas con la etiqueta «${tag}»`;
    document.getElementById('search-container').style.display = 'none';
    
    const container = document.getElementById('entries-container');
    container.innerHTML = `
        <div class="list-view">
            <h2>Entradas etiquetadas con «${tag}»</h2>
            <ul>
                ${filtered.map(entry => `
                    <li onclick="showSingleEntry('${entry['']}')">
                        ${entry['TÍTULO'] || 'Untitled'}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function extractDomain(url) {
    try {
        const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
        return domain.startsWith('www.') ? domain : domain;
    } catch {
        return url;
    }
}

function processContent(content) {
    if (!content) return '';
    
    let processed = content
        .replace(/¶/g, '</p><p>')
        .replace(/¦/g, '<br>');
    
    if (!processed.startsWith('<p>')) processed = '<p>' + processed;
    if (!processed.endsWith('</p>')) processed = processed + '</p>';
    
    return processed;
}

function showSingleEntry(rowNumber) {
    currentView = 'single';
    const entry = allEntries.find(e => e[''] === rowNumber);
    if (entry) {
        document.getElementById('main-title').textContent = entry['TÍTULO'] || 'Entry';
        document.getElementById('search-container').style.display = 'none';
        
        const container = document.getElementById('entries-container');
        container.innerHTML = '';
        
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry single-entry';
        
        const meta = document.createElement('div');
        meta.className = 'meta';
        
        const rowNumberSpan = entry[''] ? `<span class="non-clickable">${entry['']}</span>` : '';
        const tema = entry['TEMA'] ? `<span class="clickable" onclick="showEntriesByTag('${entry['TEMA']}')">${entry['TEMA']}</span>` : '';
        const fecha = entry['FECHA'] ? `<span class="non-clickable">${entry['FECHA']}</span>` : '';
        
        meta.innerHTML = [
            rowNumberSpan,
            tema,
            fecha
        ].filter(Boolean).join(' | ');
        
        const content = document.createElement('div');
        const processedContent = processContent(entry['CONTENIDO']);
        if (processedContent) {
            content.innerHTML = processedContent;
        }
        
        const link = document.createElement('p');
        if (entry['ENLACE']) {
            const linkAnchor = document.createElement('a');
            linkAnchor.href = entry['ENLACE'];
            linkAnchor.textContent = extractDomain(entry['ENLACE']);
            linkAnchor.target = '_blank';
            linkAnchor.rel = 'noopener noreferrer';
            link.appendChild(linkAnchor);
        }
        
        const imageContainer = document.createElement('div');
        if (entry['IMAGEN']) {
            const img = document.createElement('img');
            img.src = entry['IMAGEN'];
            img.alt = entry['TÍTULO'] || 'Entry image';
            imageContainer.appendChild(img);
        }
        
        entryDiv.appendChild(meta);
        if (processedContent) {
            entryDiv.appendChild(content);
        }
        if (entry['ENLACE']) {
            entryDiv.appendChild(link);
        }
        if (entry['IMAGEN']) {
            entryDiv.appendChild(imageContainer);
        }
        
        container.appendChild(entryDiv);
    }
    
    document.querySelector('.nav-buttons').style.display = 'none';
    scrollToTop();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToAuthor() {
    const authorSection = document.getElementById('author-section');
    authorSection.scrollIntoView({ behavior: 'smooth' });
}

window.onload = loadEntries;
