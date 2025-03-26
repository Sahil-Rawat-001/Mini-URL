const express = require('express');
const {handleGenerateShortUrl, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

// route to generate short url
router.post('/', handleGenerateShortUrl);

// route to get the analytics for short url
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;