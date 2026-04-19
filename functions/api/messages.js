async function loadWallMessages() {
    const feed = document.getElementById('wall-feed');
    feed.innerHTML = '<div id="wall-placeholder" class="text-center animate-pulse py-8 uppercase text-[10px] font-bold">Loading sanctuary...</div>';
    
    try {
        const res = await fetch(WORKER_API_URL);
        const messages = await res.json();
        
        if (messages.length === 0) {
            feed.innerHTML = '<div id="wall-placeholder" class="text-center text-slate-500 text-xs italic">The wall is quiet. Be the first to leave a mark.</div>';
            return;
        }

        feed.innerHTML = messages.map(m => `
            <div class="card-glass p-4 wall-message active:scale-[0.98] transition-transform cursor-pointer" onclick="handleMessageTap(this, ${m.id})">
                <p class="text-sm font-medium msg-body leading-relaxed">"${escapeHTML(m.text)}"</p>
                <p class="text-[8px] uppercase font-bold mt-3 text-right text-slate-500 pointer-events-none">- Anonymous</p>
            </div>
        `).join('');
    } catch(e) { 
        feed.innerHTML = '<div id="wall-placeholder" class="text-center text-xs italic">Connection lost.</div>'; 
    }
}
