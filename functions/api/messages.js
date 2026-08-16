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
                "SELECT id, text, created_at FROM messages ORDER BY CASE WHEN language = ? THEN 1 ELSE 0 END DESC, created_at DESC LIMIT 50 OFFSET ?"
            ).bind(targetLang, offset).all();
            return Response.json(results);
        }

        // CASE B: User tapped a specific message to translate it
        const msg = await env.DB.prepare(
            "SELECT text FROM messages WHERE id = ?"
        ).bind(msgId).first();
        
        if (!msg) {
            return Response.json({ error: "Message not found" }, { status: 404 });
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
        return Response.json({ error: "Error processing request" }, { status: 500 });
    }
}

export async function onRequestPost({ request, env }) {
    try {
        const { text, language } = await request.json();
        
        // Validation: Ensure text exists (Empty strings rejected), but UNCAPPED length
        if (!text || text.trim() === '') {
            return Response.json({ error: "Invalid message" }, { status: 400 });
        }

        const msgLang = language || 'en';

        // Insert the message into the D1 Database and report back its new id,
        // so the client can make the just-posted message tappable/translatable
        // like every other message on the wall.
        const result = await env.DB.prepare("INSERT INTO messages (text, language) VALUES (?, ?)").bind(text, msgLang).run();

        return Response.json({ success: true, id: result.meta.last_row_id });
    } catch (e) {
        console.error("Worker Error:", e);
        return Response.json({ error: "Error saving message" }, { status: 500 });
    }
}
