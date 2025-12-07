// ============================================
// Main Application Logic
// ============================================

const App = {
    currentModule: 'dashboard',

    init() {
        this.setupEventListeners();
        this.loadModule('dashboard');
        this.initTheme();
    },

    initTheme() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('themeToggle').innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    },

    toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        const themeToggle = document.getElementById('themeToggle');

        if (isDark) {
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
            localStorage.setItem('theme', 'light');
        }
    },

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const module = item.dataset.module;
                this.loadModule(module);

                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    loadModule(moduleName) {
        this.currentModule = moduleName;
        const container = document.getElementById('moduleContainer');

        // Update header
        const titles = {
            'dashboard': { title: 'Dashboard', desc: 'Overview & Analytics' },
            'attack-surface': { title: 'Attack Surface', desc: 'Intelligence & Risk' },
            'iac-scanner': { title: 'IaC Scanner', desc: 'Cloud Config Security' },
            'supply-chain': { title: 'Supply Chain', desc: 'SBOM & Dependencies' }
        };

        document.getElementById('moduleTitle').textContent = titles[moduleName].title;
        document.getElementById('moduleDescription').textContent = titles[moduleName].desc;

        // Load module content
        switch (moduleName) {
            case 'dashboard':
                container.innerHTML = Dashboard.render();
                Dashboard.init();
                break;
            case 'attack-surface':
                container.innerHTML = AttackSurface.render();
                AttackSurface.init();
                break;
            case 'iac-scanner':
                container.innerHTML = IaCScanner.render();
                IaCScanner.init();
                break;
            case 'supply-chain':
                container.innerHTML = SupplyChain.render();
                SupplyChain.init();
                break;
        }
    }
};

// Utility Functions
const Utils = {
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    getSeverityClass(severity) {
        const classes = {
            'CRITICAL': 'badge-critical',
            'HIGH': 'badge-high',
            'MEDIUM': 'badge-medium',
            'LOW': 'badge-low'
        };
        return classes[severity] || 'badge-low';
    },

    exportToJSON(data, filename) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    exportToCSV(data, filename) {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header];
                    return `"${String(value).replace(/"/g, '""')}"`;
                }).join(',')
            )
        ];

        const csv = csvRows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
