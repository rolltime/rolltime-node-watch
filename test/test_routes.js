//
// Tests configuration files.
//
var fs = require('fs')
var path = require('path')
var should = require('should')
var chai = require('chai')
var expect = require('chai').expect
var http = require('http')
var chaiHttp = require('chai-http')

//
// Configuring Chai to use http.
//
chai.use(chaiHttp)

describe('Application routes.', function () {
  var application = chai.request('http://localhost:9000')

  it('[/status] should return 200 status.', function (done) {
    application
      .get('/status')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('[/status] to have complete status object.', function (done) {
    application
      .get('/status')
      .end(function (err, res) {
        expect(res.body).to.have.a.property('online')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('version')
        expect(res.body).to.have.a.property('repository')
        done()
      })
  })

  it('GET [/] should return 200 status.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('GET [/] should return complete object.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('count')
        expect(res.body).to.have.a.property('records')
        done()
      })
  })

  it('GET [/] should return a records array.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(typeof res.body.records).to.equal(typeof [])
        done()
      })
  })

  it('GET [/] should return false if id is sent with request.', function (done) {
    application
      .get('/')
      .send({ id: 'foo' })
      .end(function (err, res) {
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('GET [/] should return a complete false object when queried with an id.', function (done) {
    application
      .get('/')
      .send({ id: 'foo' })
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        done()
      })
  })

  it('POST [/] with a complete object should return success.', function (done) {
    application
      .post('/')
      .send({
        id: 'foo',
        status: 'error',
        message: 'This failed because of love.',
        time: '2015-01-01T14:30:00'
      })
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('POST [/] with a complete object should return a complete message.', function (done) {
    application
      .post('/')
      .send({
        id: 'foo',
        status: 'error',
        message: 'This failed because of love.',
        time: '2015-01-01T14:30:00'
      })
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('_id')
        done()
      })
  })

  it('DELETE [/] with a complete object should return success', function (done) {
    application
      .delete('/')
      .send({
        id: 'foo'
      })
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('DELETE [/] with a complete object should return a complete message', function (done) {
    application
      .delete('/')
      .send({
        id: 'foo'
      })
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('entries_deleted')
        done()
      })
  })

  it('GET [/overview] should return success.', function (done) {
    application
      .get('/overview')
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('GET [/series] without an id should return fail.', function (done) {
    application
      .get('/series')
      .end(function (err, res) {
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('GET [/series] with an id should return success.', function (done) {
    application
      .get('/series')
      .send({
        id: 'foo'
      })
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('[/404] should return a 404 error.', function (done) {
    application
      .get('/404')
      .end(function (err, res) {
        expect(res.status).to.equal(404)
        done()
      })
  })

  it('[/404] should return a page not found message.', function (done) {
    application
      .get('/404')
      .end(function (err, res) {
        expect(res.body.success).to.equal(false)
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        done()
      })
  })

})
