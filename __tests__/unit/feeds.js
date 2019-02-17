const fs = require('fs')
const {feedsTransformation} = require('../../app/transformations')

describe('feeds transformations', () => {
  const dataObj = JSON.parse(fs.readFileSync('app/data/feeds.json', 'utf8'))
  const postId = '7d78ff348647b782cb3027d836d23e09'
  test('feed transformation', () => {
    const res = feedsTransformation.processFeedsData(dataObj, postId)
    expect(typeof res).toBe('object')
    expect(res.Title).toBeDefined()
    expect(res.Title).not.toHaveLength(0)
    expect(res.Like).toBeDefined()
    expect(Array.isArray(res.Like) || res.Like === null).toBe(true)
    expect(res.Comment).toBeDefined()    
    expect(Array.isArray(res.Comment) || res.Comment === null).toBe(true)
  })
})
