// --- Core State & DB ---
let db;
// Keeping "videos" object store name for backwards compatibility, but it holds audio now.
const dbRequest = indexedDB.open("TSH_Database", 4);
dbRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if(!db.objectStoreNames.contains("videos")) db.createObjectStore("videos", { keyPath: "id", autoIncrement: true });
};
dbRequest.onsuccess = (e) => { 
    db = e.target.result; 
    if(document.getElementById('vault-list')) {
        loadVault();
    }
};

let state = { setupComplete: false, tutorialStep: 0, habits: [] };

const tutorialSteps = [
    { title: "The War Room", desc: "This is TSH Command. Track your financial freedom and healing milestones here.", icon: "layout-dashboard" },
    { title: "The Urge Engine", desc: "In moments of crisis, trigger the Engine to draw upon the Word or your personal vault.", icon: "shield-alert" },
    { title: "The Vault", desc: "Record your own voice when you are strong, or upload audio files sent by loved ones to be played when you need them most.", icon: "lock" },
    { title: "Ritual Entry", desc: "Vocalizing the Serenity Prayer is the first step to reclaiming your space. Speak it every time.", icon: "volume-2" }
];

// --- Initialization ---
function init() {
    lucide.createIcons();
    const savedState = localStorage.getItem('steady_hand_state');
    if (savedState) {
        state = JSON.parse(savedState);
        if (state.setupComplete) showScreen('gateway');
        else showScreen('setup');
    } else {
        showScreen('setup');
        addHabitField();
    }
    updateDate();
    renderDashboard();
    setupAudioUpload();
}

function showScreen(screen) {
    document.querySelectorAll('[id^="screen-"]').forEach(s => s.classList.add('hidden'));
    document.getElementById(`screen-${screen}`).classList.remove('hidden');
    
    const nav = document.getElementById('app-nav');
    if (screen === 'setup' || screen === 'gateway') {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('nav-active');
        l.classList.add('text-slate-500');
        if(l.dataset.nav === screen) {
            l.classList.add('nav-active');
            l.classList.remove('text-slate-500');
        }
    });
    
    if (screen === 'vault') loadVault();
    if (screen === 'main' && (state.tutorialStep === 0 || state.tutorialStep === undefined)) {
        startTutorial();
    }
    lucide.createIcons();
}

function startTutorial() {
    state.tutorialStep = 0;
    document.getElementById('tutorial-step').classList.remove('hidden');
    nextTutorialStep();
}

function nextTutorialStep() {
    if (state.tutorialStep >= tutorialSteps.length) {
        document.getElementById('tutorial-step').classList.add('hidden');
        state.tutorialStep = 99;
        localStorage.setItem('steady_hand_state', JSON.stringify(state));
        return;
    }
    const step = tutorialSteps[state.tutorialStep];
    document.getElementById('tut-title').innerText = step.title;
    document.getElementById('tut-desc').innerText = step.desc;
    state.tutorialStep++;
    lucide.createIcons();
}

function resetTutorial() {
    state.tutorialStep = 0;
    toggleSettings();
    showScreen('main');
}

function addHabitField() {
    const container = document.getElementById('habit-inputs');
    const div = document.createElement('div');
    div.className = 'card-glass p-4 space-y-3 relative';
    div.innerHTML = `
        <button onclick="this.parentElement.remove()" class="absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"><i data-lucide="x" class="w-3 h-3"></i></button>
        <input type="text" placeholder="Struggle (e.g. Nicotine)" class="habit-name w-full rounded-lg p-3 text-sm uppercase font-bold tracking-wider shadow-inner">
        <input type="number" placeholder="Daily Financial Cost ($)" class="habit-cost w-full rounded-lg p-3 text-sm shadow-inner">
    `;
    container.appendChild(div);
    lucide.createIcons();
}

async function saveInitialSetup() {
    const habitEls = document.querySelectorAll('#habit-inputs > div');
    state.habits = [];
    habitEls.forEach(el => {
        const name = el.querySelector('.habit-name').value;
        const cost = el.querySelector('.habit-cost').value || 0;
        if (name) state.habits.push({ 
            id: 'habit_' + Date.now() + '_' + Math.floor(Math.random() * 1000), 
            name, 
            costPerDay: parseFloat(cost), 
            startDate: new Date().toISOString(), 
            slips: [] 
        });
    });

    state.setupComplete = true;
    state.tutorialStep = 0; 
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    showScreen('gateway');
    renderDashboard();
}

document.getElementById('btn-amen').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    document.getElementById('screen-gateway').classList.add('hidden');
    showScreen('main');
});

function renderDashboard() {
    const container = document.getElementById('dashboard-habits');
    if (!container) return; container.innerHTML = '';
    
    let totalSavedValue = 0;
    
    state.habits.forEach(habit => {
        const streakDays = calculateStreak(habit);
        totalSavedValue += calculateTotalSaved(habit);
        
        const div = document.createElement('div');
        div.className = 'card-glass p-5';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-slate-800 font-cinzel text-sm uppercase tracking-widest font-bold mb-1">${habit.name}</h3>
                    <p class="text-3xl font-bold text-slate-800">${streakDays} <span class="text-[10px] text-slate-600 uppercase tracking-tighter ml-1 font-semibold">Days Won</span></p>
                </div>
                <button onclick="logSlip('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full active:bg-slate-200 transition-colors shadow-sm">Log Slip</button>
            </div>
            <div class="bg-white/60 h-2 rounded-full overflow-hidden shadow-inner"><div class="bg-slate-700 h-full" style="width: ${calculateSuccessRate(habit)}%"></div></div>
        `;
        container.appendChild(div);
    });
    
    document.getElementById('total-saved').innerText = `$${totalSavedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    document.getElementById('financial-progress').style.width = `${Math.min(100, (totalSavedValue / 5000) * 100)}%`;
}

// --- Audio Recording & Upload Logic ---
let mediaRecorder; let chunks = [];
let audioStream;

function setupAudioUpload() {
    const uploader = document.getElementById('audio-upload');
    if (!uploader) return;
    
    uploader.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Save the uploaded file directly as a Blob into IndexedDB
        const t = db.transaction(["videos"], "readwrite");
        t.objectStore("videos").add({ 
            blob: file, 
            date: new Date().toISOString(),
            isUpload: true,
            name: file.name
        });
        
        t.oncomplete = () => {
            alert("Audio file safely vaulted.");
            loadVault();
            uploader.value = ''; // reset input
        };
        t.onerror = () => alert("Failed to save audio file.");
    });
}

async function startRecording() {
    try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioStream = s;
        
        document.getElementById('record-placeholder').classList.add('hidden');
        document.getElementById('recording-active').classList.remove('hidden');
        document.getElementById('recording-active').classList.add('flex');
        
        mediaRecorder = new MediaRecorder(s); 
        chunks = [];
        
        mediaRecorder.ondataavailable = e => { if(e.data.size > 0) chunks.push(e.data); };
        mediaRecorder.onstop = () => {
            const mimeType = mediaRecorder.mimeType || 'audio/webm';
            const b = new Blob(chunks, { type: mimeType });
            const t = db.transaction(["videos"], "readwrite");
            t.objectStore("videos").add({ blob: b, date: new Date().toISOString(), isUpload: false });
            t.oncomplete = loadVault;
        };
        
        mediaRecorder.start();
        document.getElementById('btn-start-record').classList.add('hidden');
        document.getElementById('btn-stop-record').classList.remove('hidden');
    } catch (err) { alert("Microphone access required for the Vault."); }
}

function stopRecording() {
    if(!mediaRecorder) return;
    mediaRecorder.stop();
    if(audioStream) audioStream.getTracks().forEach(t => t.stop());
    
    document.getElementById('record-placeholder').classList.remove('hidden');
    document.getElementById('recording-active').classList.add('hidden');
    document.getElementById('recording-active').classList.remove('flex');
    
    document.getElementById('btn-start-record').classList.remove('hidden');
    document.getElementById('btn-stop-record').classList.add('hidden');
}

function loadVault() {
    if(!db) return;
    const c = document.getElementById('vault-list'); c.innerHTML = '';
    db.transaction("videos", "readonly").objectStore("videos").openCursor(null, 'prev').onsuccess = e => {
        const cur = e.target.result;
        if(cur) {
            const url = URL.createObjectURL(cur.value.blob);
            const d = document.createElement('div'); d.className = 'card-glass p-4 relative';
            
            // Differentiate UI slightly if it was an uploaded file
            const iconName = cur.value.isUpload ? 'upload-cloud' : 'mic';
            const labelText = cur.value.isUpload ? `Uploaded ${new Date(cur.value.date).toLocaleDateString()}` : `Captured ${new Date(cur.value.date).toLocaleDateString()}`;

            d.innerHTML = `
                <div class="flex items-center gap-3 mb-4 bg-white/50 p-2 rounded-xl border border-white/60 shadow-inner">
                    <i data-lucide="${iconName}" class="w-5 h-5 text-slate-700 shrink-0 ml-2"></i>
                    <audio src="${url}" controls class="w-full h-8 outline-none bg-transparent"></audio>
                </div>
                <div class="flex justify-between items-center text-[10px] uppercase font-bold text-slate-700 px-2">
                <span class="truncate max-w-[150px]">${labelText}</span>
                <button onclick="deleteVideo(${cur.value.id})" class="text-red-600 bg-white/50 px-3 py-1 rounded-full shadow-sm hover:bg-red-50 transition-colors">Purge</button></div>`;
            c.appendChild(d); cur.continue();
        }
    };
    setTimeout(() => lucide.createIcons(), 50);
}

function deleteVideo(id) { if(confirm("Purge this audio file permanently?")) db.transaction("videos", "readwrite").objectStore("videos").delete(id).onsuccess = loadVault; }


// --- Smarter Urge Engine Algorithm ---
let lastUrgeType = null;
let lastVerseIndex = -1;
let lastAudioId = -1;

async function triggerUrgeEngine() {
    const o = document.getElementById('urge-overlay'); o.classList.remove('hidden');
    const c = document.getElementById('urge-content');
    
    const vaultAudios = await new Promise(r => {
        const res = []; db.transaction("videos").objectStore("videos").openCursor().onsuccess = e => {
            if(e.target.result) { res.push(e.target.result.value); e.target.result.continue(); } else r(res);
        };
    });
    
    let choice = 'scripture';
    
    // Algorithm: Balances audio vs scripture. 
    // Prevents playing audio back-to-back too frequently to keep it fresh.
    if (vaultAudios.length > 0) {
        if (lastUrgeType === 'audio') {
            // If the last one was audio, only a 20% chance to play audio again
            choice = Math.random() > 0.8 ? 'audio' : 'scripture';
        } else {
            // Otherwise, a 50/50 flip between your personal audio and a verse
            choice = Math.random() > 0.5 ? 'audio' : 'scripture';
        }
    }

    lastUrgeType = choice;

    if (choice === 'audio') {
        // Pick random audio, try not to repeat the exact same one immediately
        let audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
        let safetyCounter = 0;
        while (audioMatch.id === lastAudioId && vaultAudios.length > 1 && safetyCounter < 10) {
            audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
            safetyCounter++;
        }
        lastAudioId = audioMatch.id;

        const url = URL.createObjectURL(audioMatch.blob);
        const headlineText = audioMatch.isUpload ? "A Voice in the Dark" : "Listen to Your Strength";

        c.innerHTML = `
            <i data-lucide="headphones" class="w-16 h-16 text-slate-700 drop-shadow-sm mx-auto mb-6"></i>
            <h2 class="font-cinzel text-slate-800 mb-6 uppercase font-bold tracking-widest text-xl">${headlineText}</h2>
            <div class="bg-white/60 p-4 rounded-2xl w-full max-w-sm shadow-xl border-2 border-white">
                <audio src="${url}" autoplay controls class="w-full outline-none"></audio>
            </div>
            <p class="text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-8">Breathe and Listen</p>
        `;
    } else {
        // Scripture Algorithm: Ensure we never pull the exact same verse twice in a row
        let nextIndex = Math.floor(Math.random() * scriptures.length);
        while (nextIndex === lastVerseIndex && scriptures.length > 1) {
            nextIndex = Math.floor(Math.random() * scriptures.length);
        }
        lastVerseIndex = nextIndex;
        const randomScripture = scriptures[nextIndex];
        
        c.innerHTML = `<i data-lucide="sun" class="w-16 h-16 text-slate-700 drop-shadow-sm mx-auto mb-8"></i>
            <h2 class="text-2xl font-cinzel text-slate-800 drop-shadow-sm leading-relaxed px-4 italic font-bold">"${randomScripture.text}"</h2>
            <p class="text-sm font-bold text-slate-600 mt-6">${randomScripture.ref}</p>
            <div class="mt-12 bg-white/40 py-2 px-6 rounded-full inline-block shadow-sm border border-white/50">
                <p class="text-[10px] text-slate-700 uppercase tracking-widest font-bold">Breathe for 60 seconds.</p>
            </div>`;
    }
    lucide.createIcons();
}

// --- Logic Utils ---

function calculateTotalSaved(habit) {
    const msPerDay = 86400000;
    const totalDaysElapsed = Math.floor(Math.max(0, new Date() - new Date(habit.startDate)) / msPerDay);
    const totalCleanDays = Math.max(0, totalDaysElapsed - habit.slips.length);
    return totalCleanDays * habit.costPerDay;
}

function calculateStreak(habit) { 
    const msPerDay = 86400000;
    const lastDate = habit.slips.length > 0 ? new Date(habit.slips[habit.slips.length-1]) : new Date(habit.startDate); 
    return Math.floor(Math.max(0, new Date() - lastDate) / msPerDay);
}

function calculateSuccessRate(h) { 
    const t = Math.max(1, Math.floor((new Date() - new Date(h.startDate)) / 86400000)); 
    return Math.min(100, ((t - h.slips.length)/t)*100); 
}

function logSlip(id) { 
    const h = state.habits.find(x=>x.id === id); 
    if(h) { 
        h.slips.push(new Date().toISOString()); 
        localStorage.setItem('steady_hand_state', JSON.stringify(state)); 
        renderDashboard(); 
        document.getElementById('screen-gateway').classList.remove('hidden'); 
    } 
}

function closeUrgeEngine() { document.getElementById('urge-overlay').classList.add('hidden'); }
function toggleSettings() { document.getElementById('modal-settings').classList.toggle('hidden'); lucide.createIcons(); }
function updateDate() { 
    document.getElementById('date-display').innerText = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); 
}
function resetApp() { 
    if(confirm("DELETE ALL DATA? This erases all progress and voice notes permanently.")) { 
        localStorage.clear(); 
        indexedDB.deleteDatabase("TSH_Database"); 
        window.location.reload(); 
    } 
}

window.onload = init;
