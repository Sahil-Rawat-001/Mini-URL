const express = require('express');
const {handleGenerateShortUrl, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');

// route to generate short url
router.post('/',isAuthenticated, handleGenerateShortUrl);

// route to get the analytics for short url
router.get('/analytics/:shortId',isAuthenticated ,handleGetAnalytics);

module.exports = router;