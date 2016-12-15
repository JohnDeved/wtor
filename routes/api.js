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
            fs.readFile(__dirname + '/../cache/' + imdb_id + '.json', 'utf8', (err, imdb) => {
                var writeCache = (imdb_id, imdb_cache, send) => {
                    request('http://www.omdbapi.com/?i=' + imdb_id + '&plot=full&r=json', (error, response, imdb) => {
                        if (error && imdb_cache && send) {
                            console.log('api request error. restoring using old cache...', imdb_id)
                            res.send(imdb_cache)
                        } else if (!error) {
                            imdb = JSON.parse(imdb)
                            var date = new Date()
                            var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                            imdb.cached = curDate
                            fs.writeFile(__dirname + '/../cache/' + imdb_id + '.json', JSON.stringify(imdb), (err) => {
                                console.log('cache saved', imdb_id)
                            })
                            if (send) {
                                res.send(imdb)
                            }
                            console.log('imdb info load was performed', imdb_id)
                        } else {
                            console.log('api request error.', imdb_id)
                            if (send) {
                                res.send('fail')
                            }
                        }
                    })
                }
                if (!err && imdb) {
                    try {
                        imdb = JSON.parse(imdb)
                        var date = new Date()
                        var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                        if (!imdb.cached || imdb.cached !== 'curDate') {
                            res.send(imdb)
                            writeCache(imdb_id, imdb, false)
                            console.log('overwriting old cache', imdb_id)
                        } else {
                            res.send(imdb)
                            console.log('cache loaded', imdb_id)
                        }
                    } catch (err) {
                        writeCache(imdb_id, imdb, true)
                        console.log('overwriting broken cache', imdb_id, err)
                    }
                } else {
                    writeCache(imdb_id, false, true)
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
