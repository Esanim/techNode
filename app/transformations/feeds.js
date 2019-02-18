// Declare variables
let R = require('ramda')
const {ramdaUtils} = require('../utils')

/**
 * An algorithm for transforming raw notification feeds data into a desired output.
 * @param {Array} data - an array of objects, where each object contains following properties: type (Comment or Like), post (id, title), user (id, name)
 * @param {String} postId - an id of the post
 * @returns a list of objects, where each objects has the following fields:
 * @type {String} Title
 * @type {Array || null} Like
 * @type {Array || null} Comment
 */
function processFeedsData(data, postId) {
  const groupByPostIdAndType = ramdaUtils.groupByMany([
    (o) => o.post.id,
    R.prop('type')
  ])
  const getDataByPostId = R.prop(postId)
  const transformObject = (obj) => {
    const getTitle = () => {
      const headLens = R.lensIndex(0)
      const lensView = R.view(headLens, R.toPairs(obj))
      return R.path([1, 0, 'post', 'title'], lensView)
    }
    const getLikes = () => {
      const likes = R.prop('Like')(obj)
      if (likes) {
        return R.pluck('user', likes)
      }
      return null
    }
    const getComments = () => {
      const comments = R.prop('Comment')(obj)
      if (comments) {
        return R.map((o) => R.assoc('user', o.user, o.comment), comments)
      }
      return null
    }

    if (!obj) {
      return null
    } else
      return ramdaUtils.objReducer([
        R.objOf('Title', getTitle()),
        R.objOf('Like', getLikes()),
        R.objOf('Comment', getComments())
      ])
  }

  return R.pipe(groupByPostIdAndType, getDataByPostId, transformObject)(data)
}

module.exports = {
  processFeedsData
}
