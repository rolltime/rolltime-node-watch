module.exports = function (app) {
  var http = require('http')
  var moment = require('moment')
  var CollectorStatus = require('./db/status.js')
  var Config = require('../config/dev')

  FetchAllStatus = function (callback) {
    CollectorStatus.find(function (err, data) {
      if (err) {
        var payload = { 'success': false, 'message': 'Could not collect status records from database.'}
        callback(payload)
      } else {
        var out = {
          'success': true,
          'count': null,
          'records': []
        }
        for (i = 0; i < data.length; i++) {
          //
          // Cleaning records that
          // don't have id.
          //
          var c = 0
          if (typeof data[i].id === typeof undefined) {
            continue
          } else {
            c += 1
            out.records.push({
              'id': data[i].id,
              'status': data[i].status,
              'message': data[i].message,
              'time': data[i].time
            })
          }

          //
          // Adding count
          //
          out.count = c
        }
        callback(null, out)
      }
    })
  }

  app.get('/', function (req, res) {
    //
    // Check if the user is
    // trying to create a record.
    //
    if (req.body.id) {
      var payload = { 'success': false, 'message': 'We noticed data in the request. If you are trying to store data, please use a POST request instead.'}
      res.send(payload)
    } else {
      //
      // Sends all status back.
      // TODO: set a limit.
      //
      FetchAllStatus(function (err, data) {
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
    }
  })

  app.get('/status', function (req, res) {
    var payload = {
      'online': true,
      'message': 'Service for collecting the status of scrapers and collectors.',
      'version': Config.version,
      'repository': Config.repository
    }
    res.send(payload)
  })

  //
  // Fetches the series of
  // entries for a single scraper.
  // Needs a scraper id.
  //
  app.get('/series', function (req, res) {
    //
    // Check for id.
    //
    if (typeof req.body.id === typeof undefined) {
      var payload = { 'success': false, 'message': 'Scraper id not provided.'}
      res.send(payload)
    } else {
      var payload = { 'success': true, 'message': 'Series calculation not available on this version.'}
      res.send(payload)
    }
  })

  //
  // Fetches the latest entry
  // for each scraper and calculates
  // an overview.
  //
  app.get('/overview', function (req, res) {
    var url = 'http://' + req.get('host') + '/'
    FetchAllStatus(function (err, data) {
      if (err) {
        var payload = { 'success': false, 'message': 'Failed to calculate summary.'}
        res.send(payload)
      } else {
        var payload = {
          'success': true,
          'message': 'Overview calculation not available on this version.',
          'count': data.length
        }
        res.send(payload)
      }
    })
  })

  app.post('/', function (req, res) {
    //
    // Check that necessary parameters have
    // been provided.
    //
    console.log(typeof req.body.id)
    console.log(typeof req.body.message)
    if (typeof req.body['id'] === undefined || typeof req.body['message'] === undefined) {
      var payload = {
        'success': false,
        'message': 'Parameters are missing. Please provide an id, status, and a message.',
      }
      res.send(payload)
    }

    //
    // Creates new status object.
    //
    var status = new CollectorStatus({
      'id': req.body.id,
      'status': req.body.status,
      'message': req.body.message || null,
      'time': req.body.time || moment().format()
    })

    //
    // Saves status object in database.
    //
    status.save(function (err, data) {
      if (err) {
        console.log(err)
        var payload = {
          'success': false,
          'message': 'Database error. Failed to store data.',
        }
        res.send(payload)
      } else {
        var payload = {
          'success': true,
          'message': 'Stored record in database successfully.',
          'record': data,
        }
        res.send(payload)
      }
    })
  })

  //
  // Endpoint for deleting data
  // from specific node.
  //
  app.delete('/', function (req, res) {
    CollectorStatus.remove({ id: req.body.id }, function (err, data) {
      if (err) {
        var payload = {
          'success': false,
          'message': 'Failed to remove record from database.',
          'error': err,
        }
        res.send(payload)
      } else {
        var i = 0
        var payload = {
          'success': true,
          'message': 'All record from node' + ' were removed from database.',
          'count': i,
          'log': data,
        }
        res.send(payload)
      }
    })
  })

  //
  // Any other routes send error.
  //
  app.use(function (req, res, next) {
    res.status(404)
    res.send({ 'success': false, 'message': 'URL not found.'})
  })

}
