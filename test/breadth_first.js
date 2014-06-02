
var levelgraph = require("levelgraph")
  , memdown    = require("memdown")
  , rec        = require("../")
  , expect     = require("must")
  , absSearch  = require("./abstract_search")

describe("breadth-first searches", function() {
  var graph

  beforeEach(function() {
    graph = rec(levelgraph("useless", { db: memdown }))
    this.graph = graph
  })

  absSearch()

  it("must be breadth first", function(done) {
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
      , object: 'dest'
    }, {
        subject: 'b'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.breadthFirst("origin", "similar", "dest", function(err, triple) {
        expect(triple).to.eql({
            subject: 'a'
          , predicate: 'similar'
          , object: 'dest' });
        done()
      })
    })
  })
})
