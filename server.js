//
// Connects to database and runs server.
//
var cors = require('cors')
var moment = require('moment')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()

var morgan = require('morgan')
var mongoose = require('mongoose')

var port = process.env.PORT || 9000
var DB = require('./config/database')

var _version = 'v.0.1.5'

//
// Only start the application
// if the database is ready.
//
mongoose.connection.on('connected', function (ref) {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  //
  // Routes.
  //
  require('./app/routes.js')(app)

  //
  // Start server.
  //
  app.listen(port)
  console.log('Scraper Status API running on port ' + port)

})

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to MongoDB.')
  throw err
})

//
// Attempt connection with MongoDB.
//
mongoose.connect(DB.url)
