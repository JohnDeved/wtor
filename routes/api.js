var express = require('express')
var request = require('request')
var fs = require('fs')
var router = express.Router()

router.get('/', (req, res, next) => {
    var api = {
        movies: (q) => {
            request('https://tv-v2.api-fetch.website/' + q, (error, response, data) => {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        movie: (q) => {
            request('https://tv-v2.api-fetch.website/' + q, (error, response, data) => {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        imdb: (q) => {
            var imdb_id = q.split('/')[1];
            fs.readFile('cache/' + imdb_id + '.json', 'utf8', (err, imdb) => {
                if (err) {
                    request('http://www.omdbapi.com/?i=' + imdb_id + '&plot=full&r=json', (error, response, imdb) => {
                        fs.writeFile('cache/' + imdb_id + '.json', imdb, (err) => {
                            console.log('cache saved', imdb_id)
                        });
                        res.send(imdb)
                        console.log('imdb info load was performed', imdb_id)
                    })
                } else {
                    res.send(imdb)
                    console.log('cache loaded', imdb_id)
                }
            })
        },
        load: (q) => {
            request('http://' + req.headers.host + '/api?movies/' + q.split('/')[1], (error, response, data) => {
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

module.exports = router
