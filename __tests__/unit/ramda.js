const {ramdaUtils} = require('../../app/utils')

describe('rambda utils', () => {
  const input = [
    {
      type: 'Like',
      user: {
        id: '1',
        name: 'Mary'
      }
    },
    {
      type: 'Like',
      user: {
        id: '2',
        name: 'Bojana'
      }
    }
  ]

  test('Group an array by a single attribtue', () => {
    const expected = {
      '1': [{type: 'Like', user: {id: '1', name: 'Mary'}}],
      '2': [{type: 'Like', user: {id: '2', name: 'Bojana'}}]
    }
    const res = ramdaUtils.groupByMany([(o) => o.user.id])(input)
    expect(res).toEqual(expected)
  })

  test('Group an array by multiple attribtues', () => {
    const expected = {
      '1': {Like: [{type: 'Like', user: {id: '1', name: 'Mary'}}]},
      '2': {Like: [{type: 'Like', user: {id: '2', name: 'Bojana'}}]}
    }
    const res = ramdaUtils.groupByMany([(o) => o.user.id, (o) => o.type])(input)
    expect(res).toEqual(expected)
  })

  test('Merge an array of 3 objects into one object', () => {
    const obj1 = {title: 'technology'}
    const obj2 = {kind: 'paper'}
    const obj3 = {type: 'article'}

    const expected = {
      title: 'technology',
      kind: 'paper',
      type: 'article'
    }
    const res = ramdaUtils.objReducer([obj1, obj2, obj3])
    expect(res).toEqual(expected)
  })
})
