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
        [90, "Unbroken", "shield-check"],
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
        [730, "The Marathon", "activity"],
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
        [100, "Piggy Bank", "piggy-bank"],
        [150, "Growing Fund", "trending-up"],
        [200, "Two Hundred", "trending-up"],
        [250, "Quarter Grand", "credit-card"],
        [300, "Three Hundred", "credit-card"],
        [400, "Four Hundred", "credit-card"],
        [500, "Heavy Purse", "shopping-bag"],
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
        [10000, "King's Ransom", "crown"],
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
        addTrophy(title, `${count} Urges Beaten`, icon, state.urgeClicks >= count);
    });

    // ==========================================
    // 4. THE VAULT MEMOS (Strict Numerical Order)
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
        addTrophy(title, `${count} Memos`, icon, state.voiceMemos >= count);
    });

    // ==========================================
    // 5. SERENITY RITUAL (Strict Numerical Order)
    // ==========================================
    const ritualData = [
        [1, "First Prayer", "hands"],
        [5, "Five Amens", "sun"],
        [10, "Ritual Novice", "book-open"],
        [25, "Quarter Century", "star"],
        [50, "Faithful", "heart"],
        [100, "Ritual Master", "book"],
        [200, "Two Hundred", "sun"],
        [365, "Devout", "church"],
        [500, "Half Thousand", "sparkles"],
        [1000, "The Monk", "crown"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `Prayed ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. SPECIAL & CREATIVE CHALLENGES
    // ==========================================
    
    // Multi-Struggle Management
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    addTrophy("Multi-Tasker", "3 Active Streaks", "boxes", activeStrugglesCount >= 3);
    addTrophy("The Juggler", "4 Active Streaks", "layout", activeStrugglesCount >= 4);
    addTrophy("Zen Master", "5+ Active Streaks", "cpu", activeStrugglesCount >= 5);

    // Midnight Urges (Between Midnight and 4AM)
    addTrophy("Night Watch", "1 Late Urge", "moon", state.midnightUrges >= 1);
    addTrophy("Midnight Guard", "10 Late Urges", "moon", state.midnightUrges >= 10);
    addTrophy("Darkest Hour", "25 Late Urges", "moon", state.midnightUrges >= 25);
    addTrophy("Lunar Knight", "50 Late Urges", "moon", state.midnightUrges >= 50);

    // Veteran Memos (Memos made while holding a 1+ Year streak)
    addTrophy("Echo of Iron", "Memo @ 1 Yr Clean", "speaker", state.veteranMemos >= 1);
    addTrophy("Elder Wisdom", "5 Memos @ 1 Yr", "speaker", state.veteranMemos >= 5);
    addTrophy("Ancient Tome", "10 Memos @ 1 Yr", "speaker", state.veteranMemos >= 10);

    // Post-Slip Resilience (Bouncing back after a failure)
    const hasPhoenix = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 30);
    addTrophy("The Phoenix", "30 Days after Slip", "bird", hasPhoenix);

    const hasRebirth = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 90);
    addTrophy("Rebirth", "90 Days after Slip", "bird", hasRebirth);

    const hasRevenant = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 180);
    addTrophy("The Revenant", "180 Days after Slip", "bird", hasRevenant);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy("Resurrection", "1 Yr after Slip", "bird", hasResurrection);

    // Absolute Perfection (Zero slips over long periods)
    const hasDiamondHands = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 365);
    addTrophy("Diamond Hands", "1 Yr, Zero Slips", "diamond", hasDiamondHands);

    const hasFlawless = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 730);
    addTrophy("Flawless Victory", "2 Yrs, Zero Slips", "shield-check", hasFlawless);

    const hasUntouchable = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1825);
    addTrophy("Untouchable", "5 Yrs, Zero Slips", "crown", hasUntouchable);

    // Zero-Cost Habits (Quitting things that don't cost money, purely for discipline)
    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy("Vow of Silence", "1 Yr on $0 Habit", "wind", hasVowSilence);

    // ==========================================
    // FINAL SORTING
    // Because they were pushed in order from easiest to hardest,
    // this sort brings earned ones to the front but keeps unearned ones
    // perfectly chronological so you always see your next immediate goal!
    // ==========================================
    
    earnedTrophies.sort((a, b) => (b.earned === true) - (a.earned === true));

    return earnedTrophies;
}
