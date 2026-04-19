/**
 * TSH API - Wall of Wisdom Backend
 * Handles message retrieval, individual translation, and posting.
 */

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const msgId = url.searchParams.get('id');
    const targetLang = url.searchParams.get('lang') || 'en';

    try {
        // CASE A: User is loading the Wall (Initial Load)
        // We return the raw messages from the database without AI processing.
        if (!msgId) {
            const { results } = await env.DB.prepare(
                "SELECT id, text, created_at FROM messages ORDER BY created_at DESC LIMIT 50"
            ).all();
            return Response.json(results);
        }

        // CASE B: User tapped a specific message to translate it
        // 1. Fetch that specific message text from the D1 database
        const msg = await env.DB.prepare(
            "SELECT text FROM messages WHERE id = ?"
        ).bind(msgId).first();
        
        if (!msg) {
            return new Response("Message not found", { status: 404 });
        }

        // 2. Run the specific text through Cloudflare Workers AI
        // This only consumes "Neurons" when a user specifically requests a translation.
        const aiResponse = await env.AI.run('@cf/meta/m2m100-1.2b', {
            text: msg.text,
            target_lang: targetLang
        });

        // 3. Return the single translated string
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
        
        // Validation: Limit length to keep database and AI translation efficient
        if (!text || text.length > 5000) {
            return new Response("Invalid message length", { status: 400 });
        }

        // Insert into D1 Database
        await env.DB.prepare("INSERT INTO messages (text) VALUES (?)").bind(text).run();
        
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error saving message", { status: 500 });
    }
}

export async function onRequestDelete({ request, env }) {
    try {
        const { id, code } = await request.json();
        
        // Security check against your environment variable
        if (code !== env.DELETE_CODE) {
            return new Response("Unauthorized", { status: 401 });
        }

        await env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
        
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error deleting message", { status: 500 });
    }
}
