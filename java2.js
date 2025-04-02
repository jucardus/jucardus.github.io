// Fetch and display data from CSV
document.addEventListener('DOMContentLoaded', function() {
    const csvUrl = 'https://jucardus.github.io/base.csv';
    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('search');
    let allData = [];
    let displayedData = [];
    
    // Fetch CSV data
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Parse CSV data
            const rows = data.split('\n');
            const headers = rows[0].split(',');
            
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
            
            // Display first 30 entries by default
            displayedData = allData.slice(0, 30);
            displayData(displayedData);
            
            // Set up search functionality
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                
                if (searchTerm.length > 0) {
                    // Search across ALL data, not just displayed data
                    displayedData = allData.filter(item => 
                        item.term.toLowerCase().includes(searchTerm) || 
                        item.definition.toLowerCase().includes(searchTerm) ||
                        (item.category && item.category.toLowerCase().includes(searchTerm))
                        .slice(0, 100); // Limit to 100 results for performance
                } else {
                    // If search is empty, show first 30 entries again
                    displayedData = allData.slice(0, 30);
                }
                
                displayData(displayedData);
                
                if (searchTerm.length > 0) {
                    highlightSearchTerms(searchTerm);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            tableBody.innerHTML = '<tr><td colspan="4">Error loading data. Please try again later.</td></tr>';
        });
    
    // Function to display data in the table
    function displayData(data) {
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">No results found.</td></tr>';
            return;
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
    
    // Function to highlight search terms
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
