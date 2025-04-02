document.addEventListener('DOMContentLoaded', function() {
    const csvUrl = 'https://jucardus.github.io/base.csv';
    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('search');
    let allData = [];
    let isSearching = false;
    
    // Improved CSV parser that handles quoted fields
    function parseCSV(text) {
        const rows = [];
        let currentRow = [];
        let inQuotes = false;
        let currentField = '';
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                currentRow.push(currentField.trim());
                currentField = '';
            } else if (char === '\n' && !inQuotes) {
                currentRow.push(currentField.trim());
                currentField = '';
                if (currentRow.length > 1 || currentRow[0] !== '') {
                    rows.push(currentRow);
                }
                currentRow = [];
            } else {
                currentField += char;
            }
        }
        
        // Add the last row if it exists
        if (currentField.trim() !== '' || currentRow.length > 0) {
            currentRow.push(currentField.trim());
            rows.push(currentRow);
        }
        
        return rows;
    }
    
    // Fetch CSV data
    fetch(csvUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            // Parse CSV data with our custom parser
            const rows = parseCSV(data);
            
            if (rows.length < 2) {
                throw new Error('Not enough data rows');
            }
            
            // Process all rows (skip header)
            allData = rows.slice(1).map((row, index) => {
                // Ensure we have at least 4 columns, fill empty ones with ''
                const values = [...row, '', '', '', ''].slice(0, 4);
                return {
                    id: values[0] || '',
                    term: values[1] || '',
                    definition: values[2] || '',
                    category: values[3] || ''
                };
            });
            
            // Display first 30 entries by default (no reversing)
            const latest30Entries = allData.slice(0, 30);
            displayData(latest30Entries);
            
            // Set up search functionality
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm.length > 0) {
                    isSearching = true;
                    // Search across ALL data
                    const searchResults = allData.filter(item => 
                        (item.term && item.term.toLowerCase().includes(searchTerm)) || 
                        (item.definition && item.definition.toLowerCase().includes(searchTerm)) ||
                        (item.category && item.category.toLowerCase().includes(searchTerm))
                    ).slice(0, 200); // Limit to 200 results for performance
                    
                    displayData(searchResults);
                    highlightSearchTerms(searchTerm);
                } else {
                    isSearching = false;
                    // Show first 30 entries again
                    const latest30Entries = allData.slice(0, 30);
                    displayData(latest30Entries);
                }
            });
        })
        .catch(error => {
            console.error('Error loading data:', error);
            tableBody.innerHTML = `<tr><td colspan="4">Error loading data: ${error.message}</td></tr>`;
        });
    
    function displayData(data) {
        tableBody.innerHTML = '';
        
        if (!data || data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">No results found.</td></tr>';
            return;
        }
        
        // Update subtitle based on whether we're searching or not
        const subtitle = document.querySelector('.subtitle');
        subtitle.textContent = isSearching 
            ? `Search Results (${data.length} matches)` 
            : 'Latest Thirty Entries';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHTML(item.id)}</td>
                <td>${escapeHTML(item.term)}</td>
                <td>${escapeHTML(item.definition)}</td>
                <td>${escapeHTML(item.category)}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    function highlightSearchTerms(term) {
        const cells = document.querySelectorAll('#table-body td');
        const regex = new RegExp(escapeRegExp(term), 'gi');
        
        cells.forEach(cell => {
            const originalText = cell.textContent;
            const highlightedText = originalText.replace(regex, match => 
                `<span class="highlight">${match}</span>`
            );
            cell.innerHTML = highlightedText;
        });
    }
    
    // Helper function to escape HTML special characters
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag]));
    }
    
    // Helper function to escape regex special characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
});
