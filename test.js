
var levelgraph = require("levelgraph")
  , memdown    = require("memdown")
  , rec        = require("./")
  , expect     = require("must")

describe("breadth-first searches", function() {
  var graph

  beforeEach(function() {
    graph = rec(levelgraph("useless", { db: memdown }))
  })

  it("must do one level searches", function(done) {
    graph.put([{
        subject: 'origin'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.breadthFirst("origin", "similar", "dest", function(err) {
        expect(err).to.be.null();
        done()
      })
    })
  })

  it("must return an error if there is no match", function(done) {
    graph.put([{
        subject: 'origin'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.breadthFirst("origin", "similar", "abcde", function(err) {
        expect(err).not.to.be.null();
        done()
      })
    })
  })

  it("must do two level searches", function(done) {
    graph.put([{
        subject: 'origin'
      , predicate: 'similar'
      , object: 'a'
    }, {
        subject: 'a'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.breadthFirst("origin", "similar", "dest", function(err) {
        expect(err).to.be.null();
        done()
      })
    })
  })
})
