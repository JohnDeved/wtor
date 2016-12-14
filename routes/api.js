var express = require('express')
var request = require('request')
var fs = require('fs')
var router = express.Router()

router.get('/:api/:query', (req, res, next) => {
    var api = {
        movies: (q, a, o) => {
            request('https://tv-v2.api-fetch.website/' + a + '/' + q + (o ? '?' + o : ''), (error, response, data) => {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        movie: (q, a, o) => {
            request('https://tv-v2.api-fetch.website/' + a + '/' + q + (o ? '?' + o : ''), (error, response, data) => {
                res.send(data)
                console.log('movie page load was performed')
            })
        },
        imdb: (imdb_id) => {
            console.log(__dirname + '/../cache/' + imdb_id + '.json');
            fs.readFile(__dirname + '/../cache/' + imdb_id + '.json', 'utf8', (err, imdb) => {
                var writeCache = (imdb_id) => {
                    request('http://www.omdbapi.com/?i=' + imdb_id + '&plot=full&r=json', (error, response, imdb) => {
                        imdb = JSON.parse(imdb)
                        var date = new Date()
                        var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                        imdb.cached = curDate
                        fs.writeFile(__dirname + '/../cache/' + imdb_id + '.json', JSON.stringify(imdb), (err) => {
                            console.log('cache saved', imdb_id)
                        })
                        res.send(imdb)
                        console.log('imdb info load was performed', imdb_id)
                    })
                }
                if (!err && imdb) {
                    try {
                        imdb = JSON.parse(imdb)
                        var date = new Date()
                        var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                        if (!imdb.cached || imdb.cached !== curDate) {
                            writeCache(imdb_id)
                            console.log('overwriting old cache', imdb_id)
                        } else {
                            res.send(imdb)
                            console.log('cache loaded', imdb_id)
                        }
                    } catch (err) {
                        writeCache(imdb_id)
                        console.log('overwriting broken cache', imdb_id, err)
                    }
                } else {
                    writeCache(imdb_id)
                }
            })
        },
        load: (q) => {
            request('http://' + req.headers.host + '/api/movies/' + q, (error, response, data) => {
                res.render('load',{
                    info: JSON.parse(data)
                })
                console.log('list load was performed')
            })
        }
    }
    api[req.params.api](req.params.query, req.params.api, req._parsedUrl.query, req.query)
})

module.exports = router
