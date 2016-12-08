var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req._parsedUrl.query == undefined) {
    res.send('dafuq u doing in here? nigga u lost or smth?')
  } else {
    var query = req._parsedUrl.query
    request('https://tv-v2.api-fetch.website/'+query, function (error, response, data) {
      if (query.match(/movie\/tt\d{7,}/) !== null) {
        request('http://www.omdbapi.com/?i=' + query.split('/')[1] + '&plot=full&r=json', function (error, response, imdb) {
          data = JSON.parse(data)
          data.imdb_data = JSON.parse(imdb)
          res.send(data)
        })
      } else {
        res.send(data)
      }
    })
  }
})

module.exports = router;
