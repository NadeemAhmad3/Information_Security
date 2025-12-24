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
    addSHA512PropertiesAndProcess();
    addSHA512FAQSection();
    addCompressionFunctionVisualization();
    addLogicalFunctionsInsight();
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
// NEW SECTION: SHA-512 PROPERTIES AND ITERATIVE PROCESS
function addSHA512PropertiesAndProcess() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="cpu" style="color:#3b82f6;"></i> SHA-512: Algorithm Properties & Iterative Process
                </div>
                <div class="module-subtitle">
                    Understanding the technical specifications and step-by-step processing of SHA-512.
                </div>
            </div>

            <!-- SHA-512 Properties Table -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">SHA-512 Properties</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Message Digest Size</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #1e40af;">512 bits (64 bytes)</div>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Maximum Message Size</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #047857;">2¹²⁸ - 1 bits</div>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Block Size</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #b45309;">1024 bits (128 bytes)</div>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Word Size</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #5b21b6;">64 bits</div>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Number of Rounds</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #b91c1c;">80 rounds</div>
                    </div>
                    <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #06b6d4;">
                        <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 5px;">Security Level</div>
                        <div style="font-size: 1.2rem; font-weight: bold; color: #0e7490;">256 bits (collision resistance)</div>
                    </div>
                </div>
            </div>

            <!-- Iterative Process Visualization -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">SHA-512 Iterative Process Flow</h4>
                
                <!-- Flow Diagram -->
                <div style="position: relative; padding: 20px; background: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                    
                    <!-- Top Section: Preprocessing -->
                    <div style="text-align: center; margin-bottom: 40px; position: relative;">
                        <div style="display: inline-block; position: relative;">
                            <div style="background: #3b82f6; color: white; padding: 15px; border-radius: 8px; width: 180px; margin-bottom: 10px;">
                                <div style="font-weight: bold; font-size: 0.9rem;">INPUT MESSAGE</div>
                                <div style="font-size: 0.7rem; opacity: 0.9;">Length = L bits</div>
                            </div>
                            <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: #64748b; font-size: 0.7rem; white-space: nowrap;">
                                Original message of length L
                            </div>
                        </div>
                        
                        <!-- Arrow Down -->
                        <div style="position: absolute; top: 80px; left: 50%; transform: translateX(-50%); color: #94a3b8; font-size: 1.5rem;">↓</div>
                        
                        <!-- Padding Process -->
                        <div style="margin-top: 50px;">
                            <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; width: 220px; display: inline-block; position: relative;">
                                <div style="font-weight: bold; font-size: 0.9rem;">PREPROCESSING & PADDING</div>
                                <div style="font-size: 0.7rem; opacity: 0.9;">Add '1' + k×'0' + 128-bit length</div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                                Total length becomes N × 1024 bits
                            </div>
                        </div>
                    </div>

                    <!-- Middle Section: Segmentation -->
                    <div style="text-align: center; margin-bottom: 40px; background: #f0f9ff; padding: 20px; border-radius: 8px; border: 2px solid #0ea5e9;">
                        <h5 style="margin-top: 0; color: #0369a1; margin-bottom: 15px; font-size: 1rem;">Segmentation into N Blocks</h5>
                        
                        <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
                            <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 6px; width: 100px; text-align: center;">
                                <div style="font-weight: bold; font-size: 0.8rem;">M₁</div>
                                <div style="font-size: 0.6rem;">1024 bits</div>
                            </div>
                            <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 6px; width: 100px; text-align: center;">
                                <div style="font-weight: bold; font-size: 0.8rem;">M₂</div>
                                <div style="font-size: 0.6rem;">1024 bits</div>
                            </div>
                            <div style="background: #94a3b8; color: white; padding: 12px; border-radius: 6px; width: 100px; text-align: center;">
                                <div style="font-weight: bold; font-size: 0.8rem;">⋯</div>
                                <div style="font-size: 0.6rem;">⋯</div>
                            </div>
                            <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 6px; width: 100px; text-align: center;">
                                <div style="font-weight: bold; font-size: 0.8rem;">Mₙ</div>
                                <div style="font-size: 0.6rem;">1024 bits</div>
                            </div>
                        </div>
                        
                        <div style="font-size: 0.8rem; color: #64748b;">
                            Padded message divided into N equal segments of 1024 bits each
                        </div>
                    </div>

                    <!-- Bottom Section: Iterative Computation -->
                    <div>
                        <h5 style="text-align: center; color: #334155; margin-bottom: 20px; font-size: 1rem;">Iterative Hash Computation (Merkle-Damgård Construction)</h5>
                        
                        <!-- Initialization Vector -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="background: linear-gradient(135deg, #8b5cf6, #a78bfa); color: white; padding: 15px; border-radius: 8px; width: 200px; display: inline-block;">
                                <div style="font-weight: bold; font-size: 0.9rem;">INITIALIZATION VECTOR (IV)</div>
                                <div style="font-size: 0.7rem; opacity: 0.9;">H₀ = Fixed 512-bit constant</div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                                Starting 512-bit constant value
                            </div>
                        </div>

                        <!-- Block Processing Visualization -->
                        <div id="block-process-visual" style="max-width: 800px; margin: 0 auto;">
                            <!-- Block 1 Processing -->
                            <div class="block-process" style="margin-bottom: 40px; padding: 20px; background: #f8fafc; border-radius: 12px; border: 2px solid #e2e8f0;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                    <div style="text-align: center;">
                                        <div style="background: #10b981; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">H₀</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Initial Hash</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">512 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">+</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: #3b82f6; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">M₁</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Message Block 1</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">1024 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">→</div>
                                    
                                    <div style="position: relative;">
                                        <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px; width: 160px; text-align: center;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">COMPRESSION</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Function F</div>
                                        </div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">→</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: #ef4444; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">H₁</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Hash after Block 1</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">512 bits</div>
                                    </div>
                                </div>
                                
                                <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
                                    <strong>First Block:</strong> H₁ = H₀ + F(M₁, H₀)
                                </div>
                            </div>

                            <!-- Block 2 Processing -->
                            <div class="block-process" style="margin-bottom: 40px; padding: 20px; background: #f8fafc; border-radius: 12px; border: 2px solid #e2e8f0;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                    <div style="text-align: center;">
                                        <div style="background: #ef4444; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">H₁</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Hash from Block 1</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">512 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">+</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: #3b82f6; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">M₂</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Message Block 2</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">1024 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">→</div>
                                    
                                    <div style="position: relative;">
                                        <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px; width: 160px; text-align: center;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">COMPRESSION</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Function F</div>
                                        </div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 15px;">→</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: #8b5cf6; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">H₂</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Hash after Block 2</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; color: #64748b;">512 bits</div>
                                    </div>
                                </div>
                                
                                <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
                                    <strong>Second Block:</strong> H₂ = H₁ + F(M₂, H₁)
                                </div>
                            </div>

                            <!-- Final Block Processing -->
                            <div class="block-process" style="padding: 20px; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 12px; color: white;">
                                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                                    <div style="text-align: center;">
                                        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">Hₙ₋₁</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Previous Hash</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; opacity: 0.8;">512 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; margin: 0 15px;">+</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">Mₙ</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Final Block</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; opacity: 0.8;">1024 bits</div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; margin: 0 15px;">→</div>
                                    
                                    <div style="position: relative;">
                                        <div style="background: #f59e0b; padding: 20px; border-radius: 8px; width: 160px; text-align: center;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">COMPRESSION</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">Function F</div>
                                        </div>
                                    </div>
                                    
                                    <div style="font-size: 1.2rem; margin: 0 15px;">→</div>
                                    
                                    <div style="text-align: center;">
                                        <div style="background: #10b981; padding: 15px; border-radius: 8px; width: 140px;">
                                            <div style="font-weight: bold; font-size: 0.9rem;">Hₙ</div>
                                            <div style="font-size: 0.7rem; opacity: 0.9;">FINAL HASH</div>
                                        </div>
                                        <div style="margin-top: 5px; font-size: 0.7rem; opacity: 0.8;">512 bits</div>
                                    </div>
                                </div>
                                
                                <div style="text-align: center; font-size: 0.9rem; opacity: 0.9;">
                                    <strong>Final Block:</strong> Hₙ = Hₙ₋₁ + F(Mₙ, Hₙ₋₁) = Final Hash Code
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Flow Explanation -->
                <div style="margin-top: 30px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 8px;">
                            <h5 style="margin-top: 0; color: #0369a1; margin-bottom: 10px; font-size: 1rem;">Flow of the Process</h5>
                            <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: #0c4a6e;">
                                <li>Top to bottom: Input to output flow</li>
                                <li>Left to right: Iterative processing</li>
                                <li>Each block depends on previous hash</li>
                                <li>Chain reaction ensures avalanche effect</li>
                            </ul>
                        </div>
                        
                        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px;">
                            <h5 style="margin-top: 0; color: #047857; margin-bottom: 10px; font-size: 1rem;">Merkle-Damgård Construction</h5>
                            <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; color: #065f46;">
                                <li>Uses chaining method</li>
                                <li>Each block's output feeds next block</li>
                                <li>Compression function F is applied repeatedly</li>
                                <li>Final output is 512-bit hash code</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Interactive Process Controls -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">Interactive Process Demonstration</h4>
                
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="display: inline-flex; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 8px;">
                        <button onclick="showProcessStep(1)" class="process-step-btn active" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Step 1: Preprocessing
                        </button>
                        <button onclick="showProcessStep(2)" class="process-step-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Step 2: First Block
                        </button>
                        <button onclick="showProcessStep(3)" class="process-step-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Step 3: Iteration
                        </button>
                        <button onclick="showProcessStep(4)" class="process-step-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Step 4: Final Hash
                        </button>
                    </div>
                </div>

                <!-- Process Step Content -->
                <div id="process-step-content" style="min-height: 200px; background: #f8fafc; border-radius: 8px; padding: 25px; border: 2px solid #e2e8f0;">
                    <div id="step-1-content">
                        <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1rem;">Step 1: Preprocessing and Padding</h5>
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <div style="flex: 1;">
                                <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px;">
                                    The original message of length <strong>L bits</strong> is padded so that its total length becomes a multiple of 1024 bits.
                                </p>
                                <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">
                                    <li><strong>Add '1' bit:</strong> Start with a single '1' bit</li>
                                    <li><strong>Add k×'0' bits:</strong> Add as many '0' bits as necessary</li>
                                    <li><strong>Add 128-bit length:</strong> Append original length L as 128-bit binary</li>
                                </ul>
                                <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #64748b;">
                                        Total length after padding: N × 1024 bits
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <div style="background: #3b82f6; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">EXAMPLE</div>
                                    <div style="font-size: 0.9rem;">Message: "Hello" (40 bits)</div>
                                    <div style="font-size: 0.8rem; opacity: 0.9; margin-top: 5px;">
                                        Padding: '1' + 887×'0' + 128-bit(40)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ready to Proceed -->
                <div id="ready-section" style="margin-top: 25px; text-align: center;">
                    <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; padding: 20px;">
                        <div style="font-size: 1.1rem; font-weight: 600; color: #166534; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i data-feather="check-circle" style="width: 20px; height: 20px;"></i>
                            Ready to Proceed?
                        </div>
                        <p style="color: #4b5563; font-size: 0.9rem; margin-bottom: 15px;">
                            You've learned about <span id="current-step-name">preprocessing and padding</span>. 
                            Do you understand how SHA-512 prepares the message for processing?
                        </p>
                        <button onclick="nextProcessStep()" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 10px;">
                            <i data-feather="arrow-right" style="width: 16px; height: 16px;"></i>
                            Continue to Next Step
                        </button>
                    </div>
                </div>
            </div>

        </div>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
        .process-step-btn {
            transition: all 0.3s ease;
        }
        .process-step-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .process-step-btn.active {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .block-process {
            transition: all 0.3s ease;
        }
        .block-process:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(style);

    appendContent(html);
    feather.replace();
    initializeProcessSteps();
}

// Process Steps Logic
let currentProcessStep = 1;

function initializeProcessSteps() {
    updateProcessStepContent();
}

function showProcessStep(step) {
    currentProcessStep = step;
    
    // Update button states
    document.querySelectorAll('.process-step-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        btn.style.background = '#64748b';
        if (index === step - 1) {
            btn.classList.add('active');
            btn.style.background = '#3b82f6';
        }
    });
    
    updateProcessStepContent();
    feather.replace();
}

function updateProcessStepContent() {
    const contentDiv = document.getElementById('process-step-content');
    const stepNameSpan = document.getElementById('current-step-name');
    
    switch(currentProcessStep) {
        case 1:
            stepNameSpan.textContent = 'preprocessing and padding';
            contentDiv.innerHTML = `
                <div id="step-1-content">
                    <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1rem;">Step 1: Preprocessing and Padding</h5>
                    <div style="display: flex; gap: 20px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px;">
                                The original message of length <strong>L bits</strong> is padded so that its total length becomes a multiple of 1024 bits.
                            </p>
                            <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">
                                <li><strong>Add '1' bit:</strong> Start with a single '1' bit after the message</li>
                                <li><strong>Add k×'0' bits:</strong> Add minimum number of '0' bits to reach (length mod 1024) = 896</li>
                                <li><strong>Add 128-bit length:</strong> Append original length L as 128-bit binary number</li>
                            </ul>
                            <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #64748b; margin-bottom: 5px;">
                                    Formula: Message + '1' + k×'0' + 128-bit(L)
                                </div>
                                <div style="font-size: 0.8rem; color: #94a3b8;">
                                    Total padded length: N × 1024 bits
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="background: #3b82f6; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">📝 EXAMPLE</div>
                                <div style="font-size: 0.9rem; margin-bottom: 5px;">Message: "SHA" (24 bits)</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-top: 10px;">
                                    Message: SHA<br>
                                    Padding: 1 + 887×0<br>
                                    Length: 128-bit(24)<br>
                                    Total: 1024 bits
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 2:
            stepNameSpan.textContent = 'first block processing';
            contentDiv.innerHTML = `
                <div id="step-2-content">
                    <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1rem;">Step 2: First Block Processing</h5>
                    <div style="display: flex; gap: 20px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px;">
                                The first 1024-bit block (M₁) is processed with the Initialization Vector (H₀).
                            </p>
                            <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">
                                <li><strong>Inputs:</strong> H₀ (512-bit IV) + M₁ (1024-bit block)</li>
                                <li><strong>Compression Function F:</strong> Processes the data through 80 rounds</li>
                                <li><strong>Output:</strong> H₁ = H₀ + F(M₁, H₀)</li>
                                <li><strong>Key Point:</strong> Each addition is modulo 2⁶⁴</li>
                            </ul>
                            <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #64748b; text-align: center;">
                                    H₁ = H₀ + F(M₁, H₀)
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">⚙️ COMPRESSION FUNCTION</div>
                                <div style="font-size: 0.9rem; margin-bottom: 5px;">Inside Function F:</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-top: 10px;">
                                    1. Message Expansion (W[0]-W[79])<br>
                                    2. 80 Rounds Processing<br>
                                    3. Register Updates (a-h)<br>
                                    4. Final Addition
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 3:
            stepNameSpan.textContent = 'iterative processing';
            contentDiv.innerHTML = `
                <div id="step-3-content">
                    <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1rem;">Step 3: Iterative Processing</h5>
                    <div style="display: flex; gap: 20px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px;">
                                Each subsequent block uses the hash from previous block as input.
                            </p>
                            <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">
                                <li><strong>Chaining:</strong> Hᵢ = Hᵢ₋₁ + F(Mᵢ, Hᵢ₋₁)</li>
                                <li><strong>Avalanche Effect:</strong> Small changes propagate through chain</li>
                                <li><strong>Parallelism:</strong> Cannot process blocks in parallel (sequential dependency)</li>
                                <li><strong>Security:</strong> Each block depends on all previous blocks</li>
                            </ul>
                            <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #64748b; text-align: center;">
                                    For i = 2 to N: Hᵢ = Hᵢ₋₁ + F(Mᵢ, Hᵢ₋₁)
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">🔗 CHAIN EFFECT</div>
                                <div style="font-size: 0.9rem; margin-bottom: 5px;">Dependency Chain:</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-top: 10px;">
                                    M₁ → H₁<br>
                                    M₂ → H₂ (depends on H₁)<br>
                                    M₃ → H₃ (depends on H₂)<br>
                                    ...<br>
                                    Mₙ → Hₙ (depends on Hₙ₋₁)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 4:
            stepNameSpan.textContent = 'final hash output';
            contentDiv.innerHTML = `
                <div id="step-4-content">
                    <h5 style="color: #1e40af; margin-bottom: 15px; font-size: 1.1rem;">Step 4: Final Hash Output</h5>
                    <div style="display: flex; gap: 20px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 15px;">
                                After processing all N blocks, the final hash value Hₙ is the output.
                            </p>
                            <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6;">
                                <li><strong>Final Hash:</strong> Hₙ = Hₙ₋₁ + F(Mₙ, Hₙ₋₁)</li>
                                <li><strong>Size:</strong> 512 bits (64 bytes)</li>
                                <li><strong>Uniqueness:</strong> Acts as digital fingerprint</li>
                                <li><strong>Verification:</strong> Same input always produces same hash</li>
                            </ul>
                            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 6px;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: white; text-align: center;">
                                    FINAL OUTPUT: 512-bit Hash Code
                                </div>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="background: #8b5cf6; color: white; padding: 20px; border-radius: 8px; display: inline-block;">
                                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">🎯 RESULT</div>
                                <div style="font-size: 0.9rem; margin-bottom: 5px;">Example SHA-512 Hash:</div>
                                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; margin-top: 10px; word-break: break-all;">
                                    "Hello" →<br>
                                    cf83e1357eefb8bdf154...<br>
                                    ...2850d66d8007d620e4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
}

function nextProcessStep() {
    if (currentProcessStep < 4) {
        currentProcessStep++;
        showProcessStep(currentProcessStep);
    } else {
        // Reset to step 1 when done
        currentProcessStep = 1;
        showProcessStep(currentProcessStep);
    }
}
// NEW SECTION: SHA-512 FAQ - Important Questions Answered
function addSHA512FAQSection() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="help-circle" style="color:#f59e0b;"></i> SHA-512: Important Questions Answered
                </div>
                <div class="module-subtitle">
                    Addressing key questions about SHA-512 initialization and processing logic.
                </div>
            </div>

            <!-- Question 1 -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                    <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; flex-shrink: 0;">
                        Q1
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color:#334155; font-size: 1.1rem;">Where does H₀ (512-bit Initialization Vector) come from?</h4>
                        <div style="margin-top: 5px; font-size: 0.9rem; color: #64748b;">
                            What is it and why do we need this starting value?
                        </div>
                    </div>
                </div>

                <!-- Answer -->
                <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; border-left: 4px solid #0ea5e9;">
                    <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 15px;">
                        <div style="background: #0ea5e9; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; flex-shrink: 0;">
                            A1
                        </div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0; color:#0369a1; font-size: 1rem;">The Initialization Vector (IV) / H₀ Explained</h5>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div>
                            <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 0.95rem;">What is H₀?</h6>
                            <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin: 0;">
                                H₀ is a <strong>fixed 512-bit constant value</strong> that serves as the starting point for the SHA-512 algorithm. 
                                It's also called the <strong>Initialization Vector (IV)</strong>.
                            </p>
                            <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #0369a1;">
                                    H₀ = {H₀₀, H₀₁, H₀₂, H₀₃, H₀₄, H₀₅, H₀₆, H₀₇}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 0.95rem;">Why do we need H₀?</h6>
                            <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin: 0; padding-left: 20px;">
                                <li>Provides a <strong>starting state</strong> for the first block</li>
                                <li>Ensures <strong>deterministic output</strong> (same input → same hash)</li>
                                <li>Prevents <strong>length extension attacks</strong></li>
                                <li>Standardized across all SHA-512 implementations</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Where it comes from -->
                    <div style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #0ea5e9; margin-bottom: 15px;">
                        <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 0.95rem;">Where does H₀ come from?</h6>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin: 0 0 15px 0;">
                            H₀ is derived from the <strong>first 64 bits of the fractional parts of the square roots 
                            of the first 8 prime numbers</strong> (2, 3, 5, 7, 11, 13, 17, 19).
                        </p>
                        
                        <!-- Visual representation -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 15px;">
                            <div style="text-align: center; padding: 10px; background: #f0f9ff; border-radius: 6px;">
                                <div style="font-size: 0.7rem; color: #64748b;">Prime 2</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #0369a1;">√2 → 6a09e667...</div>
                            </div>
                            <div style="text-align: center; padding: 10px; background: #f0f9ff; border-radius: 6px;">
                                <div style="font-size: 0.7rem; color: #64748b;">Prime 3</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #0369a1;">√3 → bb67ae85...</div>
                            </div>
                            <div style="text-align: center; padding: 10px; background: #f0f9ff; border-radius: 6px;">
                                <div style="font-size: 0.7rem; color: #64748b;">Prime 5</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #0369a1;">√5 → 3c6ef372...</div>
                            </div>
                            <div style="text-align: center; padding: 10px; background: #f0f9ff; border-radius: 6px;">
                                <div style="font-size: 0.7rem; color: #64748b;">Prime 7</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #0369a1;">√7 → a54ff53a...</div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
                            8 primes → 8 × 64-bit values = 512-bit H₀
                        </div>
                    </div>

                    <!-- Complete H₀ Values -->
                    <div>
                        <h6 style="color: #0c4a6e; margin-bottom: 10px; font-size: 0.95rem;">Complete H₀ Values (Hexadecimal):</h6>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₀ (a)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">6a09e667f3bcc908</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₁ (b)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">bb67ae8584caa73b</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₂ (c)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">3c6ef372fe94f82b</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₃ (d)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">a54ff53a5f1d36f1</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₄ (e)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">510e527fade682d1</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₅ (f)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">9b05688c2b3e6c1f</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₆ (g)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">1f83d9abfb41bd6b</div>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 6px; border: 1px solid #bfdbfe;">
                                <div style="font-size: 0.7rem; color: #64748b; margin-bottom: 3px;">H₀₇ (h)</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #0369a1; word-break: break-all;">5be0cd19137e2179</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question 2 -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                    <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; flex-shrink: 0;">
                        Q2
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color:#334155; font-size: 1.1rem;">When does the chain/loop occur in SHA-512?</h4>
                        <div style="margin-top: 5px; font-size: 0.9rem; color: #64748b;">
                            If a message fits in 1024 bits, does the iterative process still happen?
                        </div>
                    </div>
                </div>

                <!-- Answer -->
                <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; border-left: 4px solid #10b981;">
                    <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                        <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; flex-shrink: 0;">
                            A2
                        </div>
                        <div style="flex: 1;">
                            <h5 style="margin: 0; color:#047857; font-size: 1rem;">Understanding the Iterative Chain Process</h5>
                        </div>
                    </div>

                    <!-- Key Concept -->
                    <div style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #86efac; margin-bottom: 20px;">
                        <h6 style="color: #065f46; margin-bottom: 10px; font-size: 0.95rem;">Key Concept: Merkle-Damgård Construction</h6>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin: 0;">
                            SHA-512 uses the <strong>Merkle-Damgård construction</strong>, which <strong>always</strong> processes data in an 
                            iterative chain, regardless of message length.
                        </p>
                    </div>

                    <!-- Scenarios Visualization -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                        <!-- Scenario 1: Short Message -->
                        <div style="background: white; border-radius: 8px; padding: 20px; border: 2px solid #f0f0f0;">
                            <div style="text-align: center; margin-bottom: 15px;">
                                <div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; margin: 0 auto 10px;">
                                    1
                                </div>
                                <h6 style="margin: 0; color:#1e40af; font-size: 0.95rem;">Short Message (< 896 bits)</h6>
                            </div>
                            
                            <div style="text-align: center; margin-bottom: 15px;">
                                <div style="display: inline-block; padding: 8px 15px; background: #f0f9ff; border-radius: 6px; border: 1px solid #bfdbfe;">
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #0369a1;">
                                        Message: "Hi" (16 bits)
                                    </div>
                                </div>
                            </div>
                            
                            <div style="font-size: 0.85rem; color: #4b5563; line-height: 1.5;">
                                <strong>Process:</strong>
                                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                                    <li>Add padding (1 + 751×0 + 128-bit length)</li>
                                    <li>Total becomes 1024 bits (1 block)</li>
                                    <li>Process <strong>ONE iteration</strong> of the chain</li>
                                    <li>H₁ = H₀ + F(M₁, H₀)</li>
                                </ol>
                            </div>
                            
                            <div style="margin-top: 15px; padding: 10px; background: #f0f9ff; border-radius: 6px; text-align: center;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #0369a1;">
                                    H₁ = H₀ + F(M₁, H₀)
                                </div>
                                <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">
                                    Still 1 iteration of the chain
                                </div>
                            </div>
                        </div>

                        <!-- Scenario 2: Multiple Blocks -->
                        <div style="background: white; border-radius: 8px; padding: 20px; border: 2px solid #f0f0f0;">
                            <div style="text-align: center; margin-bottom: 15px;">
                                <div style="background: #ef4444; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; margin: 0 auto 10px;">
                                    2
                                </div>
                                <h6 style="margin: 0; color:#b91c1c; font-size: 0.95rem;">Long Message (> 1024 bits)</h6>
                            </div>
                            
                            <div style="text-align: center; margin-bottom: 15px;">
                                <div style="display: inline-block; padding: 8px 15px; background: #fef2f2; border-radius: 6px; border: 1px solid #fecaca;">
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #dc2626;">
                                        Message: "The quick brown fox..." (2248 bits)
                                    </div>
                                </div>
                            </div>
                            
                            <div style="font-size: 0.85rem; color: #4b5563; line-height: 1.5;">
                                <strong>Process:</strong>
                                <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                                    <li>Add padding to reach multiple of 1024</li>
                                    <li>Split into 3 blocks (M₁, M₂, M₃)</li>
                                    <li>Process <strong>THREE iterations</strong> of the chain</li>
                                    <li>H₁ = H₀ + F(M₁, H₀)</li>
                                    <li>H₂ = H₁ + F(M₂, H₁)</li>
                                    <li>H₃ = H₂ + F(M₃, H₂)</li>
                                </ol>
                            </div>
                            
                            <div style="margin-top: 15px; padding: 10px; background: #fef2f2; border-radius: 6px; text-align: center;">
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #dc2626;">
                                    H₃ = H₂ + F(M₃, H₂)
                                </div>
                                <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">
                                    3 iterations of the chain
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- The Critical Answer -->
                    <div style="background: linear-gradient(135deg, #059669, #10b981); border-radius: 8px; padding: 20px; color: white;">
                        <h6 style="margin: 0 0 15px 0; font-size: 1rem; display: flex; align-items: center; gap: 10px;">
                            <i data-feather="alert-circle" style="width: 20px; height: 20px;"></i>
                            The Critical Answer
                        </h6>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 6px;">
                                <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">When does the chain occur?</div>
                                <div style="font-size: 0.85rem; opacity: 0.9;">
                                    <strong>ALWAYS!</strong> The chain (Hᵢ = Hᵢ₋₁ + F(Mᵢ, Hᵢ₋₁)) happens for <strong>EVERY</strong> block.
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 6px;">
                                <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">Short message scenario:</div>
                                <div style="font-size: 0.85rem; opacity: 0.9;">
                                    Even if message fits in one block, we still have: H₁ = H₀ + F(M₁, H₀)
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 6px;">
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; text-align: center; margin-bottom: 5px;">
                                Minimum: H₁ = H₀ + F(M₁, H₀)
                            </div>
                            <div style="font-size: 0.8rem; opacity: 0.9; text-align: center;">
                                At least one iteration of the chain always occurs
                            </div>
                        </div>
                    </div>

                    <!-- Visual Summary -->
                    <div style="margin-top: 20px;">
                        <h6 style="color: #065f46; margin-bottom: 15px; font-size: 0.95rem;">Visual Summary:</h6>
                        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #bbf7d0;">
                            <div style="text-align: center;">
                                <div style="font-size: 0.9rem; font-weight: bold; color: #1e40af; margin-bottom: 5px;">Short Message</div>
                                <div style="font-size: 0.8rem; color: #64748b;">Message → Padding → 1 Block → H₁</div>
                            </div>
                            
                            <div style="font-size: 1.5rem; color: #94a3b8;">=</div>
                            
                            <div style="text-align: center;">
                                <div style="font-size: 0.9rem; font-weight: bold; color: #b91c1c; margin-bottom: 5px;">Long Message</div>
                                <div style="font-size: 0.8rem; color: #64748b;">Message → Padding → N Blocks → Hₙ</div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                            <strong>Same chain logic, different number of iterations</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Takeaways -->
            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 12px; color: white;">
                <h4 style="margin-top: 0; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                    <i data-feather="check-circle" style="width: 20px; height: 20px;"></i>
                    Key Takeaways
                </h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <h5 style="margin-bottom: 10px; font-size: 0.95rem; opacity: 0.9;">About H₀ (Initialization Vector)</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                            <li>Fixed 512-bit constant derived from prime numbers</li>
                            <li>Provides starting point for hash computation</li>
                            <li>Same across all SHA-512 implementations</li>
                            <li>Ensures deterministic output</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px; font-size: 0.95rem; opacity: 0.9;">About Iterative Processing</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                            <li>Chain ALWAYS occurs (minimum 1 iteration)</li>
                            <li>Number of iterations = Number of blocks</li>
                            <li>Hᵢ = Hᵢ₋₁ + F(Mᵢ, Hᵢ₋₁) for each block</li>
                            <li>Short messages still go through full process</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    `;

    appendContent(html);
    feather.replace();
}
// NEW SECTION: COMPRESSION FUNCTION DETAILED VISUALIZATION
function addCompressionFunctionVisualization() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="git-merge" style="color:#ef4444;"></i> Compression Function: Detailed Flow
                </div>
                <div class="module-subtitle">
                    How SHA-512 processes a 1024-bit block with the current hash state.
                </div>
            </div>

            <!-- The Big Picture -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">The Big Picture: F(Mᵢ, Hᵢ₋₁)</h4>
                
                <!-- Core Process Visualization -->
                <div style="position: relative; padding: 20px; background: #f8fafc; border-radius: 12px; margin-bottom: 25px;">
                    
                    <!-- Inputs Section -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; position: relative;">
                        <!-- Hᵢ₋₁ Input -->
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #8b5cf6, #a78bfa); color: white; padding: 20px; border-radius: 10px; width: 160px; position: relative;">
                                <div style="font-weight: bold; font-size: 1rem;">Hᵢ₋₁</div>
                                <div style="font-size: 0.75rem; opacity: 0.9;">512-bit Input</div>
                                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #8b5cf6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">
                                    Current State
                                </div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                8 × 64-bit registers
                            </div>
                        </div>
                        
                        <!-- Plus Sign -->
                        <div style="font-size: 2rem; color: #64748b; position: relative;">
                            +
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f8fafc; padding: 0 10px; font-size: 0.8rem; color: #94a3b8;">
                                mod 2⁶⁴
                            </div>
                        </div>
                        
                        <!-- Mᵢ Input -->
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #3b82f6, #0ea5e9); color: white; padding: 20px; border-radius: 10px; width: 160px; position: relative;">
                                <div style="font-weight: bold; font-size: 1rem;">Mᵢ</div>
                                <div style="font-size: 0.75rem; opacity: 0.9;">1024-bit Block</div>
                                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">
                                    Message Block
                                </div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                16 × 64-bit words
                            </div>
                        </div>
                        
                        <!-- Arrow to Compression -->
                        <div style="font-size: 2rem; color: #64748b; margin: 0 20px;">→</div>
                        
                        <!-- Compression Function -->
                        <div style="text-align: center; position: relative;">
                            <div style="background: linear-gradient(135deg, #f59e0b, #f97316); color: white; padding: 25px; border-radius: 10px; width: 180px; position: relative; z-index: 2;">
                                <div style="font-weight: bold; font-size: 1.1rem;">F</div>
                                <div style="font-size: 0.8rem; opacity: 0.9;">Compression Function</div>
                            </div>
                            <div style="position: absolute; top: -15px; left: -15px; right: -15px; bottom: -15px; background: rgba(245, 158, 11, 0.1); border: 3px dashed #f59e0b; border-radius: 16px; z-index: 1;"></div>
                            <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                                80 rounds processing
                            </div>
                        </div>
                    </div>
                    
                    <!-- Output Arrow -->
                    <div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 2rem; color: #64748b;">↓</div>
                        <div style="font-size: 0.8rem; color: #94a3b8;">Output of F</div>
                    </div>
                    
                    <!-- Final Output -->
                    <div style="text-align: center;">
                        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 10px; width: 180px; display: inline-block;">
                            <div style="font-weight: bold; font-size: 1rem;">F(Mᵢ, Hᵢ₋₁)</div>
                            <div style="font-size: 0.75rem; opacity: 0.9;">512-bit Output</div>
                        </div>
                        <div style="margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                            Processed hash state
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stage 1: Message Schedule Generation -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">Stage 1: Message Schedule Generation</h4>
                
                <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h5 style="color: #0369a1; margin-bottom: 15px; font-size: 1rem;">The 1024-bit block is "stretched" to provide data for 80 rounds</h5>
                </div>

                <!-- Step 1: Splitting Visualization -->
                <div style="margin-bottom: 30px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-right: 15px;">
                            1
                        </div>
                        <h5 style="margin: 0; color:#1e40af; font-size: 1rem;">Splitting into 16 Words</h5>
                    </div>
                    
                    <!-- Visual Block Split -->
                    <div style="background: white; border: 3px solid #1e40af; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                        <div style="text-align: center; margin-bottom: 15px;">
                            <div style="font-weight: bold; color: #1e40af; font-size: 0.9rem;">1024-bit Block Mᵢ</div>
                            <div style="font-size: 0.8rem; color: #64748b;">(128 bytes)</div>
                        </div>
                        
                        <!-- 16 Words Visualization -->
                        <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 8px; margin-bottom: 15px;">
                            ${Array.from({length: 16}, (_, i) => `
                                <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px; text-align: center; position: relative;">
                                    <div style="font-weight: bold; font-size: 0.8rem;">W[${i}]</div>
                                    <div style="font-size: 0.6rem; opacity: 0.9;">64 bits</div>
                                    <div style="position: absolute; top: -8px; right: -8px; background: #ef4444; color: white; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: bold;">
                                        ${i < 10 ? i : i.toString(16)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
                            16 × 64-bit words = 1024 bits
                        </div>
                    </div>
                    
                    <div style="padding: 15px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569; text-align: center;">
                            Mᵢ = [W[0] | W[1] | W[2] | ... | W[15]]
                        </div>
                    </div>
                </div>

                <!-- Step 2: Expansion Visualization -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #10b981; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-right: 15px;">
                            2
                        </div>
                        <h5 style="margin: 0; color:#047857; font-size: 1rem;">Expansion to 80 Words</h5>
                    </div>
                    
                    <!-- Expansion Formula Visualization -->
                    <div style="background: white; border: 3px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <div style="text-align: center; margin-bottom: 15px;">
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: #065f46; font-weight: bold;">
                                W[t] = σ₁(W[t-2]) + W[t-7] + σ₀(W[t-15]) + W[t-16]
                            </div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">for t = 16 to 79</div>
                        </div>
                        
                        <!-- Visual Expansion Process -->
                        <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 20px;">
                            <!-- Initial Words -->
                            <div style="text-align: center;">
                                <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 8px; width: 120px;">
                                    <div style="font-weight: bold;">Initial 16</div>
                                    <div style="font-size: 0.7rem;">W[0]-W[15]</div>
                                </div>
                                <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">From message block</div>
                            </div>
                            
                            <!-- Arrow -->
                            <div style="font-size: 2rem; color: #94a3b8;">→</div>
                            
                            <!-- Expansion Process -->
                            <div style="text-align: center; position: relative;">
                                <div style="background: #f59e0b; color: white; padding: 15px; border-radius: 8px; width: 140px;">
                                    <div style="font-weight: bold;">Expansion</div>
                                    <div style="font-size: 0.7rem;">Generate 64 more</div>
                                </div>
                                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">
                                    σ₀, σ₁ functions
                                </div>
                            </div>
                            
                            <!-- Arrow -->
                            <div style="font-size: 2rem; color: #94a3b8;">→</div>
                            
                            <!-- Final Words -->
                            <div style="text-align: center;">
                                <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; width: 120px;">
                                    <div style="font-weight: bold;">Total 80</div>
                                    <div style="font-size: 0.7rem;">W[0]-W[79]</div>
                                </div>
                                <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">One for each round</div>
                            </div>
                        </div>
                        
                        <!-- Example Generation -->
                        <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; border: 1px solid #86efac;">
                            <div style="text-align: center; font-weight: bold; color: #065f46; margin-bottom: 10px; font-size: 0.9rem;">Example: Generating W[16]</div>
                            <div style="display: flex; justify-content: space-around; align-items: center; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #475569;">
                                <div style="text-align: center;">
                                    <div>W[14]</div>
                                    <div style="color: #64748b; font-size: 0.7rem;">(t-2)</div>
                                </div>
                                <div style="color: #f59e0b;">σ₁</div>
                                <div style="text-align: center;">
                                    <div>W[9]</div>
                                    <div style="color: #64748b; font-size: 0.7rem;">(t-7)</div>
                                </div>
                                <div>+</div>
                                <div style="text-align: center;">
                                    <div>W[1]</div>
                                    <div style="color: #64748b; font-size: 0.7rem;">(t-15)</div>
                                </div>
                                <div style="color: #f59e0b;">σ₀</div>
                                <div style="text-align: center;">
                                    <div>W[0]</div>
                                    <div style="color: #64748b; font-size: 0.7rem;">(t-16)</div>
                                </div>
                                <div>=</div>
                                <div style="text-align: center; color: #10b981; font-weight: bold;">
                                    W[16]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stage 2: Hᵢ₋₁ Loading and Round Processing -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">Stage 2: Hᵢ₋₁ Loading and 80 Rounds Processing</h4>
                
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h5 style="color: #92400e; margin-bottom: 15px; font-size: 1rem;">Hᵢ₋₁ provides the current state, W[t] provides message data for each round</h5>
                </div>

                <!-- Hᵢ₋₁ Loading Visualization -->
                <div style="margin-bottom: 30px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #8b5cf6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-right: 15px;">
                            1
                        </div>
                        <h5 style="margin: 0; color:#5b21b6; font-size: 1rem;">Loading Hᵢ₋₁ into Registers</h5>
                    </div>
                    
                    <!-- 8 Registers Visualization -->
                    <div style="background: white; border: 3px solid #8b5cf6; border-radius: 8px; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-weight: bold; color: #5b21b6; font-size: 0.9rem;">512-bit Hᵢ₋₁ Loaded into 8 Registers</div>
                            <div style="font-size: 0.8rem; color: #64748b;">Each register = 64 bits</div>
                        </div>
                        
                        <!-- Registers Grid -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
                            ${['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((reg, index) => {
                                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6'];
                                return `
                                    <div style="background: ${colors[index]}; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                                        <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 5px;">${reg}</div>
                                        <div style="font-size: 0.7rem; opacity: 0.9;">Register ${index + 1}</div>
                                        <div style="margin-top: 10px; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; background: rgba(255,255,255,0.2); padding: 4px; border-radius: 4px;">
                                            ${Array.from({length: 8}, () => Math.floor(Math.random() * 16).toString(16)).join('')}...
                                        </div>
                                        <div style="font-size: 0.6rem; margin-top: 5px;">64 bits</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        
                        <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
                            8 registers × 64 bits = 512 bits = Hᵢ₋₁
                        </div>
                    </div>
                </div>

                <!-- 80 Rounds Processing -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="background: #ef4444; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.9rem; margin-right: 15px;">
                            2
                        </div>
                        <h5 style="margin: 0; color:#b91c1c; font-size: 1rem;">80 Rounds Processing</h5>
                    </div>
                    
                    <!-- Round Visualization -->
                    <div style="background: white; border: 3px solid #ef4444; border-radius: 8px; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-weight: bold; color: #b91c1c; font-size: 0.9rem;">Each Round t (0 to 79) Processes:</div>
                        </div>
                        
                        <!-- Round Inputs -->
                        <div style="display: flex; justify-content: space-around; align-items: center; margin-bottom: 25px;">
                            <!-- Current Registers -->
                            <div style="text-align: center;">
                                <div style="background: #8b5cf6; color: white; padding: 12px; border-radius: 8px; width: 140px;">
                                    <div style="font-weight: bold;">Registers a-h</div>
                                    <div style="font-size: 0.7rem;">Current State</div>
                                </div>
                            </div>
                            
                            <div style="font-size: 1.5rem; color: #94a3b8;">+</div>
                            
                            <!-- Message Word -->
                            <div style="text-align: center;">
                                <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 8px; width: 140px;">
                                    <div style="font-weight: bold;">W[t]</div>
                                    <div style="font-size: 0.7rem;">Message Word</div>
                                </div>
                            </div>
                            
                            <div style="font-size: 1.5rem; color: #94a3b8;">+</div>
                            
                            <!-- Round Constant -->
                            <div style="text-align: center;">
                                <div style="background: #f59e0b; color: white; padding: 12px; border-radius: 8px; width: 140px;">
                                    <div style="font-weight: bold;">K[t]</div>
                                    <div style="font-size: 0.7rem;">Round Constant</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Round Logic Visualization -->
                        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                            <div style="text-align: center; font-weight: bold; color: #334155; margin-bottom: 15px; font-size: 0.9rem;">Round t Logic</div>
                            
                            <!-- T1 and T2 Calculation -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                                <div style="background: white; padding: 15px; border-radius: 6px; border: 2px solid #0ea5e9;">
                                    <div style="font-weight: bold; color: #0369a1; margin-bottom: 8px; font-size: 0.8rem;">T₁ Calculation</div>
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #0c4a6e;">
                                        T₁ = h + Ch(e,f,g) + Σ₁(e) + W[t] + K[t]
                                    </div>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 6px; border: 2px solid #10b981;">
                                    <div style="font-weight: bold; color: #047857; margin-bottom: 8px; font-size: 0.8rem;">T₂ Calculation</div>
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: #065f46;">
                                        T₂ = Σ₀(a) + Maj(a,b,c)
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Register Updates -->
                            <div style="background: white; padding: 15px; border-radius: 6px; border: 2px solid #f59e0b;">
                                <div style="font-weight: bold; color: #b45309; margin-bottom: 10px; font-size: 0.8rem;">Register Updates:</div>
                                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #92400e; text-align: center;">
                                    h = g, g = f, f = e, e = d + T₁<br>
                                    d = c, c = b, b = a, a = T₁ + T₂
                                </div>
                            </div>
                        </div>
                        
                        <!-- Round Progression -->
                        <div style="text-align: center;">
                            <div style="display: inline-flex; align-items: center; background: #f8fafc; padding: 10px 20px; border-radius: 6px; border: 1px solid #e2e8f0;">
                                <div style="font-weight: bold; color: #334155; margin-right: 10px;">Round Progression:</div>
                                <div style="display: flex; gap: 5px;">
                                    ${Array.from({length: 10}, (_, i) => `
                                        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${i === 0 ? '#ef4444' : '#cbd5e1'};"></div>
                                    `).join('')}
                                    <div style="color: #94a3b8; font-size: 0.8rem; margin-left: 5px;">0...79</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stage 3: Final Addition (Feed-Forward) -->
            <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">Stage 3: Final Addition (Feed-Forward)</h4>
                
                <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h5 style="color: #047857; margin-bottom: 15px; font-size: 1rem;">The processed state is combined with the original state</h5>
                </div>

                <!-- Feed-Forward Visualization -->
                <div style="position: relative; padding: 20px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 12px;">
                    
                    <!-- Original Hᵢ₋₁ Bypass -->
                    <div style="position: absolute; top: 30px; right: 30px; width: 200px;">
                        <div style="background: rgba(139, 92, 246, 0.1); border: 2px dashed #8b5cf6; border-radius: 8px; padding: 15px; text-align: center;">
                            <div style="font-weight: bold; color: #5b21b6; font-size: 0.9rem;">BYPASS LINE</div>
                            <div style="font-size: 0.7rem; color: #64748b;">Original Hᵢ₋₁</div>
                        </div>
                        <div style="height: 150px; border-right: 2px dashed #8b5cf6; margin: 10px auto 0; width: 2px;"></div>
                    </div>

                    <!-- Final Addition Process -->
                    <div style="max-width: 600px; margin: 0 auto;">
                        <!-- Final Registers -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="background: #f59e0b; color: white; padding: 20px; border-radius: 10px; display: inline-block;">
                                <div style="font-weight: bold; font-size: 1rem;">Final Registers</div>
                                <div style="font-size: 0.75rem; opacity: 0.9;">After 80 rounds</div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                                New a-h values from processing
                            </div>
                        </div>
                        
                        <!-- Addition Arrows -->
                        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 30px;">
                            <div style="text-align: center; margin-right: 40px;">
                                <div style="font-size: 2rem; color: #3b82f6;">+</div>
                                <div style="font-size: 0.7rem; color: #64748b;">mod 2⁶⁴</div>
                            </div>
                            
                            <div style="text-align: center;">
                                <div style="font-size: 2rem; color: #8b5cf6;">=</div>
                            </div>
                        </div>
                        
                        <!-- Original Hᵢ₋₁ -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="background: #8b5cf6; color: white; padding: 20px; border-radius: 10px; display: inline-block;">
                                <div style="font-weight: bold; font-size: 1rem;">Original Hᵢ₋₁</div>
                                <div style="font-size: 0.75rem; opacity: 0.9;">From bypass line</div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                                Original register values
                            </div>
                        </div>
                        
                        <!-- Final Result -->
                        <div style="text-align: center;">
                            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 25px; border-radius: 10px; display: inline-block;">
                                <div style="font-weight: bold; font-size: 1.1rem;">Hᵢ = Hᵢ₋₁ + F(Mᵢ, Hᵢ₋₁)</div>
                                <div style="font-size: 0.8rem; opacity: 0.9;">New Intermediate Hash</div>
                            </div>
                            <div style="margin-top: 10px; font-size: 0.8rem; color: #64748b;">
                                512-bit result for next block or final output
                            </div>
                        </div>
                    </div>
                    
                    <!-- Visual Explanation -->
                    <div style="margin-top: 30px; padding: 15px; background: white; border-radius: 8px; border: 2px solid #e2e8f0;">
                        <div style="font-weight: bold; color: #334155; margin-bottom: 10px; font-size: 0.9rem;">Why Feed-Forward?</div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; font-size: 0.85rem;">
                            <div style="color: #4b5563;">
                                <strong>Security:</strong> Prevents certain attacks by mixing original and processed states
                            </div>
                            <div style="color: #4b5563;">
                                <strong>Avalanche:</strong> Small changes affect final result more dramatically
                            </div>
                            <div style="color: #4b5563;">
                                <strong>Chaining:</strong> Each block's result depends on previous state
                            </div>
                            <div style="color: #4b5563;">
                                <strong>Irreversibility:</strong> Makes hash function one-way
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Complete Flow Summary -->
            <div style="margin-top: 30px; padding: 25px; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 12px; color: white;">
                <h4 style="margin-top: 0; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                    <i data-feather="check-circle" style="width: 20px; height: 20px;"></i>
                    Complete Flow Summary
                </h4>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">Stage 1</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">
                            1024-bit → 16 words → Expand to 80 words → Message Schedule Ready
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">Stage 2</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">
                            Hᵢ₋₁ → Load registers → 80 rounds (W[t] + K[t]) → Process registers
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                        <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">Stage 3</div>
                        <div style="font-size: 0.8rem; opacity: 0.9;">
                            Processed registers + Original Hᵢ₋₁ → Hᵢ (new hash)
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 0.9rem; opacity: 0.9;">
                    F(Mᵢ, Hᵢ₋₁) = Hᵢ₋₁ + Compression(MessageSchedule + 80 Rounds)
                </div>
            </div>

        </div>
    `;

    appendContent(html);
    feather.replace();
}
// NEW SECTION: INSIGHTS - SHA-512 LOGICAL FUNCTIONS
function addLogicalFunctionsInsight() {
    const html = `
        <div class="viz-section" style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 40px;">
            
            <div class="module-header">
                <div class="module-title" style="color:#334155;">
                    <i data-feather="cpu" style="color:#8b5cf6;"></i> Inside the Compression Function: Logical Operations
                </div>
                <div class="module-subtitle">
                    Understanding the four core logical functions that drive SHA-512's security and avalanche effect.
                </div>
            </div>

            <!-- Overview Box -->
            <div style="background: #f8fafc; border-left: 4px solid #8b5cf6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin:0; color:#4b5563; font-size:0.95rem;">
                    The SHA-512 compression function uses <strong>four key logical functions</strong> that are applied 
                    during each of the 80 rounds. These functions work on 64-bit words and provide the cryptographic 
                    strength and diffusion properties that make SHA-512 secure.
                </p>
            </div>

            <!-- Four Functions Grid -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
                
                <!-- Choice (Ch) Function -->
                <div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="background: #3b82f6; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">
                            Ch
                        </div>
                        <div>
                            <h4 style="margin: 0; color:#1e40af; font-size: 1.1rem;">Choice Function</h4>
                            <div style="font-size: 0.8rem; color: #64748b;">Conditional selection between two words</div>
                        </div>
                    </div>

                    <!-- Formula -->
                    <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #bfdbfe;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #1e40af; text-align: center;">
                            Ch(e, f, g) = (e ∧ f) ⊕ (¬e ∧ g)
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 5px;">
                            e, f, g are 64-bit words
                        </div>
                    </div>

                    <!-- How it works -->
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: #334155; margin-bottom: 10px; font-size: 0.95rem;">How it works:</h5>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0 0 10px 0;">
                            For each bit position (0-63):
                        </p>
                        <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>If e's bit = 1, choose f's bit</li>
                            <li>If e's bit = 0, choose g's bit</li>
                            <li>Result is f or g depending on e</li>
                        </ul>
                    </div>

                    <!-- Visualization -->
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border: 1px solid #e0f2fe;">
                        <h6 style="color: #0369a1; margin-bottom: 10px; font-size: 0.85rem;">Bit-Level Example:</h6>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #0c4a6e;">
                            e = 1011 0010<br>
                            f = 1100 1101<br>
                            g = 0110 1001<br>
                            Ch = 1100 1001  (chooses f when e=1, g when e=0)
                        </div>
                    </div>

                    <!-- Purpose -->
                    <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 6px; color: white;">
                        <div style="font-weight: bold; margin-bottom: 5px; font-size: 0.8rem;">Purpose in SHA-512:</div>
                        <div style="font-size: 0.75rem; opacity: 0.9;">
                            Provides non-linearity and data-dependent behavior (makes cryptanalysis harder)
                        </div>
                    </div>
                </div>

                <!-- Majority (Maj) Function -->
                <div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">
                            Maj
                        </div>
                        <div>
                            <h4 style="margin: 0; color:#047857; font-size: 1.1rem;">Majority Function</h4>
                            <div style="font-size: 0.8rem; color: #64748b;">Bit-wise majority vote among three words</div>
                        </div>
                    </div>

                    <!-- Formula -->
                    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #bbf7d0;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #047857; text-align: center;">
                            Maj(a, b, c) = (a ∧ b) ⊕ (a ∧ c) ⊕ (b ∧ c)
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 5px;">
                            a, b, c are 64-bit words
                        </div>
                    </div>

                    <!-- How it works -->
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: #334155; margin-bottom: 10px; font-size: 0.95rem;">How it works:</h5>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0 0 10px 0;">
                            For each bit position (0-63):
                        </p>
                        <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>Count 1s among a, b, c bits</li>
                            <li>If ≥2 bits are 1, output 1</li>
                            <li>If ≤1 bits are 1, output 0</li>
                        </ul>
                    </div>

                    <!-- Visualization -->
                    <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0;">
                        <h6 style="color: #065f46; margin-bottom: 10px; font-size: 0.85rem;">Bit-Level Example:</h6>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #065f46;">
                            a = 1011 0010<br>
                            b = 1100 1101<br>
                            c = 0110 1001<br>
                            Maj = 1110 1001  (output 1 where ≥2 inputs are 1)
                        </div>
                    </div>

                    <!-- Purpose -->
                    <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 6px; color: white;">
                        <div style="font-weight: bold; margin-bottom: 5px; font-size: 0.8rem;">Purpose in SHA-512:</div>
                        <div style="font-size: 0.75rem; opacity: 0.9;">
                            Provides bit diffusion and mixing across registers a, b, c
                        </div>
                    </div>
                </div>

                <!-- Σ₀ (Sigma 0) Function -->
                <div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="background: #f59e0b; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">
                            Σ₀
                        </div>
                        <div>
                            <h4 style="margin: 0; color:#b45309; font-size: 1.1rem;">Sigma 0 Function</h4>
                            <div style="font-size: 0.8rem; color: #64748b;">Bit rotation and XOR combination for register a</div>
                        </div>
                    </div>

                    <!-- Formula -->
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fcd34d;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #92400e; text-align: center;">
                            Σ₀(a) = ROTR²⁸(a) ⊕ ROTR³⁴(a) ⊕ ROTR³⁹(a)
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 5px;">
                            ROTRⁿ = Right rotate by n bits
                        </div>
                    </div>

                    <!-- How it works -->
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: #334155; margin-bottom: 10px; font-size: 0.95rem;">How it works:</h5>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0 0 10px 0;">
                            Takes the 64-bit word a and:
                        </p>
                        <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>Right rotates a by 28 bits</li>
                            <li>Right rotates a by 34 bits</li>
                            <li>Right rotates a by 39 bits</li>
                            <li>XORs all three results together</li>
                        </ul>
                    </div>

                    <!-- Visualization -->
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fcd34d;">
                        <h6 style="color: #92400e; margin-bottom: 10px; font-size: 0.85rem;">Rotation Visualization:</h6>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #78350f;">
                            a = ABCDEFGH (64 bits)<br>
                            ROTR²⁸ = HABCDEFG<br>
                            ROTR³⁴ = GABCDEFH<br>
                            ROTR³⁹ = FGABCDEH<br>
                            Σ₀ = XOR of all three
                        </div>
                    </div>

                    <!-- Purpose -->
                    <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 6px; color: white;">
                        <div style="font-weight: bold; margin-bottom: 5px; font-size: 0.8rem;">Purpose in SHA-512:</div>
                        <div style="font-size: 0.75rem; opacity: 0.9;">
                            Mixes bits within register a, providing diffusion and breaking bit patterns
                        </div>
                    </div>
                </div>

                <!-- Σ₁ (Sigma 1) Function -->
                <div style="background: white; border: 2px solid #ef4444; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="background: #ef4444; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">
                            Σ₁
                        </div>
                        <div>
                            <h4 style="margin: 0; color:#b91c1c; font-size: 1.1rem;">Sigma 1 Function</h4>
                            <div style="font-size: 0.8rem; color: #64748b;">Bit rotation and XOR combination for register e</div>
                        </div>
                    </div>

                    <!-- Formula -->
                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #fecaca;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #dc2626; text-align: center;">
                            Σ₁(e) = ROTR¹⁴(e) ⊕ ROTR¹⁸(e) ⊕ ROTR⁴¹(e)
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; text-align: center; margin-top: 5px;">
                            Note: Different rotation constants than Σ₀
                        </div>
                    </div>

                    <!-- How it works -->
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: #334155; margin-bottom: 10px; font-size: 0.95rem;">How it works:</h5>
                        <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0 0 10px 0;">
                            Takes the 64-bit word e and:
                        </p>
                        <ul style="color: #4b5563; font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 20px;">
                            <li>Right rotates e by 14 bits</li>
                            <li>Right rotates e by 18 bits</li>
                            <li>Right rotates e by 41 bits</li>
                            <li>XORs all three results together</li>
                        </ul>
                    </div>

                    <!-- Visualization -->
                    <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border: 1px solid #fecaca;">
                        <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 0.85rem;">Rotation Visualization:</h6>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #991b1b;">
                            e = 0123456789ABCDEF (hex)<br>
                            ROTR¹⁴ = F0123456789ABCDE<br>
                            ROTR¹⁸ = EF0123456789ABCD<br>
                            ROTR⁴¹ = BCDEF0123456789A<br>
                            Σ₁ = XOR of all three
                        </div>
                    </div>

                    <!-- Purpose -->
                    <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 6px; color: white;">
                        <div style="font-weight: bold; margin-bottom: 5px; font-size: 0.8rem;">Purpose in SHA-512:</div>
                        <div style="font-size: 0.75rem; opacity: 0.9;">
                            Mixes bits within register e, working with Ch() to compute T₁ in each round
                        </div>
                    </div>
                </div>

            </div>

            <!-- How They Work Together -->
            <div style="background: white; border: 2px solid #8b5cf6; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">How These Functions Work Together in Each Round</h4>
                
                <!-- Round Calculation Visualization -->
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: #475569; font-weight: bold;">
                            T₁ = h + Ch(e,f,g) + Σ₁(e) + W[t] + K[t]
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Computed in every round (t = 0 to 79)</div>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: #475569; font-weight: bold;">
                            T₂ = Σ₀(a) + Maj(a,b,c)
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1rem; color: #8b5cf6; font-weight: bold;">
                            New a = T₁ + T₂
                        </div>
                        <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Other registers shift: h→g, g→f, etc.</div>
                    </div>
                </div>

                <!-- Visual Flow -->
                <div style="position: relative; padding: 20px; background: white; border-radius: 8px; border: 2px dashed #cbd5e1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                        <!-- Inputs -->
                        <div style="text-align: center; width: 100px;">
                            <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 5px;">
                                Registers<br>a-h
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Current state</div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #94a3b8;">+</div>
                        
                        <div style="text-align: center; width: 100px;">
                            <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 5px;">
                                W[t]
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Message word</div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #94a3b8;">+</div>
                        
                        <div style="text-align: center; width: 100px;">
                            <div style="background: #f59e0b; color: white; padding: 12px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 5px;">
                                K[t]
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Constant</div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #94a3b8;">→</div>
                        
                        <!-- Functions Box -->
                        <div style="text-align: center; position: relative;">
                            <div style="background: #8b5cf6; color: white; padding: 20px; border-radius: 10px; width: 200px;">
                                <div style="font-weight: bold; font-size: 1rem;">Apply Functions</div>
                                <div style="font-size: 0.7rem; margin-top: 5px;">Ch, Maj, Σ₀, Σ₁</div>
                            </div>
                            <div style="position: absolute; top: -15px; left: -15px; right: -15px; bottom: -15px; border: 3px dashed #8b5cf6; border-radius: 16px;"></div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #94a3b8;">→</div>
                        
                        <!-- Output -->
                        <div style="text-align: center; width: 100px;">
                            <div style="background: #ef4444; color: white; padding: 12px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 5px;">
                                New a-h
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Updated state</div>
                        </div>
                    </div>
                    
                    <!-- Functions Inside -->
                    <div style="text-align: center; margin-top: 20px;">
                        <div style="display: inline-flex; gap: 10px; background: #f1f5f9; padding: 10px; border-radius: 6px;">
                            <div style="padding: 8px 12px; background: #3b82f6; color: white; border-radius: 4px; font-size: 0.8rem;">Ch()</div>
                            <div style="padding: 8px 12px; background: #10b981; color: white; border-radius: 4px; font-size: 0.8rem;">Maj()</div>
                            <div style="padding: 8px 12px; background: #f59e0b; color: white; border-radius: 4px; font-size: 0.8rem;">Σ₀()</div>
                            <div style="padding: 8px 12px; background: #ef4444; color: white; border-radius: 4px; font-size: 0.8rem;">Σ₁()</div>
                        </div>
                    </div>
                </div>

                <!-- Explanation -->
                <div style="margin-top: 25px;">
                    <h5 style="color: #334155; margin-bottom: 15px; font-size: 1rem;">Why This Combination is Powerful:</h5>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div style="padding: 15px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
                            <div style="font-weight: bold; color: #1e40af; margin-bottom: 8px; font-size: 0.9rem;">Non-Linearity</div>
                            <div style="font-size: 0.85rem; color: #4b5563;">
                                Ch() and Maj() are non-linear functions that prevent linear cryptanalysis.
                            </div>
                        </div>
                        <div style="padding: 15px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
                            <div style="font-weight: bold; color: #047857; margin-bottom: 8px; font-size: 0.9rem;">Bit Diffusion</div>
                            <div style="font-size: 0.85rem; color: #4b5563;">
                                Σ₀() and Σ₁() spread bits across word positions (avalanche effect).
                            </div>
                        </div>
                        <div style="padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                            <div style="font-weight: bold; color: #b45309; margin-bottom: 8px; font-size: 0.9rem;">Register Interaction</div>
                            <div style="font-size: 0.85rem; color: #4b5563;">
                                Functions connect different registers, creating complex dependencies.
                            </div>
                        </div>
                        <div style="padding: 15px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
                            <div style="font-weight: bold; color: #dc2626; margin-bottom: 8px; font-size: 0.9rem;">Parallel Computation</div>
                            <div style="font-size: 0.85rem; color: #4b5563;">
                                T₁ and T₂ can be computed in parallel, optimizing hardware implementations.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Security Impact -->
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 12px; padding: 25px; color: white; margin-bottom: 30px;">
                <h4 style="margin-top: 0; margin-bottom: 20px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
                    <i data-feather="shield" style="width: 20px; height: 20px;"></i>
                    Security Impact of These Functions
                </h4>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    <div>
                        <h5 style="margin-bottom: 10px; font-size: 0.95rem; opacity: 0.9;">Cryptographic Strength</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                            <li><strong>Ch()</strong>: Data-dependent, breaks linearity</li>
                            <li><strong>Maj()</strong>: Balances influence of three registers</li>
                            <li><strong>Σ₀(), Σ₁()</strong>: Ensure bit diffusion across rounds</li>
                            <li><strong>Combination</strong>: Resists differential and linear attacks</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style="margin-bottom: 10px; font-size: 0.95rem; opacity: 0.9;">Performance & Design</h5>
                        <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; opacity: 0.9;">
                            <li>All operations on 64-bit words (optimized for 64-bit CPUs)</li>
                            <li>Only uses AND, XOR, NOT, and rotations (efficient in hardware)</li>
                            <li>80 rounds provide sufficient mixing for 512-bit security</li>
                            <li>Design allows pipelining in hardware implementations</li>
                        </ul>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <div style="font-weight: bold; margin-bottom: 8px; font-size: 0.9rem;">Key Insight:</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">
                        The combination of these four simple functions, applied over 80 rounds, creates a cryptographic 
                        transformation so complex that it's practically impossible to reverse or find collisions, 
                        while remaining efficient to compute in the forward direction.
                    </div>
                </div>
            </div>

            <!-- Interactive Example -->
            <div style="background: white; border: 2px solid #10b981; border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <h4 style="margin-top: 0; color:#334155; margin-bottom: 20px; font-size: 1.1rem;">Interactive Example: See the Functions in Action</h4>
                
                <div style="margin-bottom: 25px;">
                    <p style="color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">
                        Enter 8-bit values (for simplicity) to see how each function transforms the input:
                    </p>
                    
                    <!-- Input Controls -->
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px;">
                        <div>
                            <label style="display: block; font-size: 0.8rem; color: #64748b; margin-bottom: 5px;">Input a (binary):</label>
                            <input type="text" id="input-a" value="10110010" maxlength="8" 
                                   style="width: 100%; padding: 8px; border: 2px solid #3b82f6; border-radius: 6px; font-family: 'JetBrains Mono'; font-size: 0.9rem;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.8rem; color: #64748b; margin-bottom: 5px;">Input b (binary):</label>
                            <input type="text" id="input-b" value="11001101" maxlength="8" 
                                   style="width: 100%; padding: 8px; border: 2px solid #10b981; border-radius: 6px; font-family: 'JetBrains Mono'; font-size: 0.9rem;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.8rem; color: #64748b; margin-bottom: 5px;">Input c (binary):</label>
                            <input type="text" id="input-c" value="01101001" maxlength="8" 
                                   style="width: 100%; padding: 8px; border: 2px solid #f59e0b; border-radius: 6px; font-family: 'JetBrains Mono'; font-size: 0.9rem;">
                        </div>
                        <div style="display: flex; align-items: flex-end;">
                            <button onclick="calculateLogicalFunctions()" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; width: 100%;">
                                Calculate Functions
                            </button>
                        </div>
                    </div>
                    
                    <!-- Results Display -->
                    <div id="function-results" style="display: none;">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                            <div style="padding: 15px; background: #eff6ff; border-radius: 8px; border: 2px solid #3b82f6;">
                                <div style="font-weight: bold; color: #1e40af; margin-bottom: 10px; font-size: 0.9rem;">Ch(b, c, a)</div>
                                <div id="ch-result" style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #1e40af;">-</div>
                            </div>
                            <div style="padding: 15px; background: #f0fdf4; border-radius: 8px; border: 2px solid #10b981;">
                                <div style="font-weight: bold; color: #047857; margin-bottom: 10px; font-size: 0.9rem;">Maj(a, b, c)</div>
                                <div id="maj-result" style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #047857;">-</div>
                            </div>
                        </div>
                        
                        <div style="text-align: center; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 10px;">Note: Σ₀ and Σ₁ require rotation operations that are difficult to show with 8-bit examples.</div>
                            <div style="font-size: 0.8rem; color: #8b5cf6;">
                                In SHA-512, these functions work on 64-bit words with specific rotation amounts.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Reset Button -->
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="resetFunctionExample()" id="reset-func-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; display: none;">
                            Reset Example
                        </button>
                    </div>
                </div>
                
                <div style="padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <h5 style="color: #92400e; margin-bottom: 10px; font-size: 0.95rem;">Learning Point:</h5>
                    <p style="color: #78350f; font-size: 0.9rem; margin: 0;">
                        These four functions may seem simple individually, but when combined over 80 rounds with 
                        64-bit words, they create an incredibly complex transformation that's easy to compute in one 
                        direction but virtually impossible to reverse.
                    </p>
                </div>
            </div>

        </div>
    `;

    // Inject styles for this section
    const style = document.createElement('style');
    style.innerHTML = `
        input:focus {
            outline: none;
            border-color: #8b5cf6 !important;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
    `;
    document.head.appendChild(style);

    appendContent(html);
    feather.replace();
}

// Helper function for the interactive example
window.calculateLogicalFunctions = function() {
    // Get inputs
    const a = document.getElementById('input-a').value;
    const b = document.getElementById('input-b').value;
    const c = document.getElementById('input-c').value;
    
    // Validate inputs are 8-bit binary
    const binaryRegex = /^[01]{8}$/;
    if (!binaryRegex.test(a) || !binaryRegex.test(b) || !binaryRegex.test(c)) {
        alert("Please enter valid 8-bit binary values (8 characters, only 0s and 1s)");
        return;
    }
    
    // Convert binary strings to arrays of bits
    const aBits = a.split('').map(bit => parseInt(bit));
    const bBits = b.split('').map(bit => parseInt(bit));
    const cBits = c.split('').map(bit => parseInt(bit));
    
    // Calculate Ch(b, c, a) - Note: using b as selector between c and a
    let chResult = '';
    for (let i = 0; i < 8; i++) {
        if (bBits[i] === 1) {
            chResult += cBits[i];
        } else {
            chResult += aBits[i];
        }
    }
    
    // Calculate Maj(a, b, c)
    let majResult = '';
    for (let i = 0; i < 8; i++) {
        const sum = aBits[i] + bBits[i] + cBits[i];
        majResult += (sum >= 2) ? '1' : '0';
    }
    
    // Display results
    document.getElementById('ch-result').textContent = chResult;
    document.getElementById('maj-result').textContent = majResult;
    document.getElementById('function-results').style.display = 'block';
    document.getElementById('reset-func-btn').style.display = 'inline-block';
    
    // Highlight the differences
    setTimeout(() => {
        document.getElementById('ch-result').style.color = '#ef4444';
        document.getElementById('maj-result').style.color = '#10b981';
        
        setTimeout(() => {
            document.getElementById('ch-result').style.color = '#1e40af';
            document.getElementById('maj-result').style.color = '#047857';
        }, 1000);
    }, 100);
};

window.resetFunctionExample = function() {
    document.getElementById('input-a').value = '10110010';
    document.getElementById('input-b').value = '11001101';
    document.getElementById('input-c').value = '01101001';
    document.getElementById('function-results').style.display = 'none';
    document.getElementById('reset-func-btn').style.display = 'none';
};
