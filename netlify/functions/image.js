// netlify/functions/image.js
exports.handler = async function (event, context) {
    const prompt = event.queryStringParameters.prompt;

    if (!prompt) {
        return { statusCode: 400, body: 'Missing prompt parameter' };
    }

    const apiKey = process.env.POLLINATIONS_API_KEY;
    if (!apiKey) {
        return {
            statusCode: 500,
            body: "Erreur: La clé d'API POLLINATIONS_API_KEY n'est pas configurée dans les variables Netlify."
        };
    }

    try {
        const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: `Pollinations API Error: ${await response.text()}`
            };
        }

        // Convert the image binary stream to Base64 to safely return it over HTTP via Netlify
        const arrayBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return {
            statusCode: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            },
            body: base64Image,
            isBase64Encoded: true
        };

    } catch (error) {
        return { statusCode: 500, body: error.message };
    }
};
