// des.js - Data Encryption Standard Module (Simplified Version)
function renderDES(container) {
    // 1. Reset Layout
    container.className = '';
    container.style.display = 'block';
    container.style.padding = '0';

    // 2. CSS Styles for DES Module
    const style = document.createElement('style');
    style.id = 'des-style';
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
    `;
    
    const oldStyle = document.getElementById('des-style');
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
                        ${Array.from({length: 16}, (_, i) => `
                            <div style="background: #3b82f6; color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem;">
                                K${i+1}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div>
                    <h6 style="color: #dc2626; margin-bottom: 10px; font-size: 0.95rem;">Decryption Order:</h6>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        ${Array.from({length: 16}, (_, i) => `
                            <div style="background: #ef4444; color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem;">
                                K${16-i}
                            </div>
                        `).join('')}
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
    `;

    // Initialize icons
    feather.replace();
}
// Add these functions to your des.js file:

// Function to show different round phases
function showRound(phase) {
    const roundDiv = document.getElementById('round-visualization');
    
    // Update button states
    document.querySelectorAll('.round-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '#64748b';
    });
    event.target.classList.add('active');
    event.target.style.background = '#3b82f6';
    
    switch(phase) {
        case 'first':
            showFirstRounds();
            break;
        case 'middle':
            showMiddleRounds();
            break;
        case 'last':
            showLastRounds();
            break;
        case 'all':
            showCompleteFlow();
            break;
    }
    
    feather.replace();
}

function showFirstRounds() {
    const roundDiv = document.getElementById('round-visualization');
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
    const roundDiv = document.getElementById('round-visualization');
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
                    ${Array.from({length: 8}, (_, i) => `
                        <div style="width: 30px; height: 30px; background: #f59e0b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${i+5}
                        </div>
                    `).join('')}
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
                ${Array.from({length: 8}, (_, i) => {
                    const roundNum = i + 5;
                    const bitChange = Math.min(32, 4 + (roundNum * 2));
                    return `
                        <div style="padding: 10px; background: ${roundNum % 2 === 0 ? '#f0f9ff' : '#f0fdf4'}; border-radius: 6px; text-align: center;">
                            <div style="font-weight: bold; color: #334155; margin-bottom: 5px;">Round ${roundNum}</div>
                            <div style="font-size: 0.8rem; color: #64748b;">
                                ~${bitChange} bits affected
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div style="text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 10px;">
                Each round increases the dependency between all bits
            </div>
        </div>
    `;
}

function showLastRounds() {
    const roundDiv = document.getElementById('round-visualization');
    roundDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h6 style="color: #ef4444; margin-bottom: 10px;">Final 4 Rounds (13-16) - Final Transformation</h6>
            <p style="color: #64748b; font-size: 0.9rem;">
                The final rounds complete the encryption process and prepare for the output swap.
            </p>
        </div>
        
        <!-- Rounds 13-15 -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
            ${Array.from({length: 3}, (_, i) => {
                const roundNum = i + 13;
                return `
                    <div style="padding: 15px; background: #fef2f2; border-radius: 8px; text-align: center;">
                        <div style="font-weight: bold; color: #dc2626; margin-bottom: 5px;">Round ${roundNum}</div>
                        <div style="font-size: 0.8rem; color: #991b1b; margin-bottom: 10px;">
                            L₁${String.fromCharCode(130 + i)} = R₁${String.fromCharCode(129 + i)}<br>
                            R₁${String.fromCharCode(130 + i)} = L₁${String.fromCharCode(129 + i)} ⊕ F(R₁${String.fromCharCode(129 + i)}, K₁${roundNum})
                        </div>
                        <div style="font-size: 0.7rem; color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 5px; border-radius: 4px;">
                            Using K₁${roundNum}
                        </div>
                    </div>
                `;
            }).join('')}
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
    const roundDiv = document.getElementById('round-visualization');
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
                    ${Array.from({length: 16}, (_, i) => `
                        <div style="text-align: center; min-width: 60px;">
                            <div style="background: ${getRoundColor(i)}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin: 0 auto 5px;">
                                ${i+1}
                            </div>
                            <div style="font-size: 0.7rem; color: #64748b;">Round</div>
                            <div style="font-size: 0.6rem; color: #94a3b8;">K${i+1}</div>
                        </div>
                        ${i < 15 ? '<div style="width: 20px; border-bottom: 2px dashed #cbd5e1; margin-top: 20px;"></div>' : ''}
                    `).join('')}
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
    if (roundIndex < 4) return '#3b82f6';      // Blue for first 4 rounds
    if (roundIndex < 12) return '#f59e0b';     // Orange for middle 8 rounds
    return '#ef4444';                          // Red for last 4 rounds
}
