function jsonError(error, status) {
    return Response.json({ error }, { status });
}

async function isWithinRateLimit(limiter, request) {
    if (!limiter || typeof limiter.limit !== 'function') return true;

    try {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        return (await limiter.limit({ key: ip })).success;
    } catch (error) {
        console.error('Rate limiter error:', error);
        return true;
    }
}

export async function onRequestPost({ request, env }) {
    if (!await isWithinRateLimit(env.WALL_REPORT_LIMITER, request)) {
        return jsonError('Too many reports. Please try again shortly.', 429);
    }

    let body;
    try {
        body = await request.json();
    } catch (error) {
        return jsonError('Invalid request body', 400);
    }

    const messageId = Number(body && body.messageId);
    const reporterToken = body && body.reporterToken;
    if (!Number.isSafeInteger(messageId) || messageId < 1) {
        return jsonError('Invalid message id', 400);
    }
    if (typeof reporterToken !== 'string' || !/^[a-zA-Z0-9_-]{20,100}$/.test(reporterToken)) {
        return jsonError('Invalid report token', 400);
    }

    try {
        const message = await env.DB.prepare('SELECT id FROM messages WHERE id = ?').bind(messageId).first();
        if (!message) return jsonError('Message not found', 404);

        const result = await env.DB.prepare(
            "INSERT OR IGNORE INTO message_reports (message_id, reporter_token) VALUES (?, ?)"
        ).bind(messageId, reporterToken).run();

        return Response.json({ success: true, alreadyReported: result.meta.changes === 0 });
    } catch (error) {
        console.error('Report save error:', error);
        return jsonError('Reporting is temporarily unavailable', 503);
    }
}
