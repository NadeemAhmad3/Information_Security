// Configuration for Modules
const modules = [
    {
        id: 'aes',
        title: 'AES Algorithm',
        desc: 'Symmetric block cipher. Visualizing the State Matrix, SubBytes, and ShiftRows.',
        progress: 10,
        difficulty: 'Intermediate'
    },
    {
        id: 'des',
        title: 'DES Feistel',
        desc: 'The legacy standard. Visualizing binary XOR operations and key mixing.',
        progress: 0,
        difficulty: 'Hard'
    },
    {
        id: 'sha512',
        title: 'SHA-512 Hashing',
        desc: 'Secure Hash Algorithm 2. Visualizing Padding, Message Schedule, and Compression.',
        progress: 0,
        difficulty: 'Advanced'
    }
];

// Password configuration
const CORRECT_PASSWORD = "nadeembmv+degree";
let isAuthenticated = false;

// On Load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('cipherlab_authenticated');
    if (authStatus === 'true') {
        isAuthenticated = true;
        loadModule('dashboard');
    } else {
        showPasswordScreen();
    }
});

function showPasswordScreen() {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar');
    
    // Hide main header and sidebar
    header.style.display = 'none';
    sidebar.style.display = 'none';
    
    // Update page title
    pageTitle.innerText = "Secure Access";
    pageTitle.style.textAlign = 'center';
    pageTitle.style.width = '100%';
    
    // Create password screen
    contentArea.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            width: 100%;
        ">
            <div style="
                background: white;
                border-radius: 16px;
                padding: 40px;
                width: 100%;
                max-width: 450px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                border: 1px solid #e2e8f0;
            ">
                <!-- Brand Logo -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        width: 64px;
                        height: 64px;
                        border-radius: 12px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 20px;
                    ">
                        <i data-feather="shield" style="width: 32px; height: 32px; color: white;"></i>
                    </div>
                    <h2 style="color: #1e293b; margin: 0 0 8px 0; font-size: 1.8rem;">CipherLab</h2>
                    <p style="color: #64748b; margin: 0; font-size: 0.95rem;">Security Visualization Platform</p>
                </div>
                
                <!-- Password Form -->
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #334155; margin-bottom: 20px; font-size: 1.3rem; text-align: center;">
                        Secure Access Required
                    </h3>
                    
                    <div style="
                        background: #f8fafc;
                        border-left: 4px solid #3b82f6;
                        padding: 16px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                    ">
                        <p style="color: #475569; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                            <i data-feather="key" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 8px;"></i>
                            Enter the key provided by <strong>Nadeem</strong> to access the security laboratory.
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="
                            display: block;
                            color: #475569;
                            margin-bottom: 8px;
                            font-weight: 500;
                            font-size: 0.9rem;
                        ">
                            Access Key
                        </label>
                        <input type="password" 
                               id="password-input" 
                               placeholder="Enter the access key..."
                               style="
                                    width: 100%;
                                    padding: 14px 16px;
                                    border: 2px solid #e2e8f0;
                                    border-radius: 10px;
                                    font-family: 'JetBrains Mono', monospace;
                                    font-size: 0.95rem;
                                    color: #1e293b;
                                    transition: all 0.2s;
                               "
                               onkeypress="if(event.key === 'Enter') checkPassword()">
                        <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
                            <i data-feather="info" style="width: 14px; height: 14px; color: #94a3b8;"></i>
                            <span style="font-size: 0.8rem; color: #94a3b8;">Case-sensitive access key required</span>
                        </div>
                    </div>
                    
                    <!-- Error Message -->
                    <div id="error-message" style="
                        display: none;
                        background: #fef2f2;
                        border: 1px solid #fecaca;
                        color: #dc2626;
                        padding: 12px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        font-size: 0.9rem;
                    ">
                        <i data-feather="alert-triangle" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 8px;"></i>
                        <span id="error-text">Incorrect access key. Please try again.</span>
                    </div>
                    
                    <!-- Submit Button -->
                    <button onclick="checkPassword()" 
                            style="
                                width: 100%;
                                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                                color: white;
                                border: none;
                                padding: 16px;
                                border-radius: 10px;
                                font-weight: 600;
                                font-size: 0.95rem;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 10px;
                                transition: all 0.2s;
                            "
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(59, 130, 246, 0.3)'"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        <i data-feather="unlock" style="width: 18px; height: 18px;"></i>
                        Access Laboratory
                    </button>
                </div>
                
                <!-- Security Notice -->
                <div style="
                    border-top: 1px solid #e2e8f0;
                    padding-top: 20px;
                    text-align: center;
                ">
                    <p style="color: #94a3b8; font-size: 0.8rem; margin: 0; line-height: 1.5;">
                        <i data-feather="shield" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px;"></i>
                        This system contains sensitive cryptographic visualizations. Access is restricted to authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Initialize icons
    feather.replace();
    
    // Focus on input field
    setTimeout(() => {
        document.getElementById('password-input').focus();
    }, 100);
}

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const button = document.querySelector('button[onclick="checkPassword()"]');
    
    if (passwordInput.value === CORRECT_PASSWORD) {
        // Correct password - show success animation
        button.innerHTML = '<i data-feather="check" style="width: 18px; height: 18px;"></i> Access Granted!';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.disabled = true;
        errorDiv.style.display = 'none';
        
        // Store authentication status
        localStorage.setItem('cipherlab_authenticated', 'true');
        isAuthenticated = true;
        
        // Show success message
        setTimeout(() => {
            // Restore header and sidebar
            document.querySelector('header').style.display = 'flex';
            document.querySelector('.sidebar').style.display = 'block';
            
            // Load dashboard
            loadModule('dashboard');
        }, 1000);
        
    } else {
        // Wrong password - show error
        errorText.textContent = passwordInput.value ? 
            "Incorrect access key. Please try again." : 
            "Please enter the access key.";
        errorDiv.style.display = 'block';
        passwordInput.style.borderColor = '#ef4444';
        passwordInput.focus();
        
        // Shake animation for error
        passwordInput.style.animation = 'none';
        setTimeout(() => {
            passwordInput.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        // Reset animation after it completes
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
    
    feather.replace();
}

function loadModule(moduleName) {
    // Check authentication
    if (!isAuthenticated && moduleName !== 'dashboard') {
        showPasswordScreen();
        return;
    }
    
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    const header = document.querySelector('header');
    const sidebar = document.querySelector('.sidebar');
    
    // Make sure header and sidebar are visible
    if (header) header.style.display = 'flex';
    if (sidebar) sidebar.style.display = 'block';
    
    // Reset page title alignment
    pageTitle.style.textAlign = 'left';
    pageTitle.style.width = 'auto';
    
    // Update Sidebar Active State
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    
    // Find and activate the correct nav item
    const navItems = {
        'dashboard': 0,
        'aes': 1,
        'des': 2,
        'sha512': 3
    };
    
    if (navItems[moduleName] !== undefined) {
        const navLinks = document.querySelectorAll('.nav-links li');
        if (navLinks[navItems[moduleName]]) {
            navLinks[navItems[moduleName]].classList.add('active');
        }
    }

    if (moduleName === 'dashboard') {
        pageTitle.innerText = "System Overview";
        renderDashboard(contentArea);
    } 
    else if (moduleName === 'aes') {
        pageTitle.innerText = "AES Workspace";
        contentArea.innerHTML = `<div class="module-card" style="grid-column: span 3;"><h3>AES Logic Loading...</h3></div>`;
        // We will link the AES specific logic here later
    }
    else if (moduleName === 'des') {
        pageTitle.innerText = "DES Workspace";
        contentArea.innerHTML = `<div class="module-card" style="grid-column: span 3;"><h3>DES Logic Loading...</h3></div>`;
    }
    else if (moduleName === 'sha512') {
        pageTitle.innerText = "SHA-512 Laboratory";
        renderSHA512(contentArea); 
    }

    // IMPORTANT: Re-render icons for newly injected HTML
    setTimeout(() => { feather.replace(); }, 50); 
}

function renderDashboard(container) {
    container.innerHTML = '';

    // 1. Top Row: Stats
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-icon"><i data-feather="target"></i></div>
            <div class="stat-info">
                <h3>2</h3>
                <p>Active Topics</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i data-feather="calendar"></i></div>
            <div class="stat-info">
                <h3>14 Days</h3>
                <p>Until Exam</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i data-feather="activity"></i></div>
            <div class="stat-info">
                <h3>15%</h3>
                <p>Syllabus Covered</p>
            </div>
        </div>
    `;

    // 2. Bottom Row: Module Grid
    let modulesHTML = '';
    modules.forEach(mod => {
        modulesHTML += `
            <div class="module-card" onclick="loadModule('${mod.id}')">
                <div class="module-header">
                    <div class="module-title">${mod.title}</div>
                    <i data-feather="chevron-right" style="color: #cbd5e1;"></i>
                </div>
                <div class="module-desc">${mod.desc}</div>
                
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${mod.progress}%"></div>
                </div>
                <div class="meta-row">
                    <span>${mod.difficulty}</span>
                    <span>${mod.progress}% Complete</span>
                </div>
            </div>
        `;
    });

    // Inject
    container.innerHTML = statsHTML + modulesHTML;
}

// Add a shake animation for incorrect password
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
