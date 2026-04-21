// --- CLOUDFLARE PAGES FUNCTION API URL ---
const WORKER_API_URL = "/api/messages";

// --- i18n Merge & Translation Engine ---
if (typeof translations !== 'undefined' && typeof translations2 !== 'undefined') {
    for (const lang in translations2) {
        translations[lang] = translations2[lang];
    }
}

// Word-level fingerprints to distinguish Latin-based languages
const languageFingerprints = {
    "en": ["the", "and", "was", "for", "you", "with"],
    "es": ["el", "la", "que", "los", "con", "para"],
    "fr": ["le", "la", "des", "dans", "pour", "avec"],
    "de": ["der", "die", "und", "ist", "mit", "fuer"],
    "it": ["il", "che", "per", "con", "una", "del"],
    "pt": ["com", "uma", "para", "dos", "pelo", "mais"],
    "pl": ["jest", "bylo", "oraz", "dla", "przez", "przy"],
    "sw": ["na", "wa", "kwa", "katika", "ni", "ya"],
    "tl": ["ang", "mga", "ng", "sa", "ay", "na"]
};

function changeLanguage(langCode) {
    localStorage.setItem('tsh_language', langCode);
    window.location.reload();
}

function applyTranslations() {
    if (typeof translations === 'undefined') return;
    
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    const fallbackData = translations['en'];

    // Apply translations using innerHTML to preserve clickable links (Fixes the email bug)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = langData[key] || fallbackData[key];
        if (translatedText) el.innerHTML = translatedText;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translatedText = langData[key] || fallbackData[key];
        if (translatedText) el.placeholder = translatedText;
    });

    // Sync all dropdowns
    document.querySelectorAll('.lang-selector').forEach(select => {
        select.value = activeLang;
    });

    // SMART LIFELINES: Hide US numbers if the user is not in English mode
    const isEnglish = activeLang === 'en';
    const regionalLifelines = document.getElementById('regional-lifelines');
    const intlLifelines = document.getElementById('intl-lifelines');
    
    if (regionalLifelines) regionalLifelines.classList.toggle('hidden', !isEnglish);
    if (intlLifelines) intlLifelines.classList.toggle('hidden', isEnglish);

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- Core State & DB ---
let db;
const dbRequest = indexedDB.open("TSH_Database", 7);

dbRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if(!db.objectStoreNames.contains("videos")) db.createObjectStore("videos", { keyPath: "id", autoIncrement: true });
};

dbRequest.onsuccess = (e) => { 
    db = e.target.result; 
    if(document.getElementById('vault-list')) loadVault();
};

let state = { 
    setupComplete: false, 
    tutorialStep: 0, 
    habits:[], 
    urgeClicks: 0, 
    voiceMemos: 0,
    amenClicks: 0,
    midnightUrges: 0,
    middayUrges: 0,
    veteranMemos: 0,
    wallPosts: 0,
    safetyContact: { name: "", phone: "" }
};

const tutorialSteps =[
    { titleKey: "tut_1_title", descKey: "tut_1_desc", defaultTitle: "The War Room", defaultDesc: "This is TSH Command.", icon: "layout-dashboard" },
    { titleKey: "tut_2_title", descKey: "tut_2_desc", defaultTitle: "The Urge Engine", defaultDesc: "Trigger the Engine in crisis.", icon: "shield-alert" },
    { titleKey: "tut_3_title", descKey: "tut_3_desc", defaultTitle: "The Vault", defaultDesc: "Record your own voice.", icon: "lock" },
    { titleKey: "tut_4_title", descKey: "tut_4_desc", defaultTitle: "The Wall", defaultDesc: "Share anonymous wisdom.", icon: "globe" }
];

const rankTiers =[
    { nameKey: "rank_0", defaultName: "Initiate", daysReq: 0 }, { nameKey: "rank_1", defaultName: "Novice", daysReq: 7 }, { nameKey: "rank_2", defaultName: "Fighter", daysReq: 30 },
    { nameKey: "rank_3", defaultName: "Warrior", daysReq: 90 }, { nameKey: "rank_4", defaultName: "Sentinel", daysReq: 180 }, { nameKey: "rank_5", defaultName: "Vanguard", daysReq: 365 },
    { nameKey: "rank_6", defaultName: "Champion", daysReq: 730 }, { nameKey: "rank_7", defaultName: "Titan", daysReq: 1095 }, { nameKey: "rank_8", defaultName: "Paragon", daysReq: 1460 },
    { nameKey: "rank_9", defaultName: "Legend", daysReq: 1825 }
];

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function init() {
    lucide.createIcons();
    let savedState = localStorage.getItem('steady_hand_state');
    
    if (savedState) {
        try {
            state = JSON.parse(savedState);
            state.habits = state.habits ||[];
            state.urgeClicks = state.urgeClicks || 0;
            state.voiceMemos = state.voiceMemos || 0;
            state.amenClicks = state.amenClicks || 0;
            state.midnightUrges = state.midnightUrges || 0;
            state.middayUrges = state.middayUrges || 0;
            state.veteranMemos = state.veteranMemos || 0;
            state.wallPosts = state.wallPosts || 0;
            state.safetyContact = state.safetyContact || { name: "", phone: "" };
            state.habits.forEach(h => { if(h.isMain === undefined) h.isMain = true; });
        } catch(e) {
            localStorage.removeItem('steady_hand_state');
            savedState = null;
        }
    } 
    
    if (!savedState) {
        showScreen('welcome');
        addHabitField(); 
    } else {
        if (state.setupComplete) showScreen('gateway');
        else showScreen('welcome');
    }

    applyTranslations();
    updateDate();
    renderDashboard();
    renderSafetyContact();

    const refreshDashboardIfVisible = () => {
        if (!document.getElementById('screen-main').classList.contains('hidden')) {
            updateDate();
            renderDashboard();
        }
    };
    window.addEventListener('focus', refreshDashboardIfVisible);
    setInterval(refreshDashboardIfVisible, 60000); 
}

function showScreen(screen) {
    document.querySelectorAll('[id^="screen-"]').forEach(s => s.classList.add('hidden'));
    const targetEl = document.getElementById(`screen-${screen}`);
    if (targetEl) targetEl.classList.remove('hidden');
    
    const nav = document.getElementById('app-nav');
    if (['welcome', 'creator-note', 'explanation', 'setup', 'gateway', 'support'].includes(screen)) nav.classList.add('hidden');
    else nav.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('nav-active', l.dataset.nav === screen);
        l.classList.toggle('text-slate-500', l.dataset.nav !== screen);
    });
    
    if (screen === 'vault') loadVault();
    if (screen === 'wall') loadWallMessages();
    if (screen === 'support') renderSafetyContact();
    if (screen === 'main') {
        updateDate(); renderDashboard();
        if (state.tutorialStep === 0 || state.tutorialStep === undefined) startTutorial();
    }
    
    lucide.createIcons();
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'instant' }); if (targetEl) targetEl.scrollTop = 0; }, 10);
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
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    document.getElementById('tut-title').innerText = langData[step.titleKey] || step.defaultTitle;
    document.getElementById('tut-desc').innerText = langData[step.descKey] || step.defaultDesc;
    state.tutorialStep++;
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
    const langData = translations[typeof currentLang !== 'undefined' ? currentLang : 'en'] || translations['en'];
    
    div.innerHTML = `
        <button onclick="this.parentElement.remove()" class="absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1.5 shadow-md"><i data-lucide="x" class="w-3 h-3"></i></button>
        <input type="text" placeholder="${escapeHTML(langData.setup_ph_struggle)}" class="habit-name w-full rounded-lg p-3 text-sm uppercase font-bold shadow-inner">
        <input type="number" placeholder="${escapeHTML(langData.setup_ph_cost)}" class="habit-cost w-full rounded-lg p-3 text-sm shadow-inner" min="0">
        <div class="flex items-center justify-between mt-2 px-1">
            <label class="text-[10px] uppercase font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="habit-main w-4 h-4 rounded border-slate-400 text-slate-800 focus:ring-slate-800" checked>
                ${escapeHTML(langData.setup_main_label)}
            </label>
        </div>
    `;
    container.appendChild(div);
    lucide.createIcons();
}

async function saveInitialSetup() {
    const habitEls = document.querySelectorAll('#habit-inputs > div');
    if (habitEls.length === 0) return alert("Please add at least one struggle to forge your shield.");
    state.habits =[];
    habitEls.forEach(el => {
        const name = el.querySelector('.habit-name').value;
        const cost = el.querySelector('.habit-cost').value || 0;
        const isMain = el.querySelector('.habit-main').checked;
        if (name) state.habits.push({ id: 'h_' + Date.now() + Math.random(), name, costPerDay: parseFloat(cost) || 0, startDate: new Date().toISOString(), slips:[], isMain });
    });
    state.setupComplete = true; state.tutorialStep = 0;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    showScreen('gateway'); renderDashboard();
}

function clickAmen() {
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    state.amenClicks = (state.amenClicks || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    showScreen('main');
}

function saveSafetyContact() {
    state.safetyContact = { name: document.getElementById('safety-name').value, phone: document.getElementById('safety-phone').value };
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderSafetyContact();
    alert("Safety dial locked in.");
}

function renderSafetyContact() {
    const { name, phone } = state.safetyContact;
    const callBtn = document.getElementById('safety-call-btn');
    const textBtn = document.getElementById('safety-text-btn');
    const safetyNameInput = document.getElementById('safety-name');
    const safetyPhoneInput = document.getElementById('safety-phone');

    if(safetyNameInput && safetyPhoneInput) {
        safetyNameInput.value = state.safetyContact.name || "";
        safetyPhoneInput.value = state.safetyContact.phone || "";
    }

    if (callBtn && textBtn && phone) {
        document.getElementById('safety-display-name').innerText = name || "Contact";
        callBtn.href = `tel:${phone}`; textBtn.href = `sms:${phone}`;
        callBtn.classList.remove('opacity-50', 'pointer-events-none');
        textBtn.classList.remove('opacity-50', 'pointer-events-none');
    } else if (callBtn && textBtn) {
        document.getElementById('safety-display-name').innerText = "";
        callBtn.classList.add('opacity-50', 'pointer-events-none');
        textBtn.classList.add('opacity-50', 'pointer-events-none');
    }
}

function renderDashboard() {
    const container = document.getElementById('dashboard-habits');
    if (!container) return; container.innerHTML = '';
    let totalSavedValue = 0; let activeStrugglesCount = 0;
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    
    state.habits.forEach(habit => {
        const streakDays = calculateStreak(habit);
        const cleanDays = calculateTotalCleanDays(habit);
        totalSavedValue += cleanDays * habit.costPerDay;
        if (streakDays > 0) activeStrugglesCount++;
        const badge = habit.isMain ? langData.explanation_main_badge : langData.explanation_sec_badge;
        const div = document.createElement('div');
        div.className = 'card-glass p-5';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-slate-800 font-cinzel text-sm uppercase font-bold mb-1">${escapeHTML(habit.name)} <span class="text-[8px] bg-slate-800 text-white px-2 py-0.5 rounded-full ml-2 align-middle">${badge}</span></h3>
                    <p class="text-3xl font-bold text-slate-800">${streakDays} <span class="text-[10px] text-slate-600 uppercase font-semibold">${langData.dash_days_won}</span></p>
                </div>
                <button onclick="logSlip('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full shadow-sm">${langData.dash_log_slip}</button>
            </div>
            <div class="bg-white/60 h-2 rounded-full overflow-hidden shadow-inner"><div class="bg-slate-700 h-full" style="width: ${calculateSuccessRate(habit)}%"></div></div>
        `;
        container.appendChild(div);
    });

    const mainHabits = state.habits.filter(h => h.isMain);
    let currentMainStreak = 0;
    if (mainHabits.length > 0) currentMainStreak = Math.min(...mainHabits.map(h => calculateStreak(h)));
    else if (state.habits.length > 0) currentMainStreak = Math.min(...state.habits.map(h => calculateStreak(h)));

    let currentRank = rankTiers[0]; let nextRank = rankTiers[1];
    for(let i=0; i<rankTiers.length; i++) {
        if (currentMainStreak >= rankTiers[i].daysReq) {
            currentRank = rankTiers[i];
            nextRank = rankTiers[i+1] || rankTiers[i];
        }
    }
    
    let progressPct = 100;
    let daysText = `${currentMainStreak} ${langData.dash_days || 'Days'} (MAX)`;
    if (currentRank !== nextRank) {
        progressPct = ((currentMainStreak - currentRank.daysReq) / (nextRank.daysReq - currentRank.daysReq)) * 100;
        daysText = `${currentMainStreak} / ${nextRank.daysReq} ${langData.dash_days || 'Days'}`;
    }
    progressPct = Math.max(0, Math.min(100, progressPct));

    document.getElementById('rank-name').innerText = langData[currentRank.nameKey] || currentRank.defaultName;
    document.getElementById('xp-text').innerText = daysText;
    document.getElementById('rank-progress').style.width = `${progressPct}%`;
    document.getElementById('total-saved').innerText = `$${totalSavedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    const trophies = typeof generateAllTrophies === 'function' ? generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) :[];
    document.getElementById('trophy-case').innerHTML = trophies.map(t => `
        <div class="flex-shrink-0 w-[84px] h-24 rounded-2xl bg-white/${t.earned ? '60' : '20'} border ${t.earned ? 'border-yellow-400/50 shadow-md' : 'border-white/30'} flex flex-col items-center justify-center p-2 text-center transition-all duration-500">
            <i data-lucide="${t.icon}" class="w-6 h-6 mb-1 ${t.earned ? 'text-yellow-600' : 'text-slate-400 opacity-50'}"></i>
            <p class="text-[8px] font-bold uppercase tracking-tighter ${t.earned ? 'text-slate-800' : 'text-slate-500'} leading-tight">${escapeHTML(t.title)}</p>
            <p class="text-[6px] uppercase tracking-widest ${t.earned ? 'text-slate-600' : 'text-slate-400'} mt-1">${escapeHTML(t.desc)}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

let mediaRecorder; let chunks =[]; let audioStream;
async function startRecording() {
    try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioStream = s;
        document.getElementById('record-placeholder').classList.add('hidden');
        document.getElementById('recording-active').classList.remove('hidden');
        document.getElementById('recording-active').classList.add('flex');
        
        mediaRecorder = new MediaRecorder(s); chunks =[];
        mediaRecorder.ondataavailable = e => { if(e.data.size > 0) chunks.push(e.data); };
        mediaRecorder.onstop = () => {
            if (chunks.length === 0) return;
            const mimeType = mediaRecorder.mimeType || '';
            const b = new Blob(chunks, mimeType ? { type: mimeType } : undefined);
            const t = db.transaction(["videos"], "readwrite");
            t.objectStore("videos").add({ blob: b, date: new Date().toISOString() });
            
            const mainHabits = state.habits.filter(h => h.isMain);
            const currentMainStreak = mainHabits.length > 0 ? Math.min(...mainHabits.map(h => calculateStreak(h))) : 0;
            if (currentMainStreak >= 365) state.veteranMemos = (state.veteranMemos || 0) + 1;

            state.voiceMemos = (state.voiceMemos || 0) + 1;
            localStorage.setItem('steady_hand_state', JSON.stringify(state));
            t.oncomplete = () => { loadVault(); renderDashboard(); };
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

let lastUrgeType = null; let lastVerseIndex = -1; let lastAudioId = -1;
async function triggerUrgeEngine() {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 4) state.midnightUrges = (state.midnightUrges || 0) + 1;
    else if (currentHour >= 11 && currentHour <= 14) state.middayUrges = (state.middayUrges || 0) + 1;
    
    state.urgeClicks = (state.urgeClicks || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderDashboard();
    
    const o = document.getElementById('urge-overlay'); o.classList.remove('hidden');
    const c = document.getElementById('urge-content');
    
    const vaultAudios = await new Promise(r => {
        if (!db) return r([]); 
        const res =[]; 
        db.transaction("videos").objectStore("videos").openCursor().onsuccess = e => {
            if(e.target.result) { res.push(e.target.result.value); e.target.result.continue(); } else r(res);
        };
    });
    
    let choice = 'scripture';
    if (vaultAudios.length > 0) {
        if (lastUrgeType === 'audio') choice = Math.random() > 0.8 ? 'audio' : 'scripture';
        else choice = Math.random() > 0.5 ? 'audio' : 'scripture';
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
        const safeScriptures = (typeof scriptures !== 'undefined' && scriptures[typeof currentLang !== 'undefined' ? currentLang : 'en']) 
            ? scriptures[typeof currentLang !== 'undefined' ? currentLang : 'en'] 
            :[{text: "Breathe. Focus on your strength. You can overcome this.", ref: "The Steady Hand"}];

        let nextIndex = Math.floor(Math.random() * safeScriptures.length);
        while (nextIndex === lastVerseIndex && safeScriptures.length > 1) {
            nextIndex = Math.floor(Math.random() * safeScriptures.length);
        }
        lastVerseIndex = nextIndex;
        const randomScripture = safeScriptures[nextIndex];
        
        c.innerHTML = `<i data-lucide="sun" class="w-16 h-16 text-slate-700 drop-shadow-sm mx-auto mb-8"></i>
            <h2 class="text-2xl font-cinzel text-slate-800 drop-shadow-sm leading-relaxed px-4 italic font-bold">"${escapeHTML(randomScripture.text)}"</h2>
            <p class="text-sm font-bold text-slate-600 mt-6">${escapeHTML(randomScripture.ref)}</p>
            <div class="mt-12 bg-white/40 py-2 px-6 rounded-full inline-block shadow-sm border border-white/50">
                <p class="text-[10px] text-slate-700 uppercase tracking-widest font-bold">Breathe for 60 seconds.</p>
            </div>`;
    }
    setTimeout(() => lucide.createIcons(), 50);
}

// --- WALL OF WISDOM LOGIC ---
let currentWallOffset = 0;
let isFetchingWall = false;

async function loadWallMessages(append = false) {
    if (isFetchingWall) return;
    isFetchingWall = true;

    const feed = document.getElementById('wall-feed');
    
    // If not appending (initial load), reset offset and clear feed
    if (!append) {
        currentWallOffset = 0;
        feed.innerHTML = '<div id="wall-placeholder" class="text-center text-slate-600 font-bold uppercase tracking-widest text-[10px] animate-pulse py-8">Loading global sanctuary...</div>';
    } else {
        // Remove the previous "Load More" button while loading
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) loadMoreBtn.remove();
        feed.insertAdjacentHTML('beforeend', '<div id="wall-placeholder-more" class="text-center text-slate-600 font-bold uppercase tracking-widest text-[10px] animate-pulse py-4">Reaching deeper into the sanctuary...</div>');
    }
    
    try {
        const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
        const res = await fetch(`${WORKER_API_URL}?offset=${currentWallOffset}&lang=${activeLang}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const messages = await res.json();
        
        // Clean up loading placeholders
        const placeholder1 = document.getElementById('wall-placeholder');
        const placeholder2 = document.getElementById('wall-placeholder-more');
        if (placeholder1) placeholder1.remove();
        if (placeholder2) placeholder2.remove();

        if (messages.length === 0 && !append) {
            feed.innerHTML = '<div id="wall-placeholder" class="text-center text-slate-500 text-xs italic">The wall is quiet. Be the first to leave a mark.</div>';
            isFetchingWall = false;
            return;
        }

        // Map the messages (Removed character limits and "Read More" button entirely)
        const messagesHTML = messages.map(m => `
            <div class="card-glass p-4 border-white/30 wall-message select-none transition-transform" data-id="${escapeHTML(String(m.id))}">
                <div class="cursor-pointer active:scale-[0.98] transition-transform" onclick="handleMessageTap(this.parentElement, ${m.id})">
                    <p class="text-sm text-slate-800 font-medium leading-relaxed msg-body whitespace-pre-wrap">"${escapeHTML(m.text)}"</p>
                </div>
                <p class="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-3 text-right pointer-events-none">- Anonymous</p>
            </div>
        `).join('');

        if (append) {
            feed.insertAdjacentHTML('beforeend', messagesHTML);
        } else {
            feed.innerHTML = messagesHTML;
        }

        // Staggered Load: If we received exactly 50 messages, there are likely more in the database
        if (messages.length === 50) {
            currentWallOffset += 50;
            feed.insertAdjacentHTML('beforeend', `
                <button id="load-more-btn" onclick="loadWallMessages(true)" class="w-full bg-white/60 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] text-slate-800 border border-white shadow-sm mt-2 active:scale-95 transition-transform">
                    Load Older Messages
                </button>
            `);
        }

    } catch(e) {
        const placeholder = document.getElementById('wall-placeholder') || document.getElementById('wall-placeholder-more');
        if (placeholder) placeholder.innerHTML = 'The connection to the global sanctuary is temporarily lost.';
    }
    
    isFetchingWall = false;
}

function isAlreadyInLanguage(text, targetLang) {
    const scripts = { "ar": /[\u0600-\u06FF]/, "he": /[\u0590-\u05FF]/, "zh": /[\u4e00-\u9fa5]/, "ja": /[\u3040-\u30ff]/, "ko": /[\uac00-\ud7af]/, "ru": /[\u0400-\u04FF]/, "hi": /[\u0900-\u097F]/ };
    for (const [lang, regex] of Object.entries(scripts)) { if (regex.test(text)) return targetLang === lang; }
    if (languageFingerprints[targetLang]) {
        const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);
        return words.filter(word => languageFingerprints[targetLang].includes(word)).length > 0;
    }
    return false;
}

async function handleMessageTap(element, msgId) {
    const textEl = element.querySelector('.msg-body');
    const originalText = textEl.innerText.replace(/"/g, '');
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    if (isAlreadyInLanguage(originalText, activeLang)) {
        if (element.getAttribute('data-attempted')) return;
        element.setAttribute('data-attempted', 'true');
    }
    textEl.classList.add('animate-pulse'); textEl.innerText = "...";
    try {
        const res = await fetch(`${WORKER_API_URL}?id=${msgId}&lang=${activeLang}`);
        const data = await res.json();
        textEl.innerText = `"${data.translatedText}"`;
        textEl.classList.remove('animate-pulse');
        element.onclick = null; element.classList.remove('cursor-pointer');
    } catch (e) { textEl.innerText = `"${originalText}"`; textEl.classList.remove('animate-pulse'); }
}

async function postToWall() {
    const input = document.getElementById('wall-input');
    const text = input.value.trim();
    if(!text) return;

    input.value = '';
    
    const feed = document.getElementById('wall-feed');
    const placeholder = document.getElementById('wall-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }
    
    // Instantly show the user's uncapped message at the top
    const newMsgHTML = `
        <div class="card-glass p-4 border-yellow-400/50 shadow-md">
            <p class="text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-wrap">"${escapeHTML(text)}"</p>
            <p class="text-[8px] text-yellow-600 uppercase tracking-widest font-bold mt-3 text-right">- You</p>
        </div>
    `;
    
    feed.insertAdjacentHTML('afterbegin', newMsgHTML);

    state.wallPosts = (state.wallPosts || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));

    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    try {
        await fetch(WORKER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language: activeLang })
        });
    } catch(e) {
        alert("Failed to permanently save message to the global wall.");
    }
}

// --- UTILITIES ---
function getStartOfDay(dateStr) { const d = new Date(dateStr); d.setHours(0, 0, 0, 0); return d; }
function calculateTotalCleanDays(habit) {
    const today = getStartOfDay(new Date());
    const start = getStartOfDay(habit.startDate);
    const totalDaysElapsed = Math.round(Math.max(0, today - start) / 86400000); 
    const pastSlips = habit.slips.filter(s => getStartOfDay(s).getTime() < today.getTime());
    const uniquePastSlipDays = new Set(pastSlips.map(s => getStartOfDay(s).getTime())).size;
    return Math.max(0, totalDaysElapsed - uniquePastSlipDays);
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
    return Math.max(0, Math.round((today - streakStart) / 86400000));
}
function calculateSuccessRate(h) { 
    const today = getStartOfDay(new Date());
    const start = getStartOfDay(h.startDate);
    const t = Math.max(1, Math.round(Math.abs(today - start) / 86400000)); 
    const pastSlips = h.slips.filter(s => getStartOfDay(s).getTime() < today.getTime());
    const uniquePastSlipDays = new Set(pastSlips.map(s => getStartOfDay(s).getTime())).size;
    return Math.max(0, Math.min(100, ((t - uniquePastSlipDays) / t) * 100)); 
}
function logSlip(id) { 
    const h = state.habits.find(x=>x.id === id); 
    if(h) { 
        h.slips.push(new Date().toISOString()); 
        localStorage.setItem('steady_hand_state', JSON.stringify(state)); 
        renderDashboard(); 
    } 
}
function closeUrgeEngine() { document.getElementById('urge-overlay').classList.add('hidden'); }
function toggleSettings() { document.getElementById('modal-settings').classList.toggle('hidden'); lucide.createIcons(); }
function updateDate() { 
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    document.getElementById('date-display').innerText = new Date().toLocaleDateString(activeLang, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); 
}
function resetApp() { 
    if(confirm("DELETE ALL DATA? This erases all progress and voice notes permanently.")) { 
        localStorage.clear(); 
        indexedDB.deleteDatabase("TSH_Database"); 
        window.location.reload(); 
    } 
}
window.onload = init;
