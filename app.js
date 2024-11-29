const express = require("express");
const { fetchPosts } = require("./search");

const app = express();
const PORT = 3000;

app.get("/search", async (req, res) => {
  const { keyword, page } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const results = await fetchPosts(keyword, page || 1);
  return res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
