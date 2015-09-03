//
// Tests configuration files.
//
var fs = require('fs')
var path = require('path')
var should = require('should')
var expect = require('chai').expect

//
// Functions.
//
var Fetch = require('../app/functions/fetch')

//
// Helper function that
// evaluates callback data.
//
EvaluateCallbacks = function (err, data) {
  if (err) {
    return err
  } else {
    return data
  }
}

// describe('Application functions.', function () {
//   it('Fetch.FetchAllStatus() should return an object.', function (done) {
//     done()
//   })

// })
