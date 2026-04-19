export async function onRequestGet({ request, env }) {
    try {
        // 1. Get the requested language from the URL (e.g., '?lang=es')
        const url = new URL(request.url);
        const targetLang = url.searchParams.get('lang') || 'en';

        // 2. Fetch the 50 most recent messages from the database
        const { results } = await env.DB.prepare("SELECT id, text, created_at FROM messages ORDER BY created_at DESC LIMIT 50").all();
        
        // 3. If English, return immediately (fastest response)
        if (targetLang === 'en') {
            return Response.json(results);
        }

        // 4. If another language, translate the wall dynamically
        const translatedResults = await Promise.all(results.map(async (msg) => {
            try {
                // Call Cloudflare's built-in AI translation model
                const response = await env.AI.run('@cf/meta/m2m100-1.2b', {
                    text: msg.text,
                    target_lang: targetLang
                });
                
                // Return the message with the newly translated text
                return { ...msg, text: response.translated_text || msg.text };
            } catch (aiError) {
                // 5. Failsafe: If translation fails for this specific message, return the original text
                console.error(`Translation failed for message ${msg.id}:`, aiError);
                return msg; 
            }
        }));

        return Response.json(translatedResults);

    } catch (e) {
        return new Response("Error loading messages", { status: 500 });
    }
}

export async function onRequestPost({ request, env }) {
    try {
        const { text } = await request.json();
        
        // Validation: Ensure text exists and set a high limit for long-form stories
        if (!text || text.length > 10000) {
            return new Response("Invalid message length", { status: 400 });
        }

        // Insert the message into the D1 Database
        await env.DB.prepare("INSERT INTO messages (text) VALUES (?)").bind(text).run();
        
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error saving message", { status: 500 });
    }
}

export async function onRequestDelete({ request, env }) {
    try {
        const { id, code } = await request.json();
        
        // Check the passcode entered in the app against your Cloudflare Environment Variable
        if (code !== env.DELETE_CODE) {
            return new Response("Unauthorized", { status: 401 });
        }

        // If the passcode is correct, vaporize the specific message
        await env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
        
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error deleting message", { status: 500 });
    }
}
