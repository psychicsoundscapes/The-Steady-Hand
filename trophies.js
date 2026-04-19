/**
 * TSH Trophy Generator Engine
 * Creative milestones using ONLY existing app.js data points.
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

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
    // 1. TIMELINE TROPHIES (Resets on slip)
    // ==========================================
    const timelineData = [
        [1, "First Step", "footprints"],                 
        [7, "One Week Free", "calendar-check"],          
        [30, "The Forge", "swords"],           
        [90, "The Crucible", "anvil"],        
        [180, "Half Year", "star"],                      
        [365, "The Sun Returns", "sun"],                 
        [730, "Two Years Unbroken", "shield-check"],     
        [1000, "The Millennium", "crown"],               
        [1825, "Living Legend", "sparkles"]              
    ];
    timelineData.forEach(([days, title, icon]) => addTrophy(title, `${days} Days Clean`, icon, currentMainStreak >= days));

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Permanent)
    // ==========================================
    const financeData = [
        [100, "Piggy Bank", "coins"],
        [1000, "Treasure", "gem"],
        [10000, "King's Ransom", "landmark"],
        [100000, "Unstoppable", "sparkles"]
    ];
    financeData.forEach(([amount, title, icon]) => addTrophy(title, `$${amount} Saved`, icon, totalSavedValue >= amount));

    // --- NEW CREATIVE FINANCIALS ---
    const hasHighStakes = state.habits.some(h => h.costPerDay >= 20 && calculateStreak(h) >= 30);
    addTrophy("High Stakes", "30 Days Clean on a $20+/day habit", "flame", hasHighStakes);

    const hasPennyPincher = state.habits.some(h => h.costPerDay > 0 && h.costPerDay <= 2 && calculateStreak(h) >= 100);
    addTrophy("Penny Pincher", "100 Days Clean on a tiny cost habit", "microscope", hasPennyPincher);

    // ==========================================
    // 3. THE URGE ENGINE (Permanent)
    // ==========================================
    addTrophy("First Defense", "1 Urge Button Click", "shield-alert", state.urgeClicks >= 1);
    addTrophy("Vigilant", "50 Urge Button Clicks", "eye", state.urgeClicks >= 50);
    addTrophy("Force of Nature", "500 Urge Button Clicks", "mountain", state.urgeClicks >= 500);

    // --- NEW CREATIVE URGE ---
    const isQuietConqueror = currentMainStreak >= 30 && state.urgeClicks === 0;
    addTrophy("Quiet Conqueror", "30 Days Clean without clicking 'Urge'", "ghost", isQuietConqueror);

    // ==========================================
    // 4. THE VAULT MEMOS (Permanent)
    // ==========================================
    addTrophy("Inner Voice", "1 Vault Memo", "mic", state.voiceMemos >= 1);
    addTrophy("Voice of Reason", "15 Vault Memos", "mic-2", state.voiceMemos >= 15);
    addTrophy("The Archivist", "100 Vault Memos", "archive", state.voiceMemos >= 100);

    // ==========================================
    // 5. THE WALL OF WISDOM (Permanent)
    // ==========================================
    addTrophy("First Echo", "1 Wall Post", "message-square", state.wallPosts >= 1);
    addTrophy("Sanctuary Pillar", "25 Wall Posts", "users", state.wallPosts >= 25);
    
    // --- NEW CREATIVE WALL ---
    const isPreacher = state.wallPosts > state.urgeClicks && state.wallPosts >= 10;
    addTrophy("The Evangelist", "More Wall posts than Urge clicks", "megaphone", isPreacher);

    // ==========================================
    // 6. SURVIVAL & RESILIENCE (Historical Badges)
    // ==========================================
    const hasPhoenix = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 1 && s.slice(1).some(x => x >= 30);
    });
    addTrophy("The Phoenix", "30 Days after a Slip", "bird", hasPhoenix);

    const hasDiamondHands = state.habits.some(h => {
        const s = getHistoricalStreaks(h);
        return s.length > 0 && s[0] >= 365;
    });
    addTrophy("Diamond Hands", "1 Year on first attempt", "diamond", hasDiamondHands);

    // --- NEW CREATIVE SURVIVAL ---
    const isJuggler = activeStrugglesCount >= 3 && currentMainStreak >= 14;
    addTrophy("The Juggler", "3+ habits clean for 2 weeks", "shapes", isJuggler);

    const isNightOwl = state.midnightUrges > state.middayUrges && state.midnightUrges >= 10;
    addTrophy("Night Watchman", "Survival of 10+ Late-Night Urges", "moon", isNightOwl);

    // ==========================================
    // FINAL SORTING
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
