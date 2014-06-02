
var levelgraph = require("levelgraph")
  , memdown    = require("memdown")
  , rec        = require("../")
  , expect     = require("must")

describe("deep-first searches", function() {
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
      graph.deepFirst("origin", "similar", "dest", function(err) {
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
      graph.deepFirst("origin", "similar", "abcde", function(err) {
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
      graph.deepFirst("origin", "similar", "dest", function(err) {
        expect(err).to.be.null();
        done()
      })
    })
  })

  it("must return the matching triple", function(done) {
    graph.put([{
        subject: 'origin'
      , predicate: 'similar'
      , object: 'a'
    }, {
        subject: 'a'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.deepFirst("origin", "similar", "dest", function(err, triple) {
        expect(triple).to.eql({
            subject: 'a'
          , predicate: 'similar'
          , object: 'dest' });
        done()
      })
    })
  })

  it("must do three level searches", function(done) {
    graph.put([{
        subject: 'origin'
      , predicate: 'similar'
      , object: 'a'
    }, {
        subject: 'a'
      , predicate: 'similar'
      , object: 'b'
    }, {
        subject: 'b'
      , predicate: 'similar'
      , object: 'dest'
    }], function() {
      graph.deepFirst("origin", "similar", "dest", function(err) {
        expect(err).to.be.null();
        done()
      })
    })
  })

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
