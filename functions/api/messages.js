export async function onRequestGet({ env }) {
    // Fetch the 50 most recent messages from your D1 Database
    const { results } = await env.DB.prepare("SELECT text, created_at FROM messages ORDER BY created_at DESC LIMIT 50").all();
    
    return Response.json(results);
}

export async function onRequestPost({ request, env }) {
    try {
        const { text } = await request.json();
        
        // Basic validation
        if (!text || text.length > 250) {
            return new Response("Invalid message length", { status: 400 });
        }

        // Insert the message into D1
        await env.DB.prepare("INSERT INTO messages (text) VALUES (?)").bind(text).run();
        
        return Response.json({ success: true });
    } catch (e) {
        return new Response("Error saving message", { status: 500 });
    }
}
