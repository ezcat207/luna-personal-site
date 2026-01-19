import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Handle CORS if needed (though Vercel functions are on the same origin as the frontend)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const apiKey = process.env.VITE_SUPER_MIND_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'VITE_SUPER_MIND_API_KEY not configured on server.' });
    }

    const { path, ...body } = req.body;
    const targetUrl = `https://space.ai-builders.com/backend/v1${path || '/chat/completions'}`;

    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}
