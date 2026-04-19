export async function onRequestGet({ env }) {
    // We added 'id' to the SELECT statement so the app knows which message is which
    const { results } = await env.DB.prepare("SELECT id, text, created_at FROM messages ORDER BY created_at DESC LIMIT 50").all();
    return Response.json(results);
}

export async function onRequestPost({ request, env }) {
    try {
        const { text } = await request.json();
        if (!text || text.length > 250) {
            return new Response("Invalid message", { status: 400 });
        }
        await env.DB.prepare("INSERT INTO messages (text) VALUES (?)").bind(text).run();
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error saving message", { status: 500 });
    }
}

// NEW: The secret admin delete function
export async function onRequestDelete({ request, env }) {
    try {
        const { id, code } = await request.json();
        
        // Checks the password you typed against your Cloudflare Secret Variable
        if (code !== env.DELETE_CODE) {
            return new Response("Unauthorized", { status: 401 });
        }

        // If the code matches, vaporize the message
        await env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(id).run();
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error deleting message", { status: 500 });
    }
}
