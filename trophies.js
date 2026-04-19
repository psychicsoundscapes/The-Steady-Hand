/**
 * TSH Trophy Generator Engine
 * Hand-crafted, properly paced milestones for The Steady Hand.
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

    // Helper function to easily push trophies to the array in exact order
    const addTrophy = (title, desc, icon, condition) => {
        earnedTrophies.push({ title, desc, icon, earned: condition });
    };

    // ==========================================
    // 1. TIMELINE TROPHIES (Spaced for maximum dopamine impact)
    // Matches modern recovery milestones (1d, 1w, 1m, 3m, 6m, 1y) 
    // with carefully placed "bridge" trophies to prevent burn-out.
    // ==========================================
    const timelineData = [
        [1, "First Step", "footprints"],                 // 24 Hours
        [3, "The Crucial 72", "wind"],                   // 72 Hours (Major physical detox hurdle)
        [7, "One Week Free", "calendar-check"],          // 1 Week
        [14, "The Fortnight", "layers"],                 // 2 Weeks
        [21, "Habit Breaker", "brain"],                  // Science says 21 days breaks the loop
        [30, "The Forge (1 Month)", "swords"],           // 1 Month
        [45, "Momentum", "trending-up"],                 // Bridge
        [60, "Two Months", "shield"],                    // 2 Months
        [90, "The Crucible (3 Months)", "anvil"],        // 3 Months
        [100, "Triple Digits", "zap"],                   // 100 Days (Massive psychological milestone)
        [180, "Half Year", "star"],                      // 6 Months
        [250, "The Spartan", "spear"],                   // Bridge
        [365, "The Sun Returns", "sun"],                 // 1 Year
        [500, "The Vanguard", "flag"],                   // Bridge
        [730, "Two Years Unbroken", "shield-check"],     // 2 Years
        [1000, "The Millennium", "crown"],               // 1000 Days
        [1460, "Four Year Fortress", "castle"],          // 4 Years
        [1825, "Living Legend", "sparkles"]              // 5 Years
    ];

    timelineData.forEach(([days, title, icon]) => {
        addTrophy(title, `${days} Days Clean`, icon, currentMainStreak >= days);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Slightly spaced out)
    // ==========================================
    const financeData = [
        [10, "First Dime", "coins"],
        [50, "Fifty Dollars", "wallet"],
        [100, "Piggy Bank", "coins"],
        [250, "Quarter Grand", "credit-card"],
        [500, "Heavy Purse", "banknote"],
        [1000, "Treasure", "gem"],
        [2500, "Wealth Builder", "safe"],
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
        [10, "Pushing Back", "hand"],
        [25, "Shield Wall", "bell-electric"],
        [50, "Defender", "shield-check"],
        [100, "The Watchman", "eye"],
        [250, "Storm Breaker", "zap"],
        [500, "Force of Nature", "mountain"],
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
        [15, "Testimony", "book"],
        [30, "Choir of One", "library"],
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
        [365, "Devout", "sun"],
        [1000, "The Monk", "crown"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `Serenity Prayer ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. CREATIVE & OUT-OF-THE-BOX CHALLENGES
    // Hyper-specific, hidden achievements for players who love weird stats.
    // ==========================================
    
    // Multi-Struggle Combinations
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    const hasTrinity = state.habits.filter(h => calculateStreak(h) >= 30).length >= 3;
    addTrophy("The Trinity", "3 Habits, 30+ Days Each", "boxes", hasTrinity);

    // Contextual Urge Survival
    addTrophy("Night Watch", "1 Late-Night Urge", "moon", state.midnightUrges >= 1);
    addTrophy("Vampire Hunter", "50 Late-Night Urges", "moon", state.midnightUrges >= 50);
    
    addTrophy("Daylight Defense", "1 Midday Urge", "sun", state.middayUrges >= 1);
    addTrophy("Solar Knight", "50 Midday Urges", "sun", state.middayUrges >= 50);

    // High-Stakes Financial Reversals
    const hasAlchemist = state.habits.some(h => h.costPerDay >= 15 && calculateStreak(h) >= 365);
    addTrophy("The Alchemist", "1 Yr Clean on a $15+/day Habit", "gem", hasAlchemist);

    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && calculateStreak(h) >= 365);
    addTrophy("Vow of Silence", "1 Yr Clean on a $0 Habit", "wind", hasVowSilence);

    // Cross-Discipline Trophies
    const hasGraceUnderFire = state.urgeClicks >= 100 && state.habits.some(h => h.isMain && h.slips.length === 0 && calculateStreak(h) > 30);
    addTrophy("Grace Under Fire", "100+ Urges clicked, 0 Main Slips", "shield-check", hasGraceUnderFire);

    const hasChoirOfAngels = state.voiceMemos >= 20 && state.amenClicks >= 100;
    addTrophy("Choir of Angels", "20 Memos & 100 Prayers", "speaker", hasChoirOfAngels);

    const hasArchivistSecret = state.voiceMemos >= 50 && currentMainStreak >= 500;
    addTrophy("Archivist's Secret", "50 Memos + 500 Days Clean", "archive", hasArchivistSecret);

    // Veteran & Post-Slip Resilience 
    addTrophy("Echo of Iron", "Memo recorded after 1 Yr Clean", "speaker", state.veteranMemos >= 1);

    const hasPhoenix = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 30);
    addTrophy("The Phoenix", "30 Days after a Slip", "bird", hasPhoenix);

    const hasResurrection = state.habits.some(h => h.slips.length > 0 && calculateStreak(h) >= 365);
    addTrophy("Resurrection", "1 Yr after a Slip", "bird", hasResurrection);

    // Absolute Perfection
    const hasFlawless = state.habits.some(h => h.slips.length === 0 && calculateStreak(h) >= 730);
    addTrophy("Flawless Victory", "2 Yrs, Zero Slips", "shield-check", hasFlawless);

    // ==========================================
    // FINAL SORTING: Modern Gaming Standard
    // Earned -> Unearned, while strictly keeping chronological timeline inside each group
    // ==========================================
    
    // Assign original order index to guarantee stable sorting
    earnedTrophies.forEach((t, index) => {
        t.originalIndex = index;
    });

    earnedTrophies.sort((a, b) => {
        // If one is earned and the other isn't, the earned one wins
        if (a.earned && !b.earned) return -1;
        if (!a.earned && b.earned) return 1;
        
        // If they have the same status (both earned OR both locked), sort chronologically
        return a.originalIndex - b.originalIndex;
    });

    // Cleanup the temporary indexing
    earnedTrophies.forEach(t => delete t.originalIndex);

    return earnedTrophies;
}
