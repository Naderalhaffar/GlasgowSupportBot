// backend/server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            },
            {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`
                }
            }
        );
        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching response from OpenAI", error: error.response.data });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
