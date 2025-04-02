document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        csvUrl: 'base.csv',
        itemsPerPage: 10,
        tableContainerId: 'data-container',
        tableId: 'data-table',
        paginationId: 'pagination',
        searchId: 'search',
        filterId: 'filter',
        viewSelectorId: 'view-selector',
        loadingId: 'loading'
    };

    // State
    const state = {
        currentPage: 1,
        allData: [],
        filteredData: [],
        sortColumn: null,
        sortDirection: 1
    };

    // DOM Elements
    const elements = {
        loading: document.getElementById(config.loadingId),
        dataContainer: document.getElementById(config.tableContainerId),
        dataTable: document.getElementById(config.tableId),
        pagination: document.getElementById(config.paginationId),
        searchInput: document.getElementById(config.searchId),
        filterInput: document.getElementById(config.filterId),
        viewSelector: document.getElementById(config.viewSelectorId)
    };

    // Initialize the application
    async function init() {
        showLoading();
        try {
            const response = await fetch(config.csvUrl);
            if (!response.ok) throw new Error('Failed to load data');
            
            const csvData = await response.text();
            state.allData = parseCSV(csvData);
            resetFilters();
            setupEventListeners();
        } catch (error) {
            console.error('Error:', error);
            showError(error.message);
        } finally {
            hideLoading();
        }
    }

    // CSV Parser (keeps your original data structure)
    function parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i] ? values[i].trim() : '';
                return obj;
            }, {});
        });
    }

    // Main render function
    function renderData() {
        const startIdx = (state.currentPage - 1) * config.itemsPerPage;
        const paginatedData = state.filteredData.slice(startIdx, startIdx + config.itemsPerPage);
        
        if (elements.viewSelector.value === 'table') {
            renderTableView(paginatedData);
        } else {
            renderCardView(paginatedData);
        }
        
        renderPagination();
    }

    // Table view renderer (matches your existing table structure)
    function renderTableView(data) {
        if (data.length === 0) {
            elements.dataTable.innerHTML = '<tr><td colspan="100%">No data found</td></tr>';
            return;
        }

        const headers = Object.keys(data[0]);
        let html = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
        
        html += data.map(item => 
            `<tr>${headers.map(h => `<td>${item[h]}</td>`).join('')}</tr>`
        ).join('');

        elements.dataTable.innerHTML = html;
        elements.dataContainer.style.display = 'block';
    }

    // Card view renderer (matches your existing card structure)
    function renderCardView(data) {
        if (data.length === 0) {
            elements.dataContainer.innerHTML = '<div class="card">No data found</div>';
            return;
        }

        elements.dataContainer.innerHTML = data.map(item => `
            <div class="card">
                ${Object.entries(item).map(([key, value]) => `
                    <p><strong>${key}:</strong> ${value}</p>
                `).join('')}
            </div>
        `).join('');

        elements.dataContainer.style.display = 'flex';
    }

    // Pagination (matches your existing pagination structure)
    function renderPagination() {
        const totalPages = Math.ceil(state.filteredData.length / config.itemsPerPage);
        
        if (totalPages <= 1) {
            elements.pagination.innerHTML = '';
            return;
        }

        let html = `
            <button onclick="changePage(1)" ${state.currentPage === 1 ? 'disabled' : ''}>First</button>
            <button onclick="changePage(${state.currentPage - 1})" ${state.currentPage === 1 ? 'disabled' : ''}>Previous</button>
        `;

        // Show pages around current page
        const startPage = Math.max(1, state.currentPage - 2);
        const endPage = Math.min(totalPages, state.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button onclick="changePage(${i})" ${i === state.currentPage ? 'class="active"' : ''}>${i}</button>`;
        }

        html += `
            <button onclick="changePage(${state.currentPage + 1})" ${state.currentPage === totalPages ? 'disabled' : ''}>Next</button>
            <button onclick="changePage(${totalPages})" ${state.currentPage === totalPages ? 'disabled' : ''}>Last</button>
        `;

        elements.pagination.innerHTML = html;
    }

    // Filtering functions
    function resetFilters() {
        state.filteredData = [...state.allData];
        state.currentPage = 1;
        
        // Populate filter dropdown (assuming first column is the filter)
        if (state.allData.length > 0) {
            const firstColumn = Object.keys(state.allData[0])[0];
            const uniqueValues = [...new Set(state.allData.map(item => item[firstColumn]))];
            
            elements.filterInput.innerHTML = `
                <option value="">All ${firstColumn}s</option>
                ${uniqueValues.map(val => `<option value="${val}">${val}</option>`).join('')}
            `;
        }
        
        renderData();
    }

    function applyFilters() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const filterValue = elements.filterInput.value;
        
        state.filteredData = state.allData.filter(item => {
            const matchesSearch = !searchTerm || Object.values(item).some(
                val => val.toLowerCase().includes(searchTerm)
            );
            
            const firstColumn = Object.keys(item)[0];
            const matchesFilter = !filterValue || item[firstColumn] === filterValue;
            
            return matchesSearch && matchesFilter;
        });
        
        state.currentPage = 1;
        renderData();
    }

    // Sorting function
    function sortData(column) {
        if (state.sortColumn === column) {
            state.sortDirection *= -1;
        } else {
            state.sortColumn = column;
            state.sortDirection = 1;
        }
        
        state.filteredData.sort((a, b) => {
            return a[column].localeCompare(b[column]) * state.sortDirection;
        });
        
        renderData();
    }

    // UI Helpers
    function showLoading() {
        elements.loading.style.display = 'block';
        elements.dataContainer.style.display = 'none';
    }

    function hideLoading() {
        elements.loading.style.display = 'none';
        elements.dataContainer.style.display = '';
    }

    function showError(message) {
        elements.dataContainer.innerHTML = `<div class="error">${message}</div>`;
    }

    // Event Listeners
    function setupEventListeners() {
        elements.searchInput.addEventListener('input', debounce(applyFilters, 300));
        elements.filterInput.addEventListener('change', applyFilters);
        elements.viewSelector.addEventListener('change', renderData);
        
        // Existing sort buttons in your HTML
        document.querySelectorAll('[data-column]').forEach(btn => {
            btn.addEventListener('click', () => sortData(btn.getAttribute('data-column')));
        });
        
        // Reset button if exists
        const resetBtn = document.querySelector('button[type="reset"]');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                setTimeout(resetFilters, 0);
            });
        }
    }

    // Debounce function for search input
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Global function for pagination (required by your existing HTML)
    window.changePage = function(page) {
        if (page >= 1 && page <= Math.ceil(state.filteredData.length / config.itemsPerPage)) {
            state.currentPage = page;
            renderData();
            window.scrollTo(0, 0);
        }
    };

    // Start the application
    init();
});
