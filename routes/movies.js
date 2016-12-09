var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req._parsedUrl.query == undefined) {
        request('http://' + req.rawHeaders[1] + '/api?movies/1', function(error, response, data) {
            res.render('movies', {
                info: JSON.parse(data)
            })
        })
    } else {
        var query = req._parsedUrl.query
        request('/api?movies/1' + query, function(error, response, data) {
            res.render('movies', {
                info: JSON.parse(data)
            })
        })
    }
});

module.exports = router;