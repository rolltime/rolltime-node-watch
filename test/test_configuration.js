//
// Tests configuration files.
//
var fs = require('fs')
var path = require('path')
var should = require('should')
var expect = require('chai').expect

//
// Configuration files.
//
var Dev = require('../config/dev')
var Prod = require('../config/prod')
var Database = require('../config/database')

describe('Configuration files.', function () {
  it('Configuration files should be JSON objects.', function (done) {
    expect(typeof (Dev)).to.equal('object')
    expect(typeof (Prod)).to.equal('object')
    expect(typeof (Database)).to.equal('object')
    done()
  })

  it('Configuration files should contain a version number.', function (done) {
    expect(Dev).to.have.a.property('version')
    expect(Prod).to.have.a.property('version')
    done()
  })

  it('Configuration files should contain a repository URL.', function (done) {
    expect(Dev).to.have.a.property('repository')
    expect(Prod).to.have.a.property('repository')
    done()
  })

  it('The database configuration file should contain a database URL.', function (done) {
    expect(Database).to.have.a.property('url')
    done()
  })

})
