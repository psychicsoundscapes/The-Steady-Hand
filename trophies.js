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
        days_c: "Jours Propres", saved: "Économisé", urg_b: "Bouton d'Envie", v_m: "Mémo Vocal", v_ms: "Mémos Vocaux", s_p: "Prière", w_p: "Publication", w_ps: "Publications",
        t_1: "Premier Pas", t_7: "Une Semaine Libre", t_14: "Quinzaine", t_30: "La Forge", t_60: "Deux Mois", t_90: "Le Creuset", t_180: "Demi-Année", t_250: "Spartiate", t_365: "Un An", t_500: "L'Avant-garde", t_730: "Deux Ans", t_1000: "Le Millénaire", t_1825: "Légende Vivante",
        f_10: "Premières Économies", f_50: "Cinquante Dollars", f_100: "Tirelire", f_500: "Bourse Lourde", f_1000: "Trésor", f_5000: "Trésor de Dragon", f_10000: "Rançon de Roi", f_25000: "Empire", f_50000: "Générationnel", f_100000: "Inarrêtable",
        u_1: "Première Défense", u_10: "Dixième Victoire", u_25: "Mur de Boucliers", u_50: "Défenseur", u_100: "Le Veilleur", u_250: "Quart de Millier", u_500: "Brise-tempête", u_1000: "Le Mur",
        m_1: "Voix Intérieure", m_5: "Cri de Guerre", m_15: "Voix de la Raison", m_30: "Trente Registres", m_50: "Le Chroniqueur", m_100: "L'Archiviste",
        r_1: "Première Prière", r_10: "Novice du Rituel", r_50: "Fidèle", r_100: "Maître du Rituel", r_365: "Dévot",
        w_1: "Premier Écho", w_10: "Guide du Sanctuaire", w_25: "Pilier du Sanctuaire", w_100: "Voix Mondiale",
        s_du_t: "Double Lame", s_du_d: "2 Séries Actives", s_ze_t: "Maître Zen", s_ze_d: "5+ Séries Actives", s_ju_t: "Jongleur", s_ju_d: "3+ habitudes propres 2 sem.",
        s_nw_t: "Garde de Nuit", s_nw_d: "1 Envie Nocturne", s_nwm_t: "Veilleur de Nuit", s_nwm_d: "10+ Envies Nocturnes", s_dd_t: "Défense de Jour", s_dd_d: "1 Envie de Midi",
        s_qc_t: "Conquérant Silencieux", s_qc_d: "30 Jours sans le bouton", s_ev_t: "L'Évangéliste", s_ev_d: "Plus de publications que d'envies",
        s_hs_t: "Enjeux Élevés", s_hs_d: "30 Jours (20$+/jour)", s_pp_t: "Économe", s_pp_d: "100 Jours (<2$+/jour)",
        s_ei_t: "Écho de Fer", s_ei_d: "Mémo après 1 an propre", s_px_t: "Le Phénix", s_px_d: "30 Jours après rechute",
        s_rb_t: "Renaissance", s_rb_d: "90 Jours après rechute", s_rs_t: "Résurrection", s_rs_d: "1 An après rechute",
        s_dh_t: "Mains de Diamant", s_dh_d: "1 An au 1er essai", s_mo_t: "Le Monolithe", s_mo_d: "1000 Jours, 0 Rechute", s_vs_t: "Vœu de Silence", s_vs_d: "1 An sur Lutte de 0$"
    },
    "de": {
        days_c: "Tage Sauber", saved: "Gespart", urg_b: "Drang-Button", v_m: "Sprachnotiz", v_ms: "Sprachnotizen", s_p: "Gebet", w_p: "Beitrag", w_ps: "Beiträge",
        t_1: "Erster Schritt", t_7: "Eine Woche Frei", t_14: "Vierzehn Tage", t_30: "Die Schmiede", t_60: "Zwei Monate", t_90: "Der Schmelztiegel", t_180: "Halbes Jahr", t_250: "Spartaner", t_365: "Ein Jahr", t_500: "Die Vorhut", t_730: "Zwei Jahre", t_1000: "Das Jahrtausend", t_1825: "Lebende Legende",
        f_10: "Erste Ersparnisse", f_50: "Fünfzig Dollar", f_100: "Sparschwein", f_500: "Schwere Geldbörse", f_1000: "Schatz", f_5000: "Drachenhort", f_10000: "Königsgeld", f_25000: "Imperium", f_50000: "Generationen", f_100000: "Unaufhaltsam",
        u_1: "Erste Verteidigung", u_10: "Zehnter Sieg", u_25: "Schildwall", u_50: "Verteidiger", u_100: "Der Wächter", u_250: "Viertel Tausend", u_500: "Sturmbrecher", u_1000: "Die Mauer",
        m_1: "Innere Stimme", m_5: "Kriegsschrei", m_15: "Stimme der Vernunft", m_30: "Dreißig Aufzeichnungen", m_50: "Der Chronist", m_100: "Der Archivar",
        r_1: "Erstes Gebet", r_10: "Ritualnovize", r_50: "Gläubiger", r_100: "Ritualmeister", r_365: "Fromm",
        w_1: "Erstes Echo", w_10: "Heiligtumsführer", w_25: "Säule des Heiligtums", w_100: "Globale Stimme",
        s_du_t: "Doppelkämpfer", s_du_d: "2 aktive Serien", s_ze_t: "Zen-Meister", s_ze_d: "5+ aktive Serien", s_ju_t: "Jongleur", s_ju_d: "3+ saubere Gewohnheiten 2 Wochen",
        s_nw_t: "Nachtwache", s_nw_d: "1 nächtlicher Drang", s_nwm_t: "Nachtwächter", s_nwm_d: "10+ nächtliche Dränge", s_dd_t: "Tagesverteidigung", s_dd_d: "1 Mittagsdrang",
        s_qc_t: "Stiller Eroberer", s_qc_d: "30 Tage sauber ohne Button", s_ev_t: "Der Evangelist", s_ev_d: "Mehr Beiträge als Dränge",
        s_hs_t: "Hoher Einsatz", s_hs_d: "30 Tage sauber (20$+/Tag)", s_pp_t: "Sparfuchs", s_pp_d: "100 Tage sauber (<2$+/Tag)",
        s_ei_t: "Echo aus Eisen", s_ei_d: "Notiz nach 1 Jahr", s_px_t: "Der Phönix", s_px_d: "30 Tage nach Ausrutscher",
        s_rb_t: "Wiedergeburt", s_rb_d: "90 Tage nach Ausrutscher", s_rs_t: "Auferstehung", s_rs_d: "1 Jahr nach Ausrutscher",
        s_dh_t: "Diamanthände", s_dh_d: "1 Jahr beim 1. Versuch", s_mo_t: "Der Monolith", s_mo_d: "1000 Tage, 0 Ausrutscher", s_vs_t: "Schweigegelübde", s_vs_d: "1 Jahr bei 0$ Kampf"
    },
    "zh": {
        days_c: "天清白", saved: "已节省", urg_b: "冲动按钮", v_m: "语音备忘录", v_ms: "语音备忘录", s_p: "祷告", w_p: "留言", w_ps: "留言",
        t_1: "第一步", t_7: "自由一周", t_14: "两周", t_30: "熔炉", t_60: "两个月", t_90: "试炼", t_180: "半年", t_250: "斯巴达", t_365: "一年", t_500: "先锋", t_730: "坚不可摧两年", t_1000: "千禧年", t_1825: "活传奇",
        f_10: "初次储蓄", f_50: "五十美元", f_100: "存钱罐", f_500: "沉甸甸的钱包", f_1000: "宝藏", f_5000: "巨龙之宝", f_10000: "国王的赎金", f_25000: "帝国", f_50000: "世代财富", f_100000: "势不可挡",
        u_1: "首次防御", u_10: "十次胜利", u_25: "盾墙", u_50: "捍卫者", u_100: "守望者", u_250: "两百五", u_500: "风暴破坏者", u_1000: "这堵墙",
        m_1: "内心的声音", m_5: "战吼", m_15: "理性的声音", m_30: "三十记录", m_50: "编年史家", m_100: "档案员",
        r_1: "第一次祷告", r_10: "仪式新手", r_50: "虔诚", r_100: "仪式大师", r_365: "虔诚者",
        w_1: "第一次回声", w_10: "圣所向导", w_25: "圣所支柱", w_100: "全球之声",
        s_du_t: "双持者", s_du_d: "2个活跃记录", s_ze_t: "禅宗大师", s_ze_d: "5个以上的活跃记录", s_ju_t: "杂耍大师", s_ju_d: "3个以上习惯保持2周",
        s_nw_t: "守夜人", s_nw_d: "1次深夜冲动", s_nwm_t: "夜巡者", s_nwm_d: "挺过10次深夜冲动", s_dd_t: "日光防御", s_dd_d: "1次正午冲动",
        s_qc_t: "沉默征服者", s_qc_d: "30天没有冲动按钮", s_ev_t: "传道者", s_ev_d: "留言多于冲动点击",
        s_hs_t: "高风险", s_hs_d: "30天保持清白（20美元+）", s_pp_t: "守财奴", s_pp_d: "100天（每天少于2美元）",
        s_ei_t: "钢铁的回声", s_ei_d: "清白1年后的备忘录", s_px_t: "凤凰", s_px_d: "失误后的30天",
        s_rb_t: "重生", s_rb_d: "失误后的90天", s_rs_t: "复活", s_rs_d: "失误后的1年",
        s_dh_t: "钻石手", s_dh_d: "首次尝试1年", s_mo_t: "巨石", s_mo_d: "1000天，零失误", s_vs_t: "静默誓言", s_vs_d: "1年未花费"
    },
    "hi": {
        days_c: "स्वच्छ दिन", saved: "बचत", urg_b: "आवेग बटन", v_m: "वॉयस मेमो", v_ms: "वॉयस मेमो", s_p: "प्रार्थना", w_p: "पोस्ट", w_ps: "पोस्ट",
        t_1: "पहला कदम", t_7: "एक सप्ताह मुक्त", t_14: "दो सप्ताह", t_30: "फोर्ज", t_60: "दो महीने", t_90: "कठिन परीक्षा", t_180: "आधा साल", t_250: "स्पार्टन", t_365: "एक साल", t_500: "मोहरा", t_730: "अटूट दो साल", t_1000: "सहस्राब्दी", t_1825: "जीवित किंवदंती",
        f_10: "पहली बचत", f_50: "पचास डॉलर", f_100: "गुल्लक", f_500: "भारी पर्स", f_1000: "खजाना", f_5000: "ड्रैगन होर्ड", f_10000: "राजा की फिरौती", f_25000: "साम्राज्य", f_50000: "पीढ़ीगत", f_100000: "अजेय",
        u_1: "पहला बचाव", u_10: "दसवीं जीत", u_25: "ढाल दीवार", u_50: "रक्षक", u_100: "पहरेदार", u_250: "क्वार्टर हजार", u_500: "स्टॉर्म ब्रेकर", u_1000: "दीवार",
        m_1: "आंतरिक आवाज", m_5: "युद्ध का नारा", m_15: "तर्क की आवाज", m_30: "तीस रिकॉर्ड", m_50: "क्रॉनिकलर", m_100: "अभिलेखागार",
        r_1: "पहली प्रार्थना", r_10: "अनुष्ठान नौसिखिया", r_50: "वफादार", r_100: "अनुष्ठान मास्टर", r_365: "धर्मनिष्ठ",
        w_1: "पहली गूंज", w_10: "अभयारण्य गाइड", w_25: "अभयारण्य स्तंभ", w_100: "वैश्विक आवाज",
        s_du_t: "दोहरी धारक", s_du_d: "2 सक्रिय स्ट्रीक", s_ze_t: "ज़ेन मास्टर", s_ze_d: "5+ सक्रिय स्ट्रीक", s_ju_t: "मास्टर बाजीगर", s_ju_d: "2 सप्ताह के लिए 3+ आदतें साफ",
        s_nw_t: "नाइट वॉच", s_nw_d: "1 देर रात का आवेग", s_nwm_t: "नाइट वॉचमैन", s_nwm_d: "10+ देर रात के आवेगों का अस्तित्व", s_dd_t: "डेलाइट डिफेंस", s_dd_d: "1 दोपहर का आवेग",
        s_qc_t: "शांत विजेता", s_qc_d: "बटन के बिना 30 स्वच्छ दिन", s_ev_t: "इंजीलवादी", s_ev_d: "क्लिक से अधिक पोस्ट",
        s_hs_t: "हाई स्टेक्स", s_hs_d: "30 स्वच्छ दिन ($20+/दिन)", s_pp_t: "पेनी पिंचर", s_pp_d: "100 स्वच्छ दिन (<$2/दिन)",
        s_ei_t: "लोहे की गूंज", s_ei_d: "1 वर्ष के बाद मेमो", s_px_t: "फीनिक्स", s_px_d: "स्लिप के बाद 30 दिन",
        s_rb_t: "पुनर्जन्म", s_rb_d: "स्लिप के 90 दिन बाद", s_rs_t: "पुनरुत्थान", s_rs_d: "स्लिप के 1 वर्ष बाद",
        s_dh_t: "डायमंड हैंड्स", s_dh_d: "पहले प्रयास पर 1 साल", s_mo_t: "मोनोलिथ", s_mo_d: "1000 दिन, शून्य स्लिप", s_vs_t: "मौन व्रत", s_vs_d: "$0 संघर्ष पर 1 वर्ष"
    },
    "ar": {
        days_c: "أيام نظيفة", saved: "تم توفيره", urg_b: "زر الدافع", v_m: "مذكرة صوتية", v_ms: "مذكرات صوتية", s_p: "صلاة", w_p: "منشور", w_ps: "منشورات",
        t_1: "الخطوة الأولى", t_7: "أسبوع مجاني", t_14: "أسبوعان", t_30: "المصهر", t_60: "شهران", t_90: "البوتقة", t_180: "نصف سنة", t_250: "إسبرطي", t_365: "سنة واحدة", t_500: "الطليعة", t_730: "سنتان متواصلتان", t_1000: "الألفية", t_1825: "أسطورة حية",
        f_10: "المدخرات الأولى", f_50: "خمسون دولارًا", f_100: "حصالة", f_500: "محفظة ثقيلة", f_1000: "كنز", f_5000: "كنز التنين", f_10000: "فدية الملك", f_25000: "إمبراطورية", f_50000: "ثروة الأجيال", f_100000: "لا يمكن إيقافه",
        u_1: "الدفاع الأول", u_10: "الانتصار العاشر", u_25: "جدار الدرع", u_50: "المدافع", u_100: "المراقب", u_250: "ربع ألف", u_500: "كاسر العاصفة", u_1000: "الجدار",
        m_1: "الصوت الداخلي", m_5: "صرخة المعركة", m_15: "صوت العقل", m_30: "ثلاثون تسجيلاً", m_50: "المؤرخ", m_100: "أمين الأرشيف",
        r_1: "الصلاة الأولى", r_10: "مبتدئ الطقوس", r_50: "مخلص", r_100: "سيد الطقوس", r_365: "تقي",
        w_1: "الصدى الأول", w_10: "دليل الملاذ", w_25: "عمود الملاذ", w_100: "الصوت العالمي",
        s_du_t: "حامل السلاح المزدوج", s_du_d: "سلسلتان نشطتان", s_ze_t: "سيد زن", s_ze_d: "5+ سلاسل نشطة", s_ju_t: "المشعوذ", s_ju_d: "3+ عادات نظيفة لأسبوعين",
        s_nw_t: "المراقبة الليلية", s_nw_d: "دافع واحد في وقت متأخر", s_nwm_t: "الحارس الليلي", s_nwm_d: "النجاة من 10+ دوافع", s_dd_t: "دفاع ضوء النهار", s_dd_d: "دافع منتصف النهار",
        s_qc_t: "الفاتح الهادئ", s_qc_d: "30 يومًا دون زر", s_ev_t: "المبشر", s_ev_d: "منشورات أكثر من النقرات",
        s_hs_t: "مخاطر عالية", s_hs_d: "30 يومًا ($20+/يوم)", s_pp_t: "مقتصد", s_pp_d: "100 يوم (<$2/يوم)",
        s_ei_t: "صدى الحديد", s_ei_d: "مذكرة بعد عام", s_px_t: "العنقاء", s_px_d: "30 يومًا بعد انزلاق",
        s_rb_t: "الولادة من جديد", s_rb_d: "90 يومًا بعد انزلاق", s_rs_t: "القيامة", s_rs_d: "عام بعد انزلاق",
        s_dh_t: "أيادي ماسية", s_dh_d: "عام في المحاولة الأولى", s_mo_t: "الكتلة المتجانسة", s_mo_d: "1000 يوم، 0 انزلاقات", s_vs_t: "نذر الصمت", s_vs_d: "عام بصراع $0"
    },
    "pt": {
        days_c: "Dias Limpos", saved: "Salvo", urg_b: "Botão de Impulso", v_m: "Nota de Voz", v_ms: "Notas de Voz", s_p: "Oração", w_p: "Post", w_ps: "Posts",
        t_1: "Primeiro Passo", t_7: "Uma Semana Livre", t_14: "Quinzena", t_30: "A Forja", t_60: "Dois Meses", t_90: "O Crisol", t_180: "Meio Ano", t_250: "Espartano", t_365: "Um Ano", t_500: "A Vanguarda", t_730: "Dois Anos Ininterruptos", t_1000: "O Milênio", t_1825: "Lenda Viva",
        f_10: "Primeira Economia", f_50: "Cinquenta Dólares", f_100: "Cofrinho", f_500: "Bolsa Pesada", f_1000: "Tesouro", f_5000: "Tesouro do Dragão", f_10000: "Resgate de Rei", f_25000: "Império", f_50000: "Geracional", f_100000: "Imparável",
        u_1: "Primeira Defesa", u_10: "Décima Vitória", u_25: "Muralha de Escudos", u_50: "Defensor", u_100: "O Vigia", u_250: "Quarto de Milhar", u_500: "Quebra-Tormentas", u_1000: "O Muro",
        m_1: "Voz Interior", m_5: "Grito de Guerra", m_15: "Voz da Razão", m_30: "Trinta Registros", m_50: "O Cronista", m_100: "O Arquivista",
        r_1: "Primeira Oração", r_10: "Novato do Ritual", r_50: "Fiel", r_100: "Mestre do Ritual", r_365: "Devoto",
        w_1: "Primeiro Eco", w_10: "Guia do Santuário", w_25: "Pilar do Santuário", w_100: "Voz Global",
        s_du_t: "Empunhadura Dupla", s_du_d: "2 Sequências Ativas", s_ze_t: "Mestre Zen", s_ze_d: "5+ Sequências", s_ju_t: "Malabarista", s_ju_d: "3+ hábitos limpos por 2 sem.",
        s_nw_t: "Guarda Noturna", s_nw_d: "1 Impulso Noturno", s_nwm_t: "Vigia Noturno", s_nwm_d: "10+ Impulsos Noturnos", s_dd_t: "Defesa Diurna", s_dd_d: "1 Impulso de Meio-Dia",
        s_qc_t: "Conquistador Silencioso", s_qc_d: "30 Dias limpos sem botão", s_ev_t: "O Evangelista", s_ev_d: "Mais posts do que cliques",
        s_hs_t: "Apostas Altas", s_hs_d: "30 Dias ($20+/dia)", s_pp_t: "Pão-Duro", s_pp_d: "100 Dias (<$2/dia)",
        s_ei_t: "Eco de Ferro", s_ei_d: "Nota após 1 Ano Limpo", s_px_t: "A Fênix", s_px_d: "30 Dias após recaída",
        s_rb_t: "Renascimento", s_rb_d: "90 Dias após recaída", s_rs_t: "Ressurreição", s_rs_d: "1 Ano após recaída",
        s_dh_t: "Mãos de Diamante", s_dh_d: "1 Ano na 1ª tentativa", s_mo_t: "O Monolito", s_mo_d: "1000 Dias, Zero Recaídas", s_vs_t: "Voto de Silêncio", s_vs_d: "1 Ano em luta de $0"
    },
    "ru": {
        days_c: "Дней Чистоты", saved: "Сохранено", urg_b: "Кнопка Тяги", v_m: "Голосовая Заметка", v_ms: "Голосовые Заметки", s_p: "Молитва", w_p: "Пост", w_ps: "Посты",
        t_1: "Первый Шаг", t_7: "Неделя Свободы", t_14: "Две Недели", t_30: "Кузница", t_60: "Два Месяца", t_90: "Горнило", t_180: "Полгода", t_250: "Спартанец", t_365: "Один Год", t_500: "Авангард", t_730: "Два Года Подряд", t_1000: "Миллениум", t_1825: "Живая Легенда",
        f_10: "Первые Сбережения", f_50: "Пятьдесят Долларов", f_100: "Копилка", f_500: "Тяжелый Кошелек", f_1000: "Сокровище", f_5000: "Драконий Клад", f_10000: "Выкуп Короля", f_25000: "Империя", f_50000: "Богатство", f_100000: "Неостановимый",
        u_1: "Первая Защита", u_10: "Десятая Победа", u_25: "Стена Щитов", u_50: "Защитник", u_100: "Страж", u_250: "Четверть Тысячи", u_500: "Громобой", u_1000: "Стена",
        m_1: "Внутренний Голос", m_5: "Боевой Клич", m_15: "Голос Разума", m_30: "Тридцать Записей", m_50: "Хроникер", m_100: "Архивариус",
        r_1: "Первая Молитва", r_10: "Новичок Ритуала", r_50: "Верный", r_100: "Мастер Ритуала", r_365: "Набожный",
        w_1: "Первое Эхо", w_10: "Гид Убежища", w_25: "Опора Убежища", w_100: "Глобальный Голос",
        s_du_t: "С Двумя Клинками", s_du_d: "2 Активные Серии", s_ze_t: "Мастер Дзен", s_ze_d: "5+ Активных Серий", s_ju_t: "Жонглер", s_ju_d: "3+ привычки чисто 2 недели",
        s_nw_t: "Ночной Дозор", s_nw_d: "1 Ночная Тяга", s_nwm_t: "Ночной Страж", s_nwm_d: "Пережито 10+ Ночных Тяг", s_dd_t: "Дневная Защита", s_dd_d: "1 Полуденная Тяга",
        s_qc_t: "Тихий Завоеватель", s_qc_d: "30 Дней без кнопки тяги", s_ev_t: "Евангелист", s_ev_d: "Постов больше, чем тяг",
        s_hs_t: "Высокие Ставки", s_hs_d: "30 Дней ($20+/день)", s_pp_t: "Скряга", s_pp_d: "100 Дней (<$2/день)",
        s_ei_t: "Эхо Железа", s_ei_d: "Заметка после 1 года", s_px_t: "Феникс", s_px_d: "30 Дней после срыва",
        s_rb_t: "Возрождение", s_rb_d: "90 Дней после срыва", s_rs_t: "Воскрешение", s_rs_d: "1 Год после срыва",
        s_dh_t: "Алмазные Руки", s_dh_d: "1 Год с первой попытки", s_mo_t: "Монолит", s_mo_d: "1000 Дней, 0 Срывов", s_vs_t: "Обет Молчания", s_vs_d: "1 Год на $0 Борьбе"
    },
    "ja": {
        days_c: "日クリーン", saved: "節約", urg_b: "衝動ボタン", v_m: "音声メモ", v_ms: "音声メモ", s_p: "祈り", w_p: "投稿", w_ps: "投稿",
        t_1: "第一歩", t_7: "一週間", t_14: "二週間", t_30: "鍛冶場", t_60: "二ヶ月", t_90: "試練のるつぼ", t_180: "半年", t_250: "スパルタ", t_365: "一年", t_500: "先鋒", t_730: "揺るぎなき二年", t_1000: "ミレニアム", t_1825: "生ける伝説",
        f_10: "初めての貯金", f_50: "50ドル", f_100: "貯金箱", f_500: "重い財布", f_1000: "宝物", f_5000: "ドラゴンの宝", f_10000: "王の身代金", f_25000: "帝国", f_50000: "世代の富", f_100000: "アンストッパブル",
        u_1: "最初の防衛", u_10: "十回目の勝利", u_25: "盾の壁", u_50: "防衛者", u_100: "見張り", u_250: "四分の一千", u_500: "嵐を砕く者", u_1000: "壁",
        m_1: "内なる声", m_5: "雄叫び", m_15: "理性の声", m_30: "三十の記録", m_50: "年代記編者", m_100: "アーキビスト",
        r_1: "最初の祈り", r_10: "儀式の初心者", r_50: "忠実", r_100: "儀式の達人", r_365: "敬虔",
        w_1: "最初の反響", w_10: "聖域 of 柱", w_25: "聖域の柱", w_100: "グローバルな声",
        s_du_t: "二刀流", s_du_d: "2つのアクティブな連続記録", s_ze_t: "禅マスター", s_ze_d: "5つ以上の記録", s_ju_t: "マスタージャグラー", s_ju_d: "3つ以上の習慣を2週間クリーン",
        s_nw_t: "夜警", s_nw_d: "1回の深夜の衝動", s_nwm_t: "夜警隊員", s_nwm_d: "10回以上の深夜の衝動を乗り切る", s_dd_t: "昼光防衛", s_dd_d: "1回の真昼の衝動",
        s_qc_t: "静かなる征服者", s_qc_d: "衝動ボタンなしで30日クリーン", s_ev_t: "伝道師", s_ev_d: "クリック数より多い投稿",
        s_hs_t: "ハイステークス", s_hs_d: "30日クリーン（$20+/日）", s_pp_t: "倹約家", s_pp_d: "100日クリーン（<$2/日）",
        s_ei_t: "鉄の反響", s_ei_d: "1年クリーン後のメモ", s_px_t: "フェニックス", s_px_d: "スリップから30日後",
        s_rb_t: "再生", s_rb_d: "スリップから90日後", s_rs_t: "復活", s_rs_d: "スリップから1年後",
        s_dh_t: "ダイヤモンドの腕", s_dh_d: "最初の挑戦で1年", s_mo_t: "モノリス", s_mo_d: "1000日、スリップなし", s_vs_t: "沈黙の誓い", s_vs_d: "$0の闘いで1年"
    },
    "he": {
        days_c: "ימים נקיים", saved: "נחסך", urg_b: "כפתור דחף", v_m: "הקלטה קולית", v_ms: "הקלטות קוליות", s_p: "תפילה", w_p: "פוסט", w_ps: "פוסטים",
        t_1: "צעд ראשון", t_7: "שבוע חופשי", t_14: "שבועיים", t_30: "הכבשן", t_60: "חודשיים", t_90: "המצרף", t_180: "חצי שנה", t_250: "ספרטני", t_365: "שנה אחת", t_500: "החלוץ", t_730: "שנתיים רצופות", t_1000: "המילניウム", t_1825: "אגדה חיה",
        f_10: "חיסכון ראשון", f_50: "חמישים דולר", f_100: "קופת חיסכון", f_500: "ארנק כבד", f_1000: "אוצר", f_5000: "אוצר דרקון", f_10000: "כופר מלך", f_25000: "אימפריה", f_50000: "עושר דורי", f_100000: "בלתי ניתן לעצירה",
        u_1: "הגנה ראשונה", u_10: "ניצחون עשירי", u_25: "חומת מגן", u_50: "מגן", u_100: "השומר", u_250: "רבע אלף", u_500: "שובר סערות", u_1000: "החומה",
        m_1: "קול פנימי", m_5: "זעקת קרบ", m_15: "קול ההיגיון", m_30: "שלושים רשומות", m_50: "המתעד", m_100: "הארכיונאי",
        r_1: "תפילה ראשונה", r_10: "טירון טקסים", r_50: "נאמן", r_100: "מאסטר טקסים", r_365: "אדוק",
        w_1: "הד ראשון", w_10: "מדריך המקלט", w_25: "עמוד תווך", w_100: "קול עולמי",
        s_du_t: "אוחז כפול", s_du_d: "2 רצפים פעילים", s_ze_t: "מאסטר זן", s_ze_d: "5+ רצפים פעילים", s_ju_t: "להטוטן מאסטר", s_ju_d: "3+ הרגלים נקיים לשבועיים",
        s_nw_t: "משמר הלילה", s_nw_d: "דחף לילי אחד", s_nwm_t: "שומר הלילה", s_nwm_d: "הישרדות של 10+ דחפים ליליים", s_dd_t: "הגנת יום", s_dd_d: "דחף צהריים 1",
        s_qc_t: "כובש שקט", s_qc_d: "30 ימים נקיים ללא כפתור דחף", s_ev_t: "האוונגلیסט", s_ev_d: "יותר פוסטים מקליקים",
        s_hs_t: "הימורים גבוהים", s_hs_d: "30 ימים ($20+/יום)", s_pp_t: "חסכן", s_pp_d: "100 ימים (<$2/יום)",
        s_ei_t: "הד של ברזל", s_ei_d: "הקלטה לאחר שנה נקייה", s_px_t: "הפניקס", s_px_d: "30 ימים אחרי מעידה",
        s_rb_t: "לידה מחדש", s_rb_d: "90 ימים אחרי מעידה", s_rs_t: "תחייה", s_rs_d: "שנה 1 אחרי מעידה",
        s_dh_t: "ידי יהלום", s_dh_d: "שנה 1 בניסיון ראשון", s_mo_t: "המונולית", s_mo_d: "1000 ימים, אפס מעידות", s_vs_t: "נדר שתיקה", s_vs_d: "שנה 1 על מאבק $0"
    },
    "tl": {
        days_c: "Araw na Malinis", saved: "Nai-save", urg_b: "Urge Button", v_m: "Voice Memo", v_ms: "Voice Memos", s_p: "Panalangin", w_p: "Post", w_ps: "Posts",
        t_1: "Unang Hakbang", t_7: "Isang Linggong Malaya", t_14: "Kalahating Buwan", t_30: "Ang Forge", t_60: "Dalawang Buwan", t_90: "Ang Crucible", t_180: "Kalahating Taon", t_250: "Spartan", t_365: "Isang Taon", t_500: "Ang Vanguard", t_730: "Dalawang Taong Walang Patid", t_1000: "Ang Milenyo", t_1825: "Buhay na Alamat",
        f_10: "Unang Ipon", f_50: "Limampung Dolyar", f_100: "Piggy Bank", f_500: "Mabigat na Pitaka", f_1000: "Kayamanan", f_5000: "Dragon Hoard", f_10000: "King's Ransom", f_25000: "Imperyo", f_50000: "Generational", f_100000: "Unstoppable",
        u_1: "Unang Depensa", u_10: "Ikasampung Tagumpay", u_25: "Shield Wall", u_50: "Defender", u_100: "Ang Watchman", u_250: "Quarter Thousand", u_500: "Storm Breaker", u_1000: "Ang Pader",
        m_1: "Panloob na Boses", m_5: "War Cry", m_15: "Boses ng Dahilan", m_30: "Tatlumpung Rekord", m_50: "Ang Chronicler", m_100: "Ang Archivist",
        r_1: "Unang Panalangin", r_10: "Ritual Novice", r_50: "Matapat", r_100: "Ritual Master", r_365: "Deboto",
        w_1: "Unang Echo", w_10: "Sanctuary Guide", w_25: "Sanctuary Pillar", w_100: "Global Voice",
        s_du_t: "Dual Wielder", s_du_d: "2 Active Streaks", s_ze_t: "Zen Master", s_ze_d: "5+ Active Streaks", s_ju_t: "Master Juggler", s_ju_d: "3+ habits clean 2 weeks",
        s_nw_t: "Night Watch", s_nw_d: "1 Late-Night Urge", s_nwm_t: "Night Watchman", s_nwm_d: "Survival of 10+ Late-Night Urges", s_dd_t: "Daylight Defense", s_dd_d: "1 Midday Urge",
        s_qc_t: "Tahimik na Mananakop", s_qc_d: "30 Days Clean walang Urge button", s_ev_t: "Ang Evangelist", s_ev_d: "Mas maraming post kaysa clicks",
        s_hs_t: "Mataas na Pusta", s_hs_d: "30 Days Clean ($20+/day)", s_pp_t: "Penny Pincher", s_pp_d: "100 Days Clean (<$2/day)",
        s_ei_t: "Echo of Iron", s_ei_d: "Memo pagkatapos ng 1 Taon", s_px_t: "Ang Phoenix", s_px_d: "30 Araw pagkatapos ng Slip",
        s_rb_t: "Muling Pagsilang", s_rb_d: "90 Araw pagkatapos ng Slip", s_rs_t: "Muling Pagkabuhay", s_rs_d: "1 Taon pagkatapos ng Slip",
        s_dh_t: "Diamond Hands", s_dh_d: "1 Taon sa unang pagsubok", s_mo_t: "Ang Monolith", s_mo_d: "1000 Araw, Zero Slips", s_vs_t: "Vow of Silence", s_vs_d: "1 Taon sa $0 Struggle"
    },
    "it": {
        days_c: "Giorni Pulito", saved: "Risparmiato", urg_b: "Pulsante Impulso", v_m: "Memo Vocale", v_ms: "Memo Vocali", s_p: "Preghiera", w_p: "Post", w_ps: "Post",
        t_1: "Primo Passo", t_7: "Una Settimana Libero", t_14: "Quindici Giorni", t_30: "La Forgia", t_60: "Due Mesi", t_90: "Il Crogiolo", t_180: "Metà Anno", t_250: "Spartano", t_365: "Un Anno", t_500: "L'Avanguardia", t_730: "Due Anni", t_1000: "Il Millennio", t_1825: "Leggenda Vivente",
        f_10: "Primi Risparmi", f_50: "Cinquanta Dollari", f_100: "Salvadanaio", f_500: "Borsa Pesante", f_1000: "Tesoro", f_5000: "Tesoro del Drago", f_10000: "Riscatto del Re", f_25000: "Impero", f_50000: "Generazionale", f_100000: "Inarrestabile",
        u_1: "Prima Difesa", u_10: "Decima Vittoria", u_25: "Muro di Scudi", u_50: "Difensore", u_100: "La Sentinella", u_250: "Quarto di Mille", u_500: "Scassa Tempeste", u_1000: "Il Muro",
        m_1: "Voce Interiore", m_5: "Grido di Battaglia", m_15: "Voce della Ragione", m_30: "Trenta Record", m_50: "Il Cronista", m_100: "L'Archivista",
        r_1: "Prima Preghiera", r_10: "Novizio del Rituale", r_50: "Fedele", r_100: "Maestro del Rituale", r_365: "Devoto",
        w_1: "Primo Eco", w_10: "Guida del Santuario", w_25: "Pilastro del Santuario", w_100: "Voce Globale",
        s_du_t: "Doppia Lama", s_du_d: "2 Serie Attive", s_ze_t: "Maestro Zen", s_ze_d: "5+ Serie Attive", s_ju_t: "Giocoliere", s_ju_d: "3+ abitudini pulite per 2 sett.",
        s_nw_t: "Guardia Notturna", s_nw_d: "1 Impulso Notturno", s_nwm_t: "Vigile Notturno", s_nwm_d: "10+ Impulsi Notturni superati", s_dd_t: "Difesa Diurna", s_dd_d: "1 Impulso di Mezzogiorno",
        s_qc_t: "Conquistatore Silenzioso", s_qc_d: "30 Giorni senza pulsante", s_ev_t: "L'Evangelista", s_ev_d: "Più post que impulsi",
        s_hs_t: "Poste Alte", s_hs_d: "30 Giorni ($20+/giorno)", s_pp_t: "Tirchio", s_pp_d: "100 Giorni (<$2/giorno)",
        s_ei_t: "Eco di Ferro", s_ei_d: "Memo dopo 1 Anno pulito", s_px_t: "La Fenice", s_px_d: "30 Giorni dopo una ricaduta",
        s_rb_t: "Rinascita", s_rb_d: "90 Giorni dopo ricaduta", s_rs_t: "Resurrezione", s_rs_d: "1 Anno dopo ricaduta",
        s_dh_t: "Mani di Diamante", s_dh_d: "1 Anno al 1° tentativo", s_mo_t: "Il Monolito", s_mo_d: "1000 Giorni, 0 Ricadute", s_vs_t: "Voto di Silenzio", s_vs_d: "1 Anno su Lotta da $0"
    },
    "ko": {
        days_c: "일 클린", saved: "절약됨", urg_b: "충동 버튼", v_m: "음성 메모", v_ms: "음성 메모", s_p: "기도", w_p: "게시물", w_ps: "게시물",
        t_1: "첫 걸음", t_7: "자유로운 일주일", t_14: "2주일", t_30: "용광로", t_60: "두 달", t_90: "시련", t_180: "반년", t_250: "스파르타", t_365: "1년", t_500: "선봉대", t_730: "단절 없는 2년", t_1000: "밀레니엄", t_1825: "살아있는 전설",
        f_10: "첫 저축", f_50: "50달러", f_100: "돼지 저금통", f_500: "무거운 지갑", f_1000: "보물", f_5000: "드래곤의 보물", f_10000: "왕의 몸값", f_25000: "제국", f_50000: "세대", f_100000: "멈출 수 없는",
        u_1: "첫 방어", u_10: "열 번째 승리", u_25: "방패 벽", u_50: "수호자", u_100: "파수꾼", u_250: "250회", u_500: "폭풍 파괴자", u_1000: "벽",
        m_1: "내면의 목소리", m_5: "함성", m_15: "이성의 목소리", m_30: "30개의 기록", m_50: "연대기 작가", m_100: "기록 보관자",
        r_1: "첫 기도", r_10: "의식 초보자", r_50: "신실한", r_100: "의식 마스터", r_365: "독실한",
        w_1: "첫 메아리", w_10: "안식처 가이드", w_25: "안식처 기둥", w_100: "글로벌 보이스",
        s_du_t: "쌍검술사", s_du_d: "2개의 활성 기록", s_ze_t: "젠 마스터", s_ze_d: "5개 이상 활성 기록", s_ju_t: "마스터 저글러", s_ju_d: "3개 이상 습관 2주 클린",
        s_nw_t: "야간 경비", s_nw_d: "1회의 심야 충동", s_nwm_t: "야간 파수꾼", s_nwm_d: "10회 이상 심야 충동 생존", s_dd_t: "주간 방어", s_dd_d: "1회의 한낮 충동",
        s_qc_t: "조용한 정복자", s_qc_d: "충동 버튼 없이 30일 클린", s_ev_t: "전도사", s_ev_d: "버튼 클릭보다 많은 게시물",
        s_hs_t: "하이 스테이크", s_hs_d: "30일 클린 ($20+/일)", s_pp_t: "구두쇠", s_pp_d: "100일 클린 (<$2/일)",
        s_ei_t: "철의 메아리", s_ei_d: "1년 클린 후 메모", s_px_t: "불사조", s_px_d: "실수 후 30일",
        s_rb_t: "환생", s_rb_d: "실수 후 90일", s_rs_t: "부활", s_rs_d: "실수 후 1년",
        s_dh_t: "다이а몬드 핸드", s_dh_d: "첫 시도에 1년", s_mo_t: "모놀리스", s_mo_d: "1000일, 실수 없음", s_vs_t: "침묵의 맹세", s_vs_d: "$0 싸움에서 1년"
    },
    "pl": {
        days_c: "Dni Czystości", saved: "Zaoszczędzono", urg_b: "Przycisk Pokusy", v_m: "Notatka Głosowa", v_ms: "Notatki Głosowe", s_p: "Modlitwa", w_p: "Post", w_ps: "Posty",
        t_1: "Pierwszy Krok", t_7: "Tydzień Wolności", t_14: "Dwa Tygodnie", t_30: "Kuźnia", t_60: "Dwa Miesiące", t_90: "Tygiel", t_180: "Pół Roku", t_250: "Spartanin", t_365: "Jeden Rok", t_500: "Awangarda", t_730: "Dwa Lata", t_1000: "Millennium", t_1825: "Żywa Legenda",
        f_10: "Pierwsze Oszczędności", f_50: "Pięćdziesiąt Dolarów", f_100: "Skarbonka", f_500: "Ciężka Sakiewka", f_1000: "Skarb", f_5000: "Smoczy Skarb", f_10000: "Królewski Okup", f_25000: "Imperium", f_50000: "Pokoleniowy", f_100000: "Niepowstrzymany",
        u_1: "Pierwsza Obrona", u_10: "Dziesiąte Zwycięstwo", u_25: "Ściana Tarcz", u_50: "Obrońca", u_100: "Strażnik", u_250: "Ćwierć Tysiąca", u_500: "Łamacz Burz", u_1000: "Ściana",
        m_1: "Wewnętrzny Głos", m_5: "Okrzyk Bojowy", m_15: "Głos Rozsądku", m_30: "Trzydzieści Nagrań", m_50: "Kronikarz", m_100: "Archiwista",
        r_1: "Pierwsza Modlitwa", r_10: "Nowicjusz Rytuału", r_50: "Wierny", r_100: "Mistrz Rytuału", r_365: "Pobożny",
        w_1: "Pierwsze Echa", w_10: "Przewodnik Sanktuarium", w_25: "Filar Sanktuarium", w_100: "Globalny Głos",
        s_du_t: "Podwójne Ostrze", s_du_d: "2 Aktywne Serie", s_ze_t: "Mistrz Zen", s_ze_d: "5+ Aktywnych Serii", s_ju_t: "Żongler", s_ju_d: "3+ nawyki czyste przez 2 tyg.",
        s_nw_t: "Nocna Straż", s_nw_d: "1 Nocna Pokusa", s_nwm_t: "Nocny Strażnik", s_nwm_d: "Przetrwanie 10+ Nocnych Pokus", s_dd_t: "Dzienna Obrona", s_dd_d: "1 Pokusa w Południe",
        s_qc_t: "Cichy Zdobywca", s_qc_d: "30 Dni bez przycisku", s_ev_t: "Ewangelista", s_ev_d: "Więcej postów niż kliknięć",
        s_hs_t: "Wysoka Stawka", s_hs_d: "30 Dni ($20+/dzień)", s_pp_t: "Skąpiec", s_pp_d: "100 Dni (<$2/dzień)",
        s_ei_t: "Echo Żelaza", s_ei_d: "Notatka po 1 Roku czystości", s_px_t: "Feniks", s_px_d: "30 Dni po potknięciu",
        s_rb_t: "Odrodzenie", s_rb_d: "90 Dni po potknięciu", s_rs_t: "Zmartwychwstanie", s_rs_d: "1 Rok po potknięciu",
        s_dh_t: "Diamentowe Dłonie", s_dh_d: "1 Rok za pierwszym razem", s_mo_t: "Monolit", s_mo_d: "1000 Dni, 0 Potknięć", s_vs_t: "Ślub Milczenia", s_vs_d: "1 Rok przy walce za $0"
    },
    "sw": {
        days_c: "Siku Safi", saved: "Zimeokolewa", urg_b: "Kitufe cha Tamaa", v_m: "Ujumbe wa Sauti", v_ms: "Ujumbe wa Sauti", s_p: "Sala", w_p: "Chapisho", w_ps: "Machapisho",
        t_1: "Hatua ya Kwanza", t_7: "Wiki Moja Huru", t_14: "Wiki Mbili", t_30: "Tanuru", t_60: "Miezi Miwili", t_90: "Jaribu Kesi", t_180: "Nusu Mwaka", t_250: "Spartan", t_365: "Mwaka Mmoja", t_500: "Mlinzi", t_730: "Miaka Miwili Mfululizo", t_1000: "Milenia", t_1825: "Nguli Hai",
        f_10: "Akiiba ya Kwanza", f_50: "Dola Hamsini", f_100: "Benki Ndogo", f_500: "Pochi Nzito", f_1000: "Hazina", f_5000: "Hazina ya Joka", f_10000: "Fidia ya Mfalme", f_25000: "Dola", f_50000: "Kizazi", f_100000: "Haiwezi Kuzuilika",
        u_1: "Ulinzi wa Kwanza", u_10: "Ushindi wa Kumi", u_25: "Ukuta wa Ngao", u_50: "Mlinzi", u_100: "Mwangalizi", u_250: "Robo Elfu", u_500: "Mvunja Dhoruba", u_1000: "Ukuta",
        m_1: "Sauti ya Ndani", m_5: "Kilio cha Vita", m_15: "Sauti ya Mantiki", m_30: "Rekodi Thelathini", m_50: "Mwandishi", m_100: "Mhifadhi",
        r_1: "Sala ya Kwanza", r_10: "Mwanafunzi wa Ibada", r_50: "Mwamini", r_100: "Mwalimu wa Ibada", r_365: "Mcha Mungu",
        w_1: "Mwangwi wa Kwanza", w_10: "Mwongozo wa Patakatifu", w_25: "Nguzo ya Patakatifu", w_100: "Sauti ya Ulimwengu",
        s_du_t: "Mshikaji Mbili", s_du_d: "Michirizi 2 Hai", s_ze_t: "Mwalimu wa Zen", s_ze_d: "Michirizi 5+ Hai", s_ju_t: "Mazingaombwe Mkuu", s_ju_d: "Tabia 3+ safi wiki 2",
        s_nw_t: "Mlinzi wa Usiku", s_nw_d: "Tamaa 1 ya Usiku", s_nwm_t: "Mlinzi Usiku", s_nwm_d: "Kuvumilia Tamaa 10+ Usiku", s_dd_t: "Ulinzi Mchana", s_dd_d: "Tamaa 1 ya Mchana",
        s_qc_t: "Mshindi Mkimya", s_qc_d: "Siku 30 Safi bila Kitufe", s_ev_t: "Mhubiri", s_ev_d: "Machapisho Mengi kuliko Mibofyo",
        s_hs_t: "Dau Kubwa", s_hs_d: "Siku 30 Safi ($20+/siku)", s_pp_t: "Mbanaji", s_pp_d: "Siku 100 Safi (<$2/siku)",
        s_ei_t: "Mwangwi wa Chuma", s_ei_d: "Sauti baada ya Mwaka 1", s_px_t: "Kifaranza", s_px_d: "Siku 30 baada ya Kuteleza",
        s_rb_t: "Kuzaliwa Upya", s_rb_d: "Siku 90 baada ya Kuteleza", s_rs_t: "Ufufuo", s_rs_d: "Mwaka 1 baada ya Kuteleza",
        s_dh_t: "Mikono ya Almasi", s_dh_d: "Mwaka 1 kwenye jaribio la 1", s_mo_t: "Mwamba", s_mo_d: "Siku 1000, Hakuna Kuteleza", s_vs_t: "Kiapo cha Ukimya", s_vs_d: "Mwaka 1 kwenye Pambano la $0"
    },
    "fa": {
        days_c: "روزهای پاک", saved: "پس‌انداز شده", urg_b: "دکمه وسوسه", v_m: "یادداشت صوتی", v_ms: "یادداشت‌های صوتی", s_p: "دعای آرامش", w_p: "پست دیوار", w_ps: "پست‌های دیوار",
        t_1: "اولین قدم", t_7: "یک هفته رهایی", t_14: "دو هفته", t_30: "کوره آتش", t_60: "دو ماه", t_90: "نقطه عطف", t_180: "نیم سال", t_250: "اسپارتان", t_365: "یک سال", t_500: "پیشگام", t_730: "دو سال پیوسته", t_1000: "هزاره", t_1825: "افسانه زنده",
        f_10: "اولین پس‌انداز", f_50: "پنجاه دلار", f_100: "قلک", f_500: "کیف سنگین", f_1000: "گنجینه", f_5000: "گنج اژدها", f_10000: "فدیه پادشاه", f_25000: "امپراتوری", f_50000: "نسلی", f_100000: "توقف‌ناپذیر",
        u_1: "اولین دفاع", u_10: "دهمین پیروزی", u_25: "دیوار سپر", u_50: "مدافع", u_100: "نگهبان", u_250: "ربع هزار", u_500: "طوفان‌شکن", u_1000: "دیوار",
        m_1: "صدای درون", m_5: "نعره جنگی", m_15: "صدای منطق", m_30: "سی ثبت", m_50: "وقایع‌نگار", m_100: "آرشیویست",
        r_1: "اولین دعا", r_10: "تازه‌کار مراسم", r_50: "وفادار", r_100: "استاد مراسم", r_365: "پرهیزگار",
        w_1: "اولین پژواک", w_10: "راهنمای پناهگاه", w_25: "ستون پناهگاه", w_100: "صدای جهانی",
        s_du_t: "شمشیرزن دو دست", s_du_d: "۲ رکورد فعال", s_ze_t: "استاد ذن", s_ze_d: "۵+ رکورد فعال", s_ju_t: "استاد تردستی", s_ju_d: "۳+ عادت پاک برای ۲ هفته",
        s_nw_t: "نگهبان شب", s_nw_d: "۱ وسوسه آخر شب", s_nwm_t: "پاسبان شب", s_nwm_d: "بقا در برابر ۱۰+ وسوسه آخر شب", s_dd_t: "دفاع روزانه", s_dd_d: "۱ وسوسه نیمروزی",
        s_qc_t: "فاتح خاموش", s_qc_d: "۳۰ روز پاکی بدون دکمه وسوسه", s_ev_t: "مبلغ", s_ev_d: "پست‌های دیوار بیشتر از کلیک‌های وسوسه",
        s_hs_t: "شرط‌های بزرگ", s_hs_d: "۳۰ روز پاکی (عادت ۲۰$+ در روز)", s_pp_t: "مقتصد", s_pp_d: "۱۰۰ روز پاکی (عادت <۲$ در روز)",
        s_ei_t: "پژواک آهن", s_ei_d: "یادداشت پس از ۱ سال پاکی", s_px_t: "ققنوس", s_px_d: "۳۰ روز پس از لغزش",
        s_rb_t: "تولد دوباره", s_rb_d: "۹۰ روز پس از لغزش", s_rs_t: "رستاخیز", s_rs_d: "۱ سال پس از لغزش",
        s_dh_t: "دست‌های الماسی", s_dh_d: "۱ سال در اولین تلاش", s_mo_t: "سنگ‌بنا", s_mo_d: "۱۰۰۰ روز، صفر لغزش", s_vs_t: "پیمان سکوت", s_vs_d: "۱ سال در مبارزه ۰$"
    },
    "ms": {
        days_c: "Hari Bersih", saved: "Disimpan", urg_b: "Butang Keinginan", v_m: "Memo Suara", v_ms: "Memo Suara", s_p: "Doa Ketenangan", w_p: "Siaran Dinding", w_ps: "Siaran Dinding",
        t_1: "Langkah Pertama", t_7: "Satu Minggu Bebas", t_14: "Dua Minggu", t_30: "Ujian Api", t_60: "Dua Bulan", t_90: "Titik Perubahan", t_180: "Setengah Tahun", t_250: "Perajurit", t_365: "Satu Tahun", t_500: "Barisan Hadapan", t_730: "Dua Tahun Utuh", t_1000: "Alaf Baru", t_1825: "Legenda Hidup",
        f_10: "Simpanan Pertama", f_50: "Lima Puluh Ringgit", f_100: "Tabung", f_500: "Dompet Berat", f_1000: "Harta Karun", f_5000: "Harta Naga", f_10000: "Tebusan Raja", f_25000: "Empayar", f_50000: "Merentas Generasi", f_100000: "Tiada Tandingan",
        u_1: "Pertahanan Pertama", u_10: "Kemenangan Kesepuluh", u_25: "Tembok Perisai", u_50: "Pembela", u_100: "Pengawal", u_250: "Suku Ribu", u_500: "Pemecah Badai", u_1000: "Dinding",
        m_1: "Suara Dalaman", m_5: "Jeritan Perang", m_15: "Suara Kewarasan", m_30: "Tiga Puluh Rekod", m_50: "Pencatat Sejarah", m_100: "Penyimpan Arkib",
        r_1: "Doa Pertama", r_10: "Novis Ritual", r_50: "Setia", r_100: "Sarjana Ritual", r_365: "Warok",
        w_1: "Gema Pertama", w_10: "Panduan Tempat Perlindungan", w_25: "Tunggak Tempat Perlindungan", w_100: "Suara Global",
        s_du_t: "Pemedang Berkembar", s_du_d: "2 Rekod Aktif", s_ze_t: "Sarjana Zen", s_ze_d: "5+ Rekod Aktif", s_ju_t: "Jaguh Silap Mata", s_ju_d: "3+ tabiat bersih selama 2 minggu",
        s_nw_t: "Pengawal Malam", s_nw_d: "1 Keinginan Lewat Malam", s_nwm_t: "Peronda Malam", s_nwm_d: "Bertahan 10+ Keinginan Lewat Malam", s_dd_t: "Pertahanan Siang", s_dd_d: "1 Keinginan Tengah Hari",
        s_qc_t: "Penakluk Senyap", s_qc_d: "30 Hari Bersih tanpa butang Keinginan", s_ev_t: "Penginjil", s_ev_d: "Lebih banyak siaran Dinding daripada klik Keinginan",
        s_hs_t: "Taruhan Tinggi", s_hs_d: "30 Hari Bersih (tabiat RM20+/hari)", s_pp_t: "Kedekut", s_pp_d: "100 Hari Bersih (tabiat <RM2/hari)",
        s_ei_t: "Gema Besi", s_ei_d: "Memo selepas 1 Tahun Bersih", s_px_t: "Phoenix", s_px_d: "30 Hari selepas jatuh",
        s_rb_t: "Kelahiran Semula", s_rb_d: "90 Hari selepas jatuh", s_rs_t: "Kebangkitan", s_rs_d: "1 Tahun selepas jatuh",
        s_dh_t: "Tangan Berlian", s_dh_d: "1 Tahun pada percubaan pertama", s_mo_t: "Monolit", s_mo_d: "1000 Hari, Sifar Jatuh", s_vs_t: "Sumpah Senyap", s_vs_d: "1 Tahun pada Perjuangan RM0"
    },
    "ur": {
        days_c: "صاف دن", saved: "بچت", urg_b: "طلب کا بٹن", v_m: "وائس میمو", v_ms: "وائس میموز", s_p: "دعائے سکون", w_p: "دیوار کی پوسٹ", w_ps: "دیوار کی پوسٹیں",
        t_1: "پہلا قدم", t_7: "ایک ہفتہ آزاد", t_14: "دو ہفتے", t_30: "آزمائش کی بھٹی", t_60: "دو مہینے", t_90: "نقطہ انقلاب", t_180: "نصف سال", t_250: "اسپارٹن", t_365: "ایک سال", t_500: "ہراول دستہ", t_730: "دو سال مسلسل", t_1000: "ہزارہ", t_1825: "زندہ لیجنڈ",
        f_10: "پہلی بچت", f_50: "پچاس روپے", f_100: "پگی بینک", f_500: "بھاری پرس", f_1000: "خزانہ", f_5000: "ڈریگن کا خزانہ", f_10000: "بادشاہ کا فدیہ", f_25000: "سلطنت", f_50000: "نسلی اثاثہ", f_100000: "ناقابلِ تسخیر",
        u_1: "پہلا دفاع", u_10: "دسویں فتح", u_25: "ڈھال کی دیوار", u_50: "محافظ", u_100: "پہرہ دار", u_250: "چوتھائی ہزار", u_500: "طوفان شکن", u_1000: "دیوار",
        m_1: "اندرونی آواز", m_5: "جنگی نعرہ", m_15: "عقل کی آواز", m_30: "تیس ریکارڈ", m_50: "تاریخ دان", m_100: "محافظ خانہ",
        r_1: "پہلی دعا", r_10: "رسم کا نوآموز", r_50: "وفادار", r_100: "رسم کا ماسٹر", r_365: "پرہیزگار",
        w_1: "پہلی گونج", w_10: "پناہ گاہ کا رہنما", w_25: "پناہ گاہ کا ستون", w_100: "عالمی آواز",
        s_du_t: "دوہری تلوار باز", s_du_d: "2 فعال ریکارڈ", s_ze_t: "زین ماسٹر", s_ze_d: "5+ فعال ریکارڈ", s_ju_t: "ماہر بازیگر", s_ju_d: "2 ہفتوں تک 3+ عادات صاف",
        s_nw_t: "نائٹ واچ", s_nw_d: "1 رات گئے کی طلب", s_nwm_t: "نائٹ واچ مین", s_nwm_d: "10+ رات گئے کی طلب پر بقا", s_dd_t: "دن کا دفاع", s_dd_d: "1 دوپہر کی طلب",
        s_qc_t: "خاموش فاتح", s_qc_d: "طلب کے بٹن کے بغیر 30 دن صاف", s_ev_t: "مبلغ", s_ev_d: "طلب کے کلکس سے زیادہ دیوار کی پوسٹیں",
        s_hs_t: "بڑی بازی", s_hs_d: "30 دن صاف (20$+ کی عادت)", s_pp_t: "کنجوس", s_pp_d: "100 دن صاف (2$> کی عادت)",
        s_ei_t: "لوہے کی گونج", s_ei_d: "1 سال صاف رہنے کے بعد میمو", s_px_t: "فینکس", s_px_d: "پھسلن کے بعد 30 دن",
        s_rb_t: "تجدید", s_rb_d: "پھسلن کے 90 دن بعد", s_rs_t: "قیامت", s_rs_d: "پھسلن کے 1 سال بعد",
        s_dh_t: "ہیرے کے ہاتھ", s_dh_d: "پہلی کوشش پر 1 سال", s_mo_t: "مونولیتھ", s_mo_d: "1000 دن، صفر پھسلن", s_vs_t: "خاموشی کا عہد", s_vs_d: "$0 کی جدوجہد پر 1 سال"
    },
    "uk": {
        days_c: "Чисті дні", saved: "Збережено", urg_b: "Кнопка потягу", v_m: "Голосова замітка", v_ms: "Голосові замітки", s_p: "Молитва про спокій", w_p: "Допис на стіні", w_ps: "Дописи на стіні",
        t_1: "Перший крок", t_7: "Один тиждень свободи", t_14: "Два тижні", t_30: "Горнило", t_60: "Два місяці", t_90: "Переломний момент", t_180: "Півроку", t_250: "Спартанець", t_365: "Один рік", t_500: "Авангард", t_730: "Два роки стійкості", t_1000: "Тисячоліття", t_1825: "Жива легенда",
        f_10: "Перші заощадження", f_50: "П'ятдесят гривень", f_100: "Скарбничка", f_500: "Важкий гаманець", f_1000: "Скарб", f_5000: "Скарб дракона", f_10000: "Королівський викуп", f_25000: "Імперія", f_50000: "Спадщина", f_100000: "Нестримний",
        u_1: "Перший захист", u_10: "Десята перемога", u_25: "Стіна щитів", u_50: "Захисник", u_100: "Вартовий", u_250: "Чверть тисячі", u_500: "Шторморіз", u_1000: "Стіна",
        m_1: "Внутрішній голос", m_5: "Бойовий клич", m_15: "Голос розуму", m_30: "Тридцять записів", m_50: "Хронікер", m_100: "Архівіст",
        r_1: "Перша молитва", r_10: "Новачок ритуалу", r_50: "Вірний", r_100: "Майстер ритуалу", r_365: "Побожний",
        w_1: "Перший слід", w_10: "Дороговказ сховку", w_25: "Опора сховку", w_100: "Глобальний голос",
        s_du_t: "Два клинки", s_du_d: "2 активні серії", s_ze_t: "Майстер Дзен", s_ze_d: "5+ активних серій", s_ju_t: "Майстер-жонглер", s_ju_d: "3+ звички чисто протягом 2 тижнів",
        s_nw_t: "Нічна варта", s_nw_d: "1 нічний потяг", s_nwm_t: "Нічний вартовий", s_nwm_d: "Вижито 10+ нічних потягів", s_dd_t: "Денний захист", s_dd_d: "1 денний потяг",
        s_qc_t: "Тихий завойовник", s_qc_d: "30 днів чистоти без кнопки потягу", s_ev_t: "Євангеліст", s_ev_d: "Більше дописів на стіні, ніж натискань потягу",
        s_hs_t: "Високі ставки", s_hs_d: "30 днів чистоти (звичка $20+/день)", s_pp_t: "Скнара", s_pp_d: "100 днів чистоти (звичка <$2/день)",
        s_ei_t: "Залізне відлуння", s_ei_d: "Замітка після 1 року чистоти", s_px_t: "Фенікс", s_px_d: "30 днів після зриву",
        s_rb_t: "Переродження", s_rb_d: "90 днів після зриву", s_rs_t: "Воскресіння", s_rs_d: "1 рік після зриву",
        s_dh_t: "Діамантові руки", s_dh_d: "1 рік з першої спроби", s_mo_t: "Моноліт", s_mo_d: "1000 днів, нуль зривів", s_vs_t: "Обітниця мовчання", s_vs_d: "1 рік у боротьбі за $0"
    },
    "nl": {
        days_c: "Dagen Schoon", saved: "Bespaard", urg_b: "Drang-knop", v_m: "Stemnotitie", v_ms: "Stemnotities", s_p: "Sereniteitsgebed", w_p: "Muurpost", w_ps: "Muurposten",
        t_1: "Eerste Stap", t_7: "Eén Week Vrij", t_14: "Twee Weken", t_30: "De Smederij", t_60: "Twee Maanden", t_90: "De Smeltkroes", t_180: "Half Jaar", t_250: "Spartaan", t_365: "Eén Jaar", t_500: "De Voorhoede", t_730: "Twee Jaar Onbroken", t_1000: "Het Millennium", t_1825: "Levende Legende",
        f_10: "Eerste Besparing", f_50: "Vijftig Dollar", f_100: "Spaarpot", f_500: "Zware Beurs", f_1000: "Schat", f_5000: "Drakenschat", f_10000: "Koningslosgeld", f_25000: "Rijk", f_50000: "Generationeel", f_100000: "Onstuitbaar",
        u_1: "Eerste Verdediging", u_10: "Tiende Overwinning", u_25: "Schildmuur", u_50: "Verdediger", u_100: "De Wachter", u_250: "Kwart Duizend", u_500: "Stormbreker", u_1000: "De Muur",
        m_1: "Innerlijke Stem", m_5: "Strijdkreet", m_15: "Stem van Rede", m_30: "Dertig Opnamen", m_50: "De Kroniekschrijver", m_100: "De Archivaris",
        r_1: "Eerste Gebed", r_10: "Ritueel Beginner", r_50: "Trouw", r_100: "Ritueel Meester", r_365: "Toegewijd",
        w_1: "Eerste Echo", w_10: "Toevluchtsgids", w_25: "Pilaar van het Toevluchtsoord", w_100: "Wereldwijde Stem",
        s_du_t: "Dubbele Strijder", s_du_d: "2 Actieve Reeksen", s_ze_t: "Zen Meester", s_ze_d: "5+ Actieve Reeksen", s_ju_t: "Meester Jongleur", s_ju_d: "3+ gewoontes 2 weken schoon",
        s_nw_t: "Nachtwacht", s_nw_d: "1 Drang Laat in de Nacht", s_nwm_t: "Nachtwaker", s_nwm_d: "10+ Drangen Laat in de Nacht Overleefd", s_dd_t: "Verdediging bij Daglicht", s_dd_d: "1 Drang Overdag",
        s_qc_t: "Stille Overwinnaar", s_qc_d: "30 Dagen Schoon zonder Drang-knop", s_ev_t: "De Evangelist", s_ev_d: "Meer Muurposten dan Drang-klikken",
        s_hs_t: "Hoge Inzet", s_hs_d: "30 Dagen Schoon ($20+/dag gewoonte)", s_pp_t: "Zuinig", s_pp_d: "100 Dagen Schoon (<$2/dag gewoonte)",
        s_ei_t: "Echo van IJzer", s_ei_d: "Memo na 1 Jaar Schoon", s_px_t: "De Feniks", s_px_d: "30 Dagen na een Misstap",
        s_rb_t: "Wedergeboorte", s_rb_d: "90 Dagen na Misstap", s_rs_t: "Opstanding", s_rs_d: "1 Jaar na Misstap",
        s_dh_t: "Diamanten Handen", s_dh_d: "1 Jaar bij eerste poging", s_mo_t: "De Monoliet", s_mo_d: "1000 Dagen, Nul Misstappen", s_vs_t: "Gelofte van Stilte", s_vs_d: "1 Jaar bij $0 Worsteling"
    },
    "sv": {
        days_c: "Rena Dagar", saved: "Sparat", urg_b: "Suget-knapp", v_m: "Röstmemo", v_ms: "Röstmemon", s_p: "Sinnesrobön", w_p: "Muriläggning", w_ps: "Muriläggningar",
        t_1: "Första Steget", t_7: "En Vecka Fri", t_14: "Två Veckor", t_30: "Smedjan", t_60: "Två Månader", t_90: "Degeln", t_180: "Halvår", t_250: "Spartan", t_365: "Ett År", t_500: "Förtruppen", t_730: "Två År Obrutet", t_1000: "Millennieet", t_1825: "Levande Legend",
        f_10: "Första Besparingen", f_50: "Femtio Dollar", f_100: "Spargris", f_500: "Tung Börs", f_1000: "Skatt", f_5000: "Drakskatt", f_10000: "Kungalösen", f_25000: "Imperium", f_50000: "Generationers", f_100000: "Ostoppbar",
        u_1: "Första Försvaret", u_10: "Tionde Segern", u_25: "Skoldmur", u_50: "Försvarare", u_100: "Vaktposten", u_250: "Kvarts Tusen", u_500: "Stormbrytare", u_1000: "Muren",
        m_1: "Inre Röst", m_5: "Stridsrop", m_15: "Förnuftets Röst", m_30: "Trettio Inspelningar", m_50: "Krönikören", m_100: "Arkivarien",
        r_1: "Första Bönen", r_10: "Ritualnybörjare", r_50: "Trogen", r_100: "Ritualmästare", r_365: "Hängiven",
        w_1: "Första Ekot", w_10: "Fristadsguide", w_25: "Fristadspelare", w_100: "Global Röst",
        s_du_t: "Dubbelkämpe", s_du_d: "2 Aktiva Sviter", s_ze_t: "Zenmästare", s_ze_d: "5+ Aktiva Sviter", s_ju_t: "Mästarjonglör", s_ju_d: "3+ vanor rena i 2 veckor",
        s_nw_t: "Nattvakt", s_nw_d: "1 Sug Sent på Natten", s_nwm_t: "Nattväktare", s_nwm_d: "Överlevt 10+ Sug Sent på Natten", s_dd_t: "Dagsljusförsvar", s_dd_d: "1 Sug Mitt på Dagen",
        s_qc_t: "Tyst Erövrare", s_qc_d: "30 Rena Dagar utan Suget-knappen", s_ev_t: "Evangelisten", s_ev_d: "Fler Muriläggningar än Suget-klick",
        s_hs_t: "Höga Insatser", s_hs_d: "30 Rena Dagar ($20+/dag vana)", s_pp_t: "Snålvarg", s_pp_d: "100 Rena Dagar (<$2/dag vana)",
        s_ei_t: "Järnets Eko", s_ei_d: "Memo efter 1 År Rent", s_px_t: "Fenixen", s_px_d: "30 Dagar efter ett Bakslag",
        s_rb_t: "Pånyttfödelse", s_rb_d: "90 Dagar efter Bakslag", s_rs_t: "Uppståndelse", s_rs_d: "1 År efter Bakslag",
        s_dh_t: "Diamanthänder", s_dh_d: "1 År på första försöket", s_mo_t: "Monoliten", s_mo_d: "1000 Dagar, Noll Bakslag", s_vs_t: "Tysthetslöfte", s_vs_d: "1 År med $0 Kamp"
    },
    "el": {
        days_c: "Ημέρες Καθαρός", saved: "Αποταμιεύτηκαν", urg_b: "Κουμπί Παρόρμησης", v_m: "Φωνητικό Σημείωμα", v_ms: "Φωνητικά Σημειώματα", s_p: "Προσευχή Γαλήνης", w_p: "Ανάρτηση Τείχους", w_ps: "Αναρτήσεις Τείχους",
        t_1: "Πρώτο Βήμα", t_7: "Μία Εβδομάδα Ελεύθερος", t_14: "Δεκαπενθήμερο", t_30: "Το Καμίνι", t_60: "Δύο Μήνες", t_90: "Το Χωνευτήριο", t_180: "Μισός Χρόνος", t_250: "Σπαρτιάτης", t_365: "Ένας Χρόνος", t_500: "Η Πρωτοπορία", t_730: "Δύο Χρόνια Αδιάκοπα", t_1000: "Η Χιλιετία", t_1825: "Ζωντανός Θρύλος",
        f_10: "Πρώτη Αποταμίευση", f_50: "Πενήντα Δολάρια", f_100: "Κουμπαράς", f_500: "Βαρύ Πουγκί", f_1000: "Θησαυρός", f_5000: "Θησαυρός Δράκου", f_10000: "Λύτρα Βασιλιά", f_25000: "Αυτοκρατορία", f_50000: "Γενεαλογικό", f_100000: "Ασταμάτητος",
        u_1: "Πρώτη Άμυνα", u_10: "Δέκατη Νίκη", u_25: "Τείχος Ασπίδων", u_50: "Υπερασπιστής", u_100: "Ο Φρουρός", u_250: "Τέταρτο της Χιλιάδας", u_500: "Θραύστης Καταιγίδων", u_1000: "Το Τείχος",
        m_1: "Εσωτερική Φωνή", m_5: "Πολεμική Κραυγή", m_15: "Φωνή της Λογικής", m_30: "Τριάντα Εγγραφές", m_50: "Ο Χρονικογράφος", m_100: "Ο Αρχειοφύλακας",
        r_1: "Πρώτη Προσευχή", r_10: "Αρχάριος Τελετουργίας", r_50: "Πιστός", r_100: "Δάσκαλος Τελετουργίας", r_365: "Αφοσιωμένος",
        w_1: "Πρώτη Ηχώ", w_10: "Οδηγός Καταφυγίου", w_25: "Πυλώνας Καταφυγίου", w_100: "Παγκόσμια Φωνή",
        s_du_t: "Διπλός Μαχητής", s_du_d: "2 Ενεργές Σειρές", s_ze_t: "Δάσκαλος Ζεν", s_ze_d: "5+ Ενεργές Σειρές", s_ju_t: "Δάσκαλος Ζογκλέρ", s_ju_d: "3+ συνήθειες καθαρές για 2 εβδομάδες",
        s_nw_t: "Νυχτερινή Φρουρά", s_nw_d: "1 Παρόρμηση Αργά τη Νύχτα", s_nwm_t: "Νυχτοφύλακας", s_nwm_d: "Επιβίωση από 10+ Παρορμήσεις Αργά τη Νύχτα", s_dd_t: "Άμυνα στο Φως της Ημέρας", s_dd_d: "1 Μεσημεριανή Παρόρμηση",
        s_qc_t: "Σιωπηλός Κατακτητής", s_qc_d: "30 Ημέρες Καθαρός χωρίς το Κουμπί Παρόρμησης", s_ev_t: "Ο Ευαγγελιστής", s_ev_d: "Περισσότερες Αναρτήσεις Τείχους από Κλικ Παρόρμησης",
        s_hs_t: "Υψηλό Ρίσκο", s_hs_d: "30 Ημέρες Καθαρός (συνήθεια $20+/ημέρα)", s_pp_t: "Τσιγκούνης", s_pp_d: "100 Ημέρες Καθαρός (συνήθεια <$2/ημέρα)",
        s_ei_t: "Ηχώ του Σιδήρου", s_ei_d: "Σημείωμα μετά από 1 Χρόνο Καθαρός", s_px_t: "Ο Φοίνικας", s_px_d: "30 Ημέρες μετά από Παρέκκλιση",
        s_rb_t: "Αναγέννηση", s_rb_d: "90 Ημέρες μετά από Παρέκκλιση", s_rs_t: "Ανάσταση", s_rs_d: "1 Χρόνος μετά από Παρέκκλιση",
        s_dh_t: "Διαμαντένια Χέρια", s_dh_d: "1 Χρόνος από την πρώτη προσπάθεια", s_mo_t: "Ο Μονόλιθος", s_mo_d: "1000 Ημέρες, Καμία Παρέκκλιση", s_vs_t: "Όρκος Σιωπής", s_vs_d: "1 Χρόνος με Αγώνα $0"
    },
    "ro": {
        days_c: "Zile Curat", saved: "Economisit", urg_b: "Buton de Impuls", v_m: "Notă Vocală", v_ms: "Note Vocale", s_p: "Rugăciunea Seninătății", w_p: "Postare pe Zid", w_ps: "Postări pe Zid",
        t_1: "Primul Pas", t_7: "O Săptămână Liber", t_14: "Două Săptămâni", t_30: "Forja", t_60: "Două Luni", t_90: "Creuzetul", t_180: "Jumătate de An", t_250: "Spartan", t_365: "Un An", t_500: "Avangarda", t_730: "Doi Ani Neîntrerupt", t_1000: "Mileniul", t_1825: "Legendă Vie",
        f_10: "Prima Economie", f_50: "Cincizeci de Dolari", f_100: "Pușculiță", f_500: "Pungă Grea", f_1000: "Comoară", f_5000: "Comoara Dragonului", f_10000: "Răscumpărarea Regelui", f_25000: "Imperiu", f_50000: "Generațional", f_100000: "De Neoprit",
        u_1: "Prima Apărare", u_10: "A Zecea Victorie", u_25: "Zid de Scuturi", u_50: "Apărător", u_100: "Străjerul", u_250: "Un Sfert de Mie", u_500: "Spărgătorul de Furtuni", u_1000: "Zidul",
        m_1: "Vocea Interioară", m_5: "Strigăt de Război", m_15: "Vocea Rațiunii", m_30: "Treizeci de Înregistrări", m_50: "Cronicarul", m_100: "Arhivarul",
        r_1: "Prima Rugăciune", r_10: "Novice în Ritual", r_50: "Credincios", r_100: "Maestru al Ritualului", r_365: "Devotat",
        w_1: "Primul Ecou", w_10: "Ghidul Sanctuarului", w_25: "Stâlpul Sanctuarului", w_100: "Vocea Globală",
        s_du_t: "Luptător Dublu", s_du_d: "2 Serii Active", s_ze_t: "Maestru Zen", s_ze_d: "5+ Serii Active", s_ju_t: "Maestru Jongleur", s_ju_d: "3+ obiceiuri curate timp de 2 săptămâni",
        s_nw_t: "Garda de Noapte", s_nw_d: "1 Impuls Târziu în Noapte", s_nwm_t: "Străjerul de Noapte", s_nwm_d: "Supraviețuirea a 10+ Impulsuri Târzii în Noapte", s_dd_t: "Apărarea de Zi", s_dd_d: "1 Impuls la Amiază",
        s_qc_t: "Cuceritorul Tăcut", s_qc_d: "30 de Zile Curat fără Butonul de Impuls", s_ev_t: "Evanghelistul", s_ev_d: "Mai Multe Postări pe Zid decât Clicuri de Impuls",
        s_hs_t: "Mize Mari", s_hs_d: "30 de Zile Curat (obicei de $20+/zi)", s_pp_t: "Zgârcit", s_pp_d: "100 de Zile Curat (obicei sub $2/zi)",
        s_ei_t: "Ecoul de Fier", s_ei_d: "Notă după 1 An Curat", s_px_t: "Phoenixul", s_px_d: "30 de Zile după o Alunecare",
        s_rb_t: "Renaștere", s_rb_d: "90 de Zile după Alunecare", s_rs_t: "Înviere", s_rs_d: "1 An după Alunecare",
        s_dh_t: "Mâini de Diamant", s_dh_d: "1 An din prima încercare", s_mo_t: "Monolitul", s_mo_d: "1000 de Zile, Zero Alunecări", s_vs_t: "Jurământ de Tăcere", s_vs_d: "1 An cu Luptă de $0"
    },
    "cs": {
        days_c: "Dní Čistý", saved: "Ušetřeno", urg_b: "Tlačítko Nutkání", v_m: "Hlasová Poznámka", v_ms: "Hlasové Poznámky", s_p: "Modlitba Klidu", w_p: "Příspěvek na Zeď", w_ps: "Příspěvky na Zeď",
        t_1: "První Krok", t_7: "Jeden Týden Svobody", t_14: "Dva Týdny", t_30: "Kovárna", t_60: "Dva Měsíce", t_90: "Tavicí Kelímek", t_180: "Půl Roku", t_250: "Sparťan", t_365: "Jeden Rok", t_500: "Předvoj", t_730: "Dva Roky Nepřerušeně", t_1000: "Tisíciletí", t_1825: "Živoucí Legenda",
        f_10: "První Úspora", f_50: "Padesát Dolarů", f_100: "Prasátko", f_500: "Těžká Peněženka", f_1000: "Poklad", f_5000: "Dračí Poklad", f_10000: "Královské Výkupné", f_25000: "Impérium", f_50000: "Generační", f_100000: "Nezastavitelný",
        u_1: "První Obrana", u_10: "Desáté Vítězství", u_25: "Hradba Štítů", u_50: "Obránce", u_100: "Strážce", u_250: "Čtvrt Tisíce", u_500: "Bořitel Bouří", u_1000: "Zeď",
        m_1: "Vnitřní Hlas", m_5: "Válečný Pokřik", m_15: "Hlas Rozumu", m_30: "Třicet Nahrávek", m_50: "Kronikář", m_100: "Archivář",
        r_1: "První Modlitba", r_10: "Nováček Rituálu", r_50: "Věrný", r_100: "Mistr Rituálu", r_365: "Oddaný",
        w_1: "První Ozvěna", w_10: "Průvodce Útočiště", w_25: "Pilíř Útočiště", w_100: "Globální Hlas",
        s_du_t: "Dvojitý Bojovník", s_du_d: "2 Aktivní Série", s_ze_t: "Mistr Zenu", s_ze_d: "5+ Aktivních Sérií", s_ju_t: "Mistr Žonglér", s_ju_d: "3+ návyky čisté po 2 týdny",
        s_nw_t: "Noční Hlídka", s_nw_d: "1 Nutkání Pozdě v Noci", s_nwm_t: "Noční Strážce", s_nwm_d: "Přežití 10+ Nutkání Pozdě v Noci", s_dd_t: "Denní Obrana", s_dd_d: "1 Nutkání v Poledne",
        s_qc_t: "Tichý Dobyvatel", s_qc_d: "30 Dní Čistý bez Tlačítka Nutkání", s_ev_t: "Evangelista", s_ev_d: "Více Příspěvků na Zeď než Kliknutí Nutkání",
        s_hs_t: "Vysoké Sázky", s_hs_d: "30 Dní Čistý (návyk $20+/den)", s_pp_t: "Šetřílek", s_pp_d: "100 Dní Čistý (návyk pod $2/den)",
        s_ei_t: "Ozvěna Železa", s_ei_d: "Poznámka po 1 Roce Čistoty", s_px_t: "Fénix", s_px_d: "30 Dní po Zaváhání",
        s_rb_t: "Znovuzrození", s_rb_d: "90 Dní po Zaváhání", s_rs_t: "Vzkříšení", s_rs_d: "1 Rok po Zaváhání",
        s_dh_t: "Diamantové Ruce", s_dh_d: "1 Rok napoprvé", s_mo_t: "Monolit", s_mo_d: "1000 Dní, Nula Zaváhání", s_vs_t: "Slib Mlčení", s_vs_d: "1 Rok s Bojem za $0"
    },
    "tr": {
        days_c: "Temiz Gün", saved: "Biriktirilen", urg_b: "Dürtü Düğmesi", v_m: "Ses Notu", v_ms: "Ses Notları", s_p: "Sükunet Duası", w_p: "Duvar Gönderisi", w_ps: "Duvar Gönderileri",
        t_1: "İlk Adım", t_7: "Bir Hafta Özgür", t_14: "İki Hafta", t_30: "Dövülme", t_60: "İki Ay", t_90: "Pota", t_180: "Yarım Yıl", t_250: "Sparta", t_365: "Bir Yıl", t_500: "Öncü", t_730: "İki Yıl Kesintisiz", t_1000: "Bin Yıl", t_1825: "Yaşayan Efsane",
        f_10: "İlk Birikim", f_50: "Elli Dolar", f_100: "Kumbara", f_500: "Ağır Kese", f_1000: "Hazine", f_5000: "Ejderha Hazinesi", f_10000: "Kral Fidyesi", f_25000: "İmparatorluk", f_50000: "Nesiller Boyu", f_100000: "Durdurulamaz",
        u_1: "İlk Savunma", u_10: "Onuncu Zafer", u_25: "Kalkan Duvarı", u_50: "Savunucu", u_100: "Gözcü", u_250: "Çeyrek Bin", u_500: "Fırtına Kırıcı", u_1000: "Duvar",
        m_1: "İç Ses", m_5: "Savaş Çığlığı", m_15: "Aklın Sesi", m_30: "Otuz Kayıt", m_50: "Vakanüvis", m_100: "Arşivci",
        r_1: "İlk Dua", r_10: "Ritüel Acemisi", r_50: "Sadık", r_100: "Ritüel Ustası", r_365: "Adanmış",
        w_1: "İlk Yankı", w_10: "Sığınak Rehberi", w_25: "Sığınak Direği", w_100: "Küresel Ses",
        s_du_t: "Çift Savaşçı", s_du_d: "2 Aktif Seri", s_ze_t: "Zen Ustası", s_ze_d: "5+ Aktif Seri", s_ju_t: "Usta Jonglör", s_ju_d: "2 hafta boyunca 3+ temiz alışkanlık",
        s_nw_t: "Gece Nöbeti", s_nw_d: "Gece Geç Saatte 1 Dürtü", s_nwm_t: "Gece Bekçisi", s_nwm_d: "Gece Geç Saatte 10+ Dürtüye Karşı Hayatta Kalma", s_dd_t: "Gündüz Savunması", s_dd_d: "Öğlen 1 Dürtü",
        s_qc_t: "Sessiz Fatih", s_qc_d: "Dürtü Düğmesi Olmadan 30 Temiz Gün", s_ev_t: "Vaiz", s_ev_d: "Dürtü Tıklamasından Daha Fazla Duvar Gönderisi",
        s_hs_t: "Yüksek Bahis", s_hs_d: "30 Temiz Gün (günde $20+ alışkanlık)", s_pp_t: "Pinti", s_pp_d: "100 Temiz Gün (günde $2'den az alışkanlık)",
        s_ei_t: "Demirin Yankısı", s_ei_d: "1 Yıl Temizlikten Sonra Not", s_px_t: "Anka Kuşu", s_px_d: "Bir Sürçmeden Sonra 30 Gün",
        s_rb_t: "Yeniden Doğuş", s_rb_d: "Sürçmeden Sonra 90 Gün", s_rs_t: "Diriliş", s_rs_d: "Sürçmeden Sonra 1 Yıl",
        s_dh_t: "Elmas Eller", s_dh_d: "İlk denemede 1 Yıl", s_mo_t: "Dikilitaş", s_mo_d: "1000 Gün, Sıfır Sürçme", s_vs_t: "Sessizlik Yemini", s_vs_d: "$0 Mücadeleyle 1 Yıl"
    },
    "vi": {
        days_c: "Ngày Trong Sạch", saved: "Đã Tiết Kiệm", urg_b: "Nút Cơn Thèm", v_m: "Ghi Âm Giọng Nói", v_ms: "Các Bản Ghi Âm", s_p: "Lời Cầu Nguyện Bình Tâm", w_p: "Bài Đăng Trên Tường", w_ps: "Các Bài Đăng Trên Tường",
        t_1: "Bước Đầu Tiên", t_7: "Một Tuần Tự Do", t_14: "Hai Tuần", t_30: "Lò Rèn", t_60: "Hai Tháng", t_90: "Lò Nung", t_180: "Nửa Năm", t_250: "Chiến Binh Sparta", t_365: "Một Năm", t_500: "Tiên Phong", t_730: "Hai Năm Không Gián Đoạn", t_1000: "Thiên Niên Kỷ", t_1825: "Huyền Thoại Sống",
        f_10: "Khoản Tiết Kiệm Đầu Tiên", f_50: "Năm Mươi Đô La", f_100: "Heo Đất", f_500: "Túi Tiền Nặng", f_1000: "Kho Báu", f_5000: "Kho Báu Rồng", f_10000: "Tiền Chuộc Của Vua", f_25000: "Đế Chế", f_50000: "Thế Hệ", f_100000: "Không Thể Ngăn Cản",
        u_1: "Phòng Thủ Đầu Tiên", u_10: "Chiến Thắng Thứ Mười", u_25: "Bức Tường Khiên", u_50: "Người Bảo Vệ", u_100: "Người Canh Gác", u_250: "Một Phần Tư Nghìn", u_500: "Kẻ Phá Bão", u_1000: "Bức Tường",
        m_1: "Tiếng Nói Nội Tâm", m_5: "Tiếng Hét Xung Trận", m_15: "Tiếng Nói Lý Trí", m_30: "Ba Mươi Bản Ghi", m_50: "Người Ghi Chép Sử", m_100: "Người Lưu Trữ",
        r_1: "Lời Cầu Nguyện Đầu Tiên", r_10: "Người Mới Trong Nghi Lễ", r_50: "Trung Thành", r_100: "Bậc Thầy Nghi Lễ", r_365: "Sùng Đạo",
        w_1: "Tiếng Vọng Đầu Tiên", w_10: "Người Dẫn Đường Nơi Trú Ẩn", w_25: "Trụ Cột Nơi Trú Ẩn", w_100: "Tiếng Nói Toàn Cầu",
        s_du_t: "Chiến Binh Song Kiếm", s_du_d: "2 Chuỗi Ngày Đang Hoạt Động", s_ze_t: "Bậc Thầy Thiền", s_ze_d: "5+ Chuỗi Ngày Đang Hoạt Động", s_ju_t: "Bậc Thầy Tung Hứng", s_ju_d: "3+ thói quen sạch trong 2 tuần",
        s_nw_t: "Canh Gác Đêm", s_nw_d: "1 Cơn Thèm Lúc Đêm Khuya", s_nwm_t: "Người Gác Đêm", s_nwm_d: "Vượt Qua 10+ Cơn Thèm Lúc Đêm Khuya", s_dd_t: "Phòng Thủ Ban Ngày", s_dd_d: "1 Cơn Thèm Giữa Trưa",
        s_qc_t: "Kẻ Chinh Phục Thầm Lặng", s_qc_d: "30 Ngày Trong Sạch không dùng Nút Cơn Thèm", s_ev_t: "Nhà Truyền Giáo", s_ev_d: "Nhiều Bài Đăng Trên Tường hơn Số Lần Nhấn Nút Cơn Thèm",
        s_hs_t: "Cược Lớn", s_hs_d: "30 Ngày Trong Sạch (thói quen $20+/ngày)", s_pp_t: "Người Tiết Kiệm", s_pp_d: "100 Ngày Trong Sạch (thói quen dưới $2/ngày)",
        s_ei_t: "Tiếng Vọng Của Sắt", s_ei_d: "Ghi Âm sau 1 Năm Trong Sạch", s_px_t: "Phượng Hoàng", s_px_d: "30 Ngày sau một Lần Sa Ngã",
        s_rb_t: "Tái Sinh", s_rb_d: "90 Ngày sau Lần Sa Ngã", s_rs_t: "Hồi Sinh", s_rs_d: "1 Năm sau Lần Sa Ngã",
        s_dh_t: "Bàn Tay Kim Cương", s_dh_d: "1 Năm ngay lần thử đầu tiên", s_mo_t: "Khối Đá Nguyên Khối", s_mo_d: "1000 Ngày, Không Lần Sa Ngã Nào", s_vs_t: "Lời Thề Im Lặng", s_vs_d: "1 Năm với Cuộc Chiến $0"
    },
    "th": {
        days_c: "วันที่สะอาด", saved: "เก็บออม", urg_b: "ปุ่มความอยาก", v_m: "บันทึกเสียง", v_ms: "บันทึกเสียงทั้งหมด", s_p: "คำอธิษฐานแห่งความสงบ", w_p: "โพสต์บนกำแพง", w_ps: "โพสต์บนกำแพงทั้งหมด",
        t_1: "ก้าวแรก", t_7: "หนึ่งสัปดาห์แห่งอิสระ", t_14: "สองสัปดาห์", t_30: "เตาหลอม", t_60: "สองเดือน", t_90: "เบ้าหลอม", t_180: "ครึ่งปี", t_250: "สปาร์ตัน", t_365: "หนึ่งปี", t_500: "แนวหน้า", t_730: "สองปีไม่ขาดตอน", t_1000: "สหัสวรรษ", t_1825: "ตำนานที่มีชีวิต",
        f_10: "เงินออมแรก", f_50: "ห้าสิบดอลลาร์", f_100: "กระปุกออมสิน", f_500: "กระเป๋าเงินหนัก", f_1000: "สมบัติ", f_5000: "สมบัติมังกร", f_10000: "ค่าไถ่กษัตริย์", f_25000: "อาณาจักร", f_50000: "ข้ามรุ่น", f_100000: "หยุดไม่อยู่",
        u_1: "การป้องกันครั้งแรก", u_10: "ชัยชนะครั้งที่สิบ", u_25: "กำแพงโล่", u_50: "ผู้พิทักษ์", u_100: "ยาม", u_250: "หนึ่งในสี่พัน", u_500: "ผู้ทำลายพายุ", u_1000: "กำแพง",
        m_1: "เสียงภายใน", m_5: "เสียงร้องรบ", m_15: "เสียงแห่งเหตุผล", m_30: "สามสิบบันทึก", m_50: "นักบันทึกประวัติศาสตร์", m_100: "ผู้เก็บบันทึก",
        r_1: "คำอธิษฐานครั้งแรก", r_10: "มือใหม่ในพิธี", r_50: "ผู้ซื่อสัตย์", r_100: "ปรมาจารย์แห่งพิธี", r_365: "ผู้อุทิศตน",
        w_1: "เสียงสะท้อนแรก", w_10: "ผู้นำทางที่พักพิง", w_25: "เสาหลักที่พักพิง", w_100: "เสียงระดับโลก",
        s_du_t: "นักสู้คู่", s_du_d: "2 สถิติต่อเนื่องที่ยังทำงานอยู่", s_ze_t: "ปรมาจารย์เซน", s_ze_d: "5+ สถิติต่อเนื่องที่ยังทำงานอยู่", s_ju_t: "ปรมาจารย์นักเล่นกล", s_ju_d: "3+ นิสัยที่สะอาดเป็นเวลา 2 สัปดาห์",
        s_nw_t: "ยามราตรี", s_nw_d: "1 ความอยากช่วงดึก", s_nwm_t: "ผู้เฝ้ายามราตรี", s_nwm_d: "รอดจาก 10+ ความอยากช่วงดึก", s_dd_t: "การป้องกันยามกลางวัน", s_dd_d: "1 ความอยากตอนเที่ยง",
        s_qc_t: "ผู้พิชิตที่เงียบงัน", s_qc_d: "30 วันที่สะอาดโดยไม่ใช้ปุ่มความอยาก", s_ev_t: "ผู้เผยแพร่ศาสนา", s_ev_d: "โพสต์บนกำแพงมากกว่าการคลิกปุ่มความอยาก",
        s_hs_t: "เดิมพันสูง", s_hs_d: "30 วันที่สะอาด (นิสัยที่มีค่าใช้จ่าย $20+/วัน)", s_pp_t: "คนขี้เหนียว", s_pp_d: "100 วันที่สะอาด (นิสัยที่มีค่าใช้จ่ายน้อยกว่า $2/วัน)",
        s_ei_t: "เสียงสะท้อนแห่งเหล็ก", s_ei_d: "บันทึกหลังจาก 1 ปีที่สะอาด", s_px_t: "ฟีนิกซ์", s_px_d: "30 วันหลังจากการพลาดพลั้ง",
        s_rb_t: "การเกิดใหม่", s_rb_d: "90 วันหลังจากการพลาดพลั้ง", s_rs_t: "การฟื้นคืนชีพ", s_rs_d: "1 ปีหลังจากการพลาดพลั้ง",
        s_dh_t: "มือเพชร", s_dh_d: "1 ปีตั้งแต่ความพยายามครั้งแรก", s_mo_t: "หินขนาดใหญ่", s_mo_d: "1000 วัน ไม่มีการพลาดพลั้งเลย", s_vs_t: "คำสาบานแห่งความเงียบ", s_vs_d: "1 ปีกับการต่อสู้ที่ $0"
    },
    "id": {
        days_c: "Hari Bersih", saved: "Ditabung", urg_b: "Tombol Dorongan", v_m: "Memo Suara", v_ms: "Memo Suara", s_p: "Doa Ketenangan", w_p: "Postingan Dinding", w_ps: "Postingan Dinding",
        t_1: "Langkah Pertama", t_7: "Satu Minggu Bebas", t_14: "Dua Minggu", t_30: "Tungku", t_60: "Dua Bulan", t_90: "Wadah Peleburan", t_180: "Setengah Tahun", t_250: "Spartan", t_365: "Satu Tahun", t_500: "Garda Depan", t_730: "Dua Tahun Tak Terputus", t_1000: "Milenium", t_1825: "Legenda Hidup",
        f_10: "Tabungan Pertama", f_50: "Lima Puluh Dolar", f_100: "Celengan", f_500: "Dompet Berat", f_1000: "Harta Karun", f_5000: "Harta Naga", f_10000: "Tebusan Raja", f_25000: "Kekaisaran", f_50000: "Lintas Generasi", f_100000: "Tak Terhentikan",
        u_1: "Pertahanan Pertama", u_10: "Kemenangan Kesepuluh", u_25: "Tembok Perisai", u_50: "Pembela", u_100: "Sang Penjaga", u_250: "Seperempat Ribu", u_500: "Pemecah Badai", u_1000: "Tembok",
        m_1: "Suara Batin", m_5: "Teriakan Perang", m_15: "Suara Akal Sehat", m_30: "Tiga Puluh Rekaman", m_50: "Sang Pencatat Sejarah", m_100: "Sang Arsiparis",
        r_1: "Doa Pertama", r_10: "Pemula Ritual", r_50: "Setia", r_100: "Master Ritual", r_365: "Taat",
        w_1: "Gema Pertama", w_10: "Pemandu Tempat Perlindungan", w_25: "Pilar Tempat Perlindungan", w_100: "Suara Global",
        s_du_t: "Petarung Ganda", s_du_d: "2 Rentetan Aktif", s_ze_t: "Master Zen", s_ze_d: "5+ Rentetan Aktif", s_ju_t: "Master Juggler", s_ju_d: "3+ kebiasaan bersih selama 2 minggu",
        s_nw_t: "Ronda Malam", s_nw_d: "1 Dorongan Larut Malam", s_nwm_t: "Penjaga Malam", s_nwm_d: "Bertahan dari 10+ Dorongan Larut Malam", s_dd_t: "Pertahanan Siang Hari", s_dd_d: "1 Dorongan Siang Hari",
        s_qc_t: "Penakluk Diam", s_qc_d: "30 Hari Bersih tanpa Tombol Dorongan", s_ev_t: "Sang Penginjil", s_ev_d: "Lebih Banyak Postingan Dinding daripada Klik Dorongan",
        s_hs_t: "Taruhan Tinggi", s_hs_d: "30 Hari Bersih (kebiasaan $20+/hari)", s_pp_t: "Sang Pelit", s_pp_d: "100 Hari Bersih (kebiasaan di bawah $2/hari)",
        s_ei_t: "Gema Besi", s_ei_d: "Memo setelah 1 Tahun Bersih", s_px_t: "Sang Phoenix", s_px_d: "30 Hari setelah Kegagalan",
        s_rb_t: "Kelahiran Kembali", s_rb_d: "90 Hari setelah Kegagalan", s_rs_t: "Kebangkitan", s_rs_d: "1 Tahun setelah Kegagalan",
        s_dh_t: "Tangan Berlian", s_dh_d: "1 Tahun pada percobaan pertama", s_mo_t: "Sang Monolit", s_mo_d: "1000 Hari, Nol Kegagalan", s_vs_t: "Sumpah Diam", s_vs_d: "1 Tahun dengan Perjuangan $0"
    },
    "bn": {
        days_c: "পরিষ্কার দিন", saved: "সঞ্চিত", urg_b: "তাড়না বাটন", v_m: "ভয়েস মেমো", v_ms: "ভয়েস মেমোসমূহ", s_p: "প্রশান্তির প্রার্থনা", w_p: "প্রাচীর পোস্ট", w_ps: "প্রাচীর পোস্টসমূহ",
        t_1: "প্রথম পদক্ষেপ", t_7: "এক সপ্তাহ মুক্ত", t_14: "দুই সপ্তাহ", t_30: "কামারশালা", t_60: "দুই মাস", t_90: "গলনচুল্লি", t_180: "অর্ধবছর", t_250: "স্পার্টান", t_365: "এক বছর", t_500: "অগ্রগামী দল", t_730: "দুই বছর অবিচ্ছিন্ন", t_1000: "সহস্রাব্দ", t_1825: "জীবন্ত কিংবদন্তি",
        f_10: "প্রথম সঞ্চয়", f_50: "পঞ্চাশ ডলার", f_100: "পিগি ব্যাংক", f_500: "ভারী থলে", f_1000: "গুপ্তধন", f_5000: "ড্রাগনের ধন", f_10000: "রাজার মুক্তিপণ", f_25000: "সাম্রাজ্য", f_50000: "প্রজন্মগত", f_100000: "অপ্রতিরোধ্য",
        u_1: "প্রথম প্রতিরক্ষা", u_10: "দশম বিজয়", u_25: "ঢাল প্রাচীর", u_50: "রক্ষক", u_100: "প্রহরী", u_250: "সিকি হাজার", u_500: "ঝড় বিভাজক", u_1000: "প্রাচীর",
        m_1: "অভ্যন্তরীণ কণ্ঠস্বর", m_5: "যুদ্ধের চিৎকার", m_15: "যুক্তির কণ্ঠস্বর", m_30: "ত্রিশটি রেকর্ড", m_50: "ইতিহাসবিদ", m_100: "সংরক্ষক",
        r_1: "প্রথম প্রার্থনা", r_10: "আচার নবাগত", r_50: "বিশ্বস্ত", r_100: "আচার মাস্টার", r_365: "ভক্ত",
        w_1: "প্রথম প্রতিধ্বনি", w_10: "আশ্রয়স্থল গাইড", w_25: "আশ্রয়স্থল স্তম্ভ", w_100: "বৈশ্বিক কণ্ঠস্বর",
        s_du_t: "দ্বৈত যোদ্ধা", s_du_d: "২টি সক্রিয় ধারাবাহিকতা", s_ze_t: "জেন মাস্টার", s_ze_d: "৫+ সক্রিয় ধারাবাহিকতা", s_ju_t: "মাস্টার জাগলার", s_ju_d: "২ সপ্তাহের জন্য ৩+ অভ্যাস পরিষ্কার",
        s_nw_t: "রাত্রি প্রহরা", s_nw_d: "গভীর রাতে ১টি তাড়না", s_nwm_t: "রাত্রি প্রহরী", s_nwm_d: "গভীর রাতে ১০+ তাড়না থেকে বেঁচে থাকা", s_dd_t: "দিবালোক প্রতিরক্ষা", s_dd_d: "দুপুরে ১টি তাড়না",
        s_qc_t: "নীরব বিজয়ী", s_qc_d: "তাড়না বাটন ছাড়া ৩০ দিন পরিষ্কার", s_ev_t: "প্রচারক", s_ev_d: "তাড়না ক্লিকের চেয়ে বেশি প্রাচীর পোস্ট",
        s_hs_t: "উচ্চ ঝুঁকি", s_hs_d: "৩০ দিন পরিষ্কার (দৈনিক $২০+ অভ্যাস)", s_pp_t: "কৃপণ", s_pp_d: "১০০ দিন পরিষ্কার (দৈনিক $২ এর কম অভ্যাস)",
        s_ei_t: "লোহার প্রতিধ্বনি", s_ei_d: "১ বছর পরিষ্কারের পর মেমো", s_px_t: "ফিনিক্স", s_px_d: "একটি ভুলের পর ৩০ দিন",
        s_rb_t: "পুনর্জন্ম", s_rb_d: "ভুলের পর ৯০ দিন", s_rs_t: "পুনরুত্থান", s_rs_d: "ভুলের পর ১ বছর",
        s_dh_t: "হীরার হাত", s_dh_d: "প্রথম প্রচেষ্টায় ১ বছর", s_mo_t: "মনোলিথ", s_mo_d: "১০০০ দিন, শূন্য ভুল", s_vs_t: "নীরবতার শপথ", s_vs_d: "$০ সংগ্রামে ১ বছর"
    },
    "ta": {
        days_c: "தூய நாட்கள்", saved: "சேமிக்கப்பட்டது", urg_b: "தூண்டுதல் பொத்தான்", v_m: "குரல் குறிப்பு", v_ms: "குரல் குறிப்புகள்", s_p: "அமைதி பிரார்த்தனை", w_p: "சுவர் இடுகை", w_ps: "சுவர் இடுகைகள்",
        t_1: "முதல் அடி", t_7: "ஒரு வாரம் விடுதலை", t_14: "இரண்டு வாரங்கள்", t_30: "உலை", t_60: "இரண்டு மாதங்கள்", t_90: "உருக்கு பாத்திரம்", t_180: "அரையாண்டு", t_250: "ஸ்பார்டன்", t_365: "ஒரு வருடம்", t_500: "முன்னோடி படை", t_730: "இரண்டு ஆண்டுகள் இடைவெளியின்றி", t_1000: "ஆயிரமாண்டு", t_1825: "வாழும் புராணம்",
        f_10: "முதல் சேமிப்பு", f_50: "ஐம்பது டாலர்", f_100: "பணச் சேமிப்புப் பெட்டி", f_500: "கனமான பணப்பை", f_1000: "புதையல்", f_5000: "டிராகன் புதையல்", f_10000: "அரசனின் மீட்புத்தொகை", f_25000: "பேரரசு", f_50000: "தலைமுறை", f_100000: "தடுக்க முடியாதது",
        u_1: "முதல் பாதுகாப்பு", u_10: "பத்தாவது வெற்றி", u_25: "கேடய சுவர்", u_50: "பாதுகாவலர்", u_100: "காவலாளி", u_250: "கால் ஆயிரம்", u_500: "புயல் உடைப்பவர்", u_1000: "சுவர்",
        m_1: "உள்ளுணர்வு", m_5: "போர் முழக்கம்", m_15: "பகுத்தறிவின் குரல்", m_30: "முப்பது பதிவுகள்", m_50: "வரலாற்றாசிரியர்", m_100: "காப்பகர்",
        r_1: "முதல் பிரார்த்தனை", r_10: "சடங்கு புதியவர்", r_50: "நம்பிக்கையானவர்", r_100: "சடங்கு மாஸ்டர்", r_365: "பக்தியுள்ளவர்",
        w_1: "முதல் எதிரொலி", w_10: "புகலிட வழிகாட்டி", w_25: "புகலிடத் தூண்", w_100: "உலகளாவிய குரல்",
        s_du_t: "இரட்டைப் போராளி", s_du_d: "2 செயலில் உள்ள தொடர்ச்சிகள்", s_ze_t: "ஜென் மாஸ்டர்", s_ze_d: "5+ செயலில் உள்ள தொடர்ச்சிகள்", s_ju_t: "மாஸ்டர் ஜக்லர்", s_ju_d: "2 வாரங்களுக்கு 3+ பழக்கங்கள் தூய்மையாக",
        s_nw_t: "இரவுக் காவல்", s_nw_d: "நள்ளிரவில் 1 தூண்டுதல்", s_nwm_t: "இரவுக் காவலாளி", s_nwm_d: "நள்ளிரவில் 10+ தூண்டுதல்களில் இருந்து தப்பிப்பு", s_dd_t: "பகல் பாதுகாப்பு", s_dd_d: "மதியம் 1 தூண்டுதல்",
        s_qc_t: "அமைதியான வெற்றியாளர்", s_qc_d: "தூண்டுதல் பொத்தான் இல்லாமல் 30 நாட்கள் தூய்மை", s_ev_t: "போதகர்", s_ev_d: "தூண்டுதல் கிளிக்குகளை விட அதிக சுவர் இடுகைகள்",
        s_hs_t: "உயர் பணயம்", s_hs_d: "30 நாட்கள் தூய்மை (நாளொன்றுக்கு $20+ பழக்கம்)", s_pp_t: "சிக்கனமானவர்", s_pp_d: "100 நாட்கள் தூய்மை (நாளொன்றுக்கு $2க்கும் குறைவான பழக்கம்)",
        s_ei_t: "இரும்பின் எதிரொலி", s_ei_d: "1 வருடம் தூய்மைக்குப் பிறகு குறிப்பு", s_px_t: "பீனிக்ஸ்", s_px_d: "ஒரு தவறுக்குப் பிறகு 30 நாட்கள்",
        s_rb_t: "மறுபிறப்பு", s_rb_d: "தவறுக்குப் பிறகு 90 நாட்கள்", s_rs_t: "உயிர்த்தெழுதல்", s_rs_d: "தவறுக்குப் பிறகு 1 வருடம்",
        s_dh_t: "வைர கைகள்", s_dh_d: "முதல் முயற்சியில் 1 வருடம்", s_mo_t: "மோனோலித்", s_mo_d: "1000 நாட்கள், பூஜ்ஜிய தவறுகள்", s_vs_t: "மௌன சபதம்", s_vs_d: "$0 போராட்டத்துடன் 1 வருடம்"
    },
    "am": {
        days_c: "ንጹህ ቀናት", saved: "የተቆጠበ", urg_b: "የፍላጎት አዝራር", v_m: "የድምጽ ማስታወሻ", v_ms: "የድምጽ ማስታወሻዎች", s_p: "የፀጥታ ጸሎት", w_p: "የግንብ ልጥፍ", w_ps: "የግንብ ልጥፎች",
        t_1: "የመጀመሪያው እርምጃ", t_7: "አንድ ሳምንት ነፃ", t_14: "ሁለት ሳምንታት", t_30: "ማገጃ ቤት", t_60: "ሁለት ወራት", t_90: "ማቅለጫ", t_180: "ግማሽ ዓመት", t_250: "ስፓርታን", t_365: "አንድ ዓመት", t_500: "ግንባር ቀደም", t_730: "ሁለት ዓመታት ያለማቋረጥ", t_1000: "ሺህ ዓመት", t_1825: "ህያው አፈ ታሪክ",
        f_10: "የመጀመሪያ ቁጠባ", f_50: "ሃምሳ ዶላር", f_100: "የቁጠባ ሳጥን", f_500: "ከባድ ቦርሳ", f_1000: "ሀብት", f_5000: "የዘንዶ ሀብት", f_10000: "የንጉስ ቤዛ", f_25000: "ግዛት", f_50000: "ትውልዳዊ", f_100000: "የማይቆም",
        u_1: "የመጀመሪያ መከላከያ", u_10: "አስረኛ ድል", u_25: "የጋሻ ግንብ", u_50: "ተከላካይ", u_100: "ጠባቂው", u_250: "ሩብ ሺህ", u_500: "የማዕበል ሰባሪ", u_1000: "ግንቡ",
        m_1: "የውስጥ ድምጽ", m_5: "የጦርነት ጩኸት", m_15: "የምክንያት ድምጽ", m_30: "ሰላሳ መዝገቦች", m_50: "ታሪክ ጸሐፊው", m_100: "መዝገብ ያዡ",
        r_1: "የመጀመሪያ ጸሎት", r_10: "የስርዓት ጀማሪ", r_50: "ታማኝ", r_100: "የስርዓት ጌታ", r_365: "ራሱን የወሰነ",
        w_1: "የመጀመሪያ ማስተጋባት", w_10: "የመጠጊያ መሪ", w_25: "የመጠጊያ ምሰሶ", w_100: "ዓለም አቀፍ ድምጽ",
        s_du_t: "ድርብ ተዋጊ", s_du_d: "2 ንቁ ተከታታይ ስኬቶች", s_ze_t: "የዜን ጌታ", s_ze_d: "5+ ንቁ ተከታታይ ስኬቶች", s_ju_t: "የጁግሊንግ ጌታ", s_ju_d: "3+ ልማዶች ለ2 ሳምንታት ንጹህ",
        s_nw_t: "የሌሊት ጥበቃ", s_nw_d: "1 ምሽት ዘግይቶ ፍላጎት", s_nwm_t: "የሌሊት ጠባቂ", s_nwm_d: "ከ10+ ምሽት ዘግይቶ ፍላጎቶች መትረፍ", s_dd_t: "የቀትር መከላከያ", s_dd_d: "1 ቀትር ፍላጎት",
        s_qc_t: "ጸጥ ያለ ድል አድራጊ", s_qc_d: "ያለ ፍላጎት አዝራር 30 ንጹህ ቀናት", s_ev_t: "ወንጌላዊው", s_ev_d: "ከፍላጎት ጠቅታዎች የበለጠ የግንብ ልጥፎች",
        s_hs_t: "ከፍተኛ አደጋ", s_hs_d: "30 ንጹህ ቀናት (በቀን $20+ ልማድ)", s_pp_t: "ቆጣቢ", s_pp_d: "100 ንጹህ ቀናት (በቀን ከ$2 በታች ልማድ)",
        s_ei_t: "የብረት ማስተጋባት", s_ei_d: "ከ1 ዓመት ንጽህና በኋላ ማስታወሻ", s_px_t: "ፊኒክስ", s_px_d: "ከመንሸራተት በኋላ 30 ቀናት",
        s_rb_t: "ዳግም ልደት", s_rb_d: "ከመንሸራተት በኋላ 90 ቀናት", s_rs_t: "ትንሳኤ", s_rs_d: "ከመንሸራተት በኋላ 1 ዓመት",
        s_dh_t: "የአልማዝ እጆች", s_dh_d: "በመጀመሪያ ሙከራ 1 ዓመት", s_mo_t: "ሞኖሊት", s_mo_d: "1000 ቀናት፣ ዜሮ መንሸራተት", s_vs_t: "የዝምታ ስዕለት", s_vs_d: "በ$0 ትግል 1 ዓመት"
    },
    "ha": {
        days_c: "Kwanakin Tsafta", saved: "An Adana", urg_b: "Maɓallin Sha'awa", v_m: "Rikodin Murya", v_ms: "Rikodin Murya", s_p: "Addu'ar Kwanciyar Hankali", w_p: "Sakon Bango", w_ps: "Sakonnin Bango",
        t_1: "Mataki Na Farko", t_7: "Mako Ɗaya Yanci", t_14: "Makonni Biyu", t_30: "Ƙerawa", t_60: "Watanni Biyu", t_90: "Narkarwa", t_180: "Rabin Shekara", t_250: "Basparta", t_365: "Shekara Ɗaya", t_500: "Majagaba", t_730: "Shekara Biyu Ba Tare Da Katsewa Ba", t_1000: "Millennium", t_1825: "Tatsuniya Mai Rai",
        f_10: "Ajiya Ta Farko", f_50: "Dala Hamsin", f_100: "Akwatin Ajiya", f_500: "Jaka Mai Nauyi", f_1000: "Dukiya", f_5000: "Dukiyar Dodo", f_10000: "Fansar Sarki", f_25000: "Daula", f_50000: "Na Tsararraki", f_100000: "Marar Tsayawa",
        u_1: "Kariya Ta Farko", u_10: "Nasara Ta Goma", u_25: "Ganuwar Garkuwa", u_50: "Mai Kariya", u_100: "Mai Gadi", u_250: "Kashi Ɗaya Bisa Huɗu Na Dubu", u_500: "Mai Fashe Guguwa", u_1000: "Ganuwar",
        m_1: "Muryar Ciki", m_5: "Kuka Na Yaƙi", m_15: "Muryar Hankali", m_30: "Rikodi Talatin", m_50: "Marubucin Tarihi", m_100: "Mai Ajiye Bayanai",
        r_1: "Addu'a Ta Farko", r_10: "Sabo A Al'ada", r_50: "Amintacce", r_100: "Ƙwararre A Al'ada", r_365: "Mai Bautawa",
        w_1: "Amsa Ta Farko", w_10: "Jagoran Mafaka", w_25: "Ginshiƙin Mafaka", w_100: "Muryar Duniya",
        s_du_t: "Mayaƙi Biyu", s_du_d: "Fama 2 Masu Aiki", s_ze_t: "Ƙwararren Zen", s_ze_d: "Fama 5+ Masu Aiki", s_ju_t: "Ƙwararren Jujjuya", s_ju_d: "Al'ada 3+ tsaftatattu na makonni 2",
        s_nw_t: "Tsaron Dare", s_nw_d: "Sha'awa 1 A Tsakiyar Dare", s_nwm_t: "Mai Tsaron Dare", s_nwm_d: "Tsira Daga Sha'awa 10+ A Tsakiyar Dare", s_dd_t: "Kariyar Rana", s_dd_d: "Sha'awa 1 Da Rana",
        s_qc_t: "Mai Nasara Shiru", s_qc_d: "Kwanaki 30 Tsafta Ba Tare Da Maɓallin Sha'awa Ba", s_ev_t: "Mai Bishara", s_ev_d: "Sakonnin Bango Sun Fi Danna Sha'awa",
        s_hs_t: "Babban Caca", s_hs_d: "Kwanaki 30 Tsafta (al'ada $20+/rana)", s_pp_t: "Mai Tsimi", s_pp_d: "Kwanaki 100 Tsafta (al'ada ƙasa da $2/rana)",
        s_ei_t: "Amsar Ƙarfe", s_ei_d: "Rikodi bayan Shekara 1 Tsafta", s_px_t: "Fenwks", s_px_d: "Kwanaki 30 bayan Kuskure",
        s_rb_t: "Sake Haihuwa", s_rb_d: "Kwanaki 90 bayan Kuskure", s_rs_t: "Tashin Matattu", s_rs_d: "Shekara 1 bayan Kuskure",
        s_dh_t: "Hannun Lu'ulu'u", s_dh_d: "Shekara 1 a yunƙuri na farko", s_mo_t: "Dutsen Girma", s_mo_d: "Kwanaki 1000, Sifili Kuskure", s_vs_t: "Alkawarin Shiru", s_vs_d: "Shekara 1 da Fama $0"
    },
    "yo": {
        days_c: "Ọjọ́ Mímọ́", saved: "Ti Fipamọ́", urg_b: "Bọ́tìnnì Ìtara", v_m: "Ìkọ̀wé Ohùn", v_ms: "Àwọn Ìkọ̀wé Ohùn", s_p: "Àdúrà Ìfọ̀kànbalẹ̀", w_p: "Ìfitosilẹ̀ Ògiri", w_ps: "Àwọn Ìfitosilẹ̀ Ògiri",
        t_1: "Ìṣísẹ̀ Àkọ́kọ́", t_7: "Ọ̀sẹ̀ Kan Òmìnira", t_14: "Ọ̀sẹ̀ Méjì", t_30: "Iléṣẹ́ Alágbẹ̀dẹ", t_60: "Oṣù Méjì", t_90: "Ìléru", t_180: "Ìdajì Ọdún", t_250: "Ọmọ Sparta", t_365: "Ọdún Kan", t_500: "Aṣíwájú", t_730: "Ọdún Méjì Láìdáwọ́dúró", t_1000: "Ẹgbẹ̀rún Ọdún", t_1825: "Ìtàn Alààyè",
        f_10: "Ìfipamọ́ Àkọ́kọ́", f_50: "Dọ́là Àádọ́ta", f_100: "Àpótí Ìfipamọ́ Owó", f_500: "Àpò Wúwo", f_1000: "Ìṣúra", f_5000: "Ìṣúra Dragoni", f_10000: "Owó Ìràpadà Ọba", f_25000: "Ilẹ̀ọba", f_50000: "Ìran dé Ìran", f_100000: "Aláìdúró",
        u_1: "Ààbò Àkọ́kọ́", u_10: "Ìṣẹ́gun Ẹ̀kẹwàá", u_25: "Ògiri Asà", u_50: "Olùgbèjà", u_100: "Olùṣọ́", u_250: "Ìdámẹ́rin Ẹgbẹ̀rún", u_500: "Afọ́ powuku", u_1000: "Ògiri",
        m_1: "Ohùn Inú", m_5: "Igbe Ogun", m_15: "Ohùn Ìrònú", m_30: "Ìkọ̀wé Ọgbọ̀n", m_50: "Akọ̀wé Ìtàn", m_100: "Olùtọ́jú Àkọsílẹ̀",
        r_1: "Àdúrà Àkọ́kọ́", r_10: "Tuntun Nínú Ààtò", r_50: "Olóòtọ́", r_100: "Ọ̀gá Ààtò", r_365: "Olùfọkànsìn",
        w_1: "Ìwòyí Àkọ́kọ́", w_10: "Atọ́nà Ibi Ìsádi", w_25: "Ọ̀wọ̀n Ibi Ìsádi", w_100: "Ohùn Àgbáyé",
        s_du_t: "Jagunjagun Méjì", s_du_d: "Ìtẹ̀síwájú 2 Tí Ń Ṣiṣẹ́", s_ze_t: "Ọ̀gá Zen", s_ze_d: "Ìtẹ̀síwájú 5+ Tí Ń Ṣiṣẹ́", s_ju_t: "Ọ̀gá Amúwòye", s_ju_d: "Àṣà 3+ mímọ́ fún ọ̀sẹ̀ 2",
        s_nw_t: "Ìṣọ́ Òru", s_nw_d: "Ìtara 1 Ní Àárọ̀ Òru", s_nwm_t: "Olùṣọ́ Òru", s_nwm_d: "Bíborí Ìtara 10+ Ní Àárọ̀ Òru", s_dd_t: "Ààbò Ọ̀sán", s_dd_d: "Ìtara 1 Ní Ọ̀sán",
        s_qc_t: "Aṣẹ́gun Ìdákẹ́jẹ́ẹ́", s_qc_d: "Ọjọ́ 30 Mímọ́ láìsí Bọ́tìnnì Ìtara", s_ev_t: "Ajíhìnrere", s_ev_d: "Ìfitosilẹ̀ Ògiri Ju Ìtẹ̀ Ìtara Lọ",
        s_hs_t: "Ewu Ńlá", s_hs_d: "Ọjọ́ 30 Mímọ́ (àṣà $20+/ọjọ́)", s_pp_t: "Olùfọ́wọ́sowọ́pọ̀", s_pp_d: "Ọjọ́ 100 Mímọ́ (àṣà lábẹ́ $2/ọjọ́)",
        s_ei_t: "Ìwòyí Irin", s_ei_d: "Ìkọ̀wé lẹ́yìn Ọdún 1 Mímọ́", s_px_t: "Ẹyẹ Fọ́níìsì", s_px_d: "Ọjọ́ 30 lẹ́yìn Ìṣubú",
        s_rb_t: "Àtúnbí", s_rb_d: "Ọjọ́ 90 lẹ́yìn Ìṣubú", s_rs_t: "Àjíǹde", s_rs_d: "Ọdún 1 lẹ́yìn Ìṣubú",
        s_dh_t: "Ọwọ́ Dáyámọ́ndì", s_dh_d: "Ọdún 1 ní ìgbìyànjú àkọ́kọ́", s_mo_t: "Òkúta Ńlá", s_mo_d: "Ọjọ́ 1000, Ìṣubú Ni Ìṣofo", s_vs_t: "Ìlérí Ìdákẹ́jẹ́ẹ́", s_vs_d: "Ọdún 1 pẹ̀lú Ìjà $0"
    },
    "zu": {
        days_c: "Izinsuku Ezihlanzekile", saved: "Kongiwe", urg_b: "Inkinobho Yesifiso", v_m: "Inothi Lezwi", v_ms: "Amanothi Ezwi", s_p: "Umthandazo Wokuthula", w_p: "Ukuposa Odongeni", w_ps: "Ukuposa Odongeni",
        t_1: "Isinyathelo Sokuqala", t_7: "Isonto Elilodwa Elikhululekile", t_14: "Amasonto Amabili", t_30: "Isikhungo Sokukhanda", t_60: "Izinyanga Ezimbili", t_90: "Isitofu Sokuncibilikisa", t_180: "Uhhafu Wonyaka", t_250: "IsiSpartan", t_365: "Unyaka Owodwa", t_500: "Ophambili", t_730: "Iminyaka Emibili Ngaphandle Kokuphazamiseka", t_1000: "Iminyaka Eyinkulungwane", t_1825: "Inganekwane Ephilayo",
        f_10: "Isondlo Sokuqala", f_50: "Amadola Angamashumi Amahlanu", f_100: "Ibhokisi Lokongela", f_500: "Isikhwama Esisindayo", f_1000: "Ingcebo", f_5000: "Ingcebo Yodrako", f_10000: "Inhlawulo Yenkosi", f_25000: "Umbuso", f_50000: "Owezizukulwane", f_100000: "Ongenakumiswa",
        u_1: "Ukuvikela Kokuqala", u_10: "Ukunqoba Kweshumi", u_25: "Udonga Lwesihlangu", u_50: "Umvikeli", u_100: "Umlindi", u_250: "Ingxenye Yekwota Yenkulungwane", u_500: "Umephuli Wesiphepho", u_1000: "Udonga",
        m_1: "Izwi Langaphakathi", m_5: "Umkhosi Wempi", m_15: "Izwi Lengqondo", m_30: "Ukurekhoda Okungamashumi Amathathu", m_50: "Umlobi Womlando", m_100: "Umgcini Wemibhalo",
        r_1: "Umthandazo Wokuqala", r_10: "Osemusha Emkhubeni", r_50: "Othembekile", r_100: "Umsholi Womkhuba", r_365: "Ozinikele",
        w_1: "Umsindo Wokuqala", w_10: "Umqondisi Wendawo Yokuphephela", w_25: "Insika Yendawo Yokuphephela", w_100: "Izwi Lomhlaba Wonke",
        s_du_t: "Umlwi Ophindiwe", s_du_d: "Izinhla Ezimbili Ezisebenzayo", s_ze_t: "Umsholi we-Zen", s_ze_d: "Izinhla Ezingu-5+ Ezisebenzayo", s_ju_t: "Umsholi Wokujuguza", s_ju_d: "Imikhuba engu-3+ ehlanzekile amasonto amabili",
        s_nw_t: "Umlindi Wobusuku", s_nw_d: "Isifiso Esisodwa Ebusuku Obedlule", s_nwm_t: "Umlindi Wasebusuku", s_nwm_d: "Ukusinda Ezifisweni Ezingu-10+ Ebusuku", s_dd_t: "Ukuvikela Kwemini", s_dd_d: "Isifiso Esisodwa Emini",
        s_qc_t: "Umnqobi Othulile", s_qc_d: "Izinsuku Ezingu-30 Ezihlanzekile Ngaphandle Kwenkinobho Yesifiso", s_ev_t: "Umvangeli", s_ev_d: "Ukuposa Odongeni Okungaphezu Kokuchofoza Isifiso",
        s_hs_t: "Ubungozi Obukhulu", s_hs_d: "Izinsuku Ezingu-30 Ezihlanzekile (umkhuba we-$20+/usuku)", s_pp_t: "Onongenzansi", s_pp_d: "Izinsuku Ezingu-100 Ezihlanzekile (umkhuba ongaphansi kuka-$2/usuku)",
        s_ei_t: "Umsindo Wensimbi", s_ei_d: "Inothi ngemva konyaka owodwa uhlanzekile", s_px_t: "IPhoenix", s_px_d: "Izinsuku Ezingu-30 Ngemva Kokushelela",
        s_rb_t: "Ukuzalwa Kabusha", s_rb_d: "Izinsuku Ezingu-90 Ngemva Kokushelela", s_rs_t: "Ukuvuka Kwabafileyo", s_rs_d: "Unyaka Owodwa Ngemva Kokushelela",
        s_dh_t: "Izandla Zedayimane", s_dh_d: "Unyaka Owodwa Emzamweni Wokuqala", s_mo_t: "I-Monolith", s_mo_d: "Izinsuku Ezingu-1000, Aphindwe Amaphutha", s_vs_t: "Isifungo Sokuthula", s_vs_d: "Unyaka Owodwa Nomzabalazo we-$0"
    }
};

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];
    const activeLang = typeof currentLang !== 'undefined' ? currentLang : 'en';
    const tRaw = trophyDict[activeLang] || trophyDict['en'];

    // Resolve currency symbols and codes
    const localCurrencySymbols = {
        "en": "$", "es": "€", "fr": "€", "de": "€", "it": "€", 
        "pt": "R$", "pl": "zł", "sw": "KSh", "tl": "₱", "ar": "د.إ", 
        "he": "₪", "zh": "¥", "ja": "¥", "ko": "₩", "ru": "₽", "hi": "₹",
        "ms": "RM", "fa": "﷼", "ur": "₨", "uk": "₴",
        "nl": "€", "sv": "kr", "el": "€", "ro": "lei", "cs": "Kč",
        "tr": "₺", "vi": "₫", "th": "฿", "id": "Rp", "bn": "৳",
        "ta": "₹", "am": "Br", "ha": "₦", "yo": "₦", "zu": "R"
    };
    const localCurrencyCodes = {
        "en": "USD", "es": "EUR", "fr": "EUR", "de": "EUR", "it": "EUR", 
        "pt": "BRL", "pl": "PLN", "sw": "KES", "tl": "PHP", "ar": "AED", 
        "he": "ILS", "zh": "CNY", "ja": "JPY", "ko": "KRW", "ru": "RUB", "hi": "INR",
        "ms": "MYR", "fa": "IRR", "ur": "PKR", "uk": "UAH",
        "nl": "EUR", "sv": "SEK", "el": "EUR", "ro": "RON", "cs": "CZK",
        "tr": "TRY", "vi": "VND", "th": "THB", "id": "IDR", "bn": "BDT",
        "ta": "INR", "am": "ETB", "ha": "NGN", "yo": "NGN", "zu": "ZAR"
    };
    const currencySym = (typeof currencySymbols !== 'undefined' ? currencySymbols[activeLang] : localCurrencySymbols[activeLang]) || "$";
    const currencyCode = (typeof currencyCodes !== 'undefined' ? currencyCodes[activeLang] : localCurrencyCodes[activeLang]) || "USD";

    // Deep copy and replace "$" in translation strings with currencySym
    const t = {};
    for (const key in tRaw) {
        if (typeof tRaw[key] === 'string') {
            t[key] = tRaw[key].replace(/\$/g, currencySym);
        } else {
            t[key] = tRaw[key];
        }
    }

    if (!state.unlockedTrophies) {
        state.unlockedTrophies = [];
    }

    const addTrophy = (id, title, desc, icon, condition, isDynamic) => {
        let earned = false;
        if (isDynamic) {
            earned = condition;
        } else {
            if (state.unlockedTrophies.includes(id)) {
                earned = true;
            } else if (condition) {
                state.unlockedTrophies.push(id);
                earned = true;
            }
        }
        earnedTrophies.push({ id, title, desc, icon, earned });
    };

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

    // 1. TIMELINE TROPHIES (Dynamic based on current streak / rank)
    const timelineData = [
        [1, "timeline_1", t.t_1, "footprints"], [7, "timeline_7", t.t_7, "calendar-check"], [14, "timeline_14", t.t_14, "shield"],
        [30, "timeline_30", t.t_30, "swords"], [60, "timeline_60", t.t_60, "navigation"], [90, "timeline_90", t.t_90, "anvil"],
        [180, "timeline_180", t.t_180, "star"], [250, "timeline_250", t.t_250, "crosshair"], [365, "timeline_365", t.t_365, "sun"],
        [500, "timeline_500", t.t_500, "flag"], [730, "timeline_730", t.t_730, "shield-check"], [1000, "timeline_1000", t.t_1000, "crown"],
        [1825, "timeline_1825", t.t_1825, "sparkles"]
    ];
    timelineData.forEach(([days, id, title, icon]) => {
        addTrophy(id, title, `${days} ${t.days_c}`, icon, currentMainStreak >= days, true);
    });

    // 2. FINANCIAL WAR CHEST (Persistent)
    const financeData = [
        [10, "finance_10", t.f_10, "coins"], [50, "finance_50", t.f_50, "wallet"], [100, "finance_100", t.f_100, "piggy-bank"],
        [500, "finance_500", t.f_500, "banknote"], [1000, "finance_1000", t.f_1000, "gem"], [5000, "finance_5000", t.f_5000, "castle"],
        [10000, "finance_10000", t.f_10000, "landmark"], [25000, "finance_25000", t.f_25000, "building"], [50000, "finance_50000", t.f_50000, "diamond"],
        [100000, "finance_100000", t.f_100000, "sparkles"]
    ];
    financeData.forEach(([amount, id, title, icon]) => {
        let formattedAmount;
        try {
            formattedAmount = amount.toLocaleString(activeLang, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 });
        } catch (e) {
            formattedAmount = `${currencySym}${amount}`;
        }
        addTrophy(id, title, `${formattedAmount} ${t.saved}`, icon, totalSavedValue >= amount, false);
    });

    // 3. THE URGE ENGINE (Persistent)
    const urgeData = [
        [1, "urge_1", t.u_1, "shield-alert"], [10, "urge_10", t.u_10, "swords"], [25, "urge_25", t.u_25, "bell-ring"],
        [50, "urge_50", t.u_50, "shield-check"], [100, "urge_100", t.u_100, "eye"], [250, "urge_250", t.u_250, "target"],
        [500, "urge_500", t.u_500, "zap"], [1000, "urge_1000", t.u_1000, "brick-wall"]
    ];
    urgeData.forEach(([count, id, title, icon]) => {
        addTrophy(id, title, `${t.urg_b} ${count}x`, icon, state.urgeClicks >= count, false);
    });

    // 4. THE VAULT MEMOS (Persistent)
    const memoData = [
        [1, "memo_1", t.m_1, "mic"], [5, "memo_5", t.m_5, "mic-vocal"], [15, "memo_15", t.m_15, "book"],
        [30, "memo_30", t.m_30, "file-audio"], [50, "memo_50", t.m_50, "book-open"], [100, "memo_100", t.m_100, "archive"]
    ];
    memoData.forEach(([count, id, title, icon]) => {
        addTrophy(id, title, `${count} ${count > 1 ? t.v_ms : t.v_m}`, icon, state.voiceMemos >= count, false);
    });

    // 5. SERENITY RITUAL (Persistent)
    const ritualData = [
        [1, "ritual_1", t.r_1, "hand-heart"], [10, "ritual_10", t.r_10, "book-open"], [50, "ritual_50", t.r_50, "heart"],
        [100, "ritual_100", t.r_100, "church"], [365, "ritual_365", t.r_365, "sun"]
    ];
    ritualData.forEach(([count, id, title, icon]) => {
        addTrophy(id, title, `${t.s_p} ${count}x`, icon, state.amenClicks >= count, false);
    });

    // 6. THE WALL OF WISDOM (Persistent)
    const wallPostsCount = state.wallPosts || 0;
    const wallData = [
        [1, "wall_1", t.w_1, "message-square"], [10, "wall_10", t.w_10, "users"], 
        [25, "wall_25", t.w_25, "globe"], [100, "wall_100", t.w_100, "radio"]
    ];
    wallData.forEach(([count, id, title, icon]) => {
        addTrophy(id, title, `${count} ${count > 1 ? t.w_ps : t.w_p}`, icon, wallPostsCount >= count, false);
    });

    // 7. SPECIAL CHALLENGES (Persistent)
    addTrophy("spec_dual", t.s_du_t, t.s_du_d, "layers", activeStrugglesCount >= 2, false);
    addTrophy("spec_zen", t.s_ze_t, t.s_ze_d, "cpu", activeStrugglesCount >= 5, false);
    addTrophy("spec_juggle", t.s_ju_t, t.s_ju_d, "shapes", activeStrugglesCount >= 3 && currentMainStreak >= 14, false);
    addTrophy("spec_night_1", t.s_nw_t, t.s_nw_d, "moon", state.midnightUrges >= 1, false);
    addTrophy("spec_night_10", t.s_nwm_t, t.s_nwm_d, "moon", state.midnightUrges > state.middayUrges && state.midnightUrges >= 10, false);
    addTrophy("spec_day_1", t.s_dd_t, t.s_dd_d, "sun", state.middayUrges >= 1, false);
    addTrophy("spec_quiet", t.s_qc_t, t.s_qc_d, "ghost", currentMainStreak >= 30 && state.urgeClicks === 0, false);
    addTrophy("spec_evangelist", t.s_ev_t, t.s_ev_d, "megaphone", wallPostsCount > state.urgeClicks && wallPostsCount >= 10, false);
    addTrophy("spec_high_stakes", t.s_hs_t, t.s_hs_d, "flame", state.habits.some(h => h.costPerDay >= 20 && calculateStreak(h) >= 30), false);
    addTrophy("spec_penny", t.s_pp_t, t.s_pp_d, "microscope", state.habits.some(h => h.costPerDay > 0 && h.costPerDay <= 2 && calculateStreak(h) >= 100), false);
    addTrophy("spec_iron", t.s_ei_t, t.s_ei_d, "speaker", state.veteranMemos >= 1, false);

    // Bouncing back (Persistent)
    addTrophy("spec_phoenix", t.s_px_t, t.s_px_d, "bird", state.habits.some(h => { const s = getHistoricalStreaks(h); return s.length > 1 && s.slice(1).some(x => x >= 30); }), false);
    addTrophy("spec_rebirth", t.s_rb_t, t.s_rb_d, "bird", state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 90), false);
    addTrophy("spec_resurrection", t.s_rs_t, t.s_rs_d, "bird", state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365), false);

    // Perfection (Persistent)
    addTrophy("spec_diamond", t.s_dh_t, t.s_dh_d, "diamond", state.habits.some(h => { const s = getHistoricalStreaks(h); return s.length > 0 && s[0] >= 365; }), false);
    addTrophy("spec_monolith", t.s_mo_t, t.s_mo_d, "landmark", state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000), false);
    addTrophy("spec_silence", t.s_vs_t, t.s_vs_d, "wind", state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365), false);

    // Final sorting
    earnedTrophies.forEach((tr, i) => tr.orig = i);
    earnedTrophies.sort((a, b) => (a.earned === b.earned) ? a.orig - b.orig : (a.earned ? -1 : 1));
    earnedTrophies.forEach(tr => delete tr.orig);

    return earnedTrophies;
}
