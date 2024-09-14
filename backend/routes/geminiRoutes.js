const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {  
  console.error(
    "API key not found in environment variables. Make sure it's defined in the .env file."
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

router.get("/generate", async (req, res) => {
  try {
    const { question } = req.query;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = await response.text();

    res.json({ output: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
