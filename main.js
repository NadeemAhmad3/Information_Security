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

// On Load
document.addEventListener('DOMContentLoaded', () => {
    loadModule('dashboard');
});

function loadModule(moduleName) {
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    
    // Update Sidebar Active State
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    // (Logic to match `moduleName` to `li` would go here in a larger app)

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