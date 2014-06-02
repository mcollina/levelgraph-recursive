

function breadthFirst(graph, dest, queue, callback) {
  var pattern = queue.shift()

  if (!pattern) {
    return callback(new Error("not found"))
  }

  graph.get(pattern, function(err, list) {
    var found = false

    list.forEach(function(triple) {
      if (triple.object === dest) {
        found = true
        callback(null, triple)
      } else {
        queue.push({
            subject: triple.object
          , predicate: triple.predicate
        })
      }
    })

    if (!found) {
      breadthFirst(graph, dest, queue, callback)
    }
  })
}

module.exports = function recursive(graph) {
  var ext = Object.create(graph)

  ext.breadthFirst = function(subject, predicate, object, callback) {
    breadthFirst(this, object, [{ subject: subject, predicate: predicate }], callback)
    return this
  }

  return ext
}
