document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        csvUrl: 'base.csv',
        itemsPerPage: 10,
        views: {
            table: { containerClass: 'table-container', renderer: renderTableView },
            cards: { containerClass: 'cards-container', renderer: renderCardView }
        }
    };

    // State
    const state = {
        currentPage: 1,
        allData: [],
        filteredData: [],
        sort: { column: null, direction: 1 }
    };

    // DOM Elements
    const elements = {
        loading: document.getElementById('loading'),
        dataContainer: document.getElementById('data-container'),
        pagination: document.getElementById('pagination'),
        searchInput: document.getElementById('search'),
        filterInput: document.getElementById('filter'),
        viewSelector: document.getElementById('view-selector'),
        sortButtons: document.querySelectorAll('[data-sort]'),
        filterForm: document.getElementById('filter-form'),
        resultsCount: document.getElementById('results-count')
    };

    // Initialization
    async function init() {
        showLoading();
        try {
            const response = await fetch(CONFIG.csvUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const csvData = await response.text();
            state.allData = parseCSV(csvData);
            resetFilters();
            setupEventListeners();
        } catch (error) {
            console.error('Error:', error);
            elements.dataContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
        } finally {
            hideLoading();
        }
    }

    // CSV Parser
    function parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines.shift().split(',').map(h => h.trim());
        
        return lines.map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i]?.trim() || '';
                return obj;
            }, {});
        });
    }

    // Data Rendering
    function renderData() {
        const viewType = elements.viewSelector.value;
        const viewConfig = CONFIG.views[viewType];
        
        // Clear and prepare container
        elements.dataContainer.innerHTML = '';
        elements.dataContainer.className = viewConfig.containerClass;
        
        // Get paginated data
        const startIdx = (state.currentPage - 1) * CONFIG.itemsPerPage;
        const paginatedData = state.filteredData.slice(startIdx, startIdx + CONFIG.itemsPerPage);
        
        // Render appropriate view
        if (paginatedData.length === 0) {
            elements.dataContainer.innerHTML = '<div class="no-results">No matching records found</div>';
        } else {
            viewConfig.renderer(paginatedData);
        }
        
        updateResultsCount();
        renderPagination();
    }

    // View Renderers
    function renderTableView(data) {
        const headers = Object.keys(data[0]);
        const table = document.createElement('table');
        
        // Create header row
        const thead = document.createElement('thead');
        thead.innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
        table.appendChild(thead);
        
        // Create body rows
        const tbody = document.createElement('tbody');
        tbody.innerHTML = data.map(item => 
            `<tr>${headers.map(h => `<td>${item[h]}</td>`).join('')}</tr>`
        ).join('');
        table.appendChild(tbody);
        
        elements.dataContainer.appendChild(table);
    }

    function renderCardView(data) {
        elements.dataContainer.innerHTML = data.map(item => `
            <div class="card">
                ${Object.entries(item).map(([key, value]) => `
                    <div class="card-field">
                        <span class="card-label">${key}:</span>
                        <span class="card-value">${value}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // Pagination
    function renderPagination() {
        const totalPages = Math.ceil(state.filteredData.length / CONFIG.itemsPerPage);
        
        if (totalPages <= 1) {
            elements.pagination.innerHTML = '';
            return;
        }
        
        let html = `
            <button data-page="1" ${state.currentPage === 1 ? 'disabled' : ''}>
                &laquo; First
            </button>
            <button data-page="${state.currentPage - 1}" ${state.currentPage === 1 ? 'disabled' : ''}>
                &lsaquo; Prev
            </button>`;
        
        // Page numbers
        const startPage = Math.max(1, state.currentPage - 2);
        const endPage = Math.min(totalPages, state.currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            html += `<button data-page="${i}" ${i === state.currentPage ? 'class="active"' : ''}>${i}</button>`;
        }
        
        html += `
            <button data-page="${state.currentPage + 1}" ${state.currentPage === totalPages ? 'disabled' : ''}>
                Next &rsaquo;
            </button>
            <button data-page="${totalPages}" ${state.currentPage === totalPages ? 'disabled' : ''}>
                Last &raquo;
            </button>`;
        
        elements.pagination.innerHTML = html;
        
        // Add event listeners to new buttons
        elements.pagination.querySelectorAll('button[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                changePage(parseInt(btn.dataset.page));
            });
        });
    }

    function changePage(page) {
        if (page >= 1 && page <= Math.ceil(state.filteredData.length / CONFIG.itemsPerPage)) {
            state.currentPage = page;
            renderData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Data Filtering
    function resetFilters() {
        state.filteredData = [...state.allData];
        state.currentPage = 1;
        
        // Update filter dropdown options
        const firstColumn = Object.keys(state.allData[0] || [])[0];
        if (firstColumn) {
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
            const matchesFilter = !filterValue || item[Object.keys(item)[0]] === filterValue;
            return matchesSearch && matchesFilter;
        });
        
        state.currentPage = 1;
        renderData();
    }

    // Sorting
    function sortData(column) {
        if (state.sort.column === column) {
            state.sort.direction *= -1;
        } else {
            state.sort.column = column;
            state.sort.direction = 1;
        }
        
        state.filteredData.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];
            return valA.localeCompare(valB) * state.sort.direction;
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

    function updateResultsCount() {
        const total = state.filteredData.length;
        const start = Math.min((state.currentPage - 1) * CONFIG.itemsPerPage + 1, total);
        const end = Math.min(start + CONFIG.itemsPerPage - 1, total);
        
        elements.resultsCount.textContent = total > 0 
            ? `Showing ${start}-${end} of ${total} records` 
            : 'No records found';
    }

    // Event Listeners
    function setupEventListeners() {
        // Form inputs
        elements.searchInput.addEventListener('input', debounce(applyFilters, 300));
        elements.filterInput.addEventListener('change', applyFilters);
        elements.viewSelector.addEventListener('change', renderData);
        
        // Sort buttons
        elements.sortButtons.forEach(btn => {
            btn.addEventListener('click', () => sortData(btn.dataset.sort));
        });
        
        // Filter form reset
        elements.filterForm.addEventListener('reset', () => {
            setTimeout(resetFilters, 0);
        });
    }

    // Utility: Debounce function for search input
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Initialize the application
    init();
});
