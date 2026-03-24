// netlify/functions/chat.js
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        if (!prompt) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing prompt' }) };
        }

        const apiKey = process.env.AI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "La clé d'API (AI_API_KEY) n'est pas configurée dans les paramètres Netlify." })
            };
        }

        // Call Pollinations API with the secret key
        const aiResponse = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'openai',
                messages: [{ role: 'user', content: prompt }],
                seed: Math.floor(Math.random() * 9999)
            })
        });

        if (!aiResponse.ok) {
            let errText = await aiResponse.text();
            try {
                const errObj = JSON.parse(errText);
                errText = errObj.error?.message || errText;
            } catch (e) { }
            return {
                statusCode: aiResponse.status,
                body: JSON.stringify({ error: `Erreur de l'API: ${errText}` })
            };
        }

        const data = await aiResponse.json();
        const replyText = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "Aucune réponse reçue";

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reply: replyText })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
