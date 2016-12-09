var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req._parsedUrl.query == undefined) {
        res.send('u lost or smth?')
    } else {
        var query = req._parsedUrl.query
        request('https://tv-v2.api-fetch.website/' + query, function(error, response, data) {
            if (query.match(/movie\/tt\d{7,}/) !== null) {
                request('http://www.omdbapi.com/?i=' + query.split('/')[1] + '&plot=short&r=json', function(error, response, imdb) {
                    data = JSON.parse(data)
                    data.imdb_data = JSON.parse(imdb)
                    res.send(data)
                })
            } else {
                data = JSON.parse(data)
                var imdb_data = new Object
                for (var i = 0; i < data.length; i++) {
                    request('http://www.omdbapi.com/?i=' + data[i].imdb_id + '&plot=full&r=json', function(error, response, imdb) {
                        imdb = JSON.parse(imdb)
                        imdb_data[imdb.imdbID] = imdb
                        if (Object.keys(imdb_data).length === data.length) {
                            for (var i = 0; i < data.length; i++) {
                                data[i].imdb_data = imdb_data[data[i].imdb_id]
                            }
                            console.log(data);
                            res.send(data)
                        }
                    })
                }
            }
        })
    }
})

module.exports = router;
