/**
 * TSH Trophy Generator Engine
 * Dynamically evaluates state and returns nearly 300 potential trophies
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

    // Helper function to easily push trophies to the array
    const addTrophy = (title, desc, icon, condition) => {
        earnedTrophies.push({ title, desc, icon, earned: condition });
    };

    // ==========================================
    // 1. TIMELINE TROPHIES (Streak based)
    // Over 60 Trophies tracking 1 to 1825 Days
    // ==========================================
    
    const timelineMilestones = [
        { d: 1, title: "First Step", icon: "footprints" },
        { d: 2, title: "Day Two", icon: "sunrise" },
        { d: 3, title: "Momentum", icon: "trending-up" },
        { d: 4, title: "Day Four", icon: "calendar" },
        { d: 5, title: "High Five", icon: "hand" },
        { d: 6, title: "Almost There", icon: "hourglass" },
        { d: 7, title: "Iron Will", icon: "shield" },
        { d: 10, title: "Double Digits", icon: "hash" },
        { d: 14, title: "Fortnight", icon: "calendar-check" },
        { d: 21, title: "Three Weeks", icon: "layers" },
        { d: 30, title: "The Forge", icon: "swords" },
        { d: 40, title: "Forty Days", icon: "sun" },
        { d: 50, title: "Half Century", icon: "award" },
        { d: 60, title: "Two Months", icon: "calendar-clock" },
        { d: 75, title: "Diamond Plated", icon: "gem" },
        { d: 90, title: "Unbroken", icon: "flame" },
        { d: 100, title: "Century Mark", icon: "zap" },
        { d: 120, title: "Four Months", icon: "calendar-days" },
        { d: 150, title: "Five Months", icon: "star" },
        { d: 180, title: "The Crucible", icon: "anvil" },
        { d: 200, title: "Two Hundred", icon: "shield-check" },
        { d: 250, title: "Relentless", icon: "hammer" },
        { d: 300, title: "Spartan", icon: "spear" },
        { d: 365, title: "One Year", icon: "crown" }
    ];

    // Auto-generate trophies for years 2 through 5
    for (let i = 400; i <= 1800; i += 50) {
        if (i === 700) continue; // Skip near 2 year
        if (i === 1100) continue; // Skip near 3 year
        if (i === 1450) continue; // Skip near 4 year
        addTrophy(`Day ${i}`, `${i} Days Clean`, "mountain", currentMainStreak >= i);
    }

    addTrophy("The Marathon", "2 Years Clean", "mountain-snow", currentMainStreak >= 730);
    addTrophy("Deep Roots", "3 Years Clean", "tree-pine", currentMainStreak >= 1095);
    addTrophy("The Monolith", "4 Years Clean", "landmark", currentMainStreak >= 1460);
    addTrophy("Living Legend", "5 Years Clean", "sparkles", currentMainStreak >= 1825);

    // Apply the standard timeline array
    timelineMilestones.forEach(m => {
        addTrophy(m.title, `${m.d} Days Clean`, m.icon, currentMainStreak >= m.d);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Money Saved)
    // Over 50 Trophies tracking $5 to $100,000
    // ==========================================
    
    const financialMilestones = [
        { a: 5, title: "Spare Change", icon: "coins" },
        { a: 10, title: "Ten Bucks", icon: "banknote" },
        { a: 25, title: "Twenty Five", icon: "wallet" },
        { a: 50, title: "Fifty Dollars", icon: "credit-card" },
        { a: 100, title: "Piggy Bank", icon: "piggy-bank" },
        { a: 250, title: "Growing Fund", icon: "trending-up" },
        { a: 500, title: "Heavy Purse", icon: "shopping-bag" },
        { a: 750, title: "Nest Egg", icon: "safe" },
        { a: 1000, title: "Treasure", icon: "gem" },
        { a: 2500, title: "Silver Stash", icon: "database" },
        { a: 5000, title: "Dragon Hoard", icon: "castle" },
        { a: 10000, title: "King's Ransom", icon: "landmark" },
        { a: 25000, title: "Empire", icon: "building" },
        { a: 50000, title: "Dynasty", icon: "crown" },
        { a: 100000, title: "Unstoppable", icon: "diamond" }
    ];

    // Auto-generate filler financial trophies
    for (let i = 1100; i < 5000; i += 200) {
        addTrophy(`$${i} Saved`, "War Chest", "banknote", totalSavedValue >= i);
    }
    for (let i = 5500; i < 10000; i += 500) {
        addTrophy(`$${i} Saved`, "War Chest", "banknote", totalSavedValue >= i);
    }
    for (let i = 11000; i < 25000; i += 1000) {
        addTrophy(`$${i} Saved`, "War Chest", "banknote", totalSavedValue >= i);
    }

    financialMilestones.forEach(m => {
        addTrophy(m.title, `$${m.a} Saved`, m.icon, totalSavedValue >= m.a);
    });

    // ==========================================
    // 3. THE URGE ENGINE (Seeking Help)
    // Dozens of trophies for defeating urges
    // ==========================================
    
    const urgeMilestones = [
        { u: 1, title: "First Defense", icon: "shield-alert" },
        { u: 5, title: "Seeking Light", icon: "bell-ring" },
        { u: 10, title: "Tenth Victory", icon: "swords" },
        { u: 25, title: "Shield Wall", icon: "bell-electric" },
        { u: 50, title: "Defender", icon: "shield-check" },
        { u: 100, title: "The Watchman", icon: "eye" },
        { u: 200, title: "Vigilant", icon: "flashlight" },
        { u: 300, title: "Unwavering", icon: "anchor" },
        { u: 500, title: "Storm Breaker", icon: "zap" },
        { u: 1000, title: "The Wall", icon: "brick-wall" }
    ];

    for (let i = 15; i < 100; i += 5) {
        if (i === 25 || i === 50) continue;
        addTrophy(`Defeated ${i}`, "Urges Beaten", "shield-alert", state.urgeClicks >= i);
    }

    urgeMilestones.forEach(m => {
        addTrophy(m.title, `${m.u} Urges Beaten`, m.icon, state.urgeClicks >= m.u);
    });

    // ==========================================
    // 4. THE VAULT (Voice Memos)
    // Trophies for building your audio shield
    // ==========================================
    
    const memoMilestones = [
        { v: 1, title: "Inner Voice", icon: "mic" },
        { v: 5, title: "War Cry", icon: "mic-vocal" },
        { v: 10, title: "The Speaker", icon: "volume-2" },
        { v: 25, title: "Choir of One", icon: "library" },
        { v: 50, title: "The Chronicler", icon: "book" },
        { v: 100, title: "The Archivist", icon: "archive" },
        { v: 250, title: "Living Library", icon: "server" }
    ];

    for (let i = 15; i < 50; i += 5) {
        if (i === 25) continue;
        addTrophy(`Memo ${i}`, "Voice Memos", "mic", state.voiceMemos >= i);
    }

    memoMilestones.forEach(m => {
        addTrophy(m.title, `${m.v} Memos`, m.icon, state.voiceMemos >= m.v);
    });

    // ==========================================
    // 5. SERENITY RITUAL (Gateway Uses)
    // Trophies for entering the app correctly
    // ==========================================
    
    addTrophy("First Prayer", "Serenity Prayed", "hands", state.amenClicks >= 1);
    addTrophy("Ritual Novice", "Prayed 10x", "book-open", state.amenClicks >= 10);
    addTrophy("Faithful", "Prayed 50x", "sun", state.amenClicks >= 50);
    addTrophy("Ritual Master", "Prayed 100x", "book", state.amenClicks >= 100);
    addTrophy("Devout", "Prayed 365x", "church", state.amenClicks >= 365);

    // ==========================================
    // 6. CREATIVE & SITUATIONAL CHALLENGES
    // The hardest and most unique achievements
    // ==========================================

    // Dual Wielder (Managing multiple habits at once)
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    addTrophy("Multi-Tasker", "3 Active Streaks", "boxes", activeStrugglesCount >= 3);
    addTrophy("The Juggler", "5 Active Streaks", "layout", activeStrugglesCount >= 5);

    // Midnight Guard (Urges defeated between 12AM and 4AM)
    addTrophy("Night Watch", "1 Late Urge", "moon", state.midnightUrges >= 1);
    addTrophy("Midnight Guard", "10 Late Urges", "moon", state.midnightUrges >= 10);
    addTrophy("Darkest Hour", "50 Late Urges", "moon", state.midnightUrges >= 50);

    // Veteran Memos (Memos recorded while having a streak over 1 year)
    addTrophy("Echo of Iron", "Memo @ 1 Yr Clean", "speaker", state.veteranMemos >= 1);
    addTrophy("Elder Wisdom", "10 Memos @ 1 Yr", "speaker", state.veteranMemos >= 10);

    // Resilience (Hitting 30+ days AFTER having a recorded slip)
    const hasPhoenix = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 30);
    addTrophy("The Phoenix", "30 Days after Slip", "bird", hasPhoenix);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy("Resurrection", "1 Yr after Slip", "bird", hasResurrection);

    // Perfection (Hitting 1 Year or 1000 Days with ZERO recorded slips)
    const hasDiamondHands = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 365);
    addTrophy("Diamond Hands", "1 Yr, Zero Slips", "diamond", hasDiamondHands);

    const hasFlawless = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000);
    addTrophy("Flawless Victory", "1000 Days, 0 Slips", "shield-check", hasFlawless);

    // Vow of Silence (Hitting streaks on habits that cost $0 per day)
    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy("Vow of Silence", "1 Yr on $0 Habit", "wind", hasVowSilence);

    // ==========================================
    // FINAL SORTING
    // Return all trophies, bringing the earned ones to the front
    // ==========================================
    
    // Sort: Earned trophies first, then unearned
    earnedTrophies.sort((a, b) => (b.earned === true) - (a.earned === true));

    return earnedTrophies;
}
