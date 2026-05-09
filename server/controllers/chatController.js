const OpenAI = require('openai');

// Initialize OpenAI client
// Note: In production, ensure OPENAI_API_KEY is key is set
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handleChat = async (req, res, next) => {
    const { message, persona } = req.body;

    if (!message) {
        res.status(400);
        throw new Error('Message is required');
    }

    // Define system prompt based on persona
    let systemPrompt = "You are NightLight AI, a supportive mental wellness companion.";
    if (persona === 'empathetic') {
        systemPrompt += " Be gentle, kind, and focus on validating feelings. Keep responses concise.";
    } else if (persona === 'logical') {
        systemPrompt += " Be analytical, practical, and focus on problem-solving steps. Keep responses structured.";
    } else if (persona === 'creative') {
        systemPrompt += " Be abstract, artistic, and use metaphors. Encourage looking at things from a new angle.";
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            model: "gpt-4o-mini", // Cost-effective model
        });

        res.json({
            response: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500);
        throw new Error('AI Service temporarily unavailable');
    }
};

module.exports = { handleChat };
