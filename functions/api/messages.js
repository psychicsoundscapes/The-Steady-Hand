export async function onRequestGet({ env }) {
    try {
        // Fetch the 50 most recent messages, including the ID for the admin delete feature
        const { results } = await env.DB.prepare("SELECT id, text, created_at FROM messages ORDER BY created_at DESC LIMIT 50").all();
        return Response.json(results);
    } catch (e) {
        return new Response("Error loading messages", { status: 500 });
    }
}

export async function onRequestPost({ request, env }) {
    try {
        const { text } = await request.json();
        
        // Basic validation: ensure text exists and isn't too long
        if (!text || text.length > 250) {
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
