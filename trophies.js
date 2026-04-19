/**
 * TSH Trophy Generator Engine (Multi-Language)
 * Spaced, meaningful, and epic milestones for The Steady Hand.
 */

const trophyDict = {
    "en": {
        days_c: "Days Clean", saved: "Saved", urg_b: "Urge Button", v_m: "Voice Memo", v_ms: "Voice Memos", s_p: "Serenity Prayer", w_p: "Wall Post", w_ps: "Wall Posts",
        t_1: "First Step", t_7: "One Week Free", t_14: "Fortnight", t_30: "The Forge", t_60: "Two Months", t_90: "The Crucible", t_180: "Half Year", t_250: "Spartan", t_365: "One Year", t_500: "The Vanguard", t_730: "Two Years Unbroken", t_1000: "The Millennium", t_1825: "Living Legend",
        f_10: "First Savings", f_50: "Fifty Dollars", f_100: "Piggy Bank", f_500: "Heavy Purse", f_1000: "Treasure", f_5000: "Dragon Hoard", f_10000: "King's Ransom", f_25000: "Empire", f_50000: "Generational", f_100000: "Unstoppable",
        u_1: "First Defense", u_10: "Tenth Victory", u_25: "Shield Wall", u_50: "Defender", u_100: "The Watchman", u_250: "Quarter Thousand", u_500: "Storm Breaker", u_1000: "The Wall",
        m_1: "Inner Voice", m_5: "War Cry", m_15: "Voice of Reason", m_30: "Thirty Records", m_50: "The Chronicler", m_100: "The Archivist",
        r_1: "First Prayer", r_10: "Ritual Novice", r_50: "Faithful", r_100: "Ritual Master", r_365: "Devout",
        w_1: "First Echo", w_10: "Sanctuary Guide", w_25: "Sanctuary Pillar", w_100: "Global Voice",
        s_du_t: "Dual Wielder", s_du_d: "2 Active Streaks", s_ze_t: "Zen Master", s_ze_d: "5+ Active Streaks", s_ju_t: "Master Juggler", s_ju_d: "3+ habits clean for 2 weeks",
        s_nw_t: "Night Watch", s_nw_d: "1 Late-Night Urge", s_nwm_t: "Night Watchman", s_nwm_d: "Survival of 10+ Late-Night Urges", s_dd_t: "Daylight Defense", s_dd_d: "1 Midday Urge",
        s_qc_t: "Quiet Conqueror", s_qc_d: "30 Days Clean without Urge button", s_ev_t: "The Evangelist", s_ev_d: "More Wall posts than Urge clicks",
        s_hs_t: "High Stakes", s_hs_d: "30 Days Clean ($20+/day habit)", s_pp_t: "Penny Pincher", s_pp_d: "100 Days Clean (<$2/day habit)",
        s_ei_t: "Echo of Iron", s_ei_d: "Memo after 1 Yr Clean", s_px_t: "The Phoenix", s_px_d: "30 Days after a Slip",
        s_rb_t: "Rebirth", s_rb_d: "90 Days after Slip", s_rs_t: "Resurrection", s_rs_d: "1 Yr after Slip",
        s_dh_t: "Diamond Hands", s_dh_d: "1 Year on first attempt", s_mo_t: "The Monolith", s_mo_d: "1000 Days, Zero Slips", s_vs_t: "Vow of Silence", s_vs_d: "1 Yr on $0 Struggle"
    },
    "es": {
        days_c: "Días Limpio", saved: "Ahorrado", urg_b: "Botón de Impulso", v_m: "Nota de Voz", v_ms: "Notas de Voz", s_p: "Oración", w_p: "Publicación", w_ps: "Publicaciones",
        t_1: "Primer Paso", t_7: "Una Semana Libre", t_14: "Quincena", t_30: "La Forja", t_60: "Dos Meses", t_90: "El Crisol", t_180: "Medio Año", t_250: "Espartano", t_365: "Un Año", t_500: "La Vanguardia", t_730: "Dos Años", t_1000: "El Milenio", t_1825: "Leyenda Viva",
        f_10: "Primer Ahorro", f_50: "Cincuenta Dólares", f_100: "Alcancía", f_500: "Bolsa Pesada", f_1000: "Tesoro", f_5000: "Tesoro de Dragón", f_10000: "Rescate de Rey", f_25000: "Imperio", f_50000: "Generacional", f_100000: "Imparable",
        u_1: "Primera Defensa", u_10: "Décima Victoria", u_25: "Muro de Escudos", u_50: "Defensor", u_100: "El Vigilante", u_250: "Cuarto de Millar", u_500: "Rompetormentas", u_1000: "El Muro",
        m_1: "Voz Interior", m_5: "Grito de Guerra", m_15: "Voz de la Razón", m_30: "Treinta Registros", m_50: "El Cronista", m_100: "El Archivista",
        r_1: "Primera Oración", r_10: "Novato del Ritual", r_50: "Fiel", r_100: "Maestro del Ritual", r_365: "Devoto",
        w_1: "Primer Eco", w_10: "Guía del Santuario", w_25: "Pilar del Santuario", w_100: "Voz Global",
        s_du_t: "Doble Empuñadura", s_du_d: "2 Rachas Activas", s_ze_t: "Maestro Zen", s_ze_d: "5+ Rachas Activas", s_ju_t: "Malabarista", s_ju_d: "3+ hábitos limpios 2 semanas",
        s_nw_t: "Guardia Nocturna", s_nw_d: "1 Impulso Nocturno", s_nwm_t: "Vigilante Nocturno", s_nwm_d: "10+ Impulsos Nocturnos", s_dd_t: "Defensa Diurna", s_dd_d: "1 Impulso de Mediodía",
        s_qc_t: "Conquistador Silencioso", s_qc_d: "30 Días sin usar el botón", s_ev_t: "El Evangelista", s_ev_d: "Más publicaciones que impulsos",
        s_hs_t: "Altas Apuestas", s_hs_d: "30 Días ($20+/día)", s_pp_t: "Ahorrador", s_pp_d: "100 Días (<$2/día)",
        s_ei_t: "Eco de Hierro", s_ei_d: "Nota de voz al año limpio", s_px_t: "El Fénix", s_px_d: "30 Días tras recaer",
        s_rb_t: "Renacimiento", s_rb_d: "90 Días tras recaer", s_rs_t: "Resurrección", s_rs_d: "1 Año tras recaer",
        s_dh_t: "Manos de Diamante", s_dh_d: "1 Año al primer intento", s_mo_t: "El Monolito", s_mo_d: "1000 Días, Cero Recaídas", s_vs_t: "Voto de Silencio", s_vs_d: "1 Año en Lucha de $0"
    },
    "fr": {
        days_c: "Jours Propres", saved: "Économisé", urg_b: "Bouton d'Envie", v_m: "Note Vocale", v_ms: "Notes Vocales", s_p: "Prière", w_p: "Publication", w_ps: "Publications",
        t_1: "Premier Pas", t_7: "Une Semaine", t_14: "Quinze Jours", t_30: "La Forge", t_60: "Deux Mois", t_90: "Le Creuset", t_180: "Un Semestre", t_250: "Spartiate", t_365: "Un An", t_500: "L'Avant-garde", t_730: "Deux Ans", t_1000: "Le Millénaire", t_1825: "Légende Vivante",
        f_10: "Première Épargne", f_50: "Cinquante", f_100: "Tirelire", f_500: "Bourse Pleine", f_1000: "Trésor", f_5000: "Trésor de Dragon", f_10000: "Rançon de Roi", f_25000: "Empire", f_50000: "Générationnel", f_100000: "Inarrêtable",
        u_1: "Première Défense", u_10: "Dixième Victoire", u_25: "Mur de Boucliers", u_50: "Défenseur", u_100: "Le Guetteur", u_250: "Un Quart de Mille", u_500: "Brise-Tempête", u_1000: "Le Mur",
        m_1: "Voix Intérieure", m_5: "Cri de Guerre", m_15: "Voix de la Raison", m_30: "Trente Enregistrements", m_50: "Le Chroniqueur", m_100: "L'Archiviste",
        r_1: "Première Prière", r_10: "Novice du Rituel", r_50: "Fidèle", r_100: "Maître du Rituel", r_365: "Dévot",
        w_1: "Premier Écho", w_10: "Guide du Sanctuaire", w_25: "Pilier du Sanctuaire", w_100: "Voix Globale",
        s_du_t: "Double Lame", s_du_d: "2 Séries Actives", s_ze_t: "Maître Zen", s_ze_d: "5+ Séries Actives", s_ju_t: "Jongleur", s_ju_d: "3+ habitudes (2 semaines)",
        s_nw_t: "Garde de Nuit", s_nw_d: "1 Envie Nocturne", s_nwm_t: "Veilleur de Nuit", s_nwm_d: "10+ Envies Nocturnes", s_dd_t: "Défense de Jour", s_dd_d: "1 Envie de Midi",
        s_qc_t: "Conquérant Silencieux", s_qc_d: "30 Jours sans bouton", s_ev_t: "L'Évangéliste", s_ev_d: "Plus de posts que d'envies",
        s_hs_t: "Gros Enjeux", s_hs_d: "30 Jours (20+ $/jour)", s_pp_t: "Économe", s_pp_d: "100 Jours (<2 $/jour)",
        s_ei_t: "Écho de Fer", s_ei_d: "Note après 1 an propre", s_px_t: "Le Phénix", s_px_d: "30 Jours après rechute",
        s_rb_t: "Renaissance", s_rb_d: "90 Jours après rechute", s_rs_t: "Résurrection", s_rs_d: "1 An après rechute",
        s_dh_t: "Mains de Diamant", s_dh_d: "1 An (1er essai)", s_mo_t: "Le Monolithe", s_mo_d: "1000 Jours, 0 Rechute", s_vs_t: "Vœu de Silence", s_vs_d: "1 An (Lutte à 0$)"
    },
    "de": {
        days_c: "Tage Sauber", saved: "Gespart", urg_b: "Drang-Button", v_m: "Sprachnotiz", v_ms: "Sprachnotizen", s_p: "Gebet", w_p: "Wandbeitrag", w_ps: "Wandbeiträge",
        t_1: "Erster Schritt", t_7: "Eine Woche Frei", t_14: "Zwei Wochen", t_30: "Die Schmiede", t_60: "Zwei Monate", t_90: "Der Schmelztiegel", t_180: "Ein Halbes Jahr", t_250: "Spartaner", t_365: "Ein Jahr", t_500: "Die Vorhut", t_730: "Zwei Jahre", t_1000: "Das Jahrtausend", t_1825: "Lebende Legende",
        f_10: "Erste Ersparnis", f_50: "Fünfzig", f_100: "Sparschwein", f_500: "Schwerer Beutel", f_1000: "Schatz", f_5000: "Drachenhort", f_10000: "Lösegeld", f_25000: "Imperium", f_50000: "Generationen", f_100000: "Unaufhaltsam",
        u_1: "Erste Verteidigung", u_10: "Zehnter Sieg", u_25: "Schildwall", u_50: "Verteidiger", u_100: "Der Wächter", u_250: "Ein Vierteltausend", u_500: "Sturmbrecher", u_1000: "Die Mauer",
        m_1: "Innere Stimme", m_5: "Kriegsschrei", m_15: "Stimme der Vernunft", m_30: "Dreißig Aufnahmen", m_50: "Der Chronist", m_100: "Der Archivar",
        r_1: "Erstes Gebet", r_10: "Ritual-Novize", r_50: "Treuer", r_100: "Ritual-Meister", r_365: "Andächtiger",
        w_1: "Erstes Echo", w_10: "Heiligtum-Führer", w_25: "Heiligtum-Säule", w_100: "Globale Stimme",
        s_du_t: "Zweihänder", s_du_d: "2 Aktive Serien", s_ze_t: "Zen-Meister", s_ze_d: "5+ Aktive Serien", s_ju_t: "Meister-Jongleur", s_ju_d: "3+ Gewohnheiten (2 Wochen)",
        s_nw_t: "Nachtwache", s_nw_d: "1 Nächtlicher Drang", s_nwm_t: "Nachtwächter", s_nwm_d: "10+ Nächtliche Dränge", s_dd_t: "Tagesverteidigung", s_dd_d: "1 Mittagsdrang",
        s_qc_t: "Stiller Eroberer", s_qc_d: "30 Tage ohne Button", s_ev_t: "Der Evangelist", s_ev_d: "Mehr Beiträge als Dränge",
        s_hs_t: "Hohe Einsätze", s_hs_d: "30 Tage (20+ €/Tag)", s_pp_t: "Pfennigfuchser", s_pp_d: "100 Tage (<2 €/Tag)",
        s_ei_t: "Echo aus Eisen", s_ei_d: "Notiz nach 1 Jahr", s_px_t: "Der Phönix", s_px_d: "30 Tage nach Rückfall",
        s_rb_t: "Wiedergeburt", s_rb_d: "90 Tage nach Rückfall", s_rs_t: "Auferstehung", s_rs_d: "1 Jahr nach Rückfall",
        s_dh_t: "Diamanthände", s_dh_d: "1 Jahr (1. Versuch)", s_mo_t: "Der Monolith", s_mo_d: "1000 Tage, 0 Rückfälle", s_vs_t: "Schweigegelübde", s_vs_d: "1 Jahr (0€ Kampf)"
    },
    "zh": {
        days_c: "天保持清醒", saved: "已节省", urg_b: "冲动按钮", v_m: "条语音备忘录", v_ms: "条语音备忘录", s_p: "宁静祷告", w_p: "条留言", w_ps: "条留言",
        t_1: "第一步", t_7: "自由一周", t_14: "两周", t_30: "锻造", t_60: "两个月", t_90: "熔炉", t_180: "半年", t_250: "斯巴达人", t_365: "一年", t_500: "先锋", t_730: "不屈两年", t_1000: "千年", t_1825: "活着的传奇",
        f_10: "第一笔存款", f_50: "五十美元", f_100: "存钱罐", f_500: "沉甸甸的钱包", f_1000: "宝藏", f_5000: "巨龙的财宝", f_10000: "国王的赎金", f_25000: "帝国", f_50000: "世代财富", f_100000: "势不可挡",
        u_1: "首次防御", u_10: "第十次胜利", u_25: "盾墙", u_50: "防卫者", u_100: "守望者", u_250: "四分之一千", u_500: "风暴破坏者", u_1000: "长城",
        m_1: "内心的声音", m_5: "战吼", m_15: "理智之声", m_30: "三十份记录", m_50: "编年史家", m_100: "档案保管员",
        r_1: "首次祈祷", r_10: "仪式新手", r_50: "忠诚者", r_100: "仪式大师", r_365: "虔诚者",
        w_1: "第一声回音", w_10: "避难所向导", w_25: "避难所支柱", w_100: "全球之声",
        s_du_t: "双持者", s_du_d: "2个活跃记录", s_ze_t: "禅宗大师", s_ze_d: "5+活跃记录", s_ju_t: "杂耍大师", s_ju_d: "3个习惯保持2周",
        s_nw_t: "守夜人", s_nw_d: "1次深夜冲动", s_nwm_t: "暗夜守卫", s_nwm_d: "抵御10次深夜冲动", s_dd_t: "白昼防御", s_dd_d: "1次正午冲动",
        s_qc_t: "沉默的征服者", s_qc_d: "30天未按按钮", s_ev_t: "传道者", s_ev_d: "留言数超过按钮点击",
        s_hs_t: "高风险", s_hs_d: "30天保持 ($20+/天)", s_pp_t: "守财奴", s_pp_d: "100天保持 (<$2/天)",
        s_ei_t: "钢铁之声", s_ei_d: "保持1年后的录音", s_px_t: "凤凰涅槃", s_px_d: "失误后30天",
        s_rb_t: "重生", s_rb_d: "失误后90天", s_rs_t: "复活", s_rs_d: "失误后1年",
        s_dh_t: "钻石手", s_dh_d: "首次尝试达到1年", s_mo_t: "巨石", s_mo_d: "1000天，零失误", s_vs_t: "静默誓言", s_vs_d: "$0挣扎达到1年"
    },
    "hi": {
        days_c: "दिन स्वच्छ", saved: "बचाया", urg_b: "इच्छा बटन", v_m: "वॉइस मेमो", v_ms: "वॉइस मेमो", s_p: "प्रार्थना", w_p: "दीवार पोस्ट", w_ps: "दीवार पोस्ट",
        t_1: "पहला कदम", t_7: "एक सप्ताह मुक्त", t_14: "दो सप्ताह", t_30: "द फोर्ज", t_60: "दो महीने", t_90: "परीक्षा की घड़ी", t_180: "छह महीने", t_250: "स्पार्टन", t_365: "एक वर्ष", t_500: "अग्रणी", t_730: "दो वर्ष अटूट", t_1000: "सहस्राब्दी", t_1825: "जीवित किंवदंती",
        f_10: "पहली बचत", f_50: "पचास रुपये", f_100: "गुल्लक", f_500: "भारी बटुआ", f_1000: "खजाना", f_5000: "ड्रैगन का खजाना", f_10000: "राजा की फिरौती", f_25000: "साम्राज्य", f_50000: "पीढ़ीगत", f_100000: "अजेय",
        u_1: "पहला बचाव", u_10: "दसवीं जीत", u_25: "शील्ड वॉल", u_50: "रक्षक", u_100: "पहरेदार", u_250: "ढाई सौ", u_500: "तूफान तोड़ने वाला", u_1000: "दीवार",
        m_1: "आंतरिक आवाज", m_5: "युद्ध का नारा", m_15: "तर्क की आवाज", m_30: "तीस रिकॉर्ड", m_50: "इतिहासकार", m_100: "अभिलेखापाल",
        r_1: "पहली प्रार्थना", r_10: "अनुष्ठान नौसिखिया", r_50: "वफादार", r_100: "अनुष्ठान मास्टर", r_365: "भक्त",
        w_1: "पहली गूंज", w_10: "आश्रय मार्गदर्शक", w_25: "आश्रय स्तंभ", w_100: "वैश्विक आवाज",
        s_du_t: "दोहरी शक्ति", s_du_d: "2 सक्रिय स्ट्रीक्स", s_ze_t: "ज़ेन मास्टर", s_ze_d: "5+ सक्रिय स्ट्रीक्स", s_ju_t: "मास्टर बाजीगर", s_ju_d: "2 सप्ताह के लिए 3+ आदतें",
        s_nw_t: "नाइट वॉच", s_nw_d: "1 देर रात की इच्छा", s_nwm_t: "नाइट वॉचमैन", s_nwm_d: "10+ देर रात की इच्छाएं", s_dd_t: "दिन का बचाव", s_dd_d: "1 दोपहर की इच्छा",
        s_qc_t: "शांत विजेता", s_qc_d: "बिना बटन के 30 दिन", s_ev_t: "प्रचारक", s_ev_d: "क्लिक से अधिक पोस्ट",
        s_hs_t: "हाई स्टेक्स", s_hs_d: "30 दिन ($20+/दिन)", s_pp_t: "कंजूस", s_pp_d: "100 दिन (<$2/दिन)",
        s_ei_t: "लोहे की गूंज", s_ei_d: "1 वर्ष के बाद मेमो", s_px_t: "द फीनिक्स", s_px_d: "पर्ची के 30 दिन बाद",
        s_rb_t: "पुनर्जन्म", s_rb_d: "पर्ची के 90 दिन बाद", s_rs_t: "जी उठने", s_rs_d: "पर्ची के 1 वर्ष बाद",
        s_dh_t: "डायमंड हैंड्स", s_dh_d: "पहले प्रयास में 1 वर्ष", s_mo_t: "द मोनोलिथ", s_mo_d: "1000 दिन, शून्य पर्ची", s_vs_t: "मौन व्रत", s_vs_d: "$0 संघर्ष पर 1 वर्ष"
    },
    "ar": {
        days_c: "أيام نظيفة", saved: "تم توفيره", urg_b: "زر الرغبة", v_m: "مذكرة صوتية", v_ms: "مذكرات صوتية", s_p: "صلاة السكينة", w_p: "منشور", w_ps: "منشورات",
        t_1: "الخطوة الأولى", t_7: "أسبوع حر", t_14: "أسبوعان", t_30: "الحدادة", t_60: "شهران", t_90: "البوتقة", t_180: "نصف سنة", t_250: "إسبرطي", t_365: "سنة واحدة", t_500: "الطليعة", t_730: "سنتان متواصلتان", t_1000: "الألفية", t_1825: "أسطورة حية",
        f_10: "أول مدخرات", f_50: "خمسون دولاراً", f_100: "حصالة", f_500: "محفظة ثقيلة", f_1000: "كنز", f_5000: "كنز التنين", f_10000: "فدية ملك", f_25000: "إمبراطورية", f_50000: "ثروة أجيال", f_100000: "لا يمكن إيقافه",
        u_1: "الدفاع الأول", u_10: "الانتصار العاشر", u_25: "جدار الدرع", u_50: "المدافع", u_100: "الحارس", u_250: "ربع ألف", u_500: "كاسر العاصفة", u_1000: "الجدار",
        m_1: "صوت داخلي", m_5: "صرخة حرب", m_15: "صوت العقل", m_30: "ثلاثون تسجيلاً", m_50: "المؤرخ", m_100: "أمين الأرشيف",
        r_1: "الصلاة الأولى", r_10: "مبتدئ الطقوس", r_50: "المخلص", r_100: "سيد الطقوس", r_365: "التقي",
        w_1: "الصدى الأول", w_10: "دليل الملاذ", w_25: "عمود الملاذ", w_100: "صوت عالمي",
        s_du_t: "المحارب المزدوج", s_du_d: "سلسلتان نشطتان", s_ze_t: "معلم الزن", s_ze_d: "5+ سلاسل نشطة", s_ju_t: "المشعوذ", s_ju_d: "3+ عادات نظيفة لأسبوعين",
        s_nw_t: "حارس الليل", s_nw_d: "رغبة واحدة متأخرة", s_nwm_t: "خفير الليل", s_nwm_d: "النجاة من 10+ رغبات ليلية", s_dd_t: "دفاع النهار", s_dd_d: "رغبة واحدة في منتصف النهار",
        s_qc_t: "الفاتح الصامت", s_qc_d: "30 يوماً بدون الزر", s_ev_t: "المبشر", s_ev_d: "منشورات أكثر من ضغطات الزر",
        s_hs_t: "رهانات عالية", s_hs_d: "30 يوماً (20$+ / يوم)", s_pp_t: "المدخر", s_pp_d: "100 يوم (أقل من 2$ / يوم)",
        s_ei_t: "صدى الحديد", s_ei_d: "مذكرة بعد سنة نظيفة", s_px_t: "طائر الفينيق", s_px_d: "30 يوماً بعد الانزلاق",
        s_rb_t: "الولادة من جديد", s_rb_d: "90 يوماً بعد الانزلاق", s_rs_t: "القيامة", s_rs_d: "سنة بعد الانزلاق",
        s_dh_t: "أيدي الماس", s_dh_d: "سنة من المحاولة الأولى", s_mo_t: "المسلة", s_mo_d: "1000 يوم، صفر انزلاقات", s_vs_t: "نذر الصمت", s_vs_d: "سنة على صراع 0$"
    },
    "pt": {
        days_c: "Dias Limpo", saved: "Poupado", urg_b: "Botão de Desejo", v_m: "Nota de Voz", v_ms: "Notas de Voz", s_p: "Oração", w_p: "Publicação", w_ps: "Publicações",
        t_1: "Primeiro Passo", t_7: "Uma Semana", t_14: "Quinzena", t_30: "A Forja", t_60: "Dois Meses", t_90: "O Crisol", t_180: "Meio Ano", t_250: "Espartano", t_365: "Um Ano", t_500: "A Vanguarda", t_730: "Dois Anos", t_1000: "O Milênio", t_1825: "Lenda Viva",
        f_10: "Primeira Poupança", f_50: "Cinquenta Dólares", f_100: "Mealheiro", f_500: "Bolsa Pesada", f_1000: "Tesouro", f_5000: "Tesouro de Dragão", f_10000: "Resgate de Rei", f_25000: "Império", f_50000: "Geracional", f_100000: "Imparável",
        u_1: "Primeira Defesa", u_10: "Décima Vitória", u_25: "Muro de Escudos", u_50: "Defensor", u_100: "O Vigilante", u_250: "Quarto de Milhar", u_500: "Quebra-Tormentas", u_1000: "O Muro",
        m_1: "Voz Interior", m_5: "Grito de Guerra", m_15: "Voz da Razão", m_30: "Trinta Registros", m_50: "O Cronista", m_100: "O Arquivista",
        r_1: "Primeira Oração", r_10: "Noviço do Ritual", r_50: "Fiel", r_100: "Mestre do Ritual", r_365: "Devoto",
        w_1: "Primeiro Eco", w_10: "Guia do Santuário", w_25: "Pilar do Santuário", w_100: "Voz Global",
        s_du_t: "Empunhadura Dupla", s_du_d: "2 Sequências Ativas", s_ze_t: "Mestre Zen", s_ze_d: "5+ Sequências", s_ju_t: "Malabarista", s_ju_d: "3+ hábitos (2 semanas)",
        s_nw_t: "Guarda Noturna", s_nw_d: "1 Desejo Noturno", s_nwm_t: "Vigilante Noturno", s_nwm_d: "10+ Desejos Noturnos", s_dd_t: "Defesa Diurna", s_dd_d: "1 Desejo de Meio-Dia",
        s_qc_t: "Conquistador Silencioso", s_qc_d: "30 Dias sem botão", s_ev_t: "O Evangelista", s_ev_d: "Mais posts que cliques",
        s_hs_t: "Apostas Altas", s_hs_d: "30 Dias ($20+/dia)", s_pp_t: "Poupador", s_pp_d: "100 Dias (<$2/dia)",
        s_ei_t: "Eco de Ferro", s_ei_d: "Nota após 1 ano", s_px_t: "A Fênix", s_px_d: "30 Dias pós-recaída",
        s_rb_t: "Renascimento", s_rb_d: "90 Dias pós-recaída", s_rs_t: "Ressurreição", s_rs_d: "1 Ano pós-recaída",
        s_dh_t: "Mãos de Diamante", s_dh_d: "1 Ano na 1ª tentativa", s_mo_t: "O Monólito", s_mo_d: "1000 Dias, Zero Falhas", s_vs_t: "Voto de Silêncio", s_vs_d: "1 Ano (Luta $0)"
    },
    "ru": {
        days_c: "Дней чистоты", saved: "Сэкономлено", urg_b: "Кнопка Тяги", v_m: "Голосовая Заметка", v_ms: "Голосовых Заметок", s_p: "Молитва", w_p: "Запись на Стене", w_ps: "Записей на Стене",
        t_1: "Первый Шаг", t_7: "Свободная Неделя", t_14: "Две Недели", t_30: "Кузница", t_60: "Два Месяца", t_90: "Горнило", t_180: "Полгода", t_250: "Спартанец", t_365: "Один Год", t_500: "Авангард", t_730: "Два Года", t_1000: "Миллениум", t_1825: "Живая Легенда",
        f_10: "Первые Сбережения", f_50: "Пятьдесят Долларов", f_100: "Копилка", f_500: "Тяжелый Кошелек", f_1000: "Сокровище", f_5000: "Клад Дракона", f_10000: "Королевский Выкуп", f_25000: "Империя", f_50000: "Наследие", f_100000: "Неудержимый",
        u_1: "Первая Защита", u_10: "Десятая Победа", u_25: "Стена Щитов", u_50: "Защитник", u_100: "Дозорный", u_250: "Четверть Тысячи", u_500: "Разрушитель Бурь", u_1000: "Стена",
        m_1: "Внутренний Голос", m_5: "Боевой Клич", m_15: "Голос Разума", m_30: "Тридцать Записей", m_50: "Летописец", m_100: "Архивариус",
        r_1: "Первая Молитва", r_10: "Новичок Ритуала", r_50: "Верный", r_100: "Мастер Ритуала", r_365: "Благочестивый",
        w_1: "Первое Эхо", w_10: "Гид Убежища", w_25: "Столп Убежища", w_100: "Глобальный Голос",
        s_du_t: "Два Клинка", s_du_d: "2 Активные Серии", s_ze_t: "Дзен Мастер", s_ze_d: "5+ Активных Серий", s_ju_t: "Жонглер", s_ju_d: "3+ привычки на 2 недели",
        s_nw_t: "Ночной Дозор", s_nw_d: "1 Ночная Тяга", s_nwm_t: "Ночной Дозорный", s_nwm_d: "10+ Ночных Тяг", s_dd_t: "Дневная Защита", s_dd_d: "1 Дневная Тяга",
        s_qc_t: "Тихий Завоеватель", s_qc_d: "30 Дней без кнопки", s_ev_t: "Евангелист", s_ev_d: "Записей больше чем тяг",
        s_hs_t: "Высокие Ставки", s_hs_d: "30 Дней ($20+/день)", s_pp_t: "Экономный", s_pp_d: "100 Дней (<$2/день)",
        s_ei_t: "Эхо Железа", s_ei_d: "Заметка после 1 Года", s_px_t: "Феникс", s_px_d: "30 Дней после срыва",
        s_rb_t: "Перерождение", s_rb_d: "90 Дней после срыва", s_rs_t: "Воскрешение", s_rs_d: "1 Год после срыва",
        s_dh_t: "Алмазные Руки", s_dh_d: "1 Год с первой попытки", s_mo_t: "Монолит", s_mo_d: "1000 Дней, 0 Срывов", s_vs_t: "Обет Молчания", s_vs_d: "1 Год (борьба за $0)"
    },
    "ja": {
        days_c: "日間クリーン", saved: "節約", urg_b: "衝動ボタン", v_m: "個の音声メモ", v_ms: "個の音声メモ", s_p: "祈り", w_p: "個の投稿", w_ps: "個の投稿",
        t_1: "第一歩", t_7: "自由な一週間", t_14: "二週間", t_30: "鍛冶場", t_60: "二ヶ月", t_90: "試練の坩堝", t_180: "半年", t_250: "スパルタ人", t_365: "一年", t_500: "先駆者", t_730: "不屈の二年", t_1000: "ミレニアム", t_1825: "生きた伝説",
        f_10: "最初の貯金", f_50: "50ドル", f_100: "貯金箱", f_500: "重い財布", f_1000: "宝物", f_5000: "ドラゴンの宝", f_10000: "王の身代金", f_25000: "帝国", f_50000: "世代の富", f_100000: "止まらない",
        u_1: "最初の防御", u_10: "十回目の勝利", u_25: "盾の壁", u_50: "防衛者", u_100: "見張り番", u_250: "250回", u_500: "嵐を砕く者", u_1000: "壁",
        m_1: "内なる声", m_5: "雄叫び", m_15: "理性の声", m_30: "30の記録", m_50: "年代記編者", m_100: "記録保管人",
        r_1: "最初の祈り", r_10: "儀式の初心者", r_50: "忠実な者", r_100: "儀式の達人", r_365: "敬虔な者",
        w_1: "最初のエコー", w_10: "聖域の案内人", w_25: "聖域の柱", w_100: "グローバルな声",
        s_du_t: "二刀流", s_du_d: "2つのアクティブな連続記録", s_ze_t: "禅マスター", s_ze_d: "5つ以上のアクティブな記録", s_ju_t: "マスタージャグラー", s_ju_d: "3つ以上の習慣を2週間",
        s_nw_t: "夜警", s_nw_d: "1回の深夜の衝動", s_nwm_t: "夜警隊長", s_nwm_d: "10回以上の深夜の衝動を生存", s_dd_t: "昼の防衛", s_dd_d: "1回の日中の衝動",
        s_qc_t: "静かなる征服者", s_qc_d: "ボタンなしで30日間", s_ev_t: "伝道師", s_ev_d: "衝動より投稿が多い",
        s_hs_t: "ハイステークス", s_hs_d: "30日間 (1日20ドル以上の習慣)", s_pp_t: "倹約家", s_pp_d: "100日間 (1日2ドル未満の習慣)",
        s_ei_t: "鉄のエコー", s_ei_d: "1年経過後のメモ", s_px_t: "不死鳥", s_px_d: "スリップから30日",
        s_rb_t: "再生", s_rb_d: "スリップから90日", s_rs_t: "復活", s_rs_d: "スリップから1年",
        s_dh_t: "ダイヤモンドハンド", s_dh_d: "最初の挑戦で1年", s_mo_t: "モノリス", s_mo_d: "1000日、スリップなし", s_vs_t: "沈黙の誓い", s_vs_d: "費用ゼロの戦いで1年"
    },
    "he": {
        days_c: "ימים נקיים", saved: "נחסכו", urg_b: "כפתור דחף", v_m: "הקלטה", v_ms: "הקלטות", s_p: "תפילה", w_p: "פוסט", w_ps: "פוסטים",
        t_1: "צעד ראשון", t_7: "שבוע חופשי", t_14: "שבועיים", t_30: "החישול", t_60: "חודשיים", t_90: "כור המצרף", t_180: "חצי שנה", t_250: "ספרטני", t_365: "שנה אחת", t_500: "החלוץ", t_730: "שנתיים רצופות", t_1000: "המילניום", t_1825: "אגדה חיה",
        f_10: "חיסכון ראשון", f_50: "חמישים דולר", f_100: "קופת חיסכון", f_500: "ארנק כבד", f_1000: "אוצר", f_5000: "אוצר דרקון", f_10000: "כופר מלך", f_25000: "אימפריה", f_50000: "בין-דורי", f_100000: "בלתי ניתן לעצירה",
        u_1: "הגנה ראשונה", u_10: "ניצחון עשירי", u_25: "חומת מגן", u_50: "מגן", u_100: "השומר", u_250: "רבע אלף", u_500: "שובר סערה", u_1000: "החומה",
        m_1: "קול פנימי", m_5: "זעקת קרב", m_15: "קול ההיגיון", m_30: "שלושים רשומות", m_50: "המתעד", m_100: "הארכיונאי",
        r_1: "תפילה ראשונה", r_10: "טירון טקסים", r_50: "נאמן", r_100: "רב-אמן טקסים", r_365: "אדוק",
        w_1: "הד ראשון", w_10: "מדריך המקלט", w_25: "עמוד התווך", w_100: "קול עולמי",
        s_du_t: "אוחז בשניים", s_du_d: "2 רצפים פעילים", s_ze_t: "מאסטר זן", s_ze_d: "5+ רצפים", s_ju_t: "להטוטן", s_ju_d: "3+ הרגלים לשבועיים",
        s_nw_t: "משמר לילה", s_nw_d: "דחף לילה אחד", s_nwm_t: "שומר לילה", s_nwm_d: "10+ דחפי לילה", s_dd_t: "הגנת יום", s_dd_d: "דחף צהריים אחד",
        s_qc_t: "כובש שקט", s_qc_d: "30 ימים ללא כפתור", s_ev_t: "המטיף", s_ev_d: "יותר פוסטים מדחפים",
        s_hs_t: "הימורים גבוהים", s_hs_d: "30 יום ($20+/יום)", s_pp_t: "חסכן", s_pp_d: "100 יום (<$2/יום)",
        s_ei_t: "הד של ברזל", s_ei_d: "הקלטה אחרי שנה", s_px_t: "הפניקס", s_px_d: "30 יום אחרי מעידה",
        s_rb_t: "לידה מחדש", s_rb_d: "90 יום אחרי מעידה", s_rs_t: "תחייה", s_rs_d: "שנה אחרי מעידה",
        s_dh_t: "ידי יהלום", s_dh_d: "שנה בניסיון ראשון", s_mo_t: "המונולית", s_mo_d: "1000 ימים, אפס מעידות", s_vs_t: "נדר שתיקה", s_vs_d: "שנה על מאבק של 0$"
    },
    "tl": {
        days_c: "Araw na Malinis", saved: "Nai-save", urg_b: "Urge Button", v_m: "Voice Memo", v_ms: "Voice Memos", s_p: "Panalangin", w_p: "Wall Post", w_ps: "Wall Posts",
        t_1: "Unang Hakbang", t_7: "Isang Linggo", t_14: "Dalawang Linggo", t_30: "Ang Pandayan", t_60: "Dalawang Buwan", t_90: "Ang Tunawan", t_180: "Kalahating Taon", t_250: "Espartano", t_365: "Isang Taon", t_500: "Ang Taliba", t_730: "Dalawang Taon", t_1000: "Milenyo", t_1825: "Buhay na Alamat",
        f_10: "Unang Ipon", f_50: "Limampung Dolyar", f_100: "Alkansya", f_500: "Mabigat na Pitaka", f_1000: "Kayamanan", f_5000: "Kayamanan ng Dragon", f_10000: "Pantubos ng Hari", f_25000: "Imperyo", f_50000: "Pang-henerasyon", f_100000: "Walang Pipigil",
        u_1: "Unang Depensa", u_10: "Ikasampung Tagumpay", u_25: "Pader ng Kalasag", u_50: "Tagapagtanggol", u_100: "Ang Tagabantay", u_250: "Kapat na Libo", u_500: "Basag-Bagyo", u_1000: "Ang Pader",
        m_1: "Tinig sa Loob", m_5: "Sigaw ng Digmaan", m_15: "Tinig ng Katuwiran", m_30: "Tatlumpung Rekord", m_50: "Ang Kronista", m_100: "Ang Arkibista",
        r_1: "Unang Panalangin", r_10: "Baguhan ng Ritwal", r_50: "Tapat", r_100: "Guro ng Ritwal", r_365: "Deboto",
        w_1: "Unang Alingawngaw", w_10: "Gabay ng Santuwaryo", w_25: "Haligi ng Santuwaryo", w_100: "Pandaigdigang Tinig",
        s_du_t: "Dobleng Sandata", s_du_d: "2 Aktibong Streaks", s_ze_t: "Zen Master", s_ze_d: "5+ Aktibong Streaks", s_ju_t: "Master Juggler", s_ju_d: "3+ bisyo sa 2 linggo",
        s_nw_t: "Bantay Gabi", s_nw_d: "1 Pagnanasa sa Gabi", s_nwm_t: "Tanod Gabi", s_nwm_d: "10+ Pagnanasa sa Gabi", s_dd_t: "Depensa sa Araw", s_dd_d: "1 Pagnanasa sa Tanghali",
        s_qc_t: "Tahimik na Mananakop", s_qc_d: "30 Araw walang button", s_ev_t: "Ang Ebanghelista", s_ev_d: "Mas maraming post kaysa urges",
        s_hs_t: "Mataas na Pusta", s_hs_d: "30 Araw ($20+/araw)", s_pp_t: "Matipid", s_pp_d: "100 Araw (<$2/araw)",
        s_ei_t: "Bakal na Alingawngaw", s_ei_d: "Memo pagkatapos ng 1 Taon", s_px_t: "Ang Phoenix", s_px_d: "30 Araw pagkatapos madapa",
        s_rb_t: "Muling Pagsilang", s_rb_d: "90 Araw pagkatapos madapa", s_rs_t: "Pagkabuhay Muli", s_rs_d: "1 Taon pagkatapos madapa",
        s_dh_t: "Kamay na Diyamante", s_dh_d: "1 Taon sa unang subok", s_mo_t: "Ang Monolith", s_mo_d: "1000 Araw, Walang Sablay", s_vs_t: "Sumpa ng Katahimikan", s_vs_d: "1 Taon sa $0 na Laban"
    },
    "it": {
        days_c: "Giorni Pulito", saved: "Risparmiati", urg_b: "Tasto Impulso", v_m: "Nota Vocale", v_ms: "Note Vocali", s_p: "Preghiera", w_p: "Post", w_ps: "Post",
        t_1: "Primo Passo", t_7: "Una Settimana", t_14: "Quindici Giorni", t_30: "La Forgia", t_60: "Due Mesi", t_90: "Il Crogiolo", t_180: "Metà Anno", t_250: "Spartano", t_365: "Un Anno", t_500: "L'Avanguardia", t_730: "Due Anni", t_1000: "Il Millennio", t_1825: "Leggenda Vivente",
        f_10: "Primo Risparmio", f_50: "Cinquanta Dollari", f_100: "Salvadanaio", f_500: "Borsa Pesante", f_1000: "Tesoro", f_5000: "Tesoro del Drago", f_10000: "Riscatto Reale", f_25000: "Impero", f_50000: "Generazionale", f_100000: "Inarrestabile",
        u_1: "Prima Difesa", u_10: "Decima Vittoria", u_25: "Muro di Scudi", u_50: "Difensore", u_100: "La Sentinella", u_250: "Quarto di Mille", u_500: "Spezza Tempeste", u_1000: "Il Muro",
        m_1: "Voce Interiore", m_5: "Grido di Battaglia", m_15: "Voce della Ragione", m_30: "Trenta Registrazioni", m_50: "Il Cronista", m_100: "L'Archivista",
        r_1: "Prima Preghiera", r_10: "Novizio del Rituale", r_50: "Fedele", r_100: "Maestro del Rituale", r_365: "Devoto",
        w_1: "Primo Eco", w_10: "Guida del Santuario", w_25: "Pilastro", w_100: "Voce Globale",
        s_du_t: "Doppia Arma", s_du_d: "2 Serie Attive", s_ze_t: "Maestro Zen", s_ze_d: "5+ Serie", s_ju_t: "Giocoliere", s_ju_d: "3+ abitudini (2 sett)",
        s_nw_t: "Guardia Notturna", s_nw_d: "1 Impulso Notturno", s_nwm_t: "Sentinella Notturna", s_nwm_d: "10+ Impulsi Notturni", s_dd_t: "Difesa Diurna", s_dd_d: "1 Impulso diurno",
        s_qc_t: "Conquistatore Silenzioso", s_qc_d: "30 Giorni senza tasto", s_ev_t: "L'Evangelista", s_ev_d: "Più post che impulsi",
        s_hs_t: "Alte Poste", s_hs_d: "30 Giorni ($20+/giorno)", s_pp_t: "Risparmiatore", s_pp_d: "100 Giorni (<$2/giorno)",
        s_ei_t: "Eco di Ferro", s_ei_d: "Nota dopo 1 anno", s_px_t: "La Fenice", s_px_d: "30 Giorni dopo ricaduta",
        s_rb_t: "Rinascita", s_rb_d: "90 Giorni dopo ricaduta", s_rs_t: "Resurrezione", s_rs_d: "1 Anno dopo ricaduta",
        s_dh_t: "Mani di Diamante", s_dh_d: "1 Anno (1° tentativo)", s_mo_t: "Il Monolito", s_mo_d: "1000 Giorni, Zero Cadute", s_vs_t: "Voto di Silenzio", s_vs_d: "1 Anno (Lotta $0)"
    },
    "ko": {
        days_c: "일 연속", saved: "절약", urg_b: "충동 버튼", v_m: "개의 음성 메모", v_ms: "개의 음성 메모", s_p: "기도", w_p: "개의 게시물", w_ps: "개의 게시물",
        t_1: "첫 걸음", t_7: "자유로운 일주일", t_14: "2주일", t_30: "용광로", t_60: "두 달", t_90: "시련", t_180: "반년", t_250: "스파르타", t_365: "1년", t_500: "선봉대", t_730: "불굴의 2년", t_1000: "밀레니엄", t_1825: "살아있는 전설",
        f_10: "첫 저축", f_50: "50달러", f_100: "저금통", f_500: "무거운 지갑", f_1000: "보물", f_5000: "드래곤의 보물", f_10000: "왕의 몸값", f_25000: "제국", f_50000: "세대의 부", f_100000: "멈출 수 없는",
        u_1: "첫 방어", u_10: "열 번째 승리", u_25: "방패의 벽", u_50: "방어자", u_100: "파수꾼", u_250: "250회", u_500: "폭풍 파괴자", u_1000: "장벽",
        m_1: "내면의 소리", m_5: "전쟁의 함성", m_15: "이성의 목소리", m_30: "30개의 기록", m_50: "연대기 작가", m_100: "기록 보관자",
        r_1: "첫 기도", r_10: "의식 초보자", r_50: "충실한 자", r_100: "의식의 달인", r_365: "경건한 자",
        w_1: "첫 메아리", w_10: "안식처 안내자", w_25: "안식처의 기둥", w_100: "글로벌 보이스",
        s_du_t: "쌍검술", s_du_d: "2개의 활성 기록", s_ze_t: "선 마스터", s_ze_d: "5개 이상의 기록", s_ju_t: "저글링 마스터", s_ju_d: "3개 이상의 습관 2주 유지",
        s_nw_t: "야간 경비", s_nw_d: "1회의 심야 충동", s_nwm_t: "야간 파수꾼", s_nwm_d: "10회 이상의 심야 충동 생존", s_dd_t: "주간 방어", s_dd_d: "1회의 대낮 충동",
        s_qc_t: "침묵의 정복자", s_qc_d: "버튼 없이 30일", s_ev_t: "전도사", s_ev_d: "충동보다 게시물이 많음",
        s_hs_t: "하이 스테이크", s_hs_d: "30일 (일 $20+ 습관)", s_pp_t: "구두쇠", s_pp_d: "100일 (일 $2 미만 습관)",
        s_ei_t: "강철의 메아리", s_ei_d: "1년 유지 후 메모", s_px_t: "불사조", s_px_d: "실수 후 30일",
        s_rb_t: "환생", s_rb_d: "실수 후 90일", s_rs_t: "부활", s_rs_d: "실수 후 1년",
        s_dh_t: "다이아몬드 손", s_dh_d: "첫 시도에 1년 달성", s_mo_t: "모놀리스", s_mo_d: "1000일, 실수 없음", s_vs_t: "침묵의 맹세", s_vs_d: "$0 습관 1년 달성"
    },
    "pl": {
        days_c: "Dni Czystości", saved: "Zaoszczędzono", urg_b: "Przycisk Pokusy", v_m: "Notatka", v_ms: "Notatki", s_p: "Modlitwa", w_p: "Wpis", w_ps: "Wpisy",
        t_1: "Pierwszy Krok", t_7: "Wolny Tydzień", t_14: "Dwa Tygodnie", t_30: "Kuźnia", t_60: "Dwa Miesiące", t_90: "Tygiel", t_180: "Pół Roku", t_250: "Spartanin", t_365: "Jeden Rok", t_500: "Awangarda", t_730: "Dwa Lata", t_1000: "Milenium", t_1825: "Żywa Legenda",
        f_10: "Pierwsze Oszczędności", f_50: "Pięćdziesiąt", f_100: "Skarbonka", f_500: "Ciężka Sakwa", f_1000: "Skarb", f_5000: "Smoczy Skarb", f_10000: "Królewski Okup", f_25000: "Imperium", f_50000: "Pokoleniowe", f_100000: "Niepowstrzymany",
        u_1: "Pierwsza Obrona", u_10: "Dziesiąte Zwycięstwo", u_25: "Ściana Tarcz", u_50: "Obrońca", u_100: "Strażnik", u_250: "Ćwierć Tysiąca", u_500: "Łamacz Burz", u_1000: "Mur",
        m_1: "Wewnętrzny Głos", m_5: "Okrzyk Bojowy", m_15: "Głos Rozsądku", m_30: "Trzydzieści Nagrań", m_50: "Kronikarz", m_100: "Archiwista",
        r_1: "Pierwsza Modlitwa", r_10: "Nowicjusz Rytuału", r_50: "Wierny", r_100: "Mistrz Rytuału", r_365: "Pobożny",
        w_1: "Pierwsze Echo", w_10: "Przewodnik", w_25: "Filar Sanktuarium", w_100: "Globalny Głos",
        s_du_t: "Podwójne Ostrze", s_du_d: "2 Aktywne Serie", s_ze_t: "Mistrz Zen", s_ze_d: "5+ Aktywnych Serii", s_ju_t: "Żongler", s_ju_d: "3+ nawyki (2 tyg)",
        s_nw_t: "Nocna Straż", s_nw_d: "1 Nocna Pokusa", s_nwm_t: "Nocny Strażnik", s_nwm_d: "10+ Nocnych Pokus", s_dd_t: "Dzienna Obrona", s_dd_d: "1 Dzienna Pokusa",
        s_qc_t: "Cichy Zdobywca", s_qc_d: "30 Dni bez przycisku", s_ev_t: "Ewangelista", s_ev_d: "Więcej wpisów niż kliknięć",
        s_hs_t: "Wysokie Stawki", s_hs_d: "30 Dni (20+ /dzień)", s_pp_t: "Oszczędny", s_pp_d: "100 Dni (<2 /dzień)",
        s_ei_t: "Żelazne Echo", s_ei_d: "Notatka po 1 roku", s_px_t: "Feniks", s_px_d: "30 Dni po potknięciu",
        s_rb_t: "Odrodzenie", s_rb_d: "90 Dni po potknięciu", s_rs_t: "Zmartwychwstanie", s_rs_d: "1 Rok po potknięciu",
        s_dh_t: "Diamentowe Dłonie", s_dh_d: "1 Rok (1. próba)", s_mo_t: "Monolit", s_mo_d: "1000 Dni, Zero Potknięć", s_vs_t: "Śluby Milczenia", s_vs_d: "1 Rok (walka o 0)"
    },
    "sw": {
        days_c: "Siku Safi", saved: "Zimeokolewa", urg_b: "Kitufe cha Tamaa", v_m: "Sauti", v_ms: "Sauti", s_p: "Sala", w_p: "Ujumbe", w_ps: "Ujumbe",
        t_1: "Hatua ya Kwanza", t_7: "Wiki Moja", t_14: "Wiki Mbili", t_30: "Kiwanda", t_60: "Miezi Miwili", t_90: "Tanuru", t_180: "Nusu Mwaka", t_250: "Spartan", t_365: "Mwaka Mmoja", t_500: "Wa Kwanza", t_730: "Miaka Miwili", t_1000: "Milenia", t_1825: "Gwiji Hai",
        f_10: "Akiba ya Kwanza", f_50: "Hamsini", f_100: "Kibubu", f_500: "Pochi Nzito", f_1000: "Hazina", f_5000: "Hazina ya Joka", f_10000: "Fidia ya Mfalme", f_25000: "Ufalme", f_50000: "Kizazi", f_100000: "Haizuiliki",
        u_1: "Ulinzi wa Kwanza", u_10: "Ushindi wa Kumi", u_25: "Ukuta wa Ngao", u_50: "Mlinzi", u_100: "Mwangalizi", u_250: "Robo Elfu", u_500: "Mvunja Dhoruba", u_1000: "Ukuta",
        m_1: "Sauti ya Ndani", m_5: "Kilio cha Vita", m_15: "Sauti ya Akili", m_30: "Rekodi Thelathini", m_50: "Mwandishi", m_100: "Mweka Nyaraka",
        r_1: "Sala ya Kwanza", r_10: "Mwanafunzi wa Ibada", r_50: "Mwaminifu", r_100: "Mwalimu wa Ibada", r_365: "Mcha Mungu",
        w_1: "Mwangwi wa Kwanza", w_10: "Kiongozi", w_25: "Nguzo", w_100: "Sauti ya Dunia",
        s_du_t: "Silaha Mbili", s_du_d: "Mapambano 2", s_ze_t: "Mwalimu Zen", s_ze_d: "Mapambano 5+", s_ju_t: "Mchawi", s_ju_d: "Tabia 3+ (Wiki 2)",
        s_nw_t: "Mlinzi wa Usiku", s_nw_d: "Tamaa 1 ya Usiku", s_nwm_t: "Mwangalizi wa Usiku", s_nwm_d: "Tamaa 10+ za Usiku", s_dd_t: "Ulinzi wa Mchana", s_dd_d: "Tamaa 1 ya Mchana",
        s_qc_t: "Mshindi Mkimya", s_qc_d: "Siku 30 bila Kitufe", s_ev_t: "Mwinjilisti", s_ev_d: "Ujumbe mwingi kuliko tamaa",
        s_hs_t: "Dau Kubwa", s_hs_d: "Siku 30 ($20+/siku)", s_pp_t: "Mbahili", s_pp_d: "Siku 100 (<$2/siku)",
        s_ei_t: "Mwangwi wa Chuma", s_ei_d: "Rekodi baada ya Mwaka 1", s_px_t: "Phoenix", s_px_d: "Siku 30 baada ya kuteleza",
        s_rb_t: "Kuzaliwa Upya", s_rb_d: "Siku 90 baada ya kuteleza", s_rs_t: "Kufufuka", s_rs_d: "Mwaka 1 baada ya kuteleza",
        s_dh_t: "Mikono ya Almasi", s_dh_d: "Mwaka 1 (Jaribio la 1)", s_mo_t: "Mwamba", s_mo_d: "Siku 1000, Kuteleza 0", s_vs_t: "Kiapo cha Ukimya", s_vs_d: "Mwaka 1 ($0 Pambano)"
    }
};

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];
    
    // Determine the user's selected language
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const t = trophyDict[activeLang] || trophyDict['en'];

    // Helper function to easily push trophies to the array in exact order
    const addTrophy = (title, desc, icon, condition) => {
        earnedTrophies.push({ title, desc, icon, earned: condition });
    };

    // Helper for historical streak calculation (Permanent Badges)
    const getHistoricalStreaks = (habit) => {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const start = new Date(habit.startDate); start.setHours(0, 0, 0, 0);
        let streaks = []; let currentStart = start;
        if (!habit.slips || habit.slips.length === 0) { 
            streaks.push(Math.max(0, Math.floor((today - start) / 86400000))); 
            return streaks; 
        }
        habit.slips.forEach(slipStr => {
            const slipDate = new Date(slipStr); slipDate.setHours(0, 0, 0, 0);
            streaks.push(Math.max(0, Math.floor((slipDate - currentStart) / 86400000)));
            currentStart = new Date(slipDate.getTime() + 86400000); 
        });
        streaks.push(Math.max(0, Math.floor((today - currentStart) / 86400000)));
        return streaks;
    };

    // ==========================================
    // 1. TIMELINE TROPHIES
    // ==========================================
    const timelineData = [
        [1, t.t_1, "footprints"], [7, t.t_7, "calendar-check"], [14, t.t_14, "shield"],
        [30, t.t_30, "swords"], [60, t.t_60, "navigation"], [90, t.t_90, "anvil"],
        [180, t.t_180, "star"], [250, t.t_250, "crosshair"], [365, t.t_365, "sun"],
        [500, t.t_500, "flag"], [730, t.t_730, "shield-check"], [1000, t.t_1000, "crown"],
        [1825, t.t_1825, "sparkles"]
    ];

    timelineData.forEach(([days, title, icon]) => {
        addTrophy(title, `${days} ${t.days_c}`, icon, currentMainStreak >= days);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST
    // ==========================================
    const financeData = [
        [10, t.f_10, "coins"], [50, t.f_50, "wallet"], [100, t.f_100, "piggy-bank"],
        [500, t.f_500, "banknote"], [1000, t.f_1000, "gem"], [5000, t.f_5000, "castle"],
        [10000, t.f_10000, "landmark"], [25000, t.f_25000, "building"], [50000, t.f_50000, "diamond"],
        [100000, t.f_100000, "sparkles"]
    ];

    financeData.forEach(([amount, title, icon]) => {
        addTrophy(title, `$${amount} ${t.saved}`, icon, totalSavedValue >= amount);
    });

    // ==========================================
    // 3. THE URGE ENGINE
    // ==========================================
    const urgeData = [
        [1, t.u_1, "shield-alert"], [10, t.u_10, "swords"], [25, t.u_25, "bell-ring"],
        [50, t.u_50, "shield-check"], [100, t.u_100, "eye"], [250, t.u_250, "target"],
        [500, t.u_500, "zap"], [1000, t.u_1000, "brick-wall"]
    ];

    urgeData.forEach(([count, title, icon]) => {
        addTrophy(title, `${t.urg_b} ${count}x`, icon, state.urgeClicks >= count);
    });

    // ==========================================
    // 4. THE VAULT MEMOS
    // ==========================================
    const memoData = [
        [1, t.m_1, "mic"], [5, t.m_5, "mic-vocal"], [15, t.m_15, "book"],
        [30, t.m_30, "file-audio"], [50, t.m_50, "book-open"], [100, t.m_100, "archive"]
    ];

    memoData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} ${count > 1 ? t.v_ms : t.v_m}`, icon, state.voiceMemos >= count);
    });

    // ==========================================
    // 5. SERENITY RITUAL
    // ==========================================
    const ritualData = [
        [1, t.r_1, "hand-heart"], [10, t.r_10, "book-open"], [50, t.r_50, "heart"],
        [100, t.r_100, "church"], [365, t.r_365, "sun"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `${t.s_p} ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. THE WALL OF WISDOM
    // ==========================================
    const wallPostsCount = state.wallPosts || 0;
    const wallData = [
        [1, t.w_1, "message-square"], [10, t.w_10, "users"], 
        [25, t.w_25, "globe"], [100, t.w_100, "radio"]
    ];

    wallData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} ${count > 1 ? t.w_ps : t.w_p}`, icon, wallPostsCount >= count);
    });

    // ==========================================
    // 7. SPECIAL & CREATIVE CHALLENGES
    // ==========================================
    
    // Multi-Struggle Management
    addTrophy(t.s_du_t, t.s_du_d, "layers", activeStrugglesCount >= 2);
    addTrophy(t.s_ze_t, t.s_ze_d, "cpu", activeStrugglesCount >= 5);
    
    const isMasterJuggler = activeStrugglesCount >= 3 && currentMainStreak >= 14;
    addTrophy(t.s_ju_t, t.s_ju_d, "shapes", isMasterJuggler);

    // Timed Urge Battles
    addTrophy(t.s_nw_t, t.s_nw_d, "moon", state.midnightUrges >= 1);
    const isNightOwl = state.midnightUrges > state.middayUrges && state.midnightUrges >= 10;
    addTrophy(t.s_nwm_t, t.s_nwm_d, "moon", isNightOwl);

    addTrophy(t.s_dd_t, t.s_dd_d, "sun", state.middayUrges >= 1);

    // Behavior & Discipline
    const isQuietConqueror = currentMainStreak >= 30 && state.urgeClicks === 0;
    addTrophy(t.s_qc_t, t.s_qc_d, "ghost", isQuietConqueror);

    const isPreacher = wallPostsCount > state.urgeClicks && wallPostsCount >= 10;
    addTrophy(t.s_ev_t, t.s_ev_d, "megaphone", isPreacher);

    // Financial Sub-Challenges
    const hasHighStakes = state.habits.some(h => h.costPerDay >= 20 && calculateStreak(h) >= 30);
    addTrophy(t.s_hs_t, t.s_hs_d, "flame", hasHighStakes);

    const hasPennyPincher = state.habits.some(h => h.costPerDay > 0 && h.costPerDay <= 2 && calculateStreak(h) >= 100);
    addTrophy(t.s_pp_t, t.s_pp_d, "microscope", hasPennyPincher);

    // Veteran Actions
    addTrophy(t.s_ei_t, t.s_ei_d, "speaker", state.veteranMemos >= 1);

    // Post-Slip Resilience (Bouncing back stronger)
    const hasPhoenix = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 1 && s.slice(1).some(x => x >= 30);
    });
    addTrophy(t.s_px_t, t.s_px_d, "bird", hasPhoenix);

    const hasRebirth = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 90);
    addTrophy(t.s_rb_t, t.s_rb_d, "bird", hasRebirth);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy(t.s_rs_t, t.s_rs_d, "bird", hasResurrection);

    // Absolute Perfection (Zero slips since day 1)
    const hasDiamondHands = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 0 && s[0] >= 365;
    });
    addTrophy(t.s_dh_t, t.s_dh_d, "diamond", hasDiamondHands);
    
    const hasMonolith = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000);
    addTrophy(t.s_mo_t, t.s_mo_d, "landmark", hasMonolith);

    // Zero-Cost Habits (Quitting for pure discipline, not money)
    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy(t.s_vs_t, t.s_vs_d, "wind", hasVowSilence);

    // ==========================================
    // FINAL SORTING
    // Brings earned ones to the front, keeps unearned chronological
    // ==========================================
    
    earnedTrophies.forEach((t, index) => { t.originalIndex = index; });
    earnedTrophies.sort((a, b) => {
        if (a.earned && !b.earned) return -1;
        if (!a.earned && b.earned) return 1;
        return a.originalIndex - b.originalIndex;
    });
    earnedTrophies.forEach(t => delete t.originalIndex);

    return earnedTrophies;
}
