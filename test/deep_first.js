
var levelgraph = require("levelgraph")
  , memdown    = require("memdown")
  , rec        = require("../")
  , expect     = require("must")
  , absSearch  = require("./abstract_search")

describe("deep-first searches", function() {
  var graph

  beforeEach(function() {
    graph = rec(levelgraph("useless", { db: memdown }))
    this.graph = graph
  })

  absSearch()

  it("must be deep first", function(done) {
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
      graph.deepFirst("origin", "similar", "dest", function(err, triple) {
        expect(triple).to.eql({
            subject: 'd'
          , predicate: 'similar'
          , object: 'dest' });
        done()
      })
    })
  })
})
