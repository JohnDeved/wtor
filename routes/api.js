var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    var api = {
        movies: (q) => {
            request('https://tv-v2.api-fetch.website/' + q, function(error, response, data) {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        movie: (q) => {
            request('https://tv-v2.api-fetch.website/' + q, function(error, response, data) {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        imdb: (q) => {
            request('http://www.omdbapi.com/?i=' + q.split('/')[1] + '&plot=full&r=json', function(error, response, imdb) {
                res.send(imdb)
                console.log('imdb info load was performed')
            })
        },
        load: (q) => {
            request('http://' + req.headers.host + '/api?movies/' + q.split('/')[1], function(error, response, data) {
                res.render('load',{
                    info: JSON.parse(data)
                })
                console.log('list load was performed')
            })
        }
    }
    query = req._parsedUrl.query
    api[query.split('/')[0]](query)
})

module.exports = router;
