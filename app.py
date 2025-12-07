"""
Onyx Surface - Flask Backend
Browser-Only Security Platform with Python API
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='.')
CORS(app)

# ============================================
# Routes
# ============================================

@app.route('/')
def index():
    """Serve the main HTML page"""
    return render_template('index.html')

@app.route('/api/scan/attack-surface', methods=['POST'])
def scan_attack_surface():
    """
    Attack Surface Intelligence Scanner
    Performs subdomain enumeration, tech fingerprinting, and CVE mapping
    """
    data = request.json
    domain = data.get('domain', '')
    
    if not domain:
        return jsonify({'error': 'Domain is required'}), 400
    
    # Mock results for demonstration
    # In production, this would call real scanning functions
    results = [
        {
            'domain': f'www.{domain}',
            'ipAddress': '93.184.216.34',
            'technologies': [
                {'name': 'Nginx', 'version': '1.18.0', 'category': 'Web Server', 'confidence': 95},
                {'name': 'React', 'version': '18.2.0', 'category': 'JavaScript Framework', 'confidence': 90}
            ],
            'vulnerabilities': [
                {
                    'id': 'CVE-2024-1234',
                    'title': 'Nginx HTTP Request Smuggling',
                    'description': 'A vulnerability in Nginx allows HTTP request smuggling attacks.',
                    'severity': 'HIGH',
                    'cvssScore': 7.5,
                    'epssScore': 0.42,
                    'isKEV': False,
                    'publishedDate': '2024-01-15'
                }
            ],
            'riskScore': 65,
            'lastScanned': datetime.now().isoformat()
        },
        {
            'domain': f'api.{domain}',
            'ipAddress': '93.184.216.35',
            'technologies': [
                {'name': 'Express', 'version': '4.18.2', 'category': 'Web Framework', 'confidence': 92},
                {'name': 'Node.js', 'version': '18.16.0', 'category': 'Runtime', 'confidence': 98}
            ],
            'vulnerabilities': [
                {
                    'id': 'CVE-2024-5678',
                    'title': 'Express.js Path Traversal',
                    'description': 'Path traversal vulnerability in Express.js static file serving.',
                    'severity': 'CRITICAL',
                    'cvssScore': 9.1,
                    'epssScore': 0.78,
                    'isKEV': True,
                    'publishedDate': '2024-03-10'
                }
            ],
            'riskScore': 92,
            'lastScanned': datetime.now().isoformat()
        },
        {
            'domain': f'cdn.{domain}',
            'ipAddress': '93.184.216.36',
            'technologies': [
                {'name': 'Cloudflare', 'version': None, 'category': 'CDN', 'confidence': 100}
            ],
            'vulnerabilities': [],
            'riskScore': 15,
            'lastScanned': datetime.now().isoformat()
        }
    ]
    
    return jsonify({'results': results})

@app.route('/api/scan/iac', methods=['POST'])
def scan_iac():
    """
    IaC Security Scanner
    Analyzes Terraform, Kubernetes, Dockerfiles for misconfigurations
    """
    # Implementation placeholder
    return jsonify({'message': 'IaC scanner endpoint - implementation in progress'})

@app.route('/api/scan/sbom', methods=['POST'])
def scan_sbom():
    """
    SBOM & Supply Chain Scanner
    Analyzes dependencies for vulnerabilities
    """
    # Implementation placeholder
    return jsonify({'message': 'SBOM scanner endpoint - implementation in progress'})

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

# ============================================
# Error Handlers
# ============================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ============================================
# Main
# ============================================

if __name__ == '__main__':
    print("""
    ╔═══════════════════════════════════════════╗
    ║   Onyx Surface - Security Platform       ║
    ║   Browser-Only with Python Backend       ║
    ╚═══════════════════════════════════════════╝
    
    Server running at: http://localhost:5000
    Press CTRL+C to quit
    """)
    app.run(debug=True, host='0.0.0.0', port=5000)
