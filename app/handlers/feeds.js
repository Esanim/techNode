/**
 * List all the feeds.
 */
async function getFeeds(request, response, next) {
  try {
    const feeds = {}
    return response.json(feeds);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getFeeds
};