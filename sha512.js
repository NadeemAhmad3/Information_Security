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
    
    // Add the Hash Introduction section after the main content
    addHashIntro();
    addAvalancheEffect();
    addHashAttacksSection(); 
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

// NEW SECTION: HASH INTRODUCTION
// Call this function to append the definition and requirements.
// NEW SECTION: HASH INTRODUCTION
// Call this function to append the definition and requirements.
function addHashIntro() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="check-circle" style="color:#10b981;"></i> The Solution: Hash Functions
                </div>
                <div class="module-subtitle">
                    To prevent the integrity loss shown above, we use a <strong>Hash Function</strong>. 
                    It acts as a digital fingerprint for data.
                </div>
            </div>

            <div style="background: #eef2ff; border-left: 4px solid #6366f1; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                <h3 style="margin:0 0 10px 0; color:#312e81; font-size:1.1rem;">Definition</h3>
                <p style="margin:0; font-family:'JetBrains Mono', monospace; color:#4338ca;">
                    h = H(M)
                </p>
                <p style="margin:10px 0 0 0; color:#4b5563; font-size:0.95rem;">
                    A hash function <strong>H</strong> accepts a variable-length block of data <strong>M</strong> 
                    as input and produces a fixed-size hash value or hash code or message digest <strong>h</strong> (e.g., 512 bits for SHA-512).
                </p>
            </div>

            <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:25px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom:30px;">
                <h4 style="margin-top:0;">Visualizing the Concept: Variable Input to Fixed Block</h4>
                <p style="color:#64748b; font-size:0.9rem; margin-bottom:20px;">
                    How do we handle "Variable Length" input? We use <strong>Padding</strong> to fill the empty space, ensuring the data fits into fixed-size blocks (1024 bits for SHA-512). The padding is <strong>deterministic</strong> - it always follows the same pattern regardless of message length.
                </p>

                <input type="text" id="hash-input-demo" placeholder="Type a message here..." 
                       oninput="updateBlockViz(this.value)"
                       style="width:100%; padding:12px; border:2px solid #cbd5e1; border-radius:8px; font-family:'JetBrains Mono'; margin-bottom:20px; outline:none; transition:border 0.2s;">

                <div style="display:flex; height:60px; width:100%; border:2px solid #334155; border-radius:6px; overflow:hidden; font-family:monospace; font-weight:bold; color:white;">
                    <div id="viz-msg" style="width:0%; background:#3b82f6; display:flex; align-items:center; justify-content:center; transition:width 0.2s;">M</div>
                    <div id="viz-pad" style="flex:1; background:#94a3b8; display:flex; align-items:center; justify-content:center; border-left:1px solid white;">Padding</div>
                    <div style="width:15%; background:#0f172a; display:flex; align-items:center; justify-content:center; border-left:1px solid white;">Len</div>
                </div>
                
                <div style="display:flex; justify-content:space-between; margin-top:5px; font-size:0.75rem; color:#64748b; font-family:'JetBrains Mono';">
                    <span>Variable Message (M) - <span id="bit-count">0 bits</span></span>
                    <span>Fixed Block Size: 1024 bits total (M + Padding + Length)</span>
                </div>
                
                <div style="margin-top:15px; padding:12px; background:#f0f9ff; border-radius:6px; border-left:3px solid #0ea5e9;">
                    <p style="margin:0; font-size:0.85rem; color:#0369a1;">
                        <strong>Note:</strong> Padding doesn't "expand" with message length because it's designed to fill exactly what's needed to reach 1024 bits. The length field (last 128 bits) stores the original message size in bits.
                    </p>
                </div>
            </div>

            <div>
                <h4 style="margin-bottom:15px;">Requirements for Hash Functions</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    
                    <div class="req-card">
                        <div class="req-num">1</div>
                        <div class="req-text">Can be applied to <strong>any sized message M</strong>.</div>
                    </div>
                    <div class="req-card">
                        <div class="req-num">2</div>
                        <div class="req-text">Produces <strong>fixed-length output h</strong> (e.g., 512 bits).</div>
                    </div>
                    <div class="req-card">
                        <div class="req-num">3</div>
                        <div class="req-text">Is <strong>easy to compute</strong> h = H(M).</div>
                    </div>
                    <div class="req-card">
                        <div class="req-num">4</div>
                        <div class="req-text">
                            <strong>One-way property (Preimage Resistance):</strong><br>
                            Given hash h, it's computationally infeasible to find any message x such that H(x) = h.<br>
                            <small style="color:#6b7280; display:block; margin-top:4px;">
                                <strong>Example:</strong> If h = H("secret"), given only h, you can't find "secret".
                            </small>
                        </div>
                    </div>
                    <div class="req-card">
                        <div class="req-num">5</div>
                        <div class="req-text">
                            <strong>Weak Collision Resistance (2nd Preimage Resistance):</strong><br>
                            Given message x, it's infeasible to find a different message y such that H(y) = H(x).<br>
                            <small style="color:#6b7280; display:block; margin-top:4px;">
                                <strong>Example:</strong> If Alice sends "Transfer $100" with hash h, Eve can't find "Transfer $1000" with same h.
                            </small>
                        </div>
                    </div>
                    <div class="req-card">
                        <div class="req-num">6</div>
                        <div class="req-text">
                            <strong>Strong Collision Resistance:</strong><br>
                            It's infeasible to find any pair of messages (x, y) where x ≠ y but H(x) = H(y).<br>
                            <small style="color:#6b7280; display:block; margin-top:4px;">
                                <strong>Example:</strong> An attacker can't find any two contracts with identical hashes.
                            </small>
                        </div>
                    </div>

                </div>
                
                <div style="margin-top:20px; padding:15px; background:#f8fafc; border-radius:8px; border:1px solid #e2e8f0;">
                    <h5 style="margin-top:0; color:#334155; font-size:0.95rem;">Understanding x and y in Hash Properties:</h5>
                    <p style="margin:0 0 10px 0; font-size:0.9rem; color:#4b5563;">
                        • <strong>x</strong> represents any original input message (e.g., "Hello World")<br>
                        • <strong>y</strong> represents any different message an attacker might try to substitute<br>
                        • <strong>h</strong> is the hash value (e.g., 512-bit fingerprint)<br>
                        • The goal is to make it practically impossible to find y that produces same h as x
                    </p>
                </div>
            </div>

        </div>
    `;

    // Inject styles for this specific section
    const style = document.createElement('style');
    style.innerHTML = `
        .req-card { 
            background: #fff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; 
            display: flex; gap: 12px; align-items: flex-start;
        }
        .req-num {
            background: #e0f2fe; color: #0284c7; width: 24px; height: 24px; 
            border-radius: 50%; display: flex; align-items: center; justify-content: center; 
            font-weight: bold; font-size: 0.8rem; flex-shrink: 0;
        }
        .req-text { font-size: 0.85rem; color: #334155; line-height: 1.4; }
    `;
    document.head.appendChild(style);

    appendContent(html);
}

// Logic for the Block Visualizer
window.updateBlockViz = function(val) {
    const msgDiv = document.getElementById('viz-msg');
    const padDiv = document.getElementById('viz-pad');
    const bitCountSpan = document.getElementById('bit-count');
    
    // Calculate bits (assuming UTF-8: 8 bits per character)
    const bitCount = val.length * 8;
    
    // Simulate visual width (max 85% to save room for Length block)
    let width = Math.min(val.length * 2, 85); 
    
    msgDiv.style.width = width + '%';
    msgDiv.innerText = val.length > 0 ? "M" : "";
    
    // Update bit count display
    bitCountSpan.textContent = `${bitCount} bits`;
    bitCountSpan.style.fontWeight = 'bold';
    bitCountSpan.style.color = bitCount > 896 ? '#ef4444' : '#10b981';
    
    // If text is very long, padding shrinks visual
    if (bitCount > 896) { // 1024 - 128 (length field)
        padDiv.innerText = "No Room!";
        padDiv.style.background = '#fca5a5';
        msgDiv.style.background = '#fca5a5';
        
        // Show warning about multiple blocks
        if (!document.getElementById('multi-block-warning')) {
            const warning = document.createElement('div');
            warning.id = 'multi-block-warning';
            warning.style.marginTop = '10px';
            warning.style.padding = '10px';
            warning.style.background = '#fef3c7';
            warning.style.borderRadius = '6px';
            warning.style.borderLeft = '3px solid #d97706';
            warning.style.fontSize = '0.8rem';
            warning.style.color = '#92400e';
            warning.innerHTML = '<strong>Note:</strong> Message exceeds single block capacity. SHA-512 processes multiple 1024-bit blocks sequentially.';
            
            padDiv.parentElement.parentElement.appendChild(warning);
        }
    } else {
        padDiv.innerText = width > 70 ? "Padding" : "Padding (100...0)";
        padDiv.style.background = '#94a3b8';
        msgDiv.style.background = '#3b82f6';
        
        const warning = document.getElementById('multi-block-warning');
        if (warning) warning.remove();
    }
}// NEW SECTION: AVALANCHE EFFECT
function addAvalancheEffect() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="zap" style="color:#f59e0b;"></i> Avalanche Effect
                </div>
                <div class="module-subtitle">
                    A small change in the input should produce a completely different hash output.
                </div>
            </div>

            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
                <p style="margin:0; color:#ea580c; font-size:0.95rem;">
                    <strong>Definition:</strong> A message digest depends on all the bits in the input message.
                    Any alteration of the input message during transmission would cause its message digest to 
                    not match with its original message digest. This can be used to check for forgeries, 
                    unauthorized alterations, etc.
                </p>
            </div>

            <div style="background:white; border:1px solid #e2e8f0; border-radius:12px; padding:25px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom:30px;">
                <h4 style="margin-top:0; margin-bottom:20px;">Interactive Example: See the Avalanche in Action</h4>
                
                <!-- Original Message -->
                <div style="margin-bottom:30px;">
                    <h5 style="color:#334155; margin-bottom:10px; font-size:1rem;">Original Message:</h5>
                    <div id="original-msg" style="background:#f0f9ff; border:2px solid #0ea5e9; padding:15px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:0.9rem; color:#0369a1;">
                        "The quick brown fox jumps over the lazy dog"
                    </div>
                    <div style="margin-top:15px;">
                        <button onclick="calculateAvalancheExample('original')" class="avalanche-btn" style="background:#3b82f6; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:600; font-size:0.9rem;">
                            <i data-feather="hash" style="width:16px; height:16px; margin-right:8px;"></i> Calculate SHA-256 Hash
                        </button>
                    </div>
                    <div id="original-hash" style="margin-top:15px; padding:15px; background:#f8fafc; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:0.8rem; color:#64748b; display:none;">
                        <strong>Hash:</strong> <span style="word-break:break-all;"></span>
                    </div>
                </div>

                <!-- Changed Message -->
                <div style="margin-bottom:30px;">
                    <h5 style="color:#334155; margin-bottom:10px; font-size:1rem;">Altered Message (Added 's'):</h5>
                    <div id="altered-msg" style="background:#fef2f2; border:2px solid #ef4444; padding:15px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:0.9rem; color:#dc2626; position:relative;">
                        "The quick brown fox jumps over the lazy dog<span style="color:#ef4444; font-weight:bold;">s</span>"
                        <div style="position:absolute; top:-10px; right:-10px; background:#ef4444; color:white; border-radius:50%; width:24px; height:24px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:0.8rem;">
                            +s
                        </div>
                    </div>
                    <div style="margin-top:15px;">
                        <button onclick="calculateAvalancheExample('altered')" class="avalanche-btn" style="background:#ef4444; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:600; font-size:0.9rem;">
                            <i data-feather="hash" style="width:16px; height:16px; margin-right:8px;"></i> Calculate SHA-256 Hash
                        </button>
                    </div>
                    <div id="altered-hash" style="margin-top:15px; padding:15px; background:#f8fafc; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:0.8rem; color:#64748b; display:none;">
                        <strong>Hash:</strong> <span style="word-break:break-all;"></span>
                    </div>
                </div>

                <!-- Comparison Visual -->
                <div id="comparison-visual" style="display:none;">
                    <h5 style="color:#334155; margin-bottom:15px; font-size:1rem;">Comparison Visualization:</h5>
                    
                    <!-- Hash Bars -->
                    <div style="margin-bottom:20px;">
                        <div style="display:flex; align-items:center; margin-bottom:10px;">
                            <div style="width:100px; font-size:0.85rem; color:#64748b;">Original Hash:</div>
                            <div id="original-hash-bar" style="flex:1; height:30px; background:#3b82f6; border-radius:4px; position:relative;"></div>
                        </div>
                        <div style="display:flex; align-items:center;">
                            <div style="width:100px; font-size:0.85rem; color:#64748b;">Altered Hash:</div>
                            <div id="altered-hash-bar" style="flex:1; height:30px; background:#ef4444; border-radius:4px; position:relative;"></div>
                        </div>
                    </div>

                    <!-- Bit Comparison -->
                    <div style="background:#f8fafc; padding:20px; border-radius:8px; border:1px solid #e2e8f0;">
                        <div style="text-align:center; margin-bottom:15px;">
                            <div style="font-size:2rem; color:#ef4444; font-weight:bold;" id="diff-percentage">0%</div>
                            <div style="font-size:0.9rem; color:#64748b;">of bits are different</div>
                        </div>
                        
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-top:20px;">
                            <div style="text-align:center;">
                                <div style="font-size:0.8rem; color:#64748b; margin-bottom:5px;">Bits Changed</div>
                                <div style="font-size:1.5rem; font-weight:bold; color:#ef4444;" id="bits-changed">0</div>
                                <div style="font-size:0.7rem; color:#94a3b8;">out of 256 bits</div>
                            </div>
                            <div style="text-align:center;">
                                <div style="font-size:0.8rem; color:#64748b; margin-bottom:5px;">Bits Same</div>
                                <div style="font-size:1.5rem; font-weight:bold; color:#10b981;" id="bits-same">256</div>
                                <div style="font-size:0.7rem; color:#94a3b8;">out of 256 bits</div>
                            </div>
                        </div>
                    </div>

                    <!-- Conclusion Box -->
                    <div id="avalanche-conclusion" style="margin-top:20px; padding:15px; border-radius:8px; display:none;">
                        <h6 style="margin:0; font-size:0.9rem; display:flex; align-items:center; gap:8px;">
                            <i data-feather="alert-circle" style="width:18px; height:18px;"></i>
                            <span>Avalanche Effect Result</span>
                        </h6>
                        <p style="margin:10px 0 0 0; font-size:0.85rem;"></p>
                    </div>
                </div>

                <!-- Interactive Controls -->
                <div style="margin-top:30px; text-align:center;">
                    <button onclick="compareAvalanche()" id="compare-btn" style="background:#8b5cf6; color:white; border:none; padding:12px 30px; border-radius:6px; cursor:pointer; font-weight:600; font-size:0.9rem; display:none;">
                        <i data-feather="git-compare" style="width:16px; height:16px; margin-right:8px;"></i> Compare Hashes
                    </button>
                    <button onclick="resetAvalanche()" id="reset-btn" style="background:#64748b; color:white; border:none; padding:12px 30px; border-radius:6px; cursor:pointer; font-weight:600; font-size:0.9rem; margin-left:10px; display:none;">
                        <i data-feather="refresh-ccw" style="width:16px; height:16px; margin-right:8px;"></i> Reset
                    </button>
                </div>
            </div>

            <!-- Information Panel -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:30px;">
                <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:20px; border-radius:8px;">
                    <h5 style="margin-top:0; color:#166534; font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                        <i data-feather="check-circle" style="color:#22c55e; width:18px; height:18px;"></i>
                        <span>Why This Matters</span>
                    </h5>
                    <ul style="margin:10px 0 0 0; padding-left:20px; font-size:0.85rem; color:#166534;">
                        <li>Detects even single-bit changes in data</li>
                        <li>Prevents undetected message tampering</li>
                        <li>Ensures data integrity verification</li>
                        <li>Makes hash functions cryptographically secure</li>
                    </ul>
                </div>
                
                <div style="background:#fef3c7; border:1px solid #fcd34d; padding:20px; border-radius:8px;">
                    <h5 style="margin-top:0; color:#92400e; font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                        <i data-feather="alert-triangle" style="color:#f59e0b; width:18px; height:18px;"></i>
                        <span>Real-World Application</span>
                    </h5>
                    <ul style="margin:10px 0 0 0; padding-left:20px; font-size:0.85rem; color:#92400e;">
                        <li>File integrity checking (download verification)</li>
                        <li>Digital signatures (detect document changes)</li>
                        <li>Password storage (different hash for similar passwords)</li>
                        <li>Blockchain (ensures transaction immutability)</li>
                    </ul>
                </div>
            </div>

        </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        .avalanche-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s; }
        .avalanche-btn:active { transform: translateY(0); }
    `;
    document.head.appendChild(style);

    appendContent(html);
    feather.replace();
}

// Avalanche Effect Logic
window.calculateAvalancheExample = function(type) {
    const messages = {
        original: "The quick brown fox jumps over the lazy dog",
        altered: "The quick brown fox jumps over the lazy dogs"
    };
    
    // Real SHA-256 hashes for the examples
    const hashes = {
        original: "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592",
        altered: "ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c"
    };
    
    const hashDiv = document.getElementById(`${type}-hash`);
    const hashSpan = hashDiv.querySelector('span');
    const button = event.target;
    
    // Show hash
    hashDiv.style.display = 'block';
    hashSpan.textContent = hashes[type];
    
    // Update button
    button.innerHTML = '<i data-feather="check" style="width:16px; height:16px; margin-right:8px;"></i> Hash Calculated';
    button.style.background = type === 'original' ? '#10b981' : '#ef4444';
    button.disabled = true;
    
    // Show compare button if both hashes are calculated
    const originalDone = document.getElementById('original-hash').style.display === 'block';
    const alteredDone = document.getElementById('altered-hash').style.display === 'block';
    
    if (originalDone && alteredDone) {
        document.getElementById('compare-btn').style.display = 'inline-block';
        document.getElementById('reset-btn').style.display = 'inline-block';
    }
    
    feather.replace();
};

window.compareAvalanche = function() {
    const comparisonDiv = document.getElementById('comparison-visual');
    const conclusionDiv = document.getElementById('avalanche-conclusion');
    
    // Show comparison
    comparisonDiv.style.display = 'block';
    
    // Get hashes
    const originalHash = "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592";
    const alteredHash = "ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c";
    
    // Convert hex to binary for visualization
    const originalBinary = hexToBinary(originalHash);
    const alteredBinary = hexToBinary(alteredHash);
    
    // Calculate differences
    let diffCount = 0;
    for (let i = 0; i < originalBinary.length; i++) {
        if (originalBinary[i] !== alteredBinary[i]) {
            diffCount++;
        }
    }
    
    const totalBits = 256;
    const sameCount = totalBits - diffCount;
    const diffPercentage = Math.round((diffCount / totalBits) * 100);
    
    // Update display
    document.getElementById('diff-percentage').textContent = `${diffPercentage}%`;
    document.getElementById('bits-changed').textContent = diffCount;
    document.getElementById('bits-same').textContent = sameCount;
    
    // Animate the bars
    const originalBar = document.getElementById('original-hash-bar');
    const alteredBar = document.getElementById('altered-hash-bar');
    
    originalBar.style.width = '0%';
    alteredBar.style.width = '0%';
    
    setTimeout(() => {
        originalBar.style.transition = 'width 1.5s ease';
        alteredBar.style.transition = 'width 1.5s ease';
        originalBar.style.width = '100%';
        alteredBar.style.width = '100%';
    }, 100);
    
    // Show conclusion
    setTimeout(() => {
        conclusionDiv.style.display = 'block';
        conclusionDiv.style.background = diffPercentage > 40 ? '#fef2f2' : '#f0fdf4';
        conclusionDiv.style.border = diffPercentage > 40 ? '1px solid #fecaca' : '1px solid #bbf7d0';
        
        const conclusionText = conclusionDiv.querySelector('p');
        if (diffPercentage > 40) {
            conclusionText.innerHTML = `<strong style="color:#dc2626;">✅ STRONG AVALANCHE EFFECT:</strong> Changing just 1 character ('s') altered <strong>${diffPercentage}% of bits</strong> (${diffCount}/256 bits)! This makes hash functions excellent for detecting tampering.`;
        } else {
            conclusionText.innerHTML = `<strong style="color:#16a34a;">⚠️ WEAK AVALANCHE EFFECT:</strong> Only ${diffPercentage}% of bits changed. This would make the hash vulnerable to certain attacks.`;
        }
    }, 2000);
    
    feather.replace();
};

window.resetAvalanche = function() {
    // Reset all elements
    ['original', 'altered'].forEach(type => {
        const hashDiv = document.getElementById(`${type}-hash`);
        hashDiv.style.display = 'none';
        
        const button = document.querySelector(`button[onclick="calculateAvalancheExample('${type}')"]`);
        if (button) {
            button.innerHTML = '<i data-feather="hash" style="width:16px; height:16px; margin-right:8px;"></i> Calculate SHA-256 Hash';
            button.style.background = type === 'original' ? '#3b82f6' : '#ef4444';
            button.disabled = false;
        }
    });
    
    document.getElementById('comparison-visual').style.display = 'none';
    document.getElementById('compare-btn').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('avalanche-conclusion').style.display = 'none';
    
    feather.replace();
};

// Helper function to convert hex to binary
function hexToBinary(hex) {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        const bits = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += bits;
    }
    return binary;
}
// NEW SECTION: ATTACKS ON HASH FUNCTIONS
function addHashAttacksSection() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="shield-off" style="color:#ef4444;"></i> Attacks on Hash Functions
                </div>
                <div class="module-subtitle">
                    Understanding how attackers attempt to break hash functions and why cryptographic hash functions must resist these attacks.
                </div>
            </div>

            <!-- Attack Type Selection -->
            <div style="margin-bottom: 30px;">
                <div class="attack-selector" style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button onclick="showAttack('bruteforce')" class="attack-tab active" style="flex: 1; padding: 15px; background: #3b82f6; color: white; border: none; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i data-feather="cpu"></i> Brute Force Attack
                    </button>
                    <button onclick="showAttack('cryptanalysis')" class="attack-tab" style="flex: 1; padding: 15px; background: #8b5cf6; color: white; border: none; border-radius: 8px 8px 0 0; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i data-feather="search"></i> Cryptanalysis
                    </button>
                </div>

                <!-- Attack Panels Container -->
                <div id="attack-panels" style="background: white; border: 1px solid #e2e8f0; border-radius: 0 0 12px 12px; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    
                    <!-- Brute Force Panel (Default) -->
                    <div id="bruteforce-panel" class="attack-panel">
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 1.3rem;">
                                <i data-feather="cpu" style="width: 20px; height: 20px; margin-right: 10px;"></i>
                                Brute Force Attack
                            </h3>
                            <p style="color: #4b5563; line-height: 1.6;">
                                The attacker systematically tries every possible input until they find one that produces the target hash. 
                                This is a "trial-and-error" approach that relies on computational power rather than mathematical weaknesses.
                            </p>
                        </div>

                        <!-- Brute Force Simulation -->
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem;">Attack Simulation</h4>
                            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px;">
                                Target Hash: <code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace;">7f83b165...</code>
                                <br>Goal: Find any input that produces this hash (Preimage Attack)
                            </p>

                            <!-- Attack Controls -->
                            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                                    <button onclick="startBruteForceAttack()" id="brute-start" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; flex: 1;">
                                        <i data-feather="play" style="width: 16px; height: 16px; margin-right: 8px;"></i> Start Attack
                                    </button>
                                    <button onclick="stopBruteForceAttack()" id="brute-stop" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; flex: 1; display: none;">
                                        <i data-feather="stop-circle" style="width: 16px; height: 16px; margin-right: 8px;"></i> Stop Attack
                                    </button>
                                    <button onclick="resetBruteForceAttack()" id="brute-reset" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; flex: 1;">
                                        <i data-feather="refresh-ccw" style="width: 16px; height: 16px; margin-right: 8px;"></i> Reset
                                    </button>
                                </div>

                                <!-- Attack Progress -->
                                <div style="margin-bottom: 15px;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                        <span style="font-size: 0.85rem; color: #64748b;">Attack Progress</span>
                                        <span id="brute-progress-text" style="font-size: 0.85rem; color: #3b82f6; font-weight: 600;">0%</span>
                                    </div>
                                    <div style="height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                                        <div id="brute-progress-bar" style="height: 100%; background: #3b82f6; width: 0%; transition: width 0.3s;"></div>
                                    </div>
                                </div>

                                <!-- Attack Stats -->
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 20px;">
                                    <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 5px;">Attempts</div>
                                        <div id="attempts-count" style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">0</div>
                                    </div>
                                    <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 5px;">Time</div>
                                        <div id="attack-time" style="font-size: 1.5rem; font-weight: bold; color: #10b981;">0s</div>
                                    </div>
                                    <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 5px;">Speed</div>
                                        <div id="attack-speed" style="font-size: 1.5rem; font-weight: bold; color: #f59e0b;">0</div>
                                    </div>
                                    <div style="text-align: center; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                        <div style="font-size: 0.75rem; color: #64748b; margin-bottom: 5px;">Status</div>
                                        <div id="attack-status" style="font-size: 0.9rem; font-weight: bold; color: #64748b;">Ready</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Attack Visualization -->
                            <div style="margin-top: 25px;">
                                <h5 style="color: #334155; margin-bottom: 10px; font-size: 0.95rem;">Live Attack Visualization</h5>
                                <div style="height: 120px; background: #0f172a; border-radius: 8px; padding: 15px; overflow: hidden; position: relative;">
                                    <div id="hash-stream" style="height: 100%; overflow-y: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; line-height: 1.4; color: #94a3b8;">
                                        <!-- Hash attempts will appear here -->
                                    </div>
                                    <div id="found-match" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #10b981; color: white; padding: 20px; border-radius: 8px; display: none; text-align: center; box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);">
                                        <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">🎉 COLLISION FOUND!</div>
                                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;">Input: <span id="found-input"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Brute Force Types -->
                        <div style="margin-top: 30px;">
                            <h4 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem;">Types of Brute Force Attacks</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                <div class="attack-type-card" style="background: #f0f9ff; border: 2px solid #0ea5e9; padding: 15px; border-radius: 8px;">
                                    <div style="font-weight: bold; color: #0369a1; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                        <i data-feather="target" style="width: 16px; height: 16px;"></i> Preimage Attack
                                    </div>
                                    <div style="font-size: 0.85rem; color: #0c4a6e;">
                                        Given hash h, find any input x such that H(x) = h
                                    </div>
                                    <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                        <strong>Complexity:</strong> O(2ⁿ)
                                    </div>
                                </div>
                                <div class="attack-type-card" style="background: #fef2f2; border: 2px solid #fca5a5; padding: 15px; border-radius: 8px;">
                                    <div style="font-weight: bold; color: #dc2626; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                        <i data-feather="copy" style="width: 16px; height: 16px;"></i> Collision Attack
                                    </div>
                                    <div style="font-size: 0.85rem; color: #991b1b;">
                                        Find any two different inputs x, y such that H(x) = H(y)
                                    </div>
                                    <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                        <strong>Complexity:</strong> O(2ⁿ/²) - Birthday Attack
                                    </div>
                                </div>
                                <div class="attack-type-card" style="background: #fef3c7; border: 2px solid #fcd34d; padding: 15px; border-radius: 8px;">
                                    <div style="font-weight: bold; color: #92400e; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                        <i data-feather="key" style="width: 16px; height: 16px;"></i> Second Preimage
                                    </div>
                                    <div style="font-size: 0.85rem; color: #78350f;">
                                        Given input x, find y ≠ x such that H(y) = H(x)
                                    </div>
                                    <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                        <strong>Complexity:</strong> O(2ⁿ)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Security Implications -->
                        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #1e3a8a, #3b82f6); border-radius: 12px; color: white;">
                            <h4 style="margin-top: 0; margin-bottom: 15px; font-size: 1.1rem;">
                                <i data-feather="shield" style="width: 20px; height: 20px; margin-right: 10px;"></i>
                                Why Brute Force Fails Against Strong Hashes
                            </h4>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div>
                                    <h5 style="margin-bottom: 10px; font-size: 0.95rem;">SHA-512 Security</h5>
                                    <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                                        <li>Output size: 512 bits</li>
                                        <li>Possible hashes: 2⁵¹² ≈ 1.34×10¹⁵⁴</li>
                                        <li>Time to brute force: ~10⁶⁸ years</li>
                                        <li>Universe age: 1.38×10¹⁰ years</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 style="margin-bottom: 10px; font-size: 0.95rem;">Comparison</h5>
                                    <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                                        <li>MD5 (128 bits): Broken by collision</li>
                                        <li>SHA-1 (160 bits): Theoretically broken</li>
                                        <li>SHA-256 (256 bits): Currently secure</li>
                                        <li>SHA-512 (512 bits): Very secure</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Cryptanalysis Panel (Hidden by default) -->
                    <div id="cryptanalysis-panel" class="attack-panel" style="display: none;">
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #7c3aed; margin-bottom: 15px; font-size: 1.3rem;">
                                <i data-feather="search" style="width: 20px; height: 20px; margin-right: 10px;"></i>
                                Cryptanalysis
                            </h3>
                            <p style="color: #4b5563; line-height: 1.6;">
                                Cryptanalysis involves finding mathematical weaknesses in the hash function's algorithm 
                                to break it faster than brute force. This is the "smart" way to attack cryptographic systems.
                            </p>
                        </div>

                        <!-- Cryptanalysis Visualization -->
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem;">How Cryptanalysis Works</h4>
                            
                            <!-- Algorithm Structure -->
                            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                                <h5 style="margin-top: 0; color: #334155; margin-bottom: 20px; font-size: 1rem;">SHA-512 Compression Function Analysis</h5>
                                
                                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px; position: relative;">
                                    <!-- Message Block -->
                                    <div style="padding: 15px; background: #3b82f6; color: white; border-radius: 8px; width: 120px; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
                                        Message Block
                                    </div>
                                    
                                    <!-- Plus Icon -->
                                    <div style="margin: 0 20px; color: #64748b; font-size: 1.5rem;">+</div>
                                    
                                    <!-- Previous Hash -->
                                    <div style="padding: 15px; background: #10b981; color: white; border-radius: 8px; width: 120px; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
                                        Previous Hash
                                    </div>
                                    
                                    <!-- Arrow -->
                                    <div style="margin: 0 20px; color: #64748b; font-size: 1.5rem;">→</div>
                                    
                                    <!-- Compression Function -->
                                    <div style="padding: 20px; background: #f59e0b; color: white; border-radius: 8px; width: 150px; text-align: center; font-weight: bold; position: relative;">
                                        Compression<br>Function
                                        <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #ef4444; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.7rem; white-space: nowrap;">
                                            ATTACK POINT
                                        </div>
                                    </div>
                                    
                                    <!-- Arrow -->
                                    <div style="margin: 0 20px; color: #64748b; font-size: 1.5rem;">→</div>
                                    
                                    <!-- New Hash -->
                                    <div style="padding: 15px; background: #8b5cf6; color: white; border-radius: 8px; width: 120px; text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
                                        New Hash
                                    </div>
                                </div>

                                <!-- Attack Methods -->
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                                    <div onclick="showCryptoAttack('differential')" style="cursor: pointer; padding: 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; transition: all 0.3s;" 
                                         onmouseover="this.style.borderColor='#ef4444'; this.style.transform='translateY(-2px)'" 
                                         onmouseout="this.style.borderColor='#e2e8f0'; this.style.transform='translateY(0)'">
                                        <div style="font-weight: bold; color: #dc2626; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                            <i data-feather="git-branch" style="width: 16px; height: 16px;"></i> Differential Cryptanalysis
                                        </div>
                                        <div style="font-size: 0.85rem; color: #4b5563;">
                                            Study how differences in input affect output differences
                                        </div>
                                    </div>
                                    <div onclick="showCryptoAttack('algebraic')" style="cursor: pointer; padding: 15px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; transition: all 0.3s;"
                                         onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-2px)'" 
                                         onmouseout="this.style.borderColor='#e2e8f0'; this.style.transform='translateY(0)'">
                                        <div style="font-weight: bold; color: #1d4ed8; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                                            <i data-feather="code" style="width: 16px; height: 16px;"></i> Algebraic Attacks
                                        </div>
                                        <div style="font-size: 0.85rem; color: #4b5563;">
                                            Express the hash function as a system of equations
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Attack Demonstration -->
                            <div id="crypto-attack-demo" style="display: none;">
                                <h5 style="color: #334155; margin-bottom: 15px; font-size: 1rem;" id="crypto-attack-title"></h5>
                                <div style="background: #fef2f2; border: 2px solid #fecaca; padding: 20px; border-radius: 8px; margin-bottom: 20px;" id="crypto-attack-content">
                                    <!-- Content will be loaded here -->
                                </div>
                            </div>

                            <!-- Real-World Examples -->
                            <div style="margin-top: 30px;">
                                <h4 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem;">Historical Cryptanalysis Successes</h4>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                                    <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; border-radius: 6px;">
                                        <div style="font-weight: bold; color: #dc2626; margin-bottom: 8px;">MD5 (1996)</div>
                                        <div style="font-size: 0.85rem; color: #991b1b;">
                                            First collision found in 1996. Practical collisions demonstrated in 2004.
                                            <div style="margin-top: 8px; font-size: 0.75rem; color: #ef4444;">
                                                <strong>Impact:</strong> No longer secure for cryptographic use
                                            </div>
                                        </div>
                                    </div>
                                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px;">
                                        <div style="font-weight: bold; color: #92400e; margin-bottom: 8px;">SHA-1 (2005)</div>
                                        <div style="font-size: 0.85rem; color: #78350f;">
                                            Theoretical weaknesses found in 2005. First collision in 2017 (SHAttered).
                                            <div style="margin-top: 8px; font-size: 0.75rem; color: #f59e0b;">
                                                <strong>Impact:</strong> Phased out by major tech companies
                                            </div>
                                        </div>
                                    </div>
                                    <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; border-radius: 6px;">
                                        <div style="font-weight: bold; color: #0369a1; margin-bottom: 8px;">SHA-2 Family</div>
                                        <div style="font-size: 0.85rem; color: #0c4a6e;">
                                            No practical attacks found yet. Considered secure for all applications.
                                            <div style="margin-top: 8px; font-size: 0.75rem; color: #0ea5e9;">
                                                <strong>Status:</strong> Current standard (SHA-256, SHA-512)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Cryptanalysis Process -->
                        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #7c3aed, #a78bfa); border-radius: 12px; color: white;">
                            <h4 style="margin-top: 0; margin-bottom: 15px; font-size: 1.1rem;">
                                <i data-feather="activity" style="width: 20px; height: 20px; margin-right: 10px;"></i>
                                The Cryptanalysis Process
                            </h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                                <div style="text-align: center;">
                                    <div style="background: white; color: #7c3aed; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 10px;">1</div>
                                    <div style="font-size: 0.85rem;">Study Algorithm</div>
                                </div>
                                <div style="font-size: 1.5rem; color: rgba(255,255,255,0.5);">→</div>
                                <div style="text-align: center;">
                                    <div style="background: white; color: #7c3aed; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 10px;">2</div>
                                    <div style="font-size: 0.85rem;">Find Weaknesses</div>
                                </div>
                                <div style="font-size: 1.5rem; color: rgba(255,255,255,0.5);">→</div>
                                <div style="text-align: center;">
                                    <div style="background: white; color: #7c3aed; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 10px;">3</div>
                                    <div style="font-size: 0.85rem;">Develop Attack</div>
                                </div>
                                <div style="font-size: 1.5rem; color: rgba(255,255,255,0.5);">→</div>
                                <div style="text-align: center;">
                                    <div style="background: white; color: #7c3aed; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 10px;">4</div>
                                    <div style="font-size: 0.85rem;">Reduce Complexity</div>
                                </div>
                            </div>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.9; text-align: center;">
                                Goal: Reduce attack complexity from O(2ⁿ) to something practical
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Key Takeaways -->
            <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 12px; border: 2px solid #86efac;">
                <h4 style="margin-top: 0; color: #166534; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                    <i data-feather="check-circle" style="color: #22c55e;"></i>
                    Security Recommendations
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="color: #166534; margin-bottom: 10px; font-size: 0.95rem;">For Developers</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #166534;">
                            <li>Use SHA-256 or SHA-512 for new applications</li>
                            <li>Always add salt to passwords before hashing</li>
                            <li>Implement proper key stretching (PBKDF2, bcrypt)</li>
                            <li>Monitor for cryptographic updates and vulnerabilities</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="color: #166534; margin-bottom: 10px; font-size: 0.95rem;">For Security Professionals</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #166534;">
                            <li>Phase out MD5 and SHA-1 in legacy systems</li>
                            <li>Implement hash length extension attack protections</li>
                            <li>Consider post-quantum cryptography for long-term security</li>
                            <li>Regularly audit cryptographic implementations</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        .attack-tab {
            transition: all 0.3s ease;
        }
        .attack-tab:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .attack-tab.active {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .attack-type-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .attack-type-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);

    appendContent(html);
    feather.replace();
}

// Attack Panel Switching Logic
window.showAttack = function(attackType) {
    // Update tab buttons
    document.querySelectorAll('.attack-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.style.background = '#64748b';
    });
    
    event.target.classList.add('active');
    event.target.style.background = attackType === 'bruteforce' ? '#3b82f6' : '#8b5cf6';
    
    // Show selected panel
    document.querySelectorAll('.attack-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    document.getElementById(`${attackType}-panel`).style.display = 'block';
    
    // Reset any active attacks
    stopBruteForceAttack();
    resetBruteForceAttack();
    
    feather.replace();
};

// Brute Force Attack Variables
let bruteForceInterval;
let attempts = 0;
let startTime = 0;

window.startBruteForceAttack = function() {
    const startBtn = document.getElementById('brute-start');
    const stopBtn = document.getElementById('brute-stop');
    const hashStream = document.getElementById('hash-stream');
    const targetHash = '7f83b165...'; // Partial target hash
    
    // Reset
    resetBruteForceAttack();
    
    // Update UI
    startBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    document.getElementById('attack-status').textContent = 'Running';
    document.getElementById('attack-status').style.color = '#10b981';
    
    startTime = Date.now();
    
    // Start attack simulation
    bruteForceInterval = setInterval(() => {
        attempts++;
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const speed = Math.floor(attempts / Math.max(1, elapsedSeconds));
        
        // Update stats
        document.getElementById('attempts-count').textContent = attempts.toLocaleString();
        document.getElementById('attack-time').textContent = `${elapsedSeconds}s`;
        document.getElementById('attack-speed').textContent = `${speed}/sec`;
        
        // Update progress (simulated - never reaches 100%)
        const progress = Math.min(99, Math.floor(attempts / 1000));
        document.getElementById('brute-progress-bar').style.width = `${progress}%`;
        document.getElementById('brute-progress-text').textContent = `${progress}%`;
        
        // Generate random hash attempts
        const randomInput = generateRandomInput();
        const randomHash = generateRandomHash();
        
        // Add to stream
        const attemptDiv = document.createElement('div');
        attemptDiv.innerHTML = `Trying "${randomInput}" → ${randomHash}`;
        hashStream.appendChild(attemptDiv);
        hashStream.scrollTop = hashStream.scrollHeight;
        
        // Simulate finding a match (very rare)
        if (Math.random() < 0.001) { // 0.1% chance for demo
            stopBruteForceAttack();
            document.getElementById('found-match').style.display = 'block';
            document.getElementById('found-input').textContent = randomInput;
            document.getElementById('attack-status').textContent = 'SUCCESS!';
            document.getElementById('attack-status').style.color = '#ef4444';
        }
        
        // Simulate slowdown for realism
        if (attempts > 5000 && Math.random() < 0.3) {
            clearInterval(bruteForceInterval);
            setTimeout(() => {
                bruteForceInterval = setInterval(arguments.callee, 50);
            }, 1000);
        }
    }, 50);
};

window.stopBruteForceAttack = function() {
    clearInterval(bruteForceInterval);
    document.getElementById('brute-start').style.display = 'inline-block';
    document.getElementById('brute-stop').style.display = 'none';
    document.getElementById('attack-status').textContent = 'Stopped';
    document.getElementById('attack-status').style.color = '#f59e0b';
};

window.resetBruteForceAttack = function() {
    stopBruteForceAttack();
    attempts = 0;
    startTime = 0;
    
    // Reset UI
    document.getElementById('attempts-count').textContent = '0';
    document.getElementById('attack-time').textContent = '0s';
    document.getElementById('attack-speed').textContent = '0';
    document.getElementById('brute-progress-bar').style.width = '0%';
    document.getElementById('brute-progress-text').textContent = '0%';
    document.getElementById('attack-status').textContent = 'Ready';
    document.getElementById('attack-status').style.color = '#64748b';
    document.getElementById('hash-stream').innerHTML = '';
    document.getElementById('found-match').style.display = 'none';
    document.getElementById('brute-start').innerHTML = '<i data-feather="play" style="width: 16px; height: 16px; margin-right: 8px;"></i> Start Attack';
    document.getElementById('brute-start').style.display = 'inline-block';
    document.getElementById('brute-stop').style.display = 'none';
    
    feather.replace();
};

// Cryptanalysis Attack Demonstrations
window.showCryptoAttack = function(attackType) {
    const demoDiv = document.getElementById('crypto-attack-demo');
    const titleDiv = document.getElementById('crypto-attack-title');
    const contentDiv = document.getElementById('crypto-attack-content');
    
    demoDiv.style.display = 'block';
    
    if (attackType === 'differential') {
        titleDiv.textContent = 'Differential Cryptanalysis Attack';
        contentDiv.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h6 style="margin: 0 0 10px 0; color: #dc2626;">How It Works:</h6>
                <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 0.9rem;">
                    Attackers analyze how specific input differences (Δ) propagate through the hash function's rounds.
                    They look for differential characteristics that hold with high probability.
                </p>
                
                <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-bottom: 10px;">
                        Input Pair: (M, M⊕Δ) → Study output: (H(M), H(M⊕Δ))
                    </div>
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #f8fafc; border-radius: 4px;">
                        <div style="text-align: center;">
                            <div style="color: #64748b; font-size: 0.7rem;">Input Difference Δ</div>
                            <div style="color: #ef4444; font-weight: bold;">0x00008000...</div>
                        </div>
                        <div style="font-size: 1.2rem; color: #64748b;">→</div>
                        <div style="text-align: center;">
                            <div style="color: #64748b; font-size: 0.7rem;">Output Difference</div>
                            <div style="color: #10b981; font-weight: bold;">0x3f5a2c1d...</div>
                        </div>
                    </div>
                </div>
                
                <div style="color: #dc2626; font-size: 0.85rem;">
                    <strong>Example:</strong> In MD5, researchers found differential paths that allowed them to 
                    create collisions with only 2³⁹ operations instead of 2⁶⁴.
                </div>
            </div>
        `;
        contentDiv.style.background = '#fef2f2';
        contentDiv.style.borderColor = '#fecaca';
    } else if (attackType === 'algebraic') {
        titleDiv.textContent = 'Algebraic Attack';
        contentDiv.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h6 style="margin: 0 0 10px 0; color: #1d4ed8;">How It Works:</h6>
                <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 0.9rem;">
                    The hash function is expressed as a system of multivariate equations. Attackers use algebraic 
                    techniques (like Gröbner basis) to solve these equations more efficiently than brute force.
                </p>
                
                <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border: 1px solid #e2e8f0;">
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
                        Hash Function → System of Equations:
                    </div>
                    <div style="padding: 10px; background: #f8fafc; border-radius: 4px; margin-top: 10px;">
                        <div style="color: #3b82f6; font-size: 0.8rem;">f₁(x₁, x₂, ..., xₙ) = y₁</div>
                        <div style="color: #3b82f6; font-size: 0.8rem;">f₂(x₁, x₂, ..., xₙ) = y₂</div>
                        <div style="color: #3b82f6; font-size: 0.8rem;">...</div>
                        <div style="color: #3b82f6; font-size: 0.8rem;">fₘ(x₁, x₂, ..., xₙ) = yₘ</div>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                        Where xᵢ are input bits, yⱼ are output bits, fⱼ are round functions
                    </div>
                </div>
                
                <div style="color: #1d4ed8; font-size: 0.85rem;">
                    <strong>Challenge:</strong> SHA-512 produces 512 output equations with thousands of variables, 
                    making algebraic attacks currently infeasible.
                </div>
            </div>
        `;
        contentDiv.style.background = '#eff6ff';
        contentDiv.style.borderColor = '#bfdbfe';
    }
    
    feather.replace();
};

// Helper functions
function generateRandomInput() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 10) + 5;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

function generateRandomHash() {
    const hex = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 16; i++) { // Show only first 16 chars for display
        result += hex[Math.floor(Math.random() * hex.length)];
    }
    return result + '...';
}
