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
        const res = await fetch(`${WORKER_API_URL}?offset=${currentWallOffset}`);
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

        // Map the messages (Removed character limits and "Read More" button entirely)
        const messagesHTML = messages.map(m => `
            <div class="card-glass p-4 border-white/30 wall-message select-none transition-transform" data-id="${escapeHTML(String(m.id))}">
                <div class="cursor-pointer active:scale-[0.98] transition-transform" onclick="handleMessageTap(this.parentElement, ${m.id})">
                    <p class="text-sm text-slate-800 font-medium leading-relaxed msg-body whitespace-pre-wrap">"${escapeHTML(m.text)}"</p>
                </div>
                <p class="text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-3 text-right pointer-events-none">- Anonymous</p>
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

async function postToWall() {
    const input = document.getElementById('wall-input');
    const text = input.value.trim();
    if(!text) return;

    input.value = '';
    
    const feed = document.getElementById('wall-feed');
    const placeholder = document.getElementById('wall-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }
    
    // Instantly show the user's uncapped message at the top
    const newMsgHTML = `
        <div class="card-glass p-4 border-yellow-400/50 shadow-md">
            <p class="text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-wrap">"${escapeHTML(text)}"</p>
            <p class="text-[8px] text-yellow-600 uppercase tracking-widest font-bold mt-3 text-right">- You</p>
        </div>
    `;
    
    feed.insertAdjacentHTML('afterbegin', newMsgHTML);

    state.wallPosts = (state.wallPosts || 0) + 1;
    localStorage.setItem('steady_hand_state', JSON.stringify(state));

    try {
        await fetch(WORKER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
    } catch(e) {
        alert("Failed to permanently save message to the global wall.");
    }
}
