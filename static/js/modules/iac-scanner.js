// IaC Scanner Module - Enterprise Grade
// Features: CIS Benchmarks, Module Toggling, Compliance Visualization

const IaCScanner = {
    files: [],
    results: [],
    enabledModules: {
        'CIS-AWS': true,
        'CIS-K8S': true,
        'CIS-Docker': true
    },

    // Policy Definitions with Versioning
    policies: {
        'CIS-AWS': {
            name: 'CIS AWS Foundations',
            version: 'v6.0.0',
            lastUpdated: '2024-01-01',
            description: 'Security best practices for AWS accounts'
        },
        'CIS-K8S': {
            name: 'CIS Kubernetes Benchmark',
            version: 'v1.9.0',
            lastUpdated: '2024-02-01',
            description: 'Hardening guide for Kubernetes clusters'
        },
        'CIS-Docker': {
            name: 'CIS Docker Benchmark',
            version: 'v1.8.0',
            lastUpdated: '2024-01-01',
            description: 'Security configuration for Docker containers'
        }
    },

    // Enhanced Rules Database with Policy tags
    rules: {
        terraform: [
            {
                id: 'TF-S3-001',
                policy: 'CIS-AWS',
                policyId: '2.1.5',
                pattern: /acl\s*=\s*["']public-read["']/gi,
                severity: 'CRITICAL',
                title: 'S3 Bucket Public Access',
                description: 'S3 bucket configured with public-read ACL',
                remediation: 'Set ACL to "private" or use bucket policies'
            },
            {
                id: 'TF-IAM-001',
                policy: 'CIS-AWS',
                policyId: '1.20',
                pattern: /Action\s*=\s*\[\s*["']\*["']\s*\]/gi,
                severity: 'HIGH',
                title: 'IAM Wildcard Permissions',
                description: 'IAM policy uses wildcard (*) for actions',
                remediation: 'Specify exact actions instead of wildcards'
            }
        ],
        kubernetes: [
            {
                id: 'K8S-POD-001',
                policy: 'CIS-K8S',
                policyId: '5.2.1',
                pattern: /privileged:\s*true/gi,
                severity: 'CRITICAL',
                title: 'Privileged Container',
                description: 'Container running in privileged mode',
                remediation: 'Remove "privileged: true" security context'
            },
            {
                id: 'K8S-NET-001',
                policy: 'CIS-K8S',
                policyId: '5.2.4',
                pattern: /hostNetwork:\s*true/gi,
                severity: 'HIGH',
                title: 'Host Network Access',
                description: 'Pod has access to host network',
                remediation: 'Set "hostNetwork: false"'
            }
        ],
        dockerfile: [
            {
                id: 'DKR-IMG-001',
                policy: 'CIS-Docker',
                policyId: '4.1',
                pattern: /FROM\s+.*:latest/gi,
                severity: 'MEDIUM',
                title: 'Using Latest Tag',
                description: 'Dockerfile uses :latest which is unpredictable',
                remediation: 'Use specific version tags'
            },
            {
                id: 'DKR-USER-001',
                policy: 'CIS-Docker',
                policyId: '4.6',
                pattern: /(?!.*USER\s+)/gi,
                severity: 'HIGH',
                title: 'Running as Root',
                description: 'No USER instruction found',
                remediation: 'Add USER instruction for non-root execution'
            }
        ]
    },

    render() {
        return `
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5><i class="bi bi-cloud-check me-2"></i>IaC Security Scanner</h5>
                        <p class="text-muted mb-0 small">CIS Benchmarks Analysis & Compliance</p>
                    </div>
                </div>
                <div class="card-body">
                    
                    <!-- Policy Toggles -->
                    <div class="mb-4 p-3 rounded" style="background: var(--bg-alt); border: 1px solid var(--border);">
                        <div class="d-flex gap-4 flex-wrap">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="toggleAWS" checked onchange="IaCScanner.toggleModule('CIS-AWS')">
                                <label class="form-check-label" for="toggleAWS">CIS AWS (v6.0.0)</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="toggleK8S" checked onchange="IaCScanner.toggleModule('CIS-K8S')">
                                <label class="form-check-label" for="toggleK8S">CIS Kubernetes (v1.9.0)</label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="toggleDocker" checked onchange="IaCScanner.toggleModule('CIS-Docker')">
                                <label class="form-check-label" for="toggleDocker">CIS Docker (v1.8.0)</label>
                            </div>
                        </div>
                    </div>

                    <div class="border-2 border-dashed p-4 text-center mb-3" style="border: 2px dashed var(--border); border-radius: 0.5rem; cursor: pointer; background: var(--bg-alt);" id="uploadArea">
                        <input type="file" id="iacFileInput" multiple accept=".tf,.yaml,.yml,Dockerfile" style="display: none;">
                        <i class="bi bi-cloud-upload" style="font-size: 3rem; color: var(--text-muted);"></i>
                        <h5 class="mt-3" style="color: var(--text);">Upload IaC Files</h5>
                        <p style="color: var(--text-muted);">Terraform (.tf), Kubernetes (.yaml), Dockerfile</p>
                    </div>
                    
                    <div id="filesList"></div>
                    <div id="scanButton"></div>
                </div>
            </div>
            
            <div id="iacResults"></div>
        `;
    },

    init() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('iacFileInput');
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
    },

    toggleModule(moduleName) {
        this.enabledModules[moduleName] = !this.enabledModules[moduleName];
    },

    async handleFiles(fileList) {
        this.files = [];
        for (const file of fileList) {
            const content = await this.readFile(file);
            this.files.push({
                name: file.name,
                type: this.detectType(file.name),
                size: file.size,
                content: content
            });
        }
        this.displayFiles();
    },

    readFile(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsText(file);
        });
    },

    detectType(filename) {
        if (filename.endsWith('.tf')) return 'terraform';
        if (filename.endsWith('.yaml') || filename.endsWith('.yml')) return 'kubernetes';
        if (filename.toLowerCase().includes('dockerfile')) return 'dockerfile';
        return 'unknown';
    },

    displayFiles() {
        const container = document.getElementById('filesList');
        const btnContainer = document.getElementById('scanButton');

        if (this.files.length === 0) {
            container.innerHTML = ''; return;
        }

        container.innerHTML = `
            <div class="list-group mb-3">
                ${this.files.map((file, idx) => `
                    <div class="list-group-item d-flex justify-content-between align-items-center" style="background: var(--bg-alt); border: 1px solid var(--border); color: var(--text);">
                        <div><i class="bi bi-file-earmark-code me-2"></i>${file.name}</div>
                    </div>
                `).join('')}
            </div>
        `;

        btnContainer.innerHTML = `<button class="btn btn-primary w-100" onclick="IaCScanner.scan()"><i class="bi bi-shield-check me-2"></i>Scan Files</button>`;
    },

    scan() {
        this.results = [];
        this.files.forEach(file => {
            // scanFile now checks enabledModules
            const findings = this.scanFile(file);
            this.results.push({ file, findings, scannedAt: new Date() });
        });
        this.displayResults();
    },

    scanFile(file) {
        const findings = [];
        const rules = this.rules[file.type] || [];

        rules.forEach(rule => {
            // Check if policy is enabled
            if (this.enabledModules[rule.policy]) {
                if (rule.pattern.test(file.content)) {
                    // Basic regex match (simplified for client-side)
                    // In real scenario we would find line numbers etc.
                    const lines = file.content.split('\n');
                    const lineNumbers = [];
                    lines.forEach((l, i) => { if (rule.pattern.test(l)) lineNumbers.push(i + 1); });

                    findings.push({ ...rule, lineNumbers });
                }
            }
        });
        return findings;
    },

    displayResults() {
        const container = document.getElementById('iacResults');
        if (this.results.length === 0) return;

        let html = ``;

        this.results.forEach(result => {
            html += `
                <div class="card mb-3" style="border: 1px solid var(--border); background: var(--bg);">
                    <div class="card-header d-flex justify-content-between align-items-center" style="background: var(--bg-alt); border-bottom: 1px solid var(--border);">
                        <h6 style="color: var(--text);" class="mb-0"><i class="bi bi-file-earmark-code me-2"></i>${result.file.name}</h6>
                        <span class="badge bg-secondary">${result.findings.length} Issues</span>
                    </div>
                    <div class="card-body">
            `;

            if (result.findings.length === 0) {
                html += `<div class="alert alert-success">No check violations found.</div>`;
            } else {
                result.findings.forEach(finding => {
                    const policy = this.policies[finding.policy];
                    html += `
                        <div class="alert alert-light mb-2" style="background: var(--bg-alt); border: 1px solid var(--border);">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <span class="badge ${finding.severity === 'CRITICAL' ? 'bg-danger text-white' : 'bg-warning text-dark'} me-2 border border-secondary">${finding.severity}</span>
                                    <span class="badge bg-info bg-opacity-10 border border-info" style="color: var(--text) !important;">${finding.policy} ${finding.policyId}</span>
                                    <strong style="color: var(--text);" class="ms-2">${finding.title}</strong>
                                </div>
                                <div class="text-end small text-muted">
                                    Lines: ${finding.lineNumbers.join(', ')}
                                </div>
                            </div>
                            <div class="mt-2 small" style="color: var(--text-muted);">
                                ${finding.description}
                                <div class="mt-1 text-success"><i class="bi bi-check2-circle me-1"></i>Remediation: ${finding.remediation}</div>
                                <div class="mt-1 fst-italic" style="font-size: 0.75rem; opacity: 0.7;">Policy Ver: ${policy.version} (${policy.lastUpdated})</div>
                            </div>
                        </div>
                    `;
                });
            }
            html += `</div></div>`;
        });

        container.innerHTML = html;
    }
};
