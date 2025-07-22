const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "fe67d2d1a08b477d8ea97f79e5f690ae"; // your API key

app.get("/news", async (req, res) => {
  const query = req.query.q || "technology";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
