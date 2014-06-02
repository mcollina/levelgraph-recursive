
var levelgraph = require('levelgraph')
  , graph      = levelgraph('mygraph')
  , expect     = require("must")

graph = require('./')(graph)

graph.put([{
    subject: 'origin'
  , predicate: 'similar'
  , object: 'a'
}, {
    subject: 'a'
  , predicate: 'similar'
  , object: 'b'
}, {
    subject: 'a'
  , predicate: 'similar'
  , object: 'c'
}, {
    subject: 'c'
  , predicate: 'similar'
  , object: 'd'
}, {
    subject: 'b'
  , predicate: 'similar'
  , object: 'dest'
}, {
    subject: 'd'
  , predicate: 'similar'
  , object: 'dest'
}], function() {
  graph.breadthFirst("origin", "similar", "dest", function(err, triple) {
    expect(triple).to.eql({
        subject: 'b'
      , predicate: 'similar'
      , object: 'dest' });
    console.log('breadth first ok!')
  })

  graph.deepFirst("origin", "similar", "dest", function(err, triple) {
    expect(triple).to.eql({
        subject: 'd'
      , predicate: 'similar'
      , object: 'dest' });
    console.log('deep first ok!')
  })
})
