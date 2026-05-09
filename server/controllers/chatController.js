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
        // Fallback simulated response if no API key is set
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            const getResponse = (personaId) => {
                const responses = {
                    empathetic: [
                        "I can feel that this is important to you. I'm here.",
                        "That sounds incredibly heavy. You're safe sharing more here.",
                        "Take a breath. You're doing the best you can.",
                        "I wish I could offer a hug, but I offer my full attention."
                    ],
                    logical: [
                        "Analyzing the situation. Have you considered breaking this down into smaller steps?",
                        "That is a valid observation. Let's look at the variables.",
                        "Logic suggests that this feeling is temporary, though valid.",
                        "Effective coping strategy detected. Proceed."
                    ],
                    creative: [
                        "Imagine your worry as a cloud passing through a vast sky.",
                        "That reminds me of a storm... chaotic but necessary for growth.",
                        "Let's paint a new perspective on this.",
                        "What color is this emotion for you right now?"
                    ]
                };
                const pool = responses[personaId] || responses.empathetic;
                return pool[Math.floor(Math.random() * pool.length)];
            };

            // Simulate slight delay for effect
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            return res.json({
                response: getResponse(persona)
            });
        }

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
