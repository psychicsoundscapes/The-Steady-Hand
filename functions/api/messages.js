const MAX_MESSAGE_LENGTH = 1_000;
const MAX_WALL_OFFSET = 50_000;
const SUPPORTED_LANGUAGES = new Set([
    'en', 'es', 'fr', 'de', 'zh', 'hi', 'ar', 'pt', 'ru', 'ja', 'he', 'tl',
    'it', 'ko', 'pl', 'sw', 'ms', 'fa', 'ur', 'uk', 'nl', 'sv', 'el', 'ro',
    'cs', 'tr', 'vi', 'th', 'id', 'bn', 'ta', 'am', 'ha', 'yo', 'zu'
]);

function isSupportedLanguage(language) {
    return typeof language === 'string' && SUPPORTED_LANGUAGES.has(language);
}

function jsonError(error, status) {
    return Response.json({ error }, { status });
}

async function isWithinRateLimit(limiter, request) {
    // Rate-limit bindings are configured in Cloudflare, not in source control.
    // Until a binding is present, keep the public Wall working normally.
    if (!limiter || typeof limiter.limit !== 'function') return true;

    try {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const result = await limiter.limit({ key: ip });
        return result.success;
    } catch (error) {
        console.error('Rate limiter error:', error);
        return true;
    }
}

export async function onRequestGet({ request, env }) {
    const url = new URL(request.url);
    const msgId = url.searchParams.get('id');
    const targetLang = url.searchParams.get('lang') || 'en';
    const offsetParam = url.searchParams.get('offset') || '0';

    if (!isSupportedLanguage(targetLang)) {
        return jsonError('Unsupported language', 400);
    }

    if (!/^\d+$/.test(offsetParam)) {
        return jsonError('Invalid offset', 400);
    }

    const offset = Number(offsetParam);
    if (!Number.isSafeInteger(offset) || offset > MAX_WALL_OFFSET) {
        return jsonError('Offset is outside the supported range', 400);
    }

    try {
        // CASE A: User is loading the Wall (Staggered Load)
        if (!msgId) {
            // Fetch 50 messages at a time, starting from the current offset
            const { results } = await env.DB.prepare(
                "SELECT id, text, language, created_at FROM messages ORDER BY CASE WHEN language = ? THEN 1 ELSE 0 END DESC, created_at DESC LIMIT 50 OFFSET ?"
            ).bind(targetLang, offset).all();
            return Response.json(results);
        }

        if (!/^\d+$/.test(msgId)) {
            return jsonError('Invalid message id', 400);
        }

        const messageId = Number(msgId);
        if (!Number.isSafeInteger(messageId) || messageId < 1) {
            return jsonError('Invalid message id', 400);
        }

        // Cache completed translations. The cache key includes the message id and
        // target language, so a repeat tap does not run Workers AI again.
        const cache = caches.default;
        try {
            const cachedResponse = await cache.match(request);
            if (cachedResponse) return cachedResponse;
        } catch (error) {
            console.warn('Translation cache read failed:', error);
        }

        if (!await isWithinRateLimit(env.WALL_TRANSLATION_LIMITER, request)) {
            return jsonError('Too many translation requests. Please try again shortly.', 429);
        }

        // CASE B: User tapped a specific message to translate it
        const msg = await env.DB.prepare(
            "SELECT text, language FROM messages WHERE id = ?"
        ).bind(messageId).first();
        
        if (!msg) {
            return Response.json({ error: "Message not found" }, { status: 404 });
        }

        let translatedText = msg.text;
        let isSuccessfulTranslation = true;

        if (msg.language !== targetLang) {
            const aiPayload = {
                text: msg.text,
                target_lang: targetLang
            };
            if (msg.language && isSupportedLanguage(msg.language)) {
                aiPayload.source_lang = msg.language;
            }

            const aiResult = await env.AI.run('@cf/meta/m2m100-1.2b', aiPayload);
            const candidate = aiResult && typeof aiResult.translated_text === 'string'
                ? aiResult.translated_text.trim()
                : '';

            // Guard against model repetition loops/hallucinations (e.g. "iiiiii...", "......")
            const isDegenerate = candidate && /(.)\1{7,}/.test(candidate);

            if (candidate && !isDegenerate) {
                translatedText = candidate;
            } else {
                console.warn('Degenerate or empty translation result:', { messageId, source: msg.language, target: targetLang, candidate });
                translatedText = msg.text;
                isSuccessfulTranslation = false;
            }
        }

        const cacheControl = isSuccessfulTranslation ? 'public, max-age=2592000' : 'no-store';
        const response = Response.json(
            { translatedText, sourceLanguage: msg.language },
            { headers: { 'Cache-Control': cacheControl } }
        );

        if (isSuccessfulTranslation) {
            try {
                await cache.put(request, response.clone());
            } catch (error) {
                console.warn('Translation cache write failed:', error);
            }
        }
        return response;

    } catch (e) {
        console.error("Worker Error:", e);
        return Response.json({ error: "Error processing request" }, { status: 500 });
    }
}

export async function onRequestPost({ request, env }) {
    if (!await isWithinRateLimit(env.WALL_POST_LIMITER, request)) {
        return jsonError('Too many posts. Please try again shortly.', 429);
    }

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return jsonError('Invalid request body', 400);
    }

    const text = body && typeof body.text === 'string' ? body.text.trim() : '';
    const language = body && body.language || 'en';
        
    if (!text) {
        return jsonError('Message cannot be empty', 400);
    }

    if ([...text].length > MAX_MESSAGE_LENGTH) {
        return jsonError(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`, 400);
    }

    if (!isSupportedLanguage(language)) {
        return jsonError('Unsupported language', 400);
    }

    try {
        // TODO: validate Turnstile token via Siteverify before INSERT (see CLOUDFLARE_SETUP.md step 3)
        // Insert the message into the D1 Database and report back its new id,
        // so the client can make the just-posted message tappable/translatable
        // like every other message on the wall.
        const result = await env.DB.prepare("INSERT INTO messages (text, language) VALUES (?, ?)").bind(text, language).run();

        return Response.json({ success: true, id: result.meta.last_row_id });
    } catch (e) {
        console.error("Worker Error:", e);
        return jsonError('Error saving message', 500);
    }
}
