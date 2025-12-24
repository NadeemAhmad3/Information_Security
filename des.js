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
    `;

    // Initialize icons
    feather.replace();
}