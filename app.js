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

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = langData[key] || fallbackData[key];
        if (translatedText) el.innerText = translatedText;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translatedText = langData[key] || fallbackData[key];
        if (translatedText) el.placeholder = translatedText;
    });

    document.querySelectorAll('.lang-selector').forEach(select => {
        select.value = activeLang;
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- Core State & DB ---
let db;
const dbRequest = indexedDB.open("TSH_Database", 4);

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
    { name: "Initiate", daysReq: 0 }, { name: "Novice", daysReq: 7 }, { name: "Fighter", daysReq: 30 },
    { name: "Warrior", daysReq: 90 }, { name: "Sentinel", daysReq: 180 }, { name: "Vanguard", daysReq: 365 },
    { name: "Champion", daysReq: 730 }, { name: "Titan", daysReq: 1095 }, { name: "Paragon", daysReq: 1460 },
    { name: "Legend", daysReq: 1825 }
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

function addHabitField() {
    const container = document.getElementById('habit-inputs');
    const div = document.createElement('div');
    div.className = 'card-glass p-4 space-y-3 relative';
    const langData = translations[typeof currentLang !== 'undefined' ? currentLang : 'en'] || translations['en'];
    div.innerHTML = `
        <button onclick="this.parentElement.remove()" class="absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1.5 shadow-md"><i data-lucide="x" class="w-3 h-3"></i></button>
        <input type="text" placeholder="${escapeHTML(langData.setup_ph_struggle)}" class="habit-name w-full rounded-lg p-3 text-sm uppercase font-bold tracking-wider">
        <input type="number" placeholder="${escapeHTML(langData.setup_ph_cost)}" class="habit-cost w-full rounded-lg p-3 text-sm" min="0">
        <div class="flex items-center justify-between mt-2 px-1">
            <label class="text-[10px] uppercase font-bold text-slate-700 flex items-center gap-2">
                <input type="checkbox" class="habit-main w-4 h-4 rounded border-slate-400" checked>
                ${escapeHTML(langData.setup_main_label)}
            </label>
        </div>
    `;
    container.appendChild(div);
    lucide.createIcons();
}

async function saveInitialSetup() {
    const habitEls = document.querySelectorAll('#habit-inputs > div');
    if (habitEls.length === 0) return alert("Please add at least one struggle.");
    state.habits =[];
    habitEls.forEach(el => {
        const name = el.querySelector('.habit-name').value;
        const cost = el.querySelector('.habit-cost').value || 0;
        const isMain = el.querySelector('.habit-main').checked;
        if (name) state.habits.push({ id: 'h_' + Date.now() + Math.random(), name, costPerDay: parseFloat(cost), startDate: new Date().toISOString(), slips:[], isMain });
    });
    state.setupComplete = true; state.tutorialStep = 0;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    showScreen('gateway'); renderDashboard();
}

function clickAmen() {
    state.amenClicks = (state.amenClicks || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    showScreen('main');
}

function saveSafetyContact() {
    state.safetyContact = { name: document.getElementById('safety-name').value, phone: document.getElementById('safety-phone').value };
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderSafetyContact();
    alert("Safety dial locked.");
}

function renderSafetyContact() {
    const { name, phone } = state.safetyContact;
    const callBtn = document.getElementById('safety-call-btn');
    const textBtn = document.getElementById('safety-text-btn');
    if (callBtn && textBtn && phone) {
        document.getElementById('safety-display-name').innerText = name || "Contact";
        callBtn.href = `tel:${phone}`; textBtn.href = `sms:${phone}`;
        callBtn.classList.remove('opacity-50', 'pointer-events-none');
        textBtn.classList.remove('opacity-50', 'pointer-events-none');
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
                    <h3 class="text-slate-800 font-cinzel text-sm uppercase font-bold mb-1">${escapeHTML(habit.name)} <span class="text-[8px] bg-slate-800 text-white px-2 py-0.5 rounded-full ml-2">${badge}</span></h3>
                    <p class="text-3xl font-bold text-slate-800">${streakDays} <span class="text-[10px] text-slate-600 uppercase font-semibold">${langData.dash_days_won}</span></p>
                </div>
                <button onclick="logSlip('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full">${langData.dash_log_slip}</button>
            </div>
        `;
        container.appendChild(div);
    });

    const mainStreak = state.habits.length ? Math.min(...state.habits.filter(h => h.isMain).map(calculateStreak)) : 0;
    let currentRank = rankTiers[0]; let nextRank = rankTiers[1];
    for (let r of rankTiers) { if (mainStreak >= r.daysReq) { currentRank = r; nextRank = rankTiers[rankTiers.indexOf(r)+1] || r; } }
    
    document.getElementById('rank-name').innerText = currentRank.name;
    document.getElementById('xp-text').innerText = `${mainStreak} / ${nextRank.daysReq} Days`;
    document.getElementById('rank-progress').style.width = `${(mainStreak / nextRank.daysReq) * 100}%`;
    document.getElementById('total-saved').innerText = `$${totalSavedValue.toFixed(2)}`;

    const trophies = generateAllTrophies(state, mainStreak, totalSavedValue, activeStrugglesCount, calculateStreak);
    document.getElementById('trophy-case').innerHTML = trophies.map(t => `
        <div class="flex-shrink-0 w-[84px] h-24 rounded-2xl bg-white/${t.earned ? '60' : '20'} border ${t.earned ? 'border-yellow-400/50' : 'border-white/30'} flex flex-col items-center justify-center p-2 text-center">
            <i data-lucide="${t.icon}" class="w-6 h-6 mb-2 ${t.earned ? 'text-yellow-600' : 'text-slate-400 opacity-50'}"></i>
            <p class="text-[8px] font-bold uppercase ${t.earned ? 'text-slate-800' : 'text-slate-500'} leading-tight">${escapeHTML(t.title)}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

async function startRecording() {
    try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(s); chunks =[];
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const b = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
            db.transaction(["videos"], "readwrite").objectStore("videos").add({ blob: b, date: new Date().toISOString() });
            state.voiceMemos++; localStorage.setItem('steady_hand_state', JSON.stringify(state)); loadVault();
        };
        mediaRecorder.start();
        document.getElementById('btn-start-record').classList.add('hidden');
        document.getElementById('btn-stop-record').classList.remove('hidden');
        document.getElementById('record-placeholder').classList.add('hidden');
        document.getElementById('recording-active').classList.remove('hidden');
    } catch (err) { alert("Mic access required."); }
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('btn-start-record').classList.remove('hidden');
    document.getElementById('btn-stop-record').classList.add('hidden');
    document.getElementById('record-placeholder').classList.remove('hidden');
    document.getElementById('recording-active').classList.add('hidden');
}

function loadVault() {
    const c = document.getElementById('vault-list'); if (!c) return; c.innerHTML = '';
    db.transaction("videos", "readonly").objectStore("videos").openCursor(null, 'prev').onsuccess = e => {
        const cur = e.target.result;
        if(cur) {
            const url = URL.createObjectURL(cur.value.blob);
            const d = document.createElement('div'); d.className = 'card-glass p-4';
            d.innerHTML = `<audio src="${url}" controls class="w-full h-8 mb-2"></audio>
                <div class="flex justify-between text-[10px] uppercase font-bold">
                <span>${new Date(cur.value.date).toLocaleDateString()}</span>
                <button onclick="deleteVideo(${cur.value.id})" class="text-red-600">Purge</button></div>`;
            c.appendChild(d); cur.continue();
        }
    };
}

function deleteVideo(id) { if(confirm("Purge recording?")) db.transaction("videos", "readwrite").objectStore("videos").delete(id).onsuccess = loadVault; }

async function triggerUrgeEngine() {
    state.urgeClicks++; localStorage.setItem('steady_hand_state', JSON.stringify(state));
    document.getElementById('urge-overlay').classList.remove('hidden');
    const c = document.getElementById('urge-content');
    const safeScriptures = scriptures[typeof currentLang !== 'undefined' ? currentLang : 'en'] || scriptures['en'];
    const randomScripture = safeScriptures[Math.floor(Math.random() * safeScriptures.length)];
    c.innerHTML = `<h2 class="text-2xl font-cinzel italic font-bold">"${escapeHTML(randomScripture.text)}"</h2><p class="mt-6 font-bold text-slate-600">${escapeHTML(randomScripture.ref)}</p>`;
    lucide.createIcons();
}

async function loadWallMessages() {
    const feed = document.getElementById('wall-feed');
    feed.innerHTML = '<div class="text-center animate-pulse py-8 uppercase text-[10px] font-bold">Loading Sanctuary...</div>';
    try {
        const res = await fetch(WORKER_API_URL);
        const messages = await res.json();
        feed.innerHTML = messages.map(m => `
            <div class="card-glass p-4 wall-message active:scale-[0.98] transition-transform cursor-pointer" onclick="handleMessageTap(this, ${m.id})">
                <p class="text-sm font-medium msg-body">"${escapeHTML(m.text)}"</p>
                <p class="text-[8px] uppercase font-bold mt-3 text-right">- Anonymous</p>
            </div>
        `).join('');
    } catch(e) { feed.innerHTML = '<div class="text-center text-xs italic">Connection lost.</div>'; }
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
    const input = document.getElementById('wall-input'); const text = input.value.trim(); if(!text) return;
    input.value = '';
    const newMsgHTML = `<div class="card-glass p-4 border-yellow-400/50"><p class="text-sm font-medium">"${escapeHTML(text)}"</p><p class="text-[8px] uppercase font-bold mt-3 text-right">- You</p></div>`;
    document.getElementById('wall-feed').insertAdjacentHTML('afterbegin', newMsgHTML);
    state.wallPosts++; localStorage.setItem('steady_hand_state', JSON.stringify(state));
    await fetch(WORKER_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
}

function getStartOfDay(d) { const date = new Date(d); date.setHours(0,0,0,0); return date; }
function calculateTotalCleanDays(h) {
    const total = Math.round((getStartOfDay(new Date()) - getStartOfDay(h.startDate)) / 86400000);
    return Math.max(0, total - new Set(h.slips.map(s => getStartOfDay(s).getTime())).size);
}
function calculateStreak(h) {
    const today = getStartOfDay(new Date());
    const last = h.slips.length ? getStartOfDay(h.slips[h.slips.length-1]) : null;
    const start = last ? new Date(last.getTime() + 86400000) : getStartOfDay(h.startDate);
    return Math.max(0, Math.round((today - start) / 86400000));
}
function logSlip(id) { const h = state.habits.find(x=>x.id === id); if(h) { h.slips.push(new Date().toISOString()); localStorage.setItem('steady_hand_state', JSON.stringify(state)); renderDashboard(); } }
function closeUrgeEngine() { document.getElementById('urge-overlay').classList.add('hidden'); }
function toggleSettings() { document.getElementById('modal-settings').classList.toggle('hidden'); lucide.createIcons(); }
function updateDate() { document.getElementById('date-display').innerText = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
function resetApp() { if(confirm("ERASE ALL DATA?")) { localStorage.clear(); indexedDB.deleteDatabase("TSH_Database"); window.location.reload(); } }
window.onload = init;
