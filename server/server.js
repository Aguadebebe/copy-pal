 

import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/scrape", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required." });
  }

  try {
    // Launch Puppeteer with proper configurations
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // ✅ Set a real browser User-Agent to bypass bot detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Navigate to the given URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract all visible text from the page
    const extractedText = await page.evaluate(() => {
      return document.body.innerText.trim();
    });

    console.log("Fetched Body Text:", extractedText);

    // Close the browser instance
    await browser.close();

    // Send the extracted text to the frontend
    res.json({ extractedText });
  } catch (error) {
    console.error("Error fetching or parsing content:", error);
    res.status(500).json({ error: "Error Fetching or Parsing Content!" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 
