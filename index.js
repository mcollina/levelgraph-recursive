

function search(graph, dest, next, push, callback) {
  var pattern = next()

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
        push({
            subject: triple.object
          , predicate: triple.predicate
        })
      }
    })

    if (!found) {
      search(graph, dest, next, push, callback)
    }
  })
}

module.exports = function recursive(graph) {
  var ext = Object.create(graph)

  ext.breadthFirst = function breadthFirst(subject, predicate, object, callback) {
    var queue = []

    function enqueue(pattern) {
      return queue.push(pattern)
    }

    function next() {
      return queue.shift()
    }

    enqueue({ subject: subject, predicate: predicate })

    search(this, object, next, enqueue, callback)

    return this
  }

  ext.deepFirst = function deepFirst(subject, predicate, object, callback) {
    var queue = []

    function enqueue(pattern) {
      return queue.push(pattern)
    }

    function next() {
      return queue.pop()
    }

    enqueue({ subject: subject, predicate: predicate })

    search(this, object, next, enqueue, callback)

    return this
  }

  return ext
}
