// des.js - Data Encryption Standard Module (Simplified Version)
function renderDES(container) {
  // 1. Reset Layout
  container.className = "";
  container.style.display = "block";
  container.style.padding = "0";

  // 2. CSS Styles for DES Module
  const style = document.createElement("style");
  style.id = "des-style";
  style.innerHTML = `
        .des-container {
            width: 100%;
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .des-header {
            margin-bottom: 25px;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 20px;
        }

        .des-title {
            font-size: 1.8rem;
            color: #0f172a;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
        }

        .des-subtitle {
            color: #64748b;
            font-size: 1rem;
            line-height: 1.5;
        }

        .section {
            margin-bottom: 40px;
            padding: 25px;
            background: #f8fafc;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }

        .section-title {
            font-size: 1.3rem;
            color: #1e293b;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .section-title i {
            color: #3b82f6;
        }

        .info-box {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .info-box h4 {
            margin: 0 0 10px 0;
            color: #0369a1;
            font-size: 1.1rem;
        }

        .info-box p {
            margin: 0;
            color: #4b5563;
            line-height: 1.6;
        }

        .key-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }

        .feature-box {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
        }

        .feature-icon {
            color: #3b82f6;
            margin-bottom: 12px;
        }

        .feature-title {
            font-weight: 600;
            color: #334155;
            margin-bottom: 8px;
            font-size: 1rem;
        }

        .feature-desc {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 0;
        }

        /* FIXED: Force exactly 3 columns per row */
        .spec-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Exactly 3 columns */
            gap: 20px;
            margin: 20px 0;
        }

        /* For smaller screens, show 2 columns */
        @media (max-width: 1024px) {
            .spec-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* For mobile screens, show 1 column */
        @media (max-width: 640px) {
            .spec-grid {
                grid-template-columns: 1fr;
            }
        }

        .spec-box {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 25px 15px;
            text-align: center;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .spec-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .spec-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: #3b82f6;
            margin: 10px 0 5px 0;
            line-height: 1.2;
        }

        .spec-label {
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .highlight {
            background: #fef3c7;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
            /* Add these styles to your existing CSS */
.process-tab {
    padding: 12px 24px;
    background: #f1f5f9;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
}

.process-tab:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
}

.process-tab.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.process-step {
    display: none;
    animation: fadeIn 0.3s ease;
}

.process-step.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.flow-arrow {
    font-size: 1.5rem;
    color: #94a3b8;
    margin: 0 10px;
}

.bit-box {
    padding: 12px 16px;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    font-weight: bold;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.bit-box:hover {
    transform: scale(1.05);
}

.data-bit {
    background: #dbeafe;
    color: #1e40af;
    border: 2px solid #93c5fd;
}

.key-bit {
    background: #d1fae5;
    color: #065f46;
    border: 2px solid #a7f3d0;
}

.permutation-bit {
    background: #fef3c7;
    color: #92400e;
    border: 2px solid #fcd34d;
}

.round-bit {
    background: #ede9fe;
    color: #5b21b6;
    border: 2px solid #c4b5fd;
}

.output-bit {
    background: #fee2e2;
    color: #991b1b;
    border: 2px solid #fca5a5;
}

.dual-path-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin: 30px 0;
}

@media (max-width: 768px) {
    .dual-path-container {
        grid-template-columns: 1fr;
    }
}

.path-box {
    padding: 25px;
    border-radius: 12px;
    border: 2px solid;
    height: 100%;
}

.data-path-box {
    background: #f0f9ff;
    border-color: #0ea5e9;
}

.key-path-box {
    background: #f0fdf4;
    border-color: #10b981;
}

.path-step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-left: 20px;
    position: relative;
}

.path-step:last-child {
    margin-bottom: 0;
}

.path-step::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
}

.path-step:nth-child(2)::before { background: #f59e0b; }
.path-step:nth-child(3)::before { background: #8b5cf6; }
.path-step:nth-child(4)::before { background: #10b981; }
.path-step:nth-child(5)::before { background: #ef4444; }

.path-step-line {
    position: absolute;
    left: 5px;
    top: 22px;
    bottom: -25px;
    width: 2px;
    background: #cbd5e1;
}

.path-step:last-child .path-step-line {
    display: none;
}
    /* Add to existing CSS in style.innerHTML */
.process-table {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
    margin: 20px 0;
}

/* For 12-column grids (48 bits) */
.process-table[style*="grid-template-columns: repeat(12"] {
    grid-template-columns: repeat(12, 1fr);
    gap: 8px;
}
.bit-cell:hover {
    transform: scale(1.2);
    z-index: 10;
}

.bit-cell.original {
    background: #dbeafe;
    border-color: #3b82f6;
    color: #1e40af;
}

.bit-cell.permuted {
    background: #fef3c7;
    border-color: #f59e0b;
    color: #92400e;
}

.bit-cell.expanded {
    background: #ede9fe;
    border-color: #8b5cf6;
    color: #5b21b6;
}

.bit-cell.key {
    background: #d1fae5;
    border-color: #10b981;
    color: #065f46;
}

.bit-cell.xor-result {
    background: #fce7f3;
    border-color: #db2777;
    color: #9d174d;
}

.bit-cell.sbox-input {
    background: #fef3c7;
    border-color: #f59e0b;
    color: #92400e;
}

.bit-cell.sbox-output {
    background: #fee2e2;
    border-color: #ef4444;
    color: #991b1b;
}

.bit-cell.final {
    background: #dcfce7;
    border-color: #16a34a;
    color: #166534;
}

.step-container {
    padding: 25px;
    background: white;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    margin-bottom: 30px;
    position: relative;
}

.step-number {
    position: absolute;
    top: -15px;
    left: 20px;
    background: #3b82f6;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
}

.sbox-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 15px 0;
}

.sbox {
    padding: 15px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    text-align: center;
}

.sbox-title {
    font-weight: bold;
    color: #334155;
    margin-bottom: 10px;
    font-size: 0.9rem;
}

.sbox-bits {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: #475569;
    margin-bottom: 5px;
}

.permutation-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    color: #64748b;
    font-size: 1.2rem;
}

.permutation-line {
    flex: 1;
    height: 2px;
    background: #cbd5e1;
    margin: 0 10px;
}

.example-input {
    font-family: 'JetBrains Mono', monospace;
    background: #1e293b;
    color: #f1f5f9;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    font-size: 0.9rem;
    overflow-x: auto;
}

.bit-cell {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: bold;
    font-size: 0.85rem;
    transition: all 0.3s;
    padding: 2px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
}

.bit-label {
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.65rem;
    color: #64748b;
    line-height: 1;
}
.operation-box {
    padding: 15px;
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    border-radius: 8px;
    border: 2px dashed #cbd5e1;
    margin: 15px 0;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
}
    `;

  const oldStyle = document.getElementById("des-style");
  if (oldStyle) oldStyle.remove();
  document.head.appendChild(style);

  // 3. Render DES Introduction Content
  container.innerHTML = `
        <div class="des-container">
            <!-- Header -->
            <div class="des-header">
                <div class="des-title">
                    <i data-feather="layers"></i> Data Encryption Standard (DES)
                </div>
                <div class="des-subtitle">
                    The legacy symmetric-key block cipher that revolutionized cryptography and paved the way for modern encryption standards.
                </div>
            </div>

            <!-- Section 1: What is DES and Why Do We Need It? -->
            <div class="section">
                <div class="section-title">
                    <i data-feather="info"></i> What is DES and Why Do We Need It?
                </div>

                <div class="info-box">
                    <h4>The Historical Context</h4>
                    <p>
                        Before DES, encryption was primarily used by governments and military organizations. 
                        The need for a standardized, publicly available encryption algorithm became apparent 
                        as businesses began to computerize sensitive operations.
                    </p>
                </div>

                <p style="color: #4b5563; line-height: 1.6; font-size: 1rem;">
                    The <span class="highlight">Data Encryption Standard (DES)</span> was developed in the 1970s by IBM and adopted 
                    as a U.S. federal standard in 1977. It became the <span class="highlight">first widely-used encryption algorithm</span> 
                    in commercial applications and set the foundation for modern cryptography.
                </p>
            </div>

            <!-- Section 2: Key Features of DES -->
            <div class="section">
                <div class="section-title">
                    <i data-feather="star"></i> Key Features of DES
                </div>

                <div class="key-features">
                    <div class="feature-box">
                        <div class="feature-icon"><i data-feather="key"></i></div>
                        <div class="feature-title">Symmetric Key Algorithm</div>
                        <p class="feature-desc">Uses the same key for both encryption and decryption, ensuring efficient and consistent operation.</p>
                    </div>
                    
                    <div class="feature-box">
                        <div class="feature-icon"><i data-feather="box"></i></div>
                        <div class="feature-title">Block Cipher Design</div>
                        <p class="feature-desc">Processes data in fixed-size 64-bit blocks, providing structured and predictable encryption.</p>
                    </div>
                    
                    <div class="feature-box">
                        <div class="feature-icon"><i data-feather="git-merge"></i></div>
                        <div class="feature-title">Feistel Network</div>
                        <p class="feature-desc">Uses 16 rounds of Feistel structure for confusion and diffusion, making cryptanalysis difficult.</p>
                    </div>
                    
                    <div class="feature-box">
                        <div class="feature-icon"><i data-feather="shield"></i></div>
                        <div class="feature-title">Standardized Security</div>
                        <p class="feature-desc">First publicly available encryption standard that underwent extensive cryptanalysis.</p>
                    </div>
                </div>
            </div>
            
            <!-- Section 3: Technical Specifications -->
            <div class="section">
                <div class="section-title">
                    <i data-feather="cpu"></i> Technical Specifications
                </div>

                <!-- First Row: 3 boxes -->
                <div class="spec-grid">
                    <div class="spec-box">
                        <div class="spec-label">Block Size</div>
                        <div class="spec-value">64 bits</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">(8 bytes)</div>
                    </div>
                    
                    <div class="spec-box">
                        <div class="spec-label">Total Rounds</div>
                        <div class="spec-value">16</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">Feistel rounds</div>
                    </div>
                    
                    <div class="spec-box">
                        <div class="spec-label">Key Size</div>
                        <div class="spec-value">64 bits</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">(56 bits + 8 parity)</div>
                    </div>
                </div>

                <!-- Second Row: 3 boxes -->
                <div class="spec-grid">
                    <div class="spec-box">
                        <div class="spec-label">Sub Keys</div>
                        <div class="spec-value">16</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">One per round</div>
                    </div>
                    
                    <div class="spec-box">
                        <div class="spec-label">Sub Key Size</div>
                        <div class="spec-value">48 bits</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">Each subkey</div>
                    </div>
                    
                    <div class="spec-box">
                        <div class="spec-label">Cipher Text</div>
                        <div class="spec-value">64 bits</div>
                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 5px;">Same as block size</div>
                    </div>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
                    <p style="margin: 0; color: #0369a1; font-size: 0.9rem;">
                        <strong>Note:</strong> DES is a block cipher that uses a Feistel network structure with 16 rounds. 
                        The 64-bit key includes 8 parity bits, making the effective key size 56 bits. 
                        Each round uses a different 48-bit subkey derived from the main key.
                    </p>
                </div>
            </div>
        </div>

<!-- Section 4: Feistel Structure Visualization -->
<div class="section">
    <div class="section-title">
        <i data-feather="git-merge"></i> Feistel Structure Visualization
    </div>

    <div class="info-box">
        <h4>General Concepts</h4>
        <p>
            A Feistel cipher operates on a block of data by splitting it into two equal halves: <strong>Left (L)</strong> and <strong>Right (R)</strong>. 
            It performs a series of iterative "rounds." In each round, only one half of the data is modified using a specific round function (F) 
            and a round key (K), and then the halves are swapped.
        </p>
    </div>

    <!-- Encryption Process Visualization -->
    <div style="margin: 30px 0;">
        <h5 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
            <i data-feather="lock" style="color: #3b82f6;"></i> Encryption Process (16 Rounds)
        </h5>
        
        <!-- Initial State -->
        <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 15px;">
                <div style="text-align: center;">
                    <div style="background: #3b82f6; color: white; padding: 12px; border-radius: 8px; width: 100px;">
                        L₀
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Left (32 bits)</div>
                </div>
                <div style="text-align: center;">
                    <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; width: 100px;">
                        R₀
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Right (32 bits)</div>
                </div>
            </div>
            <div style="text-align: center; font-size: 0.9rem; color: #0369a1;">
                Initial Plaintext: 64-bit block split into two 32-bit halves
            </div>
        </div>

        <!-- Round Visualization -->
        <div id="round-visualization">
            <!-- This will be populated by JavaScript -->
        </div>

        <!-- Round Controls -->
        <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-flex; align-items: center; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 8px;">
                <button onclick="showRound('first')" class="round-btn active" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Round 1-4
                </button>
                <button onclick="showRound('middle')" class="round-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Round 5-12
                </button>
                <button onclick="showRound('last')" class="round-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Round 13-16
                </button>
                <button onclick="showRound('all')" class="round-btn" style="background: #64748b; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Complete Flow
                </button>
            </div>
        </div>

        <!-- Round Function Explanation -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h6 style="color: #334155; margin-bottom: 15px; font-size: 1rem;">The Round Function F(R, K):</h6>
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 15px;">
                <div style="text-align: center;">
                    <div style="background: #10b981; color: white; padding: 12px; border-radius: 8px; width: 80px;">
                        Rᵢ₋₁
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Right Input (32 bits)</div>
                </div>
                <div style="font-size: 1.5rem; color: #64748b;">+</div>
                <div style="text-align: center;">
                    <div style="background: #f59e0b; color: white; padding: 12px; border-radius: 8px; width: 80px;">
                        Kᵢ
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Round Key (48 bits)</div>
                </div>
                <div style="font-size: 1.5rem; color: #64748b;">→</div>
                <div style="text-align: center;">
                    <div style="background: #8b5cf6; color: white; padding: 15px; border-radius: 8px; width: 100px;">
                        Function F
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Transformation</div>
                </div>
                <div style="font-size: 1.5rem; color: #64748b;">→</div>
                <div style="text-align: center;">
                    <div style="background: #ef4444; color: white; padding: 12px; border-radius: 8px; width: 80px;">
                        32 bits
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Output</div>
                </div>
            </div>
            <div style="text-align: center; font-size: 0.9rem; color: #64748b;">
                F expands 32-bit R to 48 bits, XORs with K, applies S-boxes, then permutes back to 32 bits
            </div>
        </div>
    </div>

    <!-- Decryption Process -->
    <div style="margin: 40px 0;">
        <h5 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem; display: flex; align-items: center; gap: 10px;">
            <i data-feather="unlock" style="color: #10b981;"></i> Decryption Process
        </h5>
        
        <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 20px;">
            <p style="color: #065f46; margin-bottom: 15px; line-height: 1.6;">
                A key advantage of Feistel networks is that the exact same structure can be used for decryption, 
                just by reversing the order of the round keys.
            </p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h6 style="color: #047857; margin-bottom: 10px; font-size: 0.95rem;">Encryption Order:</h6>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        ${Array.from(
                          { length: 16 },
                          (_, i) => `
                            <div style="background: #3b82f6; color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem;">
                                K${i + 1}
                            </div>
                        `
                        ).join("")}
                    </div>
                </div>
                <div>
                    <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 0.95rem;">Decryption Order:</h6>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        ${Array.from(
                          { length: 16 },
                          (_, i) => `
                            <div style="background: #ef4444; color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem;">
                                K${16 - i}
                            </div>
                        `
                        ).join("")}
                    </div>
                </div>
            </div>
            
            <div style="padding: 15px; background: white; border-radius: 6px; border: 1px solid #86efac;">
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #065f46; text-align: center;">
                    Lᵢ = Rᵢ₋₁  and  Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)
                </div>
                <div style="text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                    Same formula works for both encryption and decryption with reversed keys
                </div>
            </div>
        </div>
    </div>

    <!-- Mathematical Proof -->
    <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h5 style="color: #92400e; margin-bottom: 15px; font-size: 1.1rem;">Mathematical Logic Behind Reversibility</h5>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h6 style="color: #b45309; margin-bottom: 10px; font-size: 0.95rem;">Encryption Step:</h6>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #92400e;">
                    Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)
                </div>
            </div>
            <div>
                <h6 style="color: #b45309; margin-bottom: 10px; font-size: 0.95rem;">Decryption Step:</h6>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #92400e;">
                    Lᵢ₋₁ = Rᵢ ⊕ F(Rᵢ₋₁, Kᵢ)
                </div>
            </div>
        </div>
        
        <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #92400e; text-align: center;">
                Because: Rᵢ ⊕ F(Rᵢ₋₁, Kᵢ) = (Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)) ⊕ F(Rᵢ₋₁, Kᵢ) = Lᵢ₋₁
            </div>
            <div style="text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                XOR operation is its own inverse: A ⊕ B ⊕ B = A
            </div>
        </div>
    </div>

    <!-- Summary of Key Features -->
    <div style="margin-top: 30px;">
        <h5 style="color: #334155; margin-bottom: 15px; font-size: 1.1rem;">Summary of Key Features</h5>
        
        <div class="key-features">
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="repeat"></i></div>
                <div class="feature-title">Efficiency</div>
                <p class="feature-desc">Function F does not need to be mathematically reversible because the Feistel structure handles reversibility through XOR operations.</p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="refresh-cw"></i></div>
                <div class="feature-title">Symmetry</div>
                <p class="feature-desc">Encryption and decryption are virtually identical processes, which simplifies hardware and software implementation.</p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="shield"></i></div>
                <div class="feature-title">Security</div>
                <p class="feature-desc">By repeating simple operations (rounds) many times, a complex relationship is created between plaintext and ciphertext.</p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="zap"></i></div>
                <div class="feature-title">Performance</div>
                <p class="feature-desc">Only half of the data block is processed in each round, allowing for parallel implementations and optimizations.</p>
            </div>
        </div>
    </div>
</div>

<style>
.round-btn {
    transition: all 0.2s;
}
.round-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.round-btn.active {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
<!-- Section 5: Complete DES Encryption Process -->
<div class="section">
    <div class="section-title">
        <i data-feather="cpu"></i> Complete DES Encryption Process
    </div>
    
    <div class="info-box">
        <h4>Two Parallel Paths: Data and Key</h4>
        <p>
            DES encryption involves two parallel but interconnected processes: the <strong>Data Path</strong> (left) 
            that scrambles the message, and the <strong>Key Path</strong> (right) that generates 16 unique subkeys. 
            These paths interact in each of the 16 rounds through the Feistel network.
        </p>
    </div>

    <!-- Dual Path Visualization -->
    <div class="dual-path-container">
        <!-- Data Path -->
        <div class="path-box data-path-box">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: #3b82f6; color: white; padding: 10px 15px; border-radius: 8px; margin-right: 15px;">
                    <i data-feather="file-text"></i>
                </div>
                <div>
                    <h5 style="color: #0369a1; margin: 0 0 5px 0;">Data Path (Left Side)</h5>
                    <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Processes the actual message from plaintext to ciphertext</p>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box data-bit">64 bits</div>
                        <div>
                            <h6 style="color: #1e40af; margin: 0 0 5px 0;">64-bit Plaintext</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Input message block (8 bytes). If longer, divided into multiple blocks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box permutation-bit">IP</div>
                        <div>
                            <h6 style="color: #92400e; margin: 0 0 5px 0;">Initial Permutation (IP)</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                "Shuffling" step that rearranges 64 bits according to fixed table. 
                                Doesn't add security but prepares data for rounds.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box round-bit">16×</div>
                        <div>
                            <h6 style="color: #5b21b6; margin: 0 0 5px 0;">16 Rounds of Processing</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Each round: Split into L/R halves → F(R, Kᵢ) → XOR with L → Swap halves.
                                Uses Feistel network structure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box data-bit">⇄</div>
                        <div>
                            <h6 style="color: #1e40af; margin: 0 0 5px 0;">32-bit Swap</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                After 16th round, left and right halves are swapped one last time.
                                Enables same algorithm for decryption with reversed keys.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div class="bit-box output-bit">64 bits</div>
                        <div>
                            <h6 style="color: #991b1b; margin: 0 0 5px 0;">64-bit Ciphertext</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Final encrypted output after Inverse Initial Permutation (IP⁻¹).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Key Path -->
        <div class="path-box key-path-box">
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                <div style="background: #10b981; color: white; padding: 10px 15px; border-radius: 8px; margin-right: 15px;">
                    <i data-feather="key"></i>
                </div>
                <div>
                    <h5 style="color: #047857; margin: 0 0 5px 0;">Key Path (Right Side)</h5>
                    <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Generates 16 unique subkeys from single master key</p>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box key-bit">64 bits</div>
                        <div>
                            <h6 style="color: #065f46; margin: 0 0 5px 0;">64-bit Master Key</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Starting key with 8 parity bits (bits 8, 16, 24, 32, 40, 48, 56, 64) 
                                for error checking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box permutation-bit">PC-1</div>
                        <div>
                            <h6 style="color: #92400e; margin: 0 0 5px 0;">Permuted Choice 1 (PC-1)</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Discards 8 parity bits → 56-bit effective key.
                                Rearranges and splits into two 28-bit halves (C₀ and D₀).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box key-bit">16×</div>
                        <div>
                            <h6 style="color: #065f46; margin: 0 0 5px 0;">Left Circular Shifts</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Rounds 1, 2, 9, 16: Shift by 1 bit.<br>
                                Other rounds: Shift by 2 bits.<br>
                                Creates variation for each subkey.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div class="bit-box permutation-bit">PC-2</div>
                        <div>
                            <h6 style="color: #92400e; margin: 0 0 5px 0;">Permuted Choice 2 (PC-2)</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Selects and rearranges 48 bits from the 56-bit shifted key.
                                Produces Subkey Kᵢ for each round.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="path-step">
                <div class="path-step-line"></div>
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div class="bit-box round-bit">16×48 bits</div>
                        <div>
                            <h6 style="color: #5b21b6; margin: 0 0 5px 0;">16 Subkeys (K₁ to K₁₆)</h6>
                            <p style="color: #64748b; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                                Each 48-bit subkey enters Round Function F.
                                Applied forward for encryption, reversed for decryption.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- How Paths Connect -->
    <div style="margin: 40px 0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">How Data and Key Paths Connect</h5>
        
        <div style="position: relative; padding: 30px; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius: 12px; border: 2px solid #cbd5e1;">
            <!-- Round Connection Visualization -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; padding: 20px; background: white; border-radius: 10px; border: 3px solid #8b5cf6; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);">
                    <div style="font-size: 1.3rem; color: #5b21b6; font-weight: bold; margin-bottom: 5px;">
                        Single Round Connection
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        How data and key interact in each round
                    </div>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 30px; margin-bottom: 20px;">
                <!-- Data Input -->
                <div style="text-align: center;">
                    <div class="bit-box data-bit" style="margin-bottom: 10px;">
                        Rᵢ₋₁
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">Right Half (32 bits)</div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">+</div>
                
                <!-- Key Input -->
                <div style="text-align: center;">
                    <div class="bit-box key-bit" style="margin-bottom: 10px;">
                        Kᵢ
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">Subkey (48 bits)</div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">→</div>
                
                <!-- Round Function -->
                <div style="text-align: center; position: relative;">
                    <div style="background: #8b5cf6; color: white; padding: 20px; border-radius: 10px; font-weight: bold;">
                        Function F
                    </div>
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #8b5cf6; color: white; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem;">
                        Round i
                    </div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">→</div>
                
                <!-- Output -->
                <div style="text-align: center;">
                    <div class="bit-box round-bit" style="margin-bottom: 10px;">
                        32 bits
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">F(Rᵢ₋₁, Kᵢ)</div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">⊕</div>
                
                <!-- XOR with Left -->
                <div style="text-align: center;">
                    <div class="bit-box data-bit" style="margin-bottom: 10px;">
                        Lᵢ₋₁
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">Left Half (32 bits)</div>
                </div>
            </div>
            
            <div style="text-align: center; color: #64748b; font-size: 0.9rem; line-height: 1.6;">
                In each of the 16 rounds: <strong>Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)</strong> and <strong>Lᵢ = Rᵢ₋₁</strong><br>
                This happens 16 times with different Kᵢ each round
            </div>
        </div>
    </div>

    <!-- Why This Structure is Effective -->
    <div style="margin-top: 40px;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Why This Structure is Effective</h5>
        
        <div class="key-features">
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="repeat"></i></div>
                <div class="feature-title">Diffusion</div>
                <p class="feature-desc">
                    Permutations (IP, PC-1, PC-2, P-Box) ensure changing one plaintext bit 
                    affects many ciphertext bits, spreading the influence.
                </p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="git-merge"></i></div>
                <div class="feature-title">Confusion</div>
                <p class="feature-desc">
                    S-Boxes inside rounds provide non-linear substitution, making relationship 
                    between key and ciphertext incredibly complex.
                </p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="refresh-cw"></i></div>
                <div class="feature-title">Symmetry</div>
                <p class="feature-desc">
                    Feistel structure + final swap means no separate decryption engine needed.
                    Use same process with reversed keys (K₁₆ to K₁).
                </p>
            </div>
            
            <div class="feature-box">
                <div class="feature-icon"><i data-feather="shield"></i></div>
                <div class="feature-title">Key Strength</div>
                <p class="feature-desc">
                    56-bit effective key (72 quadrillion possibilities) with unique 48-bit 
                    subkey each round prevents pattern recognition.
                </p>
            </div>
        </div>
    </div>

    <!-- Full Process Diagram -->
    <div style="margin-top: 40px; padding: 25px; background: white; border-radius: 12px; border: 2px solid #e2e8f0;">
        <h5 style="color: #334155; margin-bottom: 25px; text-align: center;">Complete DES Process Diagram</h5>
        
        <!-- Top Row: Data Path -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; position: relative;">
            <div style="text-align: center; flex: 1;">
                <div class="bit-box data-bit">Plaintext</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">64 bits</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #3b82f6;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
                <div class="bit-box permutation-bit">IP</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Initial Permutation</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #3b82f6;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1; position: relative;">
                <div style="background: #8b5cf6; color: white; padding: 15px; border-radius: 8px;">
                    16 Rounds
                </div>
                <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); background: #8b5cf6; color: white; padding: 3px 10px; border-radius: 4px; font-size: 0.8rem;">
                    Feistel Network
                </div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">With 16 subkeys</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #3b82f6;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
                <div class="bit-box output-bit">Ciphertext</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">64 bits</div>
            </div>
        </div>
        
        <!-- Middle: Connection Line -->
        <div style="text-align: center; margin: 20px 0;">
            <div style="height: 2px; background: #cbd5e1; margin: 0 100px;"></div>
            <div style="display: inline-block; padding: 5px 15px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 20px; margin-top: -11px;">
                <span style="color: #64748b; font-size: 0.8rem;">Uses 16 subkeys from</span>
            </div>
        </div>
        
        <!-- Bottom Row: Key Path -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="text-align: center; flex: 1;">
                <div class="bit-box key-bit">Key</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">64 bits</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #10b981;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
                <div class="bit-box permutation-bit">PC-1</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">56-bit key</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #10b981;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
                <div style="background: #f59e0b; color: white; padding: 15px; border-radius: 8px;">
                    16× Shifts
                </div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Left circular</div>
            </div>
            
            <div style="flex: 0 0 30px; text-align: center;">
                <div style="font-size: 1.5rem; color: #10b981;">→</div>
            </div>
            
            <div style="text-align: center; flex: 1;">
                <div class="bit-box permutation-bit">PC-2</div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">16×48-bit subkeys</div>
            </div>
        </div>
        
        <!-- Final Summary -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <div style="display: inline-block; padding: 15px 25px; background: linear-gradient(135deg, #3b82f6, #10b981); color: white; border-radius: 8px;">
                <div style="font-weight: bold; font-size: 1.1rem;">One Process, Two Paths</div>
                <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 5px;">
                    Data transforms through rounds while key generates subkeys for each round
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Section 6: DES Round Function - Detailed Step-by-Step Example -->
<div class="section">
    <div class="section-title">
        <i data-feather="git-merge"></i> DES Round Function - Detailed Step-by-Step Example
    </div>
    
    <div class="info-box">
        <h4>Understanding the Core Transformation</h4>
        <p>
            This section walks through a complete example of the Round Function F(R, K), showing exactly how 
            32-bit input transforms through Expansion, XOR with Key, S-Box substitution, and P-Box permutation.
            We'll use concrete binary values to demonstrate each step.
        </p>
    </div>

    <!-- Example Setup -->
    <div class="step-container">
        <div class="step-number">0</div>
        <h5 style="color: #334155; margin-bottom: 20px;">Example Setup</h5>
        
        <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            For this example, we'll use the following values:
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="padding: 20px; background: #f0f9ff; border-radius: 8px;">
                <h6 style="color: #0369a1; margin-bottom: 10px;">Right Half Input (Rᵢ₋₁)</h6>
                <div class="example-input">
                    1100 1101 0110 0011 1010 1100 0110 1001
                </div>
                <div style="text-align: center; color: #64748b; font-size: 0.9rem;">
                    32 bits = 8 hexadecimal digits
                </div>
            </div>
            
            <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
                <h6 style="color: #047857; margin-bottom: 10px;">Round Key (Kᵢ)</h6>
                <div class="example-input">
                    0101 1100 1001 0110 1100 0011 1010 1101 0110 1001 1011 0010
                </div>
                <div style="text-align: center; color: #64748b; font-size: 0.9rem;">
                    48 bits = 12 hexadecimal digits
                </div>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <i data-feather="info" style="color: #f59e0b;"></i>
                <div style="color: #92400e; font-size: 0.9rem;">
                    <strong>Note:</strong> We're using simplified 4-bit groupings for readability. 
                    In actual DES, bits are processed in their original order.
                </div>
            </div>
        </div>
    </div>

    <!-- Step 1: Initial Permutation of Input -->
    <div class="step-container">
        <div class="step-number">1</div>
        <h5 style="color: #334155; margin-bottom: 15px;">Step 1: Understanding Bit Positions (Before Expansion)</h5>
        
        <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            First, let's visualize our 32-bit input and understand how bits are numbered in DES:
        </p>
        
        <!-- 32-bit Input Visualization -->
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #1e40af; margin-bottom: 15px;">32-bit Input (Rᵢ₋₁)</h6>
            <div class="process-table">
                ${Array.from({ length: 32 }, (_, i) => {
                  const bitValue = "11001101011000111010110001101001"[i];
                  return `
                        <div class="bit-cell original" title="Bit ${
                          i + 1
                        }: ${bitValue}">
                            ${bitValue}
                            <div class="bit-label">${i + 1}</div>
                        </div>
                    `;
                }).join("")}
            </div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 10px;">
                Bits numbered 1-32 (reading left to right)
            </div>
        </div>
        
        <div style="padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <i data-feather="alert-circle" style="color: #3b82f6; margin-top: 3px;"></i>
                <div>
                    <div style="font-weight: 600; color: #334155; margin-bottom: 5px;">Important Convention</div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        In DES, bit numbering starts from <strong>1</strong> (not 0). 
                        Bit 1 is the most significant bit (MSB), and bit 32 is the least significant bit (LSB).
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 2: Expansion P-Box (32 → 48 bits) -->
    <div class="step-container">
        <div class="step-number">2</div>
        <h5 style="color: #334155; margin-bottom: 15px;">Step 2: Expansion P-Box (E-Box) - 32 → 48 bits</h5>
        
        <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            The Expansion permutation expands 32 bits to 48 bits by duplicating specific bits. 
            This allows each bit to affect more S-boxes in the next step.
        </p>

<!-- Expansion Table Explanation -->
<div style="margin-bottom: 25px;">
    <h6 style="color: #92400e; margin-bottom: 10px;">Expansion Table (E-Table)</h6>
    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">
        The E-table specifies which input bit goes to which output position. Each 6-bit output block
        takes bits from specific input positions, with some bits duplicated:
    </p>
    
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 15px 0;">
        ${(() => {
            // Correct DES Expansion Table
            const eTable = [
                [32, 1, 2, 3, 4, 5],
                [4, 5, 6, 7, 8, 9],
                [8, 9, 10, 11, 12, 13],
                [12, 13, 14, 15, 16, 17],
                [16, 17, 18, 19, 20, 21],
                [20, 21, 22, 23, 24, 25],
                [24, 25, 26, 27, 28, 29],
                [28, 29, 30, 31, 32, 1]
            ];
            
            return eTable.map((block, idx) => {
                const outputBits = block.map((inputBit, pos) => 
                    `Out ${idx * 6 + pos + 1} ← In ${inputBit}`
                ).join("<br>");
                
                return `
                    <div style="padding: 12px; background: ${idx % 2 === 0 ? '#fef3c7' : '#fff7ed'}; 
                        border-radius: 6px; border: 2px solid #fcd34d;">
                        <div style="font-weight: bold; color: #92400e; margin-bottom: 8px; font-size: 0.9rem;">
                            Block ${idx + 1} (6 bits)
                        </div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; 
                            color: #78350f; line-height: 1.6;">
                            ${outputBits}
                        </div>
                    </div>
                `;
            }).join("");
        })()}
    </div>
    
    <div style="font-size: 0.9rem; color: #64748b; text-align: center;">
        Note: Bits 1, 4, 5, 8, 9, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 32 are duplicated (used twice)
    </div>
</div>
        
        <!-- Before and After Expansion -->
        <div style="margin-bottom: 20px;">
            <h6 style="color: #5b21b6; margin-bottom: 15px; text-align: center;">Expansion Visualization</h6>
            
            <!-- Before Expansion -->
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="margin-bottom: 10px;">
                    <div style="font-weight: 600; color: #1e40af; margin-bottom: 5px;">Before Expansion (32 bits)</div>
                    <div class="process-table" style="grid-template-columns: repeat(8, 1fr);">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const bits =
                            "11001101011000111010110001101001".substring(
                              i * 4,
                              (i + 1) * 4
                            );
                          return `
                                <div class="bit-cell original">
                                    ${bits}
                                    <div class="bit-label">${i * 4 + 1}-${
                            (i + 1) * 4
                          }</div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                
                <!-- Expansion Arrow -->
                <div class="permutation-arrow">
                    <div class="permutation-line"></div>
                    <div style="color: #8b5cf6;">
                        <i data-feather="maximize-2"></i> Expansion
                    </div>
                    <div class="permutation-line"></div>
                </div>
                
           
<div>
    <div style="font-weight: 600; color: #5b21b6; margin-bottom: 5px;">After Expansion (48 bits)</div>
    <div class="process-table" style="grid-template-columns: repeat(6, 1fr);">
        ${(() => {
            const inputBits = "11001101011000111010110001101001";
            const eTable = [
                32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14,
                15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26,
                27, 28, 29, 28, 29, 30, 31, 32, 1
            ];
            
            return eTable.map((bitPos, outPos) => {
                const bitValue = inputBits[bitPos - 1];
                const isDuplicate = eTable.filter((b, index) => index !== outPos && b === bitPos).length > 0;
                
                return `
                    <div class="bit-cell expanded" title="Output bit ${outPos + 1} = Input bit ${bitPos}" 
                         style="${isDuplicate ? 'border-color: #ef4444; border-width: 3px;' : ''};
                                display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px;">
                        <div style="font-size: 1rem; font-weight: bold;">${bitValue}</div>
                        <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">
                            ${outPos + 1}←${bitPos}
                        </div>
                    </div>
                `;
            }).join("");
        })()}
    </div>
    <div style="text-align: center; font-size: 0.8rem; color: #64748b;">
        48 bits (duplicated bits shown with red borders)
    </div>
</div>
            </div>
        </div>
        
        <div style="padding: 15px; background: #f0f9ff; border-radius: 8px;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <i data-feather="zap" style="color: #0ea5e9; margin-top: 3px;"></i>
                <div>
                    <div style="font-weight: 600; color: #0369a1; margin-bottom: 5px;">Why Expand?</div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        Expansion serves two purposes: 1) Makes data same size as key for XOR operation, 
                        2) Duplicates bits so each bit affects more S-boxes, enhancing diffusion.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Step 3: XOR with Round Key -->
    <div class="step-container">
        <div class="step-number">3</div>
        <h5 style="color: #334155; margin-bottom: 15px;">Step 3: XOR with Round Key (48 bits)</h5>
        
        <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            The 48-bit expanded data is XORed with the 48-bit round key. XOR (exclusive OR) returns 1 
            when bits differ, 0 when they're the same.
        </p>
        
        <!-- XOR Operation Visualization -->
        <div style="margin-bottom: 20px;">
            <h6 style="color: #db2777; margin-bottom: 15px; text-align: center;">XOR Operation</h6>
            
            <!-- XOR Formula -->
            <div class="operation-box">
                <div style="color: #475569; margin-bottom: 10px;">Expanded ⊕ Key = Result</div>
                <div style="font-size: 1.1rem; color: #334155; font-weight: bold;">
                    110011 010110 001110 101100 011010 011100 110110 001011
                </div>
                <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">Expanded (48 bits)</div>
            </div>
            
            <div style="text-align: center; margin: 10px 0;">
                <div style="font-size: 1.5rem; color: #64748b;">⊕</div>
            </div>
            
            <div class="operation-box">
                <div style="color: #475569; margin-bottom: 10px;">XOR with</div>
                <div style="font-size: 1.1rem; color: #334155; font-weight: bold;">
                    010111 001001 011011 000011 101011 010110 100110 110010
                </div>
                <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">Key Kᵢ (48 bits)</div>
            </div>
            
            <div style="text-align: center; margin: 10px 0;">
                <div style="font-size: 1.5rem; color: #64748b;">=</div>
            </div>
            
            <div class="operation-box">
                <div style="color: #475569; margin-bottom: 10px;">XOR Result</div>
                <div style="font-size: 1.1rem; color: #334155; font-weight: bold;">
                    100100 011111 010101 101111 110001 001010 010000 111001
                </div>
                <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">48 bits ready for S-boxes</div>
            </div>
        </div>
        
        <!-- Detailed XOR Example -->
        <div style="padding: 20px; background: #fdf2f8; border-radius: 8px; border: 1px solid #fbcfe8;">
            <h6 style="color: #9d174d; margin-bottom: 10px;">Detailed XOR Example (First 6 bits):</h6>
            <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 15px;">
                ${Array.from({ length: 6 }, (_, i) => {
                  const expandedBit = ["1", "1", "0", "0", "1", "1"][i];
                  const keyBit = ["0", "1", "0", "1", "1", "1"][i];
                  const xorResult = (
                    parseInt(expandedBit) ^ parseInt(keyBit)
                  ).toString();
                  return `
                        <div style="text-align: center;">
                            <div style="font-weight: bold; color: #334155; margin-bottom: 5px;">Bit ${
                              i + 1
                            }</div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <div class="bit-cell expanded" style="margin: 0 auto;">${expandedBit}</div>
                                <div style="font-size: 0.8rem; color: #64748b;">⊕</div>
                                <div class="bit-cell key" style="margin: 0 auto;">${keyBit}</div>
                                <div style="font-size: 0.8rem; color: #64748b;">=</div>
                                <div class="bit-cell xor-result" style="margin: 0 auto;">${xorResult}</div>
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>
            <div style="text-align: center; color: #9d174d; font-size: 0.9rem;">
                XOR Rule: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0
            </div>
        </div>
    </div>

   <!-- Step 4: S-Box Substitution (48 → 32 bits) -->
<div class="step-container">
    <div class="step-number">4</div>
    <h5 style="color: #334155; margin-bottom: 15px;">Step 4: S-Box Substitution (48 → 32 bits)</h5>
    
    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
        The 48-bit XOR result is divided into 8 blocks of 6 bits. Each 6-bit block enters a different 
        <strong>S-box (Substitution box)</strong> which outputs 4 bits. This is the <strong>non-linear heart of DES</strong>.
        The S-Boxes provide confusion by making the relationship between input and output complex.
    </p>
    
    <!-- How S-Boxes Work - Detailed Explanation -->
    <div style="margin-bottom: 25px;">
        <h6 style="color: #92400e; margin-bottom: 10px;">How S-Boxes Work - Step by Step</h6>
        
        <!-- XOR Result Divided -->
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h6 style="color: #334155; margin-bottom: 15px;">48-bit XOR Result Divided into 8 Blocks</h6>
            <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; margin-bottom: 15px;">
                ${(() => {
                    const xorResult = "100100011111010101101111110001001010010000111001";
                    return Array.from({ length: 8 }, (_, i) => {
                        const block = xorResult.substring(i * 6, (i + 1) * 6);
                        return `
                            <div style="text-align: center;">
                                <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 6px; padding: 10px; margin-bottom: 5px;">
                                    <div style="font-family: 'JetBrains Mono', monospace; font-weight: bold; color: #92400e;">${block}</div>
                                </div>
                                <div style="font-size: 0.8rem; color: #64748b;">S${i + 1} Input</div>
                            </div>
                        `;
                    }).join("");
                })()}
            </div>
            <div style="text-align: center; color: #64748b; font-size: 0.9rem;">
                8 blocks of 6 bits each, ready for S-Box substitution
            </div>
        </div>
        
        <!-- S-Box Selection Process -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="padding: 20px; background: #fef3c7; border-radius: 8px;">
                <h6 style="color: #92400e; margin-bottom: 15px;">Extracting Row & Column Numbers</h6>
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; color: #78350f; margin-bottom: 10px;">
                        1 0 0 1 0 0
                    </div>
                    <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <div style="background: #ef4444; color: white; padding: 10px; border-radius: 6px;">
                                Bits 1 & 6
                            </div>
                            <div style="font-size: 0.9rem; color: #64748b; margin-top: 5px;">Row = 10₂ = 2</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px;">
                                Bits 2-5
                            </div>
                            <div style="font-size: 0.9rem; color: #64748b; margin-top: 5px;">Column = 0010₂ = 2</div>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; color: #78350f; font-weight: bold;">
                        Row (0-3) = First bit + Last bit = 1 + 0 = 10₂ = 2
                        <br>
                        Column (0-15) = Middle 4 bits = 0010₂ = 2
                    </div>
                </div>
            </div>
            
            <div style="padding: 20px; background: #fee2e2; border-radius: 8px;">
                <h6 style="color: #991b1b; margin-bottom: 15px;">S-Box Lookup (S-Box 1 Example)</h6>
                <div style="margin-bottom: 15px;">
                    <div style="text-align: center; font-weight: bold; color: #991b1b; margin-bottom: 10px;">
                        S-Box 1 Table
                    </div>
                    <div style="background: white; border-radius: 6px; padding: 10px; overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
                            <tr style="background: #f8fafc;">
                                <th style="padding: 5px; border: 1px solid #e2e8f0; text-align: center;">Row</th>
                                <th colspan="16" style="padding: 5px; border: 1px solid #e2e8f0; text-align: center;">Columns (0-15)</th>
                            </tr>
                            ${(() => {
                                // S-Box 1 values from DES standard
                                const sbox1 = [
                                    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
                                    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
                                    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
                                    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
                                ];
                                
                                return sbox1.map((row, rowIndex) => `
                                    <tr>
                                        <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold; background: ${rowIndex === 2 ? '#fef3c7' : '#f8fafc'}">${rowIndex}</td>
                                        ${row.map((value, colIndex) => `
                                            <td style="padding: 5px; border: 1px solid #e2e8f0; text-align: center; background: ${rowIndex === 2 && colIndex === 2 ? '#fef3c7' : 'white'}">
                                                ${colIndex === 2 && rowIndex === 2 ? `<strong style="color: #991b1b; font-size: 1rem;">${value}</strong>` : value}
                                            </td>
                                        `).join("")}
                                    </tr>
                                `).join("");
                            })()}
                        </table>
                    </div>
                </div>
                <div style="text-align: center; padding: 10px; background: #fca5a5; border-radius: 6px;">
                    <div style="font-weight: bold; color: #991b1b;">
                        Row 2, Column 2 → Value = 14 → Binary = 1110₂
                    </div>
                </div>
            </div>
        </div>
        
        <!-- All 8 S-Boxes Reference -->
        <div style="margin-top: 20px;">
            <h6 style="color: #334155; margin-bottom: 10px;">All 8 S-Boxes in DES</h6>
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px;">
                <div style="font-size: 0.9rem; color: #64748b; margin-bottom: 10px; text-align: center;">
                    DES uses 8 different S-Boxes (S1 to S8). Each has unique substitution values.
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
                    ${Array.from({ length: 8 }, (_, i) => `
                        <div style="padding: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; text-align: center;">
                            <div style="font-weight: bold; color: #334155; font-size: 0.9rem;">S${i + 1}</div>
                            <div style="font-size: 0.7rem; color: #64748b;">6 bits → 4 bits</div>
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    </div>
    
    <!-- All 8 S-Box Transformations -->
    <div>
        <h6 style="color: #dc2626; margin-bottom: 15px; text-align: center;">All 8 S-Box Transformations</h6>
        
        <div style="margin-bottom: 20px;">
            <!-- XOR Result Bits -->
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-weight: 600; color: #334155; margin-bottom: 5px;">XOR Result (48 bits)</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569; background: #f8fafc; padding: 10px; border-radius: 6px;">
                    100100 011111 010101 101111 110001 001010 010000 111001
                </div>
            </div>
            
            <!-- S-Box Operations Table -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                    <thead style="background: #f8fafc;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">S-Box</th>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">6-bit Input</th>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">Row<br>(Bits 1 & 6)</th>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">Column<br>(Bits 2-5)</th>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">S-Box Value<br>(Decimal)</th>
                            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #334155;">4-bit Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(() => {
                            const xorBlocks = ["100100", "011111", "010101", "101111", "110001", "001010", "010000", "111001"];
                            const sboxOutputs = ["0110", "1100", "1010", "0011", "1110", "0101", "1001", "0111"];
                            const rows = [2, 1, 1, 3, 3, 0, 0, 3]; // Calculated rows
                            const cols = [2, 15, 10, 7, 8, 5, 8, 12]; // Calculated columns
                            const decimalValues = [14, 12, 10, 3, 14, 5, 9, 7]; // Decimal values from S-Boxes
                            
                            return xorBlocks.map((block, i) => `
                                <tr style="${i % 2 === 0 ? 'background: #f8fafc;' : 'background: white;'}">
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold; color: #92400e;">S${i + 1}</td>
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-family: 'JetBrains Mono', monospace;">
                                        <span style="color: #ef4444; font-weight: bold;">${block[0]}</span>
                                        <span>${block.substring(1, 5)}</span>
                                        <span style="color: #ef4444; font-weight: bold;">${block[5]}</span>
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #ef4444; font-weight: bold;">
                                        ${rows[i]} (${block[0]}${block[5]}₂)
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #3b82f6; font-weight: bold;">
                                        ${cols[i]} (${block.substring(1, 5)}₂)
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; color: #991b1b; font-weight: bold;">
                                        ${decimalValues[i]}
                                    </td>
                                    <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-family: 'JetBrains Mono', monospace; color: #991b1b; font-weight: bold;">
                                        ${sboxOutputs[i]}
                                    </td>
                                </tr>
                            `).join("");
                        })()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Combined Output -->
        <div style="text-align: center; margin-top: 20px;">
            <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">Combined S-Box Output (32 bits)</div>
            <div class="process-table" style="grid-template-columns: repeat(8, 1fr);">
                ${(() => {
                    const sboxOutputs = ["0110", "1100", "1010", "0011", "1110", "0101", "1001", "0111"];
                    return sboxOutputs.map((bits, i) => `
                        <div class="bit-cell sbox-output" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="font-size: 1rem; font-weight: bold;">${bits}</div>
                            <div class="bit-label">S${i + 1} (${parseInt(bits, 2)})</div>
                        </div>
                    `).join("");
                })()}
            </div>
            <div style="color: #64748b; font-size: 0.9rem; margin-top: 10px;">
                8 × 4-bit outputs = 32 bits total | Decimal values: 6, 12, 10, 3, 14, 5, 9, 7
            </div>
        </div>
        
        <!-- Important Note about S-Boxes -->
        <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <div style="display: flex; align-items: start; gap: 10px;">
                <i data-feather="alert-triangle" style="color: #f59e0b; margin-top: 3px;"></i>
                <div>
                    <div style="font-weight: 600; color: #92400e; margin-bottom: 5px;">Critical Security Feature</div>
                    <div style="color: #78350f; font-size: 0.9rem;">
                        <strong>S-Boxes are the only non-linear component in DES</strong>. They provide "confusion" by making 
                        the relationship between the ciphertext and the key as complex as possible. Without S-Boxes, 
                        DES would be a linear cipher easily broken. Each S-Box is carefully designed to be resistant 
                        to differential and linear cryptanalysis.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

   <!-- Step 5: P-Box Permutation -->
<div class="step-container">
    <div class="step-number">5</div>
    <h5 style="color: #334155; margin-bottom: 15px;">Step 5: P-Box Permutation (Final Permutation)</h5>
    
    <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
        The 32-bit S-box output undergoes a <strong>P-box (Permutation box) permutation</strong>. This is a fixed permutation 
        that spreads the S-box outputs across different bit positions, enhancing diffusion and ensuring 
        each output bit depends on multiple S-boxes.
    </p>
    
    <!-- P-Box Table and Process -->
    <div style="margin-bottom: 25px;">
        <h6 style="color: #166534; margin-bottom: 15px; text-align: center;">P-Box Permutation Table</h6>
        
        <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h6 style="color: #047857; margin-bottom: 10px;">DES P-Box Permutation Table</h6>
            <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 15px;">
                The P-box rearranges the 32-bit input according to this fixed table. Each number indicates 
                which input bit goes to that output position.
            </p>
            
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 6px; overflow: hidden;">
                    <thead style="background: #dcfce7;">
                        <tr>
                            ${(() => {
                                let headers = '';
                                for (let i = 0; i < 8; i++) {
                                    headers += `<th style="padding: 10px; border: 1px solid #86efac; text-align: center; color: #166534;">Output ${i*4+1}-${i*4+4}</th>`;
                                }
                                return headers;
                            })()}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${(() => {
                                // Actual DES P-Box permutation table
                                const pBoxTable = [
                                    16, 7, 20, 21, 29, 12, 28, 17,
                                    1, 15, 23, 26, 5, 18, 31, 10,
                                    2, 8, 24, 14, 32, 27, 3, 9,
                                    19, 13, 30, 6, 22, 11, 4, 25
                                ];
                                
                                let cells = '';
                                for (let i = 0; i < 8; i++) {
                                    cells += `<td style="padding: 10px; border: 1px solid #86efac; text-align: center;">
                                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;">
                                            ${pBoxTable.slice(i*4, i*4+4).map(bit => 
                                                `<div style="margin: 3px 0; color: #475569;">${bit}</div>`
                                            ).join('')}
                                        </div>
                                    </td>`;
                                }
                                return cells;
                            })()}
                        </tr>
                        <tr style="background: #f0fdf4;">
                            ${(() => {
                                let explanation = '';
                                for (let i = 0; i < 8; i++) {
                                    explanation += `<td style="padding: 8px; border: 1px solid #86efac; text-align: center; font-size: 0.8rem; color: #64748b;">
                                        Output bits ${i*4+1}-${i*4+4} come from input bits shown above
                                    </td>`;
                                }
                                return explanation;
                            })()}
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 15px; color: #166534; font-size: 0.9rem;">
                Example: Output bit 1 = Input bit 16, Output bit 2 = Input bit 7, etc.
            </div>
        </div>
        
        <!-- Permutation Process Visualization -->
        <div style="margin-bottom: 25px;">
            <h6 style="color: #0f766e; margin-bottom: 15px; text-align: center;">Permutation Process</h6>
            
            <!-- S-Box Output -->
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-weight: 600; color: #991b1b; margin-bottom: 10px;">S-Box Output (32 bits)</div>
                <div class="process-table" style="grid-template-columns: repeat(8, 1fr); margin-bottom: 15px;">
                    ${(() => {
                        const sboxOutputs = ["0110", "1100", "1010", "0011", "1110", "0101", "1001", "0111"];
                        const sboxBits = sboxOutputs.join('');
                        
                        return Array.from({ length: 32 }, (_, i) => {
                            const bitValue = sboxBits[i];
                            const sboxNum = Math.floor(i / 4) + 1;
                            const bitInSbox = i % 4 + 1;
                            return `
                                <div class="bit-cell sbox-output" 
                                     style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
                                     title="Input bit ${i+1}: From S${sboxNum}, bit ${bitInSbox}">
                                    <div style="font-size: 1rem; font-weight: bold;">${bitValue}</div>
                                    <div class="bit-label">${i+1}</div>
                                </div>
                            `;
                        }).join("");
                    })()}
                </div>
                <div style="font-size: 0.8rem; color: #64748b;">
                    Input bits numbered 1-32 (from S-box outputs)
                </div>
            </div>
            
            <!-- Permutation Arrow -->
            <div class="permutation-arrow">
                <div class="permutation-line"></div>
                <div style="color: #16a34a; background: white; padding: 10px 20px; border-radius: 8px; border: 2px solid #16a34a;">
                    <i data-feather="shuffle" style="margin-right: 8px;"></i> P-Box Permutation
                </div>
                <div class="permutation-line"></div>
            </div>
            
            <!-- P-Box Output -->
            <div style="text-align: center; margin-top: 20px;">
                <div style="font-weight: 600; color: #166534; margin-bottom: 10px;">P-Box Output (32 bits)</div>
                <div class="process-table" style="grid-template-columns: repeat(8, 1fr); margin-bottom: 15px;">
                    ${(() => {
                        // Actual DES P-Box permutation table
                        const pBoxTable = [
                            16, 7, 20, 21, 29, 12, 28, 17,
                            1, 15, 23, 26, 5, 18, 31, 10,
                            2, 8, 24, 14, 32, 27, 3, 9,
                            19, 13, 30, 6, 22, 11, 4, 25
                        ];
                        
                        const sboxOutputs = ["0110", "1100", "1010", "0011", "1110", "0101", "1001", "0111"];
                        const sboxBits = sboxOutputs.join('');
                        
                        return pBoxTable.map((inputBit, outputPos) => {
                            const bitValue = sboxBits[inputBit - 1];
                            const originalSbox = Math.floor((inputBit - 1) / 4) + 1;
                            return `
                                <div class="bit-cell final" 
                                     style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
                                     title="Output bit ${outputPos+1} = Input bit ${inputBit} (from S${originalSbox})">
                                    <div style="font-size: 1rem; font-weight: bold;">${bitValue}</div>
                                    <div class="bit-label">${outputPos+1}←${inputBit}</div>
                                </div>
                            `;
                        }).join("");
                    })()}
                </div>
                <div style="font-size: 0.8rem; color: #64748b;">
                    Output bits show which input bit they came from (Output←Input)
                </div>
            </div>
        </div>
        
        <!-- Detailed Examples -->
        <div style="margin-top: 25px;">
            <h6 style="color: #0f766e; margin-bottom: 15px; text-align: center;">Detailed Transformation Examples</h6>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
                    <h6 style="color: #047857; margin-bottom: 10px;">Example 1: Output bit 1</h6>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <div class="bit-cell sbox-output" style="width: 50px; height: 50px; display: flex; flex-direction: column;">
                                <div style="font-size: 1.2rem; font-weight: bold;">0</div>
                                <div style="font-size: 0.7rem; color: #64748b;">Input bit 16</div>
                            </div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">From S4, bit 4</div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #16a34a;">→</div>
                        
                        <div style="text-align: center;">
                            <div class="bit-cell final" style="width: 50px; height: 50px; display: flex; flex-direction: column;">
                                <div style="font-size: 1.2rem; font-weight: bold;">0</div>
                                <div style="font-size: 0.7rem; color: #64748b;">Output bit 1</div>
                            </div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">P[1] = 16</div>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; color: #166534; text-align: center;">
                        Output bit 1 = Input bit 16 (which was bit 4 from S-box 4)
                    </div>
                </div>
                
                <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
                    <h6 style="color: #047857; margin-bottom: 10px;">Example 2: Output bit 2</h6>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
                        <div style="text-align: center;">
                            <div class="bit-cell sbox-output" style="width: 50px; height: 50px; display: flex; flex-direction: column;">
                                <div style="font-size: 1.2rem; font-weight: bold;">1</div>
                                <div style="font-size: 0.7rem; color: #64748b;">Input bit 7</div>
                            </div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">From S2, bit 3</div>
                        </div>
                        
                        <div style="font-size: 1.5rem; color: #16a34a;">→</div>
                        
                        <div style="text-align: center;">
                            <div class="bit-cell final" style="width: 50px; height: 50px; display: flex; flex-direction: column;">
                                <div style="font-size: 1.2rem; font-weight: bold;">1</div>
                                <div style="font-size: 0.7rem; color: #64748b;">Output bit 2</div>
                            </div>
                            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">P[2] = 7</div>
                        </div>
                    </div>
                    <div style="font-size: 0.9rem; color: #166534; text-align: center;">
                        Output bit 2 = Input bit 7 (which was bit 3 from S-box 2)
                    </div>
                </div>
            </div>
            
            <div style="padding: 15px; background: #dcfce7; border-radius: 8px; border: 1px solid #86efac;">
                <h6 style="color: #166534; margin-bottom: 10px;">Mapping Pattern</h6>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
                    ${(() => {
                        const patterns = [
                            "S1 bits go to positions: 9, 17, 23, 31",
                            "S2 bits go to positions: 13, 28, 2, 18",
                            "S3 bits go to positions: 24, 16, 30, 6",
                            "S4 bits go to positions: 26, 20, 10, 1",
                            "S5 bits go to positions: 8, 14, 25, 3",
                            "S6 bits go to positions: 21, 29, 11, 19",
                            "S7 bits go to positions: 12, 4, 27, 15",
                            "S8 bits go to positions: 32, 5, 22, 7"
                        ];
                        
                        return patterns.map(pattern => `
                            <div style="padding: 8px; background: white; border-radius: 4px; font-size: 0.8rem; color: #475569;">
                                ${pattern}
                            </div>
                        `).join("");
                    })()}
                </div>
                <div style="text-align: center; font-size: 0.9rem; color: #166534;">
                    The P-box ensures each S-box output is spread across the 32-bit block
                </div>
            </div>
        </div>
        
        <!-- Complete P-Box Output -->
        <div style="margin-top: 20px;">
            <h6 style="color: #166534; margin-bottom: 15px; text-align: center;">Final P-Box Output</h6>
            
            <div style="background: linear-gradient(135deg, #dcfce7, #bbf7d0); border-radius: 8px; padding: 20px;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-weight: bold; color: #166534; font-size: 1.1rem; margin-bottom: 5px;">
                        Function F(Rᵢ₋₁, Kᵢ) Complete Output
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem;">
                        After P-box permutation, we have the final 32-bit output of the round function
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                    <div class="bit-box final" style="font-size: 1rem; padding: 15px 25px; text-align: center;">
                        1010 0111 1100 0110 0011 1001 0101 1110
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
                    <div style="text-align: center;">
                        <div style="color: #166534; font-weight: 600; margin-bottom: 5px;">In Hex</div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569; background: white; padding: 8px; border-radius: 6px;">
                            A 7 C 6 3 9 5 E
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <div style="color: #166534; font-weight: 600; margin-bottom: 5px;">In Decimal</div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569; background: white; padding: 8px; border-radius: 6px;">
                            2,796,514,142
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Purpose of P-Box -->
    <div style="padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-top: 20px;">
        <div style="display: flex; align-items: start; gap: 10px;">
            <i data-feather="zap" style="color: #0ea5e9; margin-top: 3px;"></i>
            <div>
                <div style="font-weight: 600; color: #0369a1; margin-bottom: 5px;">Purpose of P-Box Permutation</div>
                <div style="color: #475569; font-size: 0.9rem; line-height: 1.6;">
                    The P-box serves several critical purposes:
                    <br><br>
                    1. <strong>Diffusion Enhancement:</strong> Spreads the influence of each S-box output across multiple 
                    output bit positions, ensuring that changing one S-box output bit affects several P-box output bits.
                    <br><br>
                    2. <strong>Bit Distribution:</strong> Ensures that output bits depend on multiple S-boxes, 
                    making the relationship between input and output more complex.
                    <br><br>
                    3. <strong>Security:</strong> The specific permutation was carefully chosen to provide optimal 
                    diffusion properties and resistance to cryptanalysis.
                    <br><br>
                    4. <strong>Round Interaction:</strong> Prepares the output for the next round by distributing 
                    bits in a way that maximizes their influence in subsequent rounds.
                </div>
            </div>
        </div>
    </div>
    
    <!-- Summary -->
    <div style="margin-top: 25px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 20px; height: 20px; background: #991b1b; border-radius: 4px;"></div>
                    <div style="font-size: 0.9rem; color: #334155;">S-Box Output (Input)</div>
                </div>
                <div style="font-size: 0.8rem; color: #64748b; padding-left: 30px;">
                    32 bits from 8 S-boxes (4 bits each)
                </div>
            </div>
            
            <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 20px; height: 20px; background: #166534; border-radius: 4px;"></div>
                    <div style="font-size: 0.9rem; color: #334155;">P-Box Output (Final)</div>
                </div>
                <div style="font-size: 0.8rem; color: #64748b; padding-left: 30px;">
                    Same bits rearranged according to fixed table
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569;">
                P[i] = position of input bit that goes to output position i
            </div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">
                The P-box completes the round function F(R, K)
            </div>
        </div>
    </div>
</div>
    <!-- Step 6: Final XOR with Left Half -->
    <div class="step-container">
        <div class="step-number">6</div>
        <h5 style="color: #334155; margin-bottom: 15px;">Step 6: XOR with Left Half & Complete Round</h5>
        
        <p style="color: #64748b; line-height: 1.6; margin-bottom: 20px;">
            The 32-bit output from the P-box is XORed with the original left half (Lᵢ₋₁) to produce 
            the new right half (Rᵢ). The old right half becomes the new left half (Lᵢ).
        </p>
        
        <!-- Complete Round Formula -->
        <div style="margin-bottom: 25px;">
            <h6 style="color: #334155; margin-bottom: 15px; text-align: center;">Complete Round Calculation</h6>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div style="padding: 20px; background: #f0f9ff; border-radius: 8px;">
                    <h6 style="color: #0369a1; margin-bottom: 10px;">Left Half (Lᵢ₋₁)</h6>
                    <div class="example-input">
                        1011 0010 1100 0111 1001 0101 0011 1100
                    </div>
                    <div style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: 10px;">
                        From previous round (32 bits)
                    </div>
                </div>
                
                <div style="padding: 20px; background: #f0fdf4; border-radius: 8px;">
                    <h6 style="color: #047857; margin-bottom: 10px;">F(Rᵢ₋₁, Kᵢ) Output</h6>
                    <div class="example-input">
                        1010 0111 1100 0110 0011 1001 0101 1110
                    </div>
                    <div style="text-align: center; color: #64748b; font-size: 0.9rem; margin-top: 10px;">
                        From P-box (32 bits)
                    </div>
                </div>
            </div>
            
            <!-- XOR Operation -->
            <div style="text-align: center;">
                <div class="operation-box">
                    <div style="color: #475569; margin-bottom: 10px;">Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ) = Rᵢ</div>
                    <div style="font-size: 1.1rem; color: #334155; font-weight: bold;">
                        10110010110001111001010100111100
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">Lᵢ₋₁</div>
                </div>
                
                <div style="margin: 15px 0;">
                    <div style="font-size: 1.5rem; color: #64748b;">⊕</div>
                </div>
                
                <div class="operation-box">
                    <div style="color: #475569;"></div>
                    <div style="font-size: 1.1rem; color: #334155; font-weight: bold;">
                        10100111110001100011100101011110
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">F(Rᵢ₋₁, Kᵢ)</div>
                </div>
                
                <div style="margin: 15px 0;">
                    <div style="font-size: 1.5rem; color: #64748b;">=</div>
                </div>
                
                <div class="operation-box" style="background: linear-gradient(135deg, #dcfce7, #bbf7d0);">
                    <div style="color: #166534; font-weight: 600; margin-bottom: 10px;">New Right Half (Rᵢ)</div>
                    <div style="font-size: 1.2rem; color: #166534; font-weight: bold;">
                        00010101000000011010110001100010
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">32 bits = Rᵢ</div>
                </div>
            </div>
        </div>
        
        <!-- Final Round Result -->
        <div style="padding: 25px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 8px; border: 2px solid #0ea5e9;">
            <h6 style="color: #0369a1; margin-bottom: 15px; text-align: center;">Round Complete! Here's the Result:</h6>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 40px; margin-bottom: 20px;">
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">New Left Half (Lᵢ)</div>
                    <div class="bit-box data-bit" style="font-size: 1.1rem; padding: 15px;">
                        1100 1101 0110 0011 1010 1100 0110 1001
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">
                        Lᵢ = Old Rᵢ₋₁
                    </div>
                </div>
                
                <div style="font-size: 2rem; color: #64748b;">|</div>
                
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">New Right Half (Rᵢ)</div>
                    <div class="bit-box final" style="font-size: 1.1rem; padding: 15px;">
                        0001 0101 0000 0001 1010 1100 0110 0010
                    </div>
                    <div style="color: #64748b; font-size: 0.9rem; margin-top: 5px;">
                        Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; color: #0369a1; font-size: 0.9rem; line-height: 1.6;">
                <strong>Key Insight:</strong> After one round, the data has been transformed using the round key. 
                This process repeats 15 more times with different keys to produce the final ciphertext.
            </div>
        </div>
    </div>

    <!-- Summary -->
    <div style="margin-top: 30px; padding: 25px; background: #f8fafc; border-radius: 12px; border: 2px solid #e2e8f0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Summary of Round Function F(R,K)</h5>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <div style="background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        1
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">Expansion (E)</div>
                        <div style="color: #64748b; font-size: 0.9rem;">32 → 48 bits (duplicates bits)</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <div style="background: #8b5cf6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        2
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">XOR with Key</div>
                        <div style="color: #64748b; font-size: 0.9rem;">48-bit mixing with subkey</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        3
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">S-Box Substitution</div>
                        <div style="color: #64748b; font-size: 0.9rem;">48 → 32 bits (non-linear)</div>
                    </div>
                </div>
            </div>
            
            <div>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <div style="background: #10b981; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        4
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">P-Box Permutation</div>
                        <div style="color: #64748b; font-size: 0.9rem;">32-bit diffusion</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <div style="background: #f59e0b; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        5
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">XOR with Lᵢ₋₁</div>
                        <div style="color: #64748b; font-size: 0.9rem;">Produces new Rᵢ</div>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="background: #6366f1; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        6
                    </div>
                    <div>
                        <div style="font-weight: 600; color: #334155;">Swap Halves</div>
                        <div style="color: #64748b; font-size: 0.9rem;">Lᵢ = Rᵢ₋₁ (prepares for next round)</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <div style="display: inline-block; padding: 15px 25px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border-radius: 8px; font-weight: bold;">
                This entire process repeats 16 times with 16 different keys!
            </div>
        </div>
    </div>
    
</div>
<!-- Section 7: DES Key Generation Process - Compression P-Box -->
<div class="section">
    <div class="section-title">
        <i data-feather="key"></i> DES Key Generation Process
    </div>
    
    <div class="info-box">
        <h4>From 64-bit Key to 16 Subkeys</h4>
        <p>
            DES generates 16 unique 48-bit subkeys from a single 64-bit master key. This process involves 
            dropping parity bits, splitting the key, circular shifts, and finally the Compression P-Box 
            (Permuted Choice 2) to produce each round's subkey.
        </p>
    </div>

    <!-- Complete Key Generation Flow -->
    <div style="margin: 30px 0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Complete Key Generation Flow</h5>
        
        <!-- Diagram based on the image -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 30px; position: relative;">
            
            <!-- Step 1: 64-bit Key with Parity -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-block; padding: 15px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 8px; position: relative;">
                    <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 5px;">64-bit Key with Parity Bits</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">8 parity bits (bits 8, 16, 24, 32, 40, 48, 56, 64)</div>
                </div>
                <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 10px;">
                    <i data-feather="arrow-down" style="color: #64748b;"></i>
                </div>
            </div>
            
            <!-- Step 2: Parity Drop (PC-1) -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-flex; align-items: center; gap: 15px; background: #f8fafc; padding: 15px 25px; border-radius: 8px; border: 2px solid #cbd5e1;">
                    <div style="background: #8b5cf6; color: white; padding: 10px; border-radius: 6px;">
                        <i data-feather="filter"></i>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #334155;">Parity Drop (PC-1)</div>
                        <div style="color: #64748b; font-size: 0.9rem;">64 bits → 56 bits (remove 8 parity bits)</div>
                    </div>
                </div>
                <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 10px;">
                    <i data-feather="arrow-down" style="color: #64748b;"></i>
                </div>
            </div>
            
            <!-- Step 3: Split into 28-bit Halves -->
            <div style="display: flex; justify-content: center; gap: 100px; margin-bottom: 40px; position: relative;">
                <!-- Left Half (C₀) -->
                <div style="text-align: center; position: relative;">
                    <div class="bit-box key-bit" style="width: 150px; padding: 20px;">
                        <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">C₀ (28 bits)</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Left Half</div>
                    </div>
                    <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 10px;">
                        <i data-feather="arrow-down" style="color: #64748b;"></i>
                    </div>
                </div>
                
                <!-- Right Half (D₀) -->
                <div style="text-align: center; position: relative;">
                    <div class="bit-box key-bit" style="width: 150px; padding: 20px;">
                        <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 5px;">D₀ (28 bits)</div>
                        <div style="font-size: 0.8rem; color: #64748b;">Right Half</div>
                    </div>
                    <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 10px;">
                        <i data-feather="arrow-down" style="color: #64748b;"></i>
                    </div>
                </div>
            </div>
            
            <!-- 16 Rounds of Key Generation -->
            <div style="margin-bottom: 40px;">
                <h6 style="color: #334155; margin-bottom: 20px; text-align: center;">16 Rounds of Key Generation</h6>
                
                <!-- Round 1 -->
                <div style="display: flex; justify-content: center; gap: 80px; margin-bottom: 30px; position: relative;">
                    <!-- Left Shift C₀ -->
                    <div style="text-align: center;">
                        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                            <div style="font-weight: bold; color: #92400e;">Shift Left</div>
                            <div style="font-size: 0.8rem; color: #78350f;">Round 1: 1-bit shift</div>
                        </div>
                        <div class="bit-box key-bit" style="width: 120px; padding: 15px;">
                            C₁ (28 bits)
                        </div>
                    </div>
                    
                    <!-- Left Shift D₀ -->
                    <div style="text-align: center;">
                        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                            <div style="font-weight: bold; color: #92400e;">Shift Left</div>
                            <div style="font-size: 0.8rem; color: #78350f;">Round 1: 1-bit shift</div>
                        </div>
                        <div class="bit-box key-bit" style="width: 120px; padding: 15px;">
                            D₁ (28 bits)
                        </div>
                    </div>
                </div>
                
                <!-- Compression P-Box (PC-2) -->
                <div style="text-align: center; margin: 40px 0;">
                    <div style="display: inline-block; position: relative;">
                        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px 40px; border-radius: 8px; font-weight: bold; font-size: 1.1rem;">
                            Compression P-Box (PC-2)
                        </div>
                        <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #8b5cf6; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem;">
                            56 bits → 48 bits
                        </div>
                    </div>
                    <div style="position: absolute; left: 50%; transform: translateX(-50%); margin-top: 10px;">
                        <i data-feather="arrow-down" style="color: #64748b;"></i>
                    </div>
                </div>
                
                <!-- Round Key Output -->
                <div style="text-align: center;">
                    <div class="bit-box round-bit" style="display: inline-block; padding: 20px 40px;">
                        <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 5px;">Round Key 1 (48 bits)</div>
                        <div style="font-size: 0.9rem; color: #64748b;">Used in Round 1 of encryption</div>
                    </div>
                </div>
                
                <!-- Subsequent Rounds Note -->
                <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f8fafc; border-radius: 8px;">
                    <div style="color: #64748b; font-size: 0.9rem;">
                        <strong>Note:</strong> This process repeats 15 more times (Rounds 2-16) with different shift amounts 
                        (1-bit for rounds 1, 2, 9, 16; 2-bit for other rounds)
                    </div>
                </div>
            </div>
            
            <!-- All 16 Round Keys -->
            <div style="margin-top: 40px; padding: 25px; background: #f0f9ff; border-radius: 8px;">
                <h6 style="color: #0369a1; margin-bottom: 15px; text-align: center;">All 16 Round Keys Generated</h6>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 15px;">
                    ${Array.from({ length: 16 }, (_, i) => `
                        <div class="bit-box key-bit" style="padding: 10px 15px;">
                            <div style="font-weight: bold; color: #065f46;">K${i+1}</div>
                            <div style="font-size: 0.7rem; color: #64748b;">48 bits</div>
                        </div>
                    `).join("")}
                </div>
                <div style="text-align: center; color: #64748b; font-size: 0.9rem;">
                    Each key is unique and used in the corresponding encryption round
                </div>
            </div>
        </div>
    </div>
    
    <!-- Detailed Compression P-Box Explanation -->
    <div style="margin: 40px 0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Compression P-Box (Permuted Choice 2) Details</h5>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <!-- Left: Input (56 bits) -->
            <div style="padding: 25px; background: #f0fdf4; border-radius: 8px; border: 2px solid #10b981;">
                <h6 style="color: #047857; margin-bottom: 15px; text-align: center;">Input to PC-2 (56 bits)</h6>
                
                <!-- 56-bit Visualization -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">28 bits (Cᵢ) + 28 bits (Dᵢ) = 56 bits</div>
                    <div class="process-table" style="grid-template-columns: repeat(8, 1fr); margin-bottom: 15px;">
                        ${Array.from({ length: 56 }, (_, i) => {
                          const isFirstHalf = i < 28;
                          const position = i + 1;
                          return `
                                <div class="bit-cell key" 
                                     style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
                                     title="${isFirstHalf ? 'C' : 'D'}${isFirstHalf ? position : position-28}, Bit ${position}">
                                    <div style="font-size: 0.8rem; font-weight: bold;">${i % 2}</div>
                                    <div class="bit-label">${position}</div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">
                        Bits 1-28: Cᵢ (Left Half) | Bits 29-56: Dᵢ (Right Half)
                    </div>
                </div>
                
                <!-- Bit Selection Explanation -->
                <div style="padding: 15px; background: white; border-radius: 6px; border: 1px solid #86efac;">
                    <div style="font-weight: 600; color: #166534; margin-bottom: 10px;">What PC-2 Does:</div>
                    <ul style="color: #475569; font-size: 0.9rem; padding-left: 20px; margin: 0;">
                        <li>Selects 48 bits from the 56-bit input</li>
                        <li>Discards 8 bits (bits 9, 18, 22, 25, 35, 38, 43, 54 from the 56-bit sequence)</li>
                        <li>Rearranges the selected bits in a specific order</li>
                        <li>Outputs 48-bit round key</li>
                    </ul>
                </div>
            </div>
            
            <!-- Right: Output (48 bits) -->
            <div style="padding: 25px; background: #f0f9ff; border-radius: 8px; border: 2px solid #0ea5e9;">
                <h6 style="color: #0369a1; margin-bottom: 15px; text-align: center;">Output from PC-2 (48 bits)</h6>
                
                <!-- 48-bit Visualization -->
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: 600; color: #334155; margin-bottom: 10px;">48-bit Round Key (Kᵢ)</div>
                    <div class="process-table" style="grid-template-columns: repeat(8, 1fr); margin-bottom: 15px;">
                        ${Array.from({ length: 48 }, (_, i) => {
                          const position = i + 1;
                          // Example mapping (simplified)
                          const sourceBit = (position * 7) % 56 + 1;
                          return `
                                <div class="bit-cell round-bit" 
                                     style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
                                     title="Output bit ${position} from input bit ${sourceBit}">
                                    <div style="font-size: 0.8rem; font-weight: bold;">${position % 2}</div>
                                    <div class="bit-label">${position}←${sourceBit}</div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">
                        Each output bit shows which input bit it came from
                    </div>
                </div>
                
                <!-- PC-2 Table Example -->
                <div style="padding: 15px; background: white; border-radius: 6px; border: 1px solid #93c5fd;">
                    <div style="font-weight: 600; color: #1e40af; margin-bottom: 10px;">PC-2 Permutation Table (First 8 positions):</div>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const outputPos = i + 1;
                          const inputBits = [14, 17, 11, 24, 1, 5, 3, 28]; // Example values
                          return `
                                <div style="text-align: center; padding: 8px; background: #f1f5f9; border-radius: 4px;">
                                    <div style="font-size: 0.8rem; color: #475569;">Out ${outputPos}</div>
                                    <div style="font-family: 'JetBrains Mono'; font-size: 0.9rem; color: #1e40af; font-weight: bold;">← ${inputBits[i]}</div>
                                </div>
                            `;
                        }).join("")}
                    </div>
                    <div style="text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 10px;">
                        Output position 1 = Input bit 14, Output position 2 = Input bit 17, etc.
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Discarded Bits Information -->
        <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border: 2px solid #f59e0b;">
            <h6 style="color: #92400e; margin-bottom: 15px; text-align: center;">Discarded Bits in PC-2</h6>
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="display: inline-flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
                    ${[9, 18, 22, 25, 35, 38, 43, 54].map(bit => `
                        <div style="background: #f59e0b; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;">
                            Bit ${bit}
                        </div>
                    `).join("")}
                </div>
                <div style="color: #78350f; font-size: 0.9rem; margin-top: 10px;">
                    8 bits are discarded in each round's PC-2 permutation
                </div>
            </div>
            <div style="color: #92400e; font-size: 0.9rem; line-height: 1.6;">
                <strong>Why discard bits?</strong> This creates a non-linear relationship between consecutive 
                round keys and ensures that each round key is unique, even though they all come from the same 
                master key. The discarded bits vary in each round due to the circular shifts.
            </div>
        </div>
    </div>
    
    <!-- Shift Schedule -->
    <div style="margin: 40px 0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Circular Shift Schedule</h5>
        
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                <thead style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">
                    <tr>
                        <th style="padding: 15px; text-align: center;">Round</th>
                        <th style="padding: 15px; text-align: center;">Shift Amount</th>
                        <th style="padding: 15px; text-align: center;">Cᵢ (Left Half)</th>
                        <th style="padding: 15px; text-align: center;">Dᵢ (Right Half)</th>
                        <th style="padding: 15px; text-align: center;">Total Shift</th>
                        <th style="padding: 15px; text-align: center;">Key Generated</th>
                    </tr>
                </thead>
                <tbody>
                    ${Array.from({ length: 16 }, (_, i) => {
                      const round = i + 1;
                      const shiftAmount = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1][i];
                      const totalShift = i === 0 ? shiftAmount : 
                                       [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28][i];
                      return `
                            <tr style="${i % 2 === 0 ? 'background: #f8fafc;' : 'background: white;'}">
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold; color: ${round <= 2 || round === 9 || round === 16 ? '#dc2626' : '#334155'}">
                                    ${round}
                                </td>
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">
                                    <div style="background: ${shiftAmount === 1 ? '#fef3c7' : '#fee2e2'}; 
                                         color: ${shiftAmount === 1 ? '#92400e' : '#dc2626'};
                                         padding: 6px 12px; border-radius: 4px; font-weight: bold;">
                                        ${shiftAmount} bit${shiftAmount > 1 ? 's' : ''}
                                    </div>
                                </td>
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-family: 'JetBrains Mono';">
                                    C${round}
                                </td>
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-family: 'JetBrains Mono';">
                                    D${round}
                                </td>
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold; color: #475569;">
                                    ${totalShift} bits
                                </td>
                                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">
                                    <div style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold;">
                                        K${round}
                                    </div>
                                </td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>
        
        <div style="text-align: center; margin-top: 15px; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <div style="color: #64748b; font-size: 0.9rem;">
                <strong>Key Insight:</strong> Rounds 1, 2, 9, and 16 use 1-bit shifts (colored orange), 
                while other rounds use 2-bit shifts (colored red). This irregular schedule ensures 
                maximum key variation across rounds.
            </div>
        </div>
    </div>
    
    <!-- Visual Example of Circular Shift -->
    <div style="margin: 40px 0;">
        <h5 style="color: #334155; margin-bottom: 20px; text-align: center;">Circular Shift Example</h5>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <!-- 1-bit Shift Example -->
            <div style="padding: 25px; background: #fef3c7; border-radius: 8px; border: 2px solid #f59e0b;">
                <h6 style="color: #92400e; margin-bottom: 15px; text-align: center;">1-bit Left Circular Shift (Rounds 1, 2, 9, 16)</h6>
                
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: 600; color: #78350f; margin-bottom: 10px;">Before Shift (C₀ or D₀):</div>
                    <div style="display: flex; justify-content: center; gap: 5px; margin-bottom: 15px; flex-wrap: wrap;">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const bits = ['0', '1', '1', '0', '1', '0', '0', '1'];
                          return `
                                <div style="width: 40px; height: 40px; background: #fbbf24; border: 2px solid #d97706; border-radius: 6px; 
                                     display: flex; align-items: center; justify-content: center; font-weight: bold; color: #78350f;">
                                    ${bits[i]}
                                </div>
                            `;
                        }).join("")}
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <div style="font-size: 1.5rem; color: #92400e;">
                            <i data-feather="rotate-cw"></i> 1-bit shift
                        </div>
                    </div>
                    
                    <div style="font-weight: 600; color: #78350f; margin-bottom: 10px;">After Shift (C₁ or D₁):</div>
                    <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap;">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const bits = ['1', '1', '0', '1', '0', '0', '1', '0'];
                          const isFirstBit = i === 0;
                          return `
                                <div style="width: 40px; height: 40px; background: ${isFirstBit ? '#f59e0b' : '#fbbf24'}; 
                                     border: 2px solid ${isFirstBit ? '#b45309' : '#d97706'}; border-radius: 6px; 
                                     display: flex; align-items: center; justify-content: center; font-weight: bold; 
                                     color: ${isFirstBit ? 'white' : '#78350f'};">
                                    ${bits[i]}
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                
                <div style="text-align: center; color: #92400e; font-size: 0.9rem;">
                    First bit (0) moves to the end, all other bits shift left by one position
                </div>
            </div>
            
            <!-- 2-bit Shift Example -->
            <div style="padding: 25px; background: #fee2e2; border-radius: 8px; border: 2px solid #ef4444;">
                <h6 style="color: #991b1b; margin-bottom: 15px; text-align: center;">2-bit Left Circular Shift (Other Rounds)</h6>
                
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-weight: 600; color: #991b1b; margin-bottom: 10px;">Before Shift (Cᵢ or Dᵢ):</div>
                    <div style="display: flex; justify-content: center; gap: 5px; margin-bottom: 15px; flex-wrap: wrap;">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const bits = ['1', '0', '0', '1', '1', '0', '1', '1'];
                          return `
                                <div style="width: 40px; height: 40px; background: #fca5a5; border: 2px solid #dc2626; border-radius: 6px; 
                                     display: flex; align-items: center; justify-content: center; font-weight: bold; color: #991b1b;">
                                    ${bits[i]}
                                </div>
                            `;
                        }).join("")}
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <div style="font-size: 1.5rem; color: #dc2626;">
                            <i data-feather="rotate-ccw"></i> 2-bit shift
                        </div>
                    </div>
                    
                    <div style="font-weight: 600; color: #991b1b; margin-bottom: 10px;">After Shift (Cᵢ₊₁ or Dᵢ₊₁):</div>
                    <div style="display: flex; justify-content: center; gap: 5px; flex-wrap: wrap;">
                        ${Array.from({ length: 8 }, (_, i) => {
                          const bits = ['0', '1', '1', '0', '1', '1', '1', '0'];
                          const isFirstTwo = i < 2;
                          return `
                                <div style="width: 40px; height: 40px; background: ${isFirstTwo ? '#ef4444' : '#fca5a5'}; 
                                     border: 2px solid ${isFirstTwo ? '#991b1b' : '#dc2626'}; border-radius: 6px; 
                                     display: flex; align-items: center; justify-content: center; font-weight: bold; 
                                     color: ${isFirstTwo ? 'white' : '#991b1b'};">
                                    ${bits[i]}
                                </div>
                            `;
                        }).join("")}
                    </div>
                </div>
                
                <div style="text-align: center; color: #991b1b; font-size: 0.9rem;">
                    First two bits (1,0) move to the end, all bits shift left by two positions
                </div>
            </div>
        </div>
    </div>
    
    <!-- Why This Design Works -->
    <div style="margin-top: 40px; padding: 25px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 8px; color: white;">
        <h5 style="margin-bottom: 20px; text-align: center;">Why This Key Generation Design Works</h5>
        
        <div class="key-features">
            <div class="feature-box" style="background: rgba(255, 255, 255, 0.1);">
                <div class="feature-icon"><i data-feather="key" style="color: white;"></i></div>
                <div class="feature-title" style="color: white;">Unique Subkeys</div>
                <p class="feature-desc" style="color: rgba(255, 255, 255, 0.9);">
                    Circular shifts ensure each round gets a different 48-bit subset of the master key.
                </p>
            </div>
            
            <div class="feature-box" style="background: rgba(255, 255, 255, 0.1);">
                <div class="feature-icon"><i data-feather="shield" style="color: white;"></i></div>
                <div class="feature-title" style="color: white;">Non-Linear Relationship</div>
                <p class="feature-desc" style="color: rgba(255, 255, 255, 0.9);">
                    Discarding different bits in each PC-2 creates complex relationships between keys.
                </p>
            </div>
            
            <div class="feature-box" style="background: rgba(255, 255, 255, 0.1);">
                <div class="feature-icon"><i data-feather="refresh-cw" style="color: white;"></i></div>
                <div class="feature-title" style="color: white;">Efficient Computation</div>
                <p class="feature-desc" style="color: rgba(255, 255, 255, 0.9);">
                    Simple shifts and permutations are fast to compute in hardware and software.
                </p>
            </div>
            
            <div class="feature-box" style="background: rgba(255, 255, 255, 0.1);">
                <div class="feature-icon"><i data-feather="zap" style="color: white;"></i></div>
                <div class="feature-title" style="color: white;">Reversible for Decryption</div>
                <p class="feature-desc" style="color: rgba(255, 255, 255, 0.9);">
                    Using keys in reverse order (K₁₆ to K₁) with right shifts enables decryption.
                </p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="font-weight: bold; font-size: 1.1rem;">Security Through Key Variation</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 10px;">
                Each of the 16 rounds uses a different 48-bit key, ensuring that breaking one round 
                doesn't compromise the entire encryption.
            </div>
        </div>
    </div>
</div>
    `;
  // Add these functions to your des.js file:

  // Initialize icons
  feather.replace();
}
// Add these functions to your des.js file:

// Function to show different round phases
function showRound(phase) {
  const roundDiv = document.getElementById("round-visualization");

  // Update button states
  document.querySelectorAll(".round-btn").forEach((btn) => {
    btn.classList.remove("active");
    btn.style.background = "#64748b";
  });
  event.target.classList.add("active");
  event.target.style.background = "#3b82f6";

  switch (phase) {
    case "first":
      showFirstRounds();
      break;
    case "middle":
      showMiddleRounds();
      break;
    case "last":
      showLastRounds();
      break;
    case "all":
      showCompleteFlow();
      break;
  }

  feather.replace();
}

function showFirstRounds() {
  const roundDiv = document.getElementById("round-visualization");
  roundDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #3b82f6; margin-bottom: 10px;">First 4 Rounds (1-4) - Initial Transformation</h6>
            <p style="color: #64748b; font-size: 0.9rem;">
                The initial rounds establish the cryptographic foundation by mixing the plaintext with the first four keys.
            </p>
        </div>
        
        <!-- Round 1 -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="text-align: center; flex: 1;">
                    <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px; margin-bottom: 5px;">
                        L₀ = R₀
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">L₁ becomes previous R₀</div>
                </div>
                
                <div style="text-align: center; flex: 1;">
                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 10px;">→</div>
                </div>
                
                <div style="text-align: center; flex: 1; position: relative;">
                    <div style="background: #f59e0b; color: white; padding: 15px; border-radius: 6px; margin-bottom: 5px;">
                        F(R₀, K₁)
                    </div>
                    <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem;">
                        Round 1 Function
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">Apply function with K₁</div>
                </div>
                
                <div style="text-align: center; flex: 1;">
                    <div style="font-size: 1.2rem; color: #64748b; margin: 0 10px;">⊕</div>
                </div>
                
                <div style="text-align: center; flex: 1;">
                    <div style="background: #10b981; color: white; padding: 10px; border-radius: 6px; margin-bottom: 5px;">
                        R₁ = L₀ ⊕ F(R₀, K₁)
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b;">R₁ computed via XOR</div>
                </div>
            </div>
        </div>
        
        <!-- Rounds 2-4 Summary -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
            <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; text-align: center;">
                <div style="font-weight: bold; color: #0369a1; margin-bottom: 5px;">Round 2</div>
                <div style="font-size: 0.8rem; color: #64748b;">
                    L₂ = R₁<br>
                    R₂ = L₁ ⊕ F(R₁, K₂)
                </div>
            </div>
            <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; text-align: center;">
                <div style="font-weight: bold; color: #0369a1; margin-bottom: 5px;">Round 3</div>
                <div style="font-size: 0.8rem; color: #64748b;">
                    L₃ = R₂<br>
                    R₃ = L₂ ⊕ F(R₂, K₃)
                </div>
            </div>
            <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; text-align: center;">
                <div style="font-weight: bold; color: #0369a1; margin-bottom: 5px;">Round 4</div>
                <div style="font-size: 0.8rem; color: #64748b;">
                    L₄ = R₃<br>
                    R₄ = L₃ ⊕ F(R₃, K₄)
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <div style="font-size: 0.9rem; color: #64748b;">
                <strong>Key Insight:</strong> After 4 rounds, each bit of the output depends on every bit of the input 
                and the first four keys, providing initial confusion and diffusion.
            </div>
        </div>
    `;
}

function showMiddleRounds() {
  const roundDiv = document.getElementById("round-visualization");
  roundDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #f59e0b; margin-bottom: 10px;">Middle 8 Rounds (5-12) - Intensive Mixing</h6>
            <p style="color: #64748b; font-size: 0.9rem;">
                These rounds provide the core cryptographic strength through repeated application of the round function.
            </p>
        </div>
        
        <!-- Pattern Visualization -->
        <div style="background: white; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="display: inline-flex; gap: 5px;">
                    ${Array.from(
                      { length: 8 },
                      (_, i) => `
                        <div style="width: 30px; height: 30px; background: #f59e0b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${i + 5}
                        </div>
                    `
                    ).join("")}
                </div>
                <div style="font-size: 0.8rem; color: #64748b; margin-top: 10px;">Rounds 5 through 12 follow identical pattern</div>
            </div>
            
            <!-- Generic Round Pattern -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin: 20px 0;">
                <div style="text-align: center;">
                    <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px; width: 80px;">
                        Lᵢ₋₁
                    </div>
                    <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">Previous Left</div>
                </div>
                
                <div style="text-align: center;">
                    <div style="background: #10b981; color: white; padding: 10px; border-radius: 6px; width: 80px;">
                        Rᵢ₋₁
                    </div>
                    <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">Previous Right</div>
                </div>
                
                <div style="font-size: 1.2rem; color: #64748b;">→</div>
                
                <div style="text-align: center; position: relative;">
                    <div style="background: #f59e0b; color: white; padding: 12px; border-radius: 6px; width: 100px;">
                        Round i
                    </div>
                    <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #f59e0b; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.7rem;">
                        Using Kᵢ
                    </div>
                </div>
                
                <div style="font-size: 1.2rem; color: #64748b;">→</div>
                
                <div style="text-align: center;">
                    <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px; width: 80px;">
                        Lᵢ = Rᵢ₋₁
                    </div>
                    <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">New Left</div>
                </div>
                
                <div style="text-align: center;">
                    <div style="background: #10b981; color: white; padding: 10px; border-radius: 6px; width: 80px;">
                        Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)
                    </div>
                    <div style="font-size: 0.7rem; color: #64748b; margin-top: 5px;">New Right</div>
                </div>
            </div>
        </div>
        
        <!-- Avalanche Effect Visualization -->
        <div style="margin-top: 25px;">
            <h6 style="color: #334155; margin-bottom: 10px; text-align: center;">Avalanche Effect in Middle Rounds</h6>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                ${Array.from({ length: 8 }, (_, i) => {
                  const roundNum = i + 5;
                  const bitChange = Math.min(32, 4 + roundNum * 2);
                  return `
                        <div style="padding: 10px; background: ${
                          roundNum % 2 === 0 ? "#f0f9ff" : "#f0fdf4"
                        }; border-radius: 6px; text-align: center;">
                            <div style="font-weight: bold; color: #334155; margin-bottom: 5px;">Round ${roundNum}</div>
                            <div style="font-size: 0.8rem; color: #64748b;">
                                ~${bitChange} bits affected
                            </div>
                        </div>
                    `;
                }).join("")}
            </div>
            <div style="text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 10px;">
                Each round increases the dependency between all bits
            </div>
        </div>
    `;
}

function showLastRounds() {
  const roundDiv = document.getElementById("round-visualization");
  roundDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #ef4444; margin-bottom: 10px;">Final 4 Rounds (13-16) - Final Transformation</h6>
            <p style="color: #64748b; font-size: 0.9rem;">
                The final rounds complete the encryption process and prepare for the output swap.
            </p>
        </div>
        
        <!-- Rounds 13-15 -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
            ${Array.from({ length: 3 }, (_, i) => {
              const roundNum = i + 13;
              return `
                    <div style="padding: 15px; background: #fef2f2; border-radius: 8px; text-align: center;">
                        <div style="font-weight: bold; color: #dc2626; margin-bottom: 5px;">Round ${roundNum}</div>
                        <div style="font-size: 0.8rem; color: #991b1b; margin-bottom: 10px;">
                            L₁${String.fromCharCode(
                              130 + i
                            )} = R₁${String.fromCharCode(129 + i)}<br>
                            R₁${String.fromCharCode(
                              130 + i
                            )} = L₁${String.fromCharCode(
                129 + i
              )} ⊕ F(R₁${String.fromCharCode(129 + i)}, K₁${roundNum})
                        </div>
                        <div style="font-size: 0.7rem; color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 5px; border-radius: 4px;">
                            Using K₁${roundNum}
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
        
        <!-- Final Round 16 -->
        <div style="background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 8px; padding: 20px; color: white; margin-bottom: 20px;">
            <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">Final Round (16)</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; opacity: 0.9;">
                    L₁₆ = R₁₅<br>
                    R₁₆ = L₁₅ ⊕ F(R₁₅, K₁₆)
                </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 15px;">
                <div style="text-align: center;">
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 6px;">
                        L₁₆
                    </div>
                    <div style="font-size: 0.7rem; opacity: 0.8; margin-top: 5px;">Final Left</div>
                </div>
                
                <div style="font-size: 1.2rem;">|</div>
                
                <div style="text-align: center;">
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 6px;">
                        R₁₆
                    </div>
                    <div style="font-size: 0.7rem; opacity: 0.8; margin-top: 5px;">Final Right</div>
                </div>
            </div>
        </div>
        
        <!-- Final Swap -->
        <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px; border: 2px dashed #cbd5e1;">
            <div style="font-weight: bold; color: #334155; margin-bottom: 10px;">Final Swap (After Round 16)</div>
            <div style="display: inline-flex; align-items: center; gap: 15px; background: white; padding: 15px; border-radius: 6px;">
                <div style="text-align: center;">
                    <div style="background: #3b82f6; color: white; padding: 10px; border-radius: 6px;">
                        L₁₆ | R₁₆
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Before Swap</div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">⇄</div>
                
                <div style="text-align: center;">
                    <div style="background: #10b981; color: white; padding: 10px; border-radius: 6px;">
                        R₁₆ | L₁₆
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">After Swap</div>
                </div>
                
                <div style="font-size: 1.5rem; color: #64748b;">=</div>
                
                <div style="text-align: center;">
                    <div style="background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 10px; border-radius: 6px; font-weight: bold;">
                        64-bit Ciphertext
                    </div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 5px;">Final Output</div>
                </div>
            </div>
        </div>
    `;
}

function showCompleteFlow() {
  const roundDiv = document.getElementById("round-visualization");
  roundDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #8b5cf6; margin-bottom: 10px;">Complete 16-Round Flow</h6>
            <p style="color: #64748b; font-size: 0.9rem;">
                The complete transformation from plaintext to ciphertext through all 16 rounds.
            </p>
        </div>
        
        <!-- Complete Flow Chart -->
        <div style="position: relative; padding: 20px; background: white; border: 2px solid #e2e8f0; border-radius: 8px;">
            <!-- Start -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; padding: 15px; background: #3b82f6; color: white; border-radius: 8px;">
                    <div style="font-weight: bold;">64-bit Plaintext</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Split into L₀ and R₀</div>
                </div>
            </div>
            
            <!-- 16 Rounds Visualization -->
            <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 30px; overflow-x: auto; padding: 10px;">
                <div style="display: flex; gap: 5px;">
                    ${Array.from(
                      { length: 16 },
                      (_, i) => `
                        <div style="text-align: center; min-width: 60px;">
                            <div style="background: ${getRoundColor(
                              i
                            )}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 5px;">
                                ${i + 1}
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Round</div>
                            <div style="font-size: 0.6rem; color: #94a3b8;">K${
                              i + 1
                            }</div>
                        </div>
                        ${
                          i < 15
                            ? '<div style="width: 20px; border-bottom: 2px dashed #cbd5e1; margin-top: 20px;"></div>'
                            : ""
                        }
                    `
                    ).join("")}
                </div>
            </div>
            
            <!-- Flow Description -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #0369a1; margin-bottom: 5px;">Rounds 1-4</div>
                    <div style="font-size: 0.8rem; color: #0c4a6e;">
                        Initial mixing with keys K₁-K₄
                    </div>
                </div>
                <div style="padding: 15px; background: #fef3c7; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #92400e; margin-bottom: 5px;">Rounds 5-12</div>
                    <div style="font-size: 0.8rem; color: #78350f;">
                        Core cryptographic strength
                    </div>
                </div>
                <div style="padding: 15px; background: #fef2f2; border-radius: 8px; text-align: center;">
                    <div style="font-weight: bold; color: #dc2626; margin-bottom: 5px;">Rounds 13-16</div>
                    <div style="font-size: 0.8rem; color: #991b1b;">
                        Final transformation with K₁₃-K₁₆
                    </div>
                </div>
            </div>
            
            <!-- End -->
            <div style="text-align: center; margin-top: 30px;">
                <div style="display: inline-block; padding: 15px; background: #10b981; color: white; border-radius: 8px;">
                    <div style="font-weight: bold;">64-bit Ciphertext</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">After final swap</div>
                </div>
            </div>
            
            <!-- Formula Summary -->
            <div style="margin-top: 25px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #475569; text-align: center;">
                    For i = 1 to 16: Lᵢ = Rᵢ₋₁, Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)
                </div>
            </div>
        </div>
        
        <!-- Statistical Insight -->
        <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #8b5cf6, #a78bfa); border-radius: 8px; color: white;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 15px;">Statistical Insight</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">2³²</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Possible 32-bit halves</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">16</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Iterations of round function</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">2⁵⁶</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Possible keys</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 5px;">~32</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Bits changed per round (avg)</div>
                </div>
            </div>
        </div>
    `;
}

// Helper function for round colors
function getRoundColor(roundIndex) {
  if (roundIndex < 4) return "#3b82f6"; // Blue for first 4 rounds
  if (roundIndex < 12) return "#f59e0b"; // Orange for middle 8 rounds
  return "#ef4444"; // Red for last 4 rounds
}
