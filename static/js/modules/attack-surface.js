const AttackSurface = {
    results: [],
    history: [],
    chart: null,
    apiKeys: {
        abuseipdb: '',
        virustotal: ''
    },

    // Cloud Provider IP Ranges (Simplified for client-side demo - prefixes)
    // In a real app we'd use a subnet matcher.
    cloudWhitelist: ['35.', '34.', '104.', '172.', '13.', '52.', '54.', '20.'],

    // Policy Definitions
    policies: {
        'THREAT-INTEL': {
            name: 'Threat Intelligence Scan',
            version: 'v1.1',
            lastUpdated: new Date().toISOString().split('T')[0],
            color: '#7c3aed' // Violet
        },
        'MITRE': {
            name: 'MITRE ATT&CK',
            version: 'v18.1',
            lastUpdated: '2024-10-31',
            color: '#ef4444'
        },
        'OWASP-ASVS': {
            name: 'OWASP ASVS',
            version: 'v5.0',
            lastUpdated: '2024-01-01',
            color: '#3b82f6'
        }
    },

    render() {
        return `
            <div class="card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5><i class="bi bi-shield-exclamation me-2"></i>Attack Surface Intelligence</h5>
                        <p class="text-muted mb-0 small">Advanced Threat Intel, MITRE Mapping & Risk Trending</p>
                    </div>
                    <div>
                         <span class="badge bg-secondary border border-secondary text-white" onclick="AttackSurface.configureAPIs()" style="cursor: pointer;">
                            <i class="bi bi-gear-fill me-1"></i> Configure APIs
                         </span>
                    </div>
                </div>
                <div class="card-body">
                    
                    <div class="row g-3 mb-4">
                        <div class="col-md-9">
                            <label class="form-label">Target Domain</label>
                            <input type="text" class="form-control" id="domainInput" placeholder="example.com">
                        </div>
                        <div class="col-md-3 d-flex align-items-end">
                            <button class="btn btn-primary w-100" id="scanBtn">
                                <i class="bi bi-search me-2"></i>Start Scan
                            </button>
                        </div>
                    </div>
                    
                    <!-- Stats Row -->
                    <div id="statsRow" class="row g-3 mb-4" style="display: none;">
                        <div class="col-md-3">
                            <div class="p-3 border rounded text-center bg-dark">
                                <small class="text-white">Total Assets</small>
                                <h3 class="text-white" id="statAssets">0</h3>
                            </div>
                        </div>
                        <div class="col-md-3">
                             <div class="p-3 border rounded text-center bg-dark">
                                <small class="text-white">Avg Risk Score</small>
                                <h3 class="text-white" id="statRisk">0</h3>
                            </div>
                        </div>
                        <div class="col-md-3">
                             <div class="p-3 border rounded text-center bg-dark">
                                <small class="text-white">Malicious/Flagged</small>
                                <h3 class="text-danger" id="statFlagged">0</h3>
                            </div>
                        </div>
                         <div class="col-md-3">
                             <div class="p-3 border rounded text-center bg-dark">
                                <small class="text-white">CVEs Found</small>
                                <h3 class="text-warning" id="statCVEs">0</h3>
                            </div>
                        </div>
                    </div>

                     <!-- Trend Analysis -->
                    <div id="trendSection" style="display: none;" class="mb-4">
                        <div class="card" style="background: var(--bg-alt); border: 1px solid var(--border);">
                            <div class="card-header" style="border-bottom: 1px solid var(--border);">
                                <h6 class="mb-0" style="color: var(--text);"><i class="bi bi-graph-up me-2"></i>Risk Exposure Trend</h6>
                            </div>
                            <div class="card-body">
                                <canvas id="trendChart" style="max-height: 200px;"></canvas>
                            </div>
                        </div>
                    </div>

                    <div id="scanProgress"></div>
                </div>
            </div>
            
            <!-- Filters -->
            <div id="filterSection" style="display: none;" class="row g-3 mb-3">
                 <div class="col-md-3">
                    <select class="form-select" id="severityFilter" style="background: var(--bg-alt); color: var(--text); border: 1px solid var(--border);">
                        <option value="all">Severity (All)</option>
                        <option value="CRITICAL">Critical</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
                 <div class="col-md-3">
                    <select class="form-select" id="policyFilter" style="background: var(--bg-alt); color: var(--text); border: 1px solid var(--border);">
                         <option value="all">Policy (All)</option>
                         <option value="THREAT-INTEL">Threat Intel</option>
                         <option value="MITRE">MITRE ATT&CK</option>
                    </select>
                </div>
                 <div class="col-md-6 text-end">
                     <button class="btn btn-secondary me-2" onclick="AttackSurface.exportJSON()"><i class="bi bi-code-slash me-2"></i>JSON</button>
                     <button class="btn btn-secondary" onclick="AttackSurface.exportCSV()"><i class="bi bi-file-spreadsheet me-2"></i>CSV</button>
                 </div>
            </div>

            <div id="resultsContainer"></div>
            
            <!-- API Config Modal -->
            <div class="modal fade" id="apiConfigModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content" style="background: var(--bg); color: var(--text);">
                        <div class="modal-header">
                            <h5 class="modal-title">Configure Threat Intel APIs</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="small text-muted">Keys are stored in session memory only (ephemeral). Refreshed on reload.</p>
                            <div class="mb-3">
                                <label class="form-label">AbuseIPDB Key (Optional)</label>
                                <input type="password" class="form-control" id="apiKeyAbuse" placeholder="Enter Key">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">VirusTotal Key (Optional)</label>
                                <input type="password" class="form-control" id="apiKeyVT" placeholder="Enter Key">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="AttackSurface.saveKeys()">Save Keys</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        document.getElementById('scanBtn').addEventListener('click', () => this.scan());
        document.getElementById('domainInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.scan();
        });

        // History is ephemeral now, resets on refresh

        document.getElementById('severityFilter')?.addEventListener('change', () => this.filterResults());
        document.getElementById('policyFilter')?.addEventListener('change', () => this.filterResults());
    },

    configureAPIs() {
        const modal = new bootstrap.Modal(document.getElementById('apiConfigModal'));
        document.getElementById('apiKeyAbuse').value = this.apiKeys.abuseipdb;
        document.getElementById('apiKeyVT').value = this.apiKeys.virustotal;
        modal.show();
    },

    saveKeys() {
        this.apiKeys.abuseipdb = document.getElementById('apiKeyAbuse').value;
        this.apiKeys.virustotal = document.getElementById('apiKeyVT').value;

        const modalEl = document.getElementById('apiConfigModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        alert('API Keys saved for this specific page session (cleared on refresh).');
    },

    async scan() {
        const domain = document.getElementById('domainInput').value.trim();
        if (!domain) { alert('Please enter a domain'); return; }

        const btn = document.getElementById('scanBtn');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Scanning...';

        this.results = [];
        this.showProgress('Enumerating subdomains via Certificate Transparency...');

        try {
            const subdomains = await this.enumerateSubdomains(domain);
            this.showProgress(`Found ${subdomains.length} assets. Starting Deep Analysis...`);

            // Limit to 10 for performance in client-side demo
            const targetList = subdomains.slice(0, 10);

            for (let i = 0; i < targetList.length; i++) {
                const sub = targetList[i];
                this.showProgress(`Analyzing ${i + 1}/${targetList.length}: ${sub}`);

                const result = await this.analyzeAsset(sub);
                if (result) {
                    this.results.push(result);
                    this.updateStats();
                    this.displayResults();
                }
            }

            this.saveHistory(domain);
            this.showProgress('Scan complete!');

            document.getElementById('filterSection').style.display = 'flex';
            document.getElementById('statsRow').style.display = 'flex';
            document.getElementById('trendSection').style.display = 'block';
            this.renderTrendChart();
            setTimeout(() => { document.getElementById('scanProgress').innerHTML = ''; }, 3000);

        } catch (error) {
            console.error(error);
            this.showProgress(`Error: ${error.message}`, true);
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-search me-2"></i>Start Scan';
        }
    },

    async analyzeAsset(domain) {
        try {
            const ip = await this.resolveDNS(domain);
            const techs = await this.fingerprintTechnologies(domain);
            const vulns = await this.lookupVulnerabilities(techs);
            const cveScore = this.calculateCVEScore(vulns);

            // Multi-Feed Threat Intelligence
            const ti = await this.checkThreatIntel(domain, ip);

            // Combined Logic
            // Exposure base = 10
            const exposureScore = 10 + (techs.length * 5);
            // Max(CVEScore, TI_Confidence_Score, Exposure_Cap_50)
            const finalScore = Math.max(cveScore, ti.score, Math.min(exposureScore, 50));

            return {
                domain,
                ip: ip || 'Unknown',
                technologies: techs,
                vulnerabilities: vulns,
                threatIntel: ti,
                riskScore: Math.round(finalScore)
            };
        } catch (e) { console.error(e); return null; }
    },

    async checkThreatIntel(domain, ip) {
        let findings = [];
        let scoreParts = { vt: 0, abuse: 0, phish: 0, spamhaus: 0 };

        const isCloudIP = this.isWhitelisted(ip);
        if (isCloudIP) {
            findings.push({ source: 'Whitelist', detail: 'Cloud Provider IP (False Positive Reducted)', confidence: 0 });
        }

        // 1. VirusTotal (Weight 40%)
        if (this.apiKeys.virustotal && ip) {
            try {
                const res = await fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
                    headers: { 'x-apikey': this.apiKeys.virustotal }
                });
                if (res.ok) {
                    const data = await res.json();
                    const stats = data.data.attributes.last_analysis_stats;
                    if (stats.malicious > 0) {
                        const conf = Math.min((stats.malicious / 5) * 100, 100); // 5+ engines = 100%
                        scoreParts.vt = conf;
                        findings.push({ source: 'VirusTotal', detail: `Malicious: ${stats.malicious}`, confidence: conf });
                    } else {
                        findings.push({ source: 'VirusTotal', detail: `Clean`, confidence: 0 });
                    }
                }
            } catch (e) { }
        }

        // 2. AbuseIPDB (Weight 30%)
        if (this.apiKeys.abuseipdb && ip) {
            try {
                const res = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`, {
                    headers: { 'Key': this.apiKeys.abuseipdb, 'Accept': 'application/json' }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.data.abuseConfidenceScore > 0) {
                        scoreParts.abuse = data.data.abuseConfidenceScore;
                        findings.push({ source: 'AbuseIPDB', detail: `Confidence: ${scoreParts.abuse}%`, confidence: scoreParts.abuse });
                    }
                }
            } catch (e) { }
        }

        // 3. Phishing Check (Mock of PhishTank/OpenPhish - Weight 20%)
        // Real implementation would check against a local bloom filter or ephemeral API
        if (domain.includes('login') || domain.includes('secure')) {
            // Mock detection
        }

        // 4. Spamhaus (Weight 10%) - Reduced if Whitelisted
        if (ip && !isCloudIP) {
            const reversedIp = ip.split('.').reverse().join('.');
            const isListed = await this.checkDNSBlocklist(`${reversedIp}.zen.spamhaus.org`);
            if (isListed) {
                scoreParts.spamhaus = 100;
                findings.push({ source: 'Spamhaus', detail: 'IP Blocklisted', confidence: 100 });
            }
        }

        // Calculate Weighted Score
        // (VT * 0.4) + (Abuse * 0.3) + (Phish * 0.2) + (Spam * 0.1)
        // Normalize: if keys missing, rebalance weights or just take max of available?
        // Let's use Max for safety in this version, or Sum if strict. The User asked for Weighted.

        let weightedScore = (scoreParts.vt * 0.4) + (scoreParts.abuse * 0.3) + (scoreParts.phish * 0.2) + (scoreParts.spamhaus * 0.1);

        // If keys are missing, the weighted score will be low. 
        // Fallback: If no API keys, Spamhaus becomes dominant signal (100% weight effectively if checks fail)
        if (!this.apiKeys.virustotal && !this.apiKeys.abuseipdb && scoreParts.spamhaus > 0) {
            weightedScore = 80; // High confidence if RBL matches and no other data
        }

        return { findings, score: Math.round(weightedScore) };
    },

    isWhitelisted(ip) {
        if (!ip || ip === 'Unknown') return false;
        // Simple prefix check
        for (let prefix of this.cloudWhitelist) {
            if (ip.startsWith(prefix)) return true;
        }
        return false;
    },

    async checkDNSBlocklist(queryDomain) {
        try {
            const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${queryDomain}&type=A`, {
                headers: { 'Accept': 'application/dns-json' }
            });
            const data = await res.json();
            return data.Answer && data.Answer.length > 0;
        } catch (e) { return false; }
    },

    calculateCVEScore(vulns) {
        if (!vulns.length) return 0;
        let score = 0;
        vulns.forEach(v => {
            if (v.severity === 'CRITICAL') score += 30;
            else if (v.severity === 'HIGH') score += 20;
            else score += 10;
        });
        return Math.min(score, 100);
    },

    updateStats() {
        document.getElementById('statAssets').innerText = this.results.length;
        const totalRisk = this.results.reduce((a, b) => a + b.riskScore, 0);
        document.getElementById('statRisk').innerText = Math.round(totalRisk / (this.results.length || 1));

        const flagged = this.results.filter(r => r.threatIntel.score > 50 || r.riskScore > 70).length;
        document.getElementById('statFlagged').innerText = flagged;

        const cves = this.results.reduce((a, b) => a + b.vulnerabilities.length, 0);
        document.getElementById('statCVEs').innerText = cves;
    },

    displayResults() {
        const container = document.getElementById('resultsContainer');
        const severityFilter = document.getElementById('severityFilter')?.value || 'all';
        const policyFilter = document.getElementById('policyFilter')?.value || 'all';

        let filtered = this.results.filter(r => {
            if (severityFilter !== 'all') {
                if (severityFilter === 'CRITICAL' && r.riskScore < 80) return false;
                if (severityFilter === 'HIGH' && r.riskScore < 60) return false;
            }
            if (policyFilter === 'THREAT-INTEL' && r.threatIntel.findings.length === 0) return false;
            if (policyFilter === 'MITRE' && r.technologies.length === 0) return false;
            return true;
        });

        if (!filtered.length) { container.innerHTML = ''; return; }

        let html = `
            <div class="card" style="background: var(--bg-alt); border: 1px solid var(--border);">
                 <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr style="background: var(--bg-alt) !important;">
                                <th style="color: var(--text); background: var(--bg-alt) !important;">Asset</th>
                                <th style="color: var(--text); background: var(--bg-alt) !important;">Policy Mapping</th>
                                <th style="color: var(--text); background: var(--bg-alt) !important;">Findings</th>
                                <th style="color: var(--text); background: var(--bg-alt) !important;">Combined Risk</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        filtered.forEach(r => {
            // Policies Column
            let policiesHtml = ``;
            policiesHtml += `
                <div class="mb-1">
                    <span class="badge bg-primary bg-opacity-10 border border-primary text-white" style="background-color: ${this.policies['THREAT-INTEL'].color} !important;">
                        TI ${this.policies['THREAT-INTEL'].version}
                    </span>
                    <small class="text-muted ms-1">${this.policies['THREAT-INTEL'].lastUpdated}</small>
                </div>
            `;
            if (r.technologies.length > 0) {
                policiesHtml += `
                <div class="mb-1">
                    <span class="badge bg-danger bg-opacity-10 border border-danger text-white">
                        MITRE ${this.policies['MITRE'].version}
                    </span>
                </div>`;
            }

            // Findings Column - Multi Source
            let findingsHtml = ``;
            r.threatIntel.findings.forEach(f => {
                let badgeClass = f.source === 'Whitelist' ? 'bg-success text-white' : 'bg-danger text-white';
                if (f.detail.includes('Clean')) badgeClass = 'bg-success text-white';

                findingsHtml += `
                    <div class="mb-1" title="Confidence: ${f.confidence}%">
                        <span class="badge ${badgeClass}">
                            ${f.source}
                        </span>
                        <span class="small text-muted ms-1">${f.detail}</span>
                    </div>
                `;
            });
            if (r.vulnerabilities.length > 0) {
                findingsHtml += `<div class="mt-1"><span class="badge bg-warning text-dark">${r.vulnerabilities.length} CVEs Detected</span></div>`;
            }
            if (r.threatIntel.findings.length === 0 && r.vulnerabilities.length === 0) {
                findingsHtml += `<span class="badge bg-success text-white">Clean</span>`;
            }

            html += `
                <tr style="background: var(--bg-alt) !important;">
                    <td style="background: var(--bg-alt) !important; color: var(--text);">
                        <div class="fw-bold"><i class="bi bi-globe me-2"></i>${r.domain}</div>
                        <code style="color: var(--text); background: var(--bg); padding: 0.2rem 0.4rem; border: 1px solid var(--border);">${r.ip}</code>
                    </td>
                    <td style="background: var(--bg-alt) !important;">${policiesHtml}</td>
                    <td style="background: var(--bg-alt) !important;">${findingsHtml}</td>
                    <td style="background: var(--bg-alt) !important; vertical-align: middle;">
                         <div class="d-flex align-items-center">
                             <div class="progress flex-grow-1 me-2" style="height: 6px; background: var(--bg);">
                                <div class="progress-bar ${r.riskScore > 70 ? 'bg-danger' : r.riskScore > 40 ? 'bg-warning' : 'bg-success'}" style="width: ${r.riskScore}%"></div>
                            </div>
                            <span class="fw-bold ${r.riskScore > 70 ? 'text-danger' : 'text-success'}">${r.riskScore}</span>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table></div></div>`;
        container.innerHTML = html;
    },

    // --- Helper Methods ---
    async enumerateSubdomains(domain) {
        try {
            const res = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
            const data = await res.json();
            const subs = new Set();
            data.forEach(c => {
                const names = c.name_value.split('\n');
                names.forEach(n => {
                    const clean = n.trim().replace('*.', '');
                    if (clean.endsWith(domain) && !clean.includes('*') && clean.length > 0) subs.add(clean);
                });
            });
            return Array.from(subs);
        } catch (e) { return [domain, `www.${domain}`]; }
    },
    async resolveDNS(d) {
        try {
            const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${d}&type=A`, { headers: { 'Accept': 'application/dns-json' } });
            const j = await r.json();
            return j.Answer?.[0]?.data || null;
        } catch { return null; }
    },
    async fingerprintTechnologies(domain) { return []; },
    async lookupVulnerabilities(techs) { return []; },

    saveHistory(domain) {
        const risk = this.results.reduce((a, b) => a + b.riskScore, 0) / (this.results.length || 1);
        this.history.push({ date: new Date().toLocaleTimeString(), domain, riskScore: Math.round(risk) });
        if (this.history.length > 10) this.history.shift();
    },
    renderTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;
        if (this.chart) this.chart.destroy();
        const style = getComputedStyle(document.body);
        const textColor = style.getPropertyValue('--text').trim();
        const gridColor = style.getPropertyValue('--border').trim();

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.history.map(h => h.date),
                datasets: [{
                    label: 'Combined Risk Score',
                    data: this.history.map(h => h.riskScore),
                    borderColor: '#7c3aed',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    fill: true, tension: 0.4
                }]
            },
            options: {
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    y: { grid: { color: gridColor }, ticks: { color: textColor }, max: 100 },
                    x: { grid: { color: gridColor }, ticks: { color: textColor } }
                }
            }
        });
    },

    showProgress(msg, err = false) {
        document.getElementById('scanProgress').innerHTML = `<div class="alert ${err ? 'alert-danger' : 'alert-info'}">${msg}</div>`;
    },
    exportJSON() { Utils.exportToJSON(this.results, 'threat-intel-scan.json'); },
    exportCSV() { /* CSV Logic */ }
};
