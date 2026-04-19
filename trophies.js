/**
 * TSH Trophy Generator Engine
 * Spaced, meaningful, and epic milestones for The Steady Hand.
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

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
    // 1. TIMELINE TROPHIES (Strict Chronological Order)
    // Spaced out to make each milestone feel earned
    // ==========================================
    const timelineData = [
        [1, "First Step", "footprints"],
        [7, "One Week Free", "calendar-check"],
        [14, "Fortnight", "shield"],
        [30, "The Forge", "swords"],
        [60, "Two Months", "navigation"],
        [90, "The Crucible", "anvil"],
        [180, "Half Year", "star"],
        [250, "Spartan", "spear"],
        [365, "One Year", "sun"],
        [500, "The Vanguard", "flag"],
        [730, "Two Years Unbroken", "shield-check"],
        [1000, "The Millennium", "crown"],
        [1825, "Living Legend", "sparkles"]
    ];

    timelineData.forEach(([days, title, icon]) => {
        addTrophy(title, `${days} Days Clean`, icon, currentMainStreak >= days);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Strict Numerical Order)
    // Spaced for major financial breakthroughs
    // ==========================================
    const financeData = [
        [10, "First Savings", "coins"],
        [50, "Fifty Dollars", "wallet"],
        [100, "Piggy Bank", "piggy-bank"],
        [500, "Heavy Purse", "banknote"],
        [1000, "Treasure", "gem"],
        [5000, "Dragon Hoard", "castle"],
        [10000, "King's Ransom", "landmark"],
        [25000, "Empire", "building"],
        [50000, "Generational", "diamond"],
        [100000, "Unstoppable", "sparkles"]
    ];

    financeData.forEach(([amount, title, icon]) => {
        addTrophy(title, `$${amount} Saved`, icon, totalSavedValue >= amount);
    });

    // ==========================================
    // 3. THE URGE ENGINE
    // ==========================================
    const urgeData = [
        [1, "First Defense", "shield-alert"],
        [10, "Tenth Victory", "swords"],
        [25, "Shield Wall", "bell-electric"],
        [50, "Defender", "shield-check"],
        [100, "The Watchman", "eye"],
        [250, "Quarter Thousand", "target"],
        [500, "Storm Breaker", "zap"],
        [1000, "The Wall", "brick-wall"]
    ];

    urgeData.forEach(([count, title, icon]) => {
        addTrophy(title, `Urge Button ${count}x`, icon, state.urgeClicks >= count);
    });

    // ==========================================
    // 4. THE VAULT MEMOS
    // ==========================================
    const memoData = [
        [1, "Inner Voice", "mic"],
        [5, "War Cry", "mic-vocal"],
        [15, "Voice of Reason", "book"],
        [30, "Thirty Records", "file-audio"],
        [50, "The Chronicler", "book-open"],
        [100, "The Archivist", "archive"]
    ];

    memoData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} Voice Memo${count > 1 ? 's' : ''}`, icon, state.voiceMemos >= count);
    });

    // ==========================================
    // 5. SERENITY RITUAL
    // ==========================================
    const ritualData = [
        [1, "First Prayer", "hands"],
        [10, "Ritual Novice", "book-open"],
        [50, "Faithful", "heart"],
        [100, "Ritual Master", "church"],
        [365, "Devout", "sun"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `Serenity Prayer ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. THE WALL OF WISDOM
    // ==========================================
    const wallPostsCount = state.wallPosts || 0;
    const wallData = [
        [1, "First Echo", "message-square"],
        [10, "Sanctuary Guide", "users"],
        [25, "Sanctuary Pillar", "globe"],
        [100, "Global Voice", "radio"]
    ];

    wallData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} Wall Post${count > 1 ? 's' : ''}`, icon, wallPostsCount >= count);
    });

    // ==========================================
    // 7. SPECIAL & CREATIVE CHALLENGES
    // ==========================================
    
    // Multi-Struggle Management
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    addTrophy("Zen Master", "5+ Active Streaks", "cpu", activeStrugglesCount >= 5);
    
    const isMasterJuggler = activeStrugglesCount >= 3 && currentMainStreak >= 14;
    addTrophy("Master Juggler", "3+ habits clean for 2 weeks", "shapes", isMasterJuggler);

    // Timed Urge Battles
    addTrophy("Night Watch", "1 Late-Night Urge", "moon", state.midnightUrges >= 1);
    const isNightOwl = state.midnightUrges > state.middayUrges && state.midnightUrges >= 10;
    addTrophy("Night Watchman", "Survival of 10+ Late-Night Urges", "moon", isNightOwl);

    addTrophy("Daylight Defense", "1 Midday Urge", "sun", state.middayUrges >= 1);

    // Behavior & Discipline
    const isQuietConqueror = currentMainStreak >= 30 && state.urgeClicks === 0;
    addTrophy("Quiet Conqueror", "30 Days Clean without Urge button", "ghost", isQuietConqueror);

    const isPreacher = wallPostsCount > state.urgeClicks && wallPostsCount >= 10;
    addTrophy("The Evangelist", "More Wall posts than Urge clicks", "megaphone", isPreacher);

    // Financial Sub-Challenges
    const hasHighStakes = state.habits.some(h => h.costPerDay >= 20 && calculateStreak(h) >= 30);
    addTrophy("High Stakes", "30 Days Clean ($20+/day habit)", "flame", hasHighStakes);

    const hasPennyPincher = state.habits.some(h => h.costPerDay > 0 && h.costPerDay <= 2 && calculateStreak(h) >= 100);
    addTrophy("Penny Pincher", "100 Days Clean (<$2/day habit)", "microscope", hasPennyPincher);

    // Veteran Actions
    addTrophy("Echo of Iron", "Memo after 1 Yr Clean", "speaker", state.veteranMemos >= 1);

    // Post-Slip Resilience (Bouncing back stronger)
    const hasPhoenix = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 1 && s.slice(1).some(x => x >= 30);
    });
    addTrophy("The Phoenix", "30 Days after a Slip", "bird", hasPhoenix);

    const hasRebirth = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 90);
    addTrophy("Rebirth", "90 Days after Slip", "bird", hasRebirth);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy("Resurrection", "1 Yr after Slip", "bird", hasResurrection);

    // Absolute Perfection (Zero slips since day 1)
    const hasDiamondHands = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 0 && s[0] >= 365;
    });
    addTrophy("Diamond Hands", "1 Year on first attempt", "diamond", hasDiamondHands);
    
    const hasMonolith = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 1000);
    addTrophy("The Monolith", "1000 Days, Zero Slips", "landmark", hasMonolith);

    // Zero-Cost Habits (Quitting for pure discipline, not money)
    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy("Vow of Silence", "1 Yr on $0 Struggle", "wind", hasVowSilence);

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
