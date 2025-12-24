/* sha512.js - Dynamic Positioning Fix */

function renderSHA512(container) {
    // 1. Reset Layout
    container.className = ''; 
    container.style.display = 'block'; 
    container.style.padding = '0';

    // 2. CSS Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .viz-container {
            width: 100%;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .module-header { 
            margin-bottom: 25px; 
            border-bottom: 2px solid #f1f5f9; 
            padding-bottom: 20px; 
            display: flex; flex-direction: column; gap: 10px;
        }
        .module-title { 
            font-size: 1.8rem; color: #0f172a; font-weight: 800; 
            display: flex; align-items: center; gap: 12px; 
        }
        .module-subtitle { color: #64748b; font-size: 1rem; line-height: 1.5; }
        
        .goals-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 15px;
            margin-bottom: 30px; background: #f8fafc; padding: 20px;
            border-radius: 12px; border: 1px solid #e2e8f0;
        }
        .goal-item { display: flex; gap: 10px; align-items: flex-start; }
        .goal-icon { color: #3b82f6; flex-shrink: 0; margin-top: 2px; }
        .goal-text strong { color: #334155; display: block; margin-bottom: 2px; }
        .goal-text span { color: #64748b; font-size: 0.85rem; line-height: 1.4; display: block; }

        /* STAGE */
        .stage-area {
            width: 100%; height: 240px; background: #fff;
            border: 2px dashed #cbd5e1; border-radius: 12px;
            position: relative; display: flex; align-items: center; justify-content: space-between;
            padding: 0 80px; overflow: hidden; margin-bottom: 20px;
        }

        .cable-line {
            position: absolute; top: 50%; left: 80px; right: 80px;
            height: 6px; background: #e2e8f0; z-index: 0; transform: translateY(-50%); border-radius: 3px;
        }

        /* ACTORS */
        .actor-node {
            position: relative; z-index: 10; text-align: center;
            background: white; padding: 15px; border-radius: 12px;
            border: 2px solid #e2e8f0; width: 110px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: all 0.3s;
        }
        .actor-icon svg { width: 36px; height: 36px; stroke-width: 1.5; }
        .actor-name { margin-top: 8px; font-weight: 700; color: #334155; font-size: 0.9rem; }
        .actor-role { font-size: 0.7rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }

        .alice .actor-icon { color: #3b82f6; }
        .bob .actor-icon { color: #10b981; }
        .alice.denying { border-color: #ef4444; background: #fee2e2; }
        .alice.denying .actor-icon { color: #ef4444; }

        /* EVE */
        .eve-node {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.4; border-color: #94a3b8;
            background: rgba(255,255,255,0.95); z-index: 5;
            transition: all 0.4s ease;
        }
        .eve-node.active-snoop {
            opacity: 1; transform: translate(-50%, -50%) scale(1.1);
            border-color: #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
        }
        .eve-node.active-attack {
            opacity: 1; transform: translate(-50%, -50%) scale(1.1);
            border-color: #ef4444; box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
        }
        .eve-node.active-impersonate {
            opacity: 1; transform: translate(-50%, -50%) scale(1.1);
            border-color: #8b5cf6; box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        /* PACKET */
        .packet-obj {
            width: 50px; height: 32px; background: #3b82f6; color: white;
            border-radius: 6px; position: absolute; top: 50%; left: 0;
            transform: translate(0, -50%); display: flex; align-items: center; justify-content: center;
            z-index: 15; opacity: 0; font-weight: bold; font-family: monospace; font-size: 0.8rem;
        }
        .packet-obj.red { background: #ef4444; } 
        .packet-obj.purple { background: #8b5cf6; } 

        /* CONTROLS */
        .controls-area {
            display: flex; flex-direction: column; gap: 15px;
            background: #f8fafc; border: 1px solid #e2e8f0;
            padding: 20px; border-radius: 12px; color: #334155;
        }
        .console-text {
            font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #334155;
            display: flex; align-items: center; gap: 10px; min-height: 24px;
            background: white; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;
        }
        .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .btn-scenario {
            flex: 1; padding: 12px; border: none; border-radius: 6px;
            cursor: pointer; font-weight: 600; font-size: 0.85rem;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: transform 0.1s, box-shadow 0.1s; color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .btn-scenario:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.15); }
        .btn-conf { background: #f59e0b; }
        .btn-inte { background: #ef4444; } 
        .btn-auth { background: #8b5cf6; } 
        .btn-nrep { background: #3b82f6; } 
    `;
    
    const oldStyle = document.getElementById('sha-style');
    if(oldStyle) oldStyle.remove();
    style.id = 'sha-style';
    document.head.appendChild(style);

    // 3. Render HTML
    container.innerHTML = `
        <div class="viz-container">
            <div class="module-header">
                <div class="module-title">
                    <i data-feather="hash"></i> SHA-512: Security Concepts
                </div>
                <div class="module-subtitle">
                    Before we solve the problem with Hashing, we must define the 4 risks in an unprotected environment.
                </div>
            </div>

            <div class="goals-grid">
                <div class="goal-item">
                    <div class="goal-icon"><i data-feather="eye"></i></div>
                    <div class="goal-text">
                        <strong>1. Privacy/Confidentiality</strong>
                        <span>Risk: Eve eavesdrops. Information is disclosed to unauthorized entities.</span>
                    </div>
                </div>
                <div class="goal-item">
                    <div class="goal-icon"><i data-feather="alert-triangle"></i></div>
                    <div class="goal-text">
                        <strong>2. Integrity</strong>
                        <span>Risk: Eve alters the message deliberately or accidentally.</span>
                    </div>
                </div>
                <div class="goal-item">
                    <div class="goal-icon"><i data-feather="user-x"></i></div>
                    <div class="goal-text">
                        <strong>3. Authentication</strong>
                        <span>Risk: Eve pretends to be Alice. Bob lacks validation of source identity.</span>
                    </div>
                </div>
                <div class="goal-item">
                    <div class="goal-icon"><i data-feather="shield-off"></i></div>
                    <div class="goal-text">
                        <strong>4. Non-Repudiation</strong>
                        <span>Risk: Alice sends a message but later denies sending it.</span>
                    </div>
                </div>
            </div>

            <div class="stage-area">
                <div class="cable-line"></div>
                <div id="alice-actor" class="actor-node alice">
                    <div class="actor-icon"><i data-feather="monitor"></i></div>
                    <div class="actor-name">Alice</div>
                    <div class="actor-role">Sender</div>
                </div>
                <div id="eve-actor" class="actor-node eve-node">
                    <div class="actor-icon"><i data-feather="eye"></i></div>
                    <div class="actor-name">Eve</div>
                    <div class="actor-role">Adversary</div>
                </div>
                <div id="bob-actor" class="actor-node bob">
                    <div class="actor-icon"><i data-feather="server"></i></div>
                    <div class="actor-name">Bob</div>
                    <div class="actor-role">Receiver</div>
                </div>
                <div id="demo-packet" class="packet-obj">DATA</div>
            </div>

            <div class="controls-area">
                <div class="console-text">
                    <i data-feather="terminal" style="color:#64748b"></i>
                    <span id="console-text">Select a security goal to visualize the failure scenario.</span>
                </div>
                <div class="btn-row">
                    <button class="btn-scenario btn-conf" onclick="runScenario('confidentiality')">
                        <i data-feather="eye"></i> Confidentiality
                    </button>
                    <button class="btn-scenario btn-inte" onclick="runScenario('integrity')">
                        <i data-feather="alert-triangle"></i> Integrity
                    </button>
                    <button class="btn-scenario btn-auth" onclick="runScenario('authentication')">
                        <i data-feather="user-x"></i> Authentication
                    </button>
                    <button class="btn-scenario btn-nrep" onclick="runScenario('non-repudiation')">
                        <i data-feather="shield-off"></i> Non-Repudiation
                    </button>
                </div>
            </div>

            <div id="content-append-zone"></div>
        </div>
    `;
    feather.replace();
}

// --- LOGIC ENGINE ---

function runScenario(type) {
    const packet = document.getElementById('demo-packet');
    const eve = document.getElementById('eve-actor');
    const alice = document.getElementById('alice-actor');
    const bob = document.getElementById('bob-actor'); // Need Bob for target position
    const consoleText = document.getElementById('console-text');

    // 1. DYNAMIC POSITION CALCULATION
    // This fixes the "Not starting from Alice" bug by getting the exact pixel count.
    const aliceX = alice.offsetLeft + (alice.offsetWidth / 2) - 25; // Center of Alice
    const eveX = eve.offsetLeft + (eve.offsetWidth / 2) - 25; // Center of Eve
    const bobX = bob.offsetLeft + (bob.offsetWidth / 2) - 25; // Center of Bob

    // 2. HARD RESET
    packet.style.transition = 'none';
    packet.style.opacity = '0';
    packet.className = 'packet-obj'; 
    packet.innerText = "DATA";
    
    eve.className = 'actor-node eve-node'; 
    alice.className = 'actor-node alice'; 
    
    void packet.offsetWidth;

    // 3. LOGIC SELECTION
    if (type === 'authentication') {
        // --- CASE 3: AUTHENTICATION ---
        // Start at Eve
        packet.style.left = eveX + 'px'; 
        packet.classList.add('purple'); 
        packet.innerText = "FAKE";
        packet.style.opacity = '1';
        eve.classList.add('active-impersonate');
        
        consoleText.innerHTML = "Scenario: Eve pretends to be Alice...";

        // Animate to Bob
        setTimeout(() => {
            packet.style.transition = 'left 1.5s linear';
            packet.style.left = bobX + 'px';
            
            setTimeout(() => {
                consoleText.innerHTML = "<strong style='color:#8b5cf6'>FAILURE:</strong> Bob accepts message as Alice's. (Source Unverified)";
                eve.className = 'actor-node eve-node';
            }, 1500);
        }, 500);

    } else {
        // --- CASES 1, 2, 4 ---
        // Start at Alice (DYNAMICALLY SET)
        packet.style.left = aliceX + 'px'; 
        packet.style.opacity = '1';
        
        consoleText.innerHTML = "Alice sends data to Bob...";

        // Animate to Eve (Center)
        setTimeout(()=> {
            packet.style.transition = 'left 1.5s linear';
            packet.style.left = eveX + 'px';
        }, 100); // Small delay to allow transition to take effect

        setTimeout(() => {
            // EVENTS AT EVE
            if (type === 'confidentiality') {
                eve.classList.add('active-snoop');
                consoleText.innerHTML = "<span style='color:#f59e0b'>ALERT:</span> Eve is reading the confidential data!";
            }
            else if (type === 'integrity') {
                eve.classList.add('active-attack');
                packet.classList.add('red');
                packet.innerText = "HACK";
                consoleText.innerHTML = "<span style='color:#ef4444'>ALERT:</span> Eve modified the message!";
            }
            else if (type === 'non-repudiation') {
                consoleText.innerHTML = "Message traveling through network...";
            }

            // Continue to Bob
            setTimeout(() => {
                packet.style.left = bobX + 'px';

                setTimeout(() => {
                    // RESULTS AT BOB
                    if (type === 'confidentiality') {
                        consoleText.innerHTML = "Result: <strong style='color:#f59e0b'>Confidentiality Lost</strong>. Eve saw the data.";
                        eve.className = 'actor-node eve-node';
                    }
                    else if (type === 'integrity') {
                        consoleText.innerHTML = "Result: <strong style='color:#ef4444'>Integrity Lost</strong>. Bob received hacked data.";
                        eve.className = 'actor-node eve-node';
                    }
                    else if (type === 'non-repudiation') {
                        alice.classList.add('denying');
                        consoleText.innerHTML = "<strong style='color:#ef4444'>FAILURE:</strong> Bob got data, but Alice claims: 'I never sent that!'";
                    }

                }, 1500);
            }, 1000);

        }, 1600);
    }
}

// Helper
function appendContent(html) {
    const zone = document.getElementById('content-append-zone');
    const div = document.createElement('div');
    div.innerHTML = html;
    zone.appendChild(div);
    feather.replace();
}