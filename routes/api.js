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
            var imdb_id = q.split('/')[1]
            fs.readFile('cache/' + imdb_id + '.json', 'utf8', (err, imdb) => {
                var writeCache = (imdb_id) => {
                    request('http://www.omdbapi.com/?i=' + imdb_id + '&plot=full&r=json', (error, response, imdb) => {
                        imdb = JSON.parse(imdb)
                        var date = new Date()
                        var curDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
                        imdb.cached = curDate
                        fs.writeFile('cache/' + imdb_id + '.json', JSON.stringify(imdb), (err) => {
                            console.log('cache saved', imdb_id)
                        });
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
