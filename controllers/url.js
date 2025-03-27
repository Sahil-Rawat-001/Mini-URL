const { nanoid } = require("nanoid");
const URL = require("../models/url");

// Generate short url
async function handleGenerateShortUrl(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    // check if url is already shortened
    const existingEntry = await URL.findOne({ redirectUrl: body.url });
    if (existingEntry) {
      return res.json({ id: existingEntry.shortID });
    }

    // Generate a short id and save it to database
    const shortID = nanoid(8);
    await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    });
    
    return res.render('home', {
      id: shortID
    })
    // return res.json({ id: shortID });

  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
}

// Get analytics for a short URL
// Get Analytics for a Short URL
async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// exporting module
module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
