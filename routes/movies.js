var express = require('express')
var request = require('request')
var router = express.Router()

router.get('/', (req, res, next) => {
    if (req._parsedUrl.query == undefined) {
        request('http://' + req.headers.host + '/api?movies/1?sort=trending', function(error, response, data) {
            res.render('movies', {
                info: JSON.parse(data),
                query: ''
            })
        })
    } else {
        var query = req._parsedUrl.query
        request('http://' + req.headers.host + '/api?movies/1?' + query, function(error, response, data) {
            res.render('movies', {
                info: JSON.parse(data),
                query: query
            })
        })
    }
});

module.exports = router
