// --- CLOUDFLARE PAGES FUNCTION API URL ---
const WORKER_API_URL = "/api/messages";

// --- i18n Merge & Translation Engine ---
if (typeof translations !== 'undefined') {
    if (typeof translations2 !== 'undefined') {
        for (const lang in translations2) {
            translations[lang] = translations2[lang];
        }
    }
    if (typeof translations3 !== 'undefined') {
        for (const lang in translations3) {
            translations[lang] = translations3[lang];
        }
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
    "tl": ["ang", "mga", "ng", "sa", "ay", "na"],
    "ms": ["yang", "dan", "di", "untuk", "dengan", "itu"],
    "nl": ["de", "het", "een", "van", "en", "voor"],
    "sv": ["och", "det", "att", "för", "med", "som"],
    "ro": ["și", "care", "pentru", "este", "cu", "din"],
    "cs": ["že", "před", "může", "jsem", "bude", "jako"],
    "tr": ["ve", "bir", "bu", "için", "ile", "olan"],
    "vi": ["và", "của", "là", "cho", "với", "những"],
    "id": ["dan", "yang", "untuk", "dengan", "ini", "adalah"],
    "ha": ["da", "amma", "wannan", "domin", "kuma", "ba"],
    "yo": ["àti", "fún", "pẹ̀lú", "nítorí", "ṣùgbọ́n", "yìí"],
    "zu": ["futhi", "kodwa", "ngoba", "uma", "lena", "kule"]
};

// --- Currency Mappings ---
const currencyCodes = {
    "en": "USD", "es": "EUR", "fr": "EUR", "de": "EUR", "it": "EUR", 
    "pt": "BRL", "pl": "PLN", "sw": "KES", "tl": "PHP", "ar": "AED", 
    "he": "ILS", "zh": "CNY", "ja": "JPY", "ko": "KRW", "ru": "RUB", "hi": "INR",
    "ms": "MYR", "fa": "IRR", "ur": "PKR", "uk": "UAH",
    "nl": "EUR", "sv": "SEK", "el": "EUR", "ro": "RON", "cs": "CZK",
    "tr": "TRY", "vi": "VND", "th": "THB", "id": "IDR", "bn": "BDT",
    "ta": "INR", "am": "ETB", "ha": "NGN", "yo": "NGN", "zu": "ZAR"
};

const currencySymbols = {
    "en": "$", "es": "€", "fr": "€", "de": "€", "it": "€", 
    "pt": "R$", "pl": "zł", "sw": "KSh", "tl": "₱", "ar": "د.إ", 
    "he": "₪", "zh": "¥", "ja": "¥", "ko": "₩", "ru": "₽", "hi": "₹",
    "ms": "RM", "fa": "﷼", "ur": "₨", "uk": "₴",
    "nl": "€", "sv": "kr", "el": "€", "ro": "lei", "cs": "Kč",
    "tr": "₺", "vi": "₫", "th": "฿", "id": "Rp", "bn": "৳",
    "ta": "₹", "am": "Br", "ha": "₦", "yo": "₦", "zu": "R"
};

function changeLanguage(langCode) {
    localStorage.setItem('tsh_language', langCode);
    window.location.reload();
}

function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
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

    // Localize Country Selector Dropdown
    const countrySelect = document.getElementById('support-country-select');
    if (countrySelect) {
        Array.from(countrySelect.options).forEach(opt => {
            const meta = countryNames[opt.value];
            if (meta) {
                const dict = localizedCountryDictionary[opt.value];
                const localizedName = (dict && dict[activeLang]) || langData[meta.key] || fallbackData[meta.key] || meta.default;
                opt.textContent = `${meta.flag} ${localizedName}`;
            }
        });
        const labelEl = document.querySelector('label[for="support-country-select"] [data-i18n="support_select_country_label"]');
        if (labelEl) {
            const dict = localizedCountryDictionary['support_select_country_label'];
            labelEl.textContent = (dict && dict[activeLang]) || langData.support_select_country_label || fallbackData.support_select_country_label || "Select Your Country / Region";
        }
    }

    renderLifelines();
    renderIcons();
}

// --- Country / Regional Lifelines Data & Dynamic Renderer ---
const localizedCountryDictionary = {
    "support_select_country_label": {
        "en": "Select Your Country / Region", "es": "Selecciona tu país / región", "fr": "Sélectionnez votre pays / région",
        "de": "Wählen Sie Ihr Land / Ihre Region", "it": "Seleziona il tuo paese / regione", "pt": "Selecione seu país / região",
        "ru": "Выберите вашу страну / регион", "zh": "选择您的国家/地区", "ja": "国・地域を選択してください",
        "ko": "국가 / 지역 선택", "ar": "اختر بلدك / منطقتك", "he": "בחר את המדינה / האזור שלך",
        "hi": "अपना देश / क्षेत्र चुनें", "tl": "Piliin ang Iyong Bansa / Rehiyon", "pl": "Wybierz swój kraj / region",
        "nl": "Selecteer uw land / regio", "sv": "Välj ditt land / din region", "el": "Επιλέξτε τη χώρα / περιοχή σας",
        "ro": "Selectați țara / regiunea dvs.", "cs": "Vyberte svou zemi / oblast", "tr": "Ülkenizi / Bölgenizi Seçin",
        "vi": "Chọn quốc gia / khu vực của bạn", "th": "เลือกประเทศ / ภูมิภาคของคุณ", "id": "Pilih Negara / Wilayah Anda",
        "ms": "Pilih Negara / Wilayah Anda", "fa": "کشور / منطقه خود را انتخاب کنید", "ur": "اپنا ملک / خطہ منتخب کریں",
        "uk": "Оберіть вашу країну / регіон", "bn": "আপনার দেশ / অঞ্চল নির্বাচন করুন", "ta": "உங்கள் நாடு / பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்",
        "sw": "Chagua Nchi / Eneo Lako", "am": "አገርዎን / ክልልዎን ይምረጡ", "ha": "Zaɓi Ƙasarku / Yankinku",
        "yo": "Yan Orilẹ-ede / Agbegbe Rẹ", "zu": "Khetha Izwe / Isifunda Sakho"
    },
    "us": {
        "en": "United States", "es": "Estados Unidos", "fr": "États-Unis", "de": "Vereinigte Staaten", "it": "Stati Uniti",
        "pt": "Estados Unidos", "ru": "Соединенные Штаты", "zh": "美国", "ja": "アメリカ合衆国", "ko": "미국",
        "ar": "الولايات المتحدة", "he": "ארצות הברית", "hi": "संयुक्त राज्य अमेरिका", "tl": "Estados Unidos",
        "pl": "Stany Zjednoczone", "nl": "Verenigde Staten", "sv": "USA", "el": "Ηνωμένες Πολιτείες", "ro": "Statele Unite",
        "cs": "Spojené státy", "tr": "Amerika Birleşik Devletleri", "vi": "Hoa Kỳ", "th": "สหรัฐอเมริกา",
        "id": "Amerika Serikat", "ms": "Amerika Syarikat", "fa": "ایالات متحده", "ur": "ریاستہائے متحدہ",
        "uk": "Сполучені Штати", "bn": "মার্কিন যুক্তরাষ্ট্র", "ta": "அமெரிக்கா", "sw": "Marekani",
        "am": "አሜሪካ", "ha": "Amurka", "yo": "Amẹ́ríkà", "zu": "I-United States"
    },
    "ca": {
        "en": "Canada", "es": "Canadá", "fr": "Canada", "de": "Kanada", "it": "Canada", "pt": "Canadá",
        "ru": "Канада", "zh": "加拿大", "ja": "カナダ", "ko": "캐나다", "ar": "كندا", "he": "קנדה",
        "hi": "कनाडा", "tl": "Canada", "pl": "Kanada", "nl": "Canada", "sv": "Kanada", "el": "Καναδάς",
        "ro": "Canada", "cs": "Kanada", "tr": "Kanada", "vi": "Canada", "th": "แคนาดา", "id": "Kanada",
        "ms": "Kanada", "fa": "کانادا", "ur": "کینیڈا", "uk": "Канада", "bn": "কানাডা", "ta": "கனடா",
        "sw": "Kanada", "am": "ካናዳ", "ha": "Kanada", "yo": "Kánádà", "zu": "I-Canada"
    },
    "uk": {
        "en": "United Kingdom", "es": "Reino Unido", "fr": "Royaume-Uni", "de": "Vereinigtes Königreich", "it": "Regno Unito",
        "pt": "Reino Unido", "ru": "Великобритания", "zh": "英国", "ja": "イギリス", "ko": "영국",
        "ar": "المملكة المتحدة", "he": "הממלכה המאוחדת", "hi": "यूनाइटेड किंगडम", "tl": "United Kingdom",
        "pl": "Wielka Brytania", "nl": "Verenigd Koninkrijk", "sv": "Storbritannien", "el": "Ηνωμένο Βασίλειο",
        "ro": "Regatul Unit", "cs": "Velká Británie", "tr": "Birleşik Krallık", "vi": "Vương quốc Anh",
        "th": "สหราชอาณาจักร", "id": "Inggris Raya", "ms": "United Kingdom", "fa": "بریتانیا", "ur": "برطانیہ",
        "uk": "Велика Британія", "bn": "যুক্তরাজ্য", "ta": "ஐக்கிய இராச்சியம்", "sw": "Uingereza",
        "am": "ዩናይትድ ኪንግደም", "ha": "Birtaniya", "yo": "Ilu Ọba", "zu": "I-United Kingdom"
    },
    "au": {
        "en": "Australia", "es": "Australia", "fr": "Australie", "de": "Australien", "it": "Australia", "pt": "Austrália",
        "ru": "Австралия", "zh": "澳大利亚", "ja": "オーストラリア", "ko": "호주", "ar": "أستراليا", "he": "אוסטרליה",
        "hi": "ऑस्ट्रेलिया", "tl": "Australia", "pl": "Australia", "nl": "Australië", "sv": "Australien", "el": "Αυστραλία",
        "ro": "Australia", "cs": "Austrálie", "tr": "Avustralya", "vi": "Úc", "th": "ออสเตรเลีย", "id": "Australia",
        "ms": "Australia", "fa": "استرالیا", "ur": "آسٹریلیا", "uk": "Австралія", "bn": "অস্ট্রেলিয়া",
        "ta": "ஆஸ்திரேலியா", "sw": "Australia", "am": "አውስትራሊያ", "ha": "Ostareliya", "yo": "Australia", "zu": "I-Australia"
    },
    "nz": {
        "en": "New Zealand", "es": "Nueva Zelanda", "fr": "Nouvelle-Zélande", "de": "Neuseeland", "it": "Nuova Zelanda",
        "pt": "Nova Zelândia", "ru": "Новая Зеландия", "zh": "新西兰", "ja": "ニュージーランド", "ko": "뉴질랜드",
        "ar": "نيوزيلندا", "he": "ניו זילנד", "hi": "न्यूजीलैंड", "tl": "New Zealand", "pl": "Nowa Zelandia",
        "nl": "Nieuw-Zeeland", "sv": "Nya Zeeland", "el": "Νέα Ζηλανδία", "ro": "Noua Zeelandă", "cs": "Nový Zéland",
        "tr": "Yeni Zelanda", "vi": "New Zealand", "th": "นิวซีแลนด์", "id": "Selandia Baru", "ms": "New Zealand",
        "fa": "نیوزیلند", "ur": "نیوزی لینڈ", "uk": "Нова Зеландія", "bn": "নিউজিল্যান্ড", "ta": "நியூசிலாந்து",
        "sw": "Nyuzilandi", "am": "ኒው ዚላንድ", "ha": "New Zealand", "yo": "Niu Silandi", "zu": "I-New Zealand"
    },
    "intl": {
        "en": "International / Other Countries", "es": "Internacional / Otros Países", "fr": "International / Autres Pays",
        "de": "International / Andere Länder", "it": "Internazionale / Altri Paesi", "pt": "Internacional / Outros Países",
        "ru": "Международный / Другие страны", "zh": "国际 / 其他国家", "ja": "国際 / その他の国", "ko": "국제 / 기타 국가",
        "ar": "دولي / دول أخرى", "he": "בינלאומי / מדינות אחרות", "hi": "अंतर्राष्ट्रीय / अन्य देश",
        "tl": "Pandaigdigan / Ibang Bansa", "pl": "Międzynarodowy / Inne krae", "nl": "Internationaal / Andere landen",
        "sv": "Internationellt / Andra länder", "el": "Διεθνές / Άλλες χώρες", "ro": "Internațional / Alte țări",
        "cs": "Mezinárodní / Ostatní země", "tr": "Uluslararası / Diğer Ülkeler", "vi": "Quốc tế / Các quốc gia khác",
        "th": "นานาชาติ / ประเทศอื่นๆ", "id": "Internasional / Negara Lain", "ms": "Antarabangsa / Negara Lain",
        "fa": "بین‌المللی / سایر کشورها", "ur": "بین الاقوامی / دیگر ممالک", "uk": "Міжнародний / Інші країни",
        "bn": "আন্তর্জাতিক / অন্যান্য দেশ", "ta": "சர்வதேசம் / பிற நாடுகள்", "sw": "Kimataifa / Nchi Nyingine",
        "am": "አለምአቀፍ / ሌሎች አገሮች", "ha": "Na Duniya / Sauran Kasashe", "yo": "Agbaye / Awọn orilẹ-ede Miiran",
        "zu": "Umhlaba Wonke / Ezinye Izwe"
    }
};

const countryNames = {
    "us": { flag: "🇺🇸", key: "support_region_us", default: "United States" },
    "ca": { flag: "🇨🇦", key: "support_region_ca", default: "Canada" },
    "uk": { flag: "🇬🇧", key: "support_region_uk", default: "United Kingdom" },
    "au": { flag: "🇦🇺", key: "support_region_au", default: "Australia" },
    "nz": { flag: "🇳🇿", key: "support_region_nz", default: "New Zealand" },
    "intl": { flag: "🌍", key: "support_region_intl", default: "International / Other Countries" }
};

const regionalLifelinesData = {
    "us": [
        { title: "988 Suicide & Crisis Lifeline", desc: "A free, 24/7, confidential crisis line for suicidal thoughts, emotional distress, panic, or addiction crises.", call: "988", text: "988" },
        { title: "SAMHSA National Helpline", desc: "A free, 24/7, confidential hotline for those facing drug or alcohol addiction and mental health challenges.", call: "8006624357", text: "8006624357" },
        { title: "National Drug Helpline", desc: "A free, 24/7 hotline offering guidance for individuals struggling with drug or alcohol addiction.", call: "8442890879", text: "8442890879" },
        { title: "Narcotics Anonymous", desc: "A support line to help find NA meetings and provide encouragement. Available via phone call only.", call: "8187739999", callLabel: "Call Helpline" },
        { title: "Alcoholics Anonymous", desc: "A support line to help find AA meetings and regional information. Available via phone call only.", call: "2128703400", callLabel: "Call AA Office" },
        { title: "Never Use Alone", desc: "A free, 24/7 hotline for individuals using drugs alone to ensure they remain safe. Available via phone call only.", call: "8004843731", callLabel: "Call Support" },
        { title: "Crisis Text Line", desc: "A free, 24/7 text-based crisis support service for emotional distress. Available via text only.", text: "741741", textBody: "HOME", textLabel: "Text HOME to 741741" },
        { title: "Billy Graham Prayer Line", desc: "A free, 24/7 Christian prayer and spiritual support hotline. Available via phone call only.", call: "8883882683", callLabel: "Call for Prayer" },
        { title: "Joel Osteen Ministries", desc: "A free, 24/7 Christian prayer hotline providing spiritual guidance. Available via phone call only.", call: "8885675635", callLabel: "Call for Prayer" },
        { title: "Christian Care Ministry", desc: "A free Christian support line for prayer and encouragement. Available via phone call only.", call: "8005255683", callLabel: "Call for Support" },
        { title: "Silent Unity Prayer Line", desc: "A free, 24/7 prayer hotline offering emotional and spiritual support. Available via phone call only.", call: "8169692000", callLabel: "Call for Prayer" },
        { title: "SAMHSA Text Support", desc: "A free text-based service for automated treatment resources. Available via text only.", text: "435748", textBody: "HELP", textLabel: "Text HELP to 435748" }
    ],
    "ca": [
        { title: "988 Suicide Crisis Helpline", desc: "A free, 24/7 bilingual (English & French) crisis service across Canada for anyone in emotional distress or thoughts of suicide.", call: "988", text: "988" },
        { title: "Wellness Together Canada", desc: "Free, confidential 24/7 mental health and substance use support funded by Health Canada.", call: "18665850445", text: "741741", textBody: "WELLNESS", textLabel: "Text WELLNESS to 741741" },
        { title: "Hope for Wellness Helpline", desc: "24/7 culturally competent mental health counselling and crisis intervention for all Indigenous people across Canada.", call: "18552423310", callLabel: "Call Helpline" },
        { title: "Canadian Centre on Substance Use and Addiction", desc: "National resources, regional directories, and evidence-based addiction support tools.", link: "https://www.ccsa.ca/", linkLabel: "Visit CCSA Directory" }
    ],
    "uk": [
        { title: "NHS Mental Health Services", desc: "24/7 urgent mental health helpline support across the UK for immediate advice and medical assessment.", call: "111", callLabel: "Call NHS 111" },
        { title: "Samaritans UK", desc: "Free, confidential 24/7 emotional support for anyone struggling to cope, feeling alone, or in crisis.", call: "116123", callLabel: "Call 116 123" },
        { title: "FRANK Drug Helpline", desc: "Free, confidential 24/7 friendly advice, information, and support regarding drugs and alcohol.", call: "03001236600", text: "82111", textBody: "FRANK", textLabel: "Text 82111" },
        { title: "SHOUT Crisis Text Line", desc: "Free, 24/7 confidential crisis text support service for anyone in the UK in immediate distress.", text: "85258", textBody: "SHOUT", textLabel: "Text SHOUT to 85258" },
        { title: "Alcoholics Anonymous Great Britain", desc: "National helpline offering advice, meeting directories, and mutual support across the UK.", call: "08009177650", callLabel: "Call AA Helpline" }
    ],
    "au": [
        { title: "Lifeline Australia", desc: "24/7 free crisis support and suicide prevention services across Australia.", call: "131114", text: "0477131114", textLabel: "Text 0477 13 11 14" },
        { title: "Beyond Blue", desc: "24/7 mental health information, support line, and referral services for anxiety, depression, and crisis.", call: "1300224636", callLabel: "Call 1300 22 4636" },
        { title: "National Alcohol and Other Drug Hotline", desc: "Free, confidential 24/7 advice, support, and referral for individuals struggling with alcohol and drug dependencies.", call: "1800250015", callLabel: "Call 1800 250 015" },
        { title: "DirectLine Addiction Support", desc: "Confidential alcohol and drug counselling, advice, and referral service available 24/7.", call: "1800888236", callLabel: "Call DirectLine" }
    ],
    "nz": [
        { title: "1737 Need to Talk?", desc: "Free, 24/7 confidential mental health, anxiety, and addiction support by trained counsellors across New Zealand.", call: "1737", text: "1737" },
        { title: "Alcohol Drug Helpline NZ", desc: "Free, confidential 24/7 advice and support for anyone concerned about their own or another person's alcohol or drug use.", call: "0800787797", text: "8681", textLabel: "Text 8681" },
        { title: "Lifeline Aotearoa", desc: "24/7 community crisis and suicide prevention helpline.", call: "0800543354", text: "4357", textBody: "HELP", textLabel: "Text HELP to 4357" }
    ],
    "intl": [
        {
            title: "Universal Emergency Numbers",
            desc: "If you are in immediate physical danger or a life-threatening crisis, please dial your local emergency services immediately: 112 (European Union, UK & many global networks), 911 (North America), 999 (UK/Commonwealth), or 000 (Australia).",
            isNotice: true
        },
        {
            title: "Global 12-Step & Peer Fellowships",
            desc: "Access free online meetings, local chapter directories, and 24/7 peer support worldwide.",
            links: [
                { name: "Find NA Meetings Worldwide", url: "https://m.na.org/" },
                { name: "Find AA Meetings Worldwide", url: "https://www.aa.org/find-aa" }
            ]
        }
    ]
};

function onSupportCountryChange(region) {
    localStorage.setItem('tsh_support_region', region);
    renderLifelines(region);
}

function renderLifelines(selectedRegion) {
    const container = document.getElementById('regional-lifelines');
    if (!container) return;

    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = typeof translations !== 'undefined' ? (translations[activeLang] || translations['en']) : {};
    const fallbackData = typeof translations !== 'undefined' ? translations['en'] : {};

    const savedRegion = localStorage.getItem('tsh_support_region');
    const defaultRegion = activeLang === 'en' ? 'us' : 'intl';
    const region = selectedRegion || savedRegion || defaultRegion;

    const selectEl = document.getElementById('support-country-select');
    if (selectEl && selectEl.value !== region) {
        selectEl.value = region;
    }

    const items = regionalLifelinesData[region] || regionalLifelinesData['intl'];
    let html = '';

    items.forEach(item => {
        if (item.isNotice) {
            html += `
                <div class="card-glass p-5 border-yellow-400/50">
                    <h3 class="text-sm font-bold text-slate-800 mb-1">${escapeHTML(item.title)}</h3>
                    <p class="text-[10px] text-slate-600 leading-relaxed font-medium">${escapeHTML(item.desc)}</p>
                </div>
            `;
            return;
        }

        if (item.links) {
            const linksHtml = item.links.map(l => `
                <a href="${escapeHTML(l.url)}" target="_blank" rel="noopener" class="w-full bg-white/80 text-slate-800 py-2.5 px-4 rounded-xl flex items-center justify-between font-bold text-[10px] uppercase tracking-widest border border-white shadow-sm hover:bg-white transition-colors">
                    <span>${escapeHTML(l.name)}</span>
                    <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-600"></i>
                </a>
            `).join('');
            html += `
                <div class="card-glass p-5 space-y-3">
                    <h3 class="text-sm font-bold text-slate-800 mb-1">${escapeHTML(item.title)}</h3>
                    <p class="text-[10px] text-slate-600 leading-relaxed font-medium mb-3">${escapeHTML(item.desc)}</p>
                    <div class="space-y-2">${linksHtml}</div>
                </div>
            `;
            return;
        }

        const callBtn = item.call ? `
            <a href="tel:${escapeHTML(item.call)}" class="flex-1 bg-slate-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest shadow-md active:scale-95 transition-transform">
                <i data-lucide="phone" class="w-3 h-3"></i> ${escapeHTML(item.callLabel || langData.support_call || "Call")}
            </a>
        ` : '';

        const textHref = item.textBody ? `sms:${escapeHTML(item.text)}?body=${encodeURIComponent(item.textBody)}` : `sms:${escapeHTML(item.text || '')}`;
        const textBtn = item.text ? `
            <a href="${textHref}" class="flex-1 bg-white/80 text-slate-800 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest border border-white shadow-md active:scale-95 transition-transform">
                <i data-lucide="message-circle" class="w-3 h-3"></i> ${escapeHTML(item.textLabel || langData.support_text || "Text")}
            </a>
        ` : '';

        const singleLink = item.link ? `
            <a href="${escapeHTML(item.link)}" target="_blank" rel="noopener" class="w-full bg-white/80 text-slate-800 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest border border-white shadow-md active:scale-95 transition-transform">
                <i data-lucide="external-link" class="w-3 h-3"></i> ${escapeHTML(item.linkLabel || "Learn More")}
            </a>
        ` : '';

        const actionButtons = (callBtn && textBtn) 
            ? `<div class="flex gap-2">${callBtn}${textBtn}</div>` 
            : (callBtn || textBtn || singleLink);

        html += `
            <div class="card-glass p-5">
                <h3 class="text-sm font-bold text-slate-800 mb-1">${escapeHTML(item.title)}</h3>
                <p class="text-[10px] text-slate-600 mb-4 leading-relaxed font-medium">${escapeHTML(item.desc)}</p>
                ${actionButtons}
            </div>
        `;
    });

    // Always include the Global Directory (Find A Helpline) card as universal backup
    const globalTitle = langData.support_global_title || fallbackData.support_global_title || "Global Support Directory";
    const globalDesc = langData.support_global_desc || fallbackData.support_global_desc || "If you are outside these regions or experiencing a crisis, please contact your local emergency services or use the global directory to find free, confidential support in your country.";
    const globalBtn = langData.support_find_helpline || fallbackData.support_find_helpline || "Find A Helpline";

    html += `
        <div class="card-glass p-5 border-yellow-400/50 mt-6">
            <h3 class="text-sm font-bold text-slate-800 mb-1">${escapeHTML(globalTitle)}</h3>
            <p class="text-[10px] text-slate-600 leading-relaxed font-medium mb-4">${escapeHTML(globalDesc)}</p>
            <a href="https://findahelpline.com/" target="_blank" rel="noopener" class="w-full bg-slate-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest shadow-md active:scale-95 transition-transform">
                <i data-lucide="globe" class="w-4 h-4"></i> ${escapeHTML(globalBtn)}
            </a>
        </div>
    `;

    container.innerHTML = html;
    renderIcons();
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
    db.onversionchange = () => {
        db.close();
    };
    const recordButton = document.getElementById('btn-start-record');
    if (recordButton) {
        recordButton.disabled = false;
        recordButton.classList.remove('opacity-50', 'pointer-events-none');
    }
    if(document.getElementById('vault-list')) loadVault();
};

dbRequest.onerror = (e) => {
    console.error("Failed to open TSH_Database:", e.target.error);
    const recordButton = document.getElementById('btn-start-record');
    if (recordButton) recordButton.disabled = true;
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

function normalizeStoredState() {
    if (!Array.isArray(state.habits)) {
        state.habits = [];
        return;
    }

    const today = getDayNumber(new Date());
    state.habits = state.habits.filter(habit => habit && typeof habit === 'object').map(habit => {
        habit.name = typeof habit.name === 'string' ? habit.name : '';
        habit.costPerDay = Number.isFinite(Number(habit.costPerDay)) ? Number(habit.costPerDay) : 0;
        habit.startDate = getDayNumber(habit.startDate) === null ? new Date().toISOString() : habit.startDate;
        habit.slips = (Array.isArray(habit.slips) ? habit.slips : [])
            .filter(slip => {
                const day = getDayNumber(slip);
                return day !== null && day <= today;
            })
            .sort((first, second) => getDayNumber(first) - getDayNumber(second));
        if (habit.isMain === undefined) habit.isMain = true;
        return habit;
    });
}

function init() {
    renderIcons();
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
            normalizeStoredState();
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
        if (window.isResetting) return;
        if (!document.getElementById('screen-main').classList.contains('hidden')) {
            updateDate();
            renderDashboard();
        }
    };
    window.addEventListener('focus', refreshDashboardIfVisible);
    window.addEventListener('storage', (e) => {
        if (e.key === 'steady_hand_state' && !e.newValue) {
            window.location.reload();
        }
    });
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
    if (screen === 'support') {
        renderSafetyContact();
        renderLifelines();
    }
    if (screen === 'main') {
        updateDate(); renderDashboard();
        if (state.tutorialStep === 0 || state.tutorialStep === undefined) startTutorial();
    }
    
    renderIcons();
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
    
    // Update text
    document.getElementById('tut-title').innerText = langData[step.titleKey] || step.defaultTitle;
    document.getElementById('tut-desc').innerText = langData[step.descKey] || step.defaultDesc;
    
    // Update the icon
    const iconEl = document.getElementById('tut-icon');
    if (iconEl) {
        iconEl.setAttribute('data-lucide', step.icon);
        renderIcons(); // Re-render the new icon
    }
    
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
    
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    const currencySym = currencySymbols[activeLang] || "$";
    
    let phCost = langData.setup_ph_cost || `Daily Financial Cost (${currencySym})`;
    phCost = phCost.replace(/\(\$\)|\(€\/\$\)/g, `(${currencySym})`);
    
    div.innerHTML = `
        <button onclick="this.parentElement.remove()" class="absolute -top-2 -right-2 bg-slate-700 text-white rounded-full p-1.5 shadow-md"><i data-lucide="x" class="w-3 h-3"></i></button>
        <input type="text" placeholder="${escapeHTML(langData.setup_ph_struggle)}" class="habit-name w-full rounded-lg p-3 text-sm uppercase font-bold shadow-inner">
        <input type="number" placeholder="${escapeHTML(phCost)}" class="habit-cost w-full rounded-lg p-3 text-sm shadow-inner" min="0">
        <div class="flex items-center justify-between mt-2 px-1">
            <label class="text-[10px] uppercase font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="habit-main w-4 h-4 rounded border-slate-400 text-slate-800 focus:ring-slate-800" checked>
                ${escapeHTML(langData.setup_main_label)}
            </label>
        </div>
    `;
    container.appendChild(div);
    renderIcons();
}

async function saveInitialSetup() {
    const habitEls = document.querySelectorAll('#habit-inputs > div');
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    if (habitEls.length === 0) return alert(langData.alert_setup_empty || "Please add at least one struggle to forge your shield.");
    const newHabits =[];
    habitEls.forEach(el => {
        const name = el.querySelector('.habit-name').value.trim();
        const cost = el.querySelector('.habit-cost').value || 0;
        const isMain = el.querySelector('.habit-main').checked;
        if (name) newHabits.push({ id: 'h_' + Date.now() + Math.random(), name, costPerDay: parseFloat(cost) || 0, startDate: new Date().toISOString(), slips:[], isMain });
    });
    // Rows existed, but every name field was left blank - don't silently finish
    // setup with zero struggles tracked.
    if (newHabits.length === 0) return alert(langData.alert_setup_empty || "Please add at least one struggle to forge your shield.");
    state.habits = newHabits;
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
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    alert(langData.alert_safety_saved || "Safety dial locked in.");
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
                <div class="flex flex-col gap-1.5">
                    <button onclick="logSlip('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full shadow-sm">${langData.dash_log_slip}</button>
                    <button onclick="retireStruggle('${habit.id}')" class="text-[10px] uppercase font-bold text-slate-700 border border-slate-400 bg-white/50 px-3 py-2 rounded-full shadow-sm">${langData.dash_retire || 'Retire'}</button>
                </div>
            </div>
            <div class="bg-white/60 h-2 rounded-full overflow-hidden shadow-inner"><div class="bg-slate-700 h-full" style="width: ${calculateDailyProgress(habit)}%"></div></div>
        `;
        container.appendChild(div);
    });

    const mainHabits = state.habits.filter(h => h.isMain);
    let currentMainStreak = 0;
    if (mainHabits.length > 0) {
        currentMainStreak = Math.max(...mainHabits.map(h => calculateStreak(h)));
    }

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
    
    const currencyCode = currencyCodes[activeLang] || 'USD';
    document.getElementById('total-saved').innerText = totalSavedValue.toLocaleString(activeLang, { style: 'currency', currency: currencyCode });

    const trophies = typeof generateAllTrophies === 'function' ? generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) :[];
    localStorage.setItem('steady_hand_state', JSON.stringify(state));

    document.getElementById('trophy-case').innerHTML = trophies.map(t => `
        <div class="flex-shrink-0 w-[84px] h-24 rounded-2xl bg-white/${t.earned ? '60' : '20'} border ${t.earned ? 'border-yellow-400/50 shadow-md' : 'border-white/30'} flex flex-col items-center justify-center p-2 text-center transition-all duration-500">
            <i data-lucide="${t.icon}" class="w-6 h-6 mb-1 ${t.earned ? 'text-yellow-600' : 'text-slate-400 opacity-50'}"></i>
            <p class="text-[8px] font-bold uppercase tracking-tighter ${t.earned ? 'text-slate-800' : 'text-slate-500'} leading-tight">${escapeHTML(t.title)}</p>
            <p class="text-[6px] uppercase tracking-widest ${t.earned ? 'text-slate-600' : 'text-slate-400'} mt-1">${escapeHTML(t.desc)}</p>
        </div>
    `).join('');
    renderIcons();
}

let mediaRecorder; let chunks =[]; let audioStream;
const vaultObjectUrls = new Set();
let urgeAudioUrl = null;

function releaseVaultObjectUrls() {
    vaultObjectUrls.forEach(url => URL.revokeObjectURL(url));
    vaultObjectUrls.clear();
}

function releaseUrgeAudioUrl() {
    if (urgeAudioUrl) URL.revokeObjectURL(urgeAudioUrl);
    urgeAudioUrl = null;
}

function offerRecordingDownload(blob) {
    if (!blob) return;
    const shouldDownload = confirm("This recording could not be saved. Download a copy now so it is not lost?");
    if (!shouldDownload) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `the-steady-hand-recording-${new Date().toISOString()}.webm`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function startRecording() {
    if (!db) {
        alert("The Vault is still preparing. Please try again in a moment.");
        return;
    }

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
            if (!db) {
                const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                const langData = translations[activeLang] || translations['en'];
                alert(langData.alert_vault_unavailable || "The Vault is unavailable right now, so this recording could not be saved.");
                return;
            }
            const mimeType = mediaRecorder.mimeType || '';
            const b = new Blob(chunks, mimeType ? { type: mimeType } : undefined);
            try {
                const t = db.transaction(["videos"], "readwrite");
                t.objectStore("videos").add({ blob: b, date: new Date().toISOString() });

                let didReportSaveFailure = false;
                const saveFailed = () => {
                    if (didReportSaveFailure) return;
                    didReportSaveFailure = true;
                    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                    const langData = translations[activeLang] || translations['en'];
                    alert(langData.alert_vault_save_failed || "This recording could not be saved. Please free device storage and try again.");
                    offerRecordingDownload(b);
                };
                t.onerror = saveFailed;
                t.onabort = saveFailed;
                t.oncomplete = () => {
                    const mainHabits = state.habits.filter(h => h.isMain);
                    const currentMainStreak = mainHabits.length > 0 ? Math.min(...mainHabits.map(h => calculateStreak(h))) : 0;
                    if (currentMainStreak >= 365) state.veteranMemos = (state.veteranMemos || 0) + 1;
                    state.voiceMemos = (state.voiceMemos || 0) + 1;
                    localStorage.setItem('steady_hand_state', JSON.stringify(state));
                    loadVault();
                    renderDashboard();
                };
            } catch (error) {
                const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                const langData = translations[activeLang] || translations['en'];
                alert(langData.alert_vault_save_failed || "This recording could not be saved. Please free device storage and try again.");
                offerRecordingDownload(b);
            }
        };
        
        mediaRecorder.start();
        document.getElementById('btn-start-record').classList.add('hidden');
        document.getElementById('btn-stop-record').classList.remove('hidden');
    } catch (err) { 
        if (audioStream) audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
        const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
        const langData = translations[activeLang] || translations['en'];
        alert(langData.alert_mic_error || "Microphone access required for the Vault."); 
    }
}

function stopRecording() {
    if(!mediaRecorder || mediaRecorder.state === 'inactive') return;
    mediaRecorder.stop();
    if(audioStream) audioStream.getTracks().forEach(t => t.stop());
    audioStream = null;
    document.getElementById('record-placeholder').classList.remove('hidden');
    document.getElementById('recording-active').classList.add('hidden');
    document.getElementById('recording-active').classList.remove('flex');
    document.getElementById('btn-start-record').classList.remove('hidden');
    document.getElementById('btn-stop-record').classList.add('hidden');
}

function loadVault() {
    if(!db) return;
    const c = document.getElementById('vault-list');
    releaseVaultObjectUrls();
    c.innerHTML = '';
    db.transaction("videos", "readonly").objectStore("videos").openCursor(null, 'prev').onsuccess = e => {
        const cur = e.target.result;
        if(cur) {
            // Force direct read from local storage to prevent scope loss
            const activeLang = localStorage.getItem('tsh_language') || 'en';
            const langData = translations[activeLang] || translations['en'];

            const url = URL.createObjectURL(cur.value.blob);
            vaultObjectUrls.add(url);
            const d = document.createElement('div'); d.className = 'card-glass p-4 relative';
            d.innerHTML = `
                <div class="flex items-center gap-3 mb-4 bg-white/50 p-2 rounded-xl border border-white/60 shadow-inner">
                    <i data-lucide="mic" class="w-5 h-5 text-slate-700 shrink-0 ml-2"></i>
                    <audio src="${url}" controls class="w-full h-8 outline-none bg-transparent"></audio>
                </div>
                <div class="flex justify-between items-center text-[10px] uppercase font-bold text-slate-700 px-2">
                <span class="truncate max-w-[150px]">${langData.vault_captured || "Captured "}${new Date(cur.value.date).toLocaleDateString(activeLang)}</span>
                <button onclick="deleteVideo(${cur.value.id})" class="text-red-600 bg-white/50 px-3 py-1 rounded-full shadow-sm hover:bg-red-50 transition-colors">${langData.vault_purge || "Purge"}</button></div>`;
            c.appendChild(d); cur.continue();
        }
    };
    setTimeout(renderIcons, 50);
}

function deleteVideo(id) { 
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    if(confirm(langData.confirm_purge_record || "Purge this voice recording permanently?")) db.transaction("videos", "readwrite").objectStore("videos").delete(id).onsuccess = loadVault; 
}

let lastUrgeType = null; let lastVerseIndex = -1; let lastAudioId = -1;
async function triggerUrgeEngine() {
    releaseUrgeAudioUrl();
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

    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];

    if (choice === 'audio') {
        let audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
        let safetyCounter = 0;
        while (audioMatch.id === lastAudioId && vaultAudios.length > 1 && safetyCounter < 10) {
            audioMatch = vaultAudios[Math.floor(Math.random() * vaultAudios.length)];
            safetyCounter++;
        }
        lastAudioId = audioMatch.id;
        const url = URL.createObjectURL(audioMatch.blob);
        urgeAudioUrl = url;
        c.innerHTML = `
            <i data-lucide="mic" class="w-16 h-16 text-slate-700 drop-shadow-sm mx-auto mb-6"></i>
            <h2 class="font-cinzel text-slate-800 mb-6 uppercase font-bold tracking-widest text-xl">${langData.urge_listen_strength || "Listen to Your Strength"}</h2>
            <div class="bg-white/60 p-4 rounded-2xl w-full max-w-sm shadow-xl border-2 border-white">
                <audio src="${url}" autoplay controls class="w-full outline-none"></audio>
            </div>
            <p class="text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-8">${langData.urge_breathe_listen || "Breathe and Listen"}</p>
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
                <p class="text-[10px] text-slate-700 uppercase tracking-widest font-bold">${langData.urge_breathe_60 || "Breathe for 60 seconds."}</p>
            </div>`;
    }
    setTimeout(renderIcons, 50);
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

        // The API returns each post's source language. This is more reliable than
        // guessing from its text when deciding whether a translation is needed.
        const messagesHTML = messages.map(m => `
            <div class="card-glass p-4 border-white/30 wall-message select-none transition-transform" data-id="${escapeHTML(String(m.id))}" data-language="${escapeHTML(String(m.language || 'en'))}">
                <div class="cursor-pointer active:scale-[0.98] transition-transform" onclick="handleMessageTap(this, ${m.id})">
                    <p class="text-sm text-slate-800 font-medium leading-relaxed msg-body whitespace-pre-wrap">"${escapeHTML(m.text)}"</p>
                </div>
                <div class="flex items-center justify-between mt-3">
                    <button type="button" onclick="reportWallMessage(${m.id}, this)" class="text-[8px] text-slate-500 uppercase tracking-widest font-bold underline">Report</button>
                    <p class="text-[8px] text-slate-500 uppercase tracking-widest font-bold pointer-events-none">- Anonymous</p>
                </div>
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
    const scripts = { "ar": /[\u0600-\u06FF]/, "he": /[\u0590-\u05FF]/, "zh": /[\u4e00-\u9fa5]/, "ja": /[\u3040-\u30ff]/, "ko": /[\uac00-\ud7af]/, "ru": /[\u0400-\u04FF]/, "hi": /[\u0900-\u097F]/, "fa": /[\u0600-\u06FF]/, "ur": /[\u0600-\u06FF]/, "uk": /[\u0400-\u04FF]/, "el": /[\u0370-\u03FF]/, "th": /[\u0E00-\u0E7F]/, "bn": /[\u0980-\u09FF]/, "ta": /[\u0B80-\u0BFF]/, "am": /[\u1200-\u137F]/ };
    for (const [lang, regex] of Object.entries(scripts)) { if (regex.test(text)) return targetLang === lang; }
    if (languageFingerprints[targetLang]) {
        const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);
        return words.filter(word => languageFingerprints[targetLang].includes(word)).length > 0;
    }
    return false;
}

function getReportToken() {
    const storedToken = localStorage.getItem('tsh_report_token');
    if (storedToken) return storedToken;
    const generatedToken = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID().replaceAll('-', '')
        : `report${Date.now()}${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('tsh_report_token', generatedToken);
    return generatedToken;
}

async function reportWallMessage(messageId, button) {
    if (!confirm('Report this post for review?')) return;
    button.disabled = true;
    try {
        const res = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId, reporterToken: getReportToken() })
        });
        if (!res.ok) throw new Error('Report request failed');
        button.textContent = 'Reported';
        button.classList.remove('text-slate-500');
        button.classList.add('text-green-700');
    } catch (error) {
        button.disabled = false;
        alert('Reporting is temporarily unavailable. Please try again later.');
    }
}

async function handleMessageTap(element, msgId) {
    const textEl = element.querySelector('.msg-body');
    const originalText = textEl.innerText.replace(/"/g, '');
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const messageEl = element.closest('.wall-message');
    const sourceLang = messageEl ? messageEl.dataset.language : '';
    if (sourceLang === activeLang || (!sourceLang && isAlreadyInLanguage(originalText, activeLang))) return;
    textEl.classList.add('animate-pulse'); textEl.innerText = "...";
    try {
        const res = await fetch(`${WORKER_API_URL}?id=${msgId}&lang=${activeLang}`);
        if (!res.ok) throw new Error("Translation request failed");
        const data = await res.json();
        if (!data.translatedText) throw new Error("No translation returned");
        textEl.innerText = `"${data.translatedText}"`;
        textEl.classList.remove('animate-pulse');
        // Translation succeeded: this message no longer needs to respond to taps.
        element.onclick = null; element.classList.remove('cursor-pointer');
    } catch (e) { textEl.innerText = `"${originalText}"`; textEl.classList.remove('animate-pulse'); }
}

async function postToWall() {
    const input = document.getElementById('wall-input');
    const text = input.value.trim();
    if(!text) return;
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';

    input.value = '';
    
    const feed = document.getElementById('wall-feed');
    const placeholder = document.getElementById('wall-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }
    
    // Show a clearly temporary card while the server saves the post. It only
    // becomes a published post (and counts toward progress) after success.
    const newMsgHTML = `
        <div class="card-glass p-4 border-yellow-400/50 shadow-md wall-message select-none transition-transform" data-language="${activeLang}">
            <div class="transition-transform">
                <p class="text-sm text-slate-800 font-medium leading-relaxed msg-body whitespace-pre-wrap">"${escapeHTML(text)}"</p>
            </div>
            <p class="wall-post-status text-[8px] text-yellow-600 uppercase tracking-widest font-bold mt-3 text-right">Sending…</p>
        </div>
    `;
    
    feed.insertAdjacentHTML('afterbegin', newMsgHTML);
    const newMsgEl = feed.firstElementChild;

    const langData = translations[activeLang] || translations['en'];
    try {
        // TODO: include Turnstile token in body when widget is active (see CLOUDFLARE_SETUP.md step 3)
        const res = await fetch(WORKER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language: activeLang })
        });
        if (!res.ok) throw new Error("Failed to save message");
        const data = await res.json();

        // Now that the message has a real id, make it tappable/translatable
        // just like every other message on the wall.
        if (newMsgEl && data && data.id) {
            newMsgEl.dataset.id = data.id;
            const tapTarget = newMsgEl.querySelector('.msg-body').parentElement;
            tapTarget.classList.add('cursor-pointer', 'active:scale-[0.98]');
            tapTarget.onclick = () => handleMessageTap(tapTarget, data.id);
            const status = newMsgEl.querySelector('.wall-post-status');
            status.innerText = '- You';
            status.classList.remove('text-yellow-600');
            status.classList.add('text-slate-500');
            state.wallPosts = (state.wallPosts || 0) + 1;
            localStorage.setItem('steady_hand_state', JSON.stringify(state));
        }
    } catch(e) {
        const status = newMsgEl.querySelector('.wall-post-status');
        newMsgEl.classList.remove('border-yellow-400/50');
        newMsgEl.classList.add('border-red-300');
        status.innerText = 'Not posted — try again';
        status.classList.remove('text-yellow-600');
        status.classList.add('text-red-600');
        alert(langData.alert_wall_fail || "Failed to permanently save message to the global wall.");
    }
}

// --- UTILITIES ---
function getDayNumber(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return null;
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;
}
function getValidSlipDays(habit, today) {
    const slips = Array.isArray(habit.slips) ? habit.slips : [];
    return new Set(slips.map(getDayNumber).filter(day => day !== null && day <= today));
}
function calculateTotalCleanDays(habit) {
    const today = getDayNumber(new Date());
    const start = getDayNumber(habit.startDate);
    if (start === null) return 0;
    const totalDaysElapsed = Math.max(0, today - start);
    const uniquePastSlipDays = [...getValidSlipDays(habit, today)].filter(day => day < today).length;
    return Math.max(0, totalDaysElapsed - uniquePastSlipDays);
}
function calculateStreak(habit) { 
    const today = getDayNumber(new Date());
    const start = getDayNumber(habit.startDate);
    if (start === null) return 0;
    const slipDays = getValidSlipDays(habit, today);
    const lastSlipDay = slipDays.size ? Math.max(...slipDays) : null;
    const streakStart = lastSlipDay === null ? start : lastSlipDay + 1;
    return Math.max(0, today - streakStart);
}
function calculateSuccessRate(h) { 
    const today = getDayNumber(new Date());
    const start = getDayNumber(h.startDate);
    if (start === null) return 0;
    const t = Math.max(1, today - start);
    const uniquePastSlipDays = [...getValidSlipDays(h, today)].filter(day => day < today).length;
    return Math.max(0, Math.min(100, ((t - uniquePastSlipDays) / t) * 100)); 
}
function calculateDailyProgress(habit) {
    const today = new Date();
    // Check if any slip occurred today (local calendar day)
    const slipToday = habit.slips.some(slipStr => {
        const slipDate = new Date(slipStr);
        return slipDate.getFullYear() === today.getFullYear() &&
               slipDate.getMonth() === today.getMonth() &&
               slipDate.getDate() === today.getDate();
    });
    if (slipToday) return 0;
    
    // Calculate progress as the fraction of the day that has elapsed since midnight
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    const currentSecond = today.getSeconds();
    const elapsedMinutes = (currentHour * 60) + currentMinute + (currentSecond / 60);
    const totalMinutesInDay = 24 * 60;
    return (elapsedMinutes / totalMinutesInDay) * 100;
}

function showSlipUndo(habit, slipTimestamp) {
    const existingToast = document.getElementById('slip-undo-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'slip-undo-toast';
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-[600] bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold';
    toast.textContent = 'Slip recorded.';

    const undoButton = document.createElement('button');
    undoButton.type = 'button';
    undoButton.className = 'bg-white text-slate-800 px-3 py-1.5 rounded-lg uppercase text-[10px] tracking-widest';
    undoButton.textContent = 'Undo';
    undoButton.onclick = () => {
        const index = habit.slips.lastIndexOf(slipTimestamp);
        if (index !== -1) habit.slips.splice(index, 1);
        localStorage.setItem('steady_hand_state', JSON.stringify(state));
        renderDashboard();
        toast.remove();
    };
    toast.appendChild(undoButton);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 10_000);
}

function logSlip(id) { 
    const h = state.habits.find(x=>x.id === id); 
    if(h) { 
        const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
        const langData = translations[activeLang] || translations['en'];
        if (!confirm(langData.confirm_log_slip || "Record a slip for today? This will update your streak.")) return;
        const slipTimestamp = new Date().toISOString();
        h.slips.push(slipTimestamp);
        localStorage.setItem('steady_hand_state', JSON.stringify(state)); 
        renderDashboard(); 
        showSlipUndo(h, slipTimestamp);
    } 
}

function retireStruggle(id) {
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    const habit = state.habits.find(x => x.id === id);
    if (!habit) return;

    // Last main struggle warning
    if (habit.isMain) {
        const mainStruggles = state.habits.filter(h => h.isMain);
        if (mainStruggles.length === 1) {
            const lastMainWarn = langData.retire_last_main_warn || "This is your only main struggle. Retiring it will reset your rank and main struggle timeline trophies to the initial state. Are you sure you want to do this?";
            if (!confirm(lastMainWarn)) return;
        }
    }

    // First confirmation: warn about rank/trophy impact
    const warnMsg = langData.retire_warn_msg || "Removing this struggle may affect your profile. If this is your main struggle, your rank will be recalculated. If you have trophies earned from multiple active struggles, some may be lost. Are you sure you want to continue?";
    if (!confirm(warnMsg)) return;

    // Second confirmation: permanent action
    const confirmMsg = langData.retire_confirm_msg || "This action is permanent and cannot be undone. Are you absolutely sure you want to retire this struggle?";
    if (!confirm(confirmMsg)) return;

    // Remove the struggle
    state.habits = state.habits.filter(x => x.id !== id);
    localStorage.setItem('steady_hand_state', JSON.stringify(state));
    renderDashboard();
}

function addNewStruggleFromDashboard() {
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    const currencySym = currencySymbols[activeLang] || "$";

    const nameInput = document.getElementById('new-struggle-name');
    const costInput = document.getElementById('new-struggle-cost');
    const mainInput = document.getElementById('new-struggle-main');
    const formEl = document.getElementById('add-struggle-form');

    const name = nameInput.value.trim();
    if (!name) {
        alert(langData.alert_setup_empty || "Please add at least one struggle to forge your shield.");
        return;
    }

    const cost = parseFloat(costInput.value) || 0;
    const isMain = mainInput.checked;

    state.habits.push({
        id: 'h_' + Date.now() + Math.random(),
        name: name,
        costPerDay: cost,
        startDate: new Date().toISOString(),
        slips: [],
        isMain: isMain
    });

    localStorage.setItem('steady_hand_state', JSON.stringify(state));

    // Clear inputs and collapse form
    nameInput.value = '';
    costInput.value = '';
    mainInput.checked = true;
    formEl.classList.add('hidden');

    renderDashboard();
}

function toggleAddStruggleForm() {
    const formEl = document.getElementById('add-struggle-form');
    formEl.classList.toggle('hidden');
    if (!formEl.classList.contains('hidden')) {
        document.getElementById('new-struggle-name').focus();
    }
}
function scrollTrophies(direction) {
    const tc = document.getElementById('trophy-case');
    if (!tc) return;
    const scrollAmount = tc.clientWidth * 0.75;
    tc.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
function closeUrgeEngine() {
    document.getElementById('urge-overlay').classList.add('hidden');
    document.getElementById('urge-content').innerHTML = '';
    releaseUrgeAudioUrl();
}
function toggleSettings() { document.getElementById('modal-settings').classList.toggle('hidden'); renderIcons(); }
function updateDate() { 
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    document.getElementById('date-display').innerText = new Date().toLocaleDateString(activeLang, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); 
}
function resetApp() { 
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const langData = translations[activeLang] || translations['en'];
    if(confirm(langData.confirm_reset || "DELETE ALL DATA? This erases all progress and voice notes permanently.")) { 
        window.isResetting = true;
        if (db) {
            db.close();
        }
        const deleteRequest = indexedDB.deleteDatabase("TSH_Database");
        deleteRequest.onsuccess = () => {
            // Only erase state after IndexedDB confirms that recordings are gone.
            localStorage.removeItem('steady_hand_state');
            window.location.reload();
        };
        deleteRequest.onerror = () => {
            window.isResetting = false;
            alert(langData.alert_reset_failed || "Reset failed. Your data has not been erased.");
            // Do NOT reload — data is untouched; user stays on the current page.
        };
        deleteRequest.onblocked = () => {
            window.isResetting = false;
            console.warn("Database deletion blocked.");
            alert(langData.alert_reset_blocked || "Reset is blocked by other tabs. Please close all other tabs of this app, then refresh.");
            // Do NOT reload — tell the user to close other tabs and retry manually.
        };
    } 
}
window.onload = init;
