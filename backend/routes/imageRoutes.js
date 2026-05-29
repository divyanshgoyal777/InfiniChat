const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        prompt,
        steps: 6,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log(response.data);

    const image = response.data.result.image;

    if (!image) {
      return res.status(500).json({
        error: "No image generated",
      });
    }

    const imageUrl = `data:image/png;base64,${image}`;

    res.json({
      imageUrl,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "Image generation failed",
    });
  }
});

module.exports = router;
