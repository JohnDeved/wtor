var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next) {
    var query = req._parsedUrl.query
    request('http://' + req.rawHeaders[1] + '/api?movie/' + query.split('@')[0], function(error, response, data) {
        res.render('watch', {
            info: JSON.parse(data),
            quality: query.split('@')[1]
        })
        console.log({
            info: JSON.parse(data),
            quality: query.split('@')[1]
        });
    })
});

module.exports = router;
