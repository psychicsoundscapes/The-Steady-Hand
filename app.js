// --- CLOUDFLARE PAGES FUNCTION API URL ---
const WORKER_API_URL = "/api/messages";

// --- Core State & DB ---
let db;
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

let state = { 
    setupComplete: false, 
    tutorialStep: 0, 
    habits: [], 
    urgeClicks: 0, 
    voiceMemos: 0,
    amenClicks: 0,
    midnightUrges: 0,
    veteranMemos: 0
};

const tutorialSteps = [
    { title: "The War Room", desc: "This is TSH Command. Level up through ranks and earn trophies as you rebuild your life.", icon: "layout-dashboard" },
    { title: "The Urge Engine", desc: "In moments of crisis, trigger the Engine to draw upon the Word or your personal vault recordings.", icon: "shield-alert" },
    { title: "The Vault", desc: "Record your own voice when you are strong. These notes become your shield during future urges.", icon: "lock" },
    { title: "The Wall", desc: "Share anonymous wisdom or read words of encouragement left by others on the same journey.", icon: "globe" },
    { title: "Ritual Entry", desc: "Vocalizing the Serenity Prayer is the first step to reclaiming your space. Speak it every time.", icon: "volume-2" }
];

const rankTiers = [
    { name: "Initiate", daysReq: 0 },
    { name: "Novice", daysReq: 7 },
    { name: "Fighter", daysReq: 30 },
    { name: "Warrior", daysReq: 90 },
    { name: "Sentinel", daysReq: 180 },
    { name: "Vanguard", daysReq: 365 },
    { name: "Champion", daysReq: 730 },
    { name: "Titan", daysReq: 1095 },
    { name: "Paragon", daysReq: 1460 },
    { name: "Legend", daysReq: 1825 }
];

// --- Initialization ---
function init() {
    lucide.createIcons();
    const savedState = localStorage.getItem('steady_hand_state');
    if (savedState) {
        state = JSON.parse(savedState);
        state.urgeClicks = state.urgeClicks || 0;
        state.voiceMemos = state.voiceMemos || 0;
        state.amenClicks = state.amenClicks || 0;
        state.midnightUrges = state.midnightUrges || 0;
        state.veteranMemos = state.veteranMemos || 0;
        state.habits.forEach(h => { if(h.isMain === undefined) h.isMain = true; });
        
        if (state.setupComplete) showScreen('gateway');
        else showScreen('welcome');
    } else {
        showScreen('welcome');
        addHabitField(); 
    }
    updateDate();
    renderDashboard();
}

function showScreen(screen) {
    document.querySelectorAll('[id^="screen-"]').forEach(s => s.classList.add('hidden'));
    document.getElementById(`screen-${screen}`).classList.remove('hidden');
    
    const nav = document.getElementById('app-nav');
    if (screen === 'welcome' || screen === 'creator-note' || screen === 'explanation' || screen === 'setup' || screen === 'gateway') {
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
    if (screen === 'wall') loadWallMessages();
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
        <div class="flex items-center justify-between mt-2 px-1">
            <label class="text-[10px] uppercase font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="habit-main w-4 h-4 rounded border-slate-400 text-slate-800 focus:ring-slate-800" checked>
                Main Struggle (Affects Rank)
            </label>
        </div>
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
        const isMain = el.querySelector('.habit-main').checked;
        
        if (name) state.habits.push({ 
            id: 'habit_' + Date.now() + '_' + Math.floor(Math.random() * 1000), 
            name, 
            costPerDay: parseFloat(cost), 
            startDate: new Date().toISOString(), 
            slips: [],
            isMain: isMain
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
    state.amenClicks = (state.amenClicks || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    
    document.getElementById('screen-gateway').classList.add('hidden');
    showScreen('main');
});

function devPassDay() {
    const ONE_DAY = 86400000;
    state.habits.forEach(h => {
        h.startDate = new Date(new Date(h.startDate).getTime() - ONE_DAY).toISOString();
        h.slips = h.slips.map(s => new Date(new Date(s).getTime() - ONE_DAY).toISOString());
    });
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderDashboard();
    toggleSettings();
    alert("Time warped forward 1 day! Check your War Room stats.");
}

function renderDashboard() {
    const container = document.getElementById('dashboard-habits');
    if (!container) return; container.innerHTML = '';
    
    let totalSavedValue = 0;
    let activeStrugglesCount = 0;
    
    state.habits.forEach(habit => {
        const streakDays = calculateStreak(habit);
        const cleanDays = calculateTotalCleanDays(habit);
        const saved = cleanDays * habit.costPerDay;
        
        totalSavedValue += saved;
        if (streakDays > 0) activeStrugglesCount++;
        
        const tagHTML = habit.isMain 
            ? `<span class="text-[8px] bg-slate-800 text-white px-2 py-0.5 rounded-full tracking-widest ml-2 align-middle">MAIN</span>`
            : `<span class="text-[8px] bg-slate-400 text-white px-2 py-0.5 rounded-full tracking-widest ml-2 align-middle">SECONDARY</span>`;

        const div = document.createElement('div');
        div.className = 'card-glass p-5';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-slate-800 font-cinzel text-sm uppercase tracking-widest font-bold mb-1 flex items-center">${habit.name} ${tagHTML}</h3>
                    <p class="text-3xl font-bold text-slate-800">${streakDays} <span class="text-[10px] text-slate-600 uppercase tracking-tighter ml-1 font-semibold">Days Won</span></p>
                </div>
                <button onclick="logSlip('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full active:bg-slate-200 transition-colors shadow-sm">Log Slip</button>
            </div>
            <div class="bg-white/60 h-2 rounded-full overflow-hidden shadow-inner"><div class="bg-slate-700 h-full" style="width: ${calculateSuccessRate(habit)}%"></div></div>
        `;
        container.appendChild(div);
    });
    
    // --- TIMELINE MATH ---
    const mainHabits = state.habits.filter(h => h.isMain);
    let currentMainStreak = 0;
    
    if (mainHabits.length > 0) {
        currentMainStreak = Math.min(...mainHabits.map(h => calculateStreak(h)));
    } else if (state.habits.length > 0) {
        currentMainStreak = Math.min(...state.habits.map(h => calculateStreak(h)));
    }
    
    let currentRank = rankTiers[0];
    let nextRank = rankTiers[1];
    
    for(let i=0; i<rankTiers.length; i++) {
        if (currentMainStreak >= rankTiers[i].daysReq) {
            currentRank = rankTiers[i];
            nextRank = rankTiers[i+1] || rankTiers[i];
        }
    }
    
    let progressPct = 100;
    let daysText = `${currentMainStreak} Days (MAX)`;
    if (currentRank !== nextRank) {
        const daysIntoLevel = currentMainStreak - currentRank.daysReq;
        const daysNeededForNext = nextRank.daysReq - currentRank.daysReq;
        progressPct = (daysIntoLevel / daysNeededForNext) * 100;
        daysText = `${currentMainStreak} / ${nextRank.daysReq} Days`;
    }

    document.getElementById('rank-name').innerText = currentRank.name;
    document.getElementById('xp-text').innerText = daysText;
    document.getElementById('rank-progress').style.width = `${progressPct}%`;
    document.getElementById('total-saved').innerText = `$${totalSavedValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    const trophies = [
        { title: 'First Step', desc: '1 Day Clean', icon: 'footprints', earned: currentMainStreak >= 1 },
        { title: 'Iron Will', desc: '7 Days Clean', icon: 'shield', earned: currentMainStreak >= 7 },
        { title: 'The Forge', desc: '30 Days Clean', icon: 'swords', earned: currentMainStreak >= 30 },
        { title: 'Unbroken', desc: '90 Days Clean', icon: 'flame', earned: currentMainStreak >= 90 },
        { title: 'The Crucible', desc: '180 Days Clean', icon: 'anvil', earned: currentMainStreak >= 180 },
        { title: 'One Year', desc: '365 Days Clean', icon: 'sun', earned: currentMainStreak >= 365 },
        { title: 'The Marathon', desc: '2 Years Clean', icon: 'mountain-snow', earned: currentMainStreak >= 730 },
        { title: 'Deep Roots', desc: '3 Years Clean', icon: 'tree-pine', earned: currentMainStreak >= 1095 },
        { title: 'Living Legend', desc: '5 Years Clean', icon: 'crown', earned: currentMainStreak >= 1825 },
        { title: 'Piggy Bank', desc: '$100 Saved', icon: 'coins', earned: totalSavedValue >= 100 },
        { title: 'Heavy Purse', desc: '$500 Saved', icon: 'banknote', earned: totalSavedValue >= 500 },
        { title: 'Treasure', desc: '$1k Saved', icon: 'gem', earned: totalSavedValue >= 1000 },
        { title: 'Dragon Hoard', desc: '$5k Saved', icon: 'castle', earned: totalSavedValue >= 5000 },
        { title: 'King\'s Ransom', desc: '$10k Saved', icon: 'landmark', earned: totalSavedValue >= 10000 },
        { title: 'Seeking Light', desc: 'Urge Button 5x', icon: 'bell-ring', earned: state.urgeClicks >= 5 },
        { title: 'Shield Wall', desc: 'Urge Button 25x', icon: 'bell-electric', earned: state.urgeClicks >= 25 },
        { title: 'The Watchman', desc: 'Urge Button 100x', icon: 'eye', earned: state.urgeClicks >= 100 },
        { title: 'Storm Breaker', desc: 'Urge Button 500x', icon: 'zap', earned: state.urgeClicks >= 500 },
        { title: 'Inner Voice', desc: '1 Voice Memo', icon: 'mic', earned: state.voiceMemos >= 1 },
        { title: 'War Cry', desc: '5 Voice Memos', icon: 'mic-vocal', earned: state.voiceMemos >= 5 },
        { title: 'Choir of One', desc: '25 Voice Memos', icon: 'library', earned: state.voiceMemos >= 25 },
        { title: 'The Archivist', desc: '100 Voice Memos', icon: 'archive', earned: state.voiceMemos >= 100 },
        { title: 'The Phoenix', desc: '30 Days after a Slip', icon: 'bird', earned: state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 30) },
        { title: 'Diamond Hands', desc: '1 Year, Zero Slips', icon: 'diamond', earned: state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 365) },
        { title: 'Vow of Silence', desc: '1 Yr on $0 Struggle', icon: 'wind', earned: state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365) },
        { title: 'Midnight Guard', desc: '10 Late Night Urges', icon: 'moon', earned: state.midnightUrges >= 10 },
        { title: 'Ritual Master', desc: 'Serenity Prayer 100x', icon: 'book-open', earned: state.amenClicks >= 100 },
        { title: 'Echo of Iron', desc: 'Memo after 1 Yr Clean', icon: 'speaker', earned: state.veteranMemos >= 1 },
        { title: 'The Monolith', desc: '1000 Days, Zero Slips', icon: 'landmark', earned: state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000) }
    ];

    const trophyContainer = document.getElementById('trophy-case');
    trophyContainer.innerHTML = trophies.map(t => `
        <div class="flex-shrink-0 w-[84px] h-24 rounded-2xl bg-white/${t.earned ? '60' : '20'} border ${t.earned ? 'border-yellow-400/50 shadow-md' : 'border-white/30'} flex flex-col items-center justify-center p-2 text-center transition-all duration-500">
            <i data-lucide="${t.icon}" class="w-6 h-6 mb-2 ${t.earned ? 'text-yellow-600 drop-shadow-sm' : 'text-slate-400 opacity-50'}"></i>
            <p class="text-[8px] font-bold uppercase tracking-tighter ${t.earned ? 'text-slate-800' : 'text-slate-500'} leading-tight mb-0.5">${t.title}</p>
            <p class="text-[7px] text-slate-500 font-medium leading-tight">${t.desc}</p>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// --- Audio Recording Logic ---
let mediaRecorder; let chunks = [];
let audioStream;

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
            t.objectStore("videos").add({ blob: b, date: new Date().toISOString() });
            
            const mainHabits = state.habits.filter(h => h.isMain);
            const currentMainStreak = mainHabits.length > 0 ? Math.min(...mainHabits.map(h => calculateStreak(h))) : 0;
            if (currentMainStreak >= 365) {
                state.veteranMemos = (state.veteranMemos || 0) + 1;
            }

            state.voiceMemos = (state.voiceMemos || 0) + 1;
            localStorage.setItem('steady_hand_state', JSON.stringify(state));
            
            t.oncomplete = () => {
                loadVault();
                renderDashboard();
            };
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
            
            d.innerHTML = `
                <div class="flex items-center gap-3 mb-4 bg-white/50 p-2 rounded-xl border border-white/60 shadow-inner">
                    <i data-lucide="mic" class="w-5 h-5 text-slate-700 shrink-0 ml-2"></i>
                    <audio src="${url}" controls class="w-full h-8 outline-none bg-transparent"></audio>
                </div>
                <div class="flex justify-between items-center text-[10px] uppercase font-bold text-slate-700 px-2">
                <span class="truncate max-w-[150px]">Captured ${new Date(cur.value.date).toLocaleDateString()}</span>
                <button onclick="deleteVideo(${cur.value.id})" class="text-red-600 bg-white/50 px-3 py-1 rounded-full shadow-sm hover:bg-red-50 transition-colors">Purge</button></div>`;
            c.appendChild(d); cur.continue();
        }
    };
    setTimeout(() => lucide.createIcons(), 50);
}

function deleteVideo(id) { if(confirm("Purge this voice recording permanently?")) db.transaction("videos", "readwrite").objectStore("videos").delete(id).onsuccess = loadVault; }

// --- Smarter Urge Engine Algorithm ---
let lastUrgeType = null;
let lastVerseIndex = -1;
let lastAudioId = -1;

async function triggerUrgeEngine() {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 4) {
        state.midnightUrges = (state.midnightUrges || 0) + 1;
    }

    state.urgeClicks = (state.urgeClicks || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderDashboard();
    
    const o = document.getElementById('urge-overlay'); o.classList.remove('hidden');
    const c = document.getElementById('urge-content');
    
    const vaultAudios = await new Promise(r => {
        const res = []; db.transaction("videos").objectStore("videos").openCursor().onsuccess = e => {
            if(e.target.result) { res.push(e.target.result.value); e.target.result.continue(); } else r(res);
        };
    });
    
    let choice = 'scripture';
    
    if (vaultAudios.length > 0) {
        if (lastUrgeType === 'audio') {
            choice = Math.random() > 0.8 ? 'audio' : 'scripture';
        } else {
            choice = Math.random() > 0.5 ? 'audio' : 'scripture';
        }
    }

    lastUrgeType = choice;

    if (choice === 'audio') {
        let audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
        let safetyCounter = 0;
        while (audioMatch.id === lastAudioId && vaultAudios.length > 1 && safetyCounter < 10) {
            audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
            safetyCounter++;
        }
        lastAudioId = audioMatch.id;

        const url = URL.createObjectURL(audioMatch.blob);

        c.innerHTML = `
            <i data-lucide="mic" class="w-16 h-16 text-slate-700 drop-shadow-sm mx-auto mb-6"></i>
            <h2 class="font-cinzel text-slate-800 mb-6 uppercase font-bold tracking-widest text-xl">Listen to Your Strength</h2>
            <div class="bg-white/60 p-4 rounded-2xl w-full max-w-sm shadow-xl border-2 border-white">
                <audio src="${url}" autoplay controls class="w-full outline-none"></audio>
            </div>
            <p class="text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-8">Breathe and Listen</p>
        `;
    } else {
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

// --- WALL OF WISDOM LOGIC ---
async function loadWallMessages() {
    const feed = document.getElementById('wall-feed');
    feed.innerHTML = '<div class="text-center text-slate-600 font-bold uppercase tracking-widest text-[10px] animate-pulse py-8">Loading global sanctuary...</div>';
    
    try {
        const res = await fetch(WORKER_API_URL);
        if (!res.ok) throw new Error("Network response was not ok");
        const messages = await res.json();
        
        if (messages.length === 0) {
            feed.innerHTML = '<div class="text-center text-slate-500 text-xs italic">The wall is quiet. Be the first to leave a mark.</div>';
            return;
        }

        feed.innerHTML = messages.map(m => `
            <div class="card-glass p-4 border-white/30">
                <p class="text-sm text-slate-800 font-medium leading-relaxed">"${m.text}"</p>
                <p class="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-3 text-right">- Anonymous</p>
            </div>
        `).join('');
    } catch(e) {
        feed.innerHTML = '<div class="text-center text-slate-500 text-xs italic">The connection to the global sanctuary is temporarily lost. If you have not deployed your Cloudflare Pages Function yet, the wall cannot load.</div>';
    }
}

async function postToWall() {
    const input = document.getElementById('wall-input');
    const text = input.value.trim();
    if(!text) return;

    input.value = '';
    
    const feed = document.getElementById('wall-feed');
    const newMsgHTML = `
        <div class="card-glass p-4 border-yellow-400/50 shadow-md">
            <p class="text-sm text-slate-800 font-medium leading-relaxed">"${text}"</p>
            <p class="text-[8px] text-yellow-600 uppercase tracking-widest font-bold mt-3 text-right">- You</p>
        </div>
    `;
    
    if(feed.innerHTML.includes('Loading') || feed.innerHTML.includes('quiet') || feed.innerHTML.includes('lost')) {
        feed.innerHTML = '';
    }
    feed.insertAdjacentHTML('afterbegin', newMsgHTML);

    try {
        await fetch(WORKER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
    } catch(e) {
        alert("Failed to permanently save message to the global wall.");
    }
}

// --- STRICT CALENDAR DATE LOGIC ---
function getStartOfDay(dateStr) {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return d;
}

function calculateTotalCleanDays(habit) {
    const today = getStartOfDay(new Date());
    const start = getStartOfDay(habit.startDate);
    
    const totalDaysElapsed = Math.floor(Math.max(0, today - start) / 86400000);
    const pastSlips = habit.slips.filter(s => getStartOfDay(s).getTime() < today.getTime());
    const uniquePastSlipDays = new Set(pastSlips.map(s => getStartOfDay(s).getTime())).size;
    
    return Math.max(0, totalDaysElapsed - uniquePastSlipDays);
}

function calculateTotalSaved(habit) {
    return calculateTotalCleanDays(habit) * habit.costPerDay;
}

function calculateStreak(habit) { 
    const today = getStartOfDay(new Date());
    let streakStart;
    
    if (habit.slips.length > 0) {
        const lastSlipDate = getStartOfDay(habit.slips[habit.slips.length - 1]);
        streakStart = new Date(lastSlipDate.getTime() + 86400000);
    } else {
        streakStart = getStartOfDay(habit.startDate);
    }
    
    const streakDays = Math.floor((today - streakStart) / 86400000);
    return Math.max(0, streakDays);
}

function calculateSuccessRate(h) { 
    const today = getStartOfDay(new Date());
    const start = getStartOfDay(h.startDate);
    const t = Math.max(1, Math.floor(Math.abs(today - start) / 86400000)); 
    
    const pastSlips = h.slips.filter(s => getStartOfDay(s).getTime() < today.getTime());
    const uniquePastSlipDays = new Set(pastSlips.map(s => getStartOfDay(s).getTime())).size;
    
    return Math.min(100, ((t - uniquePastSlipDays) / t) * 100); 
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
