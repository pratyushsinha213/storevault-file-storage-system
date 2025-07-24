import geminiAi from '../services/geminiAiService.js';
const model = geminiAi.getGenerativeModel({ model: "gemini-2.5-flash" });

export const aiResponse = async (req, res) => {
    const { prompt } = req.body;
    try {
        const generateContent = await model.generateContentStream(prompt);
        const result = await generateContent.response;
        const text = await result.text();

        return res.status(200).json({
            message: 'AI response generated successfully',
            success: true,
            data: text
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}