var express = require('express')
var request = require('request')
var fs = require('fs')
var router = express.Router()

router.get('/:api/:query/:opt?', (req, res, next) => {
    var writeCache = (url, query, folder, cache, send, isArray) => {
        request(url, (error, response, data) => {
            if (error && cache && send) {
                console.log('api request error. restoring using old cache...', query)
                res.send(cache)
            } else if (!error) {
                if (isArray) {
                    var array = data
                    data = new Object
                    data.array = JSON.parse(array)
                } else {
                    data = JSON.parse(data)
                }
                var date = new Date()
                var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                data.cached = curDate
                fs.writeFile(folder, JSON.stringify(data), (err) => {
                    console.log(folder, 'cache saved', query)
                })
                if (send) {
                    if (isArray) {
                        res.send(data.array)
                    } else {
                        res.send(data)
                    }
                }
                console.log(folder, 'api load was performed', query)
            } else {
                console.log(folder, 'api request error.', query)
                if (send) {
                    res.send('fail')
                }
            }
        })
    }

    var readCache = (folder, url, query, isArray) => {
        fs.readFile(folder, (err, data) => {
            if (!err && data) {
                try {
                    data = JSON.parse(data)
                    var date = new Date()
                    var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                    if (!data.cached || data.cached !== curDate) {
                        if (isArray) {
                            res.send(data.array)
                        } else {
                            res.send(data)
                        }
                        writeCache(url, query, folder, data, false, isArray)
                        console.log('overwriting old cache', query)
                    } else {
                        if (isArray) {
                            res.send(data.array)
                        } else {
                            res.send(data)
                        }
                        console.log('cache loaded', query)
                    }
                } catch (err) {
                    writeCache(url, query, folder, data, true, isArray)
                    console.log('overwriting broken cache', query, err)
                }
            } else {
                writeCache(url, query, folder, false, true, isArray)
            }
        })
    }

    var api = {
        movies: (q, a, o) => {
            var folder = __dirname + '/../cache/search/' + q + '_' + o + '.json'
            var url = 'https://tv-v2.api-fetch.website/' + a + '/' + q + (o ? '?' + o : '')
            readCache(folder, url, q, true)
        },
        movie: (q, a, o) => {
            var folder = __dirname + '/../cache/movie/' + q + '.json'
            var url = 'https://tv-v2.api-fetch.website/' + a + '/' + q + (o ? '?' + o : '')
            readCache(folder, url, q)
        },
        imdb: (q, a, o) => {
            var folder = __dirname + '/../cache/imdb/' + q + '.json'
            var url = 'http://www.omdbapi.com/?i=' + q + '&plot=full&r=json'
            readCache(folder, url, q)
        },
        load: (q, a, o) => {
            request('http://' + req.headers.host + '/api/movies/' + q + (o ? '/' + o : ''), (error, response, data) => {
                res.render('load',{
                    info: JSON.parse(data)
                })
                console.log('list load was performed')
            })
        }
    }
    try {
        api[req.params.api](req.params.query, req.params.api, req.params.opt, req.query)
    } catch (e) {
        res.send('nope')
    }
})

module.exports = router
