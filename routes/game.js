var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('game', {
        acols: 20,
        arows: 40
    })
});

module.exports = router;