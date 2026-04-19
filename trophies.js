/**
 * TSH Trophy Generator Engine
 * Hand-crafted, strictly ordered, epic milestones for The Steady Hand.
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

    // Helper function to easily push trophies to the array in exact order
    const addTrophy = (title, desc, icon, condition) => {
        earnedTrophies.push({ title, desc, icon, earned: condition });
    };

    // ==========================================
    // 1. TIMELINE TROPHIES (Strict Chronological Order)
    // All original anchors (First Step, Iron Will, The Forge, Unbroken, The Crucible, One Year, The Marathon, Deep Roots, Living Legend) perfectly preserved.
    // ==========================================
    const timelineData = [
        [1, "First Step", "footprints"],
        [2, "Second Wind", "wind"],
        [3, "Momentum", "trending-up"],
        [4, "Clear Mind", "brain"],
        [5, "High Five", "hand"],
        [6, "Steady Stride", "navigation"],
        [7, "Iron Will", "shield"],
        [10, "Double Digits", "hash"],
        [14, "Fortnight", "calendar-check"],
        [21, "Three Weeks", "layers"],
        [30, "The Forge", "swords"],
        [40, "Trial by Fire", "flame"],
        [50, "Half Century", "award"],
        [60, "Two Months", "calendar-clock"],
        [75, "Diamond Plated", "gem"],
        [90, "Unbroken", "flame"],
        [100, "Century Mark", "zap"],
        [125, "Ironbound", "anchor"],
        [150, "Five Months", "star"],
        [180, "The Crucible", "anvil"],
        [200, "Two Hundred", "target"],
        [225, "Relentless", "hammer"],
        [250, "Spartan", "spear"],
        [275, "Unwavering", "lock"],
        [300, "The Spartan", "swords"],
        [330, "Eleven Months", "calendar-days"],
        [365, "One Year", "sun"],
        [400, "Path of Stone", "mountain"],
        [450, "Unyielding", "shield"],
        [500, "The Vanguard", "flag"],
        [550, "Ironclad", "anchor"],
        [600, "Relentless Force", "zap"],
        [650, "Unshaken", "mountain-snow"],
        [700, "The Bastion", "castle"],
        [730, "The Marathon", "mountain-snow"],
        [750, "Resolute", "shield-check"],
        [800, "Steel Heart", "heart"],
        [850, "Unbreakable", "diamond"],
        [900, "The Sentinel", "eye"],
        [950, "Oathkeeper", "book"],
        [1000, "The Millennium", "crown"],
        [1050, "Steadfast", "anchor"],
        [1095, "Deep Roots", "tree-pine"],
        [1100, "Mountain Peak", "mountain"],
        [1150, "The Summit", "flag"],
        [1200, "Warlord", "axe"],
        [1250, "Conquistador", "map"],
        [1300, "The Sovereign", "crown"],
        [1350, "Undefeated", "shield"],
        [1400, "Bloodstone", "gem"],
        [1450, "The Aegis", "shield-check"],
        [1460, "The Monolith", "landmark"],
        [1500, "Empire Builder", "building"],
        [1550, "The Colossus", "tower-control"],
        [1600, "Grandmaster", "chess-king"],
        [1650, "Ascendant", "arrow-up-circle"],
        [1700, "Immortal", "sparkles"],
        [1750, "Mythic", "flame"],
        [1800, "Eternity", "infinity"],
        [1825, "Living Legend", "crown"]
    ];

    timelineData.forEach(([days, title, icon]) => {
        addTrophy(title, `${days} Days Clean`, icon, currentMainStreak >= days);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Strict Numerical Order)
    // All original anchors (Piggy Bank, Heavy Purse, Treasure, Dragon Hoard, King's Ransom) perfectly preserved.
    // ==========================================
    const financeData = [
        [1, "First Penny", "coins"],
        [5, "Spare Change", "coins"],
        [10, "Ten Bucks", "banknote"],
        [20, "Twenty", "banknote"],
        [30, "Thirty", "banknote"],
        [40, "Forty", "banknote"],
        [50, "Fifty Dollars", "wallet"],
        [75, "Seventy Five", "wallet"],
        [100, "Piggy Bank", "coins"],
        [150, "Growing Fund", "trending-up"],
        [200, "Two Hundred", "trending-up"],
        [250, "Quarter Grand", "credit-card"],
        [300, "Three Hundred", "credit-card"],
        [400, "Four Hundred", "credit-card"],
        [500, "Heavy Purse", "banknote"],
        [600, "Silver Stash", "database"],
        [700, "Seven Hundred", "database"],
        [800, "Eight Hundred", "database"],
        [900, "Nine Hundred", "database"],
        [1000, "Treasure", "gem"],
        [1250, "Wealth Builder", "bar-chart"],
        [1500, "Fifteen Hundred", "bar-chart"],
        [1750, "Steady Income", "bar-chart"],
        [2000, "Two Grand", "safe"],
        [2500, "Quarter Tithe", "safe"],
        [3000, "Three Grand", "safe"],
        [4000, "Four Grand", "safe"],
        [5000, "Dragon Hoard", "castle"],
        [6000, "Six Grand", "castle"],
        [7500, "Deep Pockets", "landmark"],
        [8000, "Eight Grand", "landmark"],
        [10000, "King's Ransom", "landmark"],
        [12500, "Baron's Vault", "building"],
        [15000, "Duke's Treasury", "building"],
        [20000, "Emperor's Hoard", "building"],
        [25000, "Empire", "landmark"],
        [30000, "Dynasty", "crown"],
        [40000, "Legacy", "gem"],
        [50000, "Generational", "diamond"],
        [75000, "Tycoon", "briefcase"],
        [100000, "Unstoppable", "sparkles"]
    ];

    financeData.forEach(([amount, title, icon]) => {
        addTrophy(title, `$${amount} Saved`, icon, totalSavedValue >= amount);
    });

    // ==========================================
    // 3. THE URGE ENGINE (Strict Numerical Order)
    // All original anchors (Seeking Light, Shield Wall, The Watchman, Storm Breaker) perfectly preserved.
    // ==========================================
    const urgeData = [
        [1, "First Defense", "shield-alert"],
        [2, "Pushing Back", "hand"],
        [3, "Holding Fast", "anchor"],
        [4, "Standing Firm", "lock"],
        [5, "Seeking Light", "bell-ring"],
        [10, "Tenth Victory", "swords"],
        [15, "Fifteen Fires", "flame"],
        [20, "Resister", "shield"],
        [25, "Shield Wall", "bell-electric"],
        [30, "Thirty Denials", "x-circle"],
        [40, "Forty Battles", "crosshair"],
        [50, "Defender", "shield-check"],
        [60, "Iron Guard", "shield-half"],
        [75, "Seventy Five", "target"],
        [100, "The Watchman", "eye"],
        [125, "Vigilant", "flashlight"],
        [150, "Awake", "sun"],
        [175, "Ever-Watchful", "eye"],
        [200, "Two Hundred", "target"],
        [250, "Quarter Thousand", "shield"],
        [300, "Spartan Shield", "shield-check"],
        [400, "Four Hundred", "shield-alert"],
        [500, "Storm Breaker", "zap"],
        [600, "Lightning Rod", "zap"],
        [700, "Thunderous", "cloud-lightning"],
        [800, "Hurricane", "wind"],
        [900, "Force of Nature", "mountain"],
        [1000, "The Wall", "brick-wall"]
    ];

    urgeData.forEach(([count, title, icon]) => {
        addTrophy(title, `Urge Button ${count}x`, icon, state.urgeClicks >= count);
    });

    // ==========================================
    // 4. THE VAULT MEMOS (Strict Numerical Order)
    // All original anchors (Inner Voice, War Cry, Choir of One, The Archivist) perfectly preserved.
    // ==========================================
    const memoData = [
        [1, "Inner Voice", "mic"],
        [2, "Speaking Truth", "message-circle"],
        [3, "Three Echoes", "radio"],
        [4, "Vocalizer", "volume-1"],
        [5, "War Cry", "mic-vocal"],
        [10, "The Speaker", "volume-2"],
        [15, "Testimony", "book"],
        [20, "Twenty Memos", "folder"],
        [25, "Choir of One", "library"],
        [30, "Thirty Records", "file-audio"],
        [40, "Forty Tracks", "disc"],
        [50, "The Chronicler", "book-open"],
        [75, "Oral History", "scroll"],
        [100, "The Archivist", "archive"],
        [150, "Historian", "library"],
        [200, "Two Hundred", "server"],
        [250, "Living Library", "database"]
    ];

    memoData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} Voice Memo${count > 1 ? 's' : ''}`, icon, state.voiceMemos >= count);
    });

    // ==========================================
    // 5. SERENITY RITUAL (Strict Numerical Order)
    // Original anchor (Ritual Master) perfectly preserved.
    // ==========================================
    const ritualData = [
        [1, "First Prayer", "hands"],
        [5, "Five Amens", "sun"],
        [10, "Ritual Novice", "book-open"],
        [25, "Quarter Century", "star"],
        [50, "Faithful", "heart"],
        [100, "Ritual Master", "book-open"],
        [200, "Two Hundred", "sun"],
        [365, "Devout", "church"],
        [500, "Half Thousand", "sparkles"],
        [1000, "The Monk", "crown"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `Serenity Prayer ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. SPECIAL & CREATIVE CHALLENGES
    // All original anchors (Midnight Guard, Echo of Iron, The Phoenix, Diamond Hands, Vow of Silence, The Monolith) perfectly preserved.
    // ==========================================
    
    // Multi-Struggle Management
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    addTrophy("Multi-Tasker", "3 Active Streaks", "boxes", activeStrugglesCount >= 3);
    addTrophy("The Juggler", "4 Active Streaks", "layout", activeStrugglesCount >= 4);
    addTrophy("Zen Master", "5+ Active Streaks", "cpu", activeStrugglesCount >= 5);

    // Late-Night Urges (Between Midnight and 4AM)
    addTrophy("Night Watch", "1 Late-Night Urge", "moon", state.midnightUrges >= 1);
    addTrophy("Midnight Guard", "10 Late Night Urges", "moon", state.midnightUrges >= 10);
    addTrophy("Darkest Hour", "25 Late-Night Urges", "moon", state.midnightUrges >= 25);
    addTrophy("Lunar Knight", "50 Late-Night Urges", "moon", state.midnightUrges >= 50);

    // Midday Urges (Between 11AM and 2PM)
    addTrophy("Daylight Defense", "1 Midday Urge", "sun", state.middayUrges >= 1);
    addTrophy("Noon Guardian", "10 Midday Urges", "sun", state.middayUrges >= 10);
    addTrophy("Sun Shield", "25 Midday Urges", "sun", state.middayUrges >= 25);
    addTrophy("Solar Knight", "50 Midday Urges", "sun", state.middayUrges >= 50);

    // Veteran Memos (Memos made while holding a 1+ Year streak)
    addTrophy("Echo of Iron", "Memo after 1 Yr Clean", "speaker", state.veteranMemos >= 1);
    addTrophy("Elder Wisdom", "5 Memos @ 1 Yr", "speaker", state.veteranMemos >= 5);
    addTrophy("Ancient Tome", "10 Memos @ 1 Yr", "speaker", state.veteranMemos >= 10);

    // Post-Slip Resilience (Bouncing back after a failure)
    const hasPhoenix = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 30);
    addTrophy("The Phoenix", "30 Days after a Slip", "bird", hasPhoenix);

    const hasRebirth = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 90);
    addTrophy("Rebirth", "90 Days after Slip", "bird", hasRebirth);

    const hasRevenant = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 180);
    addTrophy("The Revenant", "180 Days after Slip", "bird", hasRevenant);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy("Resurrection", "1 Yr after Slip", "bird", hasResurrection);

    // Absolute Perfection (Zero slips over long periods)
    const hasDiamondHands = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 365);
    addTrophy("Diamond Hands", "1 Year, Zero Slips", "diamond", hasDiamondHands);

    const hasFlawless = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 730);
    addTrophy("Flawless Victory", "2 Yrs, Zero Slips", "shield-check", hasFlawless);
    
    const hasMonolith = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000);
    addTrophy("The Monolith", "1000 Days, Zero Slips", "landmark", hasMonolith);

    const hasUntouchable = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1825);
    addTrophy("Untouchable", "5 Yrs, Zero Slips", "crown", hasUntouchable);

    // Zero-Cost Habits (Quitting things that don't cost money, purely for discipline)
    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy("Vow of Silence", "1 Yr on $0 Struggle", "wind", hasVowSilence);

    // ==========================================
    // FINAL SORTING
    // Brings earned ones to the front, keeps unearned chronological!
    // ==========================================
    
    earnedTrophies.sort((a, b) => (b.earned === true) - (a.earned === true));

    return earnedTrophies;
}
