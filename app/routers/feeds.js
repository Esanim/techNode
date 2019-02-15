// npm packages
const express = require('express');

// app imports
const { feedsHandler } = require('../handlers');

// globals
const router = new express.Router();
const { getFeeds } = feedsHandler;

/* All the Feeds Route */
router
  .route('')
    .get(getFeeds)

module.exports = router;