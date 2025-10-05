// Main application logic
let currentPage = 'welcome';
let pageModules = {};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHardwareListeners();
    
    // Check if running as R1 plugin
    if (typeof PluginMessageHandler !== 'undefined') {
        console.log('Running as R1 Creation');
    } else {
        console.log('Running in browser mode');
    }
});

// Navigation system
function initializeNavigation() {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenu = document.getElementById('closeMenu');
    const menuNav = document.getElementById('menuNav');
    const menuLinks = document.querySelectorAll('.menu-nav a');
    
    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuNav.classList.add('open');
    });
    
    closeMenu.addEventListener('click', () => {
        menuNav.classList.remove('open');
    });
    
    // Handle menu navigation
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            loadPage(page);
            menuNav.classList.remove('open');
            
            // Update active state
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Load page content
async function loadPage(pageName) {
    const content = document.getElementById('content');
    currentPage = pageName;
    
    // Clear current content
    content.innerHTML = '';
    
    // Load page-specific content
    switch(pageName) {
        case 'hardware':
            loadHardwarePage(content);
            break;
        case 'data':
            loadDataPage(content);
            break;
        case 'speak':
            loadSpeakPage(content);
            break;
        default:
            content.innerHTML = '<div class="welcome"><h2>Welcome</h2><p>Select an option from the menu.</p></div>';
    }
}

// Hardware button listeners
function initializeHardwareListeners() {
    // Scroll wheel events
    window.addEventListener('scrollUp', () => {
        if (currentPage === 'hardware' && pageModules.hardware) {
            pageModules.hardware.handleScrollUp();
        }
    });
    
    window.addEventListener('scrollDown', () => {
        if (currentPage === 'hardware' && pageModules.hardware) {
            pageModules.hardware.handleScrollDown();
        }
    });
    
    // PTT button events
    window.addEventListener('sideClick', () => {
        if (currentPage === 'hardware' && pageModules.hardware) {
            pageModules.hardware.handlePTT();
        }
    });
    
    window.addEventListener('longPressStart', () => {
        console.log('Long press started');
    });
    
    window.addEventListener('longPressEnd', () => {
        console.log('Long press ended');
    });
}

// Plugin message handler
window.onPluginMessage = function(data) {
    console.log('Received plugin message:', data);
    
    // Route to appropriate page handler
    if (currentPage === 'data' && pageModules.data) {
        pageModules.data.handleMessage(data);
    } else if (currentPage === 'speak' && pageModules.speak) {
        pageModules.speak.handleMessage(data);
    }
};

// Utility function to update app border color
function updateAppBorderColor(hexColor) {
    const app = document.getElementById('app');
    app.style.borderColor = hexColor;
}
// Data page functionality
function loadDataPage(container) {
    container.innerHTML = `
        <div class="data-container">
            <div class="data-buttons">
                <button class="data-button" id="catFactsBtn">Cat Facts</button>
                <button class="data-button" id="dinosBtn">Dinos</button>
                <button class="data-button toggle" id="paintBtn">Paint it black</button>
            </div>
            <div class="chat-window" id="dataChat"></div>
            <button id="clearChat" style="margin-top: 6px; padding: 4px 8px; font-size: 10px;">Clear</button>
        </div>
    `;
    
    // Initialize data module
    const dataModule = {
        paintState: 'black',
        
        sendCatFacts: function() {
            const message = 'Tell me 5 facts about cats. Respond ONLY with valid JSON in this exact format: {"facts":["fact1","fact2","fact3","fact4","fact5"]}';
            this.sendLLMMessage(message);
            this.addToChat('Requesting cat facts...', 'system');
        },
        
        sendDinoFact: function() {
            const message = "tell me a fact about dinosaurs";
            this.sendLLMMessage(message);
            this.addToChat('Requesting dinosaur fact...', 'system');
        },
        
        togglePaint: function() {
            const btn = document.getElementById('paintBtn');
            this.paintState = this.paintState === 'black' ? 'red' : 'black';
            btn.textContent = `Paint it ${this.paintState}`;
            btn.classList.toggle('red', this.paintState === 'red');
            
            const message = `Give me the hex color code for ${this.paintState}. Return ONLY valid JSON in this exact format: {"paint":"#hexcode"}`;
            this.sendLLMMessage(message);
            this.addToChat(`Requesting ${this.paintState} paint...`, 'system');
        },
        
        sendLLMMessage: function(message) {
            if (typeof PluginMessageHandler !== 'undefined') {
                const payload = {
                    message: message,
                    useLLM: true
                };
                PluginMessageHandler.postMessage(JSON.stringify(payload));
            } else {
                console.log('PluginMessageHandler not available, message:', message);
                this.addToChat('Plugin API not available', 'error');
            }
        },
        
        handleMessage: function(data) {
            console.log('Data page handling message:', data);
            
            // First try to parse data.data field
            if (data.data) {
                console.log('Trying to parse data.data:', data.data);
                try {
                    // Handle if data.data is already an object
                    const parsed = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
                    console.log('Parsed data:', parsed);
                    
                    // Handle cat facts
                    if (parsed.facts && Array.isArray(parsed.facts)) {
                        console.log('Found facts array:', parsed.facts);
                        parsed.facts.forEach((fact, index) => {
                            this.addToChat(`Fact ${index + 1}: ${fact}`, 'fact');
                        });
                        return; // Exit after handling facts
                    }
                    
                    // Handle paint color
                    if (parsed.paint) {
                        console.log('Found paint color:', parsed.paint);
                        updateAppBorderColor(parsed.paint);
                        this.addToChat(`Border painted: ${parsed.paint}`, 'system');
                        return; // Exit after handling paint
                    }
                    
                    // If we have parsed data but no recognized fields
                    this.addToChat(`Data: ${JSON.stringify(parsed)}`, 'msg');
                } catch (e) {
                    console.error('Error parsing data.data:', e);
                    // data.data wasn't valid JSON, treat as plain text
                    this.addToChat(`Response: ${data.data}`, 'msg');
                }
            }
            
            // Also check if message field contains JSON
            if (data.message) {
                console.log('Checking message field:', data.message);
                
                // Try to parse message as JSON first
                try {
                    const parsed = JSON.parse(data.message);
                    console.log('Parsed message as JSON:', parsed);
                    
                    if (parsed.facts && Array.isArray(parsed.facts)) {
                        parsed.facts.forEach((fact, index) => {
                            this.addToChat(`Fact ${index + 1}: ${fact}`, 'fact');
                        });
                        return;
                    }
                    
                    if (parsed.paint) {
                        updateAppBorderColor(parsed.paint);
                        this.addToChat(`Border painted: ${parsed.paint}`, 'system');
                        return;
                    }
                } catch (e) {
                    // Not JSON, display as regular message
                    this.addToChat(`msg: ${data.message}`, 'msg');
                }
            }
        },
        
        addToChat: function(text, type = 'msg') {
            const chat = document.getElementById('dataChat');
            if (!chat) return;
            
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-message ${type}`;
            msgDiv.textContent = text;
            
            chat.appendChild(msgDiv);
            chat.scrollTop = chat.scrollHeight;
        },
        
        clearChat: function() {
            const chat = document.getElementById('dataChat');
            if (chat) {
                chat.innerHTML = '';
            }
        }
    };
    
    // Store module reference
    pageModules.data = dataModule;
    
    // Set up button event listeners
    document.getElementById('catFactsBtn').addEventListener('click', () => {
        dataModule.sendCatFacts();
    });
    
    document.getElementById('dinosBtn').addEventListener('click', () => {
        dataModule.sendDinoFact();
    });
    
    document.getElementById('paintBtn').addEventListener('click', () => {
        dataModule.togglePaint();
    });
    
    document.getElementById('clearChat').addEventListener('click', () => {
        dataModule.clearChat();
    });
}
// Hardware page functionality
function loadHardwarePage(container) {
    container.innerHTML = `
        <div class="hardware-container">
            <div class="tab-navigation">
                <button class="tab-button active" data-tab="buttons">Buttons & Scroll</button>
                <button class="tab-button" data-tab="accelerometer">Accelerometer</button>
            </div>
            
            <div class="tab-content active" id="buttons-tab">
                <div class="button-section">
                    <h3>Hardware Buttons</h3>
                    <div class="button-row">
                        <button class="hw-button" id="upBtn">Scroll UP</button>
                        <div class="led-indicator" id="upLed"></div>
                    </div>
                    <div class="button-row">
                        <button class="hw-button" id="downBtn">Scroll DOWN</button>
                        <div class="led-indicator" id="downLed"></div>
                    </div>
                    <div class="button-row">
                        <button class="hw-button" id="pttBtn">PTT (Side Button)</button>
                        <div class="led-indicator" id="pttLed"></div>
                    </div>
                    <div class="button-info">
                        <p>Test the scroll wheel and PTT button. LEDs will blink when events are detected.</p>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="accelerometer-tab">
                <div class="accelerometer-widget">
                    <h3>Accelerometer Data</h3>
                    <div class="accel-controls">
                        <button id="toggleAccel">Start Accelerometer</button>
                        <div class="frequency-info">
                            <label>Frequency: </label>
                            <select id="accelFreq">
                                <option value="10">10 Hz</option>
                                <option value="30">30 Hz</option>
                                <option value="60" selected>60 Hz (Default)</option>
                                <option value="100">100 Hz</option>
                            </select>
                        </div>
                    </div>
                    <div class="accel-section">
                        <h4>Tilt Values (Normalized -1 to 1)</h4>
                        <div class="accel-values">
                            <div class="accel-axis">
                                <div class="accel-label">Tilt X</div>
                                <div class="accel-value" id="tiltX">0.00</div>
                            </div>
                            <div class="accel-axis">
                                <div class="accel-label">Tilt Y</div>
                                <div class="accel-value" id="tiltY">0.00</div>
                            </div>
                            <div class="accel-axis">
                                <div class="accel-label">Tilt Z</div>
                                <div class="accel-value" id="tiltZ">0.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="accel-section">
                        <h4>Raw Values (m/sÂ²)</h4>
                        <div class="accel-values">
                            <div class="accel-axis">
                                <div class="accel-label">Raw X</div>
                                <div class="accel-value" id="rawX">0.00</div>
                            </div>
                            <div class="accel-axis">
                                <div class="accel-label">Raw Y</div>
                                <div class="accel-value" id="rawY">0.00</div>
                            </div>
                            <div class="accel-axis">
                                <div class="accel-label">Raw Z</div>
                                <div class="accel-value" id="rawZ">0.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Initialize hardware module
    const hardwareModule = {
        isAccelRunning: false,
        
        handleScrollUp: function() {
            this.blinkLED('upLed');
            console.log('Scroll up detected');
        },
        
        handleScrollDown: function() {
            this.blinkLED('downLed');
            console.log('Scroll down detected');
        },
        
        handlePTT: function() {
            this.blinkLED('pttLed');
            console.log('PTT button pressed');
        },
        
        blinkLED: function(ledId) {
            const led = document.getElementById(ledId);
            if (led) {
                led.classList.add('blink');
                setTimeout(() => {
                    led.classList.remove('blink');
                }, 500);
            }
        },
        
        toggleAccelerometer: function() {
            const btn = document.getElementById('toggleAccel');
            
            // Check if API exists
            if (typeof window.creationSensors === 'undefined') {
                console.log('creationSensors not defined');
                btn.textContent = 'API Not Available';
                return;
            }
            
            if (!window.creationSensors.accelerometer) {
                console.log('accelerometer not in creationSensors');
                btn.textContent = 'Accel Not Available';
                return;
            }
            
            if (!this.isAccelRunning) {
                console.log('Starting accelerometer...');
                
                // Check availability first
                const self = this;
                if (window.creationSensors.accelerometer.isAvailable) {
                    window.creationSensors.accelerometer.isAvailable().then(available => {
                        if (!available) {
                            console.log('Accelerometer not available on device');
                            btn.textContent = 'Not Available';
                            return;
                        }
                        
                        // Start accelerometer with selected frequency
                        const frequency = parseInt(document.getElementById('accelFreq').value) || 60;
                        try {
                            window.creationSensors.accelerometer.start((data) => {
                                console.log('Accel data:', data);
                                if (data) {
                                    // Update tilt values
                                    if (document.getElementById('tiltX') && data.tiltX !== undefined) {
                                        document.getElementById('tiltX').textContent = data.tiltX.toFixed(2);
                                        document.getElementById('tiltY').textContent = data.tiltY !== undefined ? data.tiltY.toFixed(2) : '0.00';
                                        document.getElementById('tiltZ').textContent = data.tiltZ !== undefined ? data.tiltZ.toFixed(2) : '0.00';
                                    }
                                    // Update raw values
                                    if (document.getElementById('rawX') && data.rawX !== undefined) {
                                        document.getElementById('rawX').textContent = data.rawX.toFixed(2);
                                        document.getElementById('rawY').textContent = data.rawY !== undefined ? data.rawY.toFixed(2) : '0.00';
                                        document.getElementById('rawZ').textContent = data.rawZ !== undefined ? data.rawZ.toFixed(2) : '0.00';
                                    }
                                }
                            }, { frequency: frequency });
                            
                            self.isAccelRunning = true;
                            btn.textContent = 'Stop Accelerometer';
                            console.log('Accelerometer started');
                        } catch (e) {
                            console.error('Error starting accelerometer:', e);
                            btn.textContent = 'Start Failed';
                        }
                    }).catch(err => {
                        console.error('Error checking availability:', err);
                        btn.textContent = 'Check Failed';
                    });
                } else {
                    // Try starting without availability check
                    const frequency = parseInt(document.getElementById('accelFreq').value) || 60;
                    try {
                        window.creationSensors.accelerometer.start((data) => {
                            console.log('Accel data:', data);
                            if (data) {
                                // Update tilt values
                                if (document.getElementById('tiltX') && data.tiltX !== undefined) {
                                    document.getElementById('tiltX').textContent = data.tiltX.toFixed(2);
                                    document.getElementById('tiltY').textContent = data.tiltY !== undefined ? data.tiltY.toFixed(2) : '0.00';
                                    document.getElementById('tiltZ').textContent = data.tiltZ !== undefined ? data.tiltZ.toFixed(2) : '0.00';
                                }
                                // Update raw values
                                if (document.getElementById('rawX') && data.rawX !== undefined) {
                                    document.getElementById('rawX').textContent = data.rawX.toFixed(2);
                                    document.getElementById('rawY').textContent = data.rawY !== undefined ? data.rawY.toFixed(2) : '0.00';
                                    document.getElementById('rawZ').textContent = data.rawZ !== undefined ? data.rawZ.toFixed(2) : '0.00';
                                }
                            }
                        }, { frequency: 60 });
                        
                        this.isAccelRunning = true;
                        btn.textContent = 'Stop Accelerometer';
                        console.log('Accelerometer started (no availability check)');
                    } catch (e) {
                        console.error('Error starting accelerometer:', e);
                        btn.textContent = 'Start Failed';
                    }
                }
            } else {
                console.log('Stopping accelerometer...');
                try {
                    window.creationSensors.accelerometer.stop();
                    this.isAccelRunning = false;
                    btn.textContent = 'Start Accelerometer';
                    
                    // Reset all values
                    document.getElementById('tiltX').textContent = '0.00';
                    document.getElementById('tiltY').textContent = '0.00';
                    document.getElementById('tiltZ').textContent = '0.00';
                    document.getElementById('rawX').textContent = '0.00';
                    document.getElementById('rawY').textContent = '0.00';
                    document.getElementById('rawZ').textContent = '0.00';
                    console.log('Accelerometer stopped');
                } catch (e) {
                    console.error('Error stopping accelerometer:', e);
                    btn.textContent = 'Stop Failed';
                }
            }
        }
    };
    
    // Store module reference
    pageModules.hardware = hardwareModule;
    
    // Set up tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
    
    // Set up accelerometer toggle button
    document.getElementById('toggleAccel').addEventListener('click', () => {
        hardwareModule.toggleAccelerometer();
    });
    
    // Manual button clicks for testing
    document.getElementById('upBtn').addEventListener('click', () => {
        hardwareModule.handleScrollUp();
    });
    
    document.getElementById('downBtn').addEventListener('click', () => {
        hardwareModule.handleScrollDown();
    });
    
    document.getElementById('pttBtn').addEventListener('click', () => {
        hardwareModule.handlePTT();
    });
}
// Speak page functionality
function loadSpeakPage(container) {
    container.innerHTML = `
        <div class="speak-container">
            <textarea id="speakText" class="speak-input" placeholder="Enter text to speak...">Hello, I am your R1 assistant.</textarea>
            <div class="speak-controls">
                <div class="speak-toggle">
                    <input type="checkbox" id="saveToJournal">
                    <label for="saveToJournal">Save to Journal</label>
                </div>
                <button id="speakBtn">Speak on R1</button>
                <button id="speakSilentBtn">Send Silently</button>
            </div>
            <div class="speak-status" id="speakStatus">Ready</div>
        </div>
    `;
    
    // Initialize speak module
    const speakModule = {
        speak: function(useR1Response) {
            const text = document.getElementById('speakText').value.trim();
            const saveToJournal = document.getElementById('saveToJournal').checked;
            
            if (!text) {
                alert('Please enter text to speak');
                return;
            }
            
            if (typeof PluginMessageHandler !== 'undefined') {
                const payload = {
                    message: text,
                    useLLM: true,
                    wantsR1Response: useR1Response,
                    wantsJournalEntry: saveToJournal
                };
                
                PluginMessageHandler.postMessage(JSON.stringify(payload));
                this.updateStatus(useR1Response ? 'Speaking...' : 'Processing...');
                
                // Reset status after a delay
                setTimeout(() => {
                    this.updateStatus('Ready');
                }, 3000);
            } else {
                this.updateStatus('Plugin API not available');
            }
        },
        
        handleMessage: function(data) {
            console.log('Speak page handling message:', data);
            
            if (data.message) {
                this.updateStatus(`Response: ${data.message.substring(0, 50)}...`);
            }
            
            if (data.data) {
                this.updateStatus('Response received');
            }
        },
        
        updateStatus: function(status) {
            const statusDiv = document.getElementById('speakStatus');
            if (statusDiv) {
                statusDiv.textContent = status;
            }
        }
    };
    
    // Store module reference
    pageModules.speak = speakModule;
    
    // Set up event listeners
    document.getElementById('speakBtn').addEventListener('click', () => {
        speakModule.speak(true);
    });
    
    document.getElementById('speakSilentBtn').addEventListener('click', () => {
        speakModule.speak(false);
    });
}
