var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req._parsedUrl.query == undefined) {
        res.send('u lost or smth?')
    } else {
        var query = req._parsedUrl.query
        request('https://tv-v2.api-fetch.website/' + query, function(error, response, data) {
            console.log(error);
            if (error == null && data != undefined) {
                if (query.match(/movie\/tt\d{7,}/) !== null) {
                    request('http://www.omdbapi.com/?i=' + query.split('/')[1] + '&plot=full&r=json', function(error, response, imdb) {
                        data = JSON.parse(data)
                        data.imdb_data = JSON.parse(imdb)
                        console.log(data)
                        res.send(data)
                    })
                } else {
                    data = JSON.parse(data)
                    console.log('error:', error)
                    console.log('response:', response)
                    console.log('data:', data)
                    res.send(data)
                }
            } else {
                console.log('error:', error)
                console.log('response:', response)
                console.log('data:', data)
                res.send(error)
            }
        })
    }
})

module.exports = router;
