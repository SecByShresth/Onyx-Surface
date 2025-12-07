# 🛡️ Onyx Surface - Threat Intelligence Platform

> **100% Client-Side, Ephemeral, Enterprise-Grade Security Scanner**

![Version](https://img.shields.io/badge/version-v1.1-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Privacy](https://img.shields.io/badge/privacy-100%25%20local-green.svg)

## 🎯 Overview

**Onyx Surface** is a modern threat intelligence and attack surface management platform that runs entirely in your browser. It requires **no backend server**, **no database**, and transmits **no sensitive data**.

### 🚀 Key Modules

1.  **Attack Surface Intelligence**: 
    *   **Threat Intel**: Aggregates VirusTotal, AbuseIPDB, and Spamhaus.
    *   **MITRE ATT&CK**: Maps findings to Tactic IDs (e.g., T1190).
    *   **Risk Scoring**: Combined risk score based on CVEs, TI Confidence, and Exposure.
2.  **IaC Security Scanner**: 
    *   **CIS Benchmarks**: AWS, Kubernetes, and Docker compliance checks.
    *   **Ephemeral**: Upload Terraform/K8s files for instant scanning.
3.  **Supply Chain Security**: 
    *   **SBOM Analysis**: Supports CycloneDX & SPDX.
    *   **Visualizations**: Dependency Trees and Health Charts.

## 🌐 Live Demo

You can host this project directly on **GitHub Pages**!

## ✨ Technology Stack

*   **Core**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Dark Theme).
*   **UI**: Bootstrap 5 + Bootstrap Icons.
*   **Visualizations**: Chart.js.
*   **Intelligence**: 
    *   DNS-over-HTTPS (Cloudflare)
    *   Public APIs (OSV.dev, crt.sh)
    *   Optional Keys (VirusTotal, AbuseIPDB) - *Ephemeral Session Only*

## 🚀 Quick Start (GitHub Pages)

1.  Fork this repository.
2.  Go to **Settings** > **Pages**.
3.  Select **Source**: `Deploy from a branch` (main / root).
4.  Visit your site at `https://SecByShresth.github.io/onyx-surface/`.

## 💻 Local Development

You can run this locally using any static file server.

### Option 1: Python (Included)
The repo includes a legacy `app.py` helper for convenience.
```bash
python app.py
# Open http://localhost:5000
```
*Note: The Python backend is optional and not required for the app to function.*

### Option 2: Node.js / VS Code
*   Use "Live Server" extension in VS Code.
*   Or run `npx http-server .`

## 🔐 Privacy & Security

*   **Ephemeral**: All scans are performed in-memory. Refreshing the page wipes all data, History, and API keys.
*   **Client-Side Scans**: Files (IaC, SBOM) are parsed in the browser using FileReader API. They are never uploaded.
*   **API Keys**: If you provide keys (VirusTotal/AbuseIPDB), they are stored in `sessionStorage` and used only for direct calls from your browser to the vendor.

## 📁 Project Structure

```
onyx-surface/
├── index.html                      # Main Entry Point
├── static/
│   ├── css/                        # Styles
│   └── js/
│       ├── app.js                  # Router
│       └── modules/
│           ├── attack-surface.js   # Threat Intel & MITRE Logic
│           ├── iac-scanner.js      # CIS Benchmark Logic
│           └── supply-chain.js     # SBOM & OSV Logic
├── app.py                          # Optional Local Dev Server
└── README.md                       # Documentation
```

## 📝 License

MIT License. Free for enterprise and personal use.

---

**Built with ❤️ for the security community**

