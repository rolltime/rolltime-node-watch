// Collector schema.
var mongoose = require('mongoose')

// define the schema for our user model
var ScraperStatus = mongoose.Schema({
  id: String,
  status: String,
  message: String,
  time: String
})

module.exports = mongoose.model('User', ScraperStatus)
