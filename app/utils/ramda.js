const R = require('ramda')

// Used for grouping objects by multiple properties.
const groupByMany = R.curry(
  (fns, items) =>
    R.isEmpty(fns)
      ? items
      : R.map(groupByMany(R.tail(fns)), R.groupBy(R.head(fns), items))
)

// Used for merging an array of objects into one object.
const objReducer = R.reduce(R.mergeWith(R.merge), {})

module.exports = {
    groupByMany,
    objReducer
}