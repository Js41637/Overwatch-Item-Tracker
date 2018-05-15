var compare = require('./compare')

function mediator(a, b) {
  return compare(a.converted, b.converted)
}

module.exports = function(array) {
  if (!Array.isArray(array) || array.length < 2) {
    return array
  }

  var result = Array(array.length)
  var i, max, value

  for (i = 0, max = array.length; i < max; i += 1) {
    value = String(array[i].name)
    result[i] = {
      value: array[i],
      converted: value.toLowerCase()
    }
  }

  result.sort(mediator)

  for (i = result.length - 1; ~i; i -= 1) {
    result[i] = result[i].value
  }

  return result
}