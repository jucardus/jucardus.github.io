document.addEventListener('DOMContentLoaded', () => {
    const databaseUrl = 'https://jucardus.github.io/base.csv';
    const itemsPerPage = 10;
    let currentPage = 1;
    let allData = [];
    let filteredData = [];
    let currentSortColumn = null;
    let sortDirection = 1;

    // DOM elements
    const elements = {
        loading: document.getElementById('loading'),
        dataTable: document.getElementById('data-table'),
        pagination: document.getElementById('pagination'),
        searchInput: document.getElementById('search'),
        filterInput: document.getElementById('filter'),
        sortButtons: document.querySelectorAll('.sort-btn'),
        viewSelector: document.getElementById('view-selector'),
        dataContainer: document.getElementById('data-container')
    };

    // Initialize the application
    async function init() {
        elements.loading.style.display = 'block';
        try {
            const response = await fetch(databaseUrl);
            const csvData = await response.text();
            allData = parseCSV(csvData);
            filteredData = [...allData];
            renderData();
            setupEventListeners();
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            elements.loading.style.display = 'none';
        }
    }

    // Parse CSV data into an array of objects
    function parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] ? values[index].trim() : '';
                return obj;
            }, {});
        });
    }

    // Render data based on current view and filters
    function renderData() {
        const startIdx = (currentPage - 1) * itemsPerPage;
        const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);
        const viewType = elements.viewSelector.value;

        if (viewType === 'table') {
            renderTableView(paginatedData);
        } else {
            renderCardView(paginatedData);
        }
        renderPagination();
    }

    // Render data in table view
    function renderTableView(data) {
        if (data.length === 0) {
            elements.dataTable.innerHTML = '<tr><td colspan="4">No data found</td></tr>';
            return;
        }

        const headers = Object.keys(data[0]);
        let html = `<tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>`;

        html += data.map(item => 
            `<tr>${headers.map(header => `<td>${item[header]}</td>`).join('')}</tr>`
        ).join('');

        elements.dataTable.innerHTML = html;
        elements.dataContainer.style.display = 'block';
    }

    // Render data in card view
    function renderCardView(data) {
        if (data.length === 0) {
            elements.dataContainer.innerHTML = '<div class="card">No data found</div>';
            return;
        }

        const headers = Object.keys(data[0]);
        elements.dataContainer.innerHTML = data.map(item => 
            `<div class="card">${headers.map(header => 
                `<p><strong>${header}:</strong> ${item[header]}</p>`
            ).join('')}</div>`
        ).join('');

        elements.dataContainer.style.display = 'flex';
    }

    // Render pagination controls
    function renderPagination() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        let html = '';

        if (totalPages > 1) {
            html += `<button onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''}>First</button>`;
            html += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                html += `<button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
            }

            html += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
            html += `<button onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>Last</button>`;
        }

        elements.pagination.innerHTML = html;
    }

    // Filter data based on search input
    function filterData() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const filterValue = elements.filterInput.value;

        filteredData = allData.filter(item => {
            const matchesSearch = Object.values(item).some(value => 
                value.toLowerCase().includes(searchTerm)
            );
            const matchesFilter = !filterValue || item[Object.keys(item)[0]] === filterValue;
            return matchesSearch && matchesFilter;
        });

        currentPage = 1;
        renderData();
    }

    // Sort data by column
    function sortData(column) {
        if (currentSortColumn === column) {
            sortDirection *= -1;
        } else {
            currentSortColumn = column;
            sortDirection = 1;
        }

        filteredData.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            return valA.localeCompare(valB) * sortDirection;
        });

        renderData();
    }

    // Change current page
    window.changePage = function(page) {
        if (page >= 1 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
            currentPage = page;
            renderData();
        }
    };

    // Set up event listeners
    function setupEventListeners() {
        elements.searchInput.addEventListener('input', filterData);
        elements.filterInput.addEventListener('change', filterData);
        elements.viewSelector.addEventListener('change', renderData);

        elements.sortButtons.forEach(button => {
            button.addEventListener('click', () => {
                sortData(button.getAttribute('data-column'));
            });
        });
    }

    // Start the application
    init();
});
