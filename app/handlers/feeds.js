// Declare variables
const {feedsTransformation} = require('../transformations'),
  fs = require('fs')
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
  try {
    if (!dataObj) {
      return response.json({})
    }

    return response.json(feedsTransformation.processFeedsData(dataObj, id))
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getFeeds
}
