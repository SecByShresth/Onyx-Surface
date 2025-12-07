// Dashboard Module - Fixed for Dark Theme

const Dashboard = {
    render() {
        return `
            <!-- Hero Section -->
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-8">
                            <div class="badge bg-primary mb-3 text-white" style="font-size: 1rem; padding: 0.8rem 1.2rem;">
                                <i class="bi bi-activity me-2"></i>
                                100% Browser-Based Security Platform
                            </div>
                            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--text);">
                                Enterprise-Grade Security,<br>
                                <span class="gradient-text">Zero Backend Required</span>
                            </h1>
                            <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                                Comprehensive attack surface mapping, cloud security scanning, and supply chain analysis—all running locally in your browser with complete privacy.
                            </p>
                            <div class="d-flex gap-3 flex-wrap">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">No data transmission</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Ephemeral sessions</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Open source feeds</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 text-center mt-4 mt-lg-0">
                            <div class="p-5 rounded-circle d-inline-block" style="background: linear-gradient(135deg, var(--blue), var(--cyan));">
                                <i class="bi bi-shield-check" style="font-size: 5rem; color: white;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Access Cards -->
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="card h-100 module-card" data-module="attack-surface">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-3">
                                <div class="p-3 rounded" style="background: rgba(59, 130, 246, 0.1);">
                                    <i class="bi bi-shield-exclamation" style="font-size: 2rem; color: var(--blue);"></i>
                                </div>
                                <i class="bi bi-arrow-right" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600;">Attack Surface</h5>
                            <p style="color: var(--text-muted);">Scan domains & services</p>
                            <div class="mt-3">
                                <span class="badge bg-success">Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 module-card" data-module="iac-scanner">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-3">
                                <div class="p-3 rounded" style="background: rgba(6, 182, 212, 0.1);">
                                    <i class="bi bi-cloud-check" style="font-size: 2rem; color: var(--cyan);"></i>
                                </div>
                                <i class="bi bi-arrow-right" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600;">IaC Security</h5>
                            <p style="color: var(--text-muted);">Analyze cloud configs</p>
                            <div class="mt-3">
                                <span class="badge bg-success">Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 module-card" data-module="supply-chain">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-3">
                                <div class="p-3 rounded" style="background: rgba(245, 158, 11, 0.1);">
                                    <i class="bi bi-box-seam" style="font-size: 2rem; color: var(--orange);"></i>
                                </div>
                                <i class="bi bi-arrow-right" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600;">Supply Chain</h5>
                            <p style="color: var(--text-muted);">Check dependencies</p>
                            <div class="mt-3">
                                <span class="badge bg-success">Ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features -->
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="p-3 rounded mb-3 d-inline-block" style="background: linear-gradient(135deg, var(--blue), var(--cyan));">
                                <i class="bi bi-shield-exclamation" style="font-size: 1.5rem; color: white;"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600; margin-bottom: 1rem;">Attack Surface Intelligence</h5>
                            <p style="color: var(--text-muted); margin-bottom: 1rem;">
                                Discover subdomains, fingerprint technologies, and map vulnerabilities with EPSS & KEV risk scoring.
                            </p>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">DNS-over-HTTPS enumeration</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Technology fingerprinting</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">CVE mapping with OSV.dev</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">EPSS & KEV risk scoring</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="p-3 rounded mb-3 d-inline-block" style="background: linear-gradient(135deg, var(--cyan), var(--blue));">
                                <i class="bi bi-cloud-check" style="font-size: 1.5rem; color: white;"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600; margin-bottom: 1rem;">Cloud Config & IaC Scanner</h5>
                            <p style="color: var(--text-muted); margin-bottom: 1rem;">
                                Scan Terraform, Kubernetes, Dockerfiles, and cloud policies for security misconfigurations.
                            </p>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Terraform security analysis</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Kubernetes YAML validation</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Dockerfile best practices</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">CIS-based policy checks</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="p-3 rounded mb-3 d-inline-block" style="background: linear-gradient(135deg, var(--orange), var(--red));">
                                <i class="bi bi-box-seam" style="font-size: 1.5rem; color: white;"></i>
                            </div>
                            <h5 style="color: var(--text); font-weight: 600; margin-bottom: 1rem;">SBOM & Supply Chain</h5>
                            <p style="color: var(--text-muted); margin-bottom: 1rem;">
                                Analyze dependencies, detect vulnerabilities, and verify signatures for complete supply chain visibility.
                            </p>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">CycloneDX & SPDX support</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Generate SBOMs from manifests</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">OSV.dev vulnerability lookups</span>
                                </li>
                                <li class="mb-2">
                                    <i class="bi bi-check-circle me-2" style="color: var(--green);"></i>
                                    <span style="color: var(--text);">Dependency graph visualization</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // Add click handlers to module cards
        document.querySelectorAll('.module-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const module = card.dataset.module;
                App.loadModule(module);
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                document.querySelector(`.nav-item[data-module="${module}"]`).classList.add('active');
            });
        });
    }
};
