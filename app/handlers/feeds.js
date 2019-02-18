// Declare variables
const {feedsTransformation} = require('../transformations'),
  fs = require('fs'),
  {APIError} = require('../helpers')
let dataObj

// Read the file and send to the callback
fs.readFile('app/data/feeds.json', handleFile)

// Write the callback function
function handleFile(err, data) {
  if (err) throw err
  dataObj = JSON.parse(data)
}

/**
 * Get all the notification feeds.
 */
async function getFeeds(request, response, next) {
  const {id} = request.params
  // check if data is loaded
  if (!dataObj) {
    return response.json({})
  }
  // aggregate the data
  try {
    const feedData = feedsTransformation.processFeedsData(dataObj, id)
    if (!feedData) {
      return response
        .status(404)
        .json(new APIError(404, 'No data', `No data for the post id: ${id}.`))
    }
    return response.json(feedData)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getFeeds
}
