export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const msgId = url.searchParams.get('id');
    const targetLang = url.searchParams.get('lang') || 'en';
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    try {
        // CASE A: User is loading the Wall (Staggered Load)
        if (!msgId) {
            // Fetch 50 messages at a time, starting from the current offset
            const { results } = await env.DB.prepare(
                "SELECT id, text, created_at FROM messages ORDER BY created_at DESC LIMIT 50 OFFSET ?"
            ).bind(offset).all();
            return Response.json(results);
        }

        // CASE B: User tapped a specific message to translate it
        const msg = await env.DB.prepare(
            "SELECT text FROM messages WHERE id = ?"
        ).bind(msgId).first();
        
        if (!msg) {
            return new Response("Message not found", { status: 404 });
        }

        // Run the specific text through Cloudflare Workers AI
        const aiResponse = await env.AI.run('@cf/meta/m2m100-1.2b', {
            text: msg.text,
            target_lang: targetLang
        });

        return Response.json({
            translatedText: aiResponse.translated_text || msg.text
        });

    } catch (e) {
        console.error("Worker Error:", e);
        return new Response("Error processing request", { status: 500 });
    }
}

export async function onRequestPost({ request, env }) {
    try {
        const { text } = await request.json();
        
        // Validation: Ensure text exists (Empty strings rejected), but UNCAPPED length
        if (!text || text.trim() === '') {
            return new Response("Invalid message", { status: 400 });
        }

        // Insert the message into the D1 Database
        await env.DB.prepare("INSERT INTO messages (text) VALUES (?)").bind(text).run();
        
        return Response.json({ success: true });
    } catch (e) {
        console.error("Worker Error:", e);
        return new Response("Error saving message", { status: 500 });
    }
}
