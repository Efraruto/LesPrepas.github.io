// netlify/functions/chat.js
exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { messages, customSystemPrompt } = JSON.parse(event.body);
        if (!messages || !Array.isArray(messages)) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid messages array' }) };
        }

        const apiKey = process.env.AI_API_KEY;
        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "La clé d'API (AI_API_KEY) n'est pas configurée dans les paramètres Netlify." })
            };
        }

        const systemPrompt = {
            role: 'system',
            content: customSystemPrompt || "Tu es l'assistant IA du site EtudesPrepas pour étudiants marocains en prépas, FST et médecine. Réponds en français, sois concis et pédagogique."
        };

        // Call Groq API with the secret key
        const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [systemPrompt, ...messages]
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
