document.addEventListener('DOMContentLoaded', function() {
    const csvUrl = 'https://jucardus.github.io/base.csv';
    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('search');
    let allData = [];
    let isSearching = false;
    
    // Fetch CSV data
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            
            // Process all rows (skip header)
            allData = rows.slice(1).map(row => {
                const values = row.split(',');
                return {
                    id: values[0],
                    term: values[1],
                    definition: values[2],
                    category: values[3]
                };
            });
            
            // Display last 30 entries by default (most recent)
            const last30Entries = allData.slice(-30).reverse(); // Newest first
            displayData(last30Entries);
            
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
                    // Show last 30 entries again
                    const last30Entries = allData.slice(-30).reverse();
                    displayData(last30Entries);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            tableBody.innerHTML = '<tr><td colspan="4">Error loading data. Please try again later.</td></tr>';
        });
    
    function displayData(data) {
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">No results found.</td></tr>';
            return;
        }
        
        // Update subtitle based on whether we're searching or not
        const subtitle = document.querySelector('.subtitle');
        if (isSearching) {
            subtitle.textContent = `Search Results (${data.length} matches)`;
        } else {
            subtitle.textContent = 'Latest Thirty Entries';
        }
        
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.term}</td>
                <td>${item.definition}</td>
                <td>${item.category}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    function highlightSearchTerms(term) {
        const cells = document.querySelectorAll('#table-body td');
        const regex = new RegExp(term, 'gi');
        
        cells.forEach(cell => {
            const originalText = cell.textContent;
            const highlightedText = originalText.replace(regex, match => 
                `<span class="highlight">${match}</span>`
            );
            cell.innerHTML = highlightedText;
        });
    }
});
