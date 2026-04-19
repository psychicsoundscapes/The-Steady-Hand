/**
 * TSH Trophy Generator Engine
 * Hand-crafted, properly paced milestones with permanent historical badges.
 */

function generateAllTrophies(state, currentMainStreak, totalSavedValue, activeStrugglesCount, calculateStreak) {
    const earnedTrophies = [];

    // Helper function to easily push trophies to the array
    const addTrophy = (title, desc, icon, condition) => {
        earnedTrophies.push({ title, desc, icon, earned: condition });
    };

    // Helper function to get an array of all historical streak lengths for a habit
    const getHistoricalStreaks = (habit) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(habit.startDate);
        start.setHours(0, 0, 0, 0);

        let streaks = [];
        let currentStart = start;

        // If no slips, the entire time is one streak
        if (!habit.slips || habit.slips.length === 0) {
            streaks.push(Math.max(0, Math.floor((today - start) / 86400000)));
            return streaks;
        }

        // Calculate length of each historical streak between slips
        habit.slips.forEach(slipStr => {
            const slipDate = new Date(slipStr);
            slipDate.setHours(0, 0, 0, 0);

            const diff = Math.floor((slipDate - currentStart) / 86400000);
            streaks.push(Math.max(0, diff));

            // Next streak starts the day after the slip
            currentStart = new Date(slipDate.getTime() + 86400000); 
        });

        // Add the final active streak from the last slip to today
        const finalDiff = Math.floor((today - currentStart) / 86400000);
        streaks.push(Math.max(0, finalDiff));

        return streaks;
    };

    // ==========================================
    // 1. TIMELINE TROPHIES (Resets on slip)
    // ==========================================
    const timelineData = [
        [1, "First Step", "footprints"],                 
        [3, "The Crucial 72", "wind"],                   
        [7, "One Week Free", "calendar-check"],          
        [14, "The Fortnight", "layers"],                 
        [21, "Habit Breaker", "brain"],                  
        [30, "The Forge (1 Month)", "swords"],           
        [45, "Momentum", "trending-up"],                 
        [60, "Two Months", "shield"],                    
        [90, "The Crucible (3 Months)", "anvil"],        
        [100, "Triple Digits", "zap"],                   
        [180, "Half Year", "star"],                      
        [250, "The Spartan", "sword"],                   
        [365, "The Sun Returns", "sun"],                 
        [500, "The Vanguard", "flag"],                   
        [730, "Two Years Unbroken", "shield-check"],     
        [1000, "The Millennium", "crown"],               
        [1460, "Four Year Fortress", "castle"],          
        [1825, "Living Legend", "sparkles"]              
    ];

    timelineData.forEach(([days, title, icon]) => {
        addTrophy(title, `${days} Days Clean`, icon, currentMainStreak >= days);
    });

    // ==========================================
    // 2. FINANCIAL WAR CHEST (Permanent)
    // ==========================================
    const financeData = [
        [10, "First Dime", "coins"],
        [50, "Fifty Dollars", "wallet"],
        [100, "Piggy Bank", "coins"],
        [250, "Quarter Grand", "credit-card"],
        [500, "Heavy Purse", "banknote"],
        [1000, "Treasure", "gem"],
        [2500, "Wealth Builder", "lock"],
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
    // 3. THE URGE ENGINE (Permanent)
    // ==========================================
    const urgeData = [
        [1, "First Defense", "shield-alert"],
        [10, "Pushing Back", "hand"],
        [25, "Shield Wall", "bell-ring"],
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
    // 4. THE VAULT MEMOS (Permanent)
    // ==========================================
    const memoData = [
        [1, "Inner Voice", "mic"],
        [5, "War Cry", "mic"],
        [15, "Testimony", "book"],
        [30, "Choir of One", "library"],
        [50, "The Chronicler", "book-open"],
        [100, "The Archivist", "archive"]
    ];

    memoData.forEach(([count, title, icon]) => {
        addTrophy(title, `${count} Voice Memo${count > 1 ? 's' : ''}`, icon, state.voiceMemos >= count);
    });

    // ==========================================
    // 5. SERENITY RITUAL (Permanent)
    // ==========================================
    const ritualData = [
        [1, "First Prayer", "hand"],
        [10, "Ritual Novice", "book-open"],
        [50, "Faithful", "heart"],
        [100, "Ritual Master", "landmark"],
        [365, "Devout", "sun"],
        [1000, "The Monk", "crown"]
    ];

    ritualData.forEach(([count, title, icon]) => {
        addTrophy(title, `Serenity Prayer ${count}x`, icon, state.amenClicks >= count);
    });

    // ==========================================
    // 6. CREATIVE & OUT-OF-THE-BOX CHALLENGES
    // ==========================================
    
    // Wall of Wisdom Trophies (Permanent)
    addTrophy("First Echo", "1 Message on the Wall", "message-square", state.wallPosts >= 1);
    addTrophy("The Encourager", "10 Messages on the Wall", "heart", state.wallPosts >= 10);
    addTrophy("Sanctuary Pillar", "50 Messages on the Wall", "users", state.wallPosts >= 50);
    addTrophy("Beacon of Light", "100 Messages on the Wall", "sun", state.wallPosts >= 100);

    // Multi-Struggle Combinations (Dynamic based on current streak)
    addTrophy("Dual Wielder", "2 Active Streaks", "layers", activeStrugglesCount >= 2);
    const hasTrinity = state.habits.filter(h => calculateStreak(h) >= 30).length >= 3;
    addTrophy("The Trinity", "3 Habits, 30+ Days Each", "boxes", hasTrinity);

    // Contextual Urge Survival (Permanent)
    addTrophy("Night Watch", "1 Late-Night Urge", "moon", state.midnightUrges >= 1);
    addTrophy("Vampire Hunter", "50 Late-Night Urges", "moon", state.midnightUrges >= 50);
    
    addTrophy("Daylight Defense", "1 Midday Urge", "sun", state.middayUrges >= 1);
    addTrophy("Solar Knight", "50 Midday Urges", "sun", state.middayUrges >= 50);

    // High-Stakes Financial Reversals (Permanent - checked against historical streaks)
    const hasAlchemist = state.habits.some(h => h.costPerDay >= 15 && getHistoricalStreaks(h).some(s => s >= 365));
    addTrophy("The Alchemist", "1 Yr Clean on a $15+/day Habit", "gem", hasAlchemist);

    const hasVowSilence = state.habits.some(h => h.costPerDay === 0 && getHistoricalStreaks(h).some(s => s >= 365));
    addTrophy("Vow of Silence", "1 Yr Clean on a $0 Habit", "wind", hasVowSilence);

    // Cross-Discipline Trophies (Permanent)
    const hasGraceUnderFire = state.urgeClicks >= 100 && state.habits.some(h => h.isMain && getHistoricalStreaks(h).some(s => s >= 30));
    addTrophy("Grace Under Fire", "100+ Urges clicked, 30+ Days Clean", "shield-check", hasGraceUnderFire);

    const hasChoirOfAngels = state.voiceMemos >= 20 && state.amenClicks >= 100;
    addTrophy("Choir of Angels", "20 Memos & 100 Prayers", "speaker", hasChoirOfAngels);

    const hasArchivistSecret = state.voiceMemos >= 50 && getHistoricalStreaks(state.habits.find(h => h.isMain) || {}).some(s => s >= 500);
    addTrophy("Archivist's Secret", "50 Memos + 500 Days Clean", "archive", hasArchivistSecret);

    // Veteran & Post-Slip Resilience (Permanent - checked against historical records)
    addTrophy("Echo of Iron", "Memo recorded after 1 Yr Clean", "speaker", state.veteranMemos >= 1);

    // The Phoenix checks if any streak AFTER the first index (index 0 is pre-slip) is >= 30
    const hasPhoenix = state.habits.some(h => {
        const streaks = getHistoricalStreaks(h);
        return streaks.length > 1 && streaks.slice(1).some(s => s >= 30);
    });
    addTrophy("The Phoenix", "30 Days after a Slip", "bird", hasPhoenix);

    const hasResurrection = state.habits.some(h => {
        const streaks = getHistoricalStreaks(h);
        return streaks.length > 1 && streaks.slice(1).some(s => s >= 365);
    });
    addTrophy("Resurrection", "1 Yr after a Slip", "bird", hasResurrection);

    // Absolute Perfection (Permanent - checks if the very first attempt reached 730 days)
    const hasFlawless = state.habits.some(h => {
        const streaks = getHistoricalStreaks(h);
        return streaks.length > 0 && streaks[0] >= 730;
    });
    addTrophy("Flawless Victory", "2 Yrs, Zero Slips", "shield-check", hasFlawless);

    // ==========================================
    // FINAL SORTING
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
